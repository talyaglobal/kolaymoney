/**
 * Why Not Factoring Page
 * Factoring vs VDMK comparison landing page
 */

import { useEffect } from 'react'
import { Navigation } from '@/components/layout/Navigation'
import { FactoringHero } from '@/components/factoring/FactoringHero'
import { FactoringExplained } from '@/components/factoring/FactoringExplained'
import { VDMKModelExplained } from '@/components/factoring/VDMKModelExplained'
import { BankLimitProblem } from '@/components/factoring/BankLimitProblem'
import { CostComparison } from '@/components/factoring/CostComparison'
import { ComparisonTable } from '@/components/factoring/ComparisonTable'
import { NetCashVisualComparison } from '@/components/comparisons/NetCashVisualComparison'
import { VDMKFactoringCalculator } from '@/components/calculators/VDMKFactoringCalculator'
import { ThreeProblemsSection } from '@/components/factoring/ThreeProblemsSection'
import { WhoIsItForSection } from '@/components/factoring/WhoIsItForSection'
import { TransitionCTA } from '@/components/factoring/TransitionCTA'
import { FinalCTA } from '@/components/factoring/FinalCTA'
import { useSEO } from '@/hooks/useSEO'
import { useAnalytics } from '@/contexts/AnalyticsContext'
import { generateServiceSchema, generateBreadcrumbSchema, injectStructuredData } from '@/lib/seo/structuredData'

export function WhyNotFactoringPage() {
  const analytics = useAnalytics()

  // SEO optimization
  useSEO({
    title: 'Neden Factoring Değil? VDMK ile Bilanço Dışı Finansman | KolayMoney',
    description: 'Factoring vs VDMK karşılaştırması. Kolaymoney modeli ile ticari alacaklarınızı bilanço dışı, ölçeklenebilir ve yatırımcı tabanlı finansmana dönüştürün.',
    keywords: [
      'factoring alternatifi',
      'vdmk nedir',
      'factoring vs menkul kıymetleştirme',
      'bilanço dışı finansman',
      'factoring dezavantajları',
      'sermaye piyasası finansmanı',
      'ticari alacak finansmanı',
      'factoring limiti'
    ],
    canonical: '/neden-factoring-degil'
  })

  // Track page view and add structured data
  useEffect(() => {
    // Track analytics (using existing method)
    analytics.trackMenuClick('Neden Factoring Değil')

    // Add service schema
    injectStructuredData(generateServiceSchema({
      name: 'VDMK Finansman Çözümü',
      slug: 'vdmk-finansman',
      description: 'Factoring alternatifi olarak VDMK ile bilanço dışı, ölçeklenebilir finansman çözümü',
      minAmount: 500000,
      maxAmount: 50000000,
      minTerm: 3,
      maxTerm: 24
    }), 'service-schema')

    // Add breadcrumb schema
    injectStructuredData(generateBreadcrumbSchema([
      { name: 'Ana Sayfa', url: '/' },
      { name: 'Neden Factoring Değil?', url: '/neden-factoring-degil' }
    ]), 'breadcrumb-schema')

    // Add FAQ schema
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'Factoring ile VDMK arasındaki temel fark nedir?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Factoring bir kredi ürünüdür ve bilançoda borç olarak görünür. VDMK ise SPK düzenlemeli bir sermaye piyasası ürünüdür ve bilanço dışı kalır, gerçek satış niteliğindedir.'
          }
        },
        {
          '@type': 'Question',
          'name': 'VDMK factoring\'den daha mı avantajlı?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'VDMK bilanço dışı kalması, ölçeklenebilirliği, sermaye piyasası erişimi ve tekrarlanabilir yapısı ile factoring\'e göre stratejik avantajlar sunar.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Factoring limitleri dolduğunda ne yapmalıyım?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Kolaymoney VDMK modeli ile sermaye piyasası yatırımcılarından finansman sağlayarak factoring limitlerinden bağımsız büyüyebilirsiniz.'
          }
        }
      ]
    }
    injectStructuredData(faqSchema, 'faq-schema')
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation variant="default" />

      {/* Hero Section */}
      <FactoringHero />

      {/* Net Nakit Karşılaştırması */}
      <NetCashVisualComparison />

      {/* Factoring Explained */}
      <FactoringExplained />

      {/* VDMK Model Explained */}
      <VDMKModelExplained />

      {/* Bank Limit Problem */}
      <BankLimitProblem />

      {/* Cost Comparison */}
      <CostComparison />

      {/* İnteraktif Hesaplayıcı */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <VDMKFactoringCalculator />
        </div>
      </section>

      {/* Comparison Table */}
      <ComparisonTable />

      {/* Three Problems Solved */}
      <ThreeProblemsSection />

      {/* Who Is It For */}
      <WhoIsItForSection />

      {/* Transition CTA - Yellow Button */}
      <TransitionCTA />

      {/* Final CTA */}
      <FinalCTA />
    </div>
  )
}
