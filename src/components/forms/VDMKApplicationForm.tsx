import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { applicationSchema, type ApplicationFormData } from '@/lib/validations/application'
import { useApplication } from '@/hooks/useApplication'
import { cleanPhone, cleanTaxNumber, formatCurrency } from '@/lib/utils/format'
import { SECTORS, RECEIVABLES_TYPES, PHONE_FORMAT, TAX_NUMBER } from '@/lib/utils/constants'
import { rateLimiter, RATE_LIMITS } from '@/lib/utils/rateLimit'
import { parseSupabaseError, formatErrorMessage, logError } from '@/lib/utils/errorHandling'

interface VDMKApplicationFormProps {
  onSuccess?: (applicationId: string) => void
  onError?: (error: Error) => void
}

export function VDMKApplicationForm({ onSuccess, onError }: VDMKApplicationFormProps) {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { submitApplication } = useApplication()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    mode: 'onBlur',
  })

  const totalSteps = 3
  const financingAmount = watch('financing_amount')

  const onSubmit = async (data: ApplicationFormData) => {
    // Rate limiting check
    const rateLimitKey = `${data.email}-${data.tax_number}`
    if (!rateLimiter.check(rateLimitKey, RATE_LIMITS.FORM_SUBMISSION)) {
      const resetTime = rateLimiter.getResetTime(rateLimitKey, RATE_LIMITS.FORM_SUBMISSION)
      const minutes = Math.ceil(resetTime / 60000)
      alert(`Çok fazla başvuru denemesi. Lütfen ${minutes} dakika sonra tekrar deneyiniz.`)
      return
    }

    setIsSubmitting(true)

    try {
      // Clean phone and tax number before submission
      const cleanedData = {
        ...data,
        phone: cleanPhone(data.phone),
        tax_number: cleanTaxNumber(data.tax_number),
      }

      const application = await submitApplication(cleanedData)
      
      if (onSuccess) {
        onSuccess(application.id)
      }
    } catch (error) {
      // Parse and log error
      const appError = parseSupabaseError(error)
      logError(appError, { formData: data })
      
      const errorMessage = formatErrorMessage(appError)
      
      if (onError) {
        onError(new Error(errorMessage))
      } else {
        alert(errorMessage)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(step)
    const isValid = await trigger(fieldsToValidate)
    
    if (isValid && step < totalSteps) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const getFieldsForStep = (currentStep: number): (keyof ApplicationFormData)[] => {
    switch (currentStep) {
      case 1:
        return ['company_name', 'tax_number', 'contact_person', 'email', 'phone']
      case 2:
        return ['sector', 'financing_amount', 'receivables_type', 'payment_terms_months']
      default:
        return []
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress Indicator - Brutalist Style */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex-1 ${s !== 3 ? 'mr-4' : ''}`}
            >
              <div
                className={`h-2 border-2 border-black transition-colors ${
                  s <= step ? 'bg-[#0047FF]' : 'bg-white'
                }`}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <span className="mono-text text-sm">Adım {step}/{totalSteps}</span>
          <span className="mono-text text-sm">{Math.round((step / totalSteps) * 100)}%</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Step 1: Company Information */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="heading-2 mb-8">Şirket Bilgileri</h2>

            <div className="brutalist-card p-8 space-y-6">
              {/* Company Name */}
              <div>
                <label htmlFor="company_name" className="mono-text block mb-2 font-medium">
                  Şirket Adı *
                </label>
                <input
                  {...register('company_name')}
                  type="text"
                  id="company_name"
                  className="w-full px-4 py-3 border-2 border-black bg-white mono-text focus:outline-none focus:border-[#0047FF] transition-colors"
                  placeholder="Örn: ABC Ticaret A.Ş."
                />
                {errors.company_name && (
                  <p className="text-red-600 text-sm mt-1 mono-text">{errors.company_name.message}</p>
                )}
              </div>

              {/* Tax Number */}
              <div>
                <label htmlFor="tax_number" className="mono-text block mb-2 font-medium">
                  Vergi Numarası *
                </label>
                <input
                  {...register('tax_number')}
                  type="text"
                  id="tax_number"
                  maxLength={10}
                  className="w-full px-4 py-3 border-2 border-black bg-white mono-text focus:outline-none focus:border-[#0047FF] transition-colors"
                  placeholder={TAX_NUMBER.PLACEHOLDER}
                />
                {errors.tax_number && (
                  <p className="text-red-600 text-sm mt-1 mono-text">{errors.tax_number.message}</p>
                )}
              </div>

              {/* Contact Person */}
              <div>
                <label htmlFor="contact_person" className="mono-text block mb-2 font-medium">
                  İletişim Kişisi *
                </label>
                <input
                  {...register('contact_person')}
                  type="text"
                  id="contact_person"
                  className="w-full px-4 py-3 border-2 border-black bg-white mono-text focus:outline-none focus:border-[#0047FF] transition-colors"
                  placeholder="Örn: Ahmet Yılmaz"
                />
                {errors.contact_person && (
                  <p className="text-red-600 text-sm mt-1 mono-text">{errors.contact_person.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="mono-text block mb-2 font-medium">
                  E-posta *
                </label>
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border-2 border-black bg-white mono-text focus:outline-none focus:border-[#0047FF] transition-colors"
                  placeholder="ornek@sirket.com"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1 mono-text">{errors.email.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="mono-text block mb-2 font-medium">
                  Telefon *
                </label>
                <input
                  {...register('phone')}
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-3 border-2 border-black bg-white mono-text focus:outline-none focus:border-[#0047FF] transition-colors"
                  placeholder={PHONE_FORMAT.PLACEHOLDER}
                />
                {errors.phone && (
                  <p className="text-red-600 text-sm mt-1 mono-text">{errors.phone.message}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Financing Details */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="heading-2 mb-8">Finansman Detayları</h2>

            <div className="brutalist-card p-8 space-y-6">
              {/* Sector */}
              <div>
                <label htmlFor="sector" className="mono-text block mb-2 font-medium">
                  Sektör *
                </label>
                <select
                  {...register('sector')}
                  id="sector"
                  className="w-full px-4 py-3 border-2 border-black bg-white mono-text focus:outline-none focus:border-[#0047FF] transition-colors"
                >
                  <option value="">Seçiniz</option>
                  {Object.entries(SECTORS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
                {errors.sector && (
                  <p className="text-red-600 text-sm mt-1 mono-text">{errors.sector.message}</p>
                )}
              </div>

              {/* Financing Amount */}
              <div>
                <label htmlFor="financing_amount" className="mono-text block mb-2 font-medium">
                  Finansman Tutarı (TL) *
                </label>
                <input
                  {...register('financing_amount', { valueAsNumber: true })}
                  type="number"
                  id="financing_amount"
                  step="1000"
                  min="100000"
                  max="100000000"
                  className="w-full px-4 py-3 border-2 border-black bg-white mono-text focus:outline-none focus:border-[#0047FF] transition-colors"
                  placeholder="1000000"
                />
                {financingAmount && !errors.financing_amount && (
                  <p className="text-[#0047FF] text-sm mt-1 mono-text">
                    {formatCurrency(financingAmount)}
                  </p>
                )}
                {errors.financing_amount && (
                  <p className="text-red-600 text-sm mt-1 mono-text">{errors.financing_amount.message}</p>
                )}
              </div>

              {/* Receivables Type */}
              <div>
                <label htmlFor="receivables_type" className="mono-text block mb-2 font-medium">
                  Alacak Türü *
                </label>
                <select
                  {...register('receivables_type')}
                  id="receivables_type"
                  className="w-full px-4 py-3 border-2 border-black bg-white mono-text focus:outline-none focus:border-[#0047FF] transition-colors"
                >
                  <option value="">Seçiniz</option>
                  {Object.entries(RECEIVABLES_TYPES).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
                {errors.receivables_type && (
                  <p className="text-red-600 text-sm mt-1 mono-text">{errors.receivables_type.message}</p>
                )}
              </div>

              {/* Payment Terms */}
              <div>
                <label htmlFor="payment_terms_months" className="mono-text block mb-2 font-medium">
                  Vade Süresi (Ay) *
                </label>
                <input
                  {...register('payment_terms_months', { valueAsNumber: true })}
                  type="number"
                  id="payment_terms_months"
                  min="0"
                  max="18"
                  className="w-full px-4 py-3 border-2 border-black bg-white mono-text focus:outline-none focus:border-[#0047FF] transition-colors"
                  placeholder="12"
                />
                {errors.payment_terms_months && (
                  <p className="text-red-600 text-sm mt-1 mono-text">{errors.payment_terms_months.message}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Review & Submit */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="heading-2 mb-8">Özet ve Onay</h2>

            <div className="brutalist-card p-8 space-y-4 bg-gray-50">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="mono-text text-sm text-gray-600">Şirket Adı</p>
                  <p className="mono-text font-medium">{watch('company_name')}</p>
                </div>
                <div>
                  <p className="mono-text text-sm text-gray-600">Vergi No</p>
                  <p className="mono-text font-medium">{watch('tax_number')}</p>
                </div>
                <div>
                  <p className="mono-text text-sm text-gray-600">İletişim Kişisi</p>
                  <p className="mono-text font-medium">{watch('contact_person')}</p>
                </div>
                <div>
                  <p className="mono-text text-sm text-gray-600">E-posta</p>
                  <p className="mono-text font-medium">{watch('email')}</p>
                </div>
                <div>
                  <p className="mono-text text-sm text-gray-600">Telefon</p>
                  <p className="mono-text font-medium">{watch('phone')}</p>
                </div>
                <div>
                  <p className="mono-text text-sm text-gray-600">Sektör</p>
                  <p className="mono-text font-medium">{SECTORS[watch('sector')]}</p>
                </div>
                <div>
                  <p className="mono-text text-sm text-gray-600">Finansman Tutarı</p>
                  <p className="mono-text font-medium text-[#0047FF]">
                    {formatCurrency(watch('financing_amount'))}
                  </p>
                </div>
                <div>
                  <p className="mono-text text-sm text-gray-600">Alacak Türü</p>
                  <p className="mono-text font-medium">{RECEIVABLES_TYPES[watch('receivables_type')]}</p>
                </div>
                <div>
                  <p className="mono-text text-sm text-gray-600">Vade Süresi</p>
                  <p className="mono-text font-medium">{watch('payment_terms_months')} Ay</p>
                </div>
              </div>
            </div>

            <div className="brutalist-card p-6 bg-yellow-50 border-2 border-black">
              <p className="mono-text text-sm">
                ⚠️ Başvurunuzu gönderdikten sonra, OMG Capital Advisors ekibimiz en kısa sürede sizinle iletişime geçecektir.
                Başvurunuz 1-2 iş günü içinde değerlendirilecektir.
              </p>
            </div>
          </div>
        )}

        {/* Navigation Buttons - Brutalist Style */}
        <div className="flex justify-between items-center pt-8 border-t-2 border-black">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              disabled={isSubmitting}
              className="px-8 py-4 border-2 border-black bg-white hover:bg-black hover:text-white transition-colors mono-text font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Geri
            </button>
          )}

          {step < totalSteps ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-8 py-4 border-2 border-black bg-[#0047FF] text-white hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all mono-text font-medium ml-auto"
            >
              İleri →
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-4 border-2 border-black bg-[#0047FF] text-white hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all mono-text font-medium ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Gönderiliyor...' : 'Başvuruyu Gönder'}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
