/**
 * Step 5: Sector-Specific Questionnaire
 */

import { useState, useEffect } from 'react'
import { SectorQuestion, ComplianceScoring } from '@/types/compliance'
import { QuestionRenderer } from '../QuestionRenderer'
import { getQuestionsBySector } from '@/lib/supabase/compliance'
import { calculateComplianceScore } from '@/lib/compliance/scoringEngine'

interface QuestionnaireStepProps {
  sector: string
  responses: Record<string, any>
  onChange: (responses: Record<string, any>) => void
}

export function QuestionnaireStep({ sector, responses, onChange }: QuestionnaireStepProps) {
  const [questions, setQuestions] = useState<SectorQuestion[]>([])
  const [scoring, setScoring] = useState<ComplianceScoring | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loadingQuestions, setLoadingQuestions] = useState(false)

  useEffect(() => {
    if (sector) {
      loadQuestions()
    }
  }, [sector])

  const loadQuestions = async () => {
    setLoadingQuestions(true)
    try {
      const sectorQuestions = await getQuestionsBySector(sector)
      setQuestions(sectorQuestions)
    } catch (error) {
      console.error('Error loading questions:', error)
      alert('Sorular yüklenemedi. Lütfen sayfayı yenileyin.')
    } finally {
      setLoadingQuestions(false)
    }
  }

  useEffect(() => {
    if (questions.length > 0) {
      const score = calculateComplianceScore(questions, responses)
      setScoring(score)
    }
  }, [questions, responses])

  const handleResponseChange = (questionId: string, value: any) => {
    const newResponses = { ...responses, [questionId]: value }
    onChange(newResponses)
    
    // Clear error for this question
    if (errors[questionId]) {
      const newErrors = { ...errors }
      delete newErrors[questionId]
      setErrors(newErrors)
    }
  }

  if (!sector) {
    return (
      <div className="brutalist-card p-8 bg-red-50 text-center">
        <div className="text-4xl mb-4">⚠️</div>
        <h3 className="text-2xl font-bold mb-2">Sektör Seçimi Gerekli</h3>
        <p className="text-gray-700">Lütfen önce sektörünüzü seçiniz</p>
      </div>
    )
  }

  if (loadingQuestions) {
    return (
      <div className="brutalist-card p-8 bg-blue-50 text-center">
        <div className="text-4xl mb-4 animate-pulse">⏳</div>
        <h3 className="text-2xl font-bold mb-2">Sorular Yükleniyor...</h3>
        <p className="text-gray-600">Veritabanından sorular getiriliyor...</p>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="brutalist-card p-8 bg-yellow-50 text-center">
        <div className="text-4xl mb-4">⚠️</div>
        <h3 className="text-2xl font-bold mb-2">Soru Bulunamadı</h3>
        <p className="text-gray-700">Bu sektör için henüz soru tanımlanmamış.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="brutalist-card p-6 bg-orange-50">
        <h2 className="text-3xl font-bold mb-2">Sektörel Uygunluk Anketi</h2>
        <p className="text-gray-700">
          {questions.length} soru - Her soruya dikkatli cevap verin
        </p>
      </div>

      {/* Real-time Score Preview */}
      {scoring && (
        <div className="brutalist-card p-6 bg-gradient-to-r from-blue-50 to-purple-50 sticky top-4 z-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Anlık Puanınız</h3>
            <div className="text-4xl font-bold">
              {Math.round(scoring.totalScore)}
              <span className="text-2xl text-gray-600">/100</span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(scoring.categoryScores).map(([category, score]) => (
              <div key={category} className="text-center p-2 bg-white border-2 border-black">
                <div className="text-sm font-bold mb-1">
                  {category === 'financial' && '💰'}
                  {category === 'operational' && '⚙️'}
                  {category === 'legal' && '⚖️'}
                  {category === 'experience' && '📊'}
                </div>
                <div className="text-lg font-bold">
                  {Math.round((score.earned / score.max) * 100)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Questions */}
      <div className="space-y-6">
        {questions.map((question, index) => (
          <div key={question.id}>
            <div className="mb-2 text-sm font-bold text-gray-500">
              SORU {index + 1} / {questions.length}
            </div>
            <QuestionRenderer
              question={question}
              value={responses[question.id]}
              onChange={(value) => handleResponseChange(question.id, value)}
              error={errors[question.id]}
            />
          </div>
        ))}
      </div>

      {/* Progress Indicator */}
      <div className="brutalist-card p-4 bg-gray-50">
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold">İlerleme</span>
          <span className="font-bold">
            {Object.keys(responses).length} / {questions.length} cevaplandı
          </span>
        </div>
        <div className="h-4 border-4 border-black bg-white">
          <div
            className="h-full bg-green-500 transition-all duration-300"
            style={{
              width: `${(Object.keys(responses).length / questions.length) * 100}%`
            }}
          />
        </div>
      </div>
    </div>
  )
}
