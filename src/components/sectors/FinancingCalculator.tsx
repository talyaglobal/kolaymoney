/**
 * İnteraktif VDMK Finansman Hesap Makinesi
 * Brutalist tasarım
 */

import { useState, useEffect } from 'react'
import { calculateFullFinancing, formatCurrency, formatPercent } from '@/utils/financialCalculations'
import { FINANCIAL_DATA, formatDate } from '@/lib/config/financialData'

interface FinancingCalculatorProps {
  sectorName: string
}

export function FinancingCalculator({ sectorName }: FinancingCalculatorProps) {
  const [principal, setPrincipal] = useState(10_000_000)
  const [days, setDays] = useState(90)
  const [bankRate, setBankRate] = useState(FINANCIAL_DATA.rates.interestRates.commercialLoan.value)
  const [supplierInvoice, setSupplierInvoice] = useState(8_000_000)
  const [supplierDiscount, setSupplierDiscount] = useState(3)

  const [result, setResult] = useState(calculateFullFinancing(
    principal, days, bankRate, supplierInvoice, supplierDiscount
  ))

  useEffect(() => {
    setResult(calculateFullFinancing(
      principal, days, bankRate, supplierInvoice, supplierDiscount
    ))
  }, [principal, days, bankRate, supplierInvoice, supplierDiscount])

  return (
    <section id="calculator" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4">VDMK Hesap Makinesi</h2>
            <p className="text-xl text-gray-600">
              {sectorName} sektörü için özel finansman hesaplaması
            </p>
            <div className="mt-4 text-sm text-gray-500">
              Güncel veriler: {formatDate(FINANCIAL_DATA.metadata.lastUpdated)} - {FINANCIAL_DATA.metadata.dataSource}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left: Inputs */}
            <div className="bg-white border-4 border-black p-8">
              <h3 className="text-2xl font-black mb-6">Parametreler</h3>
              
              <div className="space-y-6">
                {/* Principal */}
                <div>
                  <label className="block font-bold mb-2">
                    Alacak Tutarı (TL)
                  </label>
                  <input
                    type="number"
                    value={principal}
                    onChange={(e) => setPrincipal(Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-black font-bold text-lg"
                    step={100000}
                  />
                  <div className="text-sm text-gray-600 mt-1">
                    Minimum: {formatCurrency(FINANCIAL_DATA.rates.vdmk.minAmount.value)}
                  </div>
                </div>

                {/* Days */}
                <div>
                  <label className="block font-bold mb-2">
                    Vade (Gün)
                  </label>
                  <input
                    type="range"
                    min="30"
                    max="180"
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm mt-1">
                    <span>30 gün</span>
                    <span className="font-bold text-lg">{days} gün</span>
                    <span>180 gün</span>
                  </div>
                </div>

                {/* Bank Rate */}
                <div>
                  <label className="block font-bold mb-2">
                    Alternatif Banka Faizi (%)
                  </label>
                  <input
                    type="number"
                    value={bankRate}
                    onChange={(e) => setBankRate(Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-black font-bold text-lg"
                    step={0.5}
                  />
                  <div className="text-sm text-gray-600 mt-1">
                    Piyasa ortalaması: %{FINANCIAL_DATA.rates.interestRates.commercialLoan.value}
                  </div>
                </div>

                {/* Supplier Invoice */}
                <div>
                  <label className="block font-bold mb-2">
                    Tedarikçi Fatura Tutarı (TL)
                  </label>
                  <input
                    type="number"
                    value={supplierInvoice}
                    onChange={(e) => setSupplierInvoice(Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-black font-bold text-lg"
                    step={100000}
                  />
                </div>

                {/* Supplier Discount */}
                <div>
                  <label className="block font-bold mb-2">
                    Tedarikçi Erken Ödeme İskontosu (%)
                  </label>
                  <input
                    type="number"
                    value={supplierDiscount}
                    onChange={(e) => setSupplierDiscount(Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-black font-bold text-lg"
                    step={0.5}
                  />
                  <div className="text-sm text-gray-600 mt-1">
                    Tipik aralık: %2-5
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Results */}
            <div className="bg-blue-600 border-4 border-black p-8 text-white">
              <h3 className="text-2xl font-black mb-6">Sonuçlar</h3>
              
              <div className="space-y-4">
                {/* Net Financing */}
                <div className="bg-white text-black p-4 border-2 border-black">
                  <div className="text-sm font-bold text-gray-600 mb-1">
                    NET FİNANSMAN
                  </div>
                  <div className="text-3xl font-black">
                    {formatCurrency(result.netFinancing)}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    Elde edeceğiniz nakit
                  </div>
                </div>

                {/* VDMK Cost */}
                <div className="bg-white text-black p-4 border-2 border-black">
                  <div className="text-sm font-bold text-gray-600 mb-1">
                    VDMK MALİYETİ
                  </div>
                  <div className="text-2xl font-black">
                    {formatCurrency(result.vdmkCost)}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    %{FINANCIAL_DATA.rates.vdmk.discountRate.value} yıllık + 
                    %{FINANCIAL_DATA.rates.vdmk.commission.value} komisyon
                  </div>
                </div>

                {/* Bank Cost */}
                <div className="bg-white text-black p-4 border-2 border-black">
                  <div className="text-sm font-bold text-gray-600 mb-1">
                    BANKA KREDİSİ MALİYETİ
                  </div>
                  <div className="text-2xl font-black">
                    {formatCurrency(result.bankCost)}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    %{bankRate} yıllık faiz
                  </div>
                </div>

                {/* Supplier Discount */}
                {result.supplierDiscount > 0 && (
                  <div className="bg-green-500 text-white p-4 border-2 border-black">
                    <div className="text-sm font-bold mb-1">
                      TEDARİKÇİ İSKONTO KAZANCI
                    </div>
                    <div className="text-2xl font-black">
                      {formatCurrency(result.supplierDiscount)}
                    </div>
                    <div className="text-xs mt-1">
                      %{supplierDiscount} erken ödeme iskontosu
                    </div>
                  </div>
                )}

                {/* Net Savings */}
                <div className="bg-black text-white p-6 border-2 border-white">
                  <div className="text-sm font-bold mb-1">
                    TOPLAM NET TASARRUF
                  </div>
                  <div className="text-4xl font-black mb-2">
                    {formatCurrency(result.netSavings)}
                  </div>
                  <div className="text-sm">
                    ROI: {formatPercent(result.roi, 2)}
                  </div>
                </div>

                {/* Effective Rate */}
                <div className="bg-white text-black p-4 border-2 border-black">
                  <div className="text-sm font-bold text-gray-600 mb-1">
                    EFEKTİF YILLIK MALİYET
                  </div>
                  <div className="text-2xl font-black">
                    {formatPercent(result.effectiveRate, 2)}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    VDMK efektif maliyeti
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8">
                <a 
                  href="/#references"
                  className="block w-full px-6 py-4 bg-white text-blue-600 text-center font-bold text-lg hover:bg-gray-100 transition-colors border-2 border-black"
                >
                  📞 Bu Hesaplama İçin Sizi Arayalım
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
