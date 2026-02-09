import { useState } from 'react'
import { VDMKApplicationForm } from '@/components/forms/VDMKApplicationForm'

export function ApplicationPage() {
  const [submitted, setSubmitted] = useState(false)
  const [applicationId, setApplicationId] = useState<string | null>(null)

  const handleSuccess = (id: string) => {
    setApplicationId(id)
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleError = (error: Error) => {
    alert(`Başvuru gönderilemedi: ${error.message}`)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="brutalist-card p-12 text-center bg-green-50 border-2 border-green-600">
            <div className="w-20 h-20 bg-green-600 border-2 border-black mx-auto mb-6 flex items-center justify-center">
              <span className="text-4xl text-white">✓</span>
            </div>
            
            <h1 className="heading-2 mb-4">Başvurunuz Alındı!</h1>
            
            <p className="mono-text text-lg mb-6">
              Başvurunuz başarıyla kaydedildi. OMG Capital Advisors ekibimiz en kısa sürede sizinle iletişime geçecektir.
            </p>

            <div className="brutalist-card p-6 bg-white mb-6">
              <p className="mono-text text-sm text-gray-600 mb-2">Başvuru Numaranız</p>
              <p className="mono-text font-bold text-[#0047FF]">{applicationId?.slice(0, 8).toUpperCase()}</p>
            </div>

            <div className="space-y-4">
              <p className="mono-text text-sm text-gray-600">
                📧 Başvuru detaylarını e-posta adresinize gönderdik.
              </p>
              <p className="mono-text text-sm text-gray-600">
                📞 Sorularınız için: +90 532 794 30 77
              </p>
            </div>

            <a
              href="/"
              className="inline-block mt-8 px-8 py-4 border-2 border-black bg-[#0047FF] text-white hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all mono-text font-medium"
            >
              Ana Sayfaya Dön
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <a href="/" className="inline-block mb-8">
            <div className="w-12 h-12 bg-[#0047FF] border-2 border-black mx-auto" />
          </a>
          <h1 className="heading-1 mb-4">VDMK Başvuru Formu</h1>
          <p className="body-text text-gray-600">
            Hızlı ve alternatif finansman için başvurunuzu tamamlayın
          </p>
        </div>

        {/* Form */}
        <VDMKApplicationForm onSuccess={handleSuccess} onError={handleError} />
      </div>
    </div>
  )
}
