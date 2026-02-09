import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import type { InsertDto } from '@/lib/supabase/client'
import { generateIdempotencyKey } from '@/lib/utils/format'

type ApplicationInsert = InsertDto<'applications'>
type DocumentInsert = InsertDto<'application_documents'>

export function useApplication() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const submitApplication = async (
    applicationData: Omit<ApplicationInsert, 'idempotency_key' | 'status'>
  ) => {
    setLoading(true)
    setError(null)

    try {
      // Generate idempotency key to prevent duplicate submissions
      const idempotencyKey = generateIdempotencyKey()

      // Insert application
      const { data: application, error: appError } = await supabase
        .from('applications')
        .insert({
          ...applicationData,
          idempotency_key: idempotencyKey,
          status: 'pending',
        })
        .select()
        .single()

      if (appError) {
        // Check if it's a duplicate submission error
        if (appError.code === '23505') {
          throw new Error('Bu başvuru zaten gönderilmiş. Lütfen daha sonra tekrar deneyiniz.')
        }
        throw appError
      }

      return application
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Başvuru gönderilemedi')
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const uploadDocument = async (
    applicationId: string,
    file: File,
    documentType: DocumentInsert['document_type']
  ) => {
    setLoading(true)
    setError(null)

    try {
      // Upload file to storage
      const fileExt = file.name.split('.').pop()
      const fileName = `${applicationId}/${Date.now()}.${fileExt}`
      
      const { error: uploadError } = await supabase.storage
        .from('application-documents')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (uploadError) throw uploadError

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('application-documents')
        .getPublicUrl(fileName)

      // Insert document record
      const { data: document, error: docError } = await supabase
        .from('application_documents')
        .insert({
          application_id: applicationId,
          document_type: documentType,
          file_name: file.name,
          file_path: fileName,
          file_size: file.size,
          mime_type: file.type,
        })
        .select()
        .single()

      if (docError) throw docError

      return { document, publicUrl }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Belge yüklenemedi')
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const getApplication = async (applicationId: string) => {
    setLoading(true)
    setError(null)

    try {
      const { data, error: fetchError } = await supabase
        .from('applications')
        .select(`
          *,
          application_documents (*)
        `)
        .eq('id', applicationId)
        .single()

      if (fetchError) throw fetchError

      return data
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Başvuru bilgileri alınamadı')
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    submitApplication,
    uploadDocument,
    getApplication,
  }
}
