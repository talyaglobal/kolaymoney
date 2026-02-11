/**
 * Blog List Page
 * Shows all blog posts from Supabase
 */

import { useState, useEffect } from 'react'
import { Link } from 'wouter'
import { BlogLayout } from './BlogLayout'
import { getAllBlogPosts, BlogPost } from '@/lib/supabase/blog'
import { useSEO } from '@/hooks/useSEO'
import { Clock, Calendar, Tag } from 'lucide-react'

export function BlogListPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      setLoading(true)
      const data = await getAllBlogPosts()
      setPosts(data)
    } catch (err) {
      console.error('Error loading blog posts:', err)
      setError('Blog yazıları yüklenemedi')
    } finally {
      setLoading(false)
    }
  }

  useSEO({
    title: 'Blog - Finansman Rehberi | KolayMoney',
    description: 'VDMK, alternatif finansman ve işletme yönetimi hakkında güncel içerikler. Uzman yazıları ve sektör analizleri.',
    keywords: ['VDMK rehber', 'finansman blog', 'işletme finansmanı', 'VDMK nedir'],
    canonical: '/blog'
  })

  return (
    <BlogLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="heading-1 mb-4">Finansman Rehberi</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            VDMK, alternatif finansman ve işletme yönetimi hakkında güncel içerikler
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-black border-t-transparent animate-spin"></div>
            <p className="mt-4 text-gray-600">Blog yazıları yükleniyor...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="bg-red-50 border-4 border-red-600 p-8 inline-block">
              <p className="text-red-600 font-bold">{error}</p>
              <button 
                onClick={loadPosts}
                className="mt-4 px-6 py-2 bg-red-600 text-white border-2 border-black hover:bg-red-700 font-bold"
              >
                Tekrar Dene
              </button>
            </div>
          </div>
        )}

        {/* Posts Grid */}
        {!loading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600 text-lg">Henüz blog yazısı bulunmuyor.</p>
              </div>
            ) : (
              posts.map(post => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <a className="group">
                    <article className="border-4 border-black bg-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all duration-200 h-full flex flex-col">
                  {/* Image */}
                  {post.featured_image && (
                    <div className="border-b-4 border-black overflow-hidden">
                      <img 
                        src={post.featured_image} 
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.publish_date).toLocaleDateString('tr-TR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.read_time} dk
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="font-black text-xl mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-600 mb-4 flex-1">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map(tag => (
                        <span 
                          key={tag}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 border-2 border-black text-xs font-bold"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Author */}
                    <div className="mt-4 pt-4 border-t-2 border-gray-200 text-sm text-gray-600">
                      Yazar: <span className="font-bold">{post.author}</span>
                    </div>
                  </div>
                </article>
                    </a>
                  </Link>
                ))
              )}
            </div>
          )
        }

        {/* CTA */}
        <div className="mt-16 p-8 bg-primary border-4 border-black text-center">
          <h2 className="heading-2 text-white mb-4">VDMK Finansman Başvurusu</h2>
          <p className="text-white text-lg mb-6">
            İşletmeniz için hızlı ve alternatif finansman çözümü
          </p>
          <Link href="/basvuru-yeni">
            <a className="inline-block px-8 py-4 bg-black text-white border-2 border-white hover:bg-white hover:text-black hover:border-black transition-colors font-bold text-lg">
              Hemen Başvur →
            </a>
          </Link>
        </div>
      </div>
    </BlogLayout>
  )
}
