/**
 * Sektör İstatistikleri Component
 * Brutalist grid layout
 */

import { SectorStats as SectorStatsType } from '@/types/sector'

interface SectorStatsProps {
  stats: SectorStatsType
}

export function SectorStats({ stats }: SectorStatsProps) {
  const statsArray = [
    { label: 'Pazar Büyüklüğü', value: stats.marketSize, icon: '💰' },
    { label: 'Kredili Satış Oranı', value: stats.creditSalesRatio, icon: '📊' },
    { label: 'Ortalama Vade', value: stats.avgTerm, icon: '⏱️' },
    { label: 'Ortalama Sepet', value: stats.avgBasket, icon: '🛒' },
    { label: 'Tahsilat Başarısı', value: stats.collectionRate, icon: '✓' }
  ]

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-black mb-8 text-center">Sektör İstatistikleri</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {statsArray.map((stat, index) => (
            <div 
              key={index}
              className="bg-white border-4 border-black p-6 hover:translate-x-1 hover:translate-y-1 transition-transform"
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-3xl font-black mb-2">{stat.value}</div>
              <div className="text-sm font-bold text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
