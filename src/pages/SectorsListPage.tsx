/**
 * Sektörler Liste Sayfası
 * /sektorler route'u için
 */

import { Link } from 'wouter'
import { getSectorsByCategory } from '@/data/sectors'
import { useEffect } from 'react'

export function SectorsListPage() {
  const b2cSectors = getSectorsByCategory('B2C')
  const b2bSectors = getSectorsByCategory('B2B')

  useEffect(() => {
    document.title = 'Sektörel VDMK Finansman Çözümleri | KolayMoney'
    
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        '10 farklı sektör için özelleştirilmiş VDMK finansman çözümleri. Gerçek senaryolar, hesaplamalar ve ROI örnekleri.'
      )
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-blue-600 text-white py-20 border-b-4 border-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-6">
              Sektörel VDMK Finansman Çözümleri
            </h1>
            <p className="text-2xl mb-8">
              Her sektörün kendine özgü nakit döngüsü ve finansman ihtiyacı var. 
              Sektörünüze özel çözümleri keşfedin.
            </p>
            <div className="flex gap-4 justify-center">
              <a 
                href="#b2c"
                className="px-8 py-4 bg-white text-blue-600 font-bold text-lg hover:bg-gray-100 transition-colors border-2 border-black"
              >
                B2C Sektörler
              </a>
              <a 
                href="#b2b"
                className="px-8 py-4 bg-transparent text-white font-bold text-lg hover:bg-blue-700 transition-colors border-2 border-white"
              >
                B2B Sektörler
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-white border-4 border-black p-6 text-center">
              <div className="text-4xl font-black mb-2">10</div>
              <div className="text-sm font-bold text-gray-600">Sektör</div>
            </div>
            <div className="bg-white border-4 border-black p-6 text-center">
              <div className="text-4xl font-black mb-2">30</div>
              <div className="text-sm font-bold text-gray-600">Use Case</div>
            </div>
            <div className="bg-white border-4 border-black p-6 text-center">
              <div className="text-4xl font-black mb-2">%35</div>
              <div className="text-sm font-bold text-gray-600">İskonto</div>
            </div>
            <div className="bg-white border-4 border-black p-6 text-center">
              <div className="text-4xl font-black mb-2">7 Gün</div>
              <div className="text-sm font-bold text-gray-600">Likidite</div>
            </div>
          </div>
        </div>
      </section>

      {/* B2C Sectors */}
      <section id="b2c" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-4xl font-black mb-4">B2C Sektörler</h2>
            <p className="text-xl text-gray-600">
              Tüketici odaklı perakende ve e-ticaret sektörleri
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {b2cSectors.map((sector) => (
              <Link 
                key={sector.slug} 
                href={`/sektor/${sector.slug}`}
                className="block"
              >
                <div className="bg-white border-4 border-black hover:translate-x-2 hover:translate-y-2 transition-transform cursor-pointer h-full">
                  <div className="bg-blue-600 text-white p-6 border-b-4 border-black">
                    <div className="text-5xl mb-3">{sector.icon}</div>
                    <h3 className="text-2xl font-black">{sector.name}</h3>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-4">
                      <div className="text-sm font-bold text-gray-600 mb-2">
                        ORTALAMA VADE
                      </div>
                      <div className="text-xl font-bold">{sector.paymentTerm}</div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="text-sm font-bold text-gray-600 mb-2">
                        USE CASE SAYISI
                      </div>
                      <div className="text-xl font-bold">{sector.useCases.length} Senaryo</div>
                    </div>
                    
                    <div className="pt-4 border-t-2 border-gray-200">
                      <div className="font-bold text-blue-600 flex items-center gap-2">
                        Detayları Gör
                        <span>→</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* B2B Sectors */}
      <section id="b2b" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-4xl font-black mb-4">B2B Sektörler</h2>
            <p className="text-xl text-gray-600">
              Kurumsal satış ve distribüsyon sektörleri
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {b2bSectors.map((sector) => (
              <Link 
                key={sector.slug} 
                href={`/sektor/${sector.slug}`}
                className="block"
              >
                <div className="bg-white border-4 border-black hover:translate-x-2 hover:translate-y-2 transition-transform cursor-pointer h-full">
                  <div className="bg-gray-900 text-white p-6 border-b-4 border-black">
                    <div className="text-5xl mb-3">{sector.icon}</div>
                    <h3 className="text-2xl font-black">{sector.name}</h3>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-4">
                      <div className="text-sm font-bold text-gray-600 mb-2">
                        ORTALAMA VADE
                      </div>
                      <div className="text-xl font-bold">{sector.paymentTerm}</div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="text-sm font-bold text-gray-600 mb-2">
                        USE CASE SAYISI
                      </div>
                      <div className="text-xl font-bold">{sector.useCases.length} Senaryo</div>
                    </div>
                    
                    <div className="pt-4 border-t-2 border-gray-200">
                      <div className="font-bold text-gray-900 flex items-center gap-2">
                        Detayları Gör
                        <span>→</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white border-t-4 border-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-black mb-6">
            Sektörünüz Listede Yok mu?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            VDMK finansmanı her sektöre uygulanabilir. Özel durumunuz için 
            bizimle iletişime geçin, size özel çözüm üretelim.
          </p>
          <a 
            href="/#references"
            className="inline-block px-12 py-5 bg-white text-blue-600 font-bold text-xl hover:bg-gray-100 transition-colors border-4 border-black"
          >
            📞 Sizi Arayalım
          </a>
        </div>
      </section>
    </div>
  )
}
