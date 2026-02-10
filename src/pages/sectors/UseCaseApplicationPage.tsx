/**
 * Use Case Application Page
 * Sektör use case'i için özel başvuru sayfası
 * Kullanıcıya hızlı arama veya detaylı anket seçeneği sunar
 */

import { useState } from 'react'
import { useParams, Link } from 'wouter'
import { SectorSlug } from '@/types/sector'
import { getSectorData } from '@/data/sectors'
import { useSEO } from '@/hooks/useSEO'
import { useAnalytics } from '@/contexts/AnalyticsContext'
import { ApplicationChoiceScreen } from '@/components/usecase/ApplicationChoiceScreen'
import { UseCaseContactForm } from '@/components/forms/UseCaseContactForm'
import { ComplianceApplicationForm } from '@/components/compliance/ComplianceApplicationForm'
import { Navigation } from '@/components/layout/Navigation'

export function UseCaseApplicationPage() {
  const params = useParams()
  const slug = params.slug as SectorSlug
  const useCaseId = params.useCaseId as string
  const analytics = useAnalytics()
  
  const [selectedOption, setSelectedOption] = useState<'quick' | 'detailed' | null>(null)
  
  const sectorData = getSectorData(slug)
  const useCase = sectorData?.useCases.find(uc => uc.id === useCaseId)

  // SEO optimization
  useSEO({
    title: `${useCase?.title || 'Senaryo'} - VDMK Başvurusu | KolayMoney`,
    description: `${sectorData?.name} sektörü için ${useCase?.title} senaryosu. ${useCase?.companyProfile}`,
    keywords: [sectorData?.name || '', 'VDMK başvuru', useCase?.title || '', 'finansman'],
    canonical: `/sektor/${slug}/senaryo/${useCaseId}/basvuru`
  })

  // Track choice selection
  const handleSelectQuick = () => {
    setSelectedOption('quick')
    analytics.trackCTAClick('Use Case Quick Application', `${slug}-${useCaseId}`)
  }

  const handleSelectDetailed = () => {
    setSelectedOption('detailed')
    analytics.trackCTAClick('Use Case Detailed Application', `${slug}-${useCaseId}`)
  }

  // 404 handling
  if (!sectorData || !useCase) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-6xl font-black mb-4">404</h1>
          <p className="text-xl mb-8">Senaryo bulunamadı</p>
          <a 
            href="/sektorler"
            className="px-8 py-4 bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors border-2 border-black"
          >
            Tüm Sektörler
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Navigation variant="default" />

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-2 text-sm mono-text text-gray-600">
          <Link href="/" className="hover:underline">Ana Sayfa</Link>
          <span>/</span>
          <Link href="/sektorler" className="hover:underline">Sektörler</Link>
          <span>/</span>
          <Link href={`/sektor/${slug}`} className="hover:underline">{sectorData.name}</Link>
          <span>/</span>
          <span className="font-bold text-black">Başvuru</span>
        </div>
      </div>

      {/* Use Case Header */}
      <section className="py-12 bg-white border-b-4 border-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-6xl">{sectorData.icon}</div>
              <div className="flex-1">
                <div className="text-sm font-bold text-gray-600 mb-2 mono-text">
                  {sectorData.name}
                </div>
                <h1 className="heading-1">{useCase.title}</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Case Details */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Company Profile */}
            <div className="brutalist-card p-6 bg-white border-4 border-black mb-6">
              <div className="text-sm font-bold text-gray-600 mb-3 mono-text">ŞİRKET PROFİLİ</div>
              <p className="text-lg">{useCase.companyProfile}</p>
            </div>

            {/* Situation */}
            <div className="brutalist-card p-6 bg-white border-4 border-black mb-6">
              <div className="text-sm font-bold text-gray-600 mb-4 mono-text">📋 MEVCUT DURUM</div>
              <ul className="space-y-3">
                {useCase.situation.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold text-xl">•</span>
                    <span className="flex-1">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* VDMK Solution */}
            <div className="brutalist-card p-6 bg-green-50 border-4 border-black mb-6">
              <div className="text-sm font-bold text-gray-600 mb-4 mono-text">✓ VDMK ÇÖZÜMÜ</div>
              <ul className="space-y-3">
                {useCase.vdmkSolution.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-xl">✓</span>
                    <span className="flex-1">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Financial Impact */}
            <div className="brutalist-card p-6 bg-white border-4 border-black mb-8">
              <div className="text-sm font-bold text-gray-600 mb-4 mono-text">💰 FİNANSAL ETKİ</div>
              <div className="space-y-4">
                {useCase.financialImpact.map((impact, i) => (
                  <div 
                    key={i}
                    className={`p-4 border-2 ${
                      impact.highlight 
                        ? 'border-blue-600 bg-blue-50' 
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-sm mono-text">{impact.label}</span>
                      <span className={`text-xl font-black ${
                        impact.highlight ? 'text-blue-600' : 'text-black'
                      }`}>
                        {impact.value}
                      </span>
                    </div>
                    {impact.detail && (
                      <div className="text-xs text-gray-600 mono-text mb-1">{impact.detail}</div>
                    )}
                    {impact.savingsVsBank && (
                      <div className="text-xs text-green-600 font-bold mono-text">
                        Banka tasarrufu: {impact.savingsVsBank}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conditional Rendering: Choice Screen or Selected Form */}
      {!selectedOption && (
        <ApplicationChoiceScreen 
          onSelectQuick={handleSelectQuick}
          onSelectDetailed={handleSelectDetailed}
        />
      )}

      {selectedOption === 'quick' && (
        <UseCaseContactForm 
          sectorSlug={slug}
          useCaseId={useCaseId}
          useCaseTitle={useCase.title}
          prefilledAmount={useCase.calculationDetails.principal}
          onBack={() => setSelectedOption(null)}
        />
      )}

      {selectedOption === 'detailed' && (
        <ComplianceApplicationForm 
          prefilledSector={slug}
          useCaseContext={{
            id: useCaseId,
            title: useCase.title,
            amount: useCase.calculationDetails.principal
          }}
          onBack={() => setSelectedOption(null)}
        />
      )}
    </div>
  )
}
