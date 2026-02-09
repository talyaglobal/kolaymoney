import { useState, useEffect } from 'react'
import { Link } from 'wouter'
import { useApplications } from '@/hooks/useApplications'
import { formatCurrency, formatDate } from '@/lib/utils/format'
import { APPLICATION_STATUSES, SECTORS } from '@/lib/utils/constants'
import type { Tables } from '@/lib/supabase/client'

type Application = Tables<'applications'>

export function ApplicationsList() {
  const [statusFilter, setStatusFilter] = useState<Application['status'] | ''>('')
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)

  const {
    applications,
    loading,
    error,
    totalCount,
    hasMore,
    subscribeToApplications,
  } = useApplications({
    page,
    status: statusFilter || undefined,
    searchTerm: searchTerm || undefined,
  })

  // Subscribe to real-time updates
  useEffect(() => {
    const unsubscribe = subscribeToApplications()
    return unsubscribe
  }, [])

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

  if (error) {
    return (
      <div className="brutalist-card p-8 bg-red-50 border-2 border-red-600">
        <p className="mono-text text-red-900">Hata: {error.message}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="heading-2">Başvurular</h1>
          <p className="mono-text text-gray-600 mt-2">Toplam {totalCount} başvuru</p>
        </div>
      </div>

      {/* Filters */}
      <div className="brutalist-card p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Status Filter */}
          <div>
            <label htmlFor="status-filter" className="mono-text block mb-2 font-medium text-sm">
              Durum Filtresi
            </label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as Application['status'] | '')
                setPage(1)
              }}
              className="w-full px-4 py-2 border-2 border-black bg-white mono-text focus:outline-none focus:border-[#0047FF]"
            >
              <option value="">Tümü</option>
              {Object.entries(APPLICATION_STATUSES).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div>
            <label htmlFor="search" className="mono-text block mb-2 font-medium text-sm">
              Arama
            </label>
            <input
              id="search"
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setPage(1)
              }}
              placeholder="Şirket adı, e-posta veya vergi no..."
              className="w-full px-4 py-2 border-2 border-black bg-white mono-text focus:outline-none focus:border-[#0047FF]"
            />
          </div>
        </div>
      </div>

      {/* Applications Table */}
      {loading && applications.length === 0 ? (
        <div className="brutalist-card p-8 text-center">
          <p className="mono-text">Yükleniyor...</p>
        </div>
      ) : applications.length === 0 ? (
        <div className="brutalist-card p-8 text-center">
          <p className="mono-text text-gray-600">Başvuru bulunamadı</p>
        </div>
      ) : (
        <>
          <div className="brutalist-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-black text-white">
                  <tr>
                    <th className="px-6 py-4 text-left mono-text text-sm font-medium">Şirket</th>
                    <th className="px-6 py-4 text-left mono-text text-sm font-medium">Sektör</th>
                    <th className="px-6 py-4 text-left mono-text text-sm font-medium">Tutar</th>
                    <th className="px-6 py-4 text-left mono-text text-sm font-medium">Durum</th>
                    <th className="px-6 py-4 text-left mono-text text-sm font-medium">Tarih</th>
                    <th className="px-6 py-4 text-left mono-text text-sm font-medium">İşlem</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-black">
                  {applications.map((application) => (
                    <tr key={application.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="mono-text font-medium">{application.company_name}</p>
                          <p className="mono-text text-sm text-gray-600">{application.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="mono-text text-sm">{SECTORS[application.sector]}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="mono-text font-medium text-[#0047FF]">
                          {formatCurrency(Number(application.financing_amount))}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 border-2 mono-text text-xs font-medium ${getStatusColor(
                            application.status
                          )}`}
                        >
                          {APPLICATION_STATUSES[application.status]}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="mono-text text-sm">
                          {formatDate(application.submitted_at)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Link href={`/admin/applications/${application.id}`}>
                          <a className="px-4 py-2 border-2 border-black bg-white hover:bg-black hover:text-white transition-colors mono-text text-sm inline-block">
                            Detay →
                          </a>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalCount > 20 && (
            <div className="flex justify-between items-center">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-6 py-3 border-2 border-black bg-white hover:bg-black hover:text-white transition-colors mono-text disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Önceki
              </button>

              <span className="mono-text">
                Sayfa {page} / {Math.ceil(totalCount / 20)}
              </span>

              <button
                onClick={() => setPage(p => p + 1)}
                disabled={!hasMore}
                className="px-6 py-3 border-2 border-black bg-white hover:bg-black hover:text-white transition-colors mono-text disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sonraki →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
