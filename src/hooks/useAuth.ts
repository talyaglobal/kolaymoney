import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import type { User, Session } from '@supabase/supabase-js'
import type { Tables } from '@/lib/supabase/client'

type AdminUser = Tables<'admin_users'>

interface AuthState {
  user: User | null
  adminUser: AdminUser | null
  session: Session | null
  loading: boolean
  isAdmin: boolean
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    adminUser: null,
    session: null,
    loading: true,
    isAdmin: false,
  })

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthState(prev => ({
        ...prev,
        session,
        user: session?.user ?? null,
        loading: false,
      }))

      // If user exists, check if they're an admin
      if (session?.user) {
        checkAdminStatus(session.user.id)
      }
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthState(prev => ({
        ...prev,
        session,
        user: session?.user ?? null,
        loading: false,
      }))

      // Check admin status on auth change
      if (session?.user) {
        checkAdminStatus(session.user.id)
      } else {
        setAuthState(prev => ({
          ...prev,
          adminUser: null,
          isAdmin: false,
        }))
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const checkAdminStatus = async (userId: string) => {
    const { data: adminUser } = await supabase
      .from('admin_users')
      .select('*')
      .eq('id', userId)
      .eq('is_active', true)
      .single()

    setAuthState(prev => ({
      ...prev,
      adminUser: adminUser ?? null,
      isAdmin: !!adminUser,
    }))
  }

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
    return data
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (error) throw error
    return data
  }

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (error) throw error
  }

  const updatePassword = async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) throw error
  }

  return {
    ...authState,
    signIn,
    signOut,
    signUp,
    resetPassword,
    updatePassword,
  }
}
