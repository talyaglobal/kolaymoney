/**
 * Service Process Component
 * Numbered step cards showing process flow
 */

import { ServiceProcess as ServiceProcessType } from '@/types/services'

interface ServiceProcessProps {
  steps: ServiceProcessType[]
  title?: string
}

export function ServiceProcess({ steps, title = 'Süreç Adımları' }: ServiceProcessProps) {
  const stepColors = ['bg-blue-600', 'bg-green-600', 'bg-orange-600', 'bg-purple-600', 'bg-red-600']

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-black mb-12 text-center">
          {title}
        </h2>

        <div className="space-y-6">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="flex items-start gap-6 bg-white border-4 border-black p-8 hover:translate-x-1 hover:translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
            >
              {/* Step Number */}
              <div className={`${stepColors[index % stepColors.length]} text-white font-mono text-3xl font-black w-16 h-16 flex items-center justify-center border-2 border-black shrink-0`}>
                {step.step}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-2xl font-black mb-2">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-2">{step.description}</p>
                {step.duration && (
                  <div className="text-sm font-mono text-blue-600 font-bold">
                    ⏱️ {step.duration}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
