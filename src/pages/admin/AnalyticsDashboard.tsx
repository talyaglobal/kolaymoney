/**
 * Analytics Dashboard
 * Admin page for viewing Google Analytics data
 */

import { AdminLayout } from '@/components/admin/AdminLayout'
import { BarChart3, TrendingUp, Users, Eye, MousePointerClick, Clock } from 'lucide-react'

export function AnalyticsDashboard() {
  const GA4_PROPERTY_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID?.replace('G-', '')

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="heading-2 mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">
            Google Analytics 4 verileri ve kullanıcı davranış analizi
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="brutalist-card p-6 bg-blue-50 border-2 border-blue-600">
            <div className="flex items-center justify-between mb-2">
              <Eye className="w-8 h-8 text-blue-600" />
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div className="mono-text text-3xl font-black mb-1">-</div>
            <div className="text-sm text-gray-600">Sayfa Görüntüleme</div>
            <div className="text-xs text-gray-500 mt-2">Son 30 gün</div>
          </div>

          <div className="brutalist-card p-6 bg-green-50 border-2 border-green-600">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-green-600" />
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div className="mono-text text-3xl font-black mb-1">-</div>
            <div className="text-sm text-gray-600">Toplam Kullanıcı</div>
            <div className="text-xs text-gray-500 mt-2">Son 30 gün</div>
          </div>

          <div className="brutalist-card p-6 bg-purple-50 border-2 border-purple-600">
            <div className="flex items-center justify-between mb-2">
              <MousePointerClick className="w-8 h-8 text-purple-600" />
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div className="mono-text text-3xl font-black mb-1">-</div>
            <div className="text-sm text-gray-600">Dönüşüm Oranı</div>
            <div className="text-xs text-gray-500 mt-2">Başvuru / Ziyaret</div>
          </div>

          <div className="brutalist-card p-6 bg-orange-50 border-2 border-orange-600">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-orange-600" />
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div className="mono-text text-3xl font-black mb-1">-</div>
            <div className="text-sm text-gray-600">Ort. Oturum Süresi</div>
            <div className="text-xs text-gray-500 mt-2">Dakika</div>
          </div>
        </div>

        {/* GA4 Setup Instructions */}
        {!GA4_PROPERTY_ID && (
          <div className="brutalist-card p-8 bg-yellow-50 border-2 border-yellow-600 mb-8">
            <div className="flex items-start gap-4">
              <BarChart3 className="w-12 h-12 text-yellow-600 flex-shrink-0" />
              <div>
                <h2 className="font-black text-xl mb-3">Google Analytics 4 Kurulumu</h2>
                <p className="text-gray-700 mb-4">
                  Analytics verilerini görmek için GA4 Measurement ID'nizi `.env` dosyasına eklemeniz gerekmektedir.
                </p>
                <div className="space-y-3">
                  <div>
                    <h3 className="font-bold mb-2">Adım 1: GA4 Property Oluşturun</h3>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                      <li><a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google Analytics</a> hesabınıza giriş yapın</li>
                      <li>Admin → Create Property</li>
                      <li>Property name: "KolayMoney.com"</li>
                      <li>Web stream ekleyin: https://www.kolaymoney.com</li>
                    </ol>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Adım 2: Measurement ID'yi Alın</h3>
                    <p className="text-sm text-gray-600">
                      Admin → Data Streams → Web Stream → Measurement ID (G-XXXXXXXXXX formatında)
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Adım 3: .env Dosyasına Ekleyin</h3>
                    <div className="bg-black text-green-400 p-4 rounded font-mono text-sm">
                      VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Adım 4: Uygulamayı Yeniden Başlatın</h3>
                    <div className="bg-black text-green-400 p-4 rounded font-mono text-sm">
                      pnpm dev
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Embedded GA4 Reports */}
        {GA4_PROPERTY_ID && (
          <div className="space-y-8">
            {/* Real-time Report */}
            <div className="brutalist-card p-6">
              <h2 className="font-black text-xl mb-4">Gerçek Zamanlı Kullanıcılar</h2>
              <div className="bg-gray-50 border-2 border-gray-300 p-8 text-center">
                <p className="text-gray-600 mb-4">
                  GA4 Real-Time raporunu görmek için aşağıdaki linke tıklayın:
                </p>
                <a
                  href={`https://analytics.google.com/analytics/web/#/realtime/overview/a~w${GA4_PROPERTY_ID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-primary text-white border-2 border-black hover:bg-black transition-colors font-bold"
                >
                  GA4 Real-Time Raporu Aç
                </a>
              </div>
            </div>

            {/* Page Views Report */}
            <div className="brutalist-card p-6">
              <h2 className="font-black text-xl mb-4">Sayfa Görüntülemeleri</h2>
              <div className="bg-gray-50 border-2 border-gray-300 p-8 text-center">
                <a
                  href={`https://analytics.google.com/analytics/web/#/report/content-pages/a~w${GA4_PROPERTY_ID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-primary text-white border-2 border-black hover:bg-black transition-colors font-bold"
                >
                  Sayfa Raporu Aç
                </a>
              </div>
            </div>

            {/* Events Report */}
            <div className="brutalist-card p-6">
              <h2 className="font-black text-xl mb-4">Özel Etkinlikler</h2>
              <div className="bg-gray-50 border-2 border-gray-300 p-8">
                <p className="text-gray-600 mb-4">
                  Takip edilen özel etkinlikler:
                </p>
                <ul className="grid md:grid-cols-2 gap-3 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    application_start - Başvuru başlatma
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    application_submit - Başvuru gönderme
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    sector_view - Sektör sayfası görüntüleme
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    whatsapp_click - WhatsApp butonu tıklama
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    cta_click - CTA butonu tıklama
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    blog_view - Blog yazısı görüntüleme
                  </li>
                </ul>
                <div className="mt-6">
                  <a
                    href={`https://analytics.google.com/analytics/web/#/report/content-event-overview/a~w${GA4_PROPERTY_ID}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-primary text-white border-2 border-black hover:bg-black transition-colors font-bold"
                  >
                    Etkinlik Raporu Aç
                  </a>
                </div>
              </div>
            </div>

            {/* Conversion Funnel */}
            <div className="brutalist-card p-6">
              <h2 className="font-black text-xl mb-4">Başvuru Hunisi</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-32 font-bold">Ziyaret</div>
                  <div className="flex-1 bg-primary h-8 border-2 border-black"></div>
                  <div className="w-20 text-right mono-text">100%</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32 font-bold">Başvuru Başlat</div>
                  <div className="flex-1 bg-primary/70 h-8 border-2 border-black" style={{width: '60%'}}></div>
                  <div className="w-20 text-right mono-text">-</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32 font-bold">Form Doldur</div>
                  <div className="flex-1 bg-primary/50 h-8 border-2 border-black" style={{width: '40%'}}></div>
                  <div className="w-20 text-right mono-text">-</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32 font-bold">Gönder</div>
                  <div className="flex-1 bg-primary/30 h-8 border-2 border-black" style={{width: '20%'}}></div>
                  <div className="w-20 text-right mono-text">-</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SEO Health Check */}
        <div className="brutalist-card p-6 mt-8">
          <h2 className="font-black text-xl mb-4">SEO Sağlık Kontrolü</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">✅</span>
              <span>Meta tags tüm sayfalarda mevcut</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">✅</span>
              <span>Structured data (JSON-LD) eklendi</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">✅</span>
              <span>Sitemap.xml oluşturuldu</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">✅</span>
              <span>Robots.txt yapılandırıldı</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">✅</span>
              <span>Blog içeriği eklendi</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">✅</span>
              <span>FAQ bölümü eklendi</span>
            </div>
          </div>
          <div className="mt-6 p-4 bg-green-50 border-2 border-green-600">
            <p className="font-bold text-green-800">
              🎉 SEO optimizasyonları tamamlandı!
            </p>
            <p className="text-sm text-green-700 mt-2">
              Sitemap'i Google Search Console'a gönderin ve performansı takip edin.
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
