/**
 * Step 2: Contact Information
 */

import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { CompleteComplianceFormData } from '@/lib/validations/compliance'

interface ContactInfoStepProps {
  register: UseFormRegister<CompleteComplianceFormData>
  errors: FieldErrors<CompleteComplianceFormData>
}

const CITIES = [
  'İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Adana', 'Konya', 'Gaziantep',
  'Şanlıurfa', 'Kocaeli', 'Mersin', 'Diyarbakır', 'Hatay', 'Manisa', 'Kayseri',
  'Samsun', 'Balıkesir', 'Kahramanmaraş', 'Van', 'Aydın', 'Denizli', 'Şahinbey',
  'Adapazarı', 'Tekirdağ', 'Muğla', 'Eskişehir', 'Erzurum', 'Malatya', 'Trabzon'
]

export function ContactInfoStep({ register, errors }: ContactInfoStepProps) {
  return (
    <div className="space-y-6">
      <div className="brutalist-card p-6 bg-green-50">
        <h2 className="text-3xl font-bold mb-2">İletişim Bilgileri</h2>
        <p className="text-gray-700">Yetkili kişi ve iletişim bilgilerinizi giriniz</p>
      </div>

      <div className="space-y-4">
        {/* Contact Name */}
        <div>
          <label className="block font-bold mb-2">
            Yetkili Kişi Ad Soyad <span className="text-red-600">*</span>
          </label>
          <input
            {...register('contactName')}
            type="text"
            className="w-full p-4 border-4 border-black font-mono text-lg focus:outline-none focus:border-blue-600"
            placeholder="Ahmet Yılmaz"
          />
          {errors.contactName && (
            <p className="mt-2 text-red-600 font-bold">⚠️ {errors.contactName.message}</p>
          )}
        </div>

        {/* Contact Title */}
        <div>
          <label className="block font-bold mb-2">
            Ünvan <span className="text-red-600">*</span>
          </label>
          <input
            {...register('contactTitle')}
            type="text"
            className="w-full p-4 border-4 border-black font-mono text-lg focus:outline-none focus:border-blue-600"
            placeholder="Genel Müdür"
          />
          {errors.contactTitle && (
            <p className="mt-2 text-red-600 font-bold">⚠️ {errors.contactTitle.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block font-bold mb-2">
            E-posta <span className="text-red-600">*</span>
          </label>
          <input
            {...register('contactEmail')}
            type="email"
            className="w-full p-4 border-4 border-black font-mono text-lg focus:outline-none focus:border-blue-600"
            placeholder="info@sirket.com"
          />
          {errors.contactEmail && (
            <p className="mt-2 text-red-600 font-bold">⚠️ {errors.contactEmail.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block font-bold mb-2">
            Telefon <span className="text-red-600">*</span>
          </label>
          <input
            {...register('contactPhone')}
            type="tel"
            className="w-full p-4 border-4 border-black font-mono text-lg focus:outline-none focus:border-blue-600"
            placeholder="+905551234567"
          />
          <p className="mt-1 text-sm text-gray-600">Format: +90XXXXXXXXXX</p>
          {errors.contactPhone && (
            <p className="mt-2 text-red-600 font-bold">⚠️ {errors.contactPhone.message}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="block font-bold mb-2">
            Şirket Adresi <span className="text-red-600">*</span>
          </label>
          <textarea
            {...register('companyAddress')}
            rows={3}
            className="w-full p-4 border-4 border-black font-mono text-lg focus:outline-none focus:border-blue-600 resize-none"
            placeholder="Mahalle, Sokak, No, Bina bilgisi..."
          />
          {errors.companyAddress && (
            <p className="mt-2 text-red-600 font-bold">⚠️ {errors.companyAddress.message}</p>
          )}
        </div>

        {/* City */}
        <div>
          <label className="block font-bold mb-2">
            Şehir <span className="text-red-600">*</span>
          </label>
          <select
            {...register('city')}
            className="w-full p-4 border-4 border-black font-mono text-lg focus:outline-none focus:border-blue-600"
          >
            <option value="">Seçiniz...</option>
            {CITIES.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          {errors.city && (
            <p className="mt-2 text-red-600 font-bold">⚠️ {errors.city.message}</p>
          )}
        </div>
      </div>
    </div>
  )
}
