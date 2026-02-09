// KolayMoney.com Constants

export const SECTORS = {
  b2c_retail: 'Perakende',
  b2c_automotive: 'Otomotiv',
  b2c_education: 'Eğitim',
  b2b_fmcg: 'FMCG',
  b2b_construction: 'İnşaat',
  b2b_logistics: 'Lojistik',
} as const

export const RECEIVABLES_TYPES = {
  invoices: 'Faturalar',
  promissory_notes: 'Senetler',
  pos_installments: 'POS Taksitleri',
  contracts: 'Sözleşmeler',
} as const

export const APPLICATION_STATUSES = {
  pending: 'Beklemede',
  under_review: 'İnceleniyor',
  approved: 'Onaylandı',
  rejected: 'Reddedildi',
  issued: 'İhraç Edildi',
} as const

export const DOCUMENT_TYPES = {
  financial_statement: 'Mali Tablo',
  tax_certificate: 'Vergi Levhası',
  trade_registry: 'Ticaret Sicil Gazetesi',
  receivables_list: 'Alacak Listesi',
  other: 'Diğer',
} as const

export const ADMIN_ROLES = {
  super_admin: 'Süper Admin',
  admin: 'Admin',
  viewer: 'Görüntüleyici',
} as const

// Validation constants
export const VALIDATION = {
  MIN_FINANCING_AMOUNT: 100000,
  MAX_FINANCING_AMOUNT: 100000000,
  MIN_PAYMENT_TERMS: 0,
  MAX_PAYMENT_TERMS: 18,
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_FILE_TYPES: ['application/pdf', 'image/jpeg', 'image/png', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
} as const

// UI constants
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 50,
} as const

// Phone format
export const PHONE_FORMAT = {
  COUNTRY_CODE: '+90',
  PLACEHOLDER: '+90 5XX XXX XX XX',
  REGEX: /^\+90\d{10}$/,
} as const

// Tax number format
export const TAX_NUMBER = {
  LENGTH: 10,
  PLACEHOLDER: 'XXXXXXXXXX',
  REGEX: /^\d{10}$/,
} as const
