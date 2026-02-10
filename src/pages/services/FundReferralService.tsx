/**
 * VDMK Fonlara Referral & Deal Sourcing Service Page
 * For VDMK funds seeking qualified deal flow
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

export function FundReferralService() {
  const analytics = useAnalytics()

  useSEO({
    title: 'VDMK Fonlara Referral & Deal Sourcing | KolayMoney',
    description: 'VDMK fonları için ön değerlendirilmiş, nitelikli kaynak sağlayıcı (originator) akışı. Başarı bazlı ücretlendirme, standart veri formatı.',
    keywords: ['VDMK fon', 'deal sourcing', 'originator referral', 'VDMK yatırım', 'kaynak sağlayıcı'],
    canonical: '/hizmetler/fonlara-referral'
  })

  useEffect(() => {
    analytics.trackMenuClick('Hizmetler - Fonlara Referral')
  }, [])

  const serviceData = {
    hero: {
      badge: 'VDMK FONLARI İÇİN',
      icon: '🏦',
      title: 'VDMK Fonlara\nReferral & Deal Sourcing',
      subtitle: 'Ön değerlendirilmiş, nitelikli originator akışı',
      description: 'KolayMoney, VDMK fonlarına ön skorlanmış, SPK uygunluğu test edilmiş, standart formatta kaynak sağlayıcı (originator) akışı sağlar. Manuel deal sourcing yerine, yatırım komitesine hazır, karşılaştırılabilir deal flow.',
      primaryCTA: 'Fon Profili Oluştur',
      secondaryCTA: 'Nasıl Çalışır?'
    },

    problem: {
      title: 'VDMK Fonlarının Deal Sourcing Sorunu',
      pain_points: [
        {
          icon: '🔍',
          title: 'Niteliksiz Başvuru Yoğunluğu',
          description: 'Fonlara gelen originator başvurularının %70\'i temel kriterleri karşılamıyor. Yatırım ekibi zamanı düşük kaliteli deal\'lerle harcanıyor.'
        },
        {
          icon: '📊',
          title: 'Standart Olmayan Veri',
          description: 'Her originator farklı formatta veri gönderiyor. Karşılaştırma yapmak için saatler harcanan manuel veri temizliği gerekiyor.'
        },
        {
          icon: '⏱️',
          title: 'Yavaş Ön Değerlendirme',
          description: 'Yatırım komitesine sunmadan önce günler süren manuel analiz. Deal pipeline yavaş ilerliyor, fon deployment hedefleri gecikiyor.'
        },
        {
          icon: '🎯',
          title: 'Hedef Profil Uyumsuzluğu',
          description: 'Gelen deal\'ler fonun yatırım tezine uymuyor. Sektör, büyüklük, risk profili eşleşmesi manuel yapılıyor.'
        }
      ]
    },

    features: [
      {
        icon: '✅',
        title: 'Ön Değerlendirilmiş Originatorlar',
        description: 'Tüm başvurular KolayMoney skorlamasından geçer. Fonlara sadece temel kriterleri karşılayan, A/B sınıfı deal\'ler iletilir.'
      },
      {
        icon: '🎯',
        title: 'Fon Profili Eşleştirme',
        description: 'Fonun yatırım tezi (sektör, büyüklük, risk iştahı) sisteme tanımlanır. Sadece uyumlu deal\'ler otomatik yönlendirilir.'
      },
      {
        icon: '📋',
        title: 'Standart Veri Formatı',
        description: 'Tüm originator verileri aynı formatta sunulur. Karşılaştırılabilir metrikler, tutarlı risk göstergeleri.'
      },
      {
        icon: '⚡',
        title: 'Hızlı Yatırım Komitesi Süreci',
        description: 'Ön analiz tamamlanmış, SPK uygunluğu kontrol edilmiş deal\'ler. Yatırım komitesi doğrudan değerlendirmeye geçer.'
      },
      {
        icon: '💰',
        title: 'Başarı Bazlı Ücret',
        description: 'Sadece tamamlanan ihraçlardan success fee. Deal sourcing için ön ödeme yok, risk paylaşımlı model.'
      },
      {
        icon: '🔒',
        title: 'Gizlilik Garantisi',
        description: 'Originator bilgileri sadece fon onayı sonrası paylaşılır. İki taraflı NDA, veri güvenliği protokolü.'
      }
    ],

    process: [
      {
        step: 1,
        title: 'Fon Profili Tanımlama',
        description: 'Fonun yatırım tezi sisteme girilir: hedef sektörler, minimum/maksimum ihraç büyüklüğü, risk iştahı, red-flag kriterleri.',
        duration: '30 dakika (bir kerelik)'
      },
      {
        step: 2,
        title: 'Originator Başvurusu',
        description: 'Kaynak sağlayıcılar KolayMoney platformuna başvurur. Alacak portföyü verileri yüklenir, otomatik skorlama yapılır.'
      },
      {
        step: 3,
        title: 'Otomatik Eşleştirme',
        description: 'Sistem originator profilini fon kriterleriyle karşılaştırır. Uyumlu deal\'ler otomatik olarak fona bildirilir.'
      },
      {
        step: 4,
        title: 'Fon Bildirimi',
        description: 'Fon yatırım ekibine e-posta/dashboard bildirimi gider. Originator özeti, risk skoru, tahmini hacim bilgisi sunulur.'
      },
      {
        step: 5,
        title: 'Doğrudan İletişim',
        description: 'Fon ilgilenmek isterse, originator iletişim bilgileri paylaşılır. Süreç doğrudan fon-originator arasında devam eder.'
      }
    ],

    pricingModel: {
      title: 'Ücretlendirme Modeli',
      model: 'Başarı Bazlı Success Fee',
      description: 'KolayMoney sadece tamamlanan VDMK ihraçlarından ücret alır. Deal sourcing, skorlama, eşleştirme hizmetleri için ön ödeme yoktur.',
      tiers: [
        {
          tier: 'İhraç Tamamlandı',
          price: 'İhraç hacminin %0.5-1.5\'i',
          includes: [
            'Originator ön değerlendirme',
            'SPK uygunluk kontrolü',
            'Fon eşleştirme',
            'Standart veri hazırlama',
            'Yatırım komitesi raporu'
          ]
        },
        {
          tier: 'İhraç Tamamlanmadı',
          price: '₺0',
          includes: [
            'Hiçbir ücret alınmaz',
            'Fon reddederse ödeme yok',
            'Originator vazgeçerse ödeme yok',
            'Risk tamamen KolayMoney\'de'
          ]
        }
      ],
      note: 'Success fee oranı ihraç büyüklüğüne göre kademeli azalır. Detaylı fiyatlandırma için iletişime geçin.'
    },

    audience: [
      {
        icon: '💼',
        title: 'VDMK Fonları',
        description: 'Nitelikli deal flow arayan yatırım fonları',
        benefits: [
          'Ön değerlendirilmiş originator akışı',
          'Yatırım tezine uygun eşleştirme',
          'Standart veri formatı',
          'Başarı bazlı ücret (risk yok)'
        ]
      },
      {
        icon: '🏦',
        title: 'Aracı Kurum VDMK Masaları',
        description: 'Deal sourcing kapasitesi sınırlı ekipler',
        benefits: [
          'Deal pipeline sürekli dolu',
          'Manuel ön eleme ortadan kalkar',
          'Yatırım komitesi zamanı verimli kullanılır',
          'Deployment hedefleri kolayca tutturulur'
        ]
      },
      {
        icon: '🎯',
        title: 'Özel VDMK Yapılandırmacıları',
        description: 'Boutique danışmanlık firmaları',
        benefits: [
          'Originator network genişler',
          'Sadece nitelikli deal\'lerle çalışılır',
          'Veri toplama/temizleme otomatik',
          'Müşteri portföyü büyür'
        ]
      }
    ],

    stats: {
      title: 'Piyasa Verileri',
      points: [
        {
          stat: '%70',
          label: 'Fonlara gelen başvuruların temel kriterleri karşılamama oranı'
        },
        {
          stat: '3-5 gün',
          label: 'Bir originator\'ın manuel ön değerlendirmesi için geçen süre'
        },
        {
          stat: '%40',
          label: 'Deal sourcing maliyetinin toplam VDMK yapılandırma maliyeti içindeki payı'
        }
      ],
      conclusion: 'KolayMoney, fonların deal sourcing maliyetini %70 azaltır ve yatırım komitesi sürecini 3-5 günden 1 güne indirir.'
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation variant="default" />
      
      <ServiceHero 
        data={serviceData.hero}
        onPrimaryClick={() => window.location.href = '/basvuru-yeni'}
        onSecondaryClick={() => {
          document.querySelector('#process')?.scrollIntoView({ behavior: 'smooth' })
        }}
      />
      
      <ProblemStatement data={serviceData.problem} />
      
      <ServiceFeatures features={serviceData.features} />
      
      <div id="process">
        <ServiceProcess steps={serviceData.process} title="Deal Flow Süreci" />
      </div>

      {/* Pricing Model Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-4xl font-black mb-6 text-center">{serviceData.pricingModel.title}</h2>
          <div className="text-center mb-12">
            <div className="text-3xl font-black text-blue-600 mb-3">{serviceData.pricingModel.model}</div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">{serviceData.pricingModel.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {serviceData.pricingModel.tiers.map((tier, index) => (
              <div 
                key={index} 
                className={`bg-white border-4 ${index === 0 ? 'border-blue-600' : 'border-black'} p-8`}
              >
                <h3 className="text-2xl font-black mb-2">{tier.tier}</h3>
                <div className="text-4xl font-black text-blue-600 mb-6">{tier.price}</div>
                <div className="space-y-3">
                  {tier.includes.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className={index === 0 ? 'text-blue-600' : 'text-green-600'}>✓</span>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {serviceData.pricingModel.note && (
            <div className="bg-yellow-50 border-4 border-yellow-400 p-6 text-center">
              <p className="text-gray-800 font-bold">{serviceData.pricingModel.note}</p>
            </div>
          )}
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
        title="Fon profilinizi oluşturun, nitelikli deal flow başlasın"
        description="Başarı bazlı ücretlendirme. Sadece tamamlanan ihraçlardan pay alıyoruz. Deal sourcing riski bizde."
        primaryButton="Fon Kaydı Yap"
        secondaryButton="Demo Talep Et"
        note="Originator bilgileri sadece karşılıklı ilgi sonrası paylaşılır. Tam gizlilik garantisi."
      />
    </div>
  )
}
