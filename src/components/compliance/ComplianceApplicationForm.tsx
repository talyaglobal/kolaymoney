/**
 * Main Compliance Application Form - 6-step wizard
 */

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocation } from 'wouter'
import { useAnalytics } from '@/contexts/AnalyticsContext'
import { useSEO } from '@/hooks/useSEO'
import { CompleteComplianceFormData, completeComplianceFormSchema } from '@/lib/validations/compliance'
import { ComplianceScoring } from '@/types/compliance'
import { calculateComplianceScore } from '@/lib/compliance/scoringEngine'
import { getQuestionsBySector } from '@/lib/supabase/compliance'

// Step components
import { CompanyInfoStep } from './steps/CompanyInfoStep'
import { ContactInfoStep } from './steps/ContactInfoStep'
import { FinancialInfoStep } from './steps/FinancialInfoStep'
import { VDMKRequestStep } from './steps/VDMKRequestStep'
import { QuestionnaireStep } from './steps/QuestionnaireStep'
import { ReviewStep } from './steps/ReviewStep'

const STEPS = [
  { id: 1, title: 'Şirket Bilgileri', icon: '🏢' },
  { id: 2, title: 'İletişim', icon: '📞' },
  { id: 3, title: 'Finansal', icon: '💰' },
  { id: 4, title: 'VDMK Talebi', icon: '📋' },
  { id: 5, title: 'Anket', icon: '📊' },
  { id: 6, title: 'Özet', icon: '✓' }
]

export function ComplianceApplicationForm() {
  const [, navigate] = useLocation()
  const analytics = useAnalytics()
  const [currentStep, setCurrentStep] = useState(1)
  const [questionResponses, setQuestionResponses] = useState<Record<string, any>>({})
  const [scoring, setScoring] = useState<ComplianceScoring | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // SEO optimization
  useSEO({
    title: 'VDMK Başvuru Formu - Uygunluk Anketi | KolayMoney',
    description: 'VDMK finansman başvurunuzu yapın. Sektörel uygunluk anketi ile anında puanlama. Hızlı değerlendirme, rekabetçi oranlar.',
    keywords: ['VDMK başvuru', 'finansman başvurusu', 'işletme kredisi başvuru', 'uygunluk anketi'],
    canonical: '/basvuru-yeni'
  })

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger
  } = useForm<CompleteComplianceFormData>({
    resolver: zodResolver(completeComplianceFormSchema),
    mode: 'onChange'
  })

  const formData = watch()
  const selectedSector = watch('sector')

  // Calculate scoring when responses change
  useEffect(() => {
    if (selectedSector && Object.keys(questionResponses).length > 0) {
      loadAndCalculateScore()
    }
  }, [selectedSector, questionResponses])

  const loadAndCalculateScore = async () => {
    try {
      const questions = await getQuestionsBySector(selectedSector)
      const score = calculateComplianceScore(questions, questionResponses)
      setScoring(score)
    } catch (error) {
      console.error('Error calculating score:', error)
    }
  }

  // Save to localStorage
  useEffect(() => {
    const dataToSave = {
      ...formData,
      questionResponses,
      currentStep
    }
    localStorage.setItem('compliance_form_draft', JSON.stringify(dataToSave))
  }, [formData, questionResponses, currentStep])

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('compliance_form_draft')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed.currentStep) setCurrentStep(parsed.currentStep)
        if (parsed.questionResponses) setQuestionResponses(parsed.questionResponses)
      } catch (e) {
        console.error('Failed to load draft:', e)
      }
    }
    // Track application start
    analytics.trackApplicationStart(selectedSector)
  }, [])

  const handleNext = async () => {
    let isValid = false

    switch (currentStep) {
      case 1:
        isValid = await trigger(['companyName', 'taxNumber', 'companyType', 'sector', 'foundingYear'])
        break
      case 2:
        isValid = await trigger(['contactName', 'contactTitle', 'contactEmail', 'contactPhone', 'companyAddress', 'city'])
        break
      case 3:
        isValid = await trigger(['annualRevenue', 'creditSalesRatio', 'averagePaymentTerm', 'averageBasketSize', 'monthlyReceivables'])
        break
      case 4:
        isValid = await trigger(['requestedAmount', 'requestedTerm', 'purpose'])
        break
      case 5:
        // Validate questionnaire
        try {
          const questions = await getQuestionsBySector(selectedSector)
          const requiredQuestions = questions.filter(q => q.isRequired)
          const answeredRequired = requiredQuestions.every(q => questionResponses[q.id] !== undefined)
          isValid = answeredRequired
          if (!isValid) {
            alert('Lütfen tüm zorunlu soruları cevaplayınız')
          }
        } catch (error) {
          console.error('Error validating questions:', error)
          isValid = false
        }
        break
      case 6:
        isValid = true
        break
      default:
        isValid = true
    }

    if (isValid) {
      // Track step completion
      analytics.trackApplicationStep(currentStep, STEPS[currentStep - 1].title)
      setCurrentStep(prev => Math.min(prev + 1, 6))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const onSubmit = async (data: CompleteComplianceFormData) => {
    setIsSubmitting(true)

    try {
      // Calculate final score from API
      const questions = await getQuestionsBySector(data.sector)
      const finalScoring = calculateComplianceScore(questions, questionResponses)

      const payload = {
        ...data,
        questionResponses,
        complianceScore: finalScoring.totalScore,
        isPassed: finalScoring.isPassed,
        scoringDetails: finalScoring,
        source: 'web_form',
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

      const result = await response.json()

      // Track successful submission
      analytics.trackApplicationSubmit(
        data.sector,
        data.requestedAmount,
        finalScoring.totalScore
      )

      // Clear draft
      localStorage.removeItem('compliance_form_draft')

      // Navigate to success page with application ID
      alert(`Başvurunuz başarıyla alındı! (Başvuru No: ${result.applicationId.slice(0, 8).toUpperCase()})\n\nE-posta adresinize onay gönderildi.`)
      navigate('/')

    } catch (error) {
      console.error('Submission error:', error)
      analytics.trackError('Application submission failed', 'ComplianceApplicationForm')
      alert('Başvuru gönderilirken bir hata oluştu. Lütfen tekrar deneyiniz.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <CompanyInfoStep register={register} errors={errors} />
      case 2:
        return <ContactInfoStep register={register} errors={errors} />
      case 3:
        return <FinancialInfoStep register={register} errors={errors} />
      case 4:
        return <VDMKRequestStep register={register} errors={errors} />
      case 5:
        return (
          <QuestionnaireStep
            sector={selectedSector}
            responses={questionResponses}
            onChange={setQuestionResponses}
          />
        )
      case 6:
        return scoring ? (
          <ReviewStep formData={{ ...formData, questionResponses }} scoring={scoring} />
        ) : (
          <div className="text-center p-8">Puanlama hesaplanıyor...</div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Progress Bar */}
        <div className="brutalist-card p-6 bg-white mb-8">
          <div className="flex items-center justify-between mb-4">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`
                    w-12 h-12 border-4 flex items-center justify-center font-bold text-xl
                    ${currentStep >= step.id
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-gray-400 border-gray-300'
                    }
                  `}
                >
                  {step.icon}
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`
                      h-1 w-8 md:w-16 mx-2
                      ${currentStep > step.id ? 'bg-black' : 'bg-gray-300'}
                    `}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600">Adım {currentStep} / {STEPS.length}</div>
            <div className="font-bold text-lg">{STEPS[currentStep - 1].title}</div>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="brutalist-btn bg-gray-200 text-black flex-1"
              >
                ← Geri
              </button>
            )}
            
            {currentStep < 6 ? (
              <button
                type="button"
                onClick={handleNext}
                className="brutalist-btn bg-blue-600 text-white flex-1"
              >
                İleri →
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="brutalist-btn bg-green-600 text-white flex-1 disabled:opacity-50"
              >
                {isSubmitting ? 'Gönderiliyor...' : '✓ Başvuruyu Gönder'}
              </button>
            )}
          </div>
        </form>

        {/* Help Text */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>Sorularınız mı var? <a href="mailto:hq@talya.vc" className="underline font-bold">hq@talya.vc</a></p>
        </div>
      </div>
    </div>
  )
}
