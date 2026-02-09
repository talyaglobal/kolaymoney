import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import type { Tables, UpdateDto } from '@/lib/supabase/client'
import { PAGINATION } from '@/lib/utils/constants'

type Application = Tables<'applications'>
type ApplicationUpdate = UpdateDto<'applications'>

interface UseApplicationsOptions {
  page?: number
  pageSize?: number
  status?: Application['status']
  sector?: Application['sector']
  searchTerm?: string
  autoFetch?: boolean
}

export function useApplications(options: UseApplicationsOptions = {}) {
  const {
    page = 1,
    pageSize = PAGINATION.DEFAULT_PAGE_SIZE,
    status,
    sector,
    searchTerm,
    autoFetch = true,
  } = options

  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [totalCount, setTotalCount] = useState(0)
  const [hasMore, setHasMore] = useState(false)

  const fetchApplications = async () => {
    setLoading(true)
    setError(null)

    try {
      // Build query with pagination (prevent unbounded queries)
      let query = supabase
        .from('applications')
        .select('*', { count: 'exact' })
        .order('submitted_at', { ascending: false })
        .range((page - 1) * pageSize, page * pageSize - 1)

      // Apply filters
      if (status) {
        query = query.eq('status', status)
      }

      if (sector) {
        query = query.eq('sector', sector)
      }

      if (searchTerm) {
        query = query.or(
          `company_name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%,tax_number.ilike.%${searchTerm}%`
        )
      }

      const { data, error: fetchError, count } = await query

      if (fetchError) throw fetchError

      setApplications(data || [])
      setTotalCount(count || 0)
      setHasMore((page * pageSize) < (count || 0))
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Başvurular yüklenemedi')
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  const updateApplication = async (
    applicationId: string,
    updates: ApplicationUpdate
  ) => {
    setLoading(true)
    setError(null)

    try {
      const { data, error: updateError } = await supabase
        .from('applications')
        .update(updates)
        .eq('id', applicationId)
        .select()
        .single()

      if (updateError) throw updateError

      // Update local state
      setApplications(prev =>
        prev.map(app => (app.id === applicationId ? data : app))
      )

      return data
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Başvuru güncellenemedi')
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const deleteApplication = async (applicationId: string) => {
    setLoading(true)
    setError(null)

    try {
      const { error: deleteError } = await supabase
        .from('applications')
        .delete()
        .eq('id', applicationId)

      if (deleteError) throw deleteError

      // Update local state
      setApplications(prev => prev.filter(app => app.id !== applicationId))
      setTotalCount(prev => prev - 1)
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Başvuru silinemedi')
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Real-time subscription for admin dashboard
  const subscribeToApplications = () => {
    const subscription = supabase
      .channel('applications-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'applications',
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setApplications(prev => [payload.new as Application, ...prev])
            setTotalCount(prev => prev + 1)
          } else if (payload.eventType === 'UPDATE') {
            setApplications(prev =>
              prev.map(app =>
                app.id === payload.new.id ? (payload.new as Application) : app
              )
            )
          } else if (payload.eventType === 'DELETE') {
            setApplications(prev =>
              prev.filter(app => app.id !== payload.old.id)
            )
            setTotalCount(prev => prev - 1)
          }
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }

  useEffect(() => {
    if (autoFetch) {
      fetchApplications()
    }
  }, [page, pageSize, status, sector, searchTerm, autoFetch])

  return {
    applications,
    loading,
    error,
    totalCount,
    hasMore,
    fetchApplications,
    updateApplication,
    deleteApplication,
    subscribeToApplications,
  }
}
