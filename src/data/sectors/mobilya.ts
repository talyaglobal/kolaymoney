/**
 * Mobilya & Ev Dekorasyonu Sektörü
 * VDMK Finansman Use Case'leri
 */

import { SectorData } from '@/types/sector'
import { calculateFullFinancing, formatCurrency, formatPercent } from '@/utils/financialCalculations'
import { FINANCIAL_DATA } from '@/lib/config/financialData'

export const mobilyaData: SectorData = {
  slug: 'mobilya',
  name: 'Mobilya & Ev Dekorasyonu',
  category: 'B2C',
  paymentTerm: '6-18 ay',
  icon: '🛋️',
  image: '/img/sectors/furniture.webp',
  
  summary: 'Mobilya sektöründe tüketicilerin %70\'i taksitle alışveriş yapıyor. Yatak odası, salon takımı gibi ürünlerde ortalama vade 12 ay, sepet değeri 20.000-80.000 TL.',
  
  description: 'Mobilya perakendecileri için VDMK finansmanı ile yüksek değerli taksit alacaklarınızı hemen nakde çevirin, mevsimsel kampanyalarda stok avantajı yakalayın.',
  
  stats: {
    marketSize: '38 Milyar TL',
    creditSalesRatio: '%70',
    avgTerm: '12 ay',
    avgBasket: '35.000 TL',
    collectionRate: `%${FINANCIAL_DATA.rates.collectionRates.mobilya.value}`
  },
  
  benefits: [
    'Yüksek değerli taksit alacaklarını 7 günde nakde çevirme',
    'Mevsimsel kampanyalarda stok yatırımı',
    'Tedarikçi ödemelerinde %2-4 erken ödeme iskontosu',
    'Nakit döngüsünü 360 günden 30 güne düşürme',
    'Showroom yenileme ve genişleme yatırımları'
  ],
  
  requirements: [
    'Minimum 1 yıl faaliyet süresi',
    'Düzenli taksit satış performansı',
    'Minimum 8M TL yıllık ciro',
    `Tahsilat performansı %${FINANCIAL_DATA.rates.collectionRates.mobilya.value - 2} üzeri`,
    `Minimum işlem tutarı: ${formatCurrency(FINANCIAL_DATA.rates.vdmk.minAmount.value)}`
  ],
  
  useCases: [
    // USE CASE 1: Yatak Odası Takımı Taksit Alacakları
    {
      id: 'mobilya-1',
      title: 'Yatak Odası Takımı Taksit Alacak Finansmanı',
      companyProfile: '6 showroom, aylık 300 adet yatak odası satışı, ortalama 40.000 TL',
      
      situation: [
        'Aylık 300 adet yatak odası × 40.000 TL = 12M TL aylık ciro',
        '12-18 ay vadeli taksit (ortalama 450 gün)',
        '6 aylık taksit alacağı portföyü: 72M TL',
        'Üretici/İthalatçı ödemesi: 45 gün vade',
        'Nakit döngüsü: 405 gün (kritik likidite sıkıntısı)'
      ],
      
      vdmkSolution: [
        '3 aylık taksit alacaklarını (36M TL) VDMK fonuna devir',
        `İskonto: %${FINANCIAL_DATA.rates.vdmk.discountRate.value} yıllık + %${FINANCIAL_DATA.rates.vdmk.commission.value} komisyon`,
        '90 gün ortalama vade ile 31M TL net finansman',
        'Üretici ödemelerinde 20 gün erken (%3 iskonto)',
        'Nakit döngüsü: 450 gün → 45 gün (405 gün iyileşme)'
      ],
      
      calculationDetails: {
        principal: 36_000_000,
        term: 90,
        vdmkRate: FINANCIAL_DATA.rates.vdmk.discountRate.value,
        vdmkCommission: FINANCIAL_DATA.rates.vdmk.commission.value,
        bankRate: FINANCIAL_DATA.rates.interestRates.commercialLoan.value,
        supplierDiscount: 3,
        supplierDiscountDays: 20,
        supplierInvoiceAmount: 30_000_000
      },
      
      financialImpact: (() => {
        const calc = calculateFullFinancing(36_000_000, 90, 42, 30_000_000, 3)
        
        return [
          {
            label: 'VDMK Finansman Maliyeti',
            value: formatCurrency(calc.vdmkCost),
            detail: `90 gün, %${FINANCIAL_DATA.rates.vdmk.discountRate.value} yıllık`,
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
            detail: '%3 iskonto, 20 gün erken',
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
            detail: '90 günlük dönem için',
            highlight: true
          },
          {
            label: 'Nakit Döngüsü İyileşmesi',
            value: '405 gün',
            detail: '450 gün → 45 gün',
            highlight: true
          }
        ]
      })()
    },
    
    // USE CASE 2: Ofis Mobilyası B2B Satış
    {
      id: 'mobilya-2',
      title: 'Ofis Mobilyası B2B Proje Finansmanı',
      companyProfile: 'Ofis mobilyası üretici & tedarikçi, kurumsal müşteriler, proje bazlı satış',
      
      situation: [
        'Yeni ofis projesi: 500 kişilik ofis mobilyası (masa, koltuk, dolap)',
        'Proje tutarı: 25M TL',
        'Müşteri ödeme planı: 120 gün vade (proje teslim sonrası)',
        'Üretim için hammadde: 15M TL (peşin)',
        'Mevcut nakit: 5M TL (yetersiz)'
      ],
      
      vdmkSolution: [
        'Geçmiş proje alacak portföyü analizi (tahsilat %88)',
        '20M TL VDMK ihracı (mevcut + yeni proje alacak taahhüdü)',
        `İskonto: %${FINANCIAL_DATA.rates.vdmk.discountRate.value} yıllık, 120 gün vade`,
        '17.7M TL net finansman',
        'Hammadde tedarikçisine peşin ödeme (%4 iskonto)'
      ],
      
      calculationDetails: {
        principal: 20_000_000,
        term: 120,
        vdmkRate: FINANCIAL_DATA.rates.vdmk.discountRate.value,
        vdmkCommission: FINANCIAL_DATA.rates.vdmk.commission.value,
        bankRate: FINANCIAL_DATA.rates.interestRates.commercialLoan.value,
        supplierDiscount: 4,
        supplierDiscountDays: 0,
        supplierInvoiceAmount: 15_000_000
      },
      
      financialImpact: (() => {
        const calc = calculateFullFinancing(20_000_000, 120, 42, 15_000_000, 4)
        const projectRevenue = 25_000_000
        const grossMargin = 0.25
        const grossProfit = projectRevenue * grossMargin
        const netProfit = grossProfit - calc.vdmkCost + calc.supplierDiscount
        
        return [
          {
            label: 'Proje Cirosu',
            value: formatCurrency(projectRevenue),
            detail: '500 kişilik ofis mobilyası',
            highlight: false
          },
          {
            label: 'Brüt Kar (%25 marj)',
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
            label: 'Hammadde Peşin Ödeme İskontosu',
            value: formatCurrency(calc.supplierDiscount),
            detail: '%4 iskonto',
            highlight: false
          },
          {
            label: 'Net Proje Karı',
            value: formatCurrency(netProfit),
            detail: 'Brüt kar - Finansman + İskonto',
            highlight: true
          },
          {
            label: 'Alternatif Banka Kredisi',
            value: formatCurrency(calc.bankCost),
            detail: `%${FINANCIAL_DATA.rates.interestRates.commercialLoan.value} faiz`,
            highlight: false
          },
          {
            label: 'Tasarruf (VDMK vs Banka)',
            value: formatCurrency(calc.bankCost - calc.vdmkCost),
            detail: 'Düşük maliyet avantajı',
            highlight: true
          }
        ]
      })()
    },
    
    // USE CASE 3: E-ticaret Dekorasyon Ürünleri
    {
      id: 'mobilya-3',
      title: 'E-ticaret Ev Dekorasyonu Hızlı Büyüme',
      companyProfile: 'Online ev dekorasyonu mağazası, aylık 8.000 sipariş, ortalama sepet 2.500 TL',
      
      situation: [
        'Aylık 8.000 sipariş × 2.500 TL = 20M TL aylık ciro',
        'Kredi kartı taksit alacakları (6-9 ay)',
        'POS blokeli alacaklar: 45 gün nakit döngüsü',
        'Hızlı büyüme: %150 YoY, ancak nakit sıkıntısı',
        'Yeni ürün grupları için stok gerekli'
      ],
      
      vdmkSolution: [
        'POS taksit alacaklarını 7 gün içinde nakde çevir',
        '15M TL aylık likidite',
        `İskonto: %${FINANCIAL_DATA.rates.vdmk.discountRate.value} yıllık, ortalama 45 gün`,
        'Yeni ürün grupları için stok yatırımı',
        'Tedarikçi ödemelerinde 15 gün erken ödeme (%3 iskonto)'
      ],
      
      calculationDetails: {
        principal: 20_000_000,
        term: 45,
        vdmkRate: FINANCIAL_DATA.rates.vdmk.discountRate.value,
        vdmkCommission: FINANCIAL_DATA.rates.vdmk.commission.value,
        bankRate: FINANCIAL_DATA.rates.interestRates.cashCredit.value,
        supplierDiscount: 3,
        supplierDiscountDays: 15,
        supplierInvoiceAmount: 15_000_000
      },
      
      financialImpact: (() => {
        const calc = calculateFullFinancing(20_000_000, 45, 44, 15_000_000, 3)
        const growthImpact = 20_000_000 * 0.50
        
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
            label: 'Tedarikçi Erken Ödeme Kazancı',
            value: formatCurrency(calc.supplierDiscount),
            detail: '%3, 15 gün erken',
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
            detail: 'Likidite ile %50 ek ciro',
            highlight: true
          },
          {
            label: 'Yıllık Büyüme Hedefi',
            value: '%150 → %220',
            detail: 'VDMK sayesinde hızlanma',
            highlight: true
          }
        ]
      })()
    }
  ],
  
  seoTitle: 'Mobilya & Ev Dekorasyonu Sektörü VDMK Finansman | KolayMoney',
  seoDescription: 'Mobilya perakendecileri için taksit alacak finansmanı, proje bazlı B2B satış ve e-ticaret büyüme desteği. %35 iskonto ile 7 günde likidite.',
  seoKeywords: ['mobilya finansman', 'yatak odası taksit', 'ofis mobilyası', 'VDMK', 'ev dekorasyonu']
}
