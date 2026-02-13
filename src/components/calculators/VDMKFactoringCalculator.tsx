/**
 * VDMK vs Faktoring İnteraktif Karşılaştırma Hesaplayıcı
 * Onaylı oranlar: VDMK %46 / %0.5, Faktoring %50 / %1.5
 */

import { useState } from 'react'
import { Link } from 'wouter'
import {
  compareVDMKvsFactoring,
  formatCurrency,
  formatPercent
} from '@/utils/financialCalculations'

export function VDMKFactoringCalculator() {
  const [principal, setPrincipal] = useState(10_000_000)
  const [days, setDays] = useState(90)
  const [showDetails, setShowDetails] = useState(false)

  const comparison = compareVDMKvsFactoring(principal, days, 46, 50)

  return (
    <div className="bg-white border-4 border-black p-8 md:p-12">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-block bg-blue-600 text-white px-6 py-2 mb-4 border-2 border-black">
          <span className="font-mono text-sm font-black uppercase tracking-wider">
            İNTERAKTİF HESAPLAYICI
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black mb-4">
          VDMK vs Faktoring Karşılaştırma
        </h2>
        <p className="text-gray-600 text-lg">
          Kendi rakamlarınızla farkı görün
        </p>
      </div>

      {/* Inputs */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block font-mono text-sm font-black mb-3 uppercase tracking-wider">
            Alacak Tutarı (TL)
          </label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="w-full bg-white border-2 border-black text-black font-mono font-bold p-4 text-2xl focus:outline-none focus:border-blue-600"
            step={1000000}
            min={1000000}
            max={100000000}
          />
          <div className="mt-2 flex gap-2">
            {[5_000_000, 10_000_000, 25_000_000, 50_000_000].map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => setPrincipal(amount)}
                className="flex-1 bg-gray-100 border border-black px-3 py-2 text-xs font-mono font-bold hover:bg-blue-600 hover:text-white transition-colors"
              >
                {amount / 1_000_000}M
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-mono text-sm font-black mb-3 uppercase tracking-wider">
            Vade (Gün)
          </label>
          <input
            type="range"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="w-full h-3 bg-gray-200 appearance-none cursor-pointer accent-black"
            min={30}
            max={180}
            step={30}
          />
          <div className="flex justify-between items-center mt-2">
            <span className="font-mono text-sm text-gray-600">30 gün</span>
            <span className="font-mono text-3xl font-black">{days} GÜN</span>
            <span className="font-mono text-sm text-gray-600">180 gün</span>
          </div>
          <div className="mt-2 flex gap-2">
            {[30, 60, 90, 120, 180].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDays(d)}
                className={`flex-1 border-2 border-black px-3 py-2 text-xs font-mono font-bold transition-colors ${
                  days === d ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-100'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results - Side by Side */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Faktoring */}
        <div className="bg-gray-50 border-2 border-black p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-4xl">🏦</div>
            <div>
              <div className="text-2xl font-black">Faktoring</div>
              <div className="text-xs text-gray-600">Peşin kesinti yapılır</div>
            </div>
          </div>
          <div className="space-y-3 font-mono text-sm mb-6">
            <div className="flex justify-between items-center py-2 border-b border-gray-300">
              <span>Alacak Tutarı</span>
              <span className="font-black">{formatCurrency(comparison.factoring.grossAmount)}</span>
            </div>
            <div className="flex justify-between items-center py-2 text-red-600">
              <span>- İskonto (%50)</span>
              <span className="font-black">-{formatCurrency(comparison.factoring.discountDeduction)}</span>
            </div>
            <div className="flex justify-between items-center py-2 text-red-600">
              <span>- Komisyon (%1.5)</span>
              <span className="font-black">-{formatCurrency(comparison.factoring.commissionDeduction)}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-t-2 border-black bg-white px-3 -mx-3">
              <span className="font-bold">= Şirkete Giren</span>
              <span className="font-black text-xl">{formatCurrency(comparison.factoring.netCashReceived)}</span>
            </div>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-600">Nakit Kullanım:</span>
              <span className="font-bold text-red-600">
                {formatPercent(comparison.factoring.cashUtilizationRate, 1)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Efektif Oran:</span>
              <span className="font-bold">
                {formatPercent(comparison.factoring.effectiveRate, 1)}
              </span>
            </div>
          </div>
        </div>

        {/* VDMK */}
        <div className="bg-blue-600 border-2 border-black p-6 text-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-4xl">✅</div>
            <div>
              <div className="text-2xl font-black">VDMK</div>
              <div className="text-xs opacity-90">Maliyet vade sonunda</div>
            </div>
          </div>
          <div className="space-y-3 font-mono text-sm mb-6">
            <div className="flex justify-between items-center py-2 border-b border-white/50">
              <span>Alacak Tutarı</span>
              <span className="font-black">{formatCurrency(comparison.vdmk.grossAmount)}</span>
            </div>
            <div className="flex justify-between items-center py-2 text-green-200">
              <span>- Peşin Kesinti</span>
              <span className="font-black">0 TL ✓</span>
            </div>
            <div className="flex justify-between items-center py-2 text-green-200">
              <span>- Komisyon Peşin</span>
              <span className="font-black">0 TL ✓</span>
            </div>
            <div className="flex justify-between items-center py-3 border-t-2 border-black bg-black text-white px-3 -mx-3">
              <span className="font-bold">= Şirkete Giren</span>
              <span className="font-black text-xl">{formatCurrency(comparison.vdmk.upfrontCash)}</span>
            </div>
          </div>
          <div className="space-y-2 text-xs mb-4">
            <div className="flex justify-between">
              <span>Nakit Kullanım:</span>
              <span className="font-bold text-green-200">
                {formatPercent(comparison.vdmk.cashUtilizationRate, 1)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Efektif Oran:</span>
              <span className="font-bold">
                {formatPercent(comparison.vdmk.effectiveRate, 1)}
              </span>
            </div>
          </div>
          <div className="border-t border-white/50 pt-4 text-xs space-y-1">
            <div className="font-bold mb-2">Vade Sonunda ({days}. gün):</div>
            <div>• Alacak tahsil: {formatCurrency(comparison.vdmk.grossAmount)}</div>
            <div>• Yatırımcıya öde: {formatCurrency(comparison.vdmk.grossAmount)}</div>
            <div>• Maliyet öde: {formatCurrency(comparison.vdmk.totalCost)}</div>
          </div>
        </div>
      </div>

      {/* Difference Highlight */}
      <div className="bg-black text-white p-8 border-2 border-black mb-6">
        <div className="text-center mb-6">
          <div className="text-sm font-mono text-blue-400 mb-2">VDMK İLE AVANTAJINIZ</div>
          <div className="text-5xl font-black text-blue-400 mb-2">
            {formatCurrency(comparison.cashDifference)}
          </div>
          <div className="text-xl font-bold mb-1">İlk gün daha fazla nakit</div>
          <div className="text-sm text-gray-400">
            +{formatPercent(comparison.utilizationDifference, 1)} nakit kullanım
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6 text-center">
          <div className="bg-gray-900 p-4 border border-blue-500">
            <div className="text-xs text-gray-400 mb-1">DAHA DÜŞÜK MALİYET</div>
            <div className="text-3xl font-black text-green-400">
              {formatCurrency(comparison.costDifference)}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {formatPercent(comparison.costSavingsPercent, 1)} tasarruf
            </div>
          </div>
          <div className="bg-gray-900 p-4 border border-blue-500">
            <div className="text-xs text-gray-400 mb-1">TOPLAM FAYDA</div>
            <div className="text-3xl font-black text-blue-400">
              {formatCurrency(comparison.cashDifference + comparison.costDifference)}
            </div>
            <div className="text-xs text-gray-400 mt-1">{days} gün için</div>
          </div>
        </div>
      </div>

      {/* Additional Benefits */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border-2 border-black p-4 text-center">
          <div className="text-3xl mb-2">📊</div>
          <div className="font-black mb-1">Bilanço Dışı</div>
          <div className="text-xs text-gray-600">Borç artmaz</div>
        </div>
        <div className="bg-white border-2 border-black p-4 text-center">
          <div className="text-3xl mb-2">♾️</div>
          <div className="font-black mb-1">Ölçeklenebilir</div>
          <div className="text-xs text-gray-600">Limit yok</div>
        </div>
        <div className="bg-white border-2 border-black p-4 text-center">
          <div className="text-3xl mb-2">🛡️</div>
          <div className="font-black mb-1">SPK Denetimi</div>
          <div className="text-xs text-gray-600">Şeffaf yapı</div>
        </div>
      </div>

      {/* Details Toggle */}
      <button
        type="button"
        onClick={() => setShowDetails(!showDetails)}
        className="w-full bg-gray-100 border-2 border-black p-4 font-black hover:bg-blue-600 hover:text-white transition-colors"
      >
        {showDetails ? '− Detayları Gizle' : '+ Detaylı Hesaplama Göster'}
      </button>

      {/* Detailed Breakdown */}
      {showDetails && (
        <div className="mt-6 bg-gray-50 border-2 border-black p-6">
          <h3 className="font-black text-xl mb-4">Detaylı Hesaplama</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="font-bold mb-3 text-sm">FAKTORİNG DETAYLARI:</div>
              <div className="space-y-2 text-sm font-mono">
                <div>İskonto Oranı: %50 yıllık</div>
                <div>Günlük Oran: {formatPercent(50 / 365, 4)}</div>
                <div>Vade: {days} gün</div>
                <div>İskonto Tutarı: {formatCurrency(comparison.factoring.discountDeduction)}</div>
                <div>Komisyon: %1.5 = {formatCurrency(comparison.factoring.commissionDeduction)}</div>
                <div className="pt-2 border-t">
                  Toplam Kesinti: {formatCurrency(comparison.factoring.totalDeduction)}
                </div>
                <div className="font-bold">
                  Net Nakit: {formatCurrency(comparison.factoring.netCashReceived)}
                </div>
              </div>
            </div>
            <div>
              <div className="font-bold mb-3 text-sm">VDMK DETAYLARI:</div>
              <div className="space-y-2 text-sm font-mono">
                <div>İskonto Oranı: %46 yıllık</div>
                <div>Günlük Oran: {formatPercent(46 / 365, 4)}</div>
                <div>Vade: {days} gün</div>
                <div>İskonto Maliyeti: {formatCurrency(comparison.vdmk.discountCost)}</div>
                <div>Komisyon: %0.5 = {formatCurrency(comparison.vdmk.commissionCost)}</div>
                <div className="pt-2 border-t">
                  Toplam Maliyet: {formatCurrency(comparison.vdmk.totalCost)}
                </div>
                <div className="font-bold text-green-600">
                  İlk Gün Nakit: {formatCurrency(comparison.vdmk.upfrontCash)}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-300">
            <div className="font-bold mb-3 text-sm">FORMÜLLER:</div>
            <div className="space-y-2 text-xs font-mono bg-white p-4 border border-gray-300">
              <div>Faktoring Net Nakit = Alacak - (Alacak × İskonto × Gün/365) - (Alacak × Komisyon)</div>
              <div>VDMK Net Nakit = Alacak (maliyet vade sonunda ödenecek)</div>
              <div>VDMK Vade Sonunda = Alacak + (Alacak × İskonto × Gün/365) + (Alacak × Komisyon)</div>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="mt-8 text-center">
        <Link href="/basvuru">
          <a className="inline-block bg-blue-600 text-white px-10 py-5 font-black text-xl border-2 border-black hover:bg-black hover:text-blue-600 transition-all uppercase tracking-wider">
            VDMK Başvurusu Yap →
          </a>
        </Link>
        <p className="text-sm text-gray-600 mt-3">
          Ücretsiz ön değerlendirme, 10-15 dakikada sonuç
        </p>
      </div>
    </div>
  )
}
