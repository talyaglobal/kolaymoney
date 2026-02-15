/**
 * Comparison Table Section
 * Factoring vs VDMK side-by-side comparison
 * 10M TL / 90 gün sayıları hesaplanmış
 */

import { compareVDMKvsFactoring, formatCurrency } from '@/utils/financialCalculations'

const COMPARISON_10M_90 = compareVDMKvsFactoring(10_000_000, 90, 46, 50)

export function ComparisonTable() {
  const comparisons = [
    {
      criterion: 'İskonto/Faiz Oranı',
      factoring: '%50 yıllık',
      vdmk: '%46 yıllık',
      winner: 'vdmk'
    },
    {
      criterion: 'Komisyon Oranı',
      factoring: '%1.5 (tek seferlik)',
      vdmk: '%0.5 (tek seferlik)',
      winner: 'vdmk'
    },
    {
      criterion: 'Nakit Girişi (10M TL alacak)',
      factoring: `${formatCurrency(COMPARISON_10M_90.factoring.netCashReceived)} (%${COMPARISON_10M_90.factoring.cashUtilizationRate.toFixed(0)})`,
      vdmk: `${formatCurrency(COMPARISON_10M_90.vdmk.upfrontCash)} (%100)`,
      winner: 'vdmk',
      highlight: true
    },
    {
      criterion: 'Kesinti Zamanlaması',
      factoring: 'Peşin kesilir',
      vdmk: 'Vade sonunda ödenir',
      winner: 'vdmk',
      highlight: true
    },
    {
      criterion: 'Toplam Maliyet (10M TL, 90 gün)',
      factoring: formatCurrency(COMPARISON_10M_90.factoring.totalDeduction),
      vdmk: formatCurrency(COMPARISON_10M_90.vdmk.totalCost),
      winner: 'vdmk'
    },
    {
      criterion: 'Bilanço Etkisi',
      factoring: 'Borç artar',
      vdmk: 'Bilanço dışı',
      winner: 'vdmk'
    },
    {
      criterion: 'Finansman Kaynağı',
      factoring: 'Factoring şirketi',
      vdmk: 'Sermaye piyasası',
      winner: 'vdmk'
    },
    {
      criterion: 'Ölçeklenebilirlik',
      factoring: 'Sınırlı (firma limitleri)',
      vdmk: 'Yüksek (piyasa derinliği)',
      winner: 'vdmk'
    },
    {
      criterion: 'Yatırımcı Erişimi',
      factoring: 'Yok',
      vdmk: 'Var',
      winner: 'vdmk'
    },
    {
      criterion: 'Şeffaflık & Denetim',
      factoring: 'Sözleşme bazlı',
      vdmk: 'SPK + bağımsız denetim',
      winner: 'vdmk'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-black text-blue-600 px-6 py-2 mb-4 border-2 border-black">
            <span className="font-mono text-sm font-black uppercase tracking-wider">
              YAN YANA KARŞILAŞTIRMA
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Factoring vs VDMK
          </h2>
          <p className="text-xl text-gray-600">
            Her kriterde farkı görün
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-2 border-black">
            <thead>
              <tr className="bg-black text-white">
                <th className="border-2 border-black p-4 text-left font-black uppercase text-sm">
                  Kriter
                </th>
                <th className="border-2 border-black p-4 text-center font-black uppercase text-sm">
                  Factoring
                </th>
                <th className="border-2 border-black p-4 text-center font-black uppercase text-sm bg-blue-600 text-white">
                  Kolaymoney (VDMK)
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, index) => (
                <tr 
                  key={index}
                  className={`
                    ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    ${row.highlight ? 'border-4 border-yellow-400' : ''}
                  `}
                >
                  <td className={`
                    border-2 border-black p-4 font-bold
                    ${row.highlight ? 'bg-yellow-50' : ''}
                  `}>
                    {row.criterion}
                    {row.highlight && <span className="ml-2">⭐</span>}
                  </td>
                  <td className={`
                    border-2 border-black p-4 text-center
                    ${row.winner === 'factoring' ? 'bg-green-100' : 'bg-red-50'}
                    ${row.highlight ? 'font-bold text-lg' : ''}
                  `}>
                    {row.factoring}
                  </td>
                  <td className={`
                    border-2 border-black p-4 text-center font-bold
                    ${row.winner === 'vdmk' ? 'bg-blue-600/20' : ''}
                    ${row.highlight ? 'text-lg bg-blue-600 text-white' : ''}
                  `}>
                    {row.vdmk}
                    {row.winner === 'vdmk' && (
                      <span className={`ml-2 text-xl ${row.highlight ? 'text-white' : 'text-blue-600'}`}>✓</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Version */}
        <div className="md:hidden space-y-6">
          {comparisons.map((row, index) => (
            <div 
              key={index} 
              className={`
                border-2 border-black p-6
                ${row.highlight ? 'border-4 border-yellow-400 bg-yellow-50' : ''}
              `}
            >
              <h3 className="font-black text-lg mb-4">
                {row.criterion}
                {row.highlight && <span className="ml-2">⭐</span>}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Factoring:</span>
                  <span className={`font-bold ${row.highlight ? 'text-red-600' : ''}`}>
                    {row.factoring}
                  </span>
                </div>
                <div className={`
                  flex justify-between items-center p-2 border-2
                  ${row.highlight ? 'bg-blue-600 text-white border-blue-600' : 'bg-blue-600/10 border-blue-600'}
                `}>
                  <span className={`text-sm ${row.highlight ? 'text-white' : 'text-gray-600'}`}>
                    VDMK:
                  </span>
                  <span className={`font-bold ${row.highlight ? 'text-white' : 'text-blue-600'}`}>
                    {row.vdmk} ✓
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Box */}
        <div className="mt-12 bg-black text-white p-8 border-2 border-black">
          <div className="text-center">
            <div className="text-2xl font-black mb-4">Özet:</div>
            <div className="text-lg space-y-2">
              <div>✓ <span className="text-blue-400">%{COMPARISON_10M_90.cashDifferencePercent.toFixed(1)}</span> daha fazla nakit (ilk gün)</div>
              <div>✓ <span className="text-blue-400">%{COMPARISON_10M_90.costSavingsPercent.toFixed(1)}</span> daha düşük maliyet</div>
              <div>✓ <span className="text-blue-400">Bilanço dışı</span> finansman</div>
              <div>✓ <span className="text-blue-400">Ölçeklenebilir</span> yapı</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
