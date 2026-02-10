/**
 * Factoring Explained Section
 * White background explaining factoring limitations
 */

import { FINANCIAL_DATA } from '@/lib/config/financialData'

export function FactoringExplained() {
  const limitations = [
    {
      icon: '📊',
      title: 'Bilançoda Borç Olarak Kalır',
      description: 'Alacak devri yapılsa da muhasebe standardına göre borç niteliği taşır'
    },
    {
      icon: '⚠️',
      title: 'Limitler Sınırlıdır',
      description: 'Factoring şirketinin bilançosu ve risk iştahı ile kısıtlıdır'
    },
    {
      icon: '💸',
      title: 'Yüksek Maliyet',
      description: `%${FINANCIAL_DATA.rates.factoring.discountRate.value} faiz + %${FINANCIAL_DATA.rates.factoring.commission.value} komisyon + masraflar ile toplam maliyet çok yüksek`
    },
    {
      icon: '🎯',
      title: 'Risk Yoğunlaşması',
      description: 'Müşteri bazlı değerlendirme, büyük alıcılara bağımlılık yaratır'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-block bg-black text-white px-6 py-2 mb-4 border-2 border-black">
            <span className="font-mono text-sm font-black uppercase tracking-wider">
              FACTORING
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Factoring Nedir?
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed max-w-3xl">
            Factoring, şirketlerin ticari alacaklarını bir factoring şirketine devrederek 
            erken nakde çevirmesidir.
          </p>
        </div>

        {/* Limitations Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {limitations.map((item, index) => (
            <div 
              key={index}
              className="bg-white border-2 border-black p-8 hover:translate-x-1 hover:translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-black mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom Statement */}
        <div className="bg-black text-white p-8 border-2 border-black text-center">
          <p className="text-2xl font-black">
            Factoring, bir <span className="text-blue-600">kredi ürünüdür</span>.
          </p>
        </div>
      </div>
    </section>
  )
}
