/**
 * Admin Users Manager - Manage admin users and roles
 * Create, update, and manage admin user accounts
 */

import { useState, useEffect } from 'react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { supabase } from '@/lib/supabase/client'
import { Edit2, Trash2, Plus, UserCheck, UserX } from 'lucide-react'

interface AdminUser {
  id: string
  full_name: string
  email: string
  role: 'super_admin' | 'admin' | 'viewer'
  is_active: boolean
  last_login_at: string | null
  created_at: string
}

const ROLES = {
  super_admin: { label: 'Süper Admin', color: 'bg-red-100 text-red-800 border-red-600', icon: '👑' },
  admin: { label: 'Admin', color: 'bg-blue-100 text-blue-800 border-blue-600', icon: '🛡️' },
  viewer: { label: 'Görüntüleyici', color: 'bg-green-100 text-green-800 border-green-600', icon: '👁️' }
}

export function AdminUsersManager() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      setUsers(data || [])
    } catch (error) {
      console.error('Error loading admin users:', error)
      alert('Admin kullanıcıları yüklenemedi')
    } finally {
      setLoading(false)
    }
  }

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('admin_users')
        .update({ is_active: !currentStatus })
        .eq('id', id)

      if (error) throw error

      alert(`Kullanıcı ${!currentStatus ? 'aktif' : 'pasif'} edildi`)
      loadUsers()
    } catch (error) {
      console.error('Error toggling user status:', error)
      alert('İşlem başarısız')
    }
  }

  const handleUpdateRole = async (id: string, newRole: 'super_admin' | 'admin' | 'viewer') => {
    if (!confirm('Kullanıcı rolünü değiştirmek istediğinizden emin misiniz?')) return

    try {
      const { error } = await supabase
        .from('admin_users')
        .update({ role: newRole })
        .eq('id', id)

      if (error) throw error

      alert('Rol güncellendi')
      loadUsers()
      setEditingUser(null)
    } catch (error) {
      console.error('Error updating role:', error)
      alert('Rol güncellenemedi')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bu admin kullanıcısını silmek istediğinizden emin misiniz? Bu işlem geri alınamaz!')) return

    try {
      const { error } = await supabase
        .from('admin_users')
        .delete()
        .eq('id', id)

      if (error) throw error

      alert('Kullanıcı silindi')
      loadUsers()
    } catch (error) {
      console.error('Error deleting user:', error)
      alert('Kullanıcı silinemedi')
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Hiç giriş yapmadı'
    return new Date(dateString).toLocaleString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const stats = {
    total: users.length,
    active: users.filter(u => u.is_active).length,
    superAdmins: users.filter(u => u.role === 'super_admin').length,
    admins: users.filter(u => u.role === 'admin').length
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="brutalist-card p-6 bg-purple-50">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">👥 Admin Kullanıcı Yönetimi</h1>
              <p className="text-gray-700">
                Admin kullanıcılarını ve rollerini yönetin
              </p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="brutalist-button bg-green-100"
            >
              <Plus className="w-5 h-5 inline mr-2" />
              Yeni Admin Ekle
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="brutalist-card p-6 bg-white">
            <div className="text-3xl font-bold">{stats.total}</div>
            <div className="text-sm text-gray-700">Toplam Kullanıcı</div>
          </div>
          <div className="brutalist-card p-6 bg-green-50">
            <div className="text-3xl font-bold">{stats.active}</div>
            <div className="text-sm text-gray-700">Aktif</div>
          </div>
          <div className="brutalist-card p-6 bg-red-50">
            <div className="text-3xl font-bold">{stats.superAdmins}</div>
            <div className="text-sm text-gray-700">Süper Admin</div>
          </div>
          <div className="brutalist-card p-6 bg-blue-50">
            <div className="text-3xl font-bold">{stats.admins}</div>
            <div className="text-sm text-gray-700">Admin</div>
          </div>
        </div>

        {/* Users List */}
        <div className="brutalist-card p-6 bg-white">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-pulse">
                <p className="font-bold">Yükleniyor...</p>
              </div>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">👤</div>
              <p className="font-bold">Admin kullanıcı bulunamadı</p>
            </div>
          ) : (
            <div className="space-y-3">
              {users.map((user) => {
                const roleConfig = ROLES[user.role]

                return (
                  <div
                    key={user.id}
                    className={`border-4 border-black p-4 ${!user.is_active ? 'opacity-50' : ''}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="text-4xl">{roleConfig.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="font-bold text-xl">{user.full_name}</div>
                            {!user.is_active && (
                              <span className="px-2 py-1 bg-red-100 border-2 border-red-600 text-red-800 text-xs font-bold">
                                PASİF
                              </span>
                            )}
                          </div>
                          
                          <div className="text-sm text-gray-700 space-y-1">
                            <div>
                              <strong>E-posta:</strong> {user.email}
                            </div>
                            <div>
                              <span className={`px-3 py-1 border-2 text-sm font-bold ${roleConfig.color}`}>
                                {roleConfig.label}
                              </span>
                            </div>
                            <div>
                              <strong>Son Giriş:</strong> {formatDate(user.last_login_at)}
                            </div>
                            <div className="text-xs text-gray-500">
                              Oluşturulma: {formatDate(user.created_at)}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingUser(user)}
                          className="p-2 border-2 border-black hover:bg-blue-100"
                          title="Düzenle"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleToggleActive(user.id, user.is_active)}
                          className={`p-2 border-2 border-black ${user.is_active ? 'hover:bg-red-100' : 'hover:bg-green-100'}`}
                          title={user.is_active ? 'Pasif Et' : 'Aktif Et'}
                        >
                          {user.is_active ? <UserX className="w-5 h-5" /> : <UserCheck className="w-5 h-5" />}
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="p-2 border-2 border-black hover:bg-red-100"
                          title="Sil"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Edit Modal */}
        {editingUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="brutalist-card bg-white p-6 max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">Rol Düzenle</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="font-bold">Kullanıcı:</label>
                  <p>{editingUser.full_name} ({editingUser.email})</p>
                </div>
                
                <div>
                  <label className="font-bold block mb-2">Yeni Rol:</label>
                  <div className="space-y-2">
                    {Object.entries(ROLES).map(([key, config]) => (
                      <button
                        key={key}
                        onClick={() => handleUpdateRole(editingUser.id, key as 'super_admin' | 'admin' | 'viewer')}
                        className={`w-full p-3 border-4 border-black text-left font-bold ${config.color}`}
                      >
                        {config.icon} {config.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setEditingUser(null)}
                className="brutalist-button bg-gray-100 w-full mt-6"
              >
                İptal
              </button>
            </div>
          </div>
        )}

        {/* Add Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="brutalist-card bg-white p-6 max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">Yeni Admin Ekle</h2>
              
              <div className="bg-yellow-50 border-4 border-yellow-600 p-4 mb-4">
                <p className="font-bold text-sm">
                  ⚠️ Not: Admin kullanıcılar önce Supabase Auth'da oluşturulmalıdır.
                  Bu form mevcut bir kullanıcıyı admin olarak işaretler.
                </p>
              </div>
              
              <div className="space-y-4">
                <p className="text-sm text-gray-700">
                  Yeni admin eklemek için:
                </p>
                <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1">
                  <li>Supabase Dashboard → Authentication → Users</li>
                  <li>Kullanıcıyı oluşturun veya seçin</li>
                  <li>User ID'yi kopyalayın</li>
                  <li>SQL Editor'de şu komutu çalıştırın:</li>
                </ol>
                
                <code className="block p-3 bg-gray-100 border-2 border-gray-300 text-xs">
                  SELECT create_admin_user(<br/>
                  &nbsp;&nbsp;'USER_ID',<br/>
                  &nbsp;&nbsp;'Full Name',<br/>
                  &nbsp;&nbsp;'email@example.com',<br/>
                  &nbsp;&nbsp;'admin'::admin_role<br/>
                  );
                </code>
              </div>
              
              <button
                onClick={() => setShowAddForm(false)}
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
