import { createContext, useContext, ReactNode } from 'react'
import { useAuth } from '@/hooks/useAuth'
import type { User, Session } from '@supabase/supabase-js'
import type { Tables } from '@/lib/supabase/client'

type AdminUser = Tables<'admin_users'>

interface AuthContextType {
  user: User | null
  adminUser: AdminUser | null
  session: Session | null
  loading: boolean
  isAdmin: boolean
  signIn: (email: string, password: string) => Promise<any>
  signOut: () => Promise<void>
  signUp: (email: string, password: string, fullName: string) => Promise<any>
  resetPassword: (email: string) => Promise<void>
  updatePassword: (newPassword: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth()

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}
