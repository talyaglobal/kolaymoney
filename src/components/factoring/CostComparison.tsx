/**
 * Cost Comparison Section
 * Detailed cost breakdown: Bank vs VDMK vs Factoring
 */

import { FINANCIAL_DATA } from '@/lib/config/financialData'
import { calculateFullFinancing, formatCurrency } from '@/utils/financialCalculations'

export function CostComparison() {
  // Example calculation: 10M TL for 90 days
  const principal = 10_000_000
  const days = 90
  
  // Calculate costs
  const bankRate = FINANCIAL_DATA.rates.interestRates.commercialLoan.value
  const vdmkRate = FINANCIAL_DATA.rates.vdmk.discountRate.value
  const vdmkCommission = FINANCIAL_DATA.rates.vdmk.commission.value
  const factoringRate = FINANCIAL_DATA.rates.factoring.discountRate.value
  const factoringCommission = FINANCIAL_DATA.rates.factoring.commission.value
  
  // Bank cost
  const bankCost = principal * (bankRate / 100) * (days / 365)
  
  // VDMK cost
  const vdmkDiscountCost = principal * (vdmkRate / 100) * (days / 365)
  const vdmkCommissionCost = principal * (vdmkCommission / 100)
  const vdmkTotalCost = vdmkDiscountCost + vdmkCommissionCost
  
  // Factoring cost
  const factoringDiscountCost = principal * (factoringRate / 100) * (days / 365)
  const factoringCommissionCost = principal * (factoringCommission / 100)
  const factoringTotalCost = factoringDiscountCost + factoringCommissionCost
  
  const options = [
    {
      name: 'Banka Kredisi',
      color: 'green',
      rate: bankRate,
      cost: bankCost,
      details: [
        { label: 'Faiz Oranı', value: `%${bankRate}` },
        { label: 'Vade', value: `${days} gün` },
        { label: 'Toplam Maliyet', value: formatCurrency(bankCost) }
      ],
      pros: ['En düşük maliyet', 'Tanıdık yapı'],
      cons: ['Uzun onay süreci', 'Yüksek teminat', 'Bilançoda borç']
    },
    {
      name: 'VDMK (KolayMoney)',
      color: 'blue',
      rate: vdmkRate,
      cost: vdmkTotalCost,
      details: [
        { label: 'İskonto Oranı', value: `%${vdmkRate}` },
        { label: 'Komisyon', value: `%${vdmkCommission}` },
        { label: 'Vade', value: `${days} gün` },
        { label: 'Toplam Maliyet', value: formatCurrency(vdmkTotalCost) }
      ],
      pros: ['Bilanço dışı', 'Hızlı onay (7 gün)', 'Yüksek limitler', 'SPK denetimi'],
      cons: ['Banka kredisinden pahalı']
    },
    {
      name: 'Faktoring',
      color: 'red',
      rate: factoringRate,
      cost: factoringTotalCost,
      details: [
        { label: 'Faiz Oranı', value: `%${factoringRate}` },
        { label: 'Komisyon', value: `%${factoringCommission}` },
        { label: 'Vade', value: `${days} gün` },
        { label: 'Toplam Maliyet', value: formatCurrency(factoringTotalCost) }
      ],
      pros: ['Hızlı süreç'],
      cons: ['En yüksek maliyet', 'Bilançoda borç', 'Sınırlı limitler', 'Müşteri bazlı risk']
    }
  ]

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-black text-yellow-400 px-6 py-2 mb-4 border-2 border-black">
            <span className="font-mono text-sm font-black uppercase tracking-wider">
              MALİYET ANALİZİ
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            10M TL - 90 Gün Finansman Maliyeti
          </h2>
          <p className="text-xl text-gray-600">
            Güncel piyasa oranları ile gerçek maliyet karşılaştırması
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {options.map((option, index) => {
            const colorClasses = {
              green: {
                bg: 'bg-green-50',
                border: 'border-green-600',
                text: 'text-green-600',
                badge: 'bg-green-600'
              },
              blue: {
                bg: 'bg-blue-50',
                border: 'border-blue-600',
                text: 'text-blue-600',
                badge: 'bg-blue-600'
              },
              red: {
                bg: 'bg-red-50',
                border: 'border-red-600',
                text: 'text-red-600',
                badge: 'bg-red-600'
              }
            }[option.color]

            return (
              <div
                key={index}
                className={`
                  ${colorClasses.bg} border-4 ${colorClasses.border} p-6
                  ${option.color === 'blue' ? 'transform scale-105 shadow-2xl' : ''}
                `}
              >
                {/* Header */}
                <div className="mb-6">
                  <h3 className="text-2xl font-black mb-2">{option.name}</h3>
                  {option.color === 'blue' && (
                    <div className="inline-block bg-blue-600 text-white px-3 py-1 text-xs font-black">
                      ÖNERİLEN
                    </div>
                  )}
                  {option.color === 'green' && (
                    <div className="inline-block bg-green-600 text-white px-3 py-1 text-xs font-black">
                      EN UCUZ
                    </div>
                  )}
                  {option.color === 'red' && (
                    <div className="inline-block bg-red-600 text-white px-3 py-1 text-xs font-black">
                      EN PAHALI
                    </div>
                  )}
                </div>

                {/* Cost Details */}
                <div className="space-y-3 mb-6">
                  {option.details.map((detail, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{detail.label}:</span>
                      <span className="font-bold">{detail.value}</span>
                    </div>
                  ))}
                </div>

                {/* Total Cost Highlight */}
                <div className={`${colorClasses.badge} text-white p-4 border-2 border-black mb-6`}>
                  <div className="text-sm font-bold mb-1">TOPLAM MALİYET</div>
                  <div className="text-3xl font-black">
                    {formatCurrency(option.cost)}
                  </div>
                </div>

                {/* Pros */}
                <div className="mb-4">
                  <div className="text-sm font-bold mb-2">✅ Avantajlar:</div>
                  <ul className="text-sm space-y-1">
                    {option.pros.map((pro, idx) => (
                      <li key={idx} className="text-gray-700">• {pro}</li>
                    ))}
                  </ul>
                </div>

                {/* Cons */}
                <div>
                  <div className="text-sm font-bold mb-2">❌ Dezavantajlar:</div>
                  <ul className="text-sm space-y-1">
                    {option.cons.map((con, idx) => (
                      <li key={idx} className="text-gray-700">• {con}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>

        {/* Summary */}
        <div className="bg-black text-white p-8 border-4 border-black">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-black mb-4 text-center">
              📊 Maliyet Farkı Analizi
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-center">
              <div>
                <div className="text-sm text-gray-400 mb-2">VDMK vs Faktoring</div>
                <div className="text-3xl font-black text-green-400">
                  {formatCurrency(factoringTotalCost - vdmkTotalCost)} TASARRUF
                </div>
                <div className="text-sm text-gray-400 mt-1">
                  (%{(((factoringTotalCost - vdmkTotalCost) / factoringTotalCost) * 100).toFixed(1)} daha ucuz)
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-2">VDMK vs Banka</div>
                <div className="text-3xl font-black text-yellow-400">
                  {formatCurrency(vdmkTotalCost - bankCost)} EK MALİYET
                </div>
                <div className="text-sm text-gray-400 mt-1">
                  Ama bilanço dışı + hızlı onay avantajı
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Source */}
        <div className="text-center mt-6 text-sm text-gray-500">
          Güncel veriler: {FINANCIAL_DATA.metadata.lastUpdated} - {FINANCIAL_DATA.metadata.dataSource}
        </div>
      </div>
    </section>
  )
}
