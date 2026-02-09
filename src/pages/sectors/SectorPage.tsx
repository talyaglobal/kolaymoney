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

export function SectorPage() {
  const params = useParams()
  const slug = params.slug as SectorSlug
  
  const sectorData = getSectorData(slug)

  // SEO: Update page title and meta
  useEffect(() => {
    if (sectorData) {
      document.title = sectorData.seoTitle
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute('content', sectorData.seoDescription)
      }
      
      // Update meta keywords
      let metaKeywords = document.querySelector('meta[name="keywords"]')
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta')
        metaKeywords.setAttribute('name', 'keywords')
        document.head.appendChild(metaKeywords)
      }
      metaKeywords.setAttribute('content', sectorData.seoKeywords.join(', '))
    }
  }, [sectorData])

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
      <UseCaseGrid useCases={sectorData.useCases} />

      {/* Calculator */}
      <FinancingCalculator sectorName={sectorData.name} />

      {/* Benefits & Requirements */}
      <SectorBenefits 
        benefits={sectorData.benefits}
        requirements={sectorData.requirements}
        sectorName={sectorData.name}
      />

      {/* Final CTA */}
      <section className="py-16 bg-blue-600 text-white border-t-4 border-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-black mb-6">
            {sectorData.name} İçin VDMK Finansmanı
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            7 gün içinde likidite sağlayın, nakit döngünüzü hızlandırın, 
            büyüme fırsatlarını kaçırmayın.
          </p>
          <div className="flex gap-4 justify-center">
            <a 
              href="/#references"
              className="px-12 py-5 bg-white text-blue-600 font-bold text-xl hover:bg-gray-100 transition-colors border-4 border-black"
            >
              📞 Sizi Arayalım
            </a>
            <a 
              href="/sektorler"
              className="px-12 py-5 bg-transparent text-white font-bold text-xl hover:bg-blue-700 transition-colors border-4 border-white"
            >
              Diğer Sektörler
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
