/**
 * Dinamik Sektör Sayfası
 * /sektor/[slug] route'u için
 */

import { useParams } from 'wouter'
import { SectorSlug } from '@/types/sector'
import { getSectorData } from '@/data/sectors'
import { SectorHero } from '@/components/sectors/SectorHero'
import { SectorStats } from '@/components/sectors/SectorStats'
import { UseCaseGrid } from '@/components/sectors/UseCaseGrid'
import { FinancingCalculator } from '@/components/sectors/FinancingCalculator'
import { SectorBenefits } from '@/components/sectors/SectorBenefits'
import { useEffect } from 'react'
import { useAnalytics } from '@/contexts/AnalyticsContext'
import { useSEO } from '@/hooks/useSEO'
import { generateServiceSchema, generateBreadcrumbSchema, injectStructuredData } from '@/lib/seo/structuredData'

export function SectorPage() {
  const params = useParams()
  const slug = params.slug as SectorSlug
  const analytics = useAnalytics()
  
  const sectorData = getSectorData(slug)

  // SEO optimization
  useSEO({
    title: sectorData?.seoTitle || 'Sektör | KolayMoney',
    description: sectorData?.seoDescription || '',
    keywords: sectorData?.seoKeywords || [],
    canonical: `/sektor/${slug}`
  })

  // Track sector view + Add structured data
  useEffect(() => {
    if (sectorData) {
      analytics.trackSectorView(slug)
      
      // Add service schema
      injectStructuredData(generateServiceSchema({
        name: sectorData.name,
        slug: sectorData.slug,
        description: sectorData.description,
        minAmount: 500000,
        maxAmount: 50000000,
        minTerm: 3,
        maxTerm: 24
      }), 'service-schema')
      
      // Add breadcrumb schema
      injectStructuredData(generateBreadcrumbSchema([
        { name: 'Ana Sayfa', url: '/' },
        { name: 'Sektörler', url: '/sektorler' },
        { name: sectorData.name, url: `/sektor/${slug}` }
      ]), 'breadcrumb-schema')
    }
  }, [sectorData, slug])

  // 404 handling
  if (!sectorData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-6xl font-black mb-4">404</h1>
          <p className="text-xl mb-8">Sektör bulunamadı</p>
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
      {/* Hero */}
      <SectorHero 
        name={sectorData.name}
        icon={sectorData.icon}
        summary={sectorData.summary}
        category={sectorData.category}
        paymentTerm={sectorData.paymentTerm}
        slug={slug}
      />

      {/* Stats */}
      <SectorStats stats={sectorData.stats} />

      {/* Description */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-xl leading-relaxed text-center">
              {sectorData.description}
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <UseCaseGrid useCases={sectorData.useCases} sectorSlug={slug} />

      {/* Calculator */}
      <FinancingCalculator sectorName={sectorData.name} />

      {/* Benefits & Requirements */}
      <SectorBenefits 
        benefits={sectorData.benefits}
        requirements={sectorData.requirements}
        sectorName={sectorData.name}
      />

      {/* Final CTA */}
      <section className="py-16 bg-[#0047FF] text-white border-t-4 border-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="heading-1 text-white mb-6">
            {sectorData.name} için VDMK Finansmanı
          </h2>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto mono-text">
            Hemen başvurun, 3-5 gün içinde finansman alın
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href={`/sektor/${slug}/basvuru`}
              className="px-8 py-4 bg-white text-[#0047FF] border-2 border-black hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all mono-text font-bold"
            >
              {sectorData.icon} Başvuru Yap
            </a>
            <a
              href="tel:+905558681634"
              className="px-8 py-4 bg-transparent text-white border-2 border-white hover:bg-white hover:text-[#0047FF] transition-all mono-text font-bold"
            >
              📞 Hemen Ara
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
