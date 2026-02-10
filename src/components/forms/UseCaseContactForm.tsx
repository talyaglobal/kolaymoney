/**
 * Use Case Contact Form
 * Hızlı başvuru formu - sadece iletişim bilgileri
 */

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { SectorSlug } from '@/types/sector'
import { useAnalytics } from '@/contexts/AnalyticsContext'

// Validation schema
const useCaseContactSchema = z.object({
  fullName: z.string().min(2, 'İsim en az 2 karakter olmalı'),
  email: z.string().email('Geçerli bir email adresi giriniz'),
  phone: z.string()
    .min(10, 'Telefon numarası en az 10 karakter olmalı')
    .regex(/^[0-9+\s()-]+$/, 'Geçersiz telefon numarası'),
  companyName: z.string().min(2, 'Şirket adı en az 2 karakter olmalı'),
  notes: z.string().optional()
})

type UseCaseContactFormData = z.infer<typeof useCaseContactSchema>

interface UseCaseContactFormProps {
  sectorSlug: SectorSlug
  useCaseId: string
  useCaseTitle: string
  prefilledAmount?: number
  onBack: () => void
}

export function UseCaseContactForm({ 
  sectorSlug, 
  useCaseId, 
  useCaseTitle, 
  prefilledAmount,
  onBack 
}: UseCaseContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const analytics = useAnalytics()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<UseCaseContactFormData>({
    resolver: zodResolver(useCaseContactSchema),
    mode: 'onBlur'
  })

  const onSubmit = async (data: UseCaseContactFormData) => {
    setIsSubmitting(true)

    try {
      // Prepare payload
      const payload = {
        ...data,
        sector: sectorSlug,
        useCaseId,
        useCaseTitle,
        requestedAmount: prefilledAmount,
        applicationType: 'usecase_callback',
        source: 'usecase_application',
        utmSource: new URLSearchParams(window.location.search).get('utm_source') || undefined,
        utmMedium: new URLSearchParams(window.location.search).get('utm_medium') || undefined,
        utmCampaign: new URLSearchParams(window.location.search).get('utm_campaign') || undefined
      }

      // Submit to Supabase Edge Function
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

      const response = await fetch(`${supabaseUrl}/functions/v1/submit-compliance-application`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Başvuru gönderilemedi')
      }

      // Track success
      analytics.trackApplicationSubmit(sectorSlug, prefilledAmount || 0)

      // Show success
      setIsSuccess(true)
      reset()

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' })

    } catch (error) {
      console.error('Form submission error:', error)
      alert(error instanceof Error ? error.message : 'Bir hata oluştu. Lütfen tekrar deneyiniz.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="brutalist-card p-8 bg-green-50 border-4 border-black text-center">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="heading-2 mb-4">Başvurunuz Alındı!</h2>
              <p className="text-lg mb-6 mono-text">
                Teşekkür ederiz! Uzmanımız en kısa sürede sizi arayacak ve <strong>{useCaseTitle}</strong> senaryosu hakkında detaylı bilgi verecektir.
              </p>
              <div className="space-y-3">
                <a
                  href={`/sektor/${sectorSlug}`}
                  className="block px-6 py-3 bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors border-2 border-black mono-text"
                >
                  Sektör Sayfasına Dön
                </a>
                <a
                  href="/"
                  className="block px-6 py-3 bg-white text-black font-bold hover:bg-gray-100 transition-colors border-2 border-black mono-text"
                >
                  Ana Sayfaya Dön
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="mb-6 inline-flex items-center text-sm mono-text text-gray-600 hover:text-black transition-colors"
          >
            ← Geri Dön
          </button>

          {/* Form Header */}
          <div className="brutalist-card p-6 bg-blue-50 border-4 border-black mb-8">
            <h2 className="heading-2 mb-2">Hızlı Başvuru Formu</h2>
            <p className="mono-text text-sm text-gray-700">
              Bilgilerinizi doldurun, uzmanımız sizi arasın
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block font-bold mb-2 mono-text">
                Ad Soyad <span className="text-red-600">*</span>
              </label>
              <input
                {...register('fullName')}
                type="text"
                className="w-full p-4 border-4 border-black font-mono text-lg focus:outline-none focus:border-blue-600"
                placeholder="Ahmet Yılmaz"
              />
              {errors.fullName && (
                <p className="mt-2 text-red-600 font-bold mono-text text-sm">
                  ⚠️ {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block font-bold mb-2 mono-text">
                E-posta <span className="text-red-600">*</span>
              </label>
              <input
                {...register('email')}
                type="email"
                className="w-full p-4 border-4 border-black font-mono text-lg focus:outline-none focus:border-blue-600"
                placeholder="ahmet@sirket.com"
              />
              {errors.email && (
                <p className="mt-2 text-red-600 font-bold mono-text text-sm">
                  ⚠️ {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block font-bold mb-2 mono-text">
                Telefon <span className="text-red-600">*</span>
              </label>
              <input
                {...register('phone')}
                type="tel"
                className="w-full p-4 border-4 border-black font-mono text-lg focus:outline-none focus:border-blue-600"
                placeholder="0532 123 45 67"
              />
              {errors.phone && (
                <p className="mt-2 text-red-600 font-bold mono-text text-sm">
                  ⚠️ {errors.phone.message}
                </p>
              )}
            </div>

            {/* Company Name */}
            <div>
              <label className="block font-bold mb-2 mono-text">
                Şirket Adı <span className="text-red-600">*</span>
              </label>
              <input
                {...register('companyName')}
                type="text"
                className="w-full p-4 border-4 border-black font-mono text-lg focus:outline-none focus:border-blue-600"
                placeholder="Örnek Ticaret A.Ş."
              />
              {errors.companyName && (
                <p className="mt-2 text-red-600 font-bold mono-text text-sm">
                  ⚠️ {errors.companyName.message}
                </p>
              )}
            </div>

            {/* Notes (Optional) */}
            <div>
              <label className="block font-bold mb-2 mono-text">
                Notlar (Opsiyonel)
              </label>
              <textarea
                {...register('notes')}
                rows={4}
                className="w-full p-4 border-4 border-black font-mono text-lg focus:outline-none focus:border-blue-600"
                placeholder="Eklemek istediğiniz notlar..."
              />
            </div>

            {/* Info Box */}
            <div className="brutalist-card p-4 bg-yellow-50 border-2 border-black">
              <p className="mono-text text-sm">
                <span className="font-bold">💡 Bilgi:</span> Bu başvuru <strong>{useCaseTitle}</strong> senaryosu için özeldir. Uzmanımız sizi arayarak detayları konuşacaktır.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-4 bg-blue-600 text-white font-bold text-xl hover:bg-blue-700 transition-colors border-4 border-black disabled:bg-gray-400 disabled:cursor-not-allowed mono-text"
            >
              {isSubmitting ? 'Gönderiliyor...' : '📞 Başvuruyu Gönder'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
