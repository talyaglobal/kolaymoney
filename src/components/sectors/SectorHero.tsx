/**
 * Sektör Sayfası Hero Component
 * Brutalist tasarım
 */

import { Link } from 'wouter'

interface SectorHeroProps {
  name: string
  icon: string
  summary: string
  category: 'B2C' | 'B2B'
  paymentTerm: string
}

export function SectorHero({ name, icon, summary, category, paymentTerm }: SectorHeroProps) {
  return (
    <>
      {/* Navigation */}
      <nav className="border-b-2 border-black bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <a className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-blue-600 flex items-center justify-center border-2 border-black">
                <span className="text-white font-black text-2xl">₺</span>
              </div>
              <span className="font-black text-xl">KolayMoney.com</span>
            </a>
          </Link>
          <Link href="/sektorler">
            <a className="px-6 py-2 bg-black text-white font-bold hover:bg-blue-600 transition-colors border-2 border-black">
              ← Tüm Sektörler
            </a>
          </Link>
        </div>
      </nav>

      <section className="bg-white border-b-4 border-black">
        <div className="container mx-auto px-4 py-16">
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2 text-sm">
            <Link href="/" className="hover:underline">
              Ana Sayfa
            </Link>
            <span>/</span>
            <Link href="/sektorler" className="hover:underline">
              Sektörler
            </Link>
            <span>/</span>
            <span className="font-bold">{name}</span>
          </div>

        {/* Hero Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="text-6xl">{icon}</div>
              <div>
                <h1 className="text-4xl md:text-5xl font-black mb-2">{name}</h1>
                <div className="flex gap-3">
                  <span className="px-3 py-1 bg-blue-600 text-white text-sm font-bold">
                    {category}
                  </span>
                  <span className="px-3 py-1 bg-gray-900 text-white text-sm font-bold">
                    Vade: {paymentTerm}
                  </span>
                </div>
              </div>
            </div>
            
            <p className="text-xl leading-relaxed mb-8">{summary}</p>
            
            <div className="flex gap-4">
              <a 
                href="#use-cases" 
                className="px-8 py-4 bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition-colors border-2 border-black"
              >
                Senaryoları İncele
              </a>
              <a 
                href="#calculator" 
                className="px-8 py-4 bg-white text-black font-bold text-lg hover:bg-gray-100 transition-colors border-2 border-black"
              >
                Hesapla
              </a>
            </div>
          </div>

          {/* Right: Quick Stats */}
          <div className="bg-gray-50 border-4 border-black p-8">
            <h3 className="text-2xl font-black mb-6">Hızlı Bilgiler</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b-2 border-gray-300 pb-3">
                <span className="font-bold">Sektör Kategorisi:</span>
                <span className="text-lg">{category === 'B2C' ? 'Tüketici' : 'Kurumsal'}</span>
              </div>
              <div className="flex justify-between items-center border-b-2 border-gray-300 pb-3">
                <span className="font-bold">Ortalama Vade:</span>
                <span className="text-lg">{paymentTerm}</span>
              </div>
              <div className="flex justify-between items-center border-b-2 border-gray-300 pb-3">
                <span className="font-bold">VDMK İskonto:</span>
                <span className="text-lg text-blue-600 font-bold">%35 yıllık</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold">Likidite Süresi:</span>
                <span className="text-lg text-green-600 font-bold">7 gün</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
