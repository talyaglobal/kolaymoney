/**
 * Service Hero Component
 * Black hero section for service pages
 */

import { ServiceHeroData } from '@/types/services'

interface ServiceHeroProps {
  data: ServiceHeroData
  onPrimaryClick?: () => void
  onSecondaryClick?: () => void
}

export function ServiceHero({ data, onPrimaryClick, onSecondaryClick }: ServiceHeroProps) {
  return (
    <section className="bg-black text-white py-24 border-b-4 border-white">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Badge */}
        <div className="inline-block bg-blue-600 text-white px-6 py-2 mb-6 border-2 border-white">
          <span className="font-mono text-sm font-black uppercase tracking-wider">
            {data.badge}
          </span>
        </div>

        {/* Icon */}
        <div className="text-8xl mb-6">{data.icon}</div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-none whitespace-pre-line">
          {data.title}
        </h1>

        {/* Subtitle */}
        <p className="text-2xl md:text-3xl text-blue-600 font-black mb-6">
          {data.subtitle}
        </p>

        {/* Description */}
        <p className="text-xl text-gray-300 leading-relaxed mb-12 max-w-4xl">
          {data.description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={onPrimaryClick}
            className="bg-blue-600 text-white px-10 py-5 font-black text-xl border-4 border-white hover:bg-white hover:text-blue-600 transition-all uppercase tracking-wider"
          >
            {data.primaryCTA} →
          </button>
          <button 
            onClick={onSecondaryClick}
            className="bg-black text-white px-10 py-5 font-black text-xl border-4 border-white hover:bg-white hover:text-black transition-all uppercase tracking-wider"
          >
            {data.secondaryCTA}
          </button>
        </div>
      </div>
    </section>
  )
}
