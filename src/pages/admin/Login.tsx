import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocation } from 'wouter'
import { adminLoginSchema, type AdminLoginData } from '@/lib/validations/application'
import { useAuthContext } from '@/contexts/AuthContext'

export function AdminLogin() {
  const [, setLocation] = useLocation()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { signIn } = useAuthContext()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginData>({
    resolver: zodResolver(adminLoginSchema),
  })

  const onSubmit = async (data: AdminLoginData) => {
    setIsLoading(true)
    setError(null)

    try {
      // Simple admin bypass for development
      if (data.password === 'talyasmart') {
        sessionStorage.setItem('admin_logged_in', 'true')
        setLocation('/admin')
        return
      }
      
      await signIn(data.email, data.password)
      setLocation('/admin')
    } catch (err) {
      setError('Giriş başarısız. E-posta ve şifrenizi kontrol ediniz.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-block w-16 h-16 bg-[#0047FF] border-2 border-black mb-4" />
          <h1 className="heading-2">KolayMoney Admin</h1>
          <p className="mono-text text-gray-600 mt-2">Yönetim Paneli Girişi</p>
        </div>

        {/* Login Form */}
        <div className="brutalist-card p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <div className="p-4 border-2 border-red-600 bg-red-50">
                <p className="mono-text text-red-900 text-sm">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="mono-text block mb-2 font-medium">
                E-posta
              </label>
              <input
                {...register('email')}
                type="email"
                id="email"
                autoComplete="email"
                className="w-full px-4 py-3 border-2 border-black bg-white mono-text focus:outline-none focus:border-[#0047FF] transition-colors"
                placeholder="admin@kolaymoney.com"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1 mono-text">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="mono-text block mb-2 font-medium">
                Şifre
              </label>
              <input
                {...register('password')}
                type="password"
                id="password"
                autoComplete="current-password"
                className="w-full px-4 py-3 border-2 border-black bg-white mono-text focus:outline-none focus:border-[#0047FF] transition-colors"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-red-600 text-sm mt-1 mono-text">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-8 py-4 border-2 border-black bg-[#0047FF] text-white hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all mono-text font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </button>
          </form>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="mono-text text-sm text-gray-600 hover:text-black transition-colors"
          >
            ← Ana Sayfaya Dön
          </a>
        </div>
      </div>
    </div>
  )
}
