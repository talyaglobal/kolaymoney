/**
 * FMCG (Hızlı Tüketim Ürünleri) Sektörü
 * VDMK Finansman Use Case'leri
 */

import { SectorData } from '@/types/sector'
import { calculateFullFinancing, formatCurrency, formatPercent } from '@/utils/financialCalculations'
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
        const calc = calculateFullFinancing(160_000_000, 60, FINANCIAL_DATA.rates.factoring.discountRate.value, 120_000_000, 1.5)
        
        return [
          {
            label: 'VDMK Finansman Maliyeti',
            value: formatCurrency(calc.vdmkCost),
            detail: `60 gün, %${FINANCIAL_DATA.rates.vdmk.discountRate.value} yıllık`,
            highlight: false
          },
          {
            label: 'Alternatif Faktoring',
            value: formatCurrency(calc.bankCost),
            detail: `%${FINANCIAL_DATA.rates.factoring.discountRate.value} yıllık faktoring`,
            highlight: false
          },
          {
            label: 'Üretici Erken Ödeme Kazancı',
            value: formatCurrency(calc.supplierDiscount),
            detail: '%1.5 iskonto, 15 gün erken',
            highlight: false
          },
          {
            label: 'Net Tasarruf',
            value: formatCurrency(calc.netSavings),
            detail: 'VDMK vs Faktoring + Üretici İskontosu',
            savingsVsBank: formatCurrency(calc.bankCost - calc.vdmkCost),
            highlight: true
          },
          {
            label: 'ROI (Yatırım Getirisi)',
            value: formatPercent(calc.roi, 2),
            detail: '60 günlük dönem için',
            highlight: true
          },
          {
            label: 'Nakit Döngüsü İyileşmesi',
            value: '60 gün',
            detail: '75 gün → 15 gün',
            highlight: true
          },
          {
            label: 'Stok Devir Hızı Artışı',
            value: '%85',
            detail: 'Likidite ile hızlanma',
            highlight: false
          }
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
        const calc = calculateFullFinancing(40_000_000, 60, 43, 35_000_000, 2)
        const campaignRevenue = 100_000_000
        const grossMargin = 0.08
        const grossProfit = campaignRevenue * grossMargin
        const netProfit = grossProfit - calc.vdmkCost + calc.supplierDiscount
        
        return [
          {
            label: 'Kampanya Hedef Cirosu',
            value: formatCurrency(campaignRevenue),
            detail: '2 aylık kampanya dönemi',
            highlight: false
          },
          {
            label: 'Brüt Kar (%8 marj)',
            value: formatCurrency(grossProfit),
            detail: 'FMCG tipik marjı',
            highlight: false
          },
          {
            label: 'VDMK Finansman Maliyeti',
            value: formatCurrency(calc.vdmkCost),
            detail: `60 gün, %${FINANCIAL_DATA.rates.vdmk.discountRate.value} yıllık`,
            highlight: false
          },
          {
            label: 'Üretici Peşin Ödeme İskontosu',
            value: formatCurrency(calc.supplierDiscount),
            detail: '%2 iskonto',
            highlight: false
          },
          {
            label: 'Net Kampanya Karı',
            value: formatCurrency(netProfit),
            detail: 'Brüt kar - Finansman + İskonto',
            highlight: true
          },
          {
            label: 'Alternatif Banka Stok Kredisi',
            value: formatCurrency(calc.bankCost),
            detail: `%${FINANCIAL_DATA.rates.interestRates.stockFinancing.value} faiz`,
            highlight: false
          },
          {
            label: 'Tasarruf (VDMK vs Faktoring)',
            value: formatCurrency(calc.bankCost - calc.vdmkCost),
            detail: 'Düşük maliyet avantajı',
            highlight: true
          }
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
        const calc = calculateFullFinancing(10_500_000, 45, 44, 8_000_000, 1)
        const growthImpact = 10_500_000 * 0.70
        
        return [
          {
            label: 'Nakit Döngüsü İyileşmesi',
            value: '38 gün',
            detail: '45 gün → 7 gün',
            highlight: true
          },
          {
            label: 'VDMK Maliyeti (Aylık)',
            value: formatCurrency(calc.vdmkCost),
            detail: `45 gün, %${FINANCIAL_DATA.rates.vdmk.discountRate.value} yıllık`,
            highlight: false
          },
          {
            label: 'Tedarikçi Peşin Ödeme Kazancı',
            value: formatCurrency(calc.supplierDiscount),
            detail: '%1 iskonto',
            highlight: false
          },
          {
            label: 'Net Finansman Maliyeti',
            value: formatCurrency(calc.vdmkCost - calc.supplierDiscount),
            detail: 'VDMK - Tedarikçi iskontosu',
            highlight: false
          },
          {
            label: 'Ek Büyüme Potansiyeli',
            value: formatCurrency(growthImpact),
            detail: 'Likidite ile %70 ek ciro',
            highlight: true
          },
          {
            label: 'Yıllık Büyüme Hedefi',
            value: '%200 → %320',
            detail: 'VDMK sayesinde hızlanma',
            highlight: true
          },
          {
            label: 'Depo Yatırımı',
            value: formatCurrency(3_000_000),
            detail: 'Genişletme ve otomasyon',
            highlight: false
          }
        ]
      })()
    }
  ],
  
  seoTitle: 'FMCG (Hızlı Tüketim) Sektörü VDMK Finansman | KolayMoney',
  seoDescription: 'FMCG distribütörleri için market zinciri alacak finansmanı, bayi ağı stok desteği ve e-ticaret büyüme. %35 iskonto ile 7 günde likidite.',
  seoKeywords: ['FMCG finansman', 'market zinciri', 'distribütör', 'VDMK', 'hızlı tüketim']
}
