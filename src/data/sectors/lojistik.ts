/**
 * Lojistik & Taşımacılık Sektörü
 * VDMK Finansman Use Case'leri
 */

import { SectorData } from '@/types/sector'
import { calculateFullFinancing, formatCurrency, formatPercent } from '@/utils/financialCalculations'
import { FINANCIAL_DATA } from '@/lib/config/financialData'

export const lojistikData: SectorData = {
  slug: 'lojistik',
  name: 'Lojistik & Taşımacılık',
  category: 'B2B',
  paymentTerm: '30-90 gün',
  icon: '🚛',
  image: '/img/sectors/logistics.webp',
  
  summary: 'Lojistik sektöründe fatura vadesi ortalama 60 gün. Araç yakıtı, personel maaşı ve bakım giderleri peşin ödenirken, müşteri ödemeleri gecikmeli.',
  
  description: 'Lojistik firmaları için VDMK finansmanı ile fatura alacaklarınızı hemen nakde çevirin, filo yatırımları yapın ve operasyonel nakit akışınızı güçlendirin.',
  
  stats: {
    marketSize: '280 Milyar TL',
    creditSalesRatio: '%85',
    avgTerm: '60 gün',
    avgBasket: '250.000 TL',
    collectionRate: `%${FINANCIAL_DATA.rates.collectionRates.lojistik.value}`
  },
  
  benefits: [
    'Fatura alacaklarını 7 gün içinde nakde çevirme',
    'Yakıt ve personel ödemelerinde likidite sağlama',
    'Filo genişletme yatırımları için kaynak',
    'Nakit döngüsünü 60 günden 7 güne düşürme',
    'Müşteri portföyü büyütme imkanı'
  ],
  
  requirements: [
    'Minimum 1 yıl faaliyet süresi',
    'Düzenli fatura kesimi ve tahsilat',
    'Minimum 20M TL yıllık ciro',
    `Tahsilat performansı %${FINANCIAL_DATA.rates.collectionRates.lojistik.value - 3} üzeri`,
    `Minimum işlem tutarı: ${formatCurrency(FINANCIAL_DATA.rates.vdmk.minAmount.value)}`
  ],
  
  useCases: [
    // USE CASE 1: Karayolu Taşımacılığı Fatura Alacakları
    {
      id: 'lojistik-1',
      title: 'Karayolu Taşımacılığı Fatura Alacak Finansmanı',
      companyProfile: '45 araçlık filo, İstanbul-Anadolu hattı, aylık 500 sefer, büyük perakende zincirleri ile çalışma',
      
      situation: [
        'Aylık 500 sefer × 50.000 TL = 25M TL aylık ciro',
        'Müşteri fatura vadesi: 60 gün (perakende zincirleri)',
        '2 aylık fatura alacağı: 50M TL',
        'Aylık giderler: Yakıt 12M TL, Personel 5M TL, Bakım 2M TL (toplam 19M TL)',
        'Nakit döngüsü: 60 gün (likidite sıkıntısı)'
      ],
      
      vdmkSolution: [
        '60 günlük fatura alacaklarını (50M TL) VDMK fonuna devir',
        `İskonto: %${FINANCIAL_DATA.rates.vdmk.discountRate.value} yıllık + %${FINANCIAL_DATA.rates.vdmk.commission.value} komisyon (${FINANCIAL_DATA.rates.vdmk.discountRate.date})`,
        '60 gün vade ile 47.1M TL net finansman',
        'Yakıt tedarikçisine peşin ödeme (%2 iskonto)',
        'Nakit döngüsü: 60 gün → 7 gün (53 gün iyileşme)'
      ],
      
      calculationDetails: {
        principal: 50_000_000,
        term: 60,
        vdmkRate: FINANCIAL_DATA.rates.vdmk.discountRate.value,
        vdmkCommission: FINANCIAL_DATA.rates.vdmk.commission.value,
        bankRate: FINANCIAL_DATA.rates.interestRates.commercialLoan.value,
        supplierDiscount: 2,
        supplierDiscountDays: 0,
        supplierInvoiceAmount: 12_000_000
      },
      
      financialImpact: (() => {
        const calc = calculateFullFinancing(50_000_000, 60, FINANCIAL_DATA.rates.factoring.discountRate.value, 12_000_000, 2)
        
        return [
          {
            label: 'VDMK Finansman Maliyeti',
            value: formatCurrency(calc.vdmkCost),
            detail: `60 gün, %${FINANCIAL_DATA.rates.vdmk.discountRate.value} yıllık (${FINANCIAL_DATA.rates.vdmk.discountRate.date})`,
            highlight: false
          },
          {
            label: 'Alternatif Faktoring',
            value: formatCurrency(calc.bankCost),
            detail: `%${FINANCIAL_DATA.rates.interestRates.commercialLoan.value} yıllık faktoring`,
            highlight: false
          },
          {
            label: 'Yakıt Tedarikçi Peşin Ödeme Kazancı',
            value: formatCurrency(calc.supplierDiscount),
            detail: '%2 iskonto (aylık 12M TL yakıt)',
            highlight: false
          },
          {
            label: 'Net Tasarruf',
            value: formatCurrency(calc.netSavings),
            detail: 'VDMK vs Faktoring + Yakıt İskontosu',
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
            value: '53 gün',
            detail: '60 gün → 7 gün',
            highlight: true
          },
          {
            label: 'Aylık Operasyonel Likidite',
            value: formatCurrency(47_100_000 / 2),
            detail: 'Ortalama aylık nakit giriş',
            highlight: false
          }
        ]
      })()
    },
    
    // USE CASE 2: Filo Genişletme Yatırımı
    {
      id: 'lojistik-2',
      title: 'Filo Genişletme ve Yeni Müşteri Kazanımı',
      companyProfile: '25 araçlık filo, yeni e-ticaret müşterisi kazandı, 15 yeni araç alımı gerekli',
      
      situation: [
        'Yeni e-ticaret müşterisi: Aylık 8M TL ek ciro (60 gün vade)',
        '15 yeni araç alımı: 45M TL yatırım (ikinci el + yeni)',
        'Mevcut nakit: 10M TL (yetersiz)',
        'Müşteri sözleşmesi: 3 yıl garantili',
        'Araç teslimatı: 45 gün içinde başlamalı'
      ],
      
      vdmkSolution: [
        'Mevcut fatura alacak portföyü analizi (tahsilat %95)',
        '40M TL VDMK ihracı (mevcut + yeni müşteri alacak taahhüdü)',
        `İskonto: %${FINANCIAL_DATA.rates.vdmk.discountRate.value} yıllık, 90 gün ortalama vade`,
        '35M TL araç yatırımı + 5M TL işletme sermayesi',
        'Araç tedarikçisine peşin ödeme (%3 iskonto)'
      ],
      
      calculationDetails: {
        principal: 40_000_000,
        term: 90,
        vdmkRate: FINANCIAL_DATA.rates.vdmk.discountRate.value,
        vdmkCommission: FINANCIAL_DATA.rates.vdmk.commission.value,
        bankRate: FINANCIAL_DATA.rates.interestRates.commercialLoan.value,
        supplierDiscount: 3,
        supplierDiscountDays: 0,
        supplierInvoiceAmount: 35_000_000
      },
      
      financialImpact: (() => {
        const calc = calculateFullFinancing(40_000_000, 90, FINANCIAL_DATA.rates.factoring.discountRate.value, 35_000_000, 3)
        const newRevenue = 8_000_000 * 12 // Yıllık ek ciro
        const netMargin = 0.12
        const annualProfit = newRevenue * netMargin
        
        return [
          {
            label: 'Yeni Müşteri Yıllık Ciro',
            value: formatCurrency(newRevenue),
            detail: '8M TL × 12 ay',
            highlight: false
          },
          {
            label: 'Yıllık Net Kar (%12 marj)',
            value: formatCurrency(annualProfit),
            detail: 'Operasyonel kar marjı',
            highlight: false
          },
          {
            label: 'VDMK Finansman Maliyeti',
            value: formatCurrency(calc.vdmkCost),
            detail: `90 gün, %${FINANCIAL_DATA.rates.vdmk.discountRate.value} yıllık`,
            highlight: false
          },
          {
            label: 'Araç Tedarikçi Peşin Ödeme İskontosu',
            value: formatCurrency(calc.supplierDiscount),
            detail: '%3 iskonto (15 araç)',
            highlight: false
          },
          {
            label: 'İlk Yıl Net Kazanç',
            value: formatCurrency(annualProfit - (calc.vdmkCost * 4) + calc.supplierDiscount),
            detail: 'Yıllık kar - 4 dönem VDMK + İskonto',
            highlight: true
          },
          {
            label: 'Alternatif Faktoring',
            value: formatCurrency(calc.bankCost),
            detail: `%${FINANCIAL_DATA.rates.interestRates.commercialLoan.value} faiz`,
            highlight: false
          },
          {
            label: 'Tasarruf (VDMK vs Faktoring)',
            value: formatCurrency(calc.bankCost - calc.vdmkCost),
            detail: 'Dönemlik tasarruf',
            highlight: true
          },
          {
            label: 'Yatırım Geri Ödeme Süresi',
            value: '18 ay',
            detail: 'VDMK ile hızlı ROI',
            highlight: true
          }
        ]
      })()
    },
    
    // USE CASE 3: Depo & Dağıtım Merkezi Operasyonu
    {
      id: 'lojistik-3',
      title: '3PL Depo & Dağıtım Merkezi Nakit Akışı',
      companyProfile: '50.000 m² depo, 200 müşteri, e-ticaret lojistiği, aylık 100.000 paket',
      
      situation: [
        'Aylık 100.000 paket × 150 TL = 15M TL aylık ciro',
        'Müşteri fatura vadesi: 45 gün (e-ticaret firmaları)',
        'Aylık giderler: Personel 4M TL, Kira 2M TL, Operasyon 3M TL (toplam 9M TL)',
        '45 günlük alacak: 22.5M TL',
        'Yeni müşteri kazanımı için teknoloji yatırımı gerekli (WMS, otomasyon)'
      ],
      
      vdmkSolution: [
        'Fatura alacaklarını 7 gün içinde nakde çevir',
        '20M TL aylık likidite',
        `İskonto: %${FINANCIAL_DATA.rates.vdmk.discountRate.value} yıllık, ortalama 45 gün`,
        'Teknoloji yatırımı için kaynak (5M TL)',
        'Operasyonel giderlerde erken ödeme avantajları'
      ],
      
      calculationDetails: {
        principal: 22_500_000,
        term: 45,
        vdmkRate: FINANCIAL_DATA.rates.vdmk.discountRate.value,
        vdmkCommission: FINANCIAL_DATA.rates.vdmk.commission.value,
        bankRate: FINANCIAL_DATA.rates.interestRates.cashCredit.value,
        supplierDiscount: 0,
        supplierDiscountDays: 0,
        supplierInvoiceAmount: 0
      },
      
      financialImpact: (() => {
        const calc = calculateFullFinancing(22_500_000, 45, 44, 0, 0)
        const techInvestment = 5_000_000
        const efficiencyGain = 15_000_000 * 0.08 * 12 // %8 verimlilik artışı
        
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
            detail: `45 gün, %${FINANCIAL_DATA.rates.vdmk.discountRate.value} yıllık (${FINANCIAL_DATA.rates.vdmk.discountRate.date})`,
            highlight: false
          },
          {
            label: 'Net Finansman',
            value: formatCurrency(calc.netFinancing),
            detail: 'Elde edilen nakit',
            highlight: false
          },
          {
            label: 'Teknoloji Yatırımı',
            value: formatCurrency(techInvestment),
            detail: 'WMS, Otomasyon, AI',
            highlight: false
          },
          {
            label: 'Yıllık Verimlilik Kazancı',
            value: formatCurrency(efficiencyGain),
            detail: '%8 operasyonel iyileşme',
            highlight: true
          },
          {
            label: 'Yeni Müşteri Kapasitesi',
            value: '+%35',
            detail: 'Teknoloji ile kapasite artışı',
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
            detail: 'Aylık maliyet avantajı',
            highlight: true
          }
        ]
      })()
    }
  ],
  
  seoTitle: 'Lojistik & Taşımacılık Sektörü VDMK Finansman | KolayMoney',
  seoDescription: 'Lojistik firmaları için fatura alacak finansmanı, filo yatırımı ve operasyonel likidite desteği. %35 iskonto ile 7 günde nakit.',
  seoKeywords: ['lojistik finansman', 'taşımacılık', 'filo finansmanı', 'VDMK', 'fatura alacak']
}
