/**
 * Görsel Nakit Karşılaştırması: Faktoring (peşin kesinti) vs VDMK (%100 nakit)
 * 10M TL alacak, 90 gün örnek - hesaplar fonksiyonlardan
 */

import {
  calculateFactoringNetCash,
  compareVDMKvsFactoring,
  formatCurrency
} from '@/utils/financialCalculations'

const PRINCIPAL = 10_000_000
const DAYS = 90

export function NetCashVisualComparison() {
  const factoring = calculateFactoringNetCash(PRINCIPAL, 50, DAYS, 1.5)
  const comparison = compareVDMKvsFactoring(PRINCIPAL, DAYS, 46, 50)
  const difference = comparison.cashDifference
  const percentMore = comparison.cashDifferencePercent

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-blue-600 text-white px-6 py-2 mb-4 border-2 border-black">
            <span className="font-mono text-sm font-black uppercase tracking-wider">
              KRİTİK FARK
            </span>
          </div>
          <h2 className="text-5xl font-black mb-4">
            Faktoring Peşin Keser,<br />
            VDMK Tam Verir
          </h2>
          <p className="text-xl text-gray-600">
            10M TL alacakta şirkete giren nakit farkı
          </p>
        </div>

        {/* Visual Comparison */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Faktoring */}
          <div className="relative">
            <div className="bg-gray-100 border-4 border-black p-8">
              <div className="text-center mb-6">
                <div className="text-6xl mb-3">📉</div>
                <div className="text-2xl font-black">Faktoring</div>
                <div className="text-sm text-gray-600">Peşin kesinti yapılır</div>
              </div>
              <div className="space-y-4">
                <div className="bg-white border-2 border-black p-4">
                  <div className="text-xs text-gray-600 mb-1">Alacak Tutarı</div>
                  <div className="font-mono text-3xl font-black">
                    {formatCurrency(PRINCIPAL)}
                  </div>
                </div>
                <div className="space-y-2 pl-4 border-l-4 border-red-600">
                  <div className="text-sm">
                    <span className="font-bold text-red-600">- İskonto (%50):</span>
                    <span className="ml-2 font-mono">-{formatCurrency(factoring.discountDeduction)}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-bold text-red-600">- Komisyon (%1.5):</span>
                    <span className="ml-2 font-mono">-{formatCurrency(factoring.commissionDeduction)}</span>
                  </div>
                </div>
                <div className="text-center text-3xl font-black text-red-600">↓</div>
                <div className="bg-red-100 border-4 border-red-600 p-6">
                  <div className="text-xs text-gray-600 mb-2">Şirkete Giren Nakit</div>
                  <div className="font-mono text-4xl font-black text-red-600">
                    {formatCurrency(factoring.netCashReceived)}
                  </div>
                  <div className="text-sm text-gray-600 mt-3 flex items-center justify-between">
                    <span>Nakit kullanım:</span>
                    <span className="font-bold text-red-600">
                      %{factoring.cashUtilizationRate.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-red-600 text-white px-6 py-3 font-black text-lg rotate-12 border-2 border-black shadow-lg">
              %14 EKSİK!
            </div>
          </div>

          {/* VDMK */}
          <div className="relative">
            <div className="bg-blue-600 border-4 border-black p-8 text-white">
              <div className="text-center mb-6">
                <div className="text-6xl mb-3">📈</div>
                <div className="text-2xl font-black">VDMK</div>
                <div className="text-sm opacity-90">Maliyet vade sonunda ödenir</div>
              </div>
              <div className="space-y-4">
                <div className="bg-white border-2 border-black p-4 text-black">
                  <div className="text-xs text-gray-600 mb-1">Alacak Tutarı</div>
                  <div className="font-mono text-3xl font-black">
                    {formatCurrency(PRINCIPAL)}
                  </div>
                </div>
                <div className="space-y-2 pl-4 border-l-4 border-green-300">
                  <div className="text-sm flex items-center gap-2">
                    <span className="font-bold text-green-200">✓ Peşin kesinti:</span>
                    <span className="font-mono font-bold">0 TL</span>
                  </div>
                  <div className="text-sm flex items-center gap-2">
                    <span className="font-bold text-green-200">✓ Komisyon peşin:</span>
                    <span className="font-mono font-bold">0 TL</span>
                  </div>
                </div>
                <div className="text-center text-3xl font-black text-green-200">↓</div>
                <div className="bg-green-100 border-4 border-green-600 p-6 text-black">
                  <div className="text-xs text-gray-600 mb-2">Şirkete Giren Nakit</div>
                  <div className="font-mono text-4xl font-black text-green-600">
                    {formatCurrency(comparison.vdmk.upfrontCash)}
                  </div>
                  <div className="text-sm text-gray-600 mt-3 flex items-center justify-between">
                    <span>Nakit kullanım:</span>
                    <span className="font-bold text-green-600">%100 ✓</span>
                  </div>
                </div>
                <div className="bg-black text-white p-4 border-2 border-black text-xs">
                  <div className="font-bold mb-2">90. Günde:</div>
                  <div className="space-y-1 opacity-80">
                    <div>• Alacak tahsil: {formatCurrency(PRINCIPAL)}</div>
                    <div>• Yatırımcıya öde: {formatCurrency(PRINCIPAL)}</div>
                    <div>• Maliyet öde: {formatCurrency(comparison.vdmk.totalCost)}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-green-600 text-white px-6 py-3 font-black text-lg rotate-12 border-2 border-black shadow-lg">
              TAM NAKİT!
            </div>
          </div>
        </div>

        {/* Difference Highlight */}
        <div className="bg-black text-white p-12 border-4 border-black text-center">
          <div className="text-sm font-mono text-blue-400 mb-3">NAKİT FARKI (İLK GÜN)</div>
          <div className="text-6xl md:text-7xl font-black text-blue-400 mb-6">
            +{formatCurrency(difference)}
          </div>
          <div className="text-2xl md:text-3xl font-bold mb-4">
            VDMK ile %{percentMore.toFixed(1)} daha fazla nakit
          </div>
          <div className="text-gray-400 text-lg">
            10M TL alacakta faktoring {formatCurrency(factoring.netCashReceived)} verir, VDMK tam {formatCurrency(PRINCIPAL)} verir
          </div>
        </div>

        {/* Why It Matters */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white border-2 border-black p-6">
            <div className="text-4xl mb-3">💰</div>
            <div className="font-black text-lg mb-2">Maksimum İşletme Sermayesi</div>
            <div className="text-sm text-gray-600">
              Her 10M TL&apos;de {formatCurrency(difference)} fazla nakit = ek stok, pazarlama, yatırım
            </div>
          </div>
          <div className="bg-white border-2 border-black p-6">
            <div className="text-4xl mb-3">📊</div>
            <div className="font-black text-lg mb-2">Kolay Planlama</div>
            <div className="text-sm text-gray-600">
              Kesinti olmadığı için alacak = nakit, nakit akışı planlaması basit
            </div>
          </div>
          <div className="bg-white border-2 border-black p-6">
            <div className="text-4xl mb-3">🚀</div>
            <div className="font-black text-lg mb-2">Hızlı Büyüme</div>
            <div className="text-sm text-gray-600">
              Daha fazla nakit = daha fazla büyüme fırsatı, beklemeye gerek yok
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
