/**
 * İnşaat & Yapı Malzemeleri Sektörü
 * VDMK Finansman Use Case'leri
 */

import { SectorData } from '@/types/sector'
import { calculateFullFinancing, formatCurrency, formatPercent } from '@/utils/financialCalculations'
import { FINANCIAL_DATA } from '@/lib/config/financialData'

export const insaatData: SectorData = {
  slug: 'insaat',
  name: 'İnşaat & Yapı Malzemeleri',
  category: 'B2B',
  paymentTerm: '60-180 gün',
  icon: '🏗️',
  image: '/img/sectors/construction.webp',
  
  summary: 'İnşaat sektöründe müteahhit ödemeleri ortalama 120 gün vadeli. Proje bazlı satış, yüksek tutarlar, uzun vadeler.',
  
  description: 'İnşaat ve yapı malzemeleri sektöründe VDMK finansmanı ile müteahhit alacaklarınızı hemen nakde çevirin, büyük projelere girebilme kapasitesi kazanın.',
  
  stats: {
    marketSize: '420 Milyar TL',
    creditSalesRatio: '%80',
    avgTerm: '120 gün',
    avgBasket: '2.500.000 TL',
    collectionRate: `%${FINANCIAL_DATA.rates.collectionRates.insaat.value}`
  },
  
  benefits: [
    'Müteahhit fatura alacaklarını 7 günde nakde çevirme',
    'Büyük projelere girebilme kapasitesi',
    'Tedarikçi ödemelerinde %2-3 erken ödeme iskontosu',
    'Nakit döngüsünü 180 günden 30 güne düşürme',
    'Proje portföyü çeşitlendirme imkanı'
  ],
  
  requirements: [
    'Minimum 3 yıl faaliyet süresi',
    'Düzenli proje teslimi ve tahsilat',
    'Minimum 30M TL yıllık ciro',
    `Tahsilat performansı %${FINANCIAL_DATA.rates.collectionRates.insaat.value - 3} üzeri`,
    `Minimum işlem tutarı: ${formatCurrency(FINANCIAL_DATA.rates.vdmk.minAmount.value)}`
  ],
  
  useCases: [
    // USE CASE 1: Müteahhit Fatura Alacakları
    {
      id: 'insaat-1',
      title: 'Yapı Malzemeleri Müteahhit Alacak Finansmanı',
      companyProfile: 'Yapı malzemeleri tedarikçi, 50+ müteahhit ile çalışma, aylık 40M TL ciro',
      
      situation: [
        'Aylık 40M TL ciro (çimento, demir, tuğla, vb.)',
        'Müteahhit fatura vadesi: 90-150 gün (ortalama 120 gün)',
        '4 aylık fatura alacağı: 160M TL',
        'Üretici/İthalatçı ödemesi: 45 gün vade',
        'Nakit döngüsü: 75 gün (sıkı yönetim gerekli)'
      ],
      
      vdmkSolution: [
        '3 aylık müteahhit alacaklarını (120M TL) VDMK fonuna devir',
        `İskonto: %${FINANCIAL_DATA.rates.vdmk.discountRate.value} yıllık + %${FINANCIAL_DATA.rates.vdmk.commission.value} komisyon`,
        '90 gün ortalama vade ile 103.5M TL net finansman',
        'Üretici ödemelerinde 20 gün erken (%2.5 iskonto)',
        'Nakit döngüsü: 120 gün → 30 gün (90 gün iyileşme)'
      ],
      
      calculationDetails: {
        principal: 120_000_000,
        term: 90,
        vdmkRate: FINANCIAL_DATA.rates.vdmk.discountRate.value,
        vdmkCommission: FINANCIAL_DATA.rates.vdmk.commission.value,
        bankRate: FINANCIAL_DATA.rates.factoring.discountRate.value,
        supplierDiscount: 2.5,
        supplierDiscountDays: 20,
        supplierInvoiceAmount: 90_000_000
      },
      
      financialImpact: (() => {
        const calc = calculateFullFinancing(120_000_000, 90, FINANCIAL_DATA.rates.factoring.discountRate.value, 90_000_000, 2.5)
        
        return [
          {
            label: 'VDMK Finansman Maliyeti',
            value: formatCurrency(calc.vdmkCost),
            detail: `90 gün, %${FINANCIAL_DATA.rates.vdmk.discountRate.value} yıllık`,
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
            detail: '%2.5 iskonto, 20 gün erken',
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
            detail: '90 günlük dönem için',
            highlight: true
          },
          {
            label: 'Nakit Döngüsü İyileşmesi',
            value: '90 gün',
            detail: '120 gün → 30 gün',
            highlight: true
          },
          {
            label: 'Ek Proje Kapasitesi',
            value: '+%45',
            detail: 'Likidite ile kapasite artışı',
            highlight: false
          }
        ]
      })()
    },
    
    // USE CASE 2: Büyük Proje Finansmanı
    {
      id: 'insaat-2',
      title: 'Büyük İnşaat Projesi Malzeme Finansmanı',
      companyProfile: 'Yapı malzemeleri tedarikçi, 500 daireli konut projesi',
      
      situation: [
        'Yeni proje: 500 daireli konut (yapı malzemeleri)',
        'Proje tutarı: 80M TL',
        'Müteahhit ödeme planı: Hakediş bazlı, 120 gün ortalama',
        'Üretici/İthalatçı: Peşin veya 30 gün',
        'Mevcut nakit: 25M TL (yetersiz)'
      ],
      
      vdmkSolution: [
        'Geçmiş proje alacak portföyü analizi (tahsilat %87)',
        '60M TL VDMK ihracı (mevcut + yeni proje taahhüt)',
        `İskonto: %${FINANCIAL_DATA.rates.vdmk.discountRate.value} yıllık, 120 gün ortalama vade`,
        '53M TL net finansman',
        'Üreticilere peşin ödeme (%3 iskonto)'
      ],
      
      calculationDetails: {
        principal: 60_000_000,
        term: 120,
        vdmkRate: FINANCIAL_DATA.rates.vdmk.discountRate.value,
        vdmkCommission: FINANCIAL_DATA.rates.vdmk.commission.value,
        bankRate: FINANCIAL_DATA.rates.factoring.discountRate.value,
        supplierDiscount: 3,
        supplierDiscountDays: 0,
        supplierInvoiceAmount: 55_000_000
      },
      
      financialImpact: (() => {
        const calc = calculateFullFinancing(60_000_000, 120, FINANCIAL_DATA.rates.factoring.discountRate.value, 55_000_000, 3)
        const projectRevenue = 80_000_000
        const grossMargin = 0.18
        const grossProfit = projectRevenue * grossMargin
        const netProfit = grossProfit - calc.vdmkCost + calc.supplierDiscount
        
        return [
          {
            label: 'Proje Toplam Cirosu',
            value: formatCurrency(projectRevenue),
            detail: '500 daireli konut projesi',
            highlight: false
          },
          {
            label: 'Brüt Kar (%18 marj)',
            value: formatCurrency(grossProfit),
            detail: 'Proje kar marjı',
            highlight: false
          },
          {
            label: 'VDMK Finansman Maliyeti',
            value: formatCurrency(calc.vdmkCost),
            detail: `120 gün, %${FINANCIAL_DATA.rates.vdmk.discountRate.value} yıllık`,
            highlight: false
          },
          {
            label: 'Üretici Peşin Ödeme İskontosu',
            value: formatCurrency(calc.supplierDiscount),
            detail: '%3 iskonto',
            highlight: false
          },
          {
            label: 'Net Proje Karı',
            value: formatCurrency(netProfit),
            detail: 'Brüt kar - Finansman + İskonto',
            highlight: true
          },
          {
            label: 'Alternatif Faktoring',
            value: formatCurrency(calc.bankCost),
            detail: `%${FINANCIAL_DATA.rates.factoring.discountRate.value} faiz`,
            highlight: false
          },
          {
            label: 'Tasarruf (VDMK vs Faktoring)',
            value: formatCurrency(calc.bankCost - calc.vdmkCost),
            detail: 'Düşük maliyet avantajı',
            highlight: true
          },
          {
            label: 'Proje ROI',
            value: formatPercent((netProfit / 60_000_000) * 100, 1),
            detail: 'Net kar / Finansman',
            highlight: true
          }
        ]
      })()
    },
    
    // USE CASE 3: Yapı Malzemeleri Distribütörü
    {
      id: 'insaat-3',
      title: 'Yapı Malzemeleri Distribütörü Çoklu Proje Yönetimi',
      companyProfile: 'Bölgesel distribütör, 30 aktif proje, aylık 35M TL ciro',
      
      situation: [
        'Aylık 35M TL ciro (30 farklı proje)',
        'Proje bazlı fatura vadesi: 90-180 gün',
        '4 aylık alacak portföyü: 140M TL',
        'Üretici ödemeleri: 45 gün',
        'Yeni proje fırsatları: Nakit yetersizliği nedeniyle kaçırılıyor'
      ],
      
      vdmkSolution: [
        'Proje alacaklarını VDMK fonuna devir',
        '100M TL VDMK ihracı',
        `İskonto: %${FINANCIAL_DATA.rates.vdmk.discountRate.value} yıllık, 90 gün ortalama vade`,
        'Yeni proje kapasitesi kazanma',
        'Üretici ödemelerinde erken ödeme avantajı'
      ],
      
      calculationDetails: {
        principal: 100_000_000,
        term: 90,
        vdmkRate: FINANCIAL_DATA.rates.vdmk.discountRate.value,
        vdmkCommission: FINANCIAL_DATA.rates.vdmk.commission.value,
        bankRate: FINANCIAL_DATA.rates.interestRates.cashCredit.value,
        supplierDiscount: 2,
        supplierDiscountDays: 0,
        supplierInvoiceAmount: 80_000_000
      },
      
      financialImpact: (() => {
        const calc = calculateFullFinancing(100_000_000, 90, 44, 80_000_000, 2)
        const newProjectCapacity = 15_000_000 * 12
        
        return [
          {
            label: 'Nakit Döngüsü İyileşmesi',
            value: '83 gün',
            detail: '120 gün → 37 gün (ortalama)',
            highlight: true
          },
          {
            label: 'VDMK Maliyeti (3 Aylık)',
            value: formatCurrency(calc.vdmkCost),
            detail: `90 gün, %${FINANCIAL_DATA.rates.vdmk.discountRate.value} yıllık`,
            highlight: false
          },
          {
            label: 'Üretici Peşin Ödeme Kazancı',
            value: formatCurrency(calc.supplierDiscount),
            detail: '%2 iskonto',
            highlight: false
          },
          {
            label: 'Net Finansman Maliyeti',
            value: formatCurrency(calc.vdmkCost - calc.supplierDiscount),
            detail: 'VDMK - Üretici iskontosu',
            highlight: false
          },
          {
            label: 'Yeni Proje Kapasitesi (Yıllık)',
            value: formatCurrency(newProjectCapacity),
            detail: 'Aylık 15M TL ek ciro',
            highlight: true
          },
          {
            label: 'Proje Sayısı Artışı',
            value: '30 → 45',
            detail: '%50 kapasite artışı',
            highlight: true
          },
          {
            label: 'Alternatif Nakit Kredi Maliyeti',
            value: formatCurrency(calc.bankCost),
            detail: `%${FINANCIAL_DATA.rates.interestRates.cashCredit.value} faiz`,
            highlight: false
          },
          {
            label: 'Tasarruf (VDMK vs Faktoring)',
            value: formatCurrency(calc.bankCost - calc.vdmkCost),
            detail: '3 aylık maliyet avantajı',
            highlight: true
          }
        ]
      })()
    }
  ],
  
  seoTitle: 'İnşaat & Yapı Malzemeleri Sektörü VDMK Finansman | KolayMoney',
  seoDescription: 'İnşaat sektörü için müteahhit alacak finansmanı, büyük proje desteği ve distribütör likidite çözümleri. %35 iskonto ile 7 günde nakit.',
  seoKeywords: ['inşaat finansman', 'yapı malzemeleri', 'müteahhit alacak', 'VDMK', 'proje finansmanı']
}
