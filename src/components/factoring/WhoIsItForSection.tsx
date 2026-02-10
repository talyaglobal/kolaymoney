/**
 * Who Is It For Section
 * White background with target audience
 */

import { Link } from 'wouter'

export function WhoIsItForSection() {
  const targetAudiences = [
    {
      icon: '📈',
      title: 'Yüksek Hacimli Vadeli Satış',
      description: 'Aylık 5M TL+ taksitli/vadeli satış yapan şirketler',
      examples: ['Perakende zincirleri', 'E-ticaret platformları', 'Distribütörler']
    },
    {
      icon: '💳',
      title: 'BNPL & Taksit Modelleri',
      description: 'Taksitli satış, BNPL veya bayi ağı olan firmalar',
      examples: ['Elektronik perakende', 'Mobilya mağazaları', 'Beyaz eşya']
    },
    {
      icon: '🚫',
      title: 'Factoring Limitine Takılanlar',
      description: 'Mevcut factoring limitleri büyümeyi kısıtlayan CFO\'lar',
      examples: ['Büyüyen KOBİ\'ler', 'Yüksek ciro artışı olan firmalar']
    },
    {
      icon: '🏛️',
      title: 'Sermaye Piyasası Erişimi',
      description: 'Yatırımcı erişimi ve alternatif finansman arayan şirketler',
      examples: ['Kurumsal firmalar', 'Scale-up aşamasındaki şirketler']
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-black text-white px-6 py-2 mb-4 border-2 border-black">
            <span className="font-mono text-sm font-black uppercase tracking-wider">
              HEDEF KİTLE
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Kimler İçin Uygun?
          </h2>
        </div>

        {/* Audience Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {targetAudiences.map((audience, index) => (
            <div 
              key={index}
              className="bg-white border-2 border-black p-8 hover:translate-x-1 hover:translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
            >
              {/* Icon */}
              <div className="text-5xl mb-4">{audience.icon}</div>
              
              {/* Title */}
              <h3 className="text-2xl font-black mb-3">
                {audience.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-700 mb-4 leading-relaxed">
                {audience.description}
              </p>
              
              {/* Examples */}
              <div className="space-y-2">
                <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Örnekler:
                </div>
                {audience.examples.map((example, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-blue-600 font-black">→</span>
                    <span className="text-sm">{example}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Box */}
        <div className="mt-12 bg-black text-white p-8 border-2 border-black text-center">
          <p className="text-xl md:text-2xl mb-6">
            <span className="font-black">Factoring limitleriniz doldu mu?</span><br />
            <span className="text-gray-300">Kolaymoney ile ölçeklenebilir finansmana geçin.</span>
          </p>
          <Link href="/basvuru-yeni">
            <a className="inline-block bg-blue-600 text-white px-8 py-4 font-black text-lg border-2 border-blue-600 hover:bg-white hover:text-blue-600 transition-all duration-200 uppercase tracking-wider">
              Uygunluk Değerlendirmesi Al →
            </a>
          </Link>
        </div>
      </div>
    </section>
  )
}
