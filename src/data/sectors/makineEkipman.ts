/**
 * Makine & Ekipman Sektörü
 * VDMK Finansman Use Case'leri
 */

import { SectorData } from '@/types/sector'
import { calculateFullFinancing, formatCurrency, formatPercent } from '@/utils/financialCalculations'
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
        bankRate: FINANCIAL_DATA.rates.interestRates.commercialLoan.value,
        supplierDiscount: 2,
        supplierDiscountDays: 30,
        supplierInvoiceAmount: 180_000_000
      },
      
      financialImpact: (() => {
        const calc = calculateFullFinancing(225_000_000, 120, FINANCIAL_DATA.rates.factoring.discountRate.value, 180_000_000, 2)
        
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
            detail: `%${FINANCIAL_DATA.rates.interestRates.commercialLoan.value} yıllık faktoring`,
            highlight: false
          },
          {
            label: 'İthalatçı Erken Ödeme Kazancı',
            value: formatCurrency(calc.supplierDiscount),
            detail: '%2 iskonto, 30 gün erken',
            highlight: false
          },
          {
            label: 'Net Tasarruf',
            value: formatCurrency(calc.netSavings),
            detail: 'VDMK vs Faktoring + İthalatçı İskontosu',
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
            value: '+%40',
            detail: 'Likidite ile kapasite artışı',
            highlight: false
          }
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
        bankRate: FINANCIAL_DATA.rates.interestRates.commercialLoan.value,
        supplierDiscount: 3,
        supplierDiscountDays: 0,
        supplierInvoiceAmount: 70_000_000
      },
      
      financialImpact: (() => {
        const calc = calculateFullFinancing(75_000_000, 90, FINANCIAL_DATA.rates.factoring.discountRate.value, 70_000_000, 3)
        const rentalRevenue = 8_000_000 * 18
        const operatingCost = rentalRevenue * 0.30
        const grossProfit = rentalRevenue - operatingCost
        const netProfit = grossProfit - (calc.vdmkCost * 6) + calc.supplierDiscount
        
        return [
          {
            label: '18 Aylık Kiralama Geliri',
            value: formatCurrency(rentalRevenue),
            detail: '8M TL × 18 ay',
            highlight: false
          },
          {
            label: 'Brüt Kar (-%30 operasyon)',
            value: formatCurrency(grossProfit),
            detail: 'Gelir - Operasyon maliyeti',
            highlight: false
          },
          {
            label: 'VDMK Finansman Maliyeti (6 Dönem)',
            value: formatCurrency(calc.vdmkCost * 6),
            detail: `90 gün × 6, %${FINANCIAL_DATA.rates.vdmk.discountRate.value} yıllık`,
            highlight: false
          },
          {
            label: 'Ekipman Peşin Ödeme İskontosu',
            value: formatCurrency(calc.supplierDiscount),
            detail: '%3 iskonto',
            highlight: false
          },
          {
            label: 'Net 18 Aylık Kar',
            value: formatCurrency(netProfit),
            detail: 'Brüt kar - 6 dönem finansman + İskonto',
            highlight: true
          },
          {
            label: 'Alternatif Faktoring (6 Dönem)',
            value: formatCurrency(calc.bankCost * 6),
            detail: `%${FINANCIAL_DATA.rates.interestRates.commercialLoan.value} faiz`,
            highlight: false
          },
          {
            label: 'Tasarruf (VDMK vs Faktoring)',
            value: formatCurrency((calc.bankCost - calc.vdmkCost) * 6),
            detail: '18 aylık toplam tasarruf',
            highlight: true
          },
          {
            label: 'Yatırım ROI',
            value: formatPercent((netProfit / 75_000_000) * 100, 1),
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
        const calc = calculateFullFinancing(80_000_000, 90, 44, 0, 0)
        const currencyHedgeGain = 80_000_000 * 0.04
        const capacityIncrease = 120_000_000 * 0.30
        
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
            label: 'Net Finansman',
            value: formatCurrency(calc.netFinancing),
            detail: 'Elde edilen nakit',
            highlight: false
          },
          {
            label: 'Kur Riski Azaltma Kazancı',
            value: formatCurrency(currencyHedgeGain),
            detail: 'Forward kur kilitleme avantajı (%4)',
            highlight: false
          },
          {
            label: 'Yıllık İthalat Kapasite Artışı',
            value: formatCurrency(capacityIncrease),
            detail: '%30 kapasite artışı',
            highlight: true
          },
          {
            label: 'Yeni Üretici Anlaşmaları',
            value: '+3 Üretici',
            detail: 'Likidite ile genişleme',
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
  
  seoTitle: 'Makine & Ekipman Sektörü VDMK Finansman | KolayMoney',
  seoDescription: 'Makine ve ekipman tedarikçileri için satış alacak finansmanı, kiralama portföyü ve ithalat desteği. %35 iskonto ile 7 günde likidite.',
  seoKeywords: ['makine finansman', 'ekipman kiralama', 'sanayi makineleri', 'VDMK', 'ithalat finansmanı']
}
