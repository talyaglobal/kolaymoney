/**
 * useSEO Hook
 * Easy-to-use hook for updating SEO meta tags
 */

import { useEffect } from 'react'
import { updateMetaTags, updateCanonicalUrl, MetaTagsConfig } from '@/lib/seo/metaTags'

interface SEOConfig extends MetaTagsConfig {
  canonical?: string
}

/**
 * Update SEO meta tags for the current page
 */
export function useSEO(config: SEOConfig) {
  useEffect(() => {
    // Update meta tags
    updateMetaTags(config)

    // Update canonical URL
    if (config.canonical) {
      updateCanonicalUrl(config.canonical)
    }
  }, [config.title, config.description, config.canonical])
}
