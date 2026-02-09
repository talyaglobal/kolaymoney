/**
 * Compliance Scoring Engine
 * Uygunluk puanlama algoritması
 */

import { SectorQuestion, ComplianceScoring } from '@/types/compliance'

/**
 * Ana puanlama fonksiyonu
 */
export function calculateComplianceScore(
  questions: SectorQuestion[],
  responses: Record<string, any>
): ComplianceScoring {
  const scoringDetails: ComplianceScoring['scoringDetails'] = []
  const categoryScores: Record<string, { earned: number; max: number }> = {
    financial: { earned: 0, max: 0 },
    operational: { earned: 0, max: 0 },
    legal: { earned: 0, max: 0 },
    experience: { earned: 0, max: 0 }
  }
  
  const failedCriteria: string[] = []
  let totalEarned = 0
  let totalMax = 0

  // Her soru için puanlama
  for (const question of questions) {
    if (!question.isActive) continue

    const response = responses[question.id]
    if (!response && question.isRequired) {
      failedCriteria.push(`Zorunlu soru cevaplanmadı: ${question.questionText}`)
      continue
    }

    const { scoreEarned, maxScore } = calculateQuestionScore(question, response)
    const weightedScore = scoreEarned * question.weight
    const weightedMax = maxScore * question.weight

    // Kategori skorlarını güncelle
    categoryScores[question.category].earned += weightedScore
    categoryScores[question.category].max += weightedMax

    // Toplam skorları güncelle
    totalEarned += weightedScore
    totalMax += weightedMax

    // Detayları kaydet
    scoringDetails.push({
      questionId: question.id,
      questionText: question.questionText,
      answer: response,
      scoreEarned: weightedScore,
      maxScore: weightedMax,
      weight: question.weight
    })

    // Qualifying check
    if (question.questionType === 'single_choice' || question.questionType === 'yes_no') {
      const selectedOption = question.options?.find(opt => opt.id === response)
      if (selectedOption?.isQualifying === false) {
        failedCriteria.push(`Kritik kriter karşılanmadı: ${question.questionText}`)
      }
    }
  }

  // Yüzdelik hesaplama
  const totalScore = totalMax > 0 ? (totalEarned / totalMax) * 100 : 0
  const isPassed = totalScore >= 60

  // Kategori yüzdelikleri
  const categoryPercentages = {
    financial: categoryScores.financial.max > 0 
      ? (categoryScores.financial.earned / categoryScores.financial.max) * 100 
      : 0,
    operational: categoryScores.operational.max > 0 
      ? (categoryScores.operational.earned / categoryScores.operational.max) * 100 
      : 0,
    legal: categoryScores.legal.max > 0 
      ? (categoryScores.legal.earned / categoryScores.legal.max) * 100 
      : 0,
    experience: categoryScores.experience.max > 0 
      ? (categoryScores.experience.earned / categoryScores.experience.max) * 100 
      : 0
  }

  // Öneriler
  const recommendations = generateRecommendations(categoryPercentages, failedCriteria)

  return {
    totalScore,
    isPassed,
    categoryScores: categoryPercentages,
    failedCriteria,
    recommendations,
    scoringDetails
  }
}

/**
 * Tek bir soru için puan hesaplama
 */
function calculateQuestionScore(
  question: SectorQuestion,
  response: any
): { scoreEarned: number; maxScore: number } {
  const maxScore = 100 // Her soru 100 puan üzerinden

  switch (question.questionType) {
    case 'single_choice':
    case 'yes_no': {
      const selectedOption = question.options?.find(opt => opt.id === response)
      return {
        scoreEarned: selectedOption?.score || 0,
        maxScore
      }
    }

    case 'multiple_choice': {
      if (!Array.isArray(response)) return { scoreEarned: 0, maxScore }
      
      let totalScore = 0
      for (const optionId of response) {
        const option = question.options?.find(opt => opt.id === optionId)
        if (option) totalScore += option.score
      }
      
      return {
        scoreEarned: Math.min(totalScore, maxScore),
        maxScore
      }
    }

    case 'number': {
      // Number soruları için validation rules'a göre puanlama
      const value = Number(response)
      if (isNaN(value)) return { scoreEarned: 0, maxScore }

      const { min, max } = question.validationRules || {}
      if (min !== undefined && max !== undefined) {
        // Min-max aralığında normalize et
        const normalized = ((value - min) / (max - min)) * 100
        return {
          scoreEarned: Math.max(0, Math.min(100, normalized)),
          maxScore
        }
      }

      return { scoreEarned: 50, maxScore } // Default orta puan
    }

    case 'text': {
      // Text soruları için basit değerlendirme
      const text = String(response || '').trim()
      if (text.length === 0) return { scoreEarned: 0, maxScore }
      if (text.length < 20) return { scoreEarned: 40, maxScore }
      if (text.length < 50) return { scoreEarned: 70, maxScore }
      return { scoreEarned: 100, maxScore }
    }

    default:
      return { scoreEarned: 0, maxScore }
  }
}

/**
 * Öneriler oluştur
 */
function generateRecommendations(
  categoryScores: Record<string, number>,
  failedCriteria: string[]
): string[] {
  const recommendations: string[] = []

  // Kategori bazlı öneriler
  if (categoryScores.financial < 60) {
    recommendations.push(
      'Finansal performansınızı iyileştirmeniz önerilir. Yıllık cironuzu artırın ve tahsilat oranınızı yükseltin.'
    )
  }

  if (categoryScores.operational < 60) {
    recommendations.push(
      'Operasyonel süreçlerinizi güçlendirin. Vadeli satış oranınızı artırın ve stok yönetiminizi optimize edin.'
    )
  }

  if (categoryScores.legal < 60) {
    recommendations.push(
      'Yasal uyumluluk konusunda eksiklikler var. İcra/dava süreçlerini minimize edin.'
    )
  }

  if (categoryScores.experience < 60) {
    recommendations.push(
      'Sektördeki deneyiminizi artırın. En az 1-2 yıl daha faaliyet göstermeniz önerilir.'
    )
  }

  // Kritik kriterler
  if (failedCriteria.length > 0) {
    recommendations.push(
      'Kritik kriterlerinizi gözden geçirin ve iyileştirme planı yapın.'
    )
  }

  // Genel öneri
  if (recommendations.length === 0) {
    recommendations.push(
      'Tebrikler! Tüm kriterleri başarıyla karşılıyorsunuz. Başvurunuz değerlendirilecektir.'
    )
  }

  return recommendations
}

/**
 * Skor seviyesine göre mesaj
 */
export function getScoreMessage(score: number): {
  title: string
  message: string
  color: 'green' | 'yellow' | 'red'
} {
  if (score >= 80) {
    return {
      title: 'Mükemmel! 🎉',
      message: 'Başvurunuz tüm kriterleri mükemmel şekilde karşılıyor.',
      color: 'green'
    }
  }

  if (score >= 60) {
    return {
      title: 'Uygun ✓',
      message: 'Başvurunuz minimum kriterleri karşılıyor. Değerlendirme sürecine alınacaktır.',
      color: 'green'
    }
  }

  if (score >= 40) {
    return {
      title: 'Geliştirilmeli ⚠️',
      message: 'Başvurunuz şu an kriterleri tam karşılamıyor. Ancak iyileştirme yaparak tekrar başvurabilirsiniz.',
      color: 'yellow'
    }
  }

  return {
    title: 'Uygun Değil ✗',
    message: 'Maalesef başvurunuz mevcut kriterleri karşılamıyor. Önerilerimizi inceleyip gelişim sağladıktan sonra tekrar başvurabilirsiniz.',
    color: 'red'
  }
}
