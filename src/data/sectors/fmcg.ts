/**
 * FMCG (Hızlı Tüketim Ürünleri) Sektörü
 * VDMK Finansman Use Case'leri
 */

import { SectorData } from '@/types/sector'
import { compareVDMKvsFactoring, formatCurrency, formatPercent } from '@/utils/financialCalculations'
import { FINANCIAL_DATA } from '@/lib/config/financialData'

export const fmcgData: SectorData = {
  slug: 'fmcg',
  name: 'FMCG (Hızlı Tüketim Ürünleri)',
  category: 'B2B',
  paymentTerm: '30-90 gün',
  icon: '🛒',
  image: '/img/sectors/fmcg.webp',
  
  summary: 'FMCG sektöründe market zincirleri ve bayilere satışlarda ortalama vade 60 gün. Yüksek ciro, düşük marj, hızlı stok devir hızı.',
  
  description: 'FMCG distribütörleri için VDMK finansmanı ile market zinciri alacaklarınızı hemen nakde çevirin, stok devir hızınızı artırın.',
  
  stats: {
    marketSize: '650 Milyar TL',
    creditSalesRatio: '%90',
    avgTerm: '60 gün',
    avgBasket: '150.000 TL',
    collectionRate: `%${FINANCIAL_DATA.rates.collectionRates.fmcg.value}`
  },
  
  benefits: [
    'Market zinciri fatura alacaklarını 7 günde nakde çevirme',
    'Stok devir hızını 2 katına çıkarma',
    'Üretici ödemelerinde %1-2 erken ödeme iskontosu',
    'Nakit döngüsünü 60 günden 7 güne düşürme',
    'Kampanya dönemlerinde stok artırma imkanı'
  ],
  
  requirements: [
    'Minimum 2 yıl faaliyet süresi',
    'Düzenli fatura kesimi ve tahsilat',
    'Minimum 50M TL yıllık ciro',
    `Tahsilat performansı %${FINANCIAL_DATA.rates.collectionRates.fmcg.value - 1} üzeri`,
    `Minimum işlem tutarı: ${formatCurrency(FINANCIAL_DATA.rates.vdmk.minAmount.value)}`
  ],
  
  useCases: [
    // USE CASE 1: Market Zinciri Tedarikçi
    {
      id: 'fmcg-1',
      title: 'Market Zinciri Tedarikçi Fatura Alacak Finansmanı',
      companyProfile: 'FMCG distribütörü, 5 büyük market zincirine tedarik, aylık 80M TL ciro',
      
      situation: [
        'Aylık 80M TL ciro (gıda, temizlik, kişisel bakım)',
        'Market zincirleri fatura vadesi: 60-90 gün (ortalama 75 gün)',
        '2.5 aylık fatura alacağı: 200M TL',
        'Üretici ödemesi: 30 gün vade',
        'Nakit döngüsü: 45 gün (sıkı yönetim gerekli)'
      ],
      
      vdmkSolution: [
        '60 günlük fatura alacaklarını (160M TL) VDMK fonuna devir',
        `İskonto: %${FINANCIAL_DATA.rates.vdmk.discountRate.value} yıllık + %${FINANCIAL_DATA.rates.vdmk.commission.value} komisyon`,
        '60 gün vade ile 150.4M TL net finansman',
        'Üretici ödemelerinde 15 gün erken (%1.5 iskonto)',
        'Nakit döngüsü: 75 gün → 15 gün (60 gün iyileşme)'
      ],
      
      calculationDetails: {
        principal: 160_000_000,
        term: 60,
        vdmkRate: FINANCIAL_DATA.rates.vdmk.discountRate.value,
        vdmkCommission: FINANCIAL_DATA.rates.vdmk.commission.value,
        bankRate: FINANCIAL_DATA.rates.factoring.discountRate.value,
        supplierDiscount: 1.5,
        supplierDiscountDays: 15,
        supplierInvoiceAmount: 120_000_000
      },
      
      financialImpact: (() => {
        const principal = 160_000_000
        const term = 60
        const comparison = compareVDMKvsFactoring(principal, term, 46, 50)
        return [
          { label: 'VDMK: Şirkete Giren Nakit (İlk Gün)', value: formatCurrency(comparison.vdmk.upfrontCash), detail: '%100 nakit girişi', highlight: true, icon: '✅' },
          { label: 'VDMK: Toplam Maliyet (Vade Sonunda)', value: formatCurrency(comparison.vdmk.totalCost), detail: `%46 + %0.5, ${term} gün`, highlight: true },
          { label: 'Faktoring: Şirkete Giren Nakit', value: formatCurrency(comparison.factoring.netCashReceived), detail: `${formatPercent(comparison.factoring.cashUtilizationRate, 1)} (peşin kesinti)`, isAlternative: true, icon: '❌' },
          { label: 'AVANTAJ: Daha Fazla Nakit (İlk Gün)', value: formatCurrency(comparison.cashDifference), detail: `VDMK ile ${formatPercent(comparison.utilizationDifference, 1)} daha fazla nakit`, highlight: true, icon: '💰' },
          { label: 'AVANTAJ: Daha Düşük Maliyet', value: formatCurrency(comparison.costDifference), detail: `%${comparison.costSavingsPercent.toFixed(1)} tasarruf`, highlight: true, icon: '📉' },
          { label: 'ROI (Yatırım Getirisi)', value: formatPercent((comparison.cashDifference / principal) * 100, 2), detail: `${term} günlük dönem için` },
          { label: 'Nakit Döngüsü İyileşmesi', value: '60 gün', detail: '75 gün → 15 gün', highlight: true }
        ]
      })()
    },
    
    // USE CASE 2: Bayi Ağı Distribütörü
    {
      id: 'fmcg-2',
      title: 'Bayi Ağı Distribütörü Stok Finansmanı',
      companyProfile: 'FMCG distribütörü, 800 bayi ağı, bölgesel dağıtım',
      
      situation: [
        'Aylık 50M TL ciro (800 bayi)',
        'Bayilere satış: 45 gün vade',
        'Üretici stok alımı: Peşin veya 15 gün',
        'Kampanya dönemleri: 2 kat stok gerekli',
        'Mevcut nakit: Kampanyalar için yetersiz'
      ],
      
      vdmkSolution: [
        'Bayi fatura alacaklarını VDMK fonuna devir',
        '40M TL VDMK ihracı',
        `İskonto: %${FINANCIAL_DATA.rates.vdmk.discountRate.value} yıllık, 60 gün ortalama vade`,
        'Kampanya stoku için likidite',
        'Üretici peşin ödeme (%2 iskonto)'
      ],
      
      calculationDetails: {
        principal: 40_000_000,
        term: 60,
        vdmkRate: FINANCIAL_DATA.rates.vdmk.discountRate.value,
        vdmkCommission: FINANCIAL_DATA.rates.vdmk.commission.value,
        bankRate: FINANCIAL_DATA.rates.interestRates.stockFinancing.value,
        supplierDiscount: 2,
        supplierDiscountDays: 0,
        supplierInvoiceAmount: 35_000_000
      },
      
      financialImpact: (() => {
        const principal = 40_000_000
        const term = 60
        const comparison = compareVDMKvsFactoring(principal, term, 46, 50)
        const campaignRevenue = 100_000_000
        const grossProfit = campaignRevenue * 0.08
        const netProfit = grossProfit - comparison.vdmk.totalCost
        return [
          { label: 'Kampanya Hedef Cirosu', value: formatCurrency(campaignRevenue), detail: '2 aylık kampanya dönemi', highlight: false },
          { label: 'VDMK: Şirkete Giren Nakit (İlk Gün)', value: formatCurrency(comparison.vdmk.upfrontCash), detail: '%100 nakit girişi', highlight: true, icon: '✅' },
          { label: 'VDMK: Toplam Maliyet (Vade Sonunda)', value: formatCurrency(comparison.vdmk.totalCost), detail: `%46 + %0.5, ${term} gün`, highlight: true },
          { label: 'Faktoring: Şirkete Giren Nakit', value: formatCurrency(comparison.factoring.netCashReceived), detail: `${formatPercent(comparison.factoring.cashUtilizationRate, 1)} (peşin kesinti)`, isAlternative: true, icon: '❌' },
          { label: 'AVANTAJ: Daha Fazla Nakit (İlk Gün)', value: formatCurrency(comparison.cashDifference), detail: `VDMK ile ${formatPercent(comparison.utilizationDifference, 1)} daha fazla nakit`, highlight: true, icon: '💰' },
          { label: 'Net Kampanya Karı', value: formatCurrency(netProfit), detail: 'Brüt kar - VDMK maliyeti', highlight: true },
          { label: 'ROI (Yatırım Getirisi)', value: formatPercent((comparison.cashDifference / principal) * 100, 2), detail: `${term} günlük dönem için` }
        ]
      })()
    },
    
    // USE CASE 3: E-ticaret FMCG Platformu
    {
      id: 'fmcg-3',
      title: 'E-ticaret FMCG Platformu Hızlı Büyüme',
      companyProfile: 'Online market, aylık 30.000 sipariş, ortalama sepet 350 TL',
      
      situation: [
        'Aylık 30.000 sipariş × 350 TL = 10.5M TL aylık ciro',
        'Kredi kartı POS alacakları: 45 gün',
        'Tedarikçi ödemeleri: 15 gün',
        'Hızlı büyüme: %200 YoY',
        'Depo ve lojistik yatırımı gerekli'
      ],
      
      vdmkSolution: [
        'POS alacaklarını 7 gün içinde nakde çevir',
        '9M TL aylık likidite',
        `İskonto: %${FINANCIAL_DATA.rates.vdmk.discountRate.value} yıllık, ortalama 45 gün`,
        'Depo genişletme ve otomasyon yatırımı',
        'Tedarikçi ödemelerinde peşin ödeme avantajı'
      ],
      
      calculationDetails: {
        principal: 10_500_000,
        term: 45,
        vdmkRate: FINANCIAL_DATA.rates.vdmk.discountRate.value,
        vdmkCommission: FINANCIAL_DATA.rates.vdmk.commission.value,
        bankRate: FINANCIAL_DATA.rates.interestRates.cashCredit.value,
        supplierDiscount: 1,
        supplierDiscountDays: 0,
        supplierInvoiceAmount: 8_000_000
      },
      
      financialImpact: (() => {
        const principal = 10_500_000
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
  
  seoTitle: 'FMCG (Hızlı Tüketim) Sektörü VDMK Finansman | KolayMoney',
  seoDescription: 'FMCG distribütörleri için market zinciri alacak finansmanı, bayi ağı stok desteği ve e-ticaret büyüme. %35 iskonto ile 7 günde likidite.',
  seoKeywords: ['FMCG finansman', 'market zinciri', 'distribütör', 'VDMK', 'hızlı tüketim']
}
