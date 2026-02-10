/**
 * Compliance & Application Types
 * Uygunluk anketi ve başvuru formu tipleri
 */

export type QuestionType = 'single_choice' | 'multiple_choice' | 'number' | 'yes_no' | 'text'

export type QuestionCategory = 'financial' | 'operational' | 'legal' | 'experience'

export interface QuestionOption {
  id: string
  label: string
  score: number // Bu seçenek seçilirse alınan puan
  isQualifying?: boolean // Bu seçenek seçilmezse otomatik fail
}

export interface SectorQuestion {
  id: string
  sectorSlug: string
  questionText: string
  questionType: QuestionType
  options?: QuestionOption[]
  weight: number // 1-10 (soru ağırlığı)
  category: QuestionCategory
  isRequired: boolean
  orderIndex: number
  isActive: boolean
  helpText?: string
  placeholder?: string
  validationRules?: {
    min?: number
    max?: number
    pattern?: string
  }
}

export interface ComplianceFormData {
  // Şirket Bilgileri
  companyName: string
  taxNumber: string
  companyType: 'limited' | 'anonim' | 'sahis' | 'kollektif'
  sector: string
  foundingYear: number
  
  // İletişim
  contactName: string
  contactTitle: string
  contactEmail: string
  contactPhone: string
  companyAddress: string
  city: string
  
  // Finansal
  annualRevenue: number
  creditSalesRatio: number
  averagePaymentTerm: number
  averageBasketSize: number
  monthlyReceivables: number
  
  // VDMK Talebi
  requestedAmount: number
  requestedTerm: number
  purpose: string
  
  // Anket Cevapları
  questionResponses: Record<string, any>
  
  // Documents (optional)
  documents?: File[]
}

export interface ComplianceScoring {
  totalScore: number // 0-100
  isPassed: boolean // >= 60
  categoryScores: {
    financial: { earned: number; max: number }
    operational: { earned: number; max: number }
    legal: { earned: number; max: number }
    experience: { earned: number; max: number }
  }
  failedCriteria: string[]
  recommendations: string[]
  scoringDetails: {
    questionId: string
    questionText: string
    answer: any
    scoreEarned: number
    maxScore: number
    weight: number
  }[]
}

export type ApplicationStatus = 
  | 'pending' 
  | 'under_review' 
  | 'approved' 
  | 'rejected' 
  | 'more_info_needed'

export interface ComplianceApplication {
  id: string
  
  // Company Info
  companyName: string
  taxNumber: string
  companyType: string
  sector: string
  foundingYear: number
  
  // Contact Info
  contactName: string
  contactTitle: string
  contactEmail: string
  contactPhone: string
  companyAddress: string
  city: string
  
  // Financial Info
  annualRevenue: number
  creditSalesRatio: number
  averagePaymentTerm: number
  averageBasketSize: number
  monthlyReceivables: number
  
  // VDMK Request
  requestedAmount: number
  requestedTerm: number
  purpose: string
  
  // Questionnaire
  questionResponses: Record<string, any>
  
  // Scoring
  complianceScore: number
  isPassed: boolean
  scoringDetails: ComplianceScoring
  
  // Status
  status: ApplicationStatus
  rejectionReason?: string
  reviewNotes?: string
  reviewedBy?: string
  reviewedAt?: string
  
  // Documents
  documents?: any
  
  // Tracking
  source?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  
  createdAt: string
  updatedAt: string
}
