/**
 * Elektronik & Teknoloji Ürünleri Sektörü
 * VDMK Finansman Use Case'leri
 */

import { SectorData } from '@/types/sector'
import { compareVDMKvsFactoring, calculateBankLoanCost, formatCurrency, formatPercent } from '@/utils/financialCalculations'
import { FINANCIAL_DATA } from '@/lib/config/financialData'

export const elektronikData: SectorData = {
  slug: 'elektronik',
  name: 'Elektronik & Teknoloji Ürünleri',
  category: 'B2C',
  paymentTerm: '6-18 ay',
  icon: '📱',
  image: '/img/sectors/electronics.webp',
  
  summary: 'Elektronik sektöründe tüketicilerin %70\'i taksitle alışveriş yapıyor. Akıllı telefon, laptop, tablet gibi ürünlerde ortalama vade 12 ay, sepet değeri 15.000-50.000 TL.',
  
  description: 'Elektronik perakendecileri için VDMK finansmanı ile yüksek değerli taksit alacaklarınızı hemen nakde çevirin, yeni model lansmanlarında stok avantajı yakalayın.',
  
  stats: {
    marketSize: '85 Milyar TL',
    creditSalesRatio: '%70',
    avgTerm: '12 ay',
    avgBasket: '25.000 TL',
    collectionRate: `%${FINANCIAL_DATA.rates.collectionRates.elektronik.value}`
  },
  
  benefits: [
    'Yüksek değerli taksit alacaklarını 7 günde nakde çevirme',
    'Yeni model lansmanlarında ilk stok avantajı',
    'Tedarikçi ödemelerinde %2-4 erken ödeme iskontosu',
    'Nakit döngüsünü 360 günden 30 güne düşürme',
    'Kredi kartı POS alacaklarını hızlandırma'
  ],
  
  requirements: [
    'Minimum 6 aylık faaliyet süresi',
    'Düzenli taksit satış performansı',
    'Minimum 10M TL yıllık ciro',
    `Tahsilat performansı %${FINANCIAL_DATA.rates.collectionRates.elektronik.value - 2} üzeri`,
    `Minimum işlem tutarı: ${formatCurrency(FINANCIAL_DATA.rates.vdmk.minAmount.value)}`
  ],
  
  useCases: [
    // USE CASE 1: iPhone Taksit Alacakları
    {
      id: 'elektronik-1',
      title: 'Akıllı Telefon (iPhone) Taksit Alacak Finansmanı',
      companyProfile: 'Apple Premium Reseller, 8 mağaza, aylık 1.200 adet iPhone satışı',
      
      situation: [
        'Aylık 1.200 adet iPhone satışı (ortalama 35.000 TL = 42M TL aylık ciro)',
        '12 ay vadeli taksit (360 gün)',
        '6 aylık taksit alacağı portföyü: 252M TL',
        'Apple tedarikçi ödemesi: 30 gün vade, aylık 35M TL',
        'Nakit döngüsü: 330 gün (kritik likidite sıkıntısı)'
      ],
      
      vdmkSolution: [
        '3 aylık taksit alacaklarını (126M TL) VDMK fonuna devir',
        `İskonto: %${FINANCIAL_DATA.rates.vdmk.discountRate.value} yıllık + %${FINANCIAL_DATA.rates.vdmk.commission.value} komisyon (${FINANCIAL_DATA.rates.vdmk.discountRate.date})`,
        '90 gün ortalama vade ile 108.6M TL net finansman',
        'Apple tedarikçi ödemelerinde 20 gün erken (%2 iskonto)',
        'Nakit döngüsü: 360 gün → 40 gün (320 gün iyileşme)'
      ],
      
      calculationDetails: {
        principal: 126_000_000,
        term: 90,
        vdmkRate: FINANCIAL_DATA.rates.vdmk.discountRate.value,
        vdmkCommission: FINANCIAL_DATA.rates.vdmk.commission.value,
        bankRate: FINANCIAL_DATA.rates.factoring.discountRate.value,
        supplierDiscount: 2,
        supplierDiscountDays: 20,
        supplierInvoiceAmount: 105_000_000
      },
      
      financialImpact: (() => {
        const principal = 126_000_000
        const term = 90
        const comparison = compareVDMKvsFactoring(principal, term, 46, 50)
        const bankCost = calculateBankLoanCost(principal, 42, term)
        return [
          { label: 'VDMK: Şirkete Giren Nakit (İlk Gün)', value: formatCurrency(comparison.vdmk.upfrontCash), detail: '%100 nakit girişi, kesinti yok', highlight: true, icon: '✅' },
          { label: 'VDMK: Toplam Maliyet (Vade Sonunda)', value: formatCurrency(comparison.vdmk.totalCost), detail: `%46 iskonto + %0.5 komisyon, ${term} gün`, highlight: true },
          { label: 'Faktoring: Şirkete Giren Nakit', value: formatCurrency(comparison.factoring.netCashReceived), detail: `${formatPercent(comparison.factoring.cashUtilizationRate, 1)} nakit girişi (peşin kesinti)`, isAlternative: true, icon: '❌' },
          { label: 'Banka Kredisi: Maliyet', value: formatCurrency(bankCost), detail: '%42 yıllık faiz, 90 gün', isAlternative: true },
          { label: 'AVANTAJ: Daha Fazla Nakit (İlk Gün)', value: formatCurrency(comparison.cashDifference), detail: `VDMK ile faktoring'e göre ${formatPercent(comparison.utilizationDifference, 1)} daha fazla nakit`, highlight: true, icon: '💰' },
          { label: 'AVANTAJ: Daha Düşük Maliyet', value: formatCurrency(comparison.costDifference), detail: `Faktoring'e göre ${formatPercent(comparison.costSavingsPercent, 1)} tasarruf`, highlight: true, icon: '📉' },
          { label: 'AVANTAJ: Bilanço Dışı', value: 'Borç Artmaz', detail: 'VDMK bilanço dışı kalır', icon: '📊' },
          { label: 'ROI (Yatırım Getirisi)', value: formatPercent((comparison.cashDifference / principal) * 100, 2), detail: '90 günlük dönem için' },
          { label: 'Nakit Döngüsü İyileşmesi', value: '320 gün', detail: '360 gün → 40 gün', highlight: true }
        ]
      })()
    },
    
    // USE CASE 2: Laptop Kampanya Stok Finansmanı
    {
      id: 'elektronik-2',
      title: 'Okul Dönemi Laptop Kampanya Finansmanı',
      companyProfile: 'Teknoloji perakendecisi, okul dönemi kampanyası için 5.000 adet laptop stoku',
      
      situation: [
        'Eylül okul dönemi: 5.000 adet laptop (ortalama 18.000 TL)',
        'Toplam stok maliyeti: 90M TL',
        'Tedarikçi (Dell, HP, Lenovo): Peşin ödeme talep ediyor',
        'Mevcut nakit: 25M TL (yetersiz)',
        'Kampanya satış süresi: 90 gün, %80 satış beklentisi'
      ],
      
      vdmkSolution: [
        'Geçmiş yıl laptop taksit alacak performansı analizi (%90 tahsilat)',
        '70M TL VDMK ihracı (geçmiş + gelecek alacak taahhüdü)',
        `İskonto: %${FINANCIAL_DATA.rates.vdmk.discountRate.value} yıllık, 120 gün ortalama vade`,
        '65M TL stok finansmanı sağlandı',
        'Tedarikçilere peşin ödeme (%3 iskonto kazancı)'
      ],
      
      calculationDetails: {
        principal: 70_000_000,
        term: 120,
        vdmkRate: FINANCIAL_DATA.rates.vdmk.discountRate.value,
        vdmkCommission: FINANCIAL_DATA.rates.vdmk.commission.value,
        bankRate: FINANCIAL_DATA.rates.interestRates.stockFinancing.value,
        supplierDiscount: 3,
        supplierDiscountDays: 0,
        supplierInvoiceAmount: 65_000_000
      },
      
      financialImpact: (() => {
        const principal = 70_000_000
        const term = 120
        const comparison = compareVDMKvsFactoring(principal, term, 46, 50)
        const campaignRevenue = 5000 * 18000 * 0.80
        const grossProfit = campaignRevenue * 0.18
        const netProfit = grossProfit - comparison.vdmk.totalCost
        return [
          { label: 'Kampanya Hedef Cirosu', value: formatCurrency(campaignRevenue), detail: '4.000 adet × 18.000 TL (%80 satış)', highlight: false },
          { label: 'VDMK: Şirkete Giren Nakit (İlk Gün)', value: formatCurrency(comparison.vdmk.upfrontCash), detail: '%100 nakit girişi', highlight: true, icon: '✅' },
          { label: 'VDMK: Toplam Maliyet (Vade Sonunda)', value: formatCurrency(comparison.vdmk.totalCost), detail: `%46 + %0.5, ${term} gün`, highlight: true },
          { label: 'Faktoring: Şirkete Giren Nakit', value: formatCurrency(comparison.factoring.netCashReceived), detail: `${formatPercent(comparison.factoring.cashUtilizationRate, 1)} (peşin kesinti)`, isAlternative: true, icon: '❌' },
          { label: 'AVANTAJ: Daha Fazla Nakit (İlk Gün)', value: formatCurrency(comparison.cashDifference), detail: `VDMK ile ${formatPercent(comparison.utilizationDifference, 1)} daha fazla nakit`, highlight: true, icon: '💰' },
          { label: 'AVANTAJ: Daha Düşük Maliyet', value: formatCurrency(comparison.costDifference), detail: `%${comparison.costSavingsPercent.toFixed(1)} tasarruf`, highlight: true, icon: '📉' },
          { label: 'Net Kampanya Karı', value: formatCurrency(netProfit), detail: 'Brüt kar - VDMK maliyeti', highlight: true },
          { label: 'ROI (Yatırım Getirisi)', value: formatPercent((comparison.cashDifference / principal) * 100, 2), detail: `${term} günlük dönem için` }
        ]
      })()
    },
    
    // USE CASE 3: E-ticaret Gaming Ekipmanları
    {
      id: 'elektronik-3',
      title: 'Gaming Ekipmanları E-ticaret Hızlı Büyüme',
      companyProfile: 'Gaming ekipmanları e-ticaret, aylık 15.000 sipariş, ortalama sepet 3.500 TL',
      
      situation: [
        'Aylık 15.000 sipariş × 3.500 TL = 52.5M TL aylık ciro',
        'Kredi kartı taksit alacakları (6-9 ay)',
        'POS blokeli alacaklar: 45 gün nakit döngüsü',
        'Hızlı büyüme: %120 YoY, ancak nakit sıkıntısı',
        'Yeni ürün grupları (VR, Streaming) için stok gerekli'
      ],
      
      vdmkSolution: [
        'POS taksit alacaklarını 7 gün içinde nakde çevir',
        '40M TL aylık likidite (52.5M TL × %76 iskonto)',
        `İskonto: %${FINANCIAL_DATA.rates.vdmk.discountRate.value} yıllık, ortalama 45 gün`,
        'Yeni ürün grupları için stok yatırımı',
        'Tedarikçi ödemelerinde 15 gün erken ödeme (%3 iskonto)'
      ],
      
      calculationDetails: {
        principal: 52_500_000,
        term: 45,
        vdmkRate: FINANCIAL_DATA.rates.vdmk.discountRate.value,
        vdmkCommission: FINANCIAL_DATA.rates.vdmk.commission.value,
        bankRate: FINANCIAL_DATA.rates.interestRates.cashCredit.value,
        supplierDiscount: 3,
        supplierDiscountDays: 15,
        supplierInvoiceAmount: 40_000_000
      },
      
      financialImpact: (() => {
        const principal = 52_500_000
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
  
  seoTitle: 'Elektronik & Teknoloji Sektörü VDMK Finansman | KolayMoney',
  seoDescription: 'Elektronik perakendecileri için taksit alacak finansmanı, yeni model lansmanları ve kampanya stok desteği. %35 iskonto ile 7 günde likidite.',
  seoKeywords: ['elektronik finansman', 'telefon taksit', 'laptop finansman', 'VDMK', 'teknoloji perakende']
}
