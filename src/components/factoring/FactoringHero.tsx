/**
 * Factoring Hero Section
 * Black background with comparison introduction
 */

export function FactoringHero() {
  return (
    <section className="bg-black text-white py-24 border-b-4 border-black">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-block bg-blue-600 text-white px-6 py-2 mb-6 border-2 border-blue-600">
            <span className="font-mono text-sm font-black uppercase tracking-wider">
              KARŞILAŞTIRMA
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-none">
            Factoring mi,<br />
            Sermaye Piyasası<br />
            Finansmanı mı?
          </h1>

          {/* Subheading */}
          <div className="text-2xl md:text-3xl font-black text-blue-600 mb-8">
            Kolaymoney Farkı
          </div>

          {/* Hero Description */}
          <div className="text-xl md:text-2xl text-gray-300 leading-relaxed space-y-4">
            <p>
              Şirketlerin nakit akışı problemi aynı, çözümler ise çok farklı.
            </p>
            <p>
              <span className="text-white font-bold">Factoring</span> kısa vadeli bir kredi yaklaşımı sunarken, 
              <span className="text-blue-600 font-bold"> Kolaymoney VDMK modeli</span>, ticari alacakları 
              <span className="text-white font-bold"> bilanço dışı, ölçeklenebilir ve yatırımcı tabanlı</span> bir 
              finansman aracına dönüştürür.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mt-12">
            <div className="border-2 border-blue-600 p-4 bg-black hover:bg-blue-600 hover:text-black transition-colors">
              <div className="text-blue-600 font-mono text-3xl font-black mb-2 group-hover:text-black">0</div>
              <div className="text-sm uppercase tracking-wider">Bilanço Borcu</div>
            </div>
            <div className="border-2 border-white p-4 bg-black hover:bg-white hover:text-black transition-colors">
              <div className="text-white font-mono text-3xl font-black mb-2">∞</div>
              <div className="text-sm uppercase tracking-wider">Ölçeklenebilirlik</div>
            </div>
            <div className="border-2 border-blue-600 p-4 bg-black hover:bg-blue-600 hover:text-black transition-colors">
              <div className="text-blue-600 font-mono text-3xl font-black mb-2">SPK</div>
              <div className="text-sm uppercase tracking-wider">Düzenleme</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
