/**
 * Question Manager - Admin CRUD for sector questions
 */

import { useState, useEffect } from 'react'
import { SectorQuestion } from '@/types/compliance'
import { supabase } from '@/lib/supabase/compliance'

const SECTORS = [
  { value: 'beyaz-esya', label: 'Beyaz Eşya' },
  { value: 'elektronik', label: 'Elektronik' },
  { value: 'mobilya', label: 'Mobilya' },
  { value: 'otomotiv-b2c', label: 'Otomotiv B2C' },
  { value: 'fmcg', label: 'FMCG' },
  { value: 'insaat', label: 'İnşaat' },
  { value: 'otomotiv-b2b', label: 'Otomotiv B2B' },
  { value: 'makine-ekipman', label: 'Makine & Ekipman' },
  { value: 'lojistik', label: 'Lojistik' },
  { value: 'tarim', label: 'Tarım' }
]

export function QuestionManager() {
  const [selectedSector, setSelectedSector] = useState('beyaz-esya')
  const [questions, setQuestions] = useState<SectorQuestion[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadQuestions()
  }, [selectedSector])

  const loadQuestions = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('sector_questions')
        .select('*')
        .eq('sector_slug', selectedSector)
        .order('order_index', { ascending: true })

      if (error) throw error

      const mapped = (data || []).map((q: any) => ({
        id: q.id,
        sectorSlug: q.sector_slug,
        questionText: q.question_text,
        questionType: q.question_type,
        options: q.options,
        weight: q.weight,
        category: q.category,
        isRequired: q.is_required,
        orderIndex: q.order_index,
        isActive: q.is_active,
        helpText: q.help_text,
        placeholder: q.placeholder,
        validationRules: q.validation_rules
      }))

      setQuestions(mapped)
    } catch (error) {
      console.error('Error loading questions:', error)
      alert('Sorular yüklenemedi')
    } finally {
      setLoading(false)
    }
  }

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    try {
      const { error } = await supabase
        .from('sector_questions')
        .update({ is_active: !currentActive })
        .eq('id', id)

      if (error) throw error

      await loadQuestions()
    } catch (error) {
      console.error('Error toggling active:', error)
      alert('Güncelleme başarısız')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bu soruyu silmek istediğinize emin misiniz?')) return

    try {
      const { error } = await supabase
        .from('sector_questions')
        .delete()
        .eq('id', id)

      if (error) throw error

      await loadQuestions()
    } catch (error) {
      console.error('Error deleting question:', error)
      alert('Silme başarısız')
    }
  }

  const getCategoryIcon = (category: string) => {
    const icons = {
      financial: '💰',
      operational: '⚙️',
      legal: '⚖️',
      experience: '📊'
    }
    return icons[category as keyof typeof icons] || '❓'
  }

  const getTypeLabel = (type: string) => {
    const labels = {
      single_choice: 'Tek Seçim',
      multiple_choice: 'Çoklu Seçim',
      yes_no: 'Evet/Hayır',
      number: 'Sayı',
      text: 'Metin'
    }
    return labels[type as keyof typeof labels] || type
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Soru Yönetimi</h1>
          <p className="text-gray-600">Sektörel uygunluk sorularını düzenleyin</p>
        </div>

        {/* Sector Tabs */}
        <div className="brutalist-card p-4 bg-white mb-6">
          <div className="flex flex-wrap gap-2">
            {SECTORS.map(sector => (
              <button
                key={sector.value}
                onClick={() => setSelectedSector(sector.value)}
                className={`
                  px-4 py-2 border-4 font-bold transition-all
                  ${selectedSector === sector.value
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-black border-gray-300 hover:border-black'
                  }
                `}
              >
                {sector.label}
              </button>
            ))}
          </div>
        </div>

        {/* Questions List */}
        <div className="brutalist-card p-6 bg-white">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              {SECTORS.find(s => s.value === selectedSector)?.label} - Sorular ({questions.length})
            </h2>
            <button
              onClick={loadQuestions}
              className="brutalist-btn bg-blue-600 text-white"
            >
              🔄 Yenile
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">Yükleniyor...</div>
          ) : questions.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              Bu sektör için henüz soru eklenmemiş
            </div>
          ) : (
            <div className="space-y-4">
              {questions.map((question, index) => (
                <div
                  key={question.id}
                  className={`
                    brutalist-card p-4 transition-all
                    ${question.isActive ? 'bg-white' : 'bg-gray-100 opacity-60'}
                  `}
                >
                  <div className="flex items-start gap-4">
                    {/* Order */}
                    <div className="text-2xl font-bold text-gray-400 w-12">
                      {index + 1}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">{getCategoryIcon(question.category)}</span>
                            <span className="px-2 py-1 bg-gray-200 border-2 border-black text-xs font-bold">
                              {getTypeLabel(question.questionType)}
                            </span>
                            <span className="px-2 py-1 bg-blue-100 border-2 border-blue-600 text-xs font-bold">
                              Ağırlık: {question.weight}/10
                            </span>
                            {question.isRequired && (
                              <span className="px-2 py-1 bg-red-100 border-2 border-red-600 text-xs font-bold">
                                ZORUNLU
                              </span>
                            )}
                          </div>
                          <div className="font-bold text-lg mb-2">
                            {question.questionText}
                          </div>
                          {question.helpText && (
                            <div className="text-sm text-gray-600 mb-2">
                              💡 {question.helpText}
                            </div>
                          )}
                          {question.options && question.options.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {question.options.map((opt: any) => (
                                <div key={opt.id} className="text-sm">
                                  <span className="font-mono bg-gray-100 px-2 py-1 border border-gray-300">
                                    {opt.label}
                                  </span>
                                  <span className="ml-2 text-gray-600">
                                    ({opt.score} puan)
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleToggleActive(question.id, question.isActive)}
                            className={`
                              px-3 py-1 border-2 border-black font-bold text-sm
                              ${question.isActive ? 'bg-green-500 text-white' : 'bg-gray-300'}
                            `}
                          >
                            {question.isActive ? '✓ Aktif' : '✗ Pasif'}
                          </button>
                          <button
                            onClick={() => handleDelete(question.id)}
                            className="px-3 py-1 bg-red-500 text-white border-2 border-black font-bold text-sm"
                          >
                            🗑 Sil
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="brutalist-card p-6 bg-blue-50 mt-6">
          <h3 className="font-bold text-lg mb-3">💡 Bilgi</h3>
          <ul className="text-sm space-y-2">
            <li>• Sorular frontend'de tanımlıdır ve veritabanına seed edilmelidir</li>
            <li>• Bu sayfadan sadece aktif/pasif durumu ve silme işlemi yapılabilir</li>
            <li>• Yeni soru eklemek veya düzenlemek için kod değişikliği gerekir</li>
            <li>• Minimum %60 puan eşiği sistem genelinde geçerlidir</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
