/**
 * Otomotiv B2B (Filo, Bayi) Sektörü
 * VDMK Finansman Use Case'leri
 */

import { SectorData } from '@/types/sector'
import { calculateFullFinancing, formatCurrency, formatPercent } from '@/utils/financialCalculations'
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
        const calc = calculateFullFinancing(192_000_000, 120, FINANCIAL_DATA.rates.factoring.discountRate.value, 160_000_000, 1.5)
        
        return [
          {
            label: 'VDMK Finansman Maliyeti',
            value: formatCurrency(calc.vdmkCost),
            detail: `120 gün, %${FINANCIAL_DATA.rates.vdmk.discountRate.value} yıllık`,
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
            detail: '%1.5 iskonto, 30 gün erken',
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
            detail: '120 günlük dönem için',
            highlight: true
          },
          {
            label: 'Nakit Döngüsü İyileşmesi',
            value: '90 gün',
            detail: '150 gün → 60 gün',
            highlight: true
          },
          {
            label: 'Aylık Satış Kapasitesi Artışı',
            value: '+%35',
            detail: 'Likidite ile kapasite artışı',
            highlight: false
          }
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
        const calc = calculateFullFinancing(85_000_000, 90, 43, 80_000_000, 2)
        const salesRevenue = 100 * 1_400_000 * 0.70
        const grossMargin = 0.08
        const grossProfit = salesRevenue * grossMargin
        const netProfit = grossProfit - calc.vdmkCost + calc.supplierDiscount
        
        return [
          {
            label: 'Lansman Satış Hedefi',
            value: formatCurrency(salesRevenue),
            detail: '70 araç × 1.4M TL',
            highlight: false
          },
          {
            label: 'Brüt Kar (%8 marj)',
            value: formatCurrency(grossProfit),
            detail: 'Otomotiv tipik marjı',
            highlight: false
          },
          {
            label: 'VDMK Finansman Maliyeti',
            value: formatCurrency(calc.vdmkCost),
            detail: `90 gün, %${FINANCIAL_DATA.rates.vdmk.discountRate.value} yıllık`,
            highlight: false
          },
          {
            label: 'Üretici Peşin Ödeme İskontosu',
            value: formatCurrency(calc.supplierDiscount),
            detail: '%2 iskonto',
            highlight: false
          },
          {
            label: 'Net Lansman Karı',
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
        const calc = calculateFullFinancing(60_000_000, 75, 44, 0, 0)
        const turnoverImprovement = 42_000_000 * 0.40 * 12
        
        return [
          {
            label: 'Nakit Döngüsü İyileşmesi',
            value: '68 gün',
            detail: '75 gün → 7 gün',
            highlight: true
          },
          {
            label: 'VDMK Maliyeti (2.5 Aylık)',
            value: formatCurrency(calc.vdmkCost),
            detail: `75 gün, %${FINANCIAL_DATA.rates.vdmk.discountRate.value} yıllık`,
            highlight: false
          },
          {
            label: 'Net Finansman',
            value: formatCurrency(calc.netFinancing),
            detail: 'Elde edilen nakit',
            highlight: false
          },
          {
            label: 'Stok Devir Hızı Artışı',
            value: '%65',
            detail: 'Likidite ile hızlanma',
            highlight: true
          },
          {
            label: 'Yıllık Ek Ciro Potansiyeli',
            value: formatCurrency(turnoverImprovement),
            detail: '%40 devir hızı artışı',
            highlight: true
          },
          {
            label: 'Aylık Araç Kapasitesi',
            value: '120 → 180',
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
            detail: '2.5 aylık maliyet avantajı',
            highlight: true
          }
        ]
      })()
    }
  ],
  
  seoTitle: 'Otomotiv B2B (Filo, Bayi) VDMK Finansman | KolayMoney',
  seoDescription: 'Otomotiv bayileri için filo satış alacak finansmanı, yeni model stok desteği ve ikinci el araç likidite çözümleri. %35 iskonto ile 7 günde nakit.',
  seoKeywords: ['otomotiv bayi', 'filo satış', 'araç finansman', 'VDMK', 'ikinci el araç']
}
