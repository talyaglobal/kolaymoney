/**
 * Blog Layout
 * Shared layout for blog pages
 */

import { ReactNode } from 'react'
import { Link } from 'wouter'
import { ArrowLeft } from 'lucide-react'

interface BlogLayoutProps {
  children: ReactNode
  showBackButton?: boolean
}

export function BlogLayout({ children, showBackButton = true }: BlogLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b-4 border-black bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/">
              <a className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 bg-primary flex items-center justify-center border-2 border-black">
                  <span className="text-white font-black text-2xl">₺</span>
                </div>
                <span className="font-black text-xl">KolayMoney.com</span>
              </a>
            </Link>
            
            {showBackButton && (
              <Link href="/blog">
                <a className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-black hover:bg-black hover:text-white transition-colors font-bold">
                  <ArrowLeft className="w-4 h-4" />
                  Tüm Yazılar
                </a>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="border-t-4 border-black bg-gray-50 py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-black text-lg mb-4">KolayMoney.com</h3>
              <p className="text-sm text-gray-600">
                Alternatif finansman platformu. VDMK ihraçları ile işletmenize hızlı finansman.
              </p>
            </div>
            <div>
              <h3 className="font-black text-lg mb-4">Hızlı Linkler</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/"><a className="hover:text-primary">Ana Sayfa</a></Link></li>
                <li><Link href="/sektorler"><a className="hover:text-primary">Sektörler</a></Link></li>
                <li><Link href="/blog"><a className="hover:text-primary">Blog</a></Link></li>
                <li><Link href="/basvuru-yeni"><a className="hover:text-primary">Başvuru</a></Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-black text-lg mb-4">İletişim</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>📞 +90 555 868 16 34</li>
                <li>📧 info@kolaymoney.com</li>
                <li>📍 İstanbul, Türkiye</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t-2 border-gray-300 text-center text-sm text-gray-600">
            <p>© 2026 KolayMoney.com - Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
