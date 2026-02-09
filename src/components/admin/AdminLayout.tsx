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
    { name: 'İstatistikler', href: '/admin/stats', icon: '📈' },
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
        {/* Sidebar Navigation */}
        <aside className="w-64 min-h-[calc(100vh-4rem)] border-r-2 border-black">
          <nav className="p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = location === item.href
              return (
                <Link key={item.href} href={item.href}>
                  <a
                    className={`flex items-center space-x-3 px-4 py-3 border-2 border-black transition-all mono-text ${
                      isActive
                        ? 'bg-[#0047FF] text-white'
                        : 'bg-white hover:translate-x-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </a>
                </Link>
              )
            })}
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
