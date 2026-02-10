/**
 * Zod Validation Schemas for Compliance Application Form
 */

import { z } from 'zod'

// Step 1: Company Info
export const companyInfoSchema = z.object({
  companyName: z.string().min(2, 'Şirket adı en az 2 karakter olmalıdır').max(200),
  taxNumber: z.string().regex(/^\d{10}$/, 'Vergi numarası 10 haneli olmalıdır'),
  companyType: z.enum(['limited', 'anonim', 'sahis', 'kollektif'], {
    errorMap: () => ({ message: 'Geçerli bir şirket türü seçiniz' })
  }),
  sector: z.string().min(1, 'Sektör seçimi zorunludur'),
  foundingYear: z.number()
    .min(1900, 'Geçerli bir kuruluş yılı giriniz')
    .max(new Date().getFullYear(), 'Kuruluş yılı gelecekte olamaz')
})

// Step 2: Contact Info
export const contactInfoSchema = z.object({
  contactName: z.string().min(2, 'İsim en az 2 karakter olmalıdır').max(100),
  contactTitle: z.string().min(2, 'Ünvan en az 2 karakter olmalıdır').max(100),
  contactEmail: z.string().email('Geçerli bir e-posta adresi giriniz'),
  contactPhone: z.string().regex(/^\+90\d{10}$/, 'Telefon numarası +90XXXXXXXXXX formatında olmalıdır'),
  companyAddress: z.string().min(10, 'Adres en az 10 karakter olmalıdır').max(500),
  city: z.string().min(2, 'Şehir seçimi zorunludur')
})

// Step 3: Financial Info
export const financialInfoSchema = z.object({
  annualRevenue: z.number()
    .min(100000, 'Minimum yıllık ciro 100.000 TL olmalıdır')
    .max(1000000000, 'Maksimum yıllık ciro 1 milyar TL olabilir'),
  creditSalesRatio: z.number()
    .min(0, 'Oran 0 ile 100 arasında olmalıdır')
    .max(100, 'Oran 0 ile 100 arasında olmalıdır'),
  averagePaymentTerm: z.number()
    .min(0, 'Vade süresi 0 ile 365 gün arasında olmalıdır')
    .max(365, 'Vade süresi 0 ile 365 gün arasında olmalıdır'),
  averageBasketSize: z.number()
    .min(1000, 'Minimum sepet tutarı 1.000 TL olmalıdır')
    .max(10000000, 'Maksimum sepet tutarı 10 milyon TL olabilir'),
  monthlyReceivables: z.number()
    .min(10000, 'Minimum aylık alacak 10.000 TL olmalıdır')
    .max(100000000, 'Maksimum aylık alacak 100 milyon TL olabilir')
})

// Step 4: VDMK Request
export const vdmkRequestSchema = z.object({
  requestedAmount: z.number()
    .min(100000, 'Minimum talep tutarı 100.000 TL olmalıdır')
    .max(100000000, 'Maksimum talep tutarı 100 milyon TL olabilir'),
  requestedTerm: z.number()
    .min(30, 'Minimum vade 30 gün olmalıdır')
    .max(365, 'Maksimum vade 365 gün olabilir'),
  purpose: z.string().min(20, 'Kullanım amacı en az 20 karakter olmalıdır').max(1000)
})

// Step 5: Questionnaire (dynamic, validated at runtime)
export const questionnaireSchema = z.object({
  responses: z.record(z.any()) // Dynamic based on sector questions
})

// Complete form schema
export const completeComplianceFormSchema = z.object({
  ...companyInfoSchema.shape,
  ...contactInfoSchema.shape,
  ...financialInfoSchema.shape,
  ...vdmkRequestSchema.shape,
  questionResponses: z.record(z.any()),
  // Metadata
  source: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional()
})

// Type exports
export type CompanyInfoFormData = z.infer<typeof companyInfoSchema>
export type ContactInfoFormData = z.infer<typeof contactInfoSchema>
export type FinancialInfoFormData = z.infer<typeof financialInfoSchema>
export type VDMKRequestFormData = z.infer<typeof vdmkRequestSchema>
export type CompleteComplianceFormData = z.infer<typeof completeComplianceFormSchema>

// Helper function to validate question response
export function validateQuestionResponse(
  questionType: string,
  value: any,
  isRequired: boolean
): { valid: boolean; error?: string } {
  if (isRequired && (value === undefined || value === null || value === '')) {
    return { valid: false, error: 'Bu alan zorunludur' }
  }

  switch (questionType) {
    case 'single_choice':
    case 'yes_no':
      if (typeof value !== 'string' || value.length === 0) {
        return { valid: false, error: 'Bir seçenek seçiniz' }
      }
      break
    
    case 'multiple_choice':
      if (!Array.isArray(value) || value.length === 0) {
        return { valid: false, error: 'En az bir seçenek seçiniz' }
      }
      break
    
    case 'number':
      if (typeof value !== 'number' || isNaN(value)) {
        return { valid: false, error: 'Geçerli bir sayı giriniz' }
      }
      break
    
    case 'text':
      if (typeof value !== 'string' || value.trim().length < 2) {
        return { valid: false, error: 'En az 2 karakter giriniz' }
      }
      break
    
    default:
      return { valid: false, error: 'Geçersiz soru tipi' }
  }

  return { valid: true }
}
