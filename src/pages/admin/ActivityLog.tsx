/**
 * Activity Log - System activity monitoring
 * Shows all admin actions and system events
 */

import { useState, useEffect } from 'react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { supabase } from '@/lib/supabase/client'

interface ActivityLogEntry {
  id: string
  user_id: string | null
  action: string
  resource_type: string
  resource_id: string
  metadata: any
  ip_address: unknown
  user_agent: string | null
  created_at: string
  admin_users?: {
    full_name: string
    email: string
  } | null
}

export function ActivityLog() {
  const [activities, setActivities] = useState<ActivityLogEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState({
    action: '',
    resource_type: '',
    user_id: ''
  })
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const ITEMS_PER_PAGE = 50

  useEffect(() => {
    loadActivities()
  }, [page, filter])

  const loadActivities = async () => {
    setLoading(true)
    try {
      let query = supabase
        .from('activity_log')
        .select(`
          *,
          admin_users (
            full_name,
            email
          )
        `, { count: 'exact' })
        .order('created_at', { ascending: false })
        .range((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE - 1)

      if (filter.action) {
        query = query.ilike('action', `%${filter.action}%`)
      }
      if (filter.resource_type) {
        query = query.eq('resource_type', filter.resource_type)
      }
      if (filter.user_id) {
        query = query.eq('user_id', filter.user_id)
      }

      const { data, error, count } = await query

      if (error) throw error

      setActivities(data || [])
      setTotalCount(count || 0)
    } catch (error) {
      console.error('Error loading activities:', error)
      alert('Aktiviteler yüklenemedi')
    } finally {
      setLoading(false)
    }
  }

  const getActionColor = (action: string) => {
    if (action.includes('create')) return 'bg-green-100 text-green-800 border-green-600'
    if (action.includes('update')) return 'bg-blue-100 text-blue-800 border-blue-600'
    if (action.includes('delete')) return 'bg-red-100 text-red-800 border-red-600'
    if (action.includes('login')) return 'bg-purple-100 text-purple-800 border-purple-600'
    return 'bg-gray-100 text-gray-800 border-gray-600'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('tr-TR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="brutalist-card p-6 bg-purple-50">
          <h1 className="text-3xl font-bold mb-2">📋 Aktivite Günlüğü</h1>
          <p className="text-gray-700">
            Sistem aktivitelerini ve admin işlemlerini görüntüleyin
          </p>
        </div>

        {/* Filters */}
        <div className="brutalist-card p-6 bg-white">
          <h2 className="text-xl font-bold mb-4">Filtrele</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold mb-2">İşlem</label>
              <input
                type="text"
                value={filter.action}
                onChange={(e) => setFilter({ ...filter, action: e.target.value })}
                placeholder="Örn: create, update, delete"
                className="w-full p-3 border-4 border-black"
              />
            </div>
            <div>
              <label className="block font-bold mb-2">Kaynak Tipi</label>
              <select
                value={filter.resource_type}
                onChange={(e) => setFilter({ ...filter, resource_type: e.target.value })}
                className="w-full p-3 border-4 border-black"
              >
                <option value="">Tümü</option>
                <option value="applications">Başvurular</option>
                <option value="compliance_applications">Uygunluk Başvuruları</option>
                <option value="admin_users">Admin Kullanıcılar</option>
                <option value="sector_questions">Sektör Soruları</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  setFilter({ action: '', resource_type: '', user_id: '' })
                  setPage(1)
                }}
                className="brutalist-button bg-gray-100 w-full"
              >
                Filtreleri Temizle
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="brutalist-card p-6 bg-blue-50">
            <div className="text-3xl font-bold">{totalCount}</div>
            <div className="text-sm text-gray-700">Toplam Aktivite</div>
          </div>
          <div className="brutalist-card p-6 bg-green-50">
            <div className="text-3xl font-bold">{activities.filter(a => a.action.includes('create')).length}</div>
            <div className="text-sm text-gray-700">Oluşturma</div>
          </div>
          <div className="brutalist-card p-6 bg-orange-50">
            <div className="text-3xl font-bold">{activities.filter(a => a.action.includes('update')).length}</div>
            <div className="text-sm text-gray-700">Güncelleme</div>
          </div>
        </div>

        {/* Activity List */}
        <div className="brutalist-card p-6 bg-white">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-pulse">
                <p className="font-bold">Yükleniyor...</p>
              </div>
            </div>
          ) : activities.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📭</div>
              <p className="font-bold">Aktivite bulunamadı</p>
            </div>
          ) : (
            <div className="space-y-3">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="border-4 border-black p-4 hover:translate-x-1 hover:translate-y-1 transition-transform"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 border-2 text-sm font-bold ${getActionColor(activity.action)}`}>
                          {activity.action}
                        </span>
                        <span className="text-sm text-gray-600">
                          {activity.resource_type}
                        </span>
                      </div>
                      
                      <div className="text-sm text-gray-700 space-y-1">
                        <div>
                          <strong>Kullanıcı:</strong>{' '}
                          {activity.admin_users ? (
                            <span>
                              {activity.admin_users.full_name} ({activity.admin_users.email})
                            </span>
                          ) : (
                            <span className="text-gray-500">Sistem</span>
                          )}
                        </div>
                        <div>
                          <strong>Kaynak ID:</strong> {activity.resource_id.slice(0, 8)}...
                        </div>
                        {activity.metadata && Object.keys(activity.metadata).length > 0 && (
                          <div>
                            <strong>Detaylar:</strong>{' '}
                            <code className="text-xs bg-gray-100 px-2 py-1">
                              {JSON.stringify(activity.metadata).slice(0, 100)}...
                            </code>
                          </div>
                        )}
                        <div className="text-xs text-gray-500">
                          {formatDate(activity.created_at)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-6 border-t-4 border-black">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="brutalist-button bg-gray-100 disabled:opacity-50"
              >
                ← Önceki
              </button>
              <span className="font-bold">
                Sayfa {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="brutalist-button bg-gray-100 disabled:opacity-50"
              >
                Sonraki →
              </button>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
