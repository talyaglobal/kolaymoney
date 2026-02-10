/**
 * SEO Meta Tags Utilities
 * Dynamic meta tag management for better SEO
 */

export interface MetaTagsConfig {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: string
}

/**
 * Update page meta tags dynamically
 */
export function updateMetaTags(config: MetaTagsConfig) {
  const {
    title,
    description,
    keywords,
    image,
    url,
    type = 'website'
  } = config

  // Update title
  if (title) {
    document.title = title
    updateMetaTag('property', 'og:title', title)
    updateMetaTag('property', 'twitter:title', title)
  }

  // Update description
  if (description) {
    updateMetaTag('name', 'description', description)
    updateMetaTag('property', 'og:description', description)
    updateMetaTag('property', 'twitter:description', description)
  }

  // Update keywords
  if (keywords && keywords.length > 0) {
    updateMetaTag('name', 'keywords', keywords.join(', '))
  }

  // Update image
  if (image) {
    updateMetaTag('property', 'og:image', image)
    updateMetaTag('property', 'twitter:image', image)
  }

  // Update URL
  if (url) {
    updateMetaTag('property', 'og:url', url)
    updateMetaTag('property', 'twitter:url', url)
  }

  // Update type
  updateMetaTag('property', 'og:type', type)
}

/**
 * Update or create a meta tag
 */
function updateMetaTag(attribute: string, key: string, value: string) {
  let element = document.querySelector(`meta[${attribute}="${key}"]`)
  
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  
  element.setAttribute('content', value)
}

/**
 * Update canonical URL
 */
export function updateCanonicalUrl(path: string) {
  const baseUrl = 'https://www.kolaymoney.com'
  const fullUrl = `${baseUrl}${path}`
  
  let canonical = document.querySelector('link[rel="canonical"]')
  
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }
  
  canonical.setAttribute('href', fullUrl)
}

/**
 * Update structured data (JSON-LD)
 */
export function updateStructuredData(data: any) {
  // Remove existing structured data scripts
  const existing = document.querySelectorAll('script[type="application/ld+json"]')
  existing.forEach(script => {
    if (script.textContent && !script.textContent.includes('@type": "FinancialService"')) {
      script.remove()
    }
  })

  // Add new structured data
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify(data)
  document.head.appendChild(script)
}

/**
 * Default meta tags for KolayMoney
 */
export const DEFAULT_META = {
  title: 'KolayMoney.com - Alternatif Finansman Platformu | VDMK İhraçları',
  description: 'İşletmeniz için hızlı ve alternatif finansman çözümleri. Dönen varlıklarınızı, alacaklarınızı veya kira gelirlerinizi sermaye piyasalarında nakde çevirin.',
  keywords: ['VDMK', 'varlığa dayalı menkul kıymet', 'alternatif finansman', 'işletme kredisi', 'alacak finansmanı', 'OMG Capital'],
  image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663029191411/MDfUKPpKMOgtIrVO.png',
  url: 'https://www.kolaymoney.com'
}

/**
 * Generate page-specific meta tags
 */
export function generatePageMeta(page: string, data?: any): MetaTagsConfig {
  switch (page) {
    case 'home':
      return DEFAULT_META

    case 'sectors-list':
      return {
        title: 'Sektörler - VDMK Finansman Çözümleri | KolayMoney',
        description: '10 farklı sektör için özel VDMK finansman çözümleri. Beyaz eşya, elektronik, mobilya, otomotiv, FMCG, inşaat ve daha fazlası.',
        keywords: ['sektörel finansman', 'VDMK sektörler', 'işletme kredisi sektörler'],
        url: 'https://www.kolaymoney.com/sektorler'
      }

    case 'sector-detail':
      return {
        title: `${data.title} VDMK Finansman | KolayMoney`,
        description: data.description,
        keywords: data.keywords,
        url: `https://www.kolaymoney.com/sektor/${data.slug}`
      }

    case 'application':
      return {
        title: 'VDMK Başvuru Formu | KolayMoney',
        description: 'VDMK finansman başvurunuzu hemen yapın. Hızlı değerlendirme, rekabetçi oranlar.',
        keywords: ['VDMK başvuru', 'finansman başvurusu', 'işletme kredisi başvuru'],
        url: 'https://www.kolaymoney.com/basvuru-yeni'
      }

    case 'blog-list':
      return {
        title: 'Blog - Finansman Rehberi | KolayMoney',
        description: 'VDMK, alternatif finansman ve işletme yönetimi hakkında güncel içerikler.',
        keywords: ['VDMK rehber', 'finansman blog', 'işletme finansmanı'],
        url: 'https://www.kolaymoney.com/blog'
      }

    case 'blog-post':
      return {
        title: `${data.title} | KolayMoney Blog`,
        description: data.excerpt,
        keywords: data.tags,
        url: `https://www.kolaymoney.com/blog/${data.slug}`,
        type: 'article'
      }

    default:
      return DEFAULT_META
  }
}
