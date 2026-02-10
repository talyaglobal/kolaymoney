/**
 * Statistics Dashboard - Application statistics and metrics
 * Uses application_statistics view for aggregated data
 */

import { useState, useEffect } from 'react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { supabase } from '@/lib/supabase/client'
import { TrendingUp, TrendingDown, DollarSign, FileText, CheckCircle, XCircle } from 'lucide-react'

interface ApplicationStatistic {
  month: string | null
  total_applications: number | null
  pending_count: number | null
  under_review_count: number | null
  approved_count: number | null
  rejected_count: number | null
  issued_count: number | null
  total_financing_amount: number | null
  approved_financing_amount: number | null
  issued_financing_amount: number | null
  unique_sectors: number | null
}

export function StatisticsDashboard() {
  const [statistics, setStatistics] = useState<ApplicationStatistic[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState<'3months' | '6months' | '12months' | 'all'>('6months')

  useEffect(() => {
    loadStatistics()
  }, [selectedPeriod])

  const loadStatistics = async () => {
    setLoading(true)
    try {
      let query = supabase
        .from('application_statistics')
        .select('*')
        .order('month', { ascending: false })

      // Filter by period
      if (selectedPeriod !== 'all') {
        const months = selectedPeriod === '3months' ? 3 : selectedPeriod === '6months' ? 6 : 12
        const cutoffDate = new Date()
        cutoffDate.setMonth(cutoffDate.getMonth() - months)
        query = query.gte('month', cutoffDate.toISOString())
      }

      const { data, error } = await query.limit(12)

      if (error) throw error

      setStatistics(data || [])
    } catch (error) {
      console.error('Error loading statistics:', error)
      alert('İstatistikler yüklenemedi')
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatMonth = (monthString: string) => {
    return new Date(monthString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long'
    })
  }

  // Calculate totals
  const totals = statistics.reduce((acc, stat) => ({
    applications: acc.applications + (stat.total_applications || 0),
    approved: acc.approved + (stat.approved_count || 0),
    rejected: acc.rejected + (stat.rejected_count || 0),
    totalAmount: acc.totalAmount + (stat.total_financing_amount || 0),
    approvedAmount: acc.approvedAmount + (stat.approved_financing_amount || 0),
    issuedAmount: acc.issuedAmount + (stat.issued_financing_amount || 0)
  }), {
    applications: 0,
    approved: 0,
    rejected: 0,
    totalAmount: 0,
    approvedAmount: 0,
    issuedAmount: 0
  })

  const approvalRate = totals.applications > 0 
    ? ((totals.approved / totals.applications) * 100).toFixed(1) 
    : '0'

  const avgApplicationAmount = totals.applications > 0
    ? totals.totalAmount / totals.applications
    : 0

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="brutalist-card p-6 bg-blue-50">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">📊 İstatistikler</h1>
              <p className="text-gray-700">
                Başvuru ve finansman istatistiklerini görüntüleyin
              </p>
            </div>
            <div>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value as any)}
                className="p-3 border-4 border-black font-bold"
              >
                <option value="3months">Son 3 Ay</option>
                <option value="6months">Son 6 Ay</option>
                <option value="12months">Son 12 Ay</option>
                <option value="all">Tüm Zamanlar</option>
              </select>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="brutalist-card p-6 bg-white">
            <div className="flex items-center justify-between mb-2">
              <FileText className="w-8 h-8 text-blue-600" />
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-3xl font-bold">{totals.applications}</div>
            <div className="text-sm text-gray-700">Toplam Başvuru</div>
          </div>

          <div className="brutalist-card p-6 bg-green-50">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold">{approvalRate}%</span>
            </div>
            <div className="text-3xl font-bold">{totals.approved}</div>
            <div className="text-sm text-gray-700">Onaylanan</div>
          </div>

          <div className="brutalist-card p-6 bg-red-50">
            <div className="flex items-center justify-between mb-2">
              <XCircle className="w-8 h-8 text-red-600" />
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
            <div className="text-3xl font-bold">{totals.rejected}</div>
            <div className="text-sm text-gray-700">Reddedilen</div>
          </div>

          <div className="brutalist-card p-6 bg-purple-50">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8 text-purple-600" />
            </div>
            <div className="text-2xl font-bold">{formatCurrency(avgApplicationAmount)}</div>
            <div className="text-sm text-gray-700">Ort. Başvuru Tutarı</div>
          </div>
        </div>

        {/* Financial Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="brutalist-card p-6 bg-blue-50">
            <div className="text-sm text-gray-700 mb-1">Toplam Talep Edilen</div>
            <div className="text-2xl font-bold">{formatCurrency(totals.totalAmount)}</div>
          </div>

          <div className="brutalist-card p-6 bg-green-50">
            <div className="text-sm text-gray-700 mb-1">Onaylanan Tutar</div>
            <div className="text-2xl font-bold">{formatCurrency(totals.approvedAmount)}</div>
          </div>

          <div className="brutalist-card p-6 bg-purple-50">
            <div className="text-sm text-gray-700 mb-1">İhraç Edilen</div>
            <div className="text-2xl font-bold">{formatCurrency(totals.issuedAmount)}</div>
          </div>
        </div>

        {/* Monthly Breakdown */}
        <div className="brutalist-card p-6 bg-white">
          <h2 className="text-2xl font-bold mb-4">Aylık Dağılım</h2>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-pulse">
                <p className="font-bold">Yükleniyor...</p>
              </div>
            </div>
          ) : statistics.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📊</div>
              <p className="font-bold">İstatistik bulunamadı</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-4 border-black">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border-4 border-black p-3 text-left font-bold">Ay</th>
                    <th className="border-4 border-black p-3 text-right font-bold">Başvuru</th>
                    <th className="border-4 border-black p-3 text-right font-bold">Onaylanan</th>
                    <th className="border-4 border-black p-3 text-right font-bold">Reddedilen</th>
                    <th className="border-4 border-black p-3 text-right font-bold">İhraç</th>
                    <th className="border-4 border-black p-3 text-right font-bold">Toplam Tutar</th>
                    <th className="border-4 border-black p-3 text-right font-bold">Onay %</th>
                  </tr>
                </thead>
                <tbody>
                  {statistics.map((stat, index) => {
                    const monthApprovalRate = (stat.total_applications || 0) > 0
                      ? (((stat.approved_count || 0) / (stat.total_applications || 1)) * 100).toFixed(1)
                      : '0'

                    return (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border-4 border-black p-3 font-bold">
                          {stat.month ? formatMonth(stat.month) : '-'}
                        </td>
                        <td className="border-4 border-black p-3 text-right">
                          {stat.total_applications || 0}
                        </td>
                        <td className="border-4 border-black p-3 text-right text-green-600 font-bold">
                          {stat.approved_count || 0}
                        </td>
                        <td className="border-4 border-black p-3 text-right text-red-600 font-bold">
                          {stat.rejected_count || 0}
                        </td>
                        <td className="border-4 border-black p-3 text-right text-purple-600 font-bold">
                          {stat.issued_count || 0}
                        </td>
                        <td className="border-4 border-black p-3 text-right">
                          {formatCurrency(stat.total_financing_amount || 0)}
                        </td>
                        <td className="border-4 border-black p-3 text-right font-bold">
                          {monthApprovalRate}%
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
                <tfoot>
                  <tr className="bg-blue-50 font-bold">
                    <td className="border-4 border-black p-3">TOPLAM</td>
                    <td className="border-4 border-black p-3 text-right">{totals.applications}</td>
                    <td className="border-4 border-black p-3 text-right text-green-600">{totals.approved}</td>
                    <td className="border-4 border-black p-3 text-right text-red-600">{totals.rejected}</td>
                    <td className="border-4 border-black p-3 text-right text-purple-600">
                      {statistics.reduce((sum, s) => sum + (s.issued_count || 0), 0)}
                    </td>
                    <td className="border-4 border-black p-3 text-right">{formatCurrency(totals.totalAmount)}</td>
                    <td className="border-4 border-black p-3 text-right">{approvalRate}%</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>

        {/* Sector Distribution */}
        {statistics.length > 0 && (
          <div className="brutalist-card p-6 bg-white">
            <h2 className="text-2xl font-bold mb-4">Sektör Çeşitliliği</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-6 bg-purple-50 border-4 border-black">
                <div className="text-4xl font-bold">
                  {Math.max(...statistics.map(s => s.unique_sectors || 0))}
                </div>
                <div className="text-sm text-gray-700 mt-2">Maksimum Sektör Sayısı</div>
              </div>
              <div className="text-center p-6 bg-blue-50 border-4 border-black">
                <div className="text-4xl font-bold">
                  {(statistics.reduce((sum, s) => sum + (s.unique_sectors || 0), 0) / statistics.length).toFixed(1)}
                </div>
                <div className="text-sm text-gray-700 mt-2">Ortalama Sektör/Ay</div>
              </div>
              <div className="text-center p-6 bg-green-50 border-4 border-black">
                <div className="text-4xl font-bold">
                  {statistics.filter(s => (s.unique_sectors || 0) > 0).length}
                </div>
                <div className="text-sm text-gray-700 mt-2">Aktif Aylar</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
