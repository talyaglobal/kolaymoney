/**
 * Structured Data (JSON-LD) Utilities
 * Generate schema.org structured data for better SEO
 */

/**
 * Organization Schema
 * Main company information
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'KolayMoney.com',
    description: 'Alternatif finansman platformu - VDMK ihraçları ile işletme finansmanı',
    url: 'https://www.kolaymoney.com',
    logo: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663029191411/MDfUKPpKMOgtIrVO.png',
    image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663029191411/MDfUKPpKMOgtIrVO.png',
    telephone: '+90-555-868-1634',
    email: 'info@kolaymoney.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'TR',
      addressLocality: 'İstanbul'
    },
    sameAs: [
      'https://www.linkedin.com/company/kolaymoney',
      'https://twitter.com/kolaymoney'
    ],
    founder: {
      '@type': 'Organization',
      name: 'OMG Capital Advisors'
    },
    areaServed: {
      '@type': 'Country',
      name: 'Turkey'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'VDMK Finansman Çözümleri',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'FinancialProduct',
            name: 'Varlığa Dayalı Menkul Kıymet (VDMK)',
            description: 'Dönen varlıklarınızı sermaye piyasalarında nakde çevirin'
          }
        }
      ]
    }
  }
}

/**
 * BreadcrumbList Schema
 * Navigation breadcrumbs
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://www.kolaymoney.com${item.url}`
    }))
  }
}

/**
 * Service Schema
 * For sector-specific pages
 */
export function generateServiceSchema(sector: {
  name: string
  slug: string
  description: string
  minAmount: number
  maxAmount: number
  minTerm: number
  maxTerm: number
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'VDMK Finansman',
    name: `${sector.name} VDMK Finansmanı`,
    description: sector.description,
    provider: {
      '@type': 'FinancialService',
      name: 'KolayMoney.com'
    },
    areaServed: {
      '@type': 'Country',
      name: 'Turkey'
    },
    offers: {
      '@type': 'Offer',
      price: `${sector.minAmount}-${sector.maxAmount}`,
      priceCurrency: 'TRY',
      eligibleRegion: {
        '@type': 'Country',
        name: 'Turkey'
      },
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString()
    },
    url: `https://www.kolaymoney.com/sektor/${sector.slug}`
  }
}

/**
 * FAQPage Schema
 * For FAQ sections
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }
}

/**
 * Article Schema
 * For blog posts
 */
export function generateArticleSchema(article: {
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  publishDate: string
  modifiedDate?: string
  image?: string
  tags?: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.image || 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663029191411/MDfUKPpKMOgtIrVO.png',
    author: {
      '@type': 'Person',
      name: article.author
    },
    publisher: {
      '@type': 'Organization',
      name: 'KolayMoney.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663029191411/MDfUKPpKMOgtIrVO.png'
      }
    },
    datePublished: article.publishDate,
    dateModified: article.modifiedDate || article.publishDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.kolaymoney.com/blog/${article.slug}`
    },
    keywords: article.tags?.join(', ')
  }
}

/**
 * WebPage Schema
 * Generic page schema
 */
export function generateWebPageSchema(page: {
  title: string
  description: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.description,
    url: `https://www.kolaymoney.com${page.url}`,
    publisher: {
      '@type': 'Organization',
      name: 'KolayMoney.com'
    },
    inLanguage: 'tr-TR',
    isPartOf: {
      '@type': 'WebSite',
      name: 'KolayMoney.com',
      url: 'https://www.kolaymoney.com'
    }
  }
}

/**
 * HowTo Schema
 * For process/guide pages
 */
export function generateHowToSchema(guide: {
  name: string
  description: string
  steps: Array<{ name: string; text: string; image?: string }>
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: guide.name,
    description: guide.description,
    step: guide.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image
    }))
  }
}

/**
 * Helper to inject structured data into page
 */
export function injectStructuredData(data: any, id?: string) {
  // Remove existing script with same ID if provided
  if (id) {
    const existing = document.getElementById(id)
    if (existing) {
      existing.remove()
    }
  }

  const script = document.createElement('script')
  script.type = 'application/ld+json'
  if (id) {
    script.id = id
  }
  script.textContent = JSON.stringify(data)
  document.head.appendChild(script)
}
