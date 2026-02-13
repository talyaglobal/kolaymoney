/**
 * Beyaz Eşya & Küçük Ev Aletleri Sektörü
 * VDMK Finansman Use Case'leri
 */

import { SectorData } from '@/types/sector'
import { compareVDMKvsFactoring, calculateBankLoanCost, formatCurrency, formatPercent } from '@/utils/financialCalculations'
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
        bankRate: FINANCIAL_DATA.rates.factoring.discountRate.value,
        supplierDiscount: 5,
        supplierDiscountDays: 30,
        supplierInvoiceAmount: 15_000_000
      },
      
      financialImpact: (() => {
        const principal = 18_000_000
        const term = 90
        const comparison = compareVDMKvsFactoring(principal, term, 46, 50)
        const bankCost = calculateBankLoanCost(principal, 42, term)
        return [
          { label: 'VDMK: Şirkete Giren Nakit (İlk Gün)', value: formatCurrency(comparison.vdmk.upfrontCash), detail: '%100 nakit girişi, kesinti yok', highlight: true, icon: '✅' },
          { label: 'VDMK: Toplam Maliyet (Vade Sonunda)', value: formatCurrency(comparison.vdmk.totalCost), detail: `%46 iskonto + %0.5 komisyon, ${term} gün`, highlight: true },
          { label: 'Faktoring: Şirkete Giren Nakit', value: formatCurrency(comparison.factoring.netCashReceived), detail: `${formatPercent(comparison.factoring.cashUtilizationRate, 1)} nakit girişi (peşin kesinti)`, isAlternative: true, icon: '❌' },
          { label: 'Faktoring: Toplam Maliyet', value: formatCurrency(comparison.factoring.totalDeduction), detail: '%50 iskonto + %1.5 komisyon (peşin kesilir)', isAlternative: true },
          { label: 'Banka Kredisi: Maliyet', value: formatCurrency(bankCost), detail: '%42 yıllık faiz, 90 gün', isAlternative: true },
          { label: 'AVANTAJ: Daha Fazla Nakit (İlk Gün)', value: formatCurrency(comparison.cashDifference), detail: `VDMK ile faktoring'e göre ${formatPercent(comparison.utilizationDifference, 1)} daha fazla nakit`, highlight: true, icon: '💰' },
          { label: 'AVANTAJ: Daha Düşük Maliyet', value: formatCurrency(comparison.costDifference), detail: `Faktoring'e göre ${formatPercent(comparison.costSavingsPercent, 1)} tasarruf`, highlight: true, icon: '📉' },
          { label: 'AVANTAJ: Bilanço Dışı', value: 'Borç Artmaz', detail: 'Faktoring bilançoda borç olarak görünür, VDMK görünmez', icon: '📊' },
          { label: 'AVANTAJ: Ölçeklenebilir', value: 'Limitsiz Büyüme', detail: 'Faktoring limitleri yerine sermaye piyasası derinliği', icon: '♾️' },
          { label: 'ROI (Yatırım Getirisi)', value: formatPercent((comparison.cashDifference / principal) * 100, 2), detail: '90 günlük dönem için, sadece nakit farkından' },
          { label: 'Nakit Döngüsü İyileşmesi', value: '195 gün', detail: '225 gün → 30 gün', highlight: false }
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
        const principal = 10_000_000
        const term = 120
        const comparison = compareVDMKvsFactoring(principal, term, 46, 50)
        const campaignRevenue = 20_000_000
        const grossProfit = campaignRevenue * 0.20
        const netProfit = grossProfit - comparison.vdmk.totalCost
        return [
          { label: 'Kampanya Cirosu', value: formatCurrency(campaignRevenue), detail: '2.000 adet × 10.000 TL', highlight: false },
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
        const principal = 8_000_000
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
  
  seoTitle: 'Beyaz Eşya Sektörü VDMK Finansman Çözümleri | KolayMoney',
  seoDescription: 'Beyaz eşya perakendecileri için taksit alacaklarını nakde çevirme, stok finansmanı ve kampanya desteği. %35 iskonto ile 7 günde likidite.',
  seoKeywords: ['beyaz eşya finansman', 'taksit alacak', 'VDMK', 'stok finansmanı', 'perakende finansman']
}
