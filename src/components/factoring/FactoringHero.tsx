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
            Faktoring mi,<br />
            Sermaye Piyasası<br />
            Finansmanı mı?
          </h1>

          {/* Subheading */}
          <div className="text-2xl md:text-3xl font-black text-blue-600 mb-8">
            Kolaymoney Farkı
          </div>

          {/* Hero Description */}
          <div className="text-xl md:text-2xl text-gray-300 leading-relaxed space-y-4 mb-12">
            <p>
              Şirketlerin nakit akışı problemi aynı, çözümler ise çok farklı.
            </p>
            <p>
              <span className="text-white font-bold">Faktoring</span> yüksek maliyetli
              (%50 iskonto + %1.5 komisyon) ve peşin kesintili bir kredi yaklaşımıdır.
            </p>
            <p>
              <span className="text-blue-600 font-bold">Kolaymoney VDMK modeli</span>
              (%46 iskonto + %0.5 komisyon), alacağınızın{' '}
              <span className="text-white font-bold">%100&apos;ünü nakit olarak verir</span>,
              maliyet vade sonunda ödenir,{' '}
              <span className="text-white font-bold">bilanço dışı kalır</span> ve{' '}
              <span className="text-white font-bold">ölçeklenebilir</span>dir.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="border-2 border-blue-600 p-4">
              <div className="text-blue-600 font-mono text-3xl font-black mb-2">%100</div>
              <div className="text-sm uppercase tracking-wider">Nakit Girişi</div>
              <div className="text-xs text-gray-400 mt-1">Kesinti yok</div>
            </div>
            <div className="border-2 border-white p-4">
              <div className="text-white font-mono text-3xl font-black mb-2">%14</div>
              <div className="text-sm uppercase tracking-wider">Daha Ucuz</div>
              <div className="text-xs text-gray-400 mt-1">Faktoring&apos;e göre</div>
            </div>
            <div className="border-2 border-blue-600 p-4">
              <div className="text-blue-600 font-mono text-3xl font-black mb-2">0</div>
              <div className="text-sm uppercase tracking-wider">Bilanço Borcu</div>
              <div className="text-xs text-gray-400 mt-1">Dışarıda kalır</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
