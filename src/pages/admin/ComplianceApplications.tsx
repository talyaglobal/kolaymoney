/**
 * Compliance Applications Admin Page
 * View and manage all compliance applications
 */

import { useState, useEffect } from 'react'
import { ComplianceApplication } from '@/types/compliance'
import { getApplications, getApplicationStatistics } from '@/lib/supabase/compliance'
import { ComplianceApplicationDetail } from '@/components/admin/ComplianceApplicationDetail'

const SECTORS = [
  { value: '', label: 'Tüm Sektörler' },
  { value: 'beyaz-esya', label: 'Beyaz Eşya' },
  { value: 'elektronik', label: 'Elektronik' },
  { value: 'mobilya', label: 'Mobilya' },
  { value: 'otomotiv-b2c', label: 'Otomotiv B2C' },
  { value: 'fmcg', label: 'FMCG' },
  { value: 'insaat', label: 'İnşaat' },
  { value: 'otomotiv-b2b', label: 'Otomotiv B2B' },
  { value: 'makine-ekipman', label: 'Makine & Ekipman' },
  { value: 'lojistik', label: 'Lojistik' },
  { value: 'tarim', label: 'Tarım' }
]

const STATUSES = [
  { value: '', label: 'Tüm Durumlar' },
  { value: 'pending', label: 'Beklemede' },
  { value: 'under_review', label: 'İnceleniyor' },
  { value: 'approved', label: 'Onaylandı' },
  { value: 'rejected', label: 'Reddedildi' },
  { value: 'more_info_needed', label: 'Ek Bilgi Gerekli' }
]

export function ComplianceApplications() {
  const [applications, setApplications] = useState<ComplianceApplication[]>([])
  const [filteredApplications, setFilteredApplications] = useState<ComplianceApplication[]>([])
  const [selectedApplication, setSelectedApplication] = useState<ComplianceApplication | null>(null)
  const [loading, setLoading] = useState(true)
  
  // Filters
  const [sectorFilter, setSectorFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [scoreFilter, setScoreFilter] = useState<[number, number]>([0, 100])
  const [searchTerm, setSearchTerm] = useState('')

  // Statistics
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    averageScore: 0,
    passRate: 0
  })

  useEffect(() => {
    loadApplications()
    loadStatistics()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [applications, sectorFilter, statusFilter, scoreFilter, searchTerm])

  const loadApplications = async () => {
    setLoading(true)
    try {
      const { applications: data } = await getApplications()
      setApplications(data)
    } catch (error) {
      console.error('Error loading applications:', error)
      alert('Başvurular yüklenemedi')
    } finally {
      setLoading(false)
    }
  }

  const loadStatistics = async () => {
    try {
      const data = await getApplicationStatistics()
      setStats(data)
    } catch (error) {
      console.error('Error loading statistics:', error)
    }
  }

  const applyFilters = () => {
    let filtered = [...applications]

    if (sectorFilter) {
      filtered = filtered.filter(a => a.sector === sectorFilter)
    }

    if (statusFilter) {
      filtered = filtered.filter(a => a.status === statusFilter)
    }

    filtered = filtered.filter(
      a => a.complianceScore >= scoreFilter[0] && a.complianceScore <= scoreFilter[1]
    )

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        a =>
          a.companyName.toLowerCase().includes(term) ||
          a.contactEmail.toLowerCase().includes(term) ||
          a.taxNumber.includes(term)
      )
    }

    setFilteredApplications(filtered)
  }

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: 'bg-yellow-500 text-white',
      under_review: 'bg-blue-500 text-white',
      approved: 'bg-green-500 text-white',
      rejected: 'bg-red-500 text-white',
      more_info_needed: 'bg-orange-500 text-white'
    }
    const labels = {
      pending: 'Beklemede',
      under_review: 'İnceleniyor',
      approved: 'Onaylandı',
      rejected: 'Reddedildi',
      more_info_needed: 'Ek Bilgi'
    }
    return (
      <span className={`px-3 py-1 border-2 border-black font-bold text-sm ${badges[status as keyof typeof badges]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    )
  }

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl font-bold">Yükleniyor...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Compliance Başvuruları</h1>
          <p className="text-gray-600">Tüm VDMK başvurularını görüntüleyin ve yönetin</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <div className="brutalist-card p-4 bg-white text-center">
            <div className="text-3xl font-bold">{stats.total}</div>
            <div className="text-sm text-gray-600">Toplam</div>
          </div>
          <div className="brutalist-card p-4 bg-yellow-50 text-center">
            <div className="text-3xl font-bold">{stats.pending}</div>
            <div className="text-sm text-gray-600">Beklemede</div>
          </div>
          <div className="brutalist-card p-4 bg-green-50 text-center">
            <div className="text-3xl font-bold">{stats.approved}</div>
            <div className="text-sm text-gray-600">Onaylı</div>
          </div>
          <div className="brutalist-card p-4 bg-red-50 text-center">
            <div className="text-3xl font-bold">{stats.rejected}</div>
            <div className="text-sm text-gray-600">Red</div>
          </div>
          <div className="brutalist-card p-4 bg-blue-50 text-center">
            <div className="text-3xl font-bold">{stats.averageScore}</div>
            <div className="text-sm text-gray-600">Ort. Puan</div>
          </div>
          <div className="brutalist-card p-4 bg-purple-50 text-center">
            <div className="text-3xl font-bold">{stats.passRate}%</div>
            <div className="text-sm text-gray-600">Geçiş Oranı</div>
          </div>
        </div>

        {/* Filters */}
        <div className="brutalist-card p-6 bg-white mb-6">
          <h3 className="text-xl font-bold mb-4">Filtreler</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block font-bold mb-2 text-sm">Sektör</label>
              <select
                value={sectorFilter}
                onChange={(e) => setSectorFilter(e.target.value)}
                className="w-full p-2 border-4 border-black"
              >
                {SECTORS.map(s => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold mb-2 text-sm">Durum</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full p-2 border-4 border-black"
              >
                {STATUSES.map(s => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold mb-2 text-sm">Min Puan</label>
              <input
                type="number"
                min="0"
                max="100"
                value={scoreFilter[0]}
                onChange={(e) => setScoreFilter([parseInt(e.target.value), scoreFilter[1]])}
                className="w-full p-2 border-4 border-black"
              />
            </div>

            <div>
              <label className="block font-bold mb-2 text-sm">Ara</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Şirket, email, vergi no..."
                className="w-full p-2 border-4 border-black"
              />
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="brutalist-card p-6 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">
              Başvurular ({filteredApplications.length})
            </h3>
            <button
              onClick={loadApplications}
              className="brutalist-btn bg-blue-600 text-white text-sm"
            >
              🔄 Yenile
            </button>
          </div>

          {filteredApplications.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              Başvuru bulunamadı
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-4 border-black">
                    <th className="text-left p-3 font-bold">Şirket</th>
                    <th className="text-left p-3 font-bold">Sektör</th>
                    <th className="text-center p-3 font-bold">Puan</th>
                    <th className="text-center p-3 font-bold">Durum</th>
                    <th className="text-left p-3 font-bold">Tarih</th>
                    <th className="text-center p-3 font-bold">İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.map((app) => (
                    <tr
                      key={app.id}
                      className="border-b-2 border-gray-200 hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedApplication(app)}
                    >
                      <td className="p-3">
                        <div className="font-bold">{app.companyName}</div>
                        <div className="text-sm text-gray-600">{app.contactEmail}</div>
                      </td>
                      <td className="p-3 text-sm">{app.sector}</td>
                      <td className="p-3 text-center">
                        <span className={`text-2xl font-bold ${getScoreColor(app.complianceScore)}`}>
                          {Math.round(app.complianceScore)}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        {getStatusBadge(app.status)}
                      </td>
                      <td className="p-3 text-sm">
                        {new Date(app.createdAt).toLocaleDateString('tr-TR')}
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedApplication(app)
                          }}
                          className="brutalist-btn bg-black text-white text-sm"
                        >
                          Detay
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedApplication && (
        <ComplianceApplicationDetail
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
          onUpdate={() => {
            loadApplications()
            loadStatistics()
          }}
        />
      )}
    </div>
  )
}
