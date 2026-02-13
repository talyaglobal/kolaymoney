/**
 * Makine & Ekipman Sektörü
 * VDMK Finansman Use Case'leri
 */

import { SectorData } from '@/types/sector'
import { compareVDMKvsFactoring, formatCurrency, formatPercent } from '@/utils/financialCalculations'
import { FINANCIAL_DATA } from '@/lib/config/financialData'

export const makineEkipmanData: SectorData = {
  slug: 'makine-ekipman',
  name: 'Makine & Ekipman',
  category: 'B2B',
  paymentTerm: '90-180 gün',
  icon: '⚙️',
  image: '/img/sectors/machinery.webp',
  
  summary: 'Makine ve ekipman sektöründe sanayi müşterilerine satışlarda ortalama vade 120 gün. Yüksek tutarlar, uzun vadeler, proje bazlı satış.',
  
  description: 'Makine ve ekipman tedarikçileri için VDMK finansmanı ile satış alacaklarınızı hemen nakde çevirin, büyük projelere girebilme kapasitesi kazanın.',
  
  stats: {
    marketSize: '180 Milyar TL',
    creditSalesRatio: '%75',
    avgTerm: '120 gün',
    avgBasket: '3.500.000 TL',
    collectionRate: `%${FINANCIAL_DATA.rates.collectionRates.makineEkipman.value}`
  },
  
  benefits: [
    'Sanayi müşterisi alacaklarını 7 günde nakde çevirme',
    'Büyük proje ve ihale kapasitesi',
    'İthalatçı ödemelerinde erken ödeme avantajı',
    'Nakit döngüsünü 180 günden 30 güne düşürme',
    'Ekipman kiralama portföyü oluşturma'
  ],
  
  requirements: [
    'Minimum 3 yıl faaliyet süresi',
    'Düzenli satış ve tahsilat geçmişi',
    'Minimum 40M TL yıllık ciro',
    `Tahsilat performansı %${FINANCIAL_DATA.rates.collectionRates.makineEkipman.value - 2} üzeri`,
    `Minimum işlem tutarı: ${formatCurrency(FINANCIAL_DATA.rates.vdmk.minAmount.value)}`
  ],
  
  useCases: [
    // USE CASE 1: Sanayi Makineleri Satış Alacakları
    {
      id: 'makine-ekipman-1',
      title: 'Sanayi Makineleri Satış Alacak Finansmanı',
      companyProfile: 'CNC, pres, torna makineleri tedarikçi, aylık 15 adet satış',
      
      situation: [
        'Aylık 15 adet makine × 5M TL = 75M TL aylık ciro',
        'Sanayi müşterileri: 120-180 gün vade (ortalama 150 gün)',
        '5 aylık satış alacağı: 375M TL',
        'İthalatçı/Üretici: 60 gün vade',
        'Nakit döngüsü: 90 gün (kritik)'
      ],
      
      vdmkSolution: [
        '3 aylık satış alacaklarını (225M TL) VDMK fonuna devir',
        `İskonto: %${FINANCIAL_DATA.rates.vdmk.discountRate.value} yıllık + %${FINANCIAL_DATA.rates.vdmk.commission.value} komisyon`,
        '120 gün ortalama vade ile 199M TL net finansman',
        'İthalatçı ödemelerinde 30 gün erken (%2 iskonto)',
        'Nakit döngüsü: 150 gün → 60 gün (90 gün iyileşme)'
      ],
      
      calculationDetails: {
        principal: 225_000_000,
        term: 120,
        vdmkRate: FINANCIAL_DATA.rates.vdmk.discountRate.value,
        vdmkCommission: FINANCIAL_DATA.rates.vdmk.commission.value,
        bankRate: FINANCIAL_DATA.rates.factoring.discountRate.value,
        supplierDiscount: 2,
        supplierDiscountDays: 30,
        supplierInvoiceAmount: 180_000_000
      },
      
      financialImpact: (() => {
        const principal = 225_000_000
        const term = 120
        const comparison = compareVDMKvsFactoring(principal, term, 46, 50)
        return [
          { label: 'VDMK: Şirkete Giren Nakit (İlk Gün)', value: formatCurrency(comparison.vdmk.upfrontCash), detail: '%100 nakit girişi', highlight: true, icon: '✅' },
          { label: 'VDMK: Toplam Maliyet (Vade Sonunda)', value: formatCurrency(comparison.vdmk.totalCost), detail: `%46 + %0.5, ${term} gün`, highlight: true },
          { label: 'Faktoring: Şirkete Giren Nakit', value: formatCurrency(comparison.factoring.netCashReceived), detail: `${formatPercent(comparison.factoring.cashUtilizationRate, 1)} (peşin kesinti)`, isAlternative: true, icon: '❌' },
          { label: 'AVANTAJ: Daha Fazla Nakit (İlk Gün)', value: formatCurrency(comparison.cashDifference), detail: `VDMK ile ${formatPercent(comparison.utilizationDifference, 1)} daha fazla nakit`, highlight: true, icon: '💰' },
          { label: 'AVANTAJ: Daha Düşük Maliyet', value: formatCurrency(comparison.costDifference), detail: `%${comparison.costSavingsPercent.toFixed(1)} tasarruf`, highlight: true, icon: '📉' },
          { label: 'ROI (Yatırım Getirisi)', value: formatPercent((comparison.cashDifference / principal) * 100, 2), detail: `${term} günlük dönem için` },
          { label: 'Nakit Döngüsü İyileşmesi', value: '90 gün', detail: '150 gün → 60 gün', highlight: true }
        ]
      })()
    },
    
    // USE CASE 2: Ekipman Kiralama Portföyü
    {
      id: 'makine-ekipman-2',
      title: 'İnşaat Ekipmanı Kiralama Portföyü Finansmanı',
      companyProfile: 'İnşaat ekipmanı kiralama, 200 adet ekipman (vinç, forklift, jeneratör)',
      
      situation: [
        'Yeni ekipman alımı: 50 adet (vinç, forklift)',
        'Toplam yatırım: 100M TL',
        'Kiralama geliri: Aylık 8M TL',
        'Geri ödeme süresi: 18 ay',
        'Mevcut nakit: 30M TL (yetersiz)'
      ],
      
      vdmkSolution: [
        'Mevcut kiralama alacak portföyü analizi (tahsilat %93)',
        '75M TL VDMK ihracı (mevcut + gelecek kiralama geliri taahhüt)',
        `İskonto: %${FINANCIAL_DATA.rates.vdmk.discountRate.value} yıllık, 90 gün ortalama vade`,
        '64.7M TL net finansman',
        'Ekipman tedarikçisine peşin ödeme (%3 iskonto)'
      ],
      
      calculationDetails: {
        principal: 75_000_000,
        term: 90,
        vdmkRate: FINANCIAL_DATA.rates.vdmk.discountRate.value,
        vdmkCommission: FINANCIAL_DATA.rates.vdmk.commission.value,
        bankRate: FINANCIAL_DATA.rates.factoring.discountRate.value,
        supplierDiscount: 3,
        supplierDiscountDays: 0,
        supplierInvoiceAmount: 70_000_000
      },
      
      financialImpact: (() => {
        const principal = 75_000_000
        const term = 90
        const comparison = compareVDMKvsFactoring(principal, term, 46, 50)
        return [
          { label: 'VDMK: Şirkete Giren Nakit (İlk Gün)', value: formatCurrency(comparison.vdmk.upfrontCash), detail: '%100 nakit girişi', highlight: true, icon: '✅' },
          { label: 'VDMK: Toplam Maliyet (Vade Sonunda)', value: formatCurrency(comparison.vdmk.totalCost), detail: `%46 + %0.5, ${term} gün`, highlight: true },
          { label: 'Faktoring: Şirkete Giren Nakit', value: formatCurrency(comparison.factoring.netCashReceived), detail: `${formatPercent(comparison.factoring.cashUtilizationRate, 1)} (peşin kesinti)`, isAlternative: true, icon: '❌' },
          { label: 'AVANTAJ: Daha Fazla Nakit (İlk Gün)', value: formatCurrency(comparison.cashDifference), detail: `VDMK ile ${formatPercent(comparison.utilizationDifference, 1)} daha fazla nakit`, highlight: true, icon: '💰' },
          { label: 'AVANTAJ: Daha Düşük Maliyet', value: formatCurrency(comparison.costDifference), detail: `%${comparison.costSavingsPercent.toFixed(1)} tasarruf`, highlight: true, icon: '📉' },
          { label: 'ROI (Yatırım Getirisi)', value: formatPercent((comparison.cashDifference / principal) * 100, 2),
            detail: 'Net kar / Finansman',
            highlight: true
          }
        ]
      })()
    },
    
    // USE CASE 3: İthalat Finansmanı
    {
      id: 'makine-ekipman-3',
      title: 'Makine İthalatı Finansman ve Distribüsyon',
      companyProfile: 'Makine ithalatçı & distribütör, Avrupa üreticileri temsilcisi',
      
      situation: [
        'Yıllık ithalat: 120M TL (Almanya, İtalya)',
        'Üretici ödeme: Peşin veya 30 gün (EUR)',
        'Müşteri satış: 120 gün vade',
        'Kur riski: USD/EUR dalgalanması',
        'Nakit döngüsü: 90 gün'
      ],
      
      vdmkSolution: [
        'Müşteri satış alacaklarını VDMK fonuna devir',
        '80M TL VDMK ihracı',
        `İskonto: %${FINANCIAL_DATA.rates.vdmk.discountRate.value} yıllık, 90 gün ortalama vade`,
        'İthalat için sürekli likidite',
        'Forward kur kilitleme imkanı'
      ],
      
      calculationDetails: {
        principal: 80_000_000,
        term: 90,
        vdmkRate: FINANCIAL_DATA.rates.vdmk.discountRate.value,
        vdmkCommission: FINANCIAL_DATA.rates.vdmk.commission.value,
        bankRate: FINANCIAL_DATA.rates.interestRates.cashCredit.value,
        supplierDiscount: 0,
        supplierDiscountDays: 0,
        supplierInvoiceAmount: 0
      },
      
      financialImpact: (() => {
        const principal = 80_000_000
        const term = 90
        const comparison = compareVDMKvsFactoring(principal, term, 46, 50)
        return [
          { label: 'VDMK: Şirkete Giren Nakit (İlk Gün)', value: formatCurrency(comparison.vdmk.upfrontCash), detail: '%100 nakit girişi', highlight: true, icon: '✅' },
          { label: 'VDMK: Toplam Maliyet (Vade Sonunda)', value: formatCurrency(comparison.vdmk.totalCost), detail: `%46 + %0.5, ${term} gün`, highlight: true },
          { label: 'Faktoring: Şirkete Giren Nakit', value: formatCurrency(comparison.factoring.netCashReceived), detail: `${formatPercent(comparison.factoring.cashUtilizationRate, 1)} (peşin kesinti)`, isAlternative: true, icon: '❌' },
          { label: 'AVANTAJ: Daha Fazla Nakit (İlk Gün)', value: formatCurrency(comparison.cashDifference), detail: `VDMK ile ${formatPercent(comparison.utilizationDifference, 1)} daha fazla nakit`, highlight: true, icon: '💰' },
          { label: 'AVANTAJ: Daha Düşük Maliyet', value: formatCurrency(comparison.costDifference), detail: `%${comparison.costSavingsPercent.toFixed(1)} tasarruf`, highlight: true, icon: '📉' },
          { label: 'Nakit Döngüsü İyileşmesi', value: '83 gün', detail: '120 gün → 37 gün (ortalama)', highlight: true },
          { label: 'ROI (Yatırım Getirisi)', value: formatPercent((comparison.cashDifference / principal) * 100, 2), detail: `${term} günlük dönem için` }
        ]
      })()
    }
  ],
  
  seoTitle: 'Makine & Ekipman Sektörü VDMK Finansman | KolayMoney',
  seoDescription: 'Makine ve ekipman tedarikçileri için satış alacak finansmanı, kiralama portföyü ve ithalat desteği. %35 iskonto ile 7 günde likidite.',
  seoKeywords: ['makine finansman', 'ekipman kiralama', 'sanayi makineleri', 'VDMK', 'ithalat finansmanı']
}
