/**
 * Use Case Grid Component
 * Tüm senaryoları grid layout'ta gösterir
 */

import { SectorUseCase, SectorSlug } from '@/types/sector'
import { UseCaseCard } from './UseCaseCard'

interface UseCaseGridProps {
  useCases: SectorUseCase[]
  sectorSlug: SectorSlug
}

export function UseCaseGrid({ useCases, sectorSlug }: UseCaseGridProps) {
  return (
    <section id="use-cases" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black mb-4">Finansman Senaryoları</h2>
          <p className="text-xl text-gray-600">
            Gerçek şirket örnekleriyle {useCases.length} farklı VDMK kullanım senaryosu
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <UseCaseCard 
              key={useCase.id} 
              useCase={useCase} 
              index={index}
              sectorSlug={sectorSlug}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
