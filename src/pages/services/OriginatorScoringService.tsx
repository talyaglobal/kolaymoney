/**
 * Kaynak Sağlayıcı (Originator) Scoring Sistemi Service Page
 * For the entire VDMK market - objective credit scoring for originators
 */

import { useEffect } from 'react'
import { Navigation } from '@/components/layout/Navigation'
import { ServiceHero } from '@/components/services/ServiceHero'
import { ProblemStatement } from '@/components/services/ProblemStatement'
import { ServiceFeatures } from '@/components/services/ServiceFeatures'
import { ServiceProcess } from '@/components/services/ServiceProcess'
import { ServiceCTA } from '@/components/services/ServiceCTA'
import { useSEO } from '@/hooks/useSEO'
import { useAnalytics } from '@/contexts/AnalyticsContext'

export function OriginatorScoringService() {
  const analytics = useAnalytics()

  useSEO({
    title: 'Kaynak Sağlayıcı Scoring Sistemi | KolayMoney',
    description: 'VDMK piyasası için objektif originator kredi skoru. Portföy kalitesi, tahsilat performansı, konsantrasyon analizi. A/B/C/D derecelendirme.',
    keywords: ['originator scoring', 'VDMK kredi skoru', 'kaynak sağlayıcı değerlendirme', 'VDMK risk analizi', 'originator rating'],
    canonical: '/hizmetler/originator-scoring'
  })

  useEffect(() => {
    analytics.trackMenuClick('Hizmetler - Originator Scoring')
  }, [])

  const serviceData = {
    hero: {
      badge: 'TÜM PİYASA İÇİN',
      icon: '📊',
      title: 'Kaynak Sağlayıcı\nScoring Sistemi',
      subtitle: 'VDMK için objektif originator kredi skoru',
      description: 'KolayMoney, VDMK piyasası için standart, objektif, sürekli güncellenen kaynak sağlayıcı (originator) kredi skoru sunar. Portföy kalitesi, tahsilat performansı, konsantrasyon riskleri, SPK uygunluğu tek bir skorla özetlenir.',
      primaryCTA: 'Skorumu Öğren',
      secondaryCTA: 'Metodoloji'
    },

    problem: {
      title: 'VDMK Piyasasında Originator Değerlendirme Sorunu',
      pain_points: [
        {
          icon: '❓',
          title: 'Standart Yok',
          description: 'Her fon kendi kriterlerine göre originator değerlendiriyor. Karşılaştırılabilir, objektif bir skor sistemi yok. Aynı originator bir fonda A, diğerinde C alıyor.'
        },
        {
          icon: '🔍',
          title: 'Görünmeyen Riskler',
          description: 'Borçlu konsantrasyonu, tahsilat performansı, portföy kalitesi manuel analiz edilmeden görülmüyor. Sorunlar ihraç sonrası ortaya çıkıyor.'
        },
        {
          icon: '📉',
          title: 'Geçmiş Performans Takip Edilmiyor',
          description: 'Originator\'ın önceki VDMK ihraçlarındaki tahsilat performansı sistematik kayıt altında değil. Her ihraç sıfırdan değerlendiriliyor.'
        },
        {
          icon: '⏱️',
          title: 'Yavaş Due Diligence',
          description: 'Her fon her originator için sıfırdan analiz yapıyor. Tekrarlanan iş, kaynak israfı, yavaş piyasa.'
        }
      ]
    },

    features: [
      {
        icon: '🎯',
        title: 'Objektif Skorlama',
        description: 'Tüm originatorlar aynı metodoloji ile değerlendirilir. Subjektif değerlendirme yerine veri bazlı, şeffaf skor.'
      },
      {
        icon: '📈',
        title: 'Dinamik Güncelleme',
        description: 'Skor statik değil, canlı. Her yeni ihraç, tahsilat verisi, portföy değişikliği skoru otomatik günceller.'
      },
      {
        icon: '🔢',
        title: 'A/B/C/D Derecelendirme',
        description: 'Basit, anlaşılır sınıflandırma. A: En düşük risk, D: Yüksek risk. Fonlar hızlı karar verebilir.'
      },
      {
        icon: '📊',
        title: 'Detaylı Alt Skorlar',
        description: 'Genel skorun yanında: Portföy kalitesi, tahsilat performansı, konsantrasyon, SPK uygunluğu alt skorları.'
      },
      {
        icon: '💰',
        title: 'Maksimum İhraç Önerisi',
        description: 'Skoruna göre originator için önerilen maksimum VDMK hacmi. Over-collateralization oranı tavsiyesi.'
      },
      {
        icon: '🗺️',
        title: 'Risk Haritası',
        description: 'Görsel risk dashboard. Borçlu dağılımı, sektör konsantrasyonu, vade yapısı, tahsilat trendi grafikleri.'
      }
    ],

    process: [
      {
        step: 1,
        title: 'Veri Toplama',
        description: 'Originator alacak portföyü verilerini sisteme yükler. Borçlu listesi, fatura detayları, tahsilat geçmişi, önceki VDMK performansı.',
        duration: '5-10 dakika'
      },
      {
        step: 2,
        title: 'Otomatik Analiz',
        description: 'Sistem 5 ana bileşeni analiz eder: Borçlu konsantrasyonu, tahsilat performansı, portföy büyüklüğü, SPK uygunluğu, geçmiş VDMK performansı.',
        duration: '3-5 dakika'
      },
      {
        step: 3,
        title: 'Skor Hesaplama',
        description: 'Ağırlıklı ortalama ile genel skor hesaplanır. A/B/C/D sınıflandırması yapılır. Maksimum ihraç hacmi önerilir.',
        duration: '1 dakika'
      },
      {
        step: 4,
        title: 'Rapor & Dashboard',
        description: 'Detaylı skor raporu, risk haritası, karşılaştırmalı benchmark, iyileştirme önerileri hazırlanır.',
        duration: '2 dakika'
      }
    ],

    scoringComponents: [
      {
        component: 'Borçlu Konsantrasyonu',
        weight: '%25',
        measures: [
          'Top 10 borçlunun toplam portföy içindeki payı',
          'Tek borçlu maksimum konsantrasyon oranı',
          'Herfindahl-Hirschman Index (HHI) hesaplaması',
          'Sektörel dağılım çeşitliliği'
        ]
      },
      {
        component: 'Tahsilat Performansı',
        weight: '%30',
        measures: [
          'Son 12 ay tahsilat oranı',
          'Vadesinde tahsilat yüzdesi',
          'Ortalama tahsilat süresi',
          'Gecikmiş alacak oranı'
        ]
      },
      {
        component: 'Portföy Büyüklüğü & Olgunluk',
        weight: '%20',
        measures: [
          'Toplam alacak portföyü büyüklüğü',
          'Portföy yaşı (kaç yıldır aktif)',
          'Aylık ciro büyüme trendi',
          'Müşteri sayısı ve çeşitliliği'
        ]
      },
      {
        component: 'SPK Uygunluğu',
        weight: '%15',
        measures: [
          'Gerekli belgelerin eksiksizliği',
          'Mevzuat uyum kontrolü',
          'Denetim raporları kalitesi',
          'Compliance geçmişi'
        ]
      },
      {
        component: 'Geçmiş VDMK Performansı',
        weight: '%10',
        measures: [
          'Önceki ihraçlarda tahsilat başarısı',
          'Default/erken ödeme oranları',
          'Fonlarla çalışma geçmişi',
          'Piyasa itibarı'
        ]
      }
    ],

    scoreGrades: [
      {
        grade: 'A',
        range: '85-100',
        description: 'Çok düşük risk, yüksek kaliteli portföy',
        recommendation: 'Portföyün %80-90\'ına kadar VDMK ihracı önerilir'
      },
      {
        grade: 'B',
        range: '70-84',
        description: 'Düşük risk, kabul edilebilir portföy kalitesi',
        recommendation: 'Portföyün %60-80\'ine kadar VDMK ihracı önerilir'
      },
      {
        grade: 'C',
        range: '50-69',
        description: 'Orta risk, dikkatli değerlendirme gerekli',
        recommendation: 'Portföyün %40-60\'ına kadar, yüksek over-collateralization ile'
      },
      {
        grade: 'D',
        range: '0-49',
        description: 'Yüksek risk, VDMK için uygun değil',
        recommendation: 'İhraç önerilmez. Portföy kalitesi iyileştirme gerekli.'
      }
    ],

    audience: [
      {
        icon: '🏭',
        title: 'Kaynak Sağlayıcılar (Originatorlar)',
        description: 'Kendi portföy kalitesini öğrenmek isteyen şirketler',
        benefits: [
          'Fonlara başvurmadan önce pozisyonu öğrenme',
          'Portföy iyileştirme alanlarını tespit etme',
          'Maksimum ihraç hacmi tahmini',
          'Rekabetçi avantaj (yüksek skor)'
        ]
      },
      {
        icon: '💼',
        title: 'VDMK Fonları',
        description: 'Hızlı, objektif originator değerlendirmesi isteyen yatırımcılar',
        benefits: [
          'Standart, karşılaştırılabilir skor',
          'Due diligence süresi %70 azalır',
          'Risk görünürlüğü erken sağlanır',
          'Portföy çeşitlendirme kolaylaşır'
        ]
      },
      {
        icon: '📋',
        title: 'VDMK Danışmanları',
        description: 'Müşteri portföy kalitesini objektif göstermek isteyen danışmanlar',
        benefits: [
          'Müşteri değerini kanıtlama aracı',
          'Fonlara güvenilir referans',
          'Fiyatlama için objektif veri',
          'Müşteri kazanma avantajı'
        ]
      }
    ],

    stats: {
      title: 'Neden Gerekli?',
      points: [
        {
          stat: '%0',
          label: 'VDMK piyasasında standart originator rating sistemi mevcut değil'
        },
        {
          stat: '5-7 gün',
          label: 'Bir originator\'ın manuel due diligence süresi (her fon için tekrarlanıyor)'
        },
        {
          stat: '%30',
          label: 'İhraç sonrası ortaya çıkan tahsilat sorunlarının oranı (ön skorlama olsaydı tespit edilebilirdi)'
        }
      ],
      conclusion: 'KolayMoney Scoring Sistemi, VDMK piyasasına standart, objektif, sürekli güncellenen bir originator değerlendirme altyapısı kazandırır.'
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation variant="default" />
      
      <ServiceHero 
        data={serviceData.hero}
        onPrimaryClick={() => window.location.href = '/basvuru-yeni'}
        onSecondaryClick={() => {
          document.querySelector('#methodology')?.scrollIntoView({ behavior: 'smooth' })
        }}
      />
      
      <ProblemStatement data={serviceData.problem} />
      
      <ServiceFeatures features={serviceData.features} />
      
      <ServiceProcess steps={serviceData.process} title="Skorlama Süreci" />

      {/* Scoring Components Section */}
      <section id="methodology" className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-4xl font-black mb-12 text-center">Skorlama Metodolojisi</h2>
          <p className="text-xl text-gray-300 mb-12 text-center max-w-3xl mx-auto">
            Originator skoru 5 ana bileşenden oluşur. Her bileşenin ağırlığı ve ölçüm kriterleri şeffaf ve standart.
          </p>

          <div className="space-y-6">
            {serviceData.scoringComponents.map((comp, index) => (
              <div key={index} className="bg-white text-black border-4 border-white p-8">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-black">{comp.component}</h3>
                  <div className="bg-blue-600 text-white px-4 py-2 font-mono font-black text-xl">
                    {comp.weight}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  {comp.measures.map((measure, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span className="text-gray-700 text-sm">{measure}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Score Grades Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-4xl font-black mb-12 text-center">Skor Derecelendirmesi</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {serviceData.scoreGrades.map((grade, index) => {
              const gradeColors = {
                A: 'border-green-600 bg-green-50',
                B: 'border-blue-600 bg-blue-50',
                C: 'border-orange-600 bg-orange-50',
                D: 'border-red-600 bg-red-50'
              }
              const badgeColors = {
                A: 'bg-green-600',
                B: 'bg-blue-600',
                C: 'bg-orange-600',
                D: 'bg-red-600'
              }

              return (
                <div key={index} className={`border-4 ${gradeColors[grade.grade as keyof typeof gradeColors]} p-8`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`${badgeColors[grade.grade as keyof typeof badgeColors]} text-white font-mono text-4xl font-black w-16 h-16 flex items-center justify-center`}>
                      {grade.grade}
                    </div>
                    <div>
                      <div className="text-2xl font-black">{grade.range}</div>
                      <div className="text-sm text-gray-600">{grade.description}</div>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-bold">Öneri:</span> {grade.recommendation}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Additional Outputs Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-black mb-12 text-center">Skor Raporunda Neler Var?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { label: 'Genel Skor', detail: 'A/B/C/D derecelendirmesi ve 0-100 sayısal skor' },
              { label: 'Alt Skorlar', detail: '5 bileşenin detaylı puanları ve açıklamaları' },
              { label: 'Maksimum İhraç Önerisi', detail: 'Portföy büyüklüğüne göre önerilen VDMK hacmi' },
              { label: 'Risk Haritası', detail: 'Konsantrasyon, vade, tahsilat görsel dashboard' },
              { label: 'Benchmark Karşılaştırma', detail: 'Sektör ortalaması ve en iyi performans gösterenlerle kıyaslama' },
              { label: 'İyileştirme Önerileri', detail: 'Skoru yükseltmek için yapılabilecekler listesi' }
            ].map((item, index) => (
              <div key={index} className="bg-white border-4 border-black p-6">
                <h3 className="text-xl font-black mb-2">{item.label}</h3>
                <p className="text-gray-600">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audience Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-black mb-12 text-center">Kimler Kullanır?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {serviceData.audience.map((aud, index) => (
              <div key={index} className="bg-blue-50 border-4 border-black p-8">
                <div className="text-5xl mb-4">{aud.icon}</div>
                <h3 className="text-2xl font-black mb-3">{aud.title}</h3>
                <p className="text-gray-700 mb-4">{aud.description}</p>
                <div className="space-y-2">
                  {aud.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span className="text-sm text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-black mb-12 text-center">{serviceData.stats.title}</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {serviceData.stats.points.map((point, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-black text-blue-600 mb-4">{point.stat}</div>
                <p className="text-gray-300">{point.label}</p>
              </div>
            ))}
          </div>
          <p className="text-xl text-center text-gray-300 leading-relaxed">
            {serviceData.stats.conclusion}
          </p>
        </div>
      </section>

      <ServiceCTA
        title="Originator skorunuzu öğrenin"
        description="Portföy kalitenizi objektif olarak değerlendirin. Fonlara başvurmadan önce pozisyonunuzu bilin."
        primaryButton="Skorumu Hesapla"
        secondaryButton="Detaylı Bilgi"
        note="Skor hesaplama gizlidir. Sonuçlar sadece sizinle paylaşılır, izniniz olmadan fonlara iletilmez."
      />
    </div>
  )
}
