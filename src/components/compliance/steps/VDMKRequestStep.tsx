/**
 * Step 4: VDMK Request Details
 */

import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { CompleteComplianceFormData } from '@/lib/validations/compliance'

interface VDMKRequestStepProps {
  register: UseFormRegister<CompleteComplianceFormData>
  errors: FieldErrors<CompleteComplianceFormData>
}

export function VDMKRequestStep({ register, errors }: VDMKRequestStepProps) {
  return (
    <div className="space-y-6">
      <div className="brutalist-card p-6 bg-purple-50">
        <h2 className="text-3xl font-bold mb-2">VDMK Talep Bilgileri</h2>
        <p className="text-gray-700">Talep ettiğiniz finansman detaylarını belirtin</p>
      </div>

      <div className="space-y-4">
        {/* Requested Amount */}
        <div>
          <label className="block font-bold mb-2">
            Talep Edilen Tutar (TL) <span className="text-red-600">*</span>
          </label>
          <input
            {...register('requestedAmount', { valueAsNumber: true })}
            type="number"
            min="100000"
            max="100000000"
            step="50000"
            className="w-full p-4 border-4 border-black font-mono text-lg focus:outline-none focus:border-blue-600"
            placeholder="1000000"
          />
          <p className="mt-1 text-sm text-gray-600">Minimum: 100.000 TL - Maksimum: 100.000.000 TL</p>
          {errors.requestedAmount && (
            <p className="mt-2 text-red-600 font-bold">⚠️ {errors.requestedAmount.message}</p>
          )}
        </div>

        {/* Requested Term */}
        <div>
          <label className="block font-bold mb-2">
            Talep Edilen Vade (Gün) <span className="text-red-600">*</span>
          </label>
          <input
            {...register('requestedTerm', { valueAsNumber: true })}
            type="number"
            min="30"
            max="365"
            step="30"
            className="w-full p-4 border-4 border-black font-mono text-lg focus:outline-none focus:border-blue-600"
            placeholder="90"
          />
          <p className="mt-1 text-sm text-gray-600">30 ile 365 gün arasında</p>
          {errors.requestedTerm && (
            <p className="mt-2 text-red-600 font-bold">⚠️ {errors.requestedTerm.message}</p>
          )}
        </div>

        {/* Purpose */}
        <div>
          <label className="block font-bold mb-2">
            Kullanım Amacı <span className="text-red-600">*</span>
          </label>
          <textarea
            {...register('purpose')}
            rows={5}
            className="w-full p-4 border-4 border-black font-mono text-lg focus:outline-none focus:border-blue-600 resize-none"
            placeholder="VDMK finansmanını hangi amaçla kullanacaksınız? Detaylı açıklayınız..."
          />
          <p className="mt-1 text-sm text-gray-600">Minimum 20 karakter</p>
          {errors.purpose && (
            <p className="mt-2 text-red-600 font-bold">⚠️ {errors.purpose.message}</p>
          )}
        </div>
      </div>

      {/* Info Box */}
      <div className="brutalist-card p-6 bg-blue-50">
        <h3 className="font-bold text-lg mb-3">💡 VDMK Nedir?</h3>
        <p className="text-sm mb-3">
          Varlığa Dayalı Menkul Kıymet (VDMK), şirketinizin alacaklarını menkul kıymete dönüştürerek 
          nakit akışınızı hızlandırmanızı sağlar.
        </p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li>Alacaklarınızı beklemeden nakde çevirin</li>
          <li>İşletme sermayenizi güçlendirin</li>
          <li>Büyüme fırsatlarını kaçırmayın</li>
          <li>Rekabetçi faiz oranları</li>
        </ul>
      </div>
    </div>
  )
}
