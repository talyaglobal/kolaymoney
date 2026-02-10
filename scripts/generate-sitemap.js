/**
 * Sitemap Generator
 * Automatically generates sitemap.xml for better SEO
 */

import { writeFileSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const BASE_URL = 'https://www.kolaymoney.com'

// All sectors
const SECTORS = [
  'beyaz-esya',
  'elektronik',
  'mobilya',
  'otomotiv-b2c',
  'fmcg',
  'insaat',
  'otomotiv-b2b',
  'makine-ekipman',
  'lojistik',
  'tarim'
]

// Generate sitemap URLs
function generateSitemapURLs() {
  const now = new Date().toISOString().split('T')[0]
  
  const urls = [
    // Homepage - highest priority
    {
      loc: BASE_URL,
      lastmod: now,
      changefreq: 'daily',
      priority: 1.0
    },
    
    // Sectors list page
    {
      loc: `${BASE_URL}/sektorler`,
      lastmod: now,
      changefreq: 'weekly',
      priority: 0.9
    },
    
    // Application pages
    {
      loc: `${BASE_URL}/basvuru`,
      lastmod: now,
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      loc: `${BASE_URL}/basvuru-yeni`,
      lastmod: now,
      changefreq: 'monthly',
      priority: 0.9
    },
    
    // Individual sector pages
    ...SECTORS.map(sector => ({
      loc: `${BASE_URL}/sektor/${sector}`,
      lastmod: now,
      changefreq: 'weekly',
      priority: 0.8
    }))
  ]
  
  return urls
}

// Generate XML sitemap
function generateSitemapXML(urls) {
  const urlElements = urls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('')
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlElements}
</urlset>`
}

// Main function
function generateSitemap() {
  try {
    const urls = generateSitemapURLs()
    const xml = generateSitemapXML(urls)
    
    // Write to public directory
    const outputPath = join(process.cwd(), 'public', 'sitemap.xml')
    writeFileSync(outputPath, xml, 'utf-8')
    
    console.log('✅ Sitemap generated successfully!')
    console.log(`📍 Location: ${outputPath}`)
    console.log(`📊 Total URLs: ${urls.length}`)
    console.log('\nURLs included:')
    urls.forEach(url => {
      console.log(`  - ${url.loc} (priority: ${url.priority})`)
    })
  } catch (error) {
    console.error('❌ Error generating sitemap:', error)
    process.exit(1)
  }
}

// Run the generator
generateSitemap()
