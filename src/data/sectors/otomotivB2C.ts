/**
 * Otomotiv B2C (Lastik, Akü, Yedek Parça) Sektörü
 * VDMK Finansman Use Case'leri
 */

import { SectorData } from '@/types/sector'
import { compareVDMKvsFactoring, formatCurrency, formatPercent } from '@/utils/financialCalculations'
import { FINANCIAL_DATA } from '@/lib/config/financialData'

export const otomotivB2CData: SectorData = {
  slug: 'otomotiv-b2c',
  name: 'Otomotiv B2C (Lastik, Akü, Yedek Parça)',
  category: 'B2C',
  paymentTerm: '3-9 ay',
  icon: '🚗',
  image: '/img/sectors/automotive.webp',
  
  summary: 'Otomotiv yan sanayi sektöründe tüketicilerin %60\'ı taksitle alışveriş yapıyor. Lastik, akü, yedek parça gibi ürünlerde ortalama vade 6 ay, sepet değeri 3.000-15.000 TL.',
  
  description: 'Otomotiv yan sanayi perakendecileri için VDMK finansmanı ile taksit alacaklarınızı hemen nakde çevirin, mevsimsel stok yatırımları yapın.',
  
  stats: {
    marketSize: '52 Milyar TL',
    creditSalesRatio: '%60',
    avgTerm: '6 ay',
    avgBasket: '8.000 TL',
    collectionRate: `%${FINANCIAL_DATA.rates.collectionRates.otomotivB2C.value}`
  },
  
  benefits: [
    'Taksit alacaklarını 7 gün içinde nakde çevirme',
    'Mevsimsel lastik stoku (kış/yaz) finansmanı',
    'Tedarikçi ödemelerinde %2-3 erken ödeme iskontosu',
    'Nakit döngüsünü 180 günden 20 güne düşürme',
    'Yeni şube açılışı ve genişleme yatırımları'
  ],
  
  requirements: [
    'Minimum 6 aylık faaliyet süresi',
    'Düzenli taksit satış performansı',
    'Minimum 5M TL yıllık ciro',
    `Tahsilat performansı %${FINANCIAL_DATA.rates.collectionRates.otomotivB2C.value - 3} üzeri`,
    `Minimum işlem tutarı: ${formatCurrency(FINANCIAL_DATA.rates.vdmk.minAmount.value)}`
  ],
  
  useCases: [
    // USE CASE 1: Lastik Taksit Alacakları
    {
      id: 'otomotiv-b2c-1',
      title: 'Lastik Satış Taksit Alacak Finansmanı',
      companyProfile: '12 şube lastik satış & montaj, aylık 2.000 adet lastik satışı',
      
      situation: [
        'Aylık 2.000 takım lastik × 4.500 TL = 9M TL aylık ciro',
        '6 ay vadeli taksit (180 gün)',
        '3 aylık taksit alacağı: 27M TL',
        'Tedarikçi (Michelin, Bridgestone, Pirelli): 30 gün vade',
        'Nakit döngüsü: 150 gün'
      ],
      
      vdmkSolution: [
        '3 aylık taksit alacaklarını (27M TL) VDMK fonuna devir',
        `İskonto: %${FINANCIAL_DATA.rates.vdmk.discountRate.value} yıllık + %${FINANCIAL_DATA.rates.vdmk.commission.value} komisyon`,
        '90 gün ortalama vade ile 23.3M TL net finansman',
        'Tedarikçi ödemelerinde 20 gün erken (%2.5 iskonto)',
        'Nakit döngüsü: 180 gün → 30 gün (150 gün iyileşme)'
      ],
      
      calculationDetails: {
        principal: 27_000_000,
        term: 90,
        vdmkRate: FINANCIAL_DATA.rates.vdmk.discountRate.value,
        vdmkCommission: FINANCIAL_DATA.rates.vdmk.commission.value,
        bankRate: FINANCIAL_DATA.rates.factoring.discountRate.value,
        supplierDiscount: 2.5,
        supplierDiscountDays: 20,
        supplierInvoiceAmount: 22_000_000
      },
      
      financialImpact: (() => {
        const principal = 27_000_000
        const term = 90
        const comparison = compareVDMKvsFactoring(principal, term, 46, 50)
        return [
          { label: 'VDMK: Şirkete Giren Nakit (İlk Gün)', value: formatCurrency(comparison.vdmk.upfrontCash), detail: '%100 nakit girişi', highlight: true, icon: '✅' },
          { label: 'VDMK: Toplam Maliyet (Vade Sonunda)', value: formatCurrency(comparison.vdmk.totalCost), detail: `%46 + %0.5, ${term} gün`, highlight: true },
          { label: 'Faktoring: Şirkete Giren Nakit', value: formatCurrency(comparison.factoring.netCashReceived), detail: `${formatPercent(comparison.factoring.cashUtilizationRate, 1)} (peşin kesinti)`, isAlternative: true, icon: '❌' },
          { label: 'AVANTAJ: Daha Fazla Nakit (İlk Gün)', value: formatCurrency(comparison.cashDifference), detail: `VDMK ile ${formatPercent(comparison.utilizationDifference, 1)} daha fazla nakit`, highlight: true, icon: '💰' },
          { label: 'AVANTAJ: Daha Düşük Maliyet', value: formatCurrency(comparison.costDifference), detail: `%${comparison.costSavingsPercent.toFixed(1)} tasarruf`, highlight: true, icon: '📉' },
          { label: 'ROI (Yatırım Getirisi)', value: formatPercent((comparison.cashDifference / principal) * 100, 2), detail: `${term} günlük dönem için` },
          { label: 'Nakit Döngüsü İyileşmesi', value: '150 gün', detail: '180 gün → 30 gün', highlight: true }
        ]
      })()
    },
    
    // USE CASE 2: Akü Distribütörü Stok Finansmanı
    {
      id: 'otomotiv-b2c-2',
      title: 'Akü Distribütörü Mevsimsel Stok Finansmanı',
      companyProfile: 'Akü distribütörü, 200 bayi ağı, kış sezonu hazırlığı',
      
      situation: [
        'Kış sezonu: 15.000 adet akü stoku gerekli',
        'Tedarikçi (Varta, Mutlu): Eylül\'de peşin ödeme',
        'Toplam stok maliyeti: 30M TL',
        'Bayilere satış: Ekim-Aralık (60 gün vade)',
        'Mevcut nakit: 10M TL (yetersiz)'
      ],
      
      vdmkSolution: [
        'Geçmiş yıl kış sezonu performansı analizi (tahsilat %85)',
        '25M TL VDMK ihracı (geçmiş alacak + gelecek taahhüt)',
        `İskonto: %${FINANCIAL_DATA.rates.vdmk.discountRate.value} yıllık, 90 gün ortalama vade`,
        '21.6M TL net finansman',
        'Tedarikçilere peşin ödeme (%3 iskonto)'
      ],
      
      calculationDetails: {
        principal: 25_000_000,
        term: 90,
        vdmkRate: FINANCIAL_DATA.rates.vdmk.discountRate.value,
        vdmkCommission: FINANCIAL_DATA.rates.vdmk.commission.value,
        bankRate: FINANCIAL_DATA.rates.interestRates.stockFinancing.value,
        supplierDiscount: 3,
        supplierDiscountDays: 0,
        supplierInvoiceAmount: 25_000_000
      },
      
      financialImpact: (() => {
        const principal = 25_000_000
        const term = 90
        const comparison = compareVDMKvsFactoring(principal, term, 46, 50)
        const seasonRevenue = 45_000_000
        const grossProfit = seasonRevenue * 0.22
        const netProfit = grossProfit - comparison.vdmk.totalCost
        return [
          { label: 'Sezon Hedef Cirosu', value: formatCurrency(seasonRevenue), detail: '15.000 adet akü satışı', highlight: false },
          { label: 'VDMK: Şirkete Giren Nakit (İlk Gün)', value: formatCurrency(comparison.vdmk.upfrontCash), detail: '%100 nakit girişi', highlight: true, icon: '✅' },
          { label: 'VDMK: Toplam Maliyet (Vade Sonunda)', value: formatCurrency(comparison.vdmk.totalCost), detail: `%46 + %0.5, ${term} gün`, highlight: true },
          { label: 'Faktoring: Şirkete Giren Nakit', value: formatCurrency(comparison.factoring.netCashReceived), detail: `${formatPercent(comparison.factoring.cashUtilizationRate, 1)} (peşin kesinti)`, isAlternative: true, icon: '❌' },
          { label: 'AVANTAJ: Daha Fazla Nakit (İlk Gün)', value: formatCurrency(comparison.cashDifference), detail: `VDMK ile ${formatPercent(comparison.utilizationDifference, 1)} daha fazla nakit`, highlight: true, icon: '💰' },
          { label: 'Net Sezon Karı', value: formatCurrency(netProfit), detail: 'Brüt kar - VDMK maliyeti', highlight: true },
          { label: 'ROI (Yatırım Getirisi)', value: formatPercent((comparison.cashDifference / principal) * 100, 2), detail: `${term} günlük dönem için` }
        ]
      })()
    },
    
    // USE CASE 3: Yedek Parça E-ticaret
    {
      id: 'otomotiv-b2c-3',
      title: 'Yedek Parça E-ticaret Hızlı Büyüme',
      companyProfile: 'Online yedek parça mağazası, aylık 12.000 sipariş, ortalama sepet 1.200 TL',
      
      situation: [
        'Aylık 12.000 sipariş × 1.200 TL = 14.4M TL aylık ciro',
        'Kredi kartı taksit alacakları (3-6 ay)',
        'POS blokeli alacaklar: 45 gün nakit döngüsü',
        'Hızlı büyüme: %180 YoY, ancak nakit sıkıntısı',
        'Stok çeşitliliği artırma ihtiyacı'
      ],
      
      vdmkSolution: [
        'POS taksit alacaklarını 7 gün içinde nakde çevir',
        '12M TL aylık likidite',
        `İskonto: %${FINANCIAL_DATA.rates.vdmk.discountRate.value} yıllık, ortalama 45 gün`,
        'Stok çeşitliliği ve derinliği artırma',
        'Tedarikçi ödemelerinde 15 gün erken ödeme (%2.5 iskonto)'
      ],
      
      calculationDetails: {
        principal: 14_400_000,
        term: 45,
        vdmkRate: FINANCIAL_DATA.rates.vdmk.discountRate.value,
        vdmkCommission: FINANCIAL_DATA.rates.vdmk.commission.value,
        bankRate: FINANCIAL_DATA.rates.interestRates.cashCredit.value,
        supplierDiscount: 2.5,
        supplierDiscountDays: 15,
        supplierInvoiceAmount: 10_000_000
      },
      
      financialImpact: (() => {
        const principal = 14_400_000
        const term = 45
        const comparison = compareVDMKvsFactoring(principal, term, 46, 50)
        return [
          { label: 'VDMK: Şirkete Giren Nakit (İlk Gün)', value: formatCurrency(comparison.vdmk.upfrontCash), detail: '%100 nakit girişi', highlight: true, icon: '✅' },
          { label: 'VDMK: Toplam Maliyet (Vade Sonunda)', value: formatCurrency(comparison.vdmk.totalCost), detail: `%46 + %0.5, ${term} gün`, highlight: true },
          { label: 'Faktoring: Şirkete Giren Nakit', value: formatCurrency(comparison.factoring.netCashReceived), detail: `${formatPercent(comparison.factoring.cashUtilizationRate, 1)} (peşin kesinti)`, isAlternative: true, icon: '❌' },
          { label: 'AVANTAJ: Daha Fazla Nakit (İlk Gün)', value: formatCurrency(comparison.cashDifference), detail: `VDMK ile ${formatPercent(comparison.utilizationDifference, 1)} daha fazla nakit`, highlight: true, icon: '💰' },
          { label: 'AVANTAJ: Daha Düşük Maliyet', value: formatCurrency(comparison.costDifference), detail: `%${comparison.costSavingsPercent.toFixed(1)} tasarruf`, highlight: true, icon: '📉' },
          { label: 'Nakit Döngüsü İyileşmesi', value: '38 gün', detail: '45 gün → 7 gün', highlight: true },
          { label: 'ROI (Yatırım Getirisi)', value: formatPercent((comparison.cashDifference / principal) * 100, 2), detail: `${term} günlük dönem için` }
        ]
      })()
    }
  ],
  
  seoTitle: 'Otomotiv B2C (Lastik, Akü, Yedek Parça) VDMK Finansman | KolayMoney',
  seoDescription: 'Otomotiv yan sanayi için taksit alacak finansmanı, mevsimsel stok desteği ve e-ticaret büyüme. %35 iskonto ile 7 günde likidite.',
  seoKeywords: ['lastik finansman', 'akü taksit', 'yedek parça', 'VDMK', 'otomotiv yan sanayi']
}
