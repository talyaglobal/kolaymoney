/**
 * Merkezi Finansal Veri Konfigürasyonu
 * Güncel Tarih: 10 Şubat 2026
 * 
 * Bu dosya tüm finansal verileri içerir ve admin panelden güncellenebilir.
 * Her veri tarihli ve kaynaklıdır.
 */

import { FinancialDataConfig } from '@/types/financial'

export const FINANCIAL_DATA: FinancialDataConfig = {
  metadata: {
    lastUpdated: '2026-02-10',
    version: '1.0.0',
    dataSource: 'TCMB, Bloomberg, Piyasa Araştırması',
  },
  
  rates: {
    // Döviz Kurları (10 Şubat 2026)
    currencies: {
      usdTry: {
        value: 43.59,
        date: '2026-02-10',
        source: 'TCMB',
        note: 'Günlük kapanış kuru'
      },
      eurTry: {
        value: 51.70,
        date: '2026-02-10',
        source: 'TCMB',
        note: 'Günlük kapanış kuru'
      },
      usdTry6MonthAvg: {
        value: 42.00,
        date: '2026-02-10',
        source: 'TCMB',
        note: '6 aylık ortalama (Ağustos 2025 - Şubat 2026)'
      },
      eurTry6MonthAvg: {
        value: 50.00,
        date: '2026-02-10',
        source: 'TCMB',
        note: '6 aylık ortalama (Ağustos 2025 - Şubat 2026)'
      }
    },
    
    // Faiz Oranları (10 Şubat 2026)
    interestRates: {
      tcmbPolicy: {
        value: 37.00,
        date: '2026-02-10',
        source: 'TCMB',
        note: 'Politika faizi (1 haftalık repo)'
      },
      commercialLoan: {
        value: 42.00,
        date: '2026-02-10',
        source: 'Piyasa Ortalaması',
        note: 'Ticari kredi yıllık faiz'
      },
      smeCredit: {
        value: 40.00,
        date: '2026-02-10',
        source: 'Piyasa Ortalaması',
        note: 'KOBİ kredisi yıllık faiz'
      },
      consumerCredit: {
        value: 45.00,
        date: '2026-02-10',
        source: 'Piyasa Ortalaması',
        note: 'Tüketici kredisi yıllık faiz'
      },
      creditCard: {
        value: 50.00,
        date: '2026-02-10',
        source: 'Piyasa Ortalaması',
        note: 'Kredi kartı taksit yıllık faiz'
      },
      stockFinancing: {
        value: 43.00,
        date: '2026-02-10',
        source: 'Piyasa Ortalaması',
        note: 'Stok finansmanı kredisi'
      },
      cashCredit: {
        value: 44.00,
        date: '2026-02-10',
        source: 'Piyasa Ortalaması',
        note: 'Nakit kredi yıllık faiz'
      }
    },
    
    // VDMK Oranları (10 Şubat 2026)
    vdmk: {
      discountRate: {
        value: 35.00,
        date: '2026-02-10',
        source: 'KolayMoney',
        note: 'VDMK yıllık iskonto oranı'
      },
      commission: {
        value: 0.50,
        date: '2026-02-10',
        source: 'KolayMoney',
        note: 'Tek seferlik komisyon'
      },
      minAmount: {
        value: 500000,
        date: '2026-02-10',
        source: 'KolayMoney',
        note: 'Minimum işlem tutarı (TL)'
      },
      maxTerm: {
        value: 180,
        date: '2026-02-10',
        source: 'KolayMoney',
        note: 'Maksimum vade (gün)'
      },
      avgTerm: {
        value: 90,
        date: '2026-02-10',
        source: 'Piyasa Ortalaması',
        note: 'Ortalama vade (gün)'
      },
      marketSize: {
        value: 150,
        date: '2026-02-10',
        source: 'SPK',
        note: 'VDMK piyasa büyüklüğü (Milyar TL)'
      }
    },
    
    // Faktoring Oranları (10 Şubat 2026)
    factoring: {
      discountRate: {
        value: 36.00,
        date: '2026-02-10',
        source: 'Piyasa Ortalaması',
        note: 'Faktoring yıllık iskonto'
      },
      commission: {
        value: 1.50,
        date: '2026-02-10',
        source: 'Piyasa Ortalaması',
        note: 'Faktoring komisyon'
      }
    },
    
    // Tedarikçi Erken Ödeme İskontoları (10 Şubat 2026)
    supplierDiscounts: {
      days10: {
        value: 2.00,
        date: '2026-02-10',
        source: 'Sektör Ortalaması',
        note: '10 gün erken ödeme iskontosu'
      },
      days20: {
        value: 3.50,
        date: '2026-02-10',
        source: 'Sektör Ortalaması',
        note: '20 gün erken ödeme iskontosu'
      },
      days30: {
        value: 5.00,
        date: '2026-02-10',
        source: 'Sektör Ortalaması',
        note: '30 gün erken ödeme iskontosu'
      }
    },
    
    // Sektörel Tahsilat Performansları (10 Şubat 2026)
    collectionRates: {
      beyazEsya: {
        value: 92.00,
        date: '2026-02-10',
        source: 'Sektör Araştırması',
        note: 'Beyaz eşya tahsilat başarı oranı'
      },
      elektronik: {
        value: 90.00,
        date: '2026-02-10',
        source: 'Sektör Araştırması',
        note: 'Elektronik tahsilat başarı oranı'
      },
      mobilya: {
        value: 88.00,
        date: '2026-02-10',
        source: 'Sektör Araştırması',
        note: 'Mobilya tahsilat başarı oranı'
      },
      otomotivB2C: {
        value: 85.00,
        date: '2026-02-10',
        source: 'Sektör Araştırması',
        note: 'Otomotiv B2C tahsilat başarı oranı'
      },
      otomotivB2B: {
        value: 94.00,
        date: '2026-02-10',
        source: 'Sektör Araştırması',
        note: 'Otomotiv B2B tahsilat başarı oranı'
      },
      fmcg: {
        value: 98.00,
        date: '2026-02-10',
        source: 'Sektör Araştırması',
        note: 'FMCG tahsilat başarı oranı'
      },
      insaat: {
        value: 87.00,
        date: '2026-02-10',
        source: 'Sektör Araştırması',
        note: 'İnşaat tahsilat başarı oranı'
      },
      lojistik: {
        value: 95.00,
        date: '2026-02-10',
        source: 'Sektör Araştırması',
        note: 'Lojistik tahsilat başarı oranı'
      },
      tarim: {
        value: 89.00,
        date: '2026-02-10',
        source: 'Sektör Araştırması',
        note: 'Tarım tahsilat başarı oranı'
      },
      makineEkipman: {
        value: 93.00,
        date: '2026-02-10',
        source: 'Sektör Araştırması',
        note: 'Makine & ekipman tahsilat başarı oranı'
      }
    }
  }
}

/**
 * Helper fonksiyon: Veri eskiliğini kontrol et
 * @param dateString - ISO format date
 * @returns boolean - 30 günden eski mi?
 */
export function isDataStale(dateString: string): boolean {
  const dataDate = new Date(dateString)
  const today = new Date()
  const diffDays = Math.floor((today.getTime() - dataDate.getTime()) / (1000 * 60 * 60 * 24))
  return diffDays > 30
}

/**
 * Helper fonksiyon: Tarih formatla
 * @param dateString - ISO format date
 * @returns string - "10 Şubat 2026"
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const months = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ]
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
}

/**
 * Helper fonksiyon: DatedValue'yu display için formatla
 */
export function formatDatedValue(
  datedValue: { value: number; date: string; source?: string },
  formatter: (value: number) => string
): string {
  const formattedValue = formatter(datedValue.value)
  const formattedDate = formatDate(datedValue.date)
  const staleWarning = isDataStale(datedValue.date) ? ' ⚠️ ESKİ VERİ' : ''
  
  return `${formattedValue} (${formattedDate}${datedValue.source ? ' - ' + datedValue.source : ''})${staleWarning}`
}
