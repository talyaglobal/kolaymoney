import { useState, useEffect } from 'react'
import { useApplication } from '@/hooks/useApplication'
import { useApplications } from '@/hooks/useApplications'
import { formatCurrency, formatDateTime, formatPhone, formatTaxNumber } from '@/lib/utils/format'
import { APPLICATION_STATUSES, SECTORS, RECEIVABLES_TYPES } from '@/lib/utils/constants'
import type { Tables } from '@/lib/supabase/client'

type Application = Tables<'applications'>

interface ApplicationDetailProps {
  applicationId: string
}

export function ApplicationDetail({ applicationId }: ApplicationDetailProps) {
  const [application, setApplication] = useState<Application | null>(null)
  const [notes, setNotes] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<Application['status']>('pending')
  const { getApplication, loading: fetchLoading } = useApplication()
  const { updateApplication, loading: updateLoading } = useApplications({ autoFetch: false })

  useEffect(() => {
    loadApplication()
  }, [applicationId])

  const loadApplication = async () => {
    try {
      const data = await getApplication(applicationId)
      setApplication(data)
      setSelectedStatus(data.status)
      setNotes(data.notes || '')
    } catch (error) {
      console.error('Failed to load application:', error)
    }
  }

  const handleStatusUpdate = async () => {
    if (!application) return

    try {
      await updateApplication(applicationId, {
        status: selectedStatus,
        notes: notes || null,
        reviewed_at: new Date().toISOString(),
      })

      alert('Başvuru durumu güncellendi')
      await loadApplication()
    } catch (error) {
      alert('Güncelleme başarısız oldu')
    }
  }

  const getStatusColor = (status: Application['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 border-yellow-600 text-yellow-900'
      case 'under_review':
        return 'bg-blue-100 border-blue-600 text-blue-900'
      case 'approved':
        return 'bg-green-100 border-green-600 text-green-900'
      case 'rejected':
        return 'bg-red-100 border-red-600 text-red-900'
      case 'issued':
        return 'bg-purple-100 border-purple-600 text-purple-900'
      default:
        return 'bg-gray-100 border-gray-600 text-gray-900'
    }
  }

  if (fetchLoading || !application) {
    return (
      <div className="brutalist-card p-8 text-center">
        <p className="mono-text">Yükleniyor...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="heading-2">{application.company_name}</h1>
          <p className="mono-text text-gray-600 mt-2">
            Başvuru Tarihi: {formatDateTime(application.submitted_at)}
          </p>
        </div>
        <span
          className={`px-4 py-2 border-2 mono-text font-medium ${getStatusColor(
            application.status
          )}`}
        >
          {APPLICATION_STATUSES[application.status]}
        </span>
      </div>

      {/* Company Information */}
      <div className="brutalist-card p-8">
        <h2 className="heading-3 mb-6">Şirket Bilgileri</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="mono-text text-sm text-gray-600 mb-1">Şirket Adı</p>
            <p className="mono-text font-medium">{application.company_name}</p>
          </div>
          <div>
            <p className="mono-text text-sm text-gray-600 mb-1">Vergi Numarası</p>
            <p className="mono-text font-medium">{formatTaxNumber(application.tax_number)}</p>
          </div>
          <div>
            <p className="mono-text text-sm text-gray-600 mb-1">İletişim Kişisi</p>
            <p className="mono-text font-medium">{application.contact_person}</p>
          </div>
          <div>
            <p className="mono-text text-sm text-gray-600 mb-1">E-posta</p>
            <p className="mono-text font-medium">{application.email}</p>
          </div>
          <div>
            <p className="mono-text text-sm text-gray-600 mb-1">Telefon</p>
            <p className="mono-text font-medium">{formatPhone(application.phone)}</p>
          </div>
          <div>
            <p className="mono-text text-sm text-gray-600 mb-1">Sektör</p>
            <p className="mono-text font-medium">{SECTORS[application.sector]}</p>
          </div>
        </div>
      </div>

      {/* Financing Details */}
      <div className="brutalist-card p-8">
        <h2 className="heading-3 mb-6">Finansman Detayları</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="mono-text text-sm text-gray-600 mb-1">Finansman Tutarı</p>
            <p className="mono-text font-bold text-2xl text-[#0047FF]">
              {formatCurrency(Number(application.financing_amount))}
            </p>
          </div>
          <div>
            <p className="mono-text text-sm text-gray-600 mb-1">Alacak Türü</p>
            <p className="mono-text font-medium">{RECEIVABLES_TYPES[application.receivables_type]}</p>
          </div>
          <div>
            <p className="mono-text text-sm text-gray-600 mb-1">Vade Süresi</p>
            <p className="mono-text font-medium">{application.payment_terms_months} Ay</p>
          </div>
        </div>
      </div>

      {/* Status Update */}
      <div className="brutalist-card p-8">
        <h2 className="heading-3 mb-6">Durum Güncelleme</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="status" className="mono-text block mb-2 font-medium">
              Yeni Durum
            </label>
            <select
              id="status"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as Application['status'])}
              className="w-full px-4 py-3 border-2 border-black bg-white mono-text focus:outline-none focus:border-[#0047FF]"
            >
              {Object.entries(APPLICATION_STATUSES).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="notes" className="mono-text block mb-2 font-medium">
              Notlar
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border-2 border-black bg-white mono-text focus:outline-none focus:border-[#0047FF] resize-none"
              placeholder="Başvuru ile ilgili notlarınızı buraya ekleyebilirsiniz..."
            />
          </div>

          <button
            onClick={handleStatusUpdate}
            disabled={updateLoading}
            className="px-8 py-4 border-2 border-black bg-[#0047FF] text-white hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all mono-text font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {updateLoading ? 'Güncelleniyor...' : 'Durumu Güncelle'}
          </button>
        </div>
      </div>

      {/* Current Notes */}
      {application.notes && (
        <div className="brutalist-card p-8 bg-gray-50">
          <h2 className="heading-3 mb-4">Mevcut Notlar</h2>
          <p className="mono-text whitespace-pre-wrap">{application.notes}</p>
          {application.reviewed_at && (
            <p className="mono-text text-sm text-gray-600 mt-4">
              Son güncelleme: {formatDateTime(application.reviewed_at)}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
