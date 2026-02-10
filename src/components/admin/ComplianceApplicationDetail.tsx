/**
 * Compliance Application Detail Modal
 */

import { useState } from 'react'
import { ComplianceApplication } from '@/types/compliance'
import { ScoreDisplay } from '../compliance/ScoreDisplay'
import { updateApplicationStatus } from '@/lib/supabase/compliance'

interface ComplianceApplicationDetailProps {
  application: ComplianceApplication
  onClose: () => void
  onUpdate: () => void
}

export function ComplianceApplicationDetail({
  application,
  onClose,
  onUpdate
}: ComplianceApplicationDetailProps) {
  const [status, setStatus] = useState<string>(application.status)
  const [reviewNotes, setReviewNotes] = useState(application.reviewNotes || '')
  const [isUpdating, setIsUpdating] = useState(false)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0
    }).format(value)
  }

  const handleStatusUpdate = async () => {
    setIsUpdating(true)
    try {
      await updateApplicationStatus(application.id, status, reviewNotes)
      alert('Başvuru durumu güncellendi')
      onUpdate()
      onClose()
    } catch (error) {
      console.error('Update error:', error)
      alert('Güncelleme başarısız oldu')
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border-4 border-black max-w-6xl w-full my-8">
        {/* Header */}
        <div className="p-6 bg-black text-white flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{application.companyName}</h2>
            <p className="text-sm opacity-80">ID: {application.id}</p>
          </div>
          <button
            onClick={onClose}
            className="text-3xl hover:text-red-400 transition-colors"
          >
            ×
          </button>
        </div>

        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {/* Compliance Score */}
          {application.scoringDetails && (
            <div className="mb-6">
              <ScoreDisplay scoring={application.scoringDetails} showDetails={true} />
            </div>
          )}

          {/* Company Info */}
          <div className="brutalist-card p-6 bg-white mb-6">
            <h3 className="text-xl font-bold mb-4 border-b-4 border-black pb-2">
              🏢 Şirket Bilgileri
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600">Vergi No</div>
                <div className="font-bold font-mono">{application.taxNumber}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Şirket Türü</div>
                <div className="font-bold">{application.companyType}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Sektör</div>
                <div className="font-bold">{application.sector}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Kuruluş Yılı</div>
                <div className="font-bold">{application.foundingYear}</div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="brutalist-card p-6 bg-white mb-6">
            <h3 className="text-xl font-bold mb-4 border-b-4 border-black pb-2">
              📞 İletişim
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600">Yetkili</div>
                <div className="font-bold">{application.contactName} - {application.contactTitle}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">E-posta</div>
                <div className="font-bold">{application.contactEmail}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Telefon</div>
                <div className="font-bold font-mono">{application.contactPhone}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Şehir</div>
                <div className="font-bold">{application.city}</div>
              </div>
            </div>
          </div>

          {/* Financial Info */}
          <div className="brutalist-card p-6 bg-white mb-6">
            <h3 className="text-xl font-bold mb-4 border-b-4 border-black pb-2">
              💰 Finansal Bilgiler
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-gray-600">Yıllık Ciro</div>
                <div className="font-bold">{formatCurrency(application.annualRevenue)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Kredili Satış</div>
                <div className="font-bold">%{application.creditSalesRatio}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Ort. Vade</div>
                <div className="font-bold">{application.averagePaymentTerm} gün</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Ort. Sepet</div>
                <div className="font-bold">{formatCurrency(application.averageBasketSize)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Aylık Alacak</div>
                <div className="font-bold">{formatCurrency(application.monthlyReceivables)}</div>
              </div>
            </div>
          </div>

          {/* VDMK Request */}
          <div className="brutalist-card p-6 bg-yellow-50 mb-6">
            <h3 className="text-xl font-bold mb-4 border-b-4 border-black pb-2">
              📋 VDMK Talebi
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm text-gray-600">Talep Tutarı</div>
                <div className="font-bold text-2xl text-blue-600">
                  {formatCurrency(application.requestedAmount)}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Vade</div>
                <div className="font-bold text-2xl text-blue-600">
                  {application.requestedTerm} gün
                </div>
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-2">Kullanım Amacı</div>
              <div className="p-4 bg-white border-4 border-black">
                {application.purpose}
              </div>
            </div>
          </div>

          {/* Status Update */}
          <div className="brutalist-card p-6 bg-gray-50">
            <h3 className="text-xl font-bold mb-4">Durum Güncelle</h3>
            <div className="space-y-4">
              <div>
                <label className="block font-bold mb-2">Durum</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full p-3 border-4 border-black"
                >
                  <option value="pending">Beklemede</option>
                  <option value="under_review">İnceleniyor</option>
                  <option value="approved">Onaylandı</option>
                  <option value="rejected">Reddedildi</option>
                  <option value="more_info_needed">Ek Bilgi Gerekli</option>
                </select>
              </div>

              <div>
                <label className="block font-bold mb-2">İnceleme Notları</label>
                <textarea
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  rows={4}
                  className="w-full p-3 border-4 border-black resize-none"
                  placeholder="İnceleme notlarınızı giriniz..."
                />
              </div>

              <button
                onClick={handleStatusUpdate}
                disabled={isUpdating}
                className="brutalist-btn bg-green-600 text-white w-full disabled:opacity-50"
              >
                {isUpdating ? 'Güncelleniyor...' : '✓ Güncelle'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
