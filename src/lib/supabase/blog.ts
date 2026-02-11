/**
 * Blog API - Supabase Integration
 * Fetches blog posts from Supabase database
 */

import { createClient } from '@supabase/supabase-js'

// Create a direct client to avoid type issues until database types are regenerated
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  author_title?: string
  author_avatar?: string
  publish_date: string
  modified_date?: string
  featured_image?: string
  tags: string[]
  read_time: number
  is_published: boolean
  is_featured: boolean
  view_count: number
  meta_title?: string
  meta_description?: string
  meta_keywords?: string[]
}

/**
 * Get all published blog posts
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('is_published', true)
    .order('publish_date', { ascending: false })

  if (error) {
    console.error('Error fetching blog posts:', error)
    throw error
  }

  return (data as any[]) || []
}

/**
 * Get featured blog posts
 */
export async function getFeaturedBlogPosts(limit: number = 3): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('is_published', true)
    .eq('is_featured', true)
    .order('publish_date', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching featured blog posts:', error)
    throw error
  }

  return (data as any[]) || []
}

/**
 * Get single blog post by slug
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      // Not found
      return null
    }
    console.error('Error fetching blog post:', error)
    throw error
  }

  // Increment view count
  try {
    await supabase.rpc('increment_blog_view_count', { post_slug: slug })
  } catch (viewError) {
    console.error('Error incrementing view count:', viewError)
    // Don't throw, just log
  }

  return data as any
}

/**
 * Get blog posts by tag
 */
export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('is_published', true)
    .contains('tags', [tag])
    .order('publish_date', { ascending: false })

  if (error) {
    console.error('Error fetching blog posts by tag:', error)
    throw error
  }

  return (data as any[]) || []
}

/**
 * Search blog posts
 */
export async function searchBlogPosts(query: string): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('is_published', true)
    .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`)
    .order('publish_date', { ascending: false })

  if (error) {
    console.error('Error searching blog posts:', error)
    throw error
  }

  return (data as any[]) || []
}

/**
 * Get all unique tags
 */
export async function getAllBlogTags(): Promise<string[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('tags')
    .eq('is_published', true)

  if (error) {
    console.error('Error fetching blog tags:', error)
    throw error
  }

  // Flatten and deduplicate tags
  const allTags = (data as any[])?.flatMap((post: any) => post.tags) || []
  return Array.from(new Set(allTags)).sort()
}
