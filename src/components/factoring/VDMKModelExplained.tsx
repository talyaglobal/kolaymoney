/**
 * VDMK Model Explained Section
 * Black background explaining VDMK benefits
 */

export function VDMKModelExplained() {
  const benefits = [
    {
      icon: '📈',
      title: 'Bilanço Dışı',
      description: 'Alacakları şirket bilançosundan çıkarır, borçluluk oranlarını bozmaz'
    },
    {
      icon: '⚖️',
      title: 'Varlık Satışı',
      description: 'Borç değil, gerçek satış niteliğindedir (SPK düzenlemesi)'
    },
    {
      icon: '👥',
      title: 'Yatırımcı Havuzu',
      description: 'Finansman kaynağı banka değil, sermaye piyasası yatırımcılarıdır'
    },
    {
      icon: '♾️',
      title: 'Ölçeklenebilir',
      description: 'Tekrarlanabilir yapı, büyüyen ihtiyaçlara uyum sağlar'
    }
  ]

  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-block bg-blue-600 text-white px-6 py-2 mb-4 border-2 border-blue-600">
            <span className="font-mono text-sm font-black uppercase tracking-wider">
              KOLAYMONEY VDMK
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            VDMK Modeli Nedir?
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
            Kolaymoney, ticari alacakları <span className="text-blue-600 font-bold">SPK onaylı 
            Varlık Finansmanı Fonları</span> üzerinden sermaye piyasalarına taşır.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {benefits.map((item, index) => (
            <div 
              key={index}
              className="bg-white text-black border-2 border-white p-8 hover:translate-x-1 hover:translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,255,255,1)] transition-all duration-200"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-black mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom Statement */}
        <div className="bg-blue-600 text-black p-8 border-2 border-blue-600 text-center">
          <p className="text-2xl font-black">
            Bu bir <span className="underline">sermaye piyasası ürünüdür</span>, kredi değildir.
          </p>
        </div>
      </div>
    </section>
  )
}
