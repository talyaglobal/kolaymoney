/**
 * Sektörler Liste Sayfası
 * /sektorler route'u için
 */

import { Link } from 'wouter'
import { getSectorsByCategory } from '@/data/sectors'
import { useSEO } from '@/hooks/useSEO'

export function SectorsListPage() {
  const b2cSectors = getSectorsByCategory('B2C')
  const b2bSectors = getSectorsByCategory('B2B')

  // SEO optimization
  useSEO({
    title: 'Sektörler - VDMK Finansman Çözümleri | KolayMoney',
    description: '10 farklı sektör için özel VDMK finansman çözümleri. Beyaz eşya, elektronik, mobilya, otomotiv, FMCG, inşaat ve daha fazlası.',
    keywords: ['sektörel finansman', 'VDMK sektörler', 'işletme kredisi sektörler', 'beyaz eşya finansman', 'elektronik finansman'],
    canonical: '/sektorler'
  })

  return (
    <div className="min-h-screen bg-white">
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
          <Link href="/">
            <a className="px-6 py-2 bg-black text-white font-bold hover:bg-blue-600 transition-colors border-2 border-black">
              ← Ana Sayfa
            </a>
          </Link>
        </div>
      </nav>

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
            <div className="bg-white border-4 border-black p-6 text-center hover:translate-x-1 hover:translate-y-1 transition-transform">
              <div className="text-4xl font-black mb-2 text-blue-600">10</div>
              <div className="text-sm font-bold text-gray-600">Farklı Sektör</div>
            </div>
            <div className="bg-white border-4 border-black p-6 text-center hover:translate-x-1 hover:translate-y-1 transition-transform">
              <div className="text-4xl font-black mb-2 text-green-600">30+</div>
              <div className="text-sm font-bold text-gray-600">Use Case</div>
            </div>
            <div className="bg-white border-4 border-black p-6 text-center hover:translate-x-1 hover:translate-y-1 transition-transform">
              <div className="text-4xl font-black mb-2 text-orange-600">%35</div>
              <div className="text-sm font-bold text-gray-600">Maliyet Avantajı</div>
            </div>
            <div className="bg-white border-4 border-black p-6 text-center hover:translate-x-1 hover:translate-y-1 transition-transform">
              <div className="text-4xl font-black mb-2 text-purple-600">5-7</div>
              <div className="text-sm font-bold text-gray-600">Gün Süreç</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-black mb-4">Neden Sektöre Özel Çözüm?</h2>
            <p className="text-xl text-gray-600">
              Her sektörün kendine özgü nakit döngüsü, ödeme vadeleri ve finansman ihtiyaçları vardır
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-blue-50 border-4 border-black p-6">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-black mb-3">Özelleştirilmiş Çözümler</h3>
              <p className="text-gray-700">
                Sektörünüzün özel ihtiyaçlarına göre tasarlanmış finansman yapıları. 
                Vade, tutar ve geri ödeme koşulları sektörünüze özel optimize edilir.
              </p>
            </div>

            <div className="bg-green-50 border-4 border-black p-6">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-black mb-3">Hızlı Değerlendirme</h3>
              <p className="text-gray-700">
                Sektör uzmanlığımız sayesinde başvurunuz 24 saat içinde değerlendirilir. 
                5-7 gün içinde finansman sağlanır.
              </p>
            </div>

            <div className="bg-orange-50 border-4 border-black p-6">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-black mb-3">Rekabetçi Maliyetler</h3>
              <p className="text-gray-700">
                Sektör bazlı risk değerlendirmesi ile en uygun maliyetli finansman. 
                Banka kredilerine göre %20-35 daha avantajlı.
              </p>
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
              <div 
                key={sector.slug}
                className="bg-white border-4 border-black hover:translate-x-2 hover:translate-y-2 transition-transform h-full"
              >
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
                  
                  <div className="pt-4 border-t-2 border-gray-200 space-y-3">
                    <a
                      href={`/sektor/${sector.slug}/basvuru`}
                      className="block w-full px-4 py-3 bg-[#0047FF] text-white text-center font-bold hover:bg-blue-700 transition-colors border-2 border-black mono-text"
                    >
                      {sector.icon} Başvuru Yap
                    </a>
                    <Link href={`/sektor/${sector.slug}`}>
                      <a className="block w-full px-4 py-3 bg-white text-blue-600 text-center font-bold hover:bg-gray-50 transition-colors border-2 border-black mono-text">
                        Detayları Gör →
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
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
              <div 
                key={sector.slug}
                className="bg-white border-4 border-black hover:translate-x-2 hover:translate-y-2 transition-transform h-full"
              >
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
                  
                  <div className="pt-4 border-t-2 border-gray-200 space-y-3">
                    <a
                      href={`/sektor/${sector.slug}/basvuru`}
                      className="block w-full px-4 py-3 bg-[#0047FF] text-white text-center font-bold hover:bg-blue-700 transition-colors border-2 border-black mono-text"
                    >
                      {sector.icon} Başvuru Yap
                    </a>
                    <Link href={`/sektor/${sector.slug}`}>
                      <a className="block w-full px-4 py-3 bg-white text-gray-900 text-center font-bold hover:bg-gray-50 transition-colors border-2 border-black mono-text">
                        Detayları Gör →
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-black mb-4">Nasıl Çalışır?</h2>
            <p className="text-xl text-gray-600">
              Sektörünüze özel VDMK finansmanı 4 basit adımda
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-white border-4 border-black p-6 text-center">
              <div className="w-16 h-16 bg-blue-600 text-white text-3xl font-black flex items-center justify-center mx-auto mb-4 border-2 border-black">
                1
              </div>
              <h3 className="text-lg font-black mb-2">Sektör Seçin</h3>
              <p className="text-sm text-gray-600">
                Sektörünüzü seçin ve özel use case'leri inceleyin
              </p>
            </div>

            <div className="bg-white border-4 border-black p-6 text-center">
              <div className="w-16 h-16 bg-green-600 text-white text-3xl font-black flex items-center justify-center mx-auto mb-4 border-2 border-black">
                2
              </div>
              <h3 className="text-lg font-black mb-2">Başvuru Yapın</h3>
              <p className="text-sm text-gray-600">
                Online formu doldurun, 5 dakika sürer
              </p>
            </div>

            <div className="bg-white border-4 border-black p-6 text-center">
              <div className="w-16 h-16 bg-orange-600 text-white text-3xl font-black flex items-center justify-center mx-auto mb-4 border-2 border-black">
                3
              </div>
              <h3 className="text-lg font-black mb-2">Değerlendirme</h3>
              <p className="text-sm text-gray-600">
                24 saat içinde ön değerlendirme sonucu
              </p>
            </div>

            <div className="bg-white border-4 border-black p-6 text-center">
              <div className="w-16 h-16 bg-purple-600 text-white text-3xl font-black flex items-center justify-center mx-auto mb-4 border-2 border-black">
                4
              </div>
              <h3 className="text-lg font-black mb-2">Finansman</h3>
              <p className="text-sm text-gray-600">
                5-7 gün içinde hesabınızda nakit
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-black mb-4">Başarı Hikayeleri</h2>
            <p className="text-xl text-gray-600">
              Farklı sektörlerden işletmeler VDMK ile nasıl büyüdü?
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white border-4 border-black p-6">
              <div className="text-3xl mb-4">🏪</div>
              <div className="text-sm font-bold text-blue-600 mb-2">ELEKTRONİK PERAKENDE</div>
              <h3 className="text-xl font-black mb-3">50M TL VDMK</h3>
              <p className="text-gray-700 mb-4">
                Taksitli satışlardan kaynaklanan alacakları 5 gün içinde nakde çevirerek 
                5 yeni mağaza açtı.
              </p>
              <div className="pt-4 border-t-2 border-gray-200">
                <div className="text-sm font-bold text-green-600">%35 Ciro Artışı</div>
              </div>
            </div>

            <div className="bg-white border-4 border-black p-6">
              <div className="text-3xl mb-4">🏭</div>
              <div className="text-sm font-bold text-blue-600 mb-2">MOBİLYA ÜRETİCİ</div>
              <h3 className="text-xl font-black mb-3">25M TL VDMK</h3>
              <p className="text-gray-700 mb-4">
                Stok finansmanı ile üretim kapasitesini artırdı ve yeni ihracat 
                pazarlarına girdi.
              </p>
              <div className="pt-4 border-t-2 border-gray-200">
                <div className="text-sm font-bold text-green-600">%40 Üretim Artışı</div>
              </div>
            </div>

            <div className="bg-white border-4 border-black p-6">
              <div className="text-3xl mb-4">🚚</div>
              <div className="text-sm font-bold text-blue-600 mb-2">FMCG DISTRIBÜTÖR</div>
              <h3 className="text-xl font-black mb-3">35M TL VDMK</h3>
              <p className="text-gray-700 mb-4">
                Alacak finansmanı ile nakit akışını optimize etti ve yeni ürün 
                grupları ekledi.
              </p>
              <div className="pt-4 border-t-2 border-gray-200">
                <div className="text-sm font-bold text-green-600">%25 Büyüme</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-black mb-8 text-center">Sık Sorulan Sorular</h2>
            
            <div className="space-y-4">
              <div className="bg-white border-4 border-black p-6">
                <h3 className="text-xl font-black mb-3">Hangi sektörler VDMK'dan yararlanabilir?</h3>
                <p className="text-gray-700">
                  Düzenli alacak veya stok döngüsü olan tüm sektörler VDMK'dan yararlanabilir. 
                  Özellikle perakende, üretim, distribütör ve hizmet sektörleri için idealdir.
                </p>
              </div>

              <div className="bg-white border-4 border-black p-6">
                <h3 className="text-xl font-black mb-3">Minimum başvuru tutarı nedir?</h3>
                <p className="text-gray-700">
                  Minimum 5M TL yıllık cirosu olan işletmeler başvurabilir. VDMK tutarı 
                  genellikle 5M TL ile 100M+ TL arasında değişir.
                </p>
              </div>

              <div className="bg-white border-4 border-black p-6">
                <h3 className="text-xl font-black mb-3">Süreç ne kadar sürer?</h3>
                <p className="text-gray-700">
                  Başvurudan finansmana kadar ortalama 5-7 gün sürer. Ön değerlendirme 24 saat 
                  içinde tamamlanır. Acil durumlar için hızlandırılmış süreç uygulanabilir.
                </p>
              </div>

              <div className="bg-white border-4 border-black p-6">
                <h3 className="text-xl font-black mb-3">Maliyetler nasıl belirlenir?</h3>
                <p className="text-gray-700">
                  Maliyetler sektör, alacak kalitesi ve vade süresine göre belirlenir. 
                  Ortalama %1.5-2.5 aylık faiz oranı uygulanır, banka kredilerine göre 
                  %20-35 daha avantajlıdır.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white border-t-4 border-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-black mb-6">
            Sektörünüz İçin Hemen Başvurun
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Sektörünüze özel VDMK finansman çözümü için bugün başvurun. 
            24 saat içinde ön değerlendirme sonucunu alın.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/basvuru-yeni">
              <a className="inline-block px-12 py-5 bg-white text-blue-600 font-bold text-xl hover:bg-gray-100 transition-colors border-4 border-black">
                🚀 Hemen Başvur
              </a>
            </Link>
            <a 
              href="/#contact"
              className="inline-block px-12 py-5 bg-transparent text-white font-bold text-xl hover:bg-blue-700 transition-colors border-4 border-white"
            >
              📞 Sizi Arayalım
            </a>
          </div>
          <p className="text-sm mt-6 opacity-90">
            Sektörünüz listede yok mu? VDMK her sektöre uygulanabilir. Bizimle iletişime geçin.
          </p>
        </div>
      </section>
    </div>
  )
}
