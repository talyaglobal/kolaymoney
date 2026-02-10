/**
 * Problem Statement Component
 * Grid of pain point cards
 */

import { ProblemStatementData } from '@/types/services'

interface ProblemStatementProps {
  data: ProblemStatementData
}

export function ProblemStatement({ data }: ProblemStatementProps) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-black mb-12 text-center">
          {data.title}
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {data.pain_points.map((point, index) => (
            <div 
              key={index}
              className="bg-white border-4 border-black p-8 hover:translate-x-1 hover:translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(255,0,0,0.3)] transition-all duration-200"
            >
              <div className="text-5xl mb-4">{point.icon}</div>
              <h3 className="text-2xl font-black mb-3">{point.title}</h3>
              <p className="text-gray-600 leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
