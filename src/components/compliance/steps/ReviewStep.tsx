/**
 * Step 6: Review & Submit
 */

import { ComplianceScoring } from '@/types/compliance'
import { ScoreDisplay } from '../ScoreDisplay'

interface ReviewStepProps {
  formData: any
  scoring: ComplianceScoring
}

export function ReviewStep({ formData, scoring }: ReviewStepProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0
    }).format(value)
  }

  return (
    <div className="space-y-6">
      <div className="brutalist-card p-6 bg-green-50">
        <h2 className="text-3xl font-bold mb-2">Başvuru Özeti</h2>
        <p className="text-gray-700">Bilgilerinizi kontrol edin ve onaylayın</p>
      </div>

      {/* Compliance Score */}
      <ScoreDisplay scoring={scoring} showDetails={true} />

      {/* Company Info */}
      <div className="brutalist-card p-6 bg-white">
        <h3 className="text-xl font-bold mb-4 border-b-4 border-black pb-2">
          🏢 Şirket Bilgileri
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-600">Şirket Ünvanı</div>
            <div className="font-bold">{formData.companyName}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Vergi Numarası</div>
            <div className="font-bold font-mono">{formData.taxNumber}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Şirket Türü</div>
            <div className="font-bold">{formData.companyType}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Sektör</div>
            <div className="font-bold">{formData.sector}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Kuruluş Yılı</div>
            <div className="font-bold">{formData.foundingYear}</div>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="brutalist-card p-6 bg-white">
        <h3 className="text-xl font-bold mb-4 border-b-4 border-black pb-2">
          📞 İletişim Bilgileri
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-600">Yetkili Kişi</div>
            <div className="font-bold">{formData.contactName}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Ünvan</div>
            <div className="font-bold">{formData.contactTitle}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">E-posta</div>
            <div className="font-bold">{formData.contactEmail}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Telefon</div>
            <div className="font-bold font-mono">{formData.contactPhone}</div>
          </div>
          <div className="md:col-span-2">
            <div className="text-sm text-gray-600">Adres</div>
            <div className="font-bold">{formData.companyAddress}, {formData.city}</div>
          </div>
        </div>
      </div>

      {/* Financial Info */}
      <div className="brutalist-card p-6 bg-white">
        <h3 className="text-xl font-bold mb-4 border-b-4 border-black pb-2">
          💰 Finansal Bilgiler
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-600">Yıllık Ciro</div>
            <div className="font-bold text-lg">{formatCurrency(formData.annualRevenue)}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Kredili Satış Oranı</div>
            <div className="font-bold text-lg">%{formData.creditSalesRatio}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Ortalama Vade</div>
            <div className="font-bold text-lg">{formData.averagePaymentTerm} gün</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Ortalama Sepet</div>
            <div className="font-bold text-lg">{formatCurrency(formData.averageBasketSize)}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Aylık Alacak</div>
            <div className="font-bold text-lg">{formatCurrency(formData.monthlyReceivables)}</div>
          </div>
        </div>
      </div>

      {/* VDMK Request */}
      <div className="brutalist-card p-6 bg-yellow-50">
        <h3 className="text-xl font-bold mb-4 border-b-4 border-black pb-2">
          📋 VDMK Talep Detayları
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-sm text-gray-600">Talep Edilen Tutar</div>
            <div className="font-bold text-2xl text-blue-600">
              {formatCurrency(formData.requestedAmount)}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Talep Edilen Vade</div>
            <div className="font-bold text-2xl text-blue-600">
              {formData.requestedTerm} gün
            </div>
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-600 mb-2">Kullanım Amacı</div>
          <div className="p-4 bg-white border-4 border-black">
            {formData.purpose}
          </div>
        </div>
      </div>

      {/* Consent */}
      <div className="brutalist-card p-6 bg-gray-50">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            required
            className="mt-1 w-5 h-5"
          />
          <span className="text-sm">
            <strong>Onaylıyorum:</strong> Verdiğim bilgilerin doğru olduğunu, 
            KolayMoney.com'un bu bilgileri değerlendirmek ve benimle iletişime geçmek için 
            kullanabileceğini kabul ediyorum. KVKK kapsamında kişisel verilerimin işlenmesine 
            onay veriyorum.
          </span>
        </label>
      </div>

      {/* Warning if not passed */}
      {!scoring.isPassed && (
        <div className="brutalist-card p-6 bg-red-50 border-red-600">
          <h3 className="text-xl font-bold mb-3 text-red-800">⚠️ Uyarı</h3>
          <p className="text-red-800">
            Uygunluk puanınız minimum %60 eşiğinin altında. Başvurunuz değerlendirmeye alınacak 
            ancak onay süreci daha uzun sürebilir. Eksik bilgilerinizi tamamlamanızı öneririz.
          </p>
        </div>
      )}
    </div>
  )
}
