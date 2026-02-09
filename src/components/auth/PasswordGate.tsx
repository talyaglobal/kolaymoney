import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

const CORRECT_PASSWORD = 'talyasmart'
const SESSION_KEY = 'kolaymoney_auth'

interface PasswordGateProps {
  children: React.ReactNode
}

export function PasswordGate({ children }: PasswordGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already authenticated
    const storedAuth = sessionStorage.getItem(SESSION_KEY)
    if (storedAuth === 'true') {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password === CORRECT_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, 'true')
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Yanlış şifre. Lütfen tekrar deneyin.')
      setPassword('')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-primary border-2 border-black mx-auto mb-4"></div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="brutalist-card p-8 bg-white border-2 border-black">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary border-2 border-black mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-black text-3xl">₺</span>
              </div>
              <h1 className="heading-2 mb-2">KolayMoney.com</h1>
              <p className="mono-text text-sm text-gray-600">Alternatif Finansman Platformu</p>
            </div>

            {/* Password Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="password" className="mono-text block mb-2 font-medium">
                  Erişim Şifresi
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-black bg-white mono-text focus:outline-none focus:border-primary transition-colors"
                  placeholder="Şifrenizi girin"
                  autoFocus
                />
                {error && (
                  <p className="text-red-600 text-sm mt-2 mono-text">{error}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-primary text-white border-2 border-black hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all mono-text font-medium py-3"
              >
                Giriş Yap
              </Button>
            </form>

            {/* Info */}
            <div className="mt-6 p-4 bg-gray-50 border-2 border-black">
              <p className="mono-text text-xs text-gray-600 text-center">
                🔒 Bu site şu anda sadece davetli kullanıcılar için erişilebilir.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
