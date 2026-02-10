/**
 * Final CTA Section
 * Black background with main CTA buttons
 */

import { Link } from 'wouter'

export function FinalCTA() {
  const handleWhatsApp = () => {
    window.open('https://wa.me/905558681634?text=Merhaba, VDMK hakkında bilgi almak istiyorum', '_blank')
  }

  return (
    <section className="py-20 bg-black text-white border-t-4 border-blue-600">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        {/* Main Statement */}
        <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
          Factoring bir kredi.<br />
          Kolaymoney ise bir finansman altyapısıdır.
        </h2>

        {/* Subtext */}
        <p className="text-xl md:text-2xl text-gray-300 mb-12">
          Alacaklarınızı borca çevirmek yerine, yatırıma dönüştürün.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/basvuru-yeni">
            <a className="inline-block bg-blue-600 text-white px-8 py-4 font-black text-lg border-2 border-blue-600 hover:bg-white hover:text-blue-600 transition-all duration-200 uppercase tracking-wider w-full sm:w-auto text-center">
              VDMK ile Başlayın →
            </a>
          </Link>
          
          <button
            onClick={handleWhatsApp}
            className="bg-transparent text-white px-8 py-4 font-black text-lg border-2 border-white hover:bg-white hover:text-black transition-all duration-200 uppercase tracking-wider w-full sm:w-auto"
          >
            Detaylı Bilgi Alın
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-12 pt-12 border-t-2 border-gray-700">
          <p className="text-sm text-gray-400">
            📞 +90 555 868 16 34 | 📧 info@kolaymoney.com
          </p>
        </div>
      </div>
    </section>
  )
}
