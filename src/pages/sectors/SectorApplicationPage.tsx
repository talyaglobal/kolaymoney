/**
 * Sektöre Özel Başvuru Sayfası
 * /sektor/[slug]/basvuru route'u için
 */

import { useParams } from 'wouter'
import { SectorSlug } from '@/types/sector'
import { getSectorData } from '@/data/sectors'
import { ComplianceApplicationForm } from '@/components/compliance/ComplianceApplicationForm'
import { useSEO } from '@/hooks/useSEO'

export function SectorApplicationPage() {
  const params = useParams()
  const slug = params.slug as SectorSlug
  const sectorData = getSectorData(slug)

  // SEO optimization
  useSEO({
    title: `${sectorData?.name} VDMK Başvurusu | KolayMoney`,
    description: `${sectorData?.name} sektörü için özel VDMK finansman başvurusu. ${sectorData?.description}`,
    keywords: [sectorData?.name || '', 'VDMK başvuru', 'finansman', 'işletme kredisi'],
    canonical: `/sektor/${slug}/basvuru`
  })

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
    <div className="min-h-screen bg-white py-12 px-4">
      {/* Sector-specific header */}
      <div className="max-w-4xl mx-auto mb-8">
        <a 
          href={`/sektor/${slug}`} 
          className="inline-flex items-center text-sm mono-text mb-4 hover:underline text-gray-600 hover:text-black transition-colors"
        >
          ← {sectorData.name} Sayfasına Dön
        </a>
        
        <div className="brutalist-card p-6 bg-blue-50 border-2 border-black mb-8">
          <div className="flex items-center gap-4">
            <div className="text-5xl">{sectorData.icon}</div>
            <div className="flex-1">
              <h1 className="heading-2 mb-2">{sectorData.name}</h1>
              <p className="mono-text text-sm text-gray-700">{sectorData.description}</p>
            </div>
          </div>
          
          {/* Quick stats */}
          <div className="mt-4 pt-4 border-t-2 border-black grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="mono-text text-xs text-gray-600">Ortalama Vade</p>
              <p className="mono-text font-bold">{sectorData.paymentTerm}</p>
            </div>
            <div>
              <p className="mono-text text-xs text-gray-600">Tahsilat Oranı</p>
              <p className="mono-text font-bold">{sectorData.stats.collectionRate}</p>
            </div>
            <div>
              <p className="mono-text text-xs text-gray-600">Pazar Büyüklüğü</p>
              <p className="mono-text font-bold">{sectorData.stats.marketSize}</p>
            </div>
            <div>
              <p className="mono-text text-xs text-gray-600">Taksit Oranı</p>
              <p className="mono-text font-bold">{sectorData.stats.creditSalesRatio}</p>
            </div>
          </div>
        </div>

        {/* Info banner */}
        <div className="brutalist-card p-4 bg-yellow-50 border-2 border-black mb-8">
          <p className="mono-text text-sm">
            <span className="font-bold">💡 Bilgi:</span> Bu form {sectorData.name} sektörüne özel sorular içerir. 
            Başvurunuz 3-5 gün içinde değerlendirilecektir.
          </p>
        </div>
      </div>

      {/* Compliance form with pre-filled sector */}
      <ComplianceApplicationForm prefilledSector={slug} />
    </div>
  )
}
