import { AdminLayout } from '@/components/admin/AdminLayout'
import { useApplications } from '@/hooks/useApplications'
import { formatCurrency } from '@/lib/utils/format'
import { APPLICATION_STATUSES } from '@/lib/utils/constants'

export function AdminDashboard() {
  const { applications, loading, totalCount } = useApplications({ pageSize: 50 })

  const stats = {
    total: totalCount,
    pending: applications.filter(a => a.status === 'pending').length,
    under_review: applications.filter(a => a.status === 'under_review').length,
    approved: applications.filter(a => a.status === 'approved').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
    issued: applications.filter(a => a.status === 'issued').length,
    total_amount: applications.reduce((sum, a) => sum + Number(a.financing_amount), 0),
    approved_amount: applications
      .filter(a => a.status === 'approved' || a.status === 'issued')
      .reduce((sum, a) => sum + Number(a.financing_amount), 0),
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="heading-2">Dashboard</h1>
          <p className="mono-text text-gray-600 mt-2">Başvuru istatistikleri ve özet bilgiler</p>
        </div>

        {/* Stats Grid */}
        {loading ? (
          <div className="brutalist-card p-8 text-center">
            <p className="mono-text">Yükleniyor...</p>
          </div>
        ) : (
          <>
            {/* Main Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="brutalist-card p-6 bg-[#0047FF] text-white">
                <p className="mono-text text-sm mb-2">Toplam Başvuru</p>
                <p className="heading-1 text-4xl">{stats.total}</p>
              </div>

              <div className="brutalist-card p-6">
                <p className="mono-text text-sm text-gray-600 mb-2">Toplam Talep Edilen</p>
                <p className="mono-text text-2xl font-bold text-[#0047FF]">
                  {formatCurrency(stats.total_amount)}
                </p>
              </div>

              <div className="brutalist-card p-6 bg-green-100">
                <p className="mono-text text-sm text-gray-600 mb-2">Onaylanan Tutar</p>
                <p className="mono-text text-2xl font-bold text-green-900">
                  {formatCurrency(stats.approved_amount)}
                </p>
              </div>
            </div>

            {/* Status Breakdown */}
            <div className="brutalist-card p-8">
              <h2 className="heading-3 mb-6">Durum Dağılımı</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(APPLICATION_STATUSES).map(([key, label]) => {
                  const count = stats[key as keyof typeof stats] as number
                  return (
                    <div key={key} className="border-2 border-black p-4 text-center">
                      <p className="mono-text text-sm text-gray-600 mb-2">{label}</p>
                      <p className="mono-text text-3xl font-bold">{count}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="brutalist-card p-8 bg-blue-50">
              <h2 className="heading-3 mb-6">Hızlı Erişim</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a
                  href="/admin/applications"
                  className="p-6 bg-white border-4 border-black hover:translate-x-1 hover:translate-y-1 transition-transform"
                >
                  <div className="text-3xl mb-3">📋</div>
                  <div className="font-bold text-lg mb-2">Başvurular (Eski)</div>
                  <div className="text-sm text-gray-600">Klasik VDMK başvuruları</div>
                </a>
                <a
                  href="/admin/compliance-applications"
                  className="p-6 bg-green-50 border-4 border-green-600 hover:translate-x-1 hover:translate-y-1 transition-transform"
                >
                  <div className="text-3xl mb-3">✓</div>
                  <div className="font-bold text-lg mb-2">Compliance Başvuruları</div>
                  <div className="text-sm text-gray-600">Puanlı başvuru sistemi</div>
                </a>
                <a
                  href="/admin/question-manager"
                  className="p-6 bg-white border-4 border-black hover:translate-x-1 hover:translate-y-1 transition-transform"
                >
                  <div className="text-3xl mb-3">❓</div>
                  <div className="font-bold text-lg mb-2">Soru Yönetimi</div>
                  <div className="text-sm text-gray-600">Anket sorularını düzenle</div>
                </a>
                <a
                  href="/admin/financial-data"
                  className="p-6 bg-white border-4 border-black hover:translate-x-1 hover:translate-y-1 transition-transform"
                >
                  <div className="text-3xl mb-3">💰</div>
                  <div className="font-bold text-lg mb-2">Finansal Veriler</div>
                  <div className="text-sm text-gray-600">Oranları ve verileri yönet</div>
                </a>
                <a
                  href="/admin/analytics"
                  className="p-6 bg-purple-50 border-4 border-purple-600 hover:translate-x-1 hover:translate-y-1 transition-transform"
                >
                  <div className="text-3xl mb-3">📊</div>
                  <div className="font-bold text-lg mb-2">Analytics & SEO</div>
                  <div className="text-sm text-gray-600">Google Analytics ve SEO metrikleri</div>
                </a>
                <a
                  href="/sektorler"
                  className="p-6 bg-white border-4 border-black hover:translate-x-1 hover:translate-y-1 transition-transform"
                >
                  <div className="text-3xl mb-3">🏢</div>
                  <div className="font-bold text-lg mb-2">Sektör Sayfaları</div>
                  <div className="text-sm text-gray-600">10 sektör, 30 use case</div>
                </a>
                <a
                  href="/basvuru-yeni"
                  className="p-6 bg-blue-50 border-4 border-blue-600 hover:translate-x-1 hover:translate-y-1 transition-transform"
                >
                  <div className="text-3xl mb-3">📝</div>
                  <div className="font-bold text-lg mb-2">Yeni Başvuru</div>
                  <div className="text-sm text-gray-600">Test için başvuru yap</div>
                </a>
              </div>
            </div>

            {/* Recent Applications */}
            <div className="brutalist-card p-8">
              <h2 className="heading-3 mb-6">Son Başvurular</h2>
              <div className="space-y-4">
                {applications.slice(0, 5).map((app) => (
                  <div
                    key={app.id}
                    className="flex justify-between items-center p-4 border-2 border-black hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <p className="mono-text font-medium">{app.company_name}</p>
                      <p className="mono-text text-sm text-gray-600">{app.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="mono-text font-bold text-[#0047FF]">
                        {formatCurrency(Number(app.financing_amount))}
                      </p>
                      <p className="mono-text text-sm text-gray-600">
                        {APPLICATION_STATUSES[app.status]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  )
}
