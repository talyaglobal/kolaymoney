/**
 * Application Choice Screen
 * Kullanıcıya hızlı arama veya detaylı anket seçeneği sunar
 */

interface ApplicationChoiceScreenProps {
  onSelectQuick: () => void
  onSelectDetailed: () => void
}

export function ApplicationChoiceScreen({ onSelectQuick, onSelectDetailed }: ApplicationChoiceScreenProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="heading-1 mb-4">Nasıl Devam Etmek İstersiniz?</h2>
            <p className="text-xl text-gray-700 mono-text">
              Size en uygun başvuru yöntemini seçin
            </p>
          </div>

          {/* Two Choice Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Option 1: Quick Callback */}
            <div className="bg-white border-4 border-black hover:translate-x-2 hover:translate-y-2 transition-transform">
              <div className="bg-blue-600 text-white p-6 border-b-4 border-black">
                <div className="text-6xl mb-4 text-center">📞</div>
                <h3 className="text-2xl font-black text-center mb-2">Hızlı Arama</h3>
                <p className="text-center text-blue-100 mono-text text-sm">
                  Sadece Bu Senaryo İçin Arayalım
                </p>
              </div>

              <div className="p-6">
                <p className="text-gray-700 mb-6">
                  2 dakika içinde formu doldurun, uzmanımız sizi arasın ve bu senaryoya özel detayları konuşun.
                </p>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-500 border-2 border-black flex items-center justify-center">
                      <span className="text-white font-bold text-xs">✓</span>
                    </div>
                    <span className="mono-text text-sm">Çok hızlı - 2 dakika</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-500 border-2 border-black flex items-center justify-center">
                      <span className="text-white font-bold text-xs">✓</span>
                    </div>
                    <span className="mono-text text-sm">Sadece 4 alan</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-500 border-2 border-black flex items-center justify-center">
                      <span className="text-white font-bold text-xs">✓</span>
                    </div>
                    <span className="mono-text text-sm">Anında geri arama</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-500 border-2 border-black flex items-center justify-center">
                      <span className="text-white font-bold text-xs">✓</span>
                    </div>
                    <span className="mono-text text-sm">Senaryo önceden seçili</span>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={onSelectQuick}
                  className="w-full px-6 py-4 bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition-colors border-2 border-black mono-text"
                >
                  📞 Hızlı Başvuru
                </button>
              </div>
            </div>

            {/* Option 2: Detailed Questionnaire */}
            <div className="bg-white border-4 border-black hover:translate-x-2 hover:translate-y-2 transition-transform">
              <div className="bg-gray-900 text-white p-6 border-b-4 border-black">
                <div className="text-6xl mb-4 text-center">📊</div>
                <h3 className="text-2xl font-black text-center mb-2">Detaylı Anket</h3>
                <p className="text-center text-gray-300 mono-text text-sm">
                  6 Adımlı Uygunluk Anketi
                </p>
              </div>

              <div className="p-6">
                <p className="text-gray-700 mb-6">
                  Kapsamlı anket ile tam değerlendirme yapın, anında uygunluk puanınızı görün ve sektöre özel sorulara cevap verin.
                </p>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-purple-500 border-2 border-black flex items-center justify-center">
                      <span className="text-white font-bold text-xs">✓</span>
                    </div>
                    <span className="mono-text text-sm">Kapsamlı değerlendirme</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-purple-500 border-2 border-black flex items-center justify-center">
                      <span className="text-white font-bold text-xs">✓</span>
                    </div>
                    <span className="mono-text text-sm">Anında uygunluk puanı</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-purple-500 border-2 border-black flex items-center justify-center">
                      <span className="text-white font-bold text-xs">✓</span>
                    </div>
                    <span className="mono-text text-sm">Sektöre özel sorular</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-purple-500 border-2 border-black flex items-center justify-center">
                      <span className="text-white font-bold text-xs">✓</span>
                    </div>
                    <span className="mono-text text-sm">Daha hızlı onay süreci</span>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={onSelectDetailed}
                  className="w-full px-6 py-4 bg-gray-900 text-white font-bold text-lg hover:bg-gray-800 transition-colors border-2 border-black mono-text"
                >
                  📊 Detaylı Anket
                </button>
              </div>
            </div>
          </div>

          {/* Help Text */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 mono-text">
              💡 Her iki seçenek de ücretsizdir. Tercih ettiğiniz yöntemi seçebilirsiniz.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
