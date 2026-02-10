/**
 * Step 1: Company Information
 */

import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { CompleteComplianceFormData } from '@/lib/validations/compliance'
import { SectorSlug } from '@/types/sector'

interface CompanyInfoStepProps {
  register: UseFormRegister<CompleteComplianceFormData>
  errors: FieldErrors<CompleteComplianceFormData>
  prefilledSector?: SectorSlug
}

const SECTORS = [
  { value: 'beyaz-esya', label: 'Beyaz Eşya & Küçük Ev Aletleri' },
  { value: 'elektronik', label: 'Elektronik & Teknoloji' },
  { value: 'mobilya', label: 'Mobilya' },
  { value: 'otomotiv-b2c', label: 'Otomotiv B2C (Galeri, Servis)' },
  { value: 'fmcg', label: 'FMCG (Hızlı Tüketim Malları)' },
  { value: 'insaat', label: 'İnşaat & Yapı Malzemeleri' },
  { value: 'otomotiv-b2b', label: 'Otomotiv B2B (Yedek Parça)' },
  { value: 'makine-ekipman', label: 'Makine & Ekipman' },
  { value: 'lojistik', label: 'Lojistik & Nakliye' },
  { value: 'tarim', label: 'Tarım & Gıda' }
]

export function CompanyInfoStep({ register, errors, prefilledSector }: CompanyInfoStepProps) {
  return (
    <div className="space-y-6">
      <div className="brutalist-card p-6 bg-blue-50">
        <h2 className="text-3xl font-bold mb-2">Şirket Bilgileri</h2>
        <p className="text-gray-700">Şirketinizin temel bilgilerini giriniz</p>
      </div>

      <div className="space-y-4">
        {/* Company Name */}
        <div>
          <label className="block font-bold mb-2">
            Şirket Ünvanı <span className="text-red-600">*</span>
          </label>
          <input
            {...register('companyName')}
            type="text"
            className="w-full p-4 border-4 border-black font-mono text-lg focus:outline-none focus:border-blue-600"
            placeholder="Örnek Ticaret A.Ş."
          />
          {errors.companyName && (
            <p className="mt-2 text-red-600 font-bold">⚠️ {errors.companyName.message}</p>
          )}
        </div>

        {/* Tax Number */}
        <div>
          <label className="block font-bold mb-2">
            Vergi Numarası <span className="text-red-600">*</span>
          </label>
          <input
            {...register('taxNumber')}
            type="text"
            maxLength={10}
            className="w-full p-4 border-4 border-black font-mono text-lg focus:outline-none focus:border-blue-600"
            placeholder="1234567890"
          />
          {errors.taxNumber && (
            <p className="mt-2 text-red-600 font-bold">⚠️ {errors.taxNumber.message}</p>
          )}
        </div>

        {/* Company Type */}
        <div>
          <label className="block font-bold mb-2">
            Şirket Türü <span className="text-red-600">*</span>
          </label>
          <select
            {...register('companyType')}
            className="w-full p-4 border-4 border-black font-mono text-lg focus:outline-none focus:border-blue-600"
          >
            <option value="">Seçiniz...</option>
            <option value="limited">Limited Şirket</option>
            <option value="anonim">Anonim Şirket</option>
            <option value="sahis">Şahıs Şirketi</option>
            <option value="kollektif">Kollektif Şirket</option>
          </select>
          {errors.companyType && (
            <p className="mt-2 text-red-600 font-bold">⚠️ {errors.companyType.message}</p>
          )}
        </div>

        {/* Sector */}
        <div>
          <label className="block font-bold mb-2">
            Sektör <span className="text-red-600">*</span>
          </label>
          <select
            {...register('sector')}
            disabled={!!prefilledSector}
            className={`w-full p-4 border-4 border-black font-mono text-lg focus:outline-none ${
              prefilledSector 
                ? 'bg-gray-100 cursor-not-allowed text-gray-700' 
                : 'focus:border-blue-600'
            }`}
          >
            <option value="">Seçiniz...</option>
            {SECTORS.map(sector => (
              <option key={sector.value} value={sector.value}>
                {sector.label}
              </option>
            ))}
          </select>
          {prefilledSector && (
            <p className="text-xs mono-text text-gray-600 mt-2">
              ℹ️ Sektör önceden seçilmiş. Değiştirmek için <a href="/basvuru-yeni" className="underline hover:text-blue-600">ana başvuru formunu</a> kullanın.
            </p>
          )}
          {errors.sector && (
            <p className="mt-2 text-red-600 font-bold">⚠️ {errors.sector.message}</p>
          )}
        </div>

        {/* Founding Year */}
        <div>
          <label className="block font-bold mb-2">
            Kuruluş Yılı <span className="text-red-600">*</span>
          </label>
          <input
            {...register('foundingYear', { valueAsNumber: true })}
            type="number"
            min="1900"
            max={new Date().getFullYear()}
            className="w-full p-4 border-4 border-black font-mono text-lg focus:outline-none focus:border-blue-600"
            placeholder="2020"
          />
          {errors.foundingYear && (
            <p className="mt-2 text-red-600 font-bold">⚠️ {errors.foundingYear.message}</p>
          )}
        </div>
      </div>
    </div>
  )
}
