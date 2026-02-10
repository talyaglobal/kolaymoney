/**
 * Factoring'den Çıkış Rehberi
 * Professional guide for CFOs transitioning from factoring to VDMK
 */

import { useEffect } from 'react'
import { Navigation } from '@/components/layout/Navigation'
import { useSEO } from '@/hooks/useSEO'
import { useAnalytics } from '@/contexts/AnalyticsContext'
import { FINANCIAL_DATA } from '@/lib/config/financialData'

export function FactoringTransitionGuidePage() {
  const analytics = useAnalytics()

  useSEO({
    title: 'Factoring\'den Çıkış Rehberi - VDMK\'ya Geçiş | KolayMoney',
    description: 'Factoring limitlerinden kurtulun. Ticari alacaklarınızı bilanço dışı sermaye piyasası finansmanına taşıyın. CFO\'lar için profesyonel geçiş rehberi.',
    keywords: ['factoring alternatifi', 'factoring limiti', 'VDMK geçiş', 'bilanço dışı finansman', 'sermaye piyasası', 'factoring maliyeti'],
    canonical: '/factoring-gecis-rehberi'
  })

  useEffect(() => {
    analytics.trackMenuClick('Factoring Geçiş Rehberi')
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Navigation variant="default" />

      {/* Hero */}
      <section className="bg-black text-white py-20 border-b-4 border-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            Factoring'den Çıkış Rehberi
          </h1>
          <p className="text-2xl text-gray-300">
            Ticari alacaklarınızı borçtan çıkarın, sermaye piyasasına taşıyın
          </p>
        </div>
      </section>

      {/* The Real Problem */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-black mb-8">Gerçek Sorun</h2>
          
          <p className="text-xl text-gray-700 mb-6 leading-relaxed">
            Factoring, başlangıçta pratik bir çözüm gibi görünür. Alacaklarınızı hızla nakde çevirirsiniz, 
            nakit akışınız düzelir. Ancak zaman içinde yapısal bir soruna dönüşür.
          </p>

          <div className="space-y-6">
            <div className="border-l-4 border-red-600 pl-6">
              <h3 className="text-xl font-bold mb-2">Kredi Niteliği</h3>
              <p className="text-gray-700">
                Factoring, hukuki olarak alacak devri olsa da, muhasebe standardı gereği bilançonuzda 
                borç niteliği taşır. Her factoring işlemi, kaldıraç oranlarınızı olumsuz etkiler.
              </p>
            </div>

            <div className="border-l-4 border-red-600 pl-6">
              <h3 className="text-xl font-bold mb-2">Bilanço Baskısı</h3>
              <p className="text-gray-700">
                Cirolarınız büyüdükçe factoring kullanımınız artar. Ancak bu büyüme, finansal 
                oranlarınızı bozar. Denetim raporlarında borç/özsermaye oranı yükselir, yeni 
                finansman almak zorlaşır.
              </p>
            </div>

            <div className="border-l-4 border-red-600 pl-6">
              <h3 className="text-xl font-bold mb-2">Sert Limitler</h3>
              <p className="text-gray-700">
                Factoring şirketinin bilançosu ve risk iştahı, sizin limitinizi belirler. 
                Büyüme potansiyeliniz varken, factoring limiti dolduğu için satış yapamama 
                durumu yaşarsınız.
              </p>
            </div>

            <div className="border-l-4 border-red-600 pl-6">
              <h3 className="text-xl font-bold mb-2">Artan Maliyet</h3>
              <p className="text-gray-700">
                Factoring maliyeti (%{FINANCIAL_DATA.rates.factoring.discountRate.value} + 
                %{FINANCIAL_DATA.rates.factoring.commission.value} komisyon), hacim arttıkça 
                toplam finansman giderinizi önemli ölçüde artırır. Yıllık bazda milyonlarca 
                lira ek maliyet demektir.
              </p>
            </div>

            <div className="border-l-4 border-red-600 pl-6">
              <h3 className="text-xl font-bold mb-2">Tek Finansör Bağımlılığı</h3>
              <p className="text-gray-700">
                Tüm alacak portföyünüz tek bir factoring şirketine bağlıdır. Bu şirketin 
                politika değişikliği, limit düşürmesi veya faiz artırımı, doğrudan sizin 
                operasyonunuzu etkiler.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Not Scalable */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-black mb-8">Factoring Neden Ölçeklenemez?</h2>

          <div className="bg-white border-4 border-black p-8 mb-6">
            <h3 className="text-2xl font-bold mb-4">Limitler Büyümeyi Takip Etmez</h3>
            <p className="text-gray-700 mb-4">
              Cirolarınız %50 büyüdüğünde, factoring limitiniz aynı oranda artmaz. 
              Factoring şirketi kendi bilançosuna, sermaye yeterliliğine ve risk politikalarına 
              bakar. Sizin büyüme planınız onların önceliği değildir.
            </p>
            <p className="text-gray-700">
              <strong>Sonuç:</strong> Büyüme fırsatlarını kaçırırsınız veya pahalı alternatif 
              finansman kaynaklarına yönelirsiniz.
            </p>
          </div>

          <div className="bg-white border-4 border-black p-8 mb-6">
            <h3 className="text-2xl font-bold mb-4">Maliyet Hacimle Artar</h3>
            <p className="text-gray-700 mb-4">
              Factoring maliyeti sabit değildir. Kullandığınız hacim arttıkça, toplam 
              finansman gideriniz katlanarak büyür. 10M TL factoring ile 100M TL factoring 
              arasında sadece 10 kat fark yoktur; maliyet yapısı da değişir.
            </p>
            <p className="text-gray-700">
              <strong>Sonuç:</strong> Karlılığınız düşer, rekabet gücünüz azalır.
            </p>
          </div>

          <div className="bg-white border-4 border-black p-8">
            <h3 className="text-2xl font-bold mb-4">Altyapı Değil, Geçici Çözüm</h3>
            <p className="text-gray-700 mb-4">
              Factoring, bir finansman altyapısı değildir. Kısa vadeli bir nakit akışı 
              çözümüdür. Şirketiniz büyüdükçe, daha yapısal, daha ölçeklenebilir, daha 
              kurumsal bir finansman modeline ihtiyaç duyarsınız.
            </p>
            <p className="text-gray-700">
              <strong>Sonuç:</strong> Factoring, orta-büyük ölçekli şirketler için sürdürülebilir değildir.
            </p>
          </div>
        </div>
      </section>

      {/* What Replaces Factoring */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-black mb-8">Factoring'in Yerini Ne Alır?</h2>

          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Kolaymoney'nin VDMK (Varlığa Dayalı Menkul Kıymet) modeli, factoring'i tamamlamaz. 
            Onun yerini alır. Çünkü VDMK, factoring'den yapısal olarak farklıdır.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 border-4 border-black p-6">
              <h3 className="text-xl font-bold mb-3">Kredi Değil</h3>
              <p className="text-gray-700">
                VDMK, menkul kıymetleştirme işlemidir. Bilançonuzda borç olarak görünmez. 
                Kaldıraç oranlarınızı bozmaz. Denetim raporlarınızda finansal sağlığınızı 
                korur.
              </p>
            </div>

            <div className="bg-blue-50 border-4 border-black p-6">
              <h3 className="text-xl font-bold mb-3">Bilanço Dışı</h3>
              <p className="text-gray-700">
                Alacaklarınız SPV (Özel Amaçlı Kuruluş) yapısına devredilir. Bu yapı, 
                sizin bilançonuzdan bağımsızdır. Büyüme planlarınız, finansal oranlarınızdan 
                etkilenmez.
              </p>
            </div>

            <div className="bg-blue-50 border-4 border-black p-6">
              <h3 className="text-xl font-bold mb-3">Yatırımcı Fonlu</h3>
              <p className="text-gray-700">
                Finansman kaynağınız, tek bir factoring şirketi değil, sermaye piyasası 
                yatırımcılarıdır. Kurumsal yatırımcılar, portföyünüzü değerlendirir ve 
                finansman sağlar.
              </p>
            </div>

            <div className="bg-blue-50 border-4 border-black p-6">
              <h3 className="text-xl font-bold mb-3">SPK Denetimli</h3>
              <p className="text-gray-700">
                VDMK, Sermaye Piyasası Kurulu düzenlemelerine tabidir. Şeffaflık, bağımsız 
                denetim ve yatırımcı koruması standartları yüksektir. Kurumsal bir yapıdır.
              </p>
            </div>

            <div className="bg-blue-50 border-4 border-black p-6">
              <h3 className="text-xl font-bold mb-3">Alacakla Ölçeklenir</h3>
              <p className="text-gray-700">
                Limitiniz, factoring şirketinin bilançosu ile değil, sizin alacak 
                portföyünüzün kalitesi ve büyüklüğü ile belirlenir. Büyüdükçe, finansman 
                kapasiteniz de büyür.
              </p>
            </div>

            <div className="bg-blue-50 border-4 border-black p-6">
              <h3 className="text-xl font-bold mb-3">Düşük Maliyet</h3>
              <p className="text-gray-700">
                VDMK maliyeti (%{FINANCIAL_DATA.rates.vdmk.discountRate.value} + 
                %{FINANCIAL_DATA.rates.vdmk.commission.value} komisyon), factoring'e göre 
                önemli ölçüde düşüktür. Yıllık bazda milyonlarca lira tasarruf sağlar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Exit Path */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-black mb-8">Çıkış Yolu: 4 Adım</h2>

          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Factoring'den VDMK'ya geçiş, ani bir değişiklik değildir. Kontrollü, 
            aşamalı bir dönüşümdür. İşte adım adım süreç:
          </p>

          <div className="space-y-8">
            {/* Step 1 */}
            <div className="bg-white text-black border-4 border-white p-8">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-blue-600 text-white text-3xl font-black flex items-center justify-center border-2 border-black">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-black mb-3">Alacak Uygunluğu & Veri İncelemesi</h3>
                  <p className="text-gray-700 mb-4">
                    Mevcut alacak portföyünüz analiz edilir. Hangi alacaklar VDMK'ya uygun? 
                    Müşteri kalitesi, vade yapısı, tahsilat performansı değerlendirilir.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>Alacak portföyü büyüklüğü ve dağılımı</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>Müşteri bazlı risk analizi</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>Vade yapısı ve tahsilat geçmişi</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>Sektörel ve coğrafi çeşitlendirme</span>
                    </li>
                  </ul>
                  <p className="text-sm text-gray-500 mt-4">Süre: 3-5 gün</p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white text-black border-4 border-white p-8">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-green-600 text-white text-3xl font-black flex items-center justify-center border-2 border-black">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-black mb-3">Portföy Yapılandırma & Çeşitlendirme</h3>
                  <p className="text-gray-700 mb-4">
                    VDMK için optimal portföy oluşturulur. Risk dağılımı, vade dengesi ve 
                    tahsilat projeksiyonu optimize edilir.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span>Alacak havuzunun oluşturulması</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span>Risk ağırlıklı portföy tasarımı</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span>Nakit akışı modellemesi</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span>Yatırımcı sunumu hazırlığı</span>
                    </li>
                  </ul>
                  <p className="text-sm text-gray-500 mt-4">Süre: 5-7 gün</p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white text-black border-4 border-white p-8">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-orange-600 text-white text-3xl font-black flex items-center justify-center border-2 border-black">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-black mb-3">VFF Kurulumu & VDMK İhracı</h3>
                  <p className="text-gray-700 mb-4">
                    Varlık Finansmanı Fonu (VFF) yapısı kurulur. SPK onayları alınır. 
                    VDMK ihraç edilir ve yatırımcılara satılır.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold">•</span>
                      <span>VFF kurulum ve SPK başvurusu</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold">•</span>
                      <span>Bağımsız denetim ve değerleme</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold">•</span>
                      <span>VDMK ihraç ve yatırımcı yerleştirme</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold">•</span>
                      <span>Nakit transferi ve operasyon başlangıcı</span>
                    </li>
                  </ul>
                  <p className="text-sm text-gray-500 mt-4">Süre: 10-15 gün</p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white text-black border-4 border-white p-8">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-purple-600 text-white text-3xl font-black flex items-center justify-center border-2 border-black">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-black mb-3">Factoring Kullanımının Kademeli Azaltılması</h3>
                  <p className="text-gray-700 mb-4">
                    VDMK devreye girdikçe, factoring kullanımınız azaltılır. Yeni alacaklar 
                    VDMK portföyüne eklenir. Mevcut factoring sözleşmeleri kademeli olarak 
                    sonlandırılır.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span>İlk VDMK ihracı ile factoring %30-50 azaltılır</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span>İkinci ihraç ile factoring tamamen sonlandırılır</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span>VDMK, sürekli dönen bir finansman altyapısı haline gelir</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span>Bilançonuzda borç azalır, finansal oranlar iyileşir</span>
                    </li>
                  </ul>
                  <p className="text-sm text-gray-500 mt-4">Süre: 3-6 ay (kademeli)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-blue-600 border-4 border-white p-8 text-center">
            <p className="text-2xl font-black">
              Toplam Geçiş Süresi: 1-2 Ay (İlk İhraç)
            </p>
            <p className="text-lg text-gray-200 mt-2">
              Tam geçiş 3-6 ayda tamamlanır
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-black mb-12 text-center">Factoring vs Kolaymoney (VDMK)</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-4 border-black">
              <thead>
                <tr className="bg-black text-white">
                  <th className="border-2 border-white p-4 text-left font-black">Kriter</th>
                  <th className="border-2 border-white p-4 text-center font-black">Factoring</th>
                  <th className="border-2 border-white p-4 text-center font-black bg-blue-600">Kolaymoney (VDMK)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border-2 border-black p-4 font-bold">Hukuki Nitelik</td>
                  <td className="border-2 border-black p-4 text-center bg-red-50">Kredi / Alacak Temliki</td>
                  <td className="border-2 border-black p-4 text-center bg-blue-50 font-bold">Menkul Kıymetleştirme</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-black p-4 font-bold">Bilanço Etkisi</td>
                  <td className="border-2 border-black p-4 text-center bg-red-50">Borç Artar</td>
                  <td className="border-2 border-black p-4 text-center bg-blue-50 font-bold">Bilanço Dışı</td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-black p-4 font-bold">Finansman Kaynağı</td>
                  <td className="border-2 border-black p-4 text-center bg-red-50">Factoring Şirketi</td>
                  <td className="border-2 border-black p-4 text-center bg-blue-50 font-bold">Sermaye Piyasası Yatırımcıları</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-black p-4 font-bold">Ölçeklenebilirlik</td>
                  <td className="border-2 border-black p-4 text-center bg-red-50">Sınırlı (Şirket Limiti)</td>
                  <td className="border-2 border-black p-4 text-center bg-blue-50 font-bold">Yüksek (Alacak Portföyü ile)</td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-black p-4 font-bold">Maliyet</td>
                  <td className="border-2 border-black p-4 text-center bg-red-50">%{FINANCIAL_DATA.rates.factoring.discountRate.value} + %{FINANCIAL_DATA.rates.factoring.commission.value}</td>
                  <td className="border-2 border-black p-4 text-center bg-blue-50 font-bold">%{FINANCIAL_DATA.rates.vdmk.discountRate.value} + %{FINANCIAL_DATA.rates.vdmk.commission.value}</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-black p-4 font-bold">Denetim</td>
                  <td className="border-2 border-black p-4 text-center bg-red-50">Şirket İçi</td>
                  <td className="border-2 border-black p-4 text-center bg-blue-50 font-bold">SPK + Bağımsız Denetim</td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-black p-4 font-bold">Uzun Vadeli Uygunluk</td>
                  <td className="border-2 border-black p-4 text-center bg-red-50">Geçici Çözüm</td>
                  <td className="border-2 border-black p-4 text-center bg-blue-50 font-bold">Kalıcı Altyapı</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-black p-4 font-bold">Yatırımcı Çeşitliliği</td>
                  <td className="border-2 border-black p-4 text-center bg-red-50">Tek Kaynak</td>
                  <td className="border-2 border-black p-4 text-center bg-blue-50 font-bold">Çoklu Yatırımcı</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Who Should Escape */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-black mb-8">Factoring'den Şimdi Çıkmalısınız</h2>

          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Aşağıdaki sinyallerden birini veya birkaçını yaşıyorsanız, factoring artık 
            sürdürülebilir bir çözüm değildir:
          </p>

          <div className="space-y-4">
            <div className="bg-white border-4 border-black p-6">
              <h3 className="text-xl font-bold mb-2">Aylık Factoring Hacmi Hızla Büyüyor</h3>
              <p className="text-gray-700">
                Cirolarınız artıyor, factoring kullanımınız da artıyor. Ancak bu büyüme, 
                finansal oranlarınızı bozuyor. Denetim raporlarında borç/özsermaye oranı 
                yükseliyor.
              </p>
            </div>

            <div className="bg-white border-4 border-black p-6">
              <h3 className="text-xl font-bold mb-2">Borç Oranları Denetimlerde Görünür Hale Geldi</h3>
              <p className="text-gray-700">
                Bağımsız denetim raporlarında, factoring kullanımınız borç olarak 
                sınıflandırılıyor. Bu durum, yeni finansman almayı zorlaştırıyor veya 
                mevcut kredilerinizin koşullarını olumsuz etkiliyor.
              </p>
            </div>

            <div className="bg-white border-4 border-black p-6">
              <h3 className="text-xl font-bold mb-2">Factoring Limitleri Satış Büyümesini Engelliyor</h3>
              <p className="text-gray-700">
                Büyük siparişler alıyorsunuz, ancak factoring limitiniz dolduğu için bu 
                siparişleri finanse edemiyorsunuz. Büyüme fırsatlarını kaçırıyorsunuz.
              </p>
            </div>

            <div className="bg-white border-4 border-black p-6">
              <h3 className="text-xl font-bold mb-2">Sürekli Yeniden Müzakere Ediyorsunuz</h3>
              <p className="text-gray-700">
                Her 3-6 ayda bir factoring şirketi ile limit artırımı, faiz indirimi veya 
                koşul değişikliği için müzakere ediyorsunuz. Bu süreç zaman alıyor ve 
                belirsizlik yaratıyor.
              </p>
            </div>

            <div className="bg-white border-4 border-black p-6">
              <h3 className="text-xl font-bold mb-2">Maliyet Karlılığınızı Düşürüyor</h3>
              <p className="text-gray-700">
                Factoring maliyeti, yıllık bazda milyonlarca lira. Bu maliyet, net 
                karlılığınızı önemli ölçüde azaltıyor. Daha düşük maliyetli bir finansman 
                modeline ihtiyacınız var.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-8">
            Factoring Bir Geçici Çözümdür.<br />
            Sermaye Piyasası İse Kalıcı Bir Altyapıdır.
          </h2>

          <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
            Kolaymoney ile VDMK'ya geçiş yapmak, sadece maliyet tasarrufu değildir. 
            Şirketinizin finansman altyapısını, büyüme stratejinize uygun hale getirmektir.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <a
              href="/basvuru-yeni"
              className="inline-block px-12 py-5 bg-blue-600 text-white font-black text-xl border-4 border-white hover:bg-blue-700 transition-colors uppercase"
            >
              Gizli Değerlendirme Başlat
            </a>
            <a
              href="/#contact"
              className="inline-block px-12 py-5 bg-transparent text-white font-black text-xl border-4 border-white hover:bg-white hover:text-black transition-colors uppercase"
            >
              CFO Görüşmesi Talep Et
            </a>
          </div>

          <div className="border-t-2 border-white/20 pt-8">
            <p className="text-gray-400 text-sm">
              Tüm değerlendirmeler gizlidir. Factoring şirketiniz bilgilendirilmez.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
