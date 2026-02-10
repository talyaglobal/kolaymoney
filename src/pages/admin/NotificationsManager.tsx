/**
 * Notifications Manager - Email notification tracking
 * View and manage application email notifications
 */

import { useState, useEffect } from 'react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { supabase } from '@/lib/supabase/client'
import { Mail, CheckCircle, XCircle, Clock, RefreshCw } from 'lucide-react'

interface ApplicationNotification {
  id: string
  application_id: string
  type: string
  subject: string
  body: string
  recipient_email: string
  status: string
  sent_at: string | null
  error_message: string | null
  created_at: string
}

const NOTIFICATION_TYPES = {
  application_received: 'Başvuru Alındı',
  application_approved: 'Başvuru Onaylandı',
  application_rejected: 'Başvuru Reddedildi',
  more_info_needed: 'Ek Bilgi Gerekli',
  document_request: 'Döküman Talebi',
  status_update: 'Durum Güncelleme'
}

const STATUS_CONFIG = {
  pending: { label: 'Bekliyor', color: 'bg-yellow-100 text-yellow-800 border-yellow-600', icon: Clock },
  sent: { label: 'Gönderildi', color: 'bg-green-100 text-green-800 border-green-600', icon: CheckCircle },
  failed: { label: 'Başarısız', color: 'bg-red-100 text-red-800 border-red-600', icon: XCircle }
}

export function NotificationsManager() {
  const [notifications, setNotifications] = useState<ApplicationNotification[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState({
    status: '',
    type: '',
    search: ''
  })
  const [selectedNotification, setSelectedNotification] = useState<ApplicationNotification | null>(null)

  useEffect(() => {
    loadNotifications()
  }, [filter])

  const loadNotifications = async () => {
    setLoading(true)
    try {
      let query = supabase
        .from('application_notifications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100)

      if (filter.status) {
        query = query.eq('status', filter.status)
      }

      if (filter.type) {
        query = query.eq('type', filter.type)
      }

      if (filter.search) {
        query = query.or(`recipient_email.ilike.%${filter.search}%,subject.ilike.%${filter.search}%`)
      }

      const { data, error } = await query

      if (error) throw error

      setNotifications(data || [])
    } catch (error) {
      console.error('Error loading notifications:', error)
      alert('Bildirimler yüklenemedi')
    } finally {
      setLoading(false)
    }
  }

  const handleRetry = async (id: string) => {
    if (!confirm('Bu bildirimi yeniden göndermek istiyor musunuz?')) return

    try {
      // In a real implementation, this would trigger the email sending function
      // For now, we'll just update the status
      const { error } = await supabase
        .from('application_notifications')
        .update({ status: 'pending', error_message: null })
        .eq('id', id)

      if (error) throw error

      alert('Bildirim yeniden gönderilmek üzere işaretlendi')
      loadNotifications()
    } catch (error) {
      console.error('Error retrying notification:', error)
      alert('İşlem başarısız')
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const stats = {
    total: notifications.length,
    sent: notifications.filter(n => n.status === 'sent').length,
    pending: notifications.filter(n => n.status === 'pending').length,
    failed: notifications.filter(n => n.status === 'failed').length
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="brutalist-card p-6 bg-blue-50">
          <h1 className="text-3xl font-bold mb-2">📧 Bildirim Yönetimi</h1>
          <p className="text-gray-700">
            E-posta bildirimlerini görüntüleyin ve yönetin
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="brutalist-card p-6 bg-white">
            <div className="text-3xl font-bold">{stats.total}</div>
            <div className="text-sm text-gray-700">Toplam Bildirim</div>
          </div>
          <div className="brutalist-card p-6 bg-green-50">
            <div className="text-3xl font-bold">{stats.sent}</div>
            <div className="text-sm text-gray-700">Gönderildi</div>
          </div>
          <div className="brutalist-card p-6 bg-yellow-50">
            <div className="text-3xl font-bold">{stats.pending}</div>
            <div className="text-sm text-gray-700">Bekliyor</div>
          </div>
          <div className="brutalist-card p-6 bg-red-50">
            <div className="text-3xl font-bold">{stats.failed}</div>
            <div className="text-sm text-gray-700">Başarısız</div>
          </div>
        </div>

        {/* Filters */}
        <div className="brutalist-card p-6 bg-white">
          <h2 className="text-xl font-bold mb-4">Filtrele</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block font-bold mb-2">Durum</label>
              <select
                value={filter.status}
                onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                className="w-full p-3 border-4 border-black"
              >
                <option value="">Tümü</option>
                <option value="pending">Bekliyor</option>
                <option value="sent">Gönderildi</option>
                <option value="failed">Başarısız</option>
              </select>
            </div>
            <div>
              <label className="block font-bold mb-2">Tip</label>
              <select
                value={filter.type}
                onChange={(e) => setFilter({ ...filter, type: e.target.value })}
                className="w-full p-3 border-4 border-black"
              >
                <option value="">Tümü</option>
                {Object.entries(NOTIFICATION_TYPES).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-bold mb-2">Ara</label>
              <input
                type="text"
                value={filter.search}
                onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                placeholder="E-posta veya konu..."
                className="w-full p-3 border-4 border-black"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={() => setFilter({ status: '', type: '', search: '' })}
                className="brutalist-button bg-gray-100 w-full"
              >
                Temizle
              </button>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="brutalist-card p-6 bg-white">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-pulse">
                <p className="font-bold">Yükleniyor...</p>
              </div>
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📭</div>
              <p className="font-bold">Bildirim bulunamadı</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification) => {
                const StatusIcon = STATUS_CONFIG[notification.status as keyof typeof STATUS_CONFIG]?.icon || Mail
                const statusConfig = STATUS_CONFIG[notification.status as keyof typeof STATUS_CONFIG]

                return (
                  <div
                    key={notification.id}
                    className="border-4 border-black p-4 hover:translate-x-1 hover:translate-y-1 transition-transform"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="text-3xl">
                          <Mail className="w-8 h-8" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`px-3 py-1 border-2 text-sm font-bold ${statusConfig?.color || 'bg-gray-100'}`}>
                              <StatusIcon className="w-4 h-4 inline mr-1" />
                              {statusConfig?.label || notification.status}
                            </span>
                            <span className="px-2 py-1 bg-purple-100 border-2 border-purple-600 text-purple-800 text-xs font-bold">
                              {NOTIFICATION_TYPES[notification.type as keyof typeof NOTIFICATION_TYPES] || notification.type}
                            </span>
                          </div>
                          
                          <div className="font-bold text-lg mb-1">{notification.subject}</div>
                          
                          <div className="text-sm text-gray-700 space-y-1">
                            <div>
                              <strong>Alıcı:</strong> {notification.recipient_email}
                            </div>
                            <div>
                              <strong>Oluşturma:</strong> {formatDate(notification.created_at)}
                            </div>
                            {notification.sent_at && (
                              <div>
                                <strong>Gönderim:</strong> {formatDate(notification.sent_at)}
                              </div>
                            )}
                            {notification.error_message && (
                              <div className="text-red-600">
                                <strong>Hata:</strong> {notification.error_message}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedNotification(notification)}
                          className="p-2 border-2 border-black hover:bg-blue-100"
                          title="Detay"
                        >
                          <Mail className="w-5 h-5" />
                        </button>
                        {notification.status === 'failed' && (
                          <button
                            onClick={() => handleRetry(notification.id)}
                            className="p-2 border-2 border-black hover:bg-green-100"
                            title="Yeniden Gönder"
                          >
                            <RefreshCw className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Detail Modal */}
        {selectedNotification && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="brutalist-card bg-white p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">Bildirim Detayı</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="font-bold">Konu:</label>
                  <p>{selectedNotification.subject}</p>
                </div>
                
                <div>
                  <label className="font-bold">İçerik:</label>
                  <div className="p-4 bg-gray-50 border-2 border-gray-300 whitespace-pre-wrap">
                    {selectedNotification.body}
                  </div>
                </div>
                
                <div>
                  <label className="font-bold">Alıcı:</label>
                  <p>{selectedNotification.recipient_email}</p>
                </div>
                
                <div>
                  <label className="font-bold">Durum:</label>
                  <p>{STATUS_CONFIG[selectedNotification.status as keyof typeof STATUS_CONFIG]?.label || selectedNotification.status}</p>
                </div>
                
                {selectedNotification.error_message && (
                  <div>
                    <label className="font-bold text-red-600">Hata Mesajı:</label>
                    <p className="text-red-600">{selectedNotification.error_message}</p>
                  </div>
                )}
              </div>
              
              <button
                onClick={() => setSelectedNotification(null)}
                className="brutalist-button bg-gray-100 w-full mt-6"
              >
                Kapat
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
