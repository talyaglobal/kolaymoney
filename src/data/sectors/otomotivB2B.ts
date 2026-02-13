/**
 * Otomotiv B2B (Filo, Bayi) Sektörü
 * VDMK Finansman Use Case'leri
 */

import { SectorData } from '@/types/sector'
import { compareVDMKvsFactoring, calculateBankLoanCost, formatCurrency, formatPercent } from '@/utils/financialCalculations'
import { FINANCIAL_DATA } from '@/lib/config/financialData'

export const otomotivB2BData: SectorData = {
  slug: 'otomotiv-b2b',
  name: 'Otomotiv B2B (Filo, Bayi)',
  category: 'B2B',
  paymentTerm: '60-180 gün',
  icon: '🚙',
  image: '/img/sectors/automotive-b2b.webp',
  
  summary: 'Otomotiv B2B sektöründe filo satışları ve bayi ödemeleri ortalama 120 gün vadeli. Yüksek tutarlar, uzun vadeler, düşük marjlar.',
  
  description: 'Otomotiv bayileri ve filo satış firmaları için VDMK finansmanı ile satış alacaklarınızı hemen nakde çevirin, stok yönetimini optimize edin.',
  
  stats: {
    marketSize: '380 Milyar TL',
    creditSalesRatio: '%85',
    avgTerm: '120 gün',
    avgBasket: '1.200.000 TL',
    collectionRate: `%${FINANCIAL_DATA.rates.collectionRates.otomotivB2B.value}`
  },
  
  benefits: [
    'Filo satış alacaklarını 7 günde nakde çevirme',
    'Bayi stok finansmanı sağlama',
    'Üretici ödemelerinde erken ödeme avantajı',
    'Nakit döngüsünü 180 günden 30 güne düşürme',
    'Yeni model lansmanlarında stok imkanı'
  ],
  
  requirements: [
    'Minimum 2 yıl faaliyet süresi',
    'Düzenli satış ve tahsilat geçmişi',
    'Minimum 50M TL yıllık ciro',
    `Tahsilat performansı %${FINANCIAL_DATA.rates.collectionRates.otomotivB2B.value - 2} üzeri`,
    `Minimum işlem tutarı: ${formatCurrency(FINANCIAL_DATA.rates.vdmk.minAmount.value)}`
  ],
  
  useCases: [
    // USE CASE 1: Filo Satış Alacakları
    {
      id: 'otomotiv-b2b-1',
      title: 'Kurumsal Filo Satış Alacak Finansmanı',
      companyProfile: 'Otomotiv bayisi, aylık 80 adet filo satışı (ticari araç, binek)',
      
      situation: [
        'Aylık 80 adet araç × 800.000 TL = 64M TL aylık ciro',
        'Filo müşterileri: 120-180 gün vade (ortalama 150 gün)',
        '5 aylık satış alacağı: 320M TL',
        'Üretici (Ford, Fiat, Renault): 60 gün vade',
        'Nakit döngüsü: 90 gün (kritik)'
      ],
      
      vdmkSolution: [
        '3 aylık filo satış alacaklarını (192M TL) VDMK fonuna devir',
        `İskonto: %${FINANCIAL_DATA.rates.vdmk.discountRate.value} yıllık + %${FINANCIAL_DATA.rates.vdmk.commission.value} komisyon`,
        '120 gün ortalama vade ile 170M TL net finansman',
        'Üretici ödemelerinde 30 gün erken (%1.5 iskonto)',
        'Nakit döngüsü: 150 gün → 60 gün (90 gün iyileşme)'
      ],
      
      calculationDetails: {
        principal: 192_000_000,
        term: 120,
        vdmkRate: FINANCIAL_DATA.rates.vdmk.discountRate.value,
        vdmkCommission: FINANCIAL_DATA.rates.vdmk.commission.value,
        bankRate: FINANCIAL_DATA.rates.factoring.discountRate.value,
        supplierDiscount: 1.5,
        supplierDiscountDays: 30,
        supplierInvoiceAmount: 160_000_000
      },
      
      financialImpact: (() => {
        const principal = 192_000_000
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
    
    // USE CASE 2: Bayi Stok Finansmanı
    {
      id: 'otomotiv-b2b-2',
      title: 'Otomotiv Bayisi Yeni Model Stok Finansmanı',
      companyProfile: 'Yetkili bayi, yeni model lansmanı, 100 araç stoku',
      
      situation: [
        'Yeni model lansmanı: 100 araç stoku gerekli',
        'Toplam stok maliyeti: 120M TL',
        'Üretici: Peşin veya 30 gün',
        'Satış beklentisi: 90 gün içinde %70 satış',
        'Mevcut nakit: 40M TL (yetersiz)'
      ],
      
      vdmkSolution: [
        'Geçmiş satış alacak portföyü analizi (tahsilat %94)',
        '85M TL VDMK ihracı (mevcut + gelecek satış taahhüt)',
        `İskonto: %${FINANCIAL_DATA.rates.vdmk.discountRate.value} yıllık, 90 gün ortalama vade`,
        '73.4M TL net finansman',
        'Üreticiye peşin ödeme (%2 iskonto)'
      ],
      
      calculationDetails: {
        principal: 85_000_000,
        term: 90,
        vdmkRate: FINANCIAL_DATA.rates.vdmk.discountRate.value,
        vdmkCommission: FINANCIAL_DATA.rates.vdmk.commission.value,
        bankRate: FINANCIAL_DATA.rates.interestRates.stockFinancing.value,
        supplierDiscount: 2,
        supplierDiscountDays: 0,
        supplierInvoiceAmount: 80_000_000
      },
      
      financialImpact: (() => {
        const principal = 85_000_000
        const term = 90
        const comparison = compareVDMKvsFactoring(principal, term, 46, 50)
        const salesRevenue = 100 * 1_400_000 * 0.70
        const grossProfit = salesRevenue * 0.08
        const netProfit = grossProfit - comparison.vdmk.totalCost
        return [
          { label: 'Lansman Satış Hedefi', value: formatCurrency(salesRevenue), detail: '70 araç × 1.4M TL', highlight: false },
          { label: 'VDMK: Şirkete Giren Nakit (İlk Gün)', value: formatCurrency(comparison.vdmk.upfrontCash), detail: '%100 nakit girişi', highlight: true, icon: '✅' },
          { label: 'VDMK: Toplam Maliyet (Vade Sonunda)', value: formatCurrency(comparison.vdmk.totalCost), detail: `%46 + %0.5, ${term} gün`, highlight: true },
          { label: 'Faktoring: Şirkete Giren Nakit', value: formatCurrency(comparison.factoring.netCashReceived), detail: `${formatPercent(comparison.factoring.cashUtilizationRate, 1)} (peşin kesinti)`, isAlternative: true, icon: '❌' },
          { label: 'AVANTAJ: Daha Fazla Nakit (İlk Gün)', value: formatCurrency(comparison.cashDifference), detail: `VDMK ile ${formatPercent(comparison.utilizationDifference, 1)} daha fazla nakit`, highlight: true, icon: '💰' },
          { label: 'Net Lansman Karı', value: formatCurrency(netProfit), detail: 'Brüt kar - VDMK maliyeti', highlight: true },
          { label: 'ROI (Yatırım Getirisi)', value: formatPercent((comparison.cashDifference / principal) * 100, 2), detail: `${term} günlük dönem için` }
        ]
      })()
    },
    
    // USE CASE 3: İkinci El Araç Alım-Satım
    {
      id: 'otomotiv-b2b-3',
      title: 'İkinci El Araç Alım-Satım Stok Finansmanı',
      companyProfile: 'İkinci el araç galerisi, aylık 120 araç alım-satım',
      
      situation: [
        'Aylık 120 araç × 350.000 TL = 42M TL aylık ciro',
        'Alım: Peşin ödeme',
        'Satış: 60-90 gün vade (kurumsal müşteriler)',
        '2 aylık stok + alacak: 84M TL',
        'Nakit döngüsü: 75 gün'
      ],
      
      vdmkSolution: [
        'Satış alacaklarını VDMK fonuna devir',
        '60M TL VDMK ihracı',
        `İskonto: %${FINANCIAL_DATA.rates.vdmk.discountRate.value} yıllık, 75 gün ortalama vade`,
        'Alım için sürekli likidite',
        'Stok devir hızını artırma'
      ],
      
      calculationDetails: {
        principal: 60_000_000,
        term: 75,
        vdmkRate: FINANCIAL_DATA.rates.vdmk.discountRate.value,
        vdmkCommission: FINANCIAL_DATA.rates.vdmk.commission.value,
        bankRate: FINANCIAL_DATA.rates.interestRates.cashCredit.value,
        supplierDiscount: 0,
        supplierDiscountDays: 0,
        supplierInvoiceAmount: 0
      },
      
      financialImpact: (() => {
        const principal = 60_000_000
        const term = 75
        const comparison = compareVDMKvsFactoring(principal, term, 46, 50)
        return [
          { label: 'VDMK: Şirkete Giren Nakit (İlk Gün)', value: formatCurrency(comparison.vdmk.upfrontCash), detail: '%100 nakit girişi', highlight: true, icon: '✅' },
          { label: 'VDMK: Toplam Maliyet (Vade Sonunda)', value: formatCurrency(comparison.vdmk.totalCost), detail: `%46 + %0.5, ${term} gün`, highlight: true },
          { label: 'Faktoring: Şirkete Giren Nakit', value: formatCurrency(comparison.factoring.netCashReceived), detail: `${formatPercent(comparison.factoring.cashUtilizationRate, 1)} (peşin kesinti)`, isAlternative: true, icon: '❌' },
          { label: 'AVANTAJ: Daha Fazla Nakit (İlk Gün)', value: formatCurrency(comparison.cashDifference), detail: `VDMK ile ${formatPercent(comparison.utilizationDifference, 1)} daha fazla nakit`, highlight: true, icon: '💰' },
          { label: 'AVANTAJ: Daha Düşük Maliyet', value: formatCurrency(comparison.costDifference), detail: `%${comparison.costSavingsPercent.toFixed(1)} tasarruf`, highlight: true, icon: '📉' },
          { label: 'Nakit Döngüsü İyileşmesi', value: '68 gün', detail: '75 gün → 7 gün', highlight: true },
          { label: 'ROI (Yatırım Getirisi)', value: formatPercent((comparison.cashDifference / principal) * 100, 2), detail: `${term} günlük dönem için` }
        ]
      })()
    }
  ],
  
  seoTitle: 'Otomotiv B2B (Filo, Bayi) VDMK Finansman | KolayMoney',
  seoDescription: 'Otomotiv bayileri için filo satış alacak finansmanı, yeni model stok desteği ve ikinci el araç likidite çözümleri. %35 iskonto ile 7 günde nakit.',
  seoKeywords: ['otomotiv bayi', 'filo satış', 'araç finansman', 'VDMK', 'ikinci el araç']
}
