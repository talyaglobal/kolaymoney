/**
 * Service Features Component
 * Grid of feature cards
 */

import { ServiceFeature } from '@/types/services'

interface ServiceFeaturesProps {
  features: ServiceFeature[]
  title?: string
}

export function ServiceFeatures({ features, title = 'Nasıl Çalışır?' }: ServiceFeaturesProps) {
  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-black mb-12 text-center">
          {title}
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white text-black border-4 border-white p-8 hover:translate-y-[-8px] hover:shadow-[0px_8px_0px_0px_rgba(0,71,255,1)] transition-all duration-300"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-black mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
