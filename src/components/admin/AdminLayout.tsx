import { ReactNode } from 'react'
import { Link, useLocation } from 'wouter'
import { useAuthContext } from '@/contexts/AuthContext'
import { getInitials } from '@/lib/utils/format'

interface AdminLayoutProps {
  children: ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [location] = useLocation()
  const { adminUser, signOut } = useAuthContext()

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: '📊' },
    { name: 'Başvurular', href: '/admin/applications', icon: '📝' },
    { name: 'Compliance', href: '/admin/compliance-applications', icon: '✓' },
    { name: 'Sorular', href: '/admin/question-manager', icon: '❓' },
    { name: 'Finansal Veri', href: '/admin/financial-data', icon: '💰' },
    { name: 'Analitik', href: '/admin/analytics', icon: '📈' },
    { name: 'İstatistikler', href: '/admin/statistics', icon: '📊' },
    { name: 'Aktivite Log', href: '/admin/activity-log', icon: '📋' },
    { name: 'Belgeler', href: '/admin/documents', icon: '📁' },
    { name: 'Bildirimler', href: '/admin/notifications', icon: '🔔' },
    { name: 'Kullanıcılar', href: '/admin/users', icon: '👥' },
  ]

  const handleSignOut = async () => {
    try {
      await signOut()
      window.location.href = '/admin/login'
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Brutalist Style */}
      <header className="border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/admin">
              <a className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#0047FF] border-2 border-black" />
                <span className="mono-text font-bold text-lg">KolayMoney Admin</span>
              </a>
            </Link>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="mono-text font-medium text-sm">{adminUser?.full_name}</p>
                <p className="mono-text text-xs text-gray-600">{adminUser?.role}</p>
              </div>
              
              <div className="w-10 h-10 bg-[#0047FF] border-2 border-black flex items-center justify-center">
                <span className="mono-text text-white font-bold text-sm">
                  {adminUser?.full_name ? getInitials(adminUser.full_name) : 'AD'}
                </span>
              </div>

              <button
                onClick={handleSignOut}
                className="px-4 py-2 border-2 border-black bg-white hover:bg-black hover:text-white transition-colors mono-text text-sm"
              >
                Çıkış
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation - Clean Modern Design */}
        <aside className="w-64 min-h-[calc(100vh-4rem)] bg-gray-50 border-r border-gray-200">
          <nav className="p-4 space-y-1">
            {navigation.map((item) => {
              const isActive = location === item.href
              return (
                <Link key={item.href} href={item.href}>
                  <a
                    className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all mono-text text-sm ${
                      isActive
                        ? 'bg-[#0047FF] text-white shadow-sm'
                        : 'text-gray-700 hover:bg-white hover:text-gray-900 hover:shadow-sm'
                    }`}
                  >
                    <span className="text-base">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </a>
                </Link>
              )
            })}
            
            {/* Divider */}
            <div className="my-6 border-t border-gray-200"></div>
            
            {/* Quick Actions */}
            <div className="space-y-1">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Hızlı Erişim
              </div>
              <Link href="/">
                <a className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-white hover:text-gray-900 rounded-lg transition-all">
                  <span>🏠</span>
                  <span className="font-medium">Ana Sayfa</span>
                </a>
              </Link>
              <Link href="/basvuru-yeni">
                <a className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-white hover:text-gray-900 rounded-lg transition-all">
                  <span>➕</span>
                  <span className="font-medium">Yeni Başvuru</span>
                </a>
              </Link>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
