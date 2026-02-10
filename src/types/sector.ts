/**
 * Sektör Veri Tipleri - KolayMoney.com
 */

export interface FinancialImpact {
  label: string
  value: string
  detail?: string
  savingsVsBank?: string
  highlight?: boolean // Önemli metrikleri vurgula
}

export interface CalculationDetails {
  principal: number // Ana para (TL)
  term: number // Vade (gün)
  vdmkRate: number // VDMK yıllık iskonto % (config'den çekilecek)
  vdmkCommission: number // Komisyon % (config'den çekilecek)
  bankRate: number // Alternatif banka kredisi faizi %
  supplierDiscount?: number // Tedarikçi erken ödeme iskontosu %
  supplierDiscountDays?: number // Kaç gün erken ödeme
  supplierInvoiceAmount?: number // Tedarikçi fatura tutarı (TL)
}

export interface SectorUseCase {
  id: string
  title: string
  companyProfile: string
  situation: string[]
  vdmkSolution: string[]
  financialImpact: FinancialImpact[]
  calculationDetails: CalculationDetails
}

export interface SectorStats {
  marketSize: string // "45 Milyar TL"
  creditSalesRatio: string // "%65"
  avgTerm: string // "9 ay"
  avgBasket: string // "15.000 TL"
  collectionRate: string // "%92"
}

export interface SectorData {
  slug: string
  name: string
  category: 'B2C' | 'B2B'
  paymentTerm: string // "6-12 ay"
  summary: string
  description: string
  icon: string // Emoji
  image?: string // Sektör görseli
  stats: SectorStats
  useCases: SectorUseCase[]
  benefits: string[]
  requirements: string[]
  seoTitle: string
  seoDescription: string
  seoKeywords: string[]
}

export type SectorSlug = 
  | 'beyaz-esya'
  | 'elektronik'
  | 'mobilya'
  | 'otomotiv-b2c'
  | 'fmcg'
  | 'insaat'
  | 'otomotiv-b2b'
  | 'makine-ekipman'
  | 'lojistik'
  | 'tarim'

export type SectorCategory = 'B2C' | 'B2B'
