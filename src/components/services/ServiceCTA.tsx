/**
 * Service CTA Component
 * Final call-to-action section for service pages
 */

interface ServiceCTAProps {
  title: string
  description: string
  primaryButton: string
  secondaryButton: string
  primaryHref?: string
  secondaryHref?: string
  note?: string
}

export function ServiceCTA({ 
  title, 
  description, 
  primaryButton, 
  secondaryButton,
  primaryHref = '/basvuru-yeni',
  secondaryHref = '/#contact',
  note
}: ServiceCTAProps) {
  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h2 className="text-4xl md:text-5xl font-black mb-8">
          {title}
        </h2>

        <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
          <a
            href={primaryHref}
            className="inline-block px-12 py-5 bg-blue-600 text-white font-black text-xl border-4 border-white hover:bg-blue-700 transition-colors uppercase"
          >
            {primaryButton}
          </a>
          <a
            href={secondaryHref}
            className="inline-block px-12 py-5 bg-transparent text-white font-black text-xl border-4 border-white hover:bg-white hover:text-black transition-colors uppercase"
          >
            {secondaryButton}
          </a>
        </div>

        {note && (
          <div className="border-t-2 border-white/20 pt-8">
            <p className="text-gray-400 text-sm">
              {note}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
