/**
 * Sektör Faydaları ve Gereksinimler Component
 */

interface SectorBenefitsProps {
  benefits: string[]
  requirements: string[]
  sectorName: string
}

export function SectorBenefits({ benefits, requirements, sectorName }: SectorBenefitsProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Benefits */}
            <div className="bg-green-50 border-4 border-black p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">✓</span>
                <h3 className="text-2xl font-black">Avantajlar</h3>
              </div>
              
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-green-600 font-black text-xl mt-1">✓</span>
                    <span className="text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 p-4 bg-white border-2 border-black">
                <div className="text-sm font-bold text-gray-600 mb-2">
                  {sectorName} SEKTÖRÜNE ÖZEL
                </div>
                <p className="text-sm">
                  Bu avantajlar {sectorName.toLowerCase()} sektörünün özel ihtiyaçları 
                  ve nakit döngüsü karakteristikleri göz önünde bulundurularak hazırlanmıştır.
                </p>
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-blue-50 border-4 border-black p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">📋</span>
                <h3 className="text-2xl font-black">Gereksinimler</h3>
              </div>
              
              <ul className="space-y-4">
                {requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-blue-600 font-black text-xl mt-1">•</span>
                    <span className="text-lg">{requirement}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 p-4 bg-white border-2 border-black">
                <div className="text-sm font-bold text-gray-600 mb-2">
                  HIZLI DEĞERLENDİRME
                </div>
                <p className="text-sm mb-4">
                  Bu kriterleri karşılıyorsanız, başvurunuz 48 saat içinde değerlendirilir 
                  ve 7 gün içinde finansman sağlanır.
                </p>
                <a 
                  href="/#references"
                  className="block w-full px-6 py-3 bg-blue-600 text-white text-center font-bold hover:bg-blue-700 transition-colors border-2 border-black"
                >
                  Başvuru Yap
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
