// KolayMoney.com Constants

export const SECTORS = {
  // B2C Sektörler
  b2c_retail: 'Perakende',
  b2c_automotive: 'Otomotiv',
  b2c_education: 'Eğitim',
  b2c_healthcare: 'Sağlık',
  b2c_hospitality: 'Otelcilik & Turizm',
  b2c_food_beverage: 'Gıda & İçecek',
  b2c_fashion: 'Moda & Tekstil',
  b2c_electronics: 'Elektronik',
  b2c_home_garden: 'Ev & Bahçe',
  b2c_sports: 'Spor & Fitness',
  
  // B2B Sektörler
  b2b_fmcg: 'FMCG (Hızlı Tüketim Malları)',
  b2b_construction: 'İnşaat & Yapı',
  b2b_logistics: 'Lojistik & Taşımacılık',
  b2b_manufacturing: 'İmalat & Üretim',
  b2b_wholesale: 'Toptan Ticaret',
  b2b_technology: 'Teknoloji & Yazılım',
  b2b_energy: 'Enerji',
  b2b_agriculture: 'Tarım & Hayvancılık',
  b2b_chemicals: 'Kimya & İlaç',
  b2b_mining: 'Madencilik',
  
  // Hizmet Sektörleri
  services_consulting: 'Danışmanlık',
  services_marketing: 'Pazarlama & Reklam',
  services_finance: 'Finans & Sigorta',
  services_legal: 'Hukuk',
  services_hr: 'İnsan Kaynakları',
  services_it: 'Bilişim Hizmetleri',
  
  // Diğer
  other: 'Diğer',
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
