/**
 * Step 3: Financial Information
 */

import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { CompleteComplianceFormData } from '@/lib/validations/compliance'

interface FinancialInfoStepProps {
  register: UseFormRegister<CompleteComplianceFormData>
  errors: FieldErrors<CompleteComplianceFormData>
}

export function FinancialInfoStep({ register, errors }: FinancialInfoStepProps) {
  return (
    <div className="space-y-6">
      <div className="brutalist-card p-6 bg-yellow-50">
        <h2 className="text-3xl font-bold mb-2">Finansal Bilgiler</h2>
        <p className="text-gray-700">Şirketinizin finansal durumunu belirtin</p>
      </div>

      <div className="space-y-4">
        {/* Annual Revenue */}
        <div>
          <label className="block font-bold mb-2">
            Yıllık Ciro (TL) <span className="text-red-600">*</span>
          </label>
          <input
            {...register('annualRevenue', { valueAsNumber: true })}
            type="number"
            min="100000"
            step="100000"
            className="w-full p-4 border-4 border-black font-mono text-lg focus:outline-none focus:border-blue-600"
            placeholder="5000000"
          />
          <p className="mt-1 text-sm text-gray-600">Minimum: 100.000 TL</p>
          {errors.annualRevenue && (
            <p className="mt-2 text-red-600 font-bold">⚠️ {errors.annualRevenue.message}</p>
          )}
        </div>

        {/* Credit Sales Ratio */}
        <div>
          <label className="block font-bold mb-2">
            Kredili Satış Oranı (%) <span className="text-red-600">*</span>
          </label>
          <input
            {...register('creditSalesRatio', { valueAsNumber: true })}
            type="number"
            min="0"
            max="100"
            step="5"
            className="w-full p-4 border-4 border-black font-mono text-lg focus:outline-none focus:border-blue-600"
            placeholder="60"
          />
          <p className="mt-1 text-sm text-gray-600">Toplam satışlarınızın yüzde kaçı kredili/vadeli?</p>
          {errors.creditSalesRatio && (
            <p className="mt-2 text-red-600 font-bold">⚠️ {errors.creditSalesRatio.message}</p>
          )}
        </div>

        {/* Average Payment Term */}
        <div>
          <label className="block font-bold mb-2">
            Ortalama Ödeme Vadesi (Gün) <span className="text-red-600">*</span>
          </label>
          <input
            {...register('averagePaymentTerm', { valueAsNumber: true })}
            type="number"
            min="0"
            max="365"
            step="15"
            className="w-full p-4 border-4 border-black font-mono text-lg focus:outline-none focus:border-blue-600"
            placeholder="90"
          />
          <p className="mt-1 text-sm text-gray-600">Müşterilerinize verdiğiniz ortalama vade süresi</p>
          {errors.averagePaymentTerm && (
            <p className="mt-2 text-red-600 font-bold">⚠️ {errors.averagePaymentTerm.message}</p>
          )}
        </div>

        {/* Average Basket Size */}
        <div>
          <label className="block font-bold mb-2">
            Ortalama Sepet Tutarı (TL) <span className="text-red-600">*</span>
          </label>
          <input
            {...register('averageBasketSize', { valueAsNumber: true })}
            type="number"
            min="1000"
            step="1000"
            className="w-full p-4 border-4 border-black font-mono text-lg focus:outline-none focus:border-blue-600"
            placeholder="50000"
          />
          <p className="mt-1 text-sm text-gray-600">Tek bir satışta ortalama fatura tutarı</p>
          {errors.averageBasketSize && (
            <p className="mt-2 text-red-600 font-bold">⚠️ {errors.averageBasketSize.message}</p>
          )}
        </div>

        {/* Monthly Receivables */}
        <div>
          <label className="block font-bold mb-2">
            Aylık Ortalama Alacak Tutarı (TL) <span className="text-red-600">*</span>
          </label>
          <input
            {...register('monthlyReceivables', { valueAsNumber: true })}
            type="number"
            min="10000"
            step="10000"
            className="w-full p-4 border-4 border-black font-mono text-lg focus:outline-none focus:border-blue-600"
            placeholder="500000"
          />
          <p className="mt-1 text-sm text-gray-600">Müşterilerinizden tahsil bekleyen ortalama aylık tutar</p>
          {errors.monthlyReceivables && (
            <p className="mt-2 text-red-600 font-bold">⚠️ {errors.monthlyReceivables.message}</p>
          )}
        </div>
      </div>
    </div>
  )
}
