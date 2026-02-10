/**
 * Beyaz Eşya & Küçük Ev Aletleri Sektörü
 * VDMK Finansman Use Case'leri
 */

import { SectorData } from '@/types/sector'
import { calculateFullFinancing, formatCurrency, formatPercent } from '@/utils/financialCalculations'
import { FINANCIAL_DATA } from '@/lib/config/financialData'

export const beyazEsyaData: SectorData = {
  slug: 'beyaz-esya',
  name: 'Beyaz Eşya & Küçük Ev Aletleri',
  category: 'B2C',
  paymentTerm: '6-12 ay',
  icon: '🔌',
  image: '/img/sectors/white-goods.webp',
  
  summary: 'Türkiye\'de beyaz eşya sektörü, tüketicilerin %65\'inin taksitli alışveriş yaptığı bir pazar. Ortalama vade 6-12 ay, ortalama sepet değeri 8.000-25.000 TL.',
  
  description: 'Beyaz eşya ve küçük ev aletleri sektöründe VDMK finansmanı ile taksit alacaklarınızı hemen nakde çevirin, stok finansmanı sağlayın ve kampanya dönemlerinde büyüme fırsatlarını kaçırmayın.',
  
  stats: {
    marketSize: '45 Milyar TL',
    creditSalesRatio: '%65',
    avgTerm: '9 ay',
    avgBasket: '15.000 TL',
    collectionRate: `%${FINANCIAL_DATA.rates.collectionRates.beyazEsya.value}`
  },
  
  benefits: [
    'Taksit alacaklarını 7 gün içinde nakde çevirme',
    'Kampanya dönemlerinde stok artırma imkanı',
    'Tedarikçi ödemelerinde %2-5 erken ödeme iskontosu',
    'Nakit döngüsünü 180 günden 30 güne düşürme',
    'Banka kredisine göre %15-20 daha düşük maliyet'
  ],
  
  requirements: [
    'Minimum 6 aylık faaliyet süresi',
    'Düzenli taksit satış performansı',
    'Minimum 5M TL yıllık ciro',
    `Tahsilat performansı %${FINANCIAL_DATA.rates.collectionRates.beyazEsya.value - 2} üzeri`,
    `Minimum işlem tutarı: ${formatCurrency(FINANCIAL_DATA.rates.vdmk.minAmount.value)}`
  ],
  
  useCases: [
    // USE CASE 1: Buzdolabı Taksit Alacakları
    {
      id: 'beyaz-esya-1',
      title: 'Buzdolabı Taksit Alacakları Finansmanı',
      companyProfile: 'İstanbul\'da 12 mağazası olan beyaz eşya perakendecisi, aylık 500 adet buzdolabı satışı',
      
      situation: [
        'Aylık 500 adet buzdolabı satışı (ortalama 12.000 TL = 6M TL aylık ciro)',
        '6-9 ay vadeli taksit seçeneği (ortalama 7.5 ay = 225 gün)',
        '3 aylık taksit alacağı: 18M TL',
        'Tedarikçilere 30 gün vadeli ödeme (aylık 5M TL)',
        'Nakit akışı sıkıntısı: 195 gün nakit döngüsü'
      ],
      
      vdmkSolution: [
        '3 aylık taksit alacaklarını (18M TL) VDMK fonuna devir',
        `İskonto oranı: %${FINANCIAL_DATA.rates.vdmk.discountRate.value} yıllık + %${FINANCIAL_DATA.rates.vdmk.commission.value} komisyon (${FINANCIAL_DATA.rates.vdmk.discountRate.date})`,
        '90 gün ortalama vade ile 15.48M TL net finansman',
        'Tedarikçi ödemelerinde 30 gün erken ödeme (%5 iskonto)',
        'Nakit döngüsü: 225 gün → 30 gün (195 gün iyileşme)',
        'Likidite sağlama süresi: 7 gün'
      ],
      
      calculationDetails: {
        principal: 18_000_000,
        term: 90,
        vdmkRate: FINANCIAL_DATA.rates.vdmk.discountRate.value,
        vdmkCommission: FINANCIAL_DATA.rates.vdmk.commission.value,
        bankRate: FINANCIAL_DATA.rates.interestRates.commercialLoan.value,
        supplierDiscount: 5,
        supplierDiscountDays: 30,
        supplierInvoiceAmount: 15_000_000
      },
      
      financialImpact: (() => {
        const calc = calculateFullFinancing(18_000_000, 90, 42, 15_000_000, 5)
        
        return [
          {
            label: 'VDMK Finansman Maliyeti',
            value: formatCurrency(calc.vdmkCost),
            detail: `90 gün, %${FINANCIAL_DATA.rates.vdmk.discountRate.value} yıllık + %${FINANCIAL_DATA.rates.vdmk.commission.value} komisyon`,
            highlight: false
          },
          {
            label: 'Alternatif Banka Kredisi',
            value: formatCurrency(calc.bankCost),
            detail: `%${FINANCIAL_DATA.rates.interestRates.commercialLoan.value} yıllık faiz (${FINANCIAL_DATA.rates.interestRates.commercialLoan.date})`,
            highlight: false
          },
          {
            label: 'Tedarikçi Erken Ödeme Kazancı',
            value: formatCurrency(calc.supplierDiscount),
            detail: '%5 iskonto, 30 gün erken',
            highlight: false
          },
          {
            label: 'Net Tasarruf',
            value: formatCurrency(calc.netSavings),
            detail: 'VDMK vs Banka + Tedarikçi İskontosu',
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
            value: '195 gün',
            detail: '225 gün → 30 gün',
            highlight: false
          }
        ]
      })()
    },
    
    // USE CASE 2: Çamaşır Makinesi Kampanya Finansmanı
    {
      id: 'beyaz-esya-2',
      title: 'Çamaşır Makinesi Kampanya Stok Finansmanı',
      companyProfile: 'Online + offline hibrit model, yıllık 25M TL ciro, yaz kampanyası planlaması',
      
      situation: [
        'Yaz kampanyası: 2.000 adet çamaşır makinesi stoku gerekli',
        'Tedarikçi ödemesi: 8M TL (peşin)',
        'Kampanya satışları: 12 ay taksit (ortalama 10.000 TL/adet = 20M TL)',
        'Mevcut nakit: 3M TL (yetersiz)',
        'Kampanya süresi: 60 gün (hızlı satış)'
      ],
      
      vdmkSolution: [
        'Geçmiş 6 aylık taksit alacak portföyü analizi (tahsilat %92)',
        '10M TL VDMK ihracı (geçmiş + gelecek alacak taahhüdü)',
        `İskonto: %${FINANCIAL_DATA.rates.vdmk.discountRate.value} yıllık, 120 gün ortalama vade`,
        '8M TL stok finansmanı + 2M TL pazarlama bütçesi',
        'Tedarikçiye peşin ödeme (%3 iskonto kazancı)'
      ],
      
      calculationDetails: {
        principal: 10_000_000,
        term: 120,
        vdmkRate: FINANCIAL_DATA.rates.vdmk.discountRate.value,
        vdmkCommission: FINANCIAL_DATA.rates.vdmk.commission.value,
        bankRate: FINANCIAL_DATA.rates.interestRates.stockFinancing.value,
        supplierDiscount: 3,
        supplierDiscountDays: 0,
        supplierInvoiceAmount: 8_000_000
      },
      
      financialImpact: (() => {
        const calc = calculateFullFinancing(10_000_000, 120, 43, 8_000_000, 3)
        const campaignRevenue = 20_000_000
        const grossMargin = 0.20
        const grossProfit = campaignRevenue * grossMargin
        const netProfit = grossProfit - calc.vdmkCost + calc.supplierDiscount
        
        return [
          {
            label: 'Kampanya Cirosu',
            value: formatCurrency(campaignRevenue),
            detail: '2.000 adet × 10.000 TL',
            highlight: false
          },
          {
            label: 'Brüt Kar (%20 marj)',
            value: formatCurrency(grossProfit),
            detail: 'Satış marjı',
            highlight: false
          },
          {
            label: 'VDMK Finansman Maliyeti',
            value: formatCurrency(calc.vdmkCost),
            detail: `120 gün, %${FINANCIAL_DATA.rates.vdmk.discountRate.value} yıllık`,
            highlight: false
          },
          {
            label: 'Tedarikçi Peşin Ödeme İskontosu',
            value: formatCurrency(calc.supplierDiscount),
            detail: '%3 iskonto',
            highlight: false
          },
          {
            label: 'Net Kampanya Karı',
            value: formatCurrency(netProfit),
            detail: 'Brüt kar - Finansman + İskonto',
            highlight: true
          },
          {
            label: 'Alternatif Banka Maliyeti',
            value: formatCurrency(calc.bankCost),
            detail: `Stok finansmanı kredisi %${FINANCIAL_DATA.rates.interestRates.stockFinancing.value}`,
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
    
    // USE CASE 3: E-ticaret POS Alacakları
    {
      id: 'beyaz-esya-3',
      title: 'Küçük Ev Aletleri E-ticaret POS Alacakları',
      companyProfile: 'E-ticaret platformu, aylık 10.000 sipariş, ortalama sepet 800 TL',
      
      situation: [
        'Aylık 10.000 sipariş × 800 TL = 8M TL aylık ciro',
        'Kredi kartı taksit alacakları (3-6 ay)',
        'POS blokeli alacaklar: Banka 45 gün sonra ödüyor',
        'Aylık 8M TL alacak, 45 gün nakit döngüsü',
        'Hızlı büyüme için pazarlama bütçesi gerekli'
      ],
      
      vdmkSolution: [
        'POS taksit alacaklarını 7 gün içinde nakde çevir',
        '6M TL aylık likidite (8M TL × %75 iskonto)',
        `İskonto: %${FINANCIAL_DATA.rates.vdmk.discountRate.value} yıllık, ortalama 45 gün`,
        'Pazarlama bütçesini 2 katına çıkar',
        'Tedarikçi ödemelerinde 20 gün erken ödeme (%3.5 iskonto)'
      ],
      
      calculationDetails: {
        principal: 8_000_000,
        term: 45,
        vdmkRate: FINANCIAL_DATA.rates.vdmk.discountRate.value,
        vdmkCommission: FINANCIAL_DATA.rates.vdmk.commission.value,
        bankRate: FINANCIAL_DATA.rates.interestRates.cashCredit.value,
        supplierDiscount: 3.5,
        supplierDiscountDays: 20,
        supplierInvoiceAmount: 6_000_000
      },
      
      financialImpact: (() => {
        const calc = calculateFullFinancing(8_000_000, 45, 44, 6_000_000, 3.5)
        const cashCycleImprovement = 45 - 7
        
        return [
          {
            label: 'Nakit Döngüsü İyileşmesi',
            value: `${cashCycleImprovement} gün`,
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
            label: 'Tedarikçi Erken Ödeme Kazancı',
            value: formatCurrency(calc.supplierDiscount),
            detail: '%3.5, 20 gün erken',
            highlight: false
          },
          {
            label: 'Net Maliyet',
            value: formatCurrency(calc.vdmkCost - calc.supplierDiscount),
            detail: 'VDMK maliyeti - Tedarikçi iskontosu',
            highlight: false
          },
          {
            label: 'Pazarlama ROI Artışı',
            value: '%250',
            detail: 'Artan bütçe ile dönüşüm artışı',
            highlight: true
          },
          {
            label: 'Yıllık Büyüme Hedefi',
            value: '%45 → %78',
            detail: 'Likidite sayesinde hızlanma',
            highlight: true
          }
        ]
      })()
    }
  ],
  
  seoTitle: 'Beyaz Eşya Sektörü VDMK Finansman Çözümleri | KolayMoney',
  seoDescription: 'Beyaz eşya perakendecileri için taksit alacaklarını nakde çevirme, stok finansmanı ve kampanya desteği. %35 iskonto ile 7 günde likidite.',
  seoKeywords: ['beyaz eşya finansman', 'taksit alacak', 'VDMK', 'stok finansmanı', 'perakende finansman']
}
