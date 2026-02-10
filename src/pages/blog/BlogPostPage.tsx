/**
 * Blog Post Page
 * Individual blog post view
 */

import { useParams, Link } from 'wouter'
import { useEffect } from 'react'
import { BlogLayout } from './BlogLayout'
import { getBlogPostBySlug } from '@/data/blog/posts'
import { useSEO } from '@/hooks/useSEO'
import { useAnalytics } from '@/contexts/AnalyticsContext'
import { generateArticleSchema, injectStructuredData } from '@/lib/seo/structuredData'
import { Clock, Calendar, User, Tag } from 'lucide-react'

export function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const analytics = useAnalytics()
  
  const post = getBlogPostBySlug(slug)

  // SEO optimization
  useSEO({
    title: post ? `${post.title} | KolayMoney Blog` : 'Blog | KolayMoney',
    description: post?.excerpt || '',
    keywords: post?.tags || [],
    canonical: `/blog/${slug}`,
    type: 'article'
  })

  // Track blog view and add structured data
  useEffect(() => {
    if (post) {
      analytics.trackBlogView(post.slug, post.title)
      
      // Add article schema
      injectStructuredData(generateArticleSchema({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        author: post.author,
        publishDate: post.publishDate,
        modifiedDate: post.modifiedDate,
        image: post.image,
        tags: post.tags
      }), 'article-schema')
    }
  }, [post])

  if (!post) {
    return (
      <BlogLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="heading-1 mb-4">Blog Yazısı Bulunamadı</h1>
          <p className="text-xl text-gray-600 mb-8">
            Aradığınız blog yazısı mevcut değil.
          </p>
          <Link href="/blog">
            <a className="inline-block px-8 py-4 bg-primary text-white border-2 border-black hover:bg-black transition-colors font-bold">
              Tüm Yazılara Dön
            </a>
          </Link>
        </div>
      </BlogLayout>
    )
  }

  return (
    <BlogLayout>
      <article className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <header className="mb-12">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(post.publishDate).toLocaleDateString('tr-TR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readTime} dakika okuma
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {post.author}
            </div>
          </div>

          {/* Title */}
          <h1 className="heading-1 mb-6">{post.title}</h1>

          {/* Excerpt */}
          <p className="text-xl text-gray-600 mb-6">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span 
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 border-2 border-primary text-primary font-bold text-sm"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Featured Image */}
        {post.image && (
          <div className="mb-12 border-4 border-black">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div 
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }}
          />
        </div>

        {/* CTA */}
        <div className="mt-16 p-8 bg-primary border-4 border-black text-center">
          <h2 className="heading-2 text-white mb-4">VDMK ile Büyümeye Hazır mısınız?</h2>
          <p className="text-white text-lg mb-6">
            İşletmeniz için özel finansman çözümü oluşturalım
          </p>
          <Link href="/basvuru-yeni">
            <a className="inline-block px-8 py-4 bg-black text-white border-2 border-white hover:bg-white hover:text-black hover:border-black transition-colors font-bold text-lg">
              Başvuru Yap →
            </a>
          </Link>
        </div>

        {/* Related Posts */}
        <div className="mt-16 pt-16 border-t-4 border-gray-200">
          <h2 className="heading-2 mb-8">Diğer Yazılar</h2>
          <div className="text-center">
            <Link href="/blog">
              <a className="inline-block px-6 py-3 bg-white border-2 border-black hover:bg-black hover:text-white transition-colors font-bold">
                Tüm Blog Yazılarını Görüntüle
              </a>
            </Link>
          </div>
        </div>
      </article>
    </BlogLayout>
  )
}
