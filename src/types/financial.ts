/**
 * Finansal Veri Tipleri - KolayMoney.com
 * Tüm finansal veriler tarihli ve kaynaklı
 */

export interface DatedValue {
  value: number
  date: string // ISO format: "2026-02-10"
  source?: string // "TCMB", "Piyasa Ortalaması", "Bloomberg" vb.
  note?: string // Ek açıklama
}

export interface FinancialRates {
  // Döviz Kurları
  currencies: {
    usdTry: DatedValue
    eurTry: DatedValue
    usdTry6MonthAvg: DatedValue
    eurTry6MonthAvg: DatedValue
  }
  
  // Faiz Oranları
  interestRates: {
    tcmbPolicy: DatedValue // TCMB Politika Faizi
    commercialLoan: DatedValue // Ticari Kredi
    smeCredit: DatedValue // KOBİ Kredisi
    consumerCredit: DatedValue // Tüketici Kredisi
    creditCard: DatedValue // Kredi Kartı Taksit
    stockFinancing: DatedValue // Stok Finansmanı
    cashCredit: DatedValue // Nakit Kredi
  }
  
  // VDMK Oranları
  vdmk: {
    discountRate: DatedValue // Yıllık iskonto oranı
    commission: DatedValue // Tek seferlik komisyon
    minAmount: DatedValue // Minimum işlem tutarı
    maxTerm: DatedValue // Maksimum vade (gün)
    avgTerm: DatedValue // Ortalama vade (gün)
    marketSize: DatedValue // Piyasa büyüklüğü (Milyar TL)
  }
  
  // Faktoring Oranları
  factoring: {
    discountRate: DatedValue // Yıllık iskonto
    commission: DatedValue // Komisyon
  }
  
  // Tedarikçi Erken Ödeme İskontoları
  supplierDiscounts: {
    days10: DatedValue // 10 gün erken ödeme iskontosu
    days20: DatedValue // 20 gün erken ödeme iskontosu
    days30: DatedValue // 30 gün erken ödeme iskontosu
  }
  
  // Sektörel Tahsilat Performansları
  collectionRates: {
    beyazEsya: DatedValue
    elektronik: DatedValue
    mobilya: DatedValue
    otomotivB2C: DatedValue
    otomotivB2B: DatedValue
    fmcg: DatedValue
    insaat: DatedValue
    lojistik: DatedValue
    tarim: DatedValue
    makineEkipman: DatedValue
  }
}

export interface FinancialDataMetadata {
  lastUpdated: string // ISO date
  updatedBy?: string // Admin user
  version: string // "1.0.0"
  dataSource: string // "TCMB, Bloomberg, Piyasa Araştırması"
}

export interface FinancialDataConfig {
  metadata: FinancialDataMetadata
  rates: FinancialRates
}

/**
 * Helper type for calculation results
 */
export interface CalculationResult {
  vdmkCost: number
  bankCost: number
  supplierDiscount: number
  netSavings: number
  roi: number
  netFinancing: number
  effectiveRate: number // Efektif yıllık maliyet %
}

/**
 * Helper type for displaying dated values
 */
export interface DisplayValue {
  formatted: string // "₺1.500.000"
  raw: number
  date: string
  source?: string
  isStale: boolean // 30 günden eski mi?
}
