import { z } from 'zod'
import { VALIDATION, PHONE_FORMAT, TAX_NUMBER } from '../utils/constants'

// Application form validation schema
export const applicationSchema = z.object({
  company_name: z
    .string()
    .min(2, 'Şirket adı en az 2 karakter olmalıdır')
    .max(200, 'Şirket adı en fazla 200 karakter olabilir')
    .trim(),
  
  tax_number: z
    .string()
    .regex(TAX_NUMBER.REGEX, 'Vergi numarası 10 haneli olmalıdır')
    .length(TAX_NUMBER.LENGTH, 'Vergi numarası 10 haneli olmalıdır'),
  
  contact_person: z
    .string()
    .min(2, 'İletişim kişisi en az 2 karakter olmalıdır')
    .max(100, 'İletişim kişisi en fazla 100 karakter olabilir')
    .trim(),
  
  email: z
    .string()
    .email('Geçerli bir e-posta adresi giriniz')
    .toLowerCase()
    .trim(),
  
  phone: z
    .string()
    .regex(PHONE_FORMAT.REGEX, 'Telefon numarası +90 ile başlamalı ve 10 haneli olmalıdır'),
  
  sector: z.enum([
    // B2C Sektörler
    'b2c_retail',
    'b2c_automotive',
    'b2c_education',
    'b2c_healthcare',
    'b2c_hospitality',
    'b2c_food_beverage',
    'b2c_fashion',
    'b2c_electronics',
    'b2c_home_garden',
    'b2c_sports',
    // B2B Sektörler
    'b2b_fmcg',
    'b2b_construction',
    'b2b_logistics',
    'b2b_manufacturing',
    'b2b_wholesale',
    'b2b_technology',
    'b2b_energy',
    'b2b_agriculture',
    'b2b_chemicals',
    'b2b_mining',
    // Hizmet Sektörleri
    'services_consulting',
    'services_marketing',
    'services_finance',
    'services_legal',
    'services_hr',
    'services_it',
    // Diğer
    'other',
  ], {
    errorMap: () => ({ message: 'Lütfen bir sektör seçiniz' }),
  }),
  
  financing_amount: z
    .number({
      required_error: 'Finansman tutarı gereklidir',
      invalid_type_error: 'Geçerli bir tutar giriniz',
    })
    .min(VALIDATION.MIN_FINANCING_AMOUNT, `Minimum finansman tutarı ${VALIDATION.MIN_FINANCING_AMOUNT.toLocaleString('tr-TR')} TL olmalıdır`)
    .max(VALIDATION.MAX_FINANCING_AMOUNT, `Maximum finansman tutarı ${VALIDATION.MAX_FINANCING_AMOUNT.toLocaleString('tr-TR')} TL olabilir`),
  
  receivables_type: z.enum([
    'invoices',
    'promissory_notes',
    'pos_installments',
    'contracts',
  ], {
    errorMap: () => ({ message: 'Lütfen alacak türünü seçiniz' }),
  }),
  
  payment_terms_months: z
    .number({
      required_error: 'Vade süresi gereklidir',
      invalid_type_error: 'Geçerli bir vade süresi giriniz',
    })
    .int('Vade süresi tam sayı olmalıdır')
    .min(VALIDATION.MIN_PAYMENT_TERMS, `Minimum vade ${VALIDATION.MIN_PAYMENT_TERMS} ay olmalıdır`)
    .max(VALIDATION.MAX_PAYMENT_TERMS, `Maximum vade ${VALIDATION.MAX_PAYMENT_TERMS} ay olabilir`),
})

export type ApplicationFormData = z.infer<typeof applicationSchema>

// Document upload validation
export const documentUploadSchema = z.object({
  file: z
    .instanceof(File)
    .refine(
      (file) => file.size <= VALIDATION.MAX_FILE_SIZE,
      `Dosya boyutu maksimum ${VALIDATION.MAX_FILE_SIZE / 1024 / 1024}MB olabilir`
    )
    .refine(
      (file) => VALIDATION.ALLOWED_FILE_TYPES.includes(file.type as any),
      'Sadece PDF, JPG, PNG ve Excel dosyaları yüklenebilir'
    ),
  
  document_type: z.enum([
    'financial_statement',
    'tax_certificate',
    'trade_registry',
    'receivables_list',
    'other',
  ], {
    errorMap: () => ({ message: 'Lütfen belge türünü seçiniz' }),
  }),
})

export type DocumentUploadData = z.infer<typeof documentUploadSchema>

// Admin login validation
export const adminLoginSchema = z.object({
  email: z
    .string()
    .email('Geçerli bir e-posta adresi giriniz')
    .toLowerCase()
    .trim(),
  
  password: z
    .string()
    .min(8, 'Şifre en az 8 karakter olmalıdır'),
})

export type AdminLoginData = z.infer<typeof adminLoginSchema>

// Application status update validation
export const applicationStatusUpdateSchema = z.object({
  status: z.enum([
    'pending',
    'under_review',
    'approved',
    'rejected',
    'issued',
  ]),
  
  notes: z
    .string()
    .max(1000, 'Notlar en fazla 1000 karakter olabilir')
    .optional(),
})

export type ApplicationStatusUpdateData = z.infer<typeof applicationStatusUpdateSchema>

// Application filter validation
export const applicationFilterSchema = z.object({
  status: z.enum([
    'pending',
    'under_review',
    'approved',
    'rejected',
    'issued',
  ]).optional(),
  
  sector: z.enum([
    'b2c_retail',
    'b2c_automotive',
    'b2c_education',
    'b2b_fmcg',
    'b2b_construction',
    'b2b_logistics',
  ]).optional(),
  
  date_from: z.string().optional(),
  date_to: z.string().optional(),
  
  search: z.string().optional(),
})

export type ApplicationFilterData = z.infer<typeof applicationFilterSchema>
