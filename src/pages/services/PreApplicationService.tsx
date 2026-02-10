/**
 * VDMK Ön Başvuru & Değerlendirme Service Page
 * For VDMK consultants and advisors
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

export function PreApplicationService() {
  const analytics = useAnalytics()

  useSEO({
    title: 'VDMK Ön Başvuru & Değerlendirme | KolayMoney',
    description: 'VDMK danışmanları için kaynak sağlayıcı ön başvuru ve uygunluk değerlendirme hizmeti. AI skorlama, SPK kontrolü, 10-15 dakikada sonuç.',
    keywords: ['VDMK danışmanlık', 'originator değerlendirme', 'VDMK ön başvuru', 'kaynak sağlayıcı skorlama', 'SPK uygunluk'],
    canonical: '/hizmetler/on-basvuru-degerlendirme'
  })

  useEffect(() => {
    analytics.trackMenuClick('Hizmetler - Ön Başvuru')
  }, [])

  const serviceData = {
    hero: {
      badge: 'DANIŞMANLAR İÇİN',
      icon: '🎯',
      title: 'VDMK Kaynak Sağlayıcı\nÖn Başvuru & Değerlendirme',
      subtitle: 'Bu firma VDMK olur mu? 10-15 dakikada cevap alın.',
      description: 'Kolaymoney, VDMK danışmanları için kaynak sağlayıcı (originator) ön başvuru ve uygunluk değerlendirme hizmeti sunar. Şirketlerden alınan alacak verileri yapay zekâ destekli skorlamadan geçer, VDMK mevzuatına göre filtrelenir, fonlara sunulabilir hale getirilir.',
      primaryCTA: 'Kaynak Sağlayıcıyı Değerlendir',
      secondaryCTA: 'Demo Talep Et'
    },

    problem: {
      title: 'Danışmanların En Büyük Zaman Kaybı',
      pain_points: [
        {
          icon: '⏱️',
          title: 'Manuel Ön Değerlendirme',
          description: 'Her originator için saatlerce excel analizi yapılıyor. Alacak portföyü kalitesi, konsantrasyon riskleri, tahsilat performansı manuel hesaplanıyor.'
        },
        {
          icon: '❓',
          title: 'Belirsizlik',
          description: 'Fona götürmeye değer mi bilinmiyor. Saatler harcandıktan sonra fonun reddetme riski yüksek. Zaman ve kaynak israfı.'
        },
        {
          icon: '📊',
          title: 'Veri Eksikliği',
          description: 'Alacak portföyü detayları tam değil. Borçlu bazında dağılım, vade yapısı, tahsilat geçmişi eksik veya tutarsız.'
        },
        {
          icon: '🔴',
          title: 'Risk Görünmüyor',
          description: 'SPK uyumsuzlukları, konsantrasyon riskleri, tahsilat sorunları sonradan ortaya çıkıyor. Süreç ilerledikten sonra problem tespit ediliyor.'
        }
      ]
    },

    features: [
      {
        icon: '🤖',
        title: 'Yapay Zekâ Destekli Skorlama',
        description: 'Alacak portföyü otomatik analiz edilir, konsantrasyon ve tahsilat riskleri tespit edilir. Manuel excel analizi yerine AI modeli kullanılır.'
      },
      {
        icon: '⚖️',
        title: 'SPK Mevzuat Kontrolü',
        description: 'VDMK düzenlemesine göre otomatik uygunluk kontrolü yapılır. Eksik belgeler, uyumsuzluklar önceden tespit edilir.'
      },
      {
        icon: '📈',
        title: 'Tahmini İhraç Hacmi',
        description: 'Portföy büyüklüğüne göre gerçekçi VDMK hacmi önerisi sunulur. Over-collateralization ve risk yapısı hesaplanır.'
      },
      {
        icon: '⚡',
        title: '10-15 Dakikada Sonuç',
        description: 'Manuel analiz yerine hızlı, standart değerlendirme. Saatler değil, dakikalar içinde ön karar.'
      },
      {
        icon: '📋',
        title: 'Fona Hazır Rapor',
        description: 'Yatırım komitesine sunulabilir formatta çıktı. Standart format, karşılaştırılabilir metrikler.'
      },
      {
        icon: '🎯',
        title: 'Risk Haritası',
        description: 'Borçlu konsantrasyonu, vade dağılımı, sektör riski özeti. Görsel risk dashboard.'
      }
    ],

    process: [
      {
        step: 1,
        title: 'Veri Girişi',
        description: 'Originator şirket alacak portföyü verilerini yükler (Excel, API, manuel giriş). Borçlu listesi, fatura detayları, tahsilat geçmişi.',
        duration: '2-5 dakika'
      },
      {
        step: 2,
        title: 'Otomatik Skorlama',
        description: 'AI modeli alacak kalitesi, konsantrasyon, tahsilat performansı analizi yapar. Sektör benchmark ile karşılaştırır.',
        duration: '3-5 dakika'
      },
      {
        step: 3,
        title: 'Mevzuat Kontrolü',
        description: 'SPK VDMK düzenlemesine göre uygunluk testi yapılır. Eksik belgeler, uyumsuzluklar listelenir.',
        duration: '1-2 dakika'
      },
      {
        step: 4,
        title: 'Rapor Üretimi',
        description: 'Uygunluk kararı, tahmini hacim, risk özeti, fona sunum raporu hazırlanır. PDF ve Excel formatında.',
        duration: '2-3 dakika'
      }
    ],

    outputs: [
      {
        label: 'Uygunluk Kararı',
        detail: 'Uygun / Sınırda / Uygun Değil (3 seviye değerlendirme)'
      },
      {
        label: 'Tahmini İhraç Hacmi',
        detail: 'Portföy büyüklüğüne göre VDMK hacmi tahmini (min-max aralık)'
      },
      {
        label: 'Risk Kaynakları Özeti',
        detail: 'Konsantrasyon, vade uyumsuzluğu, tahsilat performansı analizi'
      },
      {
        label: 'Fonlara Sunulabilirlik Notu',
        detail: 'A / B / C sınıflandırması (yatırım komitesi için)'
      },
      {
        label: 'Eksik Bilgiler Listesi',
        detail: 'SPK için gerekli ek dökümanlar ve veri gereksinimleri'
      },
      {
        label: 'Karşılaştırmalı Benchmark',
        detail: 'Sektör ortalamasına göre konum, en iyi performans gösterenlerle karşılaştırma'
      }
    ],

    audience: [
      {
        icon: '💼',
        title: 'VDMK Danışmanları',
        description: 'Originator ön eleme için zaman kazanın, sadece nitelikli deal\'ler üzerinde çalışın',
        benefits: [
          'Saatlik manual analiz yerine 10 dakika',
          'Standardize edilmiş değerlendirme',
          'Fona sunum için hazır rapor',
          'Daha fazla deal kapasitesi'
        ]
      },
      {
        icon: '🏦',
        title: 'Yatırım Bankaları / Aracı Kurumlar',
        description: 'VDMK yapılandırma ekiplerinin ön filtreleme aracı',
        benefits: [
          'Deal sourcing maliyeti %70 azalır',
          'Daha hızlı yatırım komitesi süreci',
          'Risk görünürlüğü erken sağlanır',
          'Standart veri formatı'
        ]
      },
      {
        icon: '📜',
        title: 'SPK Lisanslı Yapılandırmacılar',
        description: 'Mevzuat uygunluk kontrolü otomasyonu',
        benefits: [
          'SPK düzenlemesine otomatik uyum kontrolü',
          'Eksik belge tespiti erken yapılır',
          'Compliance riski minimize edilir',
          'Denetim hazırlığı kolaylaşır'
        ]
      }
    ],

    stats: {
      title: 'Piyasa Gerçekleri',
      points: [
        {
          stat: '%60',
          label: 'Originator başvurularının fona ulaşmadan elenme oranı'
        },
        {
          stat: '4-6 saat',
          label: 'Bir originator\'ın manuel değerlendirilmesi için harcanan süre'
        },
        {
          stat: '%40',
          label: 'Fona sunulan deal\'lerin SPK uyumsuzluğu nedeniyle düşme oranı'
        }
      ],
      conclusion: 'KolayMoney, danışmanların arka ofisi olarak bu süreçleri otomatikleştirir ve kaliteyi standardize eder.'
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation variant="default" />
      
      <ServiceHero 
        data={serviceData.hero}
        onPrimaryClick={() => window.location.href = '/basvuru-yeni'}
        onSecondaryClick={() => window.location.href = '/#contact'}
      />
      
      <ProblemStatement data={serviceData.problem} />
      
      <ServiceFeatures features={serviceData.features} />
      
      <ServiceProcess steps={serviceData.process} />

      {/* Outputs Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-black mb-12 text-center">Değerlendirme Çıktıları</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {serviceData.outputs.map((output, index) => (
              <div key={index} className="bg-white border-4 border-black p-6">
                <h3 className="text-xl font-black mb-2">{output.label}</h3>
                <p className="text-gray-600">{output.detail}</p>
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
        title="Kaynak sağlayıcıyı değerlendirmeye alın"
        description="10-15 dakikada ön değerlendirme raporu alın. Fona sunmadan önce uygunluğu test edin."
        primaryButton="Değerlendirme Başlat"
        secondaryButton="Demo Talep Et"
        note="Tüm değerlendirmeler gizlidir. Originator bilgileri sadece onay sonrası paylaşılır."
      />
    </div>
  )
}
