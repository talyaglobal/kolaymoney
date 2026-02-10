/**
 * Document Manager - Manage application documents
 * View, download, and manage uploaded documents
 */

import { useState, useEffect } from 'react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { supabase } from '@/lib/supabase/client'
import { Download, Trash2 } from 'lucide-react'

interface ApplicationDocument {
  id: string
  application_id: string
  document_type: string
  file_name: string
  file_path: string
  file_size: number
  mime_type: string
  uploaded_at: string
  applications?: {
    company_name: string
    sector: string
  }
}

const DOCUMENT_TYPES = {
  financial_statement: 'Mali Tablo',
  tax_certificate: 'Vergi Levhası',
  trade_registry: 'Ticaret Sicil',
  receivables_list: 'Alacak Listesi',
  other: 'Diğer'
}

export function DocumentManager() {
  const [documents, setDocuments] = useState<ApplicationDocument[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState({
    document_type: '',
    search: ''
  })

  useEffect(() => {
    loadDocuments()
  }, [filter])

  const loadDocuments = async () => {
    setLoading(true)
    try {
      let query = supabase
        .from('application_documents')
        .select(`
          *,
          applications (
            company_name,
            sector
          )
        `)
        .order('uploaded_at', { ascending: false })

      if (filter.document_type) {
        query = query.eq('document_type', filter.document_type as any)
      }

      if (filter.search) {
        query = query.ilike('file_name', `%${filter.search}%`)
      }

      const { data, error } = await query

      if (error) throw error

      setDocuments(data || [])
    } catch (error) {
      console.error('Error loading documents:', error)
      alert('Dökümanlar yüklenemedi')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string, filePath: string) => {
    if (!confirm('Bu dökümanı silmek istediğinizden emin misiniz?')) return

    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('application-documents')
        .remove([filePath])

      if (storageError) throw storageError

      // Delete from database
      const { error: dbError } = await supabase
        .from('application_documents')
        .delete()
        .eq('id', id)

      if (dbError) throw dbError

      alert('Döküman silindi')
      loadDocuments()
    } catch (error) {
      console.error('Error deleting document:', error)
      alert('Döküman silinemedi')
    }
  }

  const handleDownload = async (filePath: string, fileName: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('application-documents')
        .download(filePath)

      if (error) throw error

      // Create download link
      const url = URL.createObjectURL(data)
      const a = document.createElement('a')
      a.href = url
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading document:', error)
      alert('Döküman indirilemedi')
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const totalSize = documents.reduce((sum, doc) => sum + doc.file_size, 0)

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="brutalist-card p-6 bg-blue-50">
          <h1 className="text-3xl font-bold mb-2">📁 Döküman Yönetimi</h1>
          <p className="text-gray-700">
            Başvuru dökümanlarını görüntüleyin ve yönetin
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="brutalist-card p-6 bg-white">
            <div className="text-3xl font-bold">{documents.length}</div>
            <div className="text-sm text-gray-700">Toplam Döküman</div>
          </div>
          <div className="brutalist-card p-6 bg-green-50">
            <div className="text-3xl font-bold">{formatFileSize(totalSize)}</div>
            <div className="text-sm text-gray-700">Toplam Boyut</div>
          </div>
          <div className="brutalist-card p-6 bg-purple-50">
            <div className="text-3xl font-bold">
              {documents.filter(d => d.document_type === 'financial_statement').length}
            </div>
            <div className="text-sm text-gray-700">Mali Tablo</div>
          </div>
          <div className="brutalist-card p-6 bg-orange-50">
            <div className="text-3xl font-bold">
              {documents.filter(d => d.document_type === 'tax_certificate').length}
            </div>
            <div className="text-sm text-gray-700">Vergi Levhası</div>
          </div>
        </div>

        {/* Filters */}
        <div className="brutalist-card p-6 bg-white">
          <h2 className="text-xl font-bold mb-4">Filtrele</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold mb-2">Döküman Tipi</label>
              <select
                value={filter.document_type}
                onChange={(e) => setFilter({ ...filter, document_type: e.target.value })}
                className="w-full p-3 border-4 border-black"
              >
                <option value="">Tümü</option>
                {Object.entries(DOCUMENT_TYPES).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-bold mb-2">Dosya Adı</label>
              <input
                type="text"
                value={filter.search}
                onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                placeholder="Dosya adı ara..."
                className="w-full p-3 border-4 border-black"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={() => setFilter({ document_type: '', search: '' })}
                className="brutalist-button bg-gray-100 w-full"
              >
                Filtreleri Temizle
              </button>
            </div>
          </div>
        </div>

        {/* Documents List */}
        <div className="brutalist-card p-6 bg-white">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-pulse">
                <p className="font-bold">Yükleniyor...</p>
              </div>
            </div>
          ) : documents.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📄</div>
              <p className="font-bold">Döküman bulunamadı</p>
            </div>
          ) : (
            <div className="space-y-3">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="border-4 border-black p-4 hover:translate-x-1 hover:translate-y-1 transition-transform"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="text-4xl">
                        {doc.mime_type.includes('pdf') ? '📕' : 
                         doc.mime_type.includes('image') ? '🖼️' : 
                         doc.mime_type.includes('excel') || doc.mime_type.includes('spreadsheet') ? '📊' : 
                         '📄'}
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-lg mb-1">{doc.file_name}</div>
                        <div className="text-sm text-gray-700 space-y-1">
                          <div>
                            <span className="px-2 py-1 bg-blue-100 border-2 border-blue-600 text-blue-800 text-xs font-bold">
                              {DOCUMENT_TYPES[doc.document_type as keyof typeof DOCUMENT_TYPES] || doc.document_type}
                            </span>
                          </div>
                          {doc.applications && (
                            <div>
                              <strong>Şirket:</strong> {doc.applications.company_name}
                            </div>
                          )}
                          <div>
                            <strong>Boyut:</strong> {formatFileSize(doc.file_size)} • 
                            <strong> Tip:</strong> {doc.mime_type}
                          </div>
                          <div className="text-xs text-gray-500">
                            {formatDate(doc.uploaded_at)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDownload(doc.file_path, doc.file_name)}
                        className="p-2 border-2 border-black hover:bg-green-100"
                        title="İndir"
                      >
                        <Download className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(doc.id, doc.file_path)}
                        className="p-2 border-2 border-black hover:bg-red-100"
                        title="Sil"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
