/**
 * Tarım & Tarımsal Ekipman Sektörü
 * VDMK Finansman Use Case'leri
 */

import { SectorData } from '@/types/sector'
import { calculateFullFinancing, formatCurrency, formatPercent } from '@/utils/financialCalculations'
import { FINANCIAL_DATA } from '@/lib/config/financialData'

export const tarimData: SectorData = {
  slug: 'tarim',
  name: 'Tarım & Tarımsal Ekipman',
  category: 'B2B',
  paymentTerm: '90-180 gün',
  icon: '🌾',
  
  summary: 'Tarım sektöründe mevsimsel üretim döngüleri nedeniyle ödeme vadesi 90-180 gün. Tohum, gübre, ilaç alımları peşin, ürün satışları vadeli.',
  
  description: 'Tarım ve tarımsal ekipman sektöründe VDMK finansmanı ile hasat sonrası alacaklarınızı hemen nakde çevirin, sezon öncesi girdi alımlarını finanse edin.',
  
  stats: {
    marketSize: '120 Milyar TL',
    creditSalesRatio: '%75',
    avgTerm: '120 gün',
    avgBasket: '500.000 TL',
    collectionRate: `%${FINANCIAL_DATA.rates.collectionRates.tarim.value}`
  },
  
  benefits: [
    'Hasat sonrası alacakları 7 gün içinde nakde çevirme',
    'Sezon öncesi girdi alımlarında likidite',
    'Tarımsal ekipman yatırımları için kaynak',
    'Nakit döngüsünü 180 günden 30 güne düşürme',
    'Mevsimsel nakit akışı dengeleme'
  ],
  
  requirements: [
    'Minimum 2 yıl faaliyet süresi',
    'Düzenli satış ve tahsilat geçmişi',
    'Minimum 15M TL yıllık ciro',
    `Tahsilat performansı %${FINANCIAL_DATA.rates.collectionRates.tarim.value - 3} üzeri`,
    `Minimum işlem tutarı: ${formatCurrency(FINANCIAL_DATA.rates.vdmk.minAmount.value)}`
  ],
  
  useCases: [
    // USE CASE 1: Traktör Satış Alacakları
    {
      id: 'tarim-1',
      title: 'Traktör & Tarım Makineleri Satış Alacak Finansmanı',
      companyProfile: 'Tarım makineleri bayisi, yıllık 200 adet traktör satışı, 5 il bölgesel bayi',
      
      situation: [
        'Yıllık 200 adet traktör satışı (ortalama 1.5M TL = 300M TL yıllık ciro)',
        'Çiftçilere 12-18 ay vadeli satış (ortalama 450 gün)',
        '6 aylık satış alacağı: 150M TL',
        'Üretici (John Deere, New Holland): 60 gün vadeli ödeme',
        'Nakit döngüsü: 390 gün (kritik likidite sıkıntısı)'
      ],
      
      vdmkSolution: [
        '3 aylık traktör satış alacaklarını (75M TL) VDMK fonuna devir',
        `İskonto: %${FINANCIAL_DATA.rates.vdmk.discountRate.value} yıllık + %${FINANCIAL_DATA.rates.vdmk.commission.value} komisyon (${FINANCIAL_DATA.rates.vdmk.discountRate.date})`,
        '120 gün ortalama vade ile 66.4M TL net finansman',
        'Üretici ödemelerinde 30 gün erken (%2 iskonto)',
        'Nakit döngüsü: 450 gün → 60 gün (390 gün iyileşme)'
      ],
      
      calculationDetails: {
        principal: 75_000_000,
        term: 120,
        vdmkRate: FINANCIAL_DATA.rates.vdmk.discountRate.value,
        vdmkCommission: FINANCIAL_DATA.rates.vdmk.commission.value,
        bankRate: FINANCIAL_DATA.rates.interestRates.commercialLoan.value,
        supplierDiscount: 2,
        supplierDiscountDays: 30,
        supplierInvoiceAmount: 60_000_000
      },
      
      financialImpact: (() => {
        const calc = calculateFullFinancing(75_000_000, 120, 42, 60_000_000, 2)
        
        return [
          {
            label: 'VDMK Finansman Maliyeti',
            value: formatCurrency(calc.vdmkCost),
            detail: `120 gün, %${FINANCIAL_DATA.rates.vdmk.discountRate.value} yıllık (${FINANCIAL_DATA.rates.vdmk.discountRate.date})`,
            highlight: false
          },
          {
            label: 'Alternatif Banka Kredisi',
            value: formatCurrency(calc.bankCost),
            detail: `%${FINANCIAL_DATA.rates.interestRates.commercialLoan.value} yıllık faiz`,
            highlight: false
          },
          {
            label: 'Üretici Erken Ödeme Kazancı',
            value: formatCurrency(calc.supplierDiscount),
            detail: '%2 iskonto, 30 gün erken (John Deere, New Holland)',
            highlight: false
          },
          {
            label: 'Net Tasarruf',
            value: formatCurrency(calc.netSavings),
            detail: 'VDMK vs Banka + Üretici İskontosu',
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
            value: '390 gün',
            detail: '450 gün → 60 gün',
            highlight: true
          },
          {
            label: 'Yıllık Satış Kapasitesi Artışı',
            value: '+%40',
            detail: 'Likidite ile daha fazla stok',
            highlight: false
          }
        ]
      })()
    },
    
    // USE CASE 2: Tohum & Gübre Distribütörü
    {
      id: 'tarim-2',
      title: 'Tohum & Gübre Distribütörü Sezon Finansmanı',
      companyProfile: 'Tohum ve gübre distribütörü, 500 bayi ağı, ilkbahar sezon hazırlığı',
      
      situation: [
        'İlkbahar sezonu: 80M TL tohum & gübre stoku gerekli',
        'Üretici (Monsanto, Yara): Şubat\'ta peşin ödeme talep ediyor',
        'Bayilere satış: Nisan-Mayıs (90 gün vade)',
        'Mevcut nakit: 20M TL (yetersiz)',
        'Sezon kaçırılırsa yıllık cironun %60\'ı kayıp'
      ],
      
      vdmkSolution: [
        'Geçmiş yıl sezon satış performansı analizi (tahsilat %89)',
        '65M TL VDMK ihracı (geçmiş alacak + gelecek taahhüt)',
        `İskonto: %${FINANCIAL_DATA.rates.vdmk.discountRate.value} yıllık, 90 gün ortalama vade`,
        '60M TL stok finansmanı + 5M TL pazarlama',
        'Üreticilere peşin ödeme (%4 iskonto)'
      ],
      
      calculationDetails: {
        principal: 65_000_000,
        term: 90,
        vdmkRate: FINANCIAL_DATA.rates.vdmk.discountRate.value,
        vdmkCommission: FINANCIAL_DATA.rates.vdmk.commission.value,
        bankRate: FINANCIAL_DATA.rates.interestRates.stockFinancing.value,
        supplierDiscount: 4,
        supplierDiscountDays: 0,
        supplierInvoiceAmount: 60_000_000
      },
      
      financialImpact: (() => {
        const calc = calculateFullFinancing(65_000_000, 90, 43, 60_000_000, 4)
        const seasonRevenue = 120_000_000
        const grossMargin = 0.22
        const grossProfit = seasonRevenue * grossMargin
        const netProfit = grossProfit - calc.vdmkCost + calc.supplierDiscount
        
        return [
          {
            label: 'Sezon Hedef Cirosu',
            value: formatCurrency(seasonRevenue),
            detail: 'İlkbahar tohum & gübre satışları',
            highlight: false
          },
          {
            label: 'Brüt Kar (%22 marj)',
            value: formatCurrency(grossProfit),
            detail: 'Satış marjı',
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
            detail: '%4 iskonto (Monsanto, Yara)',
            highlight: false
          },
          {
            label: 'Net Sezon Karı',
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
            label: 'Tasarruf (VDMK vs Banka)',
            value: formatCurrency(calc.bankCost - calc.vdmkCost),
            detail: 'Düşük maliyet avantajı',
            highlight: true
          },
          {
            label: 'Sezon ROI',
            value: formatPercent((netProfit / 65_000_000) * 100, 1),
            detail: 'Net kar / Finansman',
            highlight: true
          }
        ]
      })()
    },
    
    // USE CASE 3: Tarımsal İlaç Üretici & Distribütör
    {
      id: 'tarim-3',
      title: 'Tarımsal İlaç Üretim & Distribüsyon Nakit Akışı',
      companyProfile: 'Tarımsal ilaç üretici, 300 bayi ağı, yıllık 180M TL ciro',
      
      situation: [
        'Aylık 15M TL üretim (hammadde peşin)',
        'Bayilere satış: 90 gün vade',
        '3 aylık alacak portföyü: 45M TL',
        'Hammadde ithalatı: 60 gün önceden ödeme (USD bazlı)',
        'Kur riski + nakit döngüsü: 150 gün'
      ],
      
      vdmkSolution: [
        'Bayi fatura alacaklarını 7 gün içinde nakde çevir',
        '40M TL aylık likidite',
        `İskonto: %${FINANCIAL_DATA.rates.vdmk.discountRate.value} yıllık, ortalama 90 gün`,
        'Hammadde ithalatı için forward kur kilitleme',
        'Üretim kapasitesi %25 artırma imkanı'
      ],
      
      calculationDetails: {
        principal: 45_000_000,
        term: 90,
        vdmkRate: FINANCIAL_DATA.rates.vdmk.discountRate.value,
        vdmkCommission: FINANCIAL_DATA.rates.vdmk.commission.value,
        bankRate: FINANCIAL_DATA.rates.interestRates.cashCredit.value,
        supplierDiscount: 0,
        supplierDiscountDays: 0,
        supplierInvoiceAmount: 0
      },
      
      financialImpact: (() => {
        const calc = calculateFullFinancing(45_000_000, 90, 44, 0, 0)
        const capacityIncrease = 15_000_000 * 0.25 * 12 // %25 kapasite artışı
        const currencyHedgeGain = 45_000_000 * 0.03 // %3 kur riski azaltma
        
        return [
          {
            label: 'Nakit Döngüsü İyileşmesi',
            value: '143 gün',
            detail: '150 gün → 7 gün',
            highlight: true
          },
          {
            label: 'VDMK Maliyeti (3 Aylık)',
            value: formatCurrency(calc.vdmkCost),
            detail: `90 gün, %${FINANCIAL_DATA.rates.vdmk.discountRate.value} yıllık (${FINANCIAL_DATA.rates.vdmk.discountRate.date})`,
            highlight: false
          },
          {
            label: 'Net Finansman',
            value: formatCurrency(calc.netFinancing),
            detail: 'Elde edilen nakit',
            highlight: false
          },
          {
            label: 'Kapasite Artışı Potansiyeli',
            value: formatCurrency(capacityIncrease),
            detail: '%25 üretim artışı (yıllık)',
            highlight: true
          },
          {
            label: 'Kur Riski Azaltma Kazancı',
            value: formatCurrency(currencyHedgeGain),
            detail: 'Forward kur kilitleme avantajı',
            highlight: false
          },
          {
            label: 'Alternatif Nakit Kredi Maliyeti',
            value: formatCurrency(calc.bankCost),
            detail: `%${FINANCIAL_DATA.rates.interestRates.cashCredit.value} faiz`,
            highlight: false
          },
          {
            label: 'Tasarruf (VDMK vs Banka)',
            value: formatCurrency(calc.bankCost - calc.vdmkCost),
            detail: '3 aylık maliyet avantajı',
            highlight: true
          },
          {
            label: 'Yıllık Büyüme Hedefi',
            value: '%18 → %32',
            detail: 'Likidite ile hızlanma',
            highlight: true
          }
        ]
      })()
    }
  ],
  
  seoTitle: 'Tarım & Tarımsal Ekipman Sektörü VDMK Finansman | KolayMoney',
  seoDescription: 'Tarım sektörü için hasat alacak finansmanı, sezon stok desteği ve tarımsal ekipman yatırımları. %35 iskonto ile 7 günde likidite.',
  seoKeywords: ['tarım finansman', 'traktör satış', 'tohum gübre', 'VDMK', 'tarımsal ekipman']
}
