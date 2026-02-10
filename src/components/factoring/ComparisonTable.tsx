/**
 * Comparison Table Section
 * Factoring vs VDMK side-by-side comparison
 */

import { FINANCIAL_DATA } from '@/lib/config/financialData'

export function ComparisonTable() {
  const comparisons = [
    {
      criterion: 'Yıllık Maliyet',
      factoring: `%${FINANCIAL_DATA.rates.factoring.discountRate.value} + %${FINANCIAL_DATA.rates.factoring.commission.value} komisyon`,
      vdmk: `%${FINANCIAL_DATA.rates.vdmk.discountRate.value} + %${FINANCIAL_DATA.rates.vdmk.commission.value} komisyon`,
      winner: 'vdmk',
      highlight: true
    },
    {
      criterion: 'Hukuki Yapı',
      factoring: 'Kredi / alacak temliki',
      vdmk: 'Menkul kıymetleştirme',
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
      factoring: 'Sınırlı',
      vdmk: 'Yüksek',
      winner: 'vdmk'
    },
    {
      criterion: 'Maliyet Yapısı',
      factoring: 'Faiz + komisyon',
      vdmk: 'İskonto bazlı',
      winner: 'vdmk'
    },
    {
      criterion: 'Yatırımcı Erişimi',
      factoring: 'Yok',
      vdmk: 'Var',
      winner: 'vdmk'
    },
    {
      criterion: 'Şeffaflık',
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
                    {row.highlight && (
                      <span className="ml-2 text-yellow-600">💰</span>
                    )}
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
                      <span className="ml-2 text-blue-600">✓</span>
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
                {row.highlight && <span className="ml-2 text-yellow-600">💰</span>}
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
      </div>
    </section>
  )
}
