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

// Use case IDs for each sector (3 per sector = 30 total)
const USE_CASE_IDS = {
  'beyaz-esya': ['beyaz-esya-1', 'beyaz-esya-2', 'beyaz-esya-3'],
  'elektronik': ['elektronik-1', 'elektronik-2', 'elektronik-3'],
  'mobilya': ['mobilya-1', 'mobilya-2', 'mobilya-3'],
  'otomotiv-b2c': ['otomotiv-b2c-1', 'otomotiv-b2c-2', 'otomotiv-b2c-3'],
  'fmcg': ['fmcg-1', 'fmcg-2', 'fmcg-3'],
  'insaat': ['insaat-1', 'insaat-2', 'insaat-3'],
  'otomotiv-b2b': ['otomotiv-b2b-1', 'otomotiv-b2b-2', 'otomotiv-b2b-3'],
  'makine-ekipman': ['makine-ekipman-1', 'makine-ekipman-2', 'makine-ekipman-3'],
  'lojistik': ['lojistik-1', 'lojistik-2', 'lojistik-3'],
  'tarim': ['tarim-1', 'tarim-2', 'tarim-3']
}

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
    
    // Factoring comparison pages
    {
      loc: `${BASE_URL}/neden-factoring-degil`,
      lastmod: now,
      changefreq: 'monthly',
      priority: 0.85
    },
    {
      loc: `${BASE_URL}/factoring-gecis-rehberi`,
      lastmod: now,
      changefreq: 'monthly',
      priority: 0.85
    },
    
    // Service pages
    {
      loc: `${BASE_URL}/hizmetler/on-basvuru-degerlendirme`,
      lastmod: now,
      changefreq: 'monthly',
      priority: 0.85
    },
    {
      loc: `${BASE_URL}/hizmetler/fonlara-referral`,
      lastmod: now,
      changefreq: 'monthly',
      priority: 0.85
    },
    {
      loc: `${BASE_URL}/hizmetler/originator-scoring`,
      lastmod: now,
      changefreq: 'monthly',
      priority: 0.85
    },
    
    // Individual sector pages
    ...SECTORS.map(sector => ({
      loc: `${BASE_URL}/sektor/${sector}`,
      lastmod: now,
      changefreq: 'weekly',
      priority: 0.8
    })),
    
    // Sector-specific application pages
    ...SECTORS.map(sector => ({
      loc: `${BASE_URL}/sektor/${sector}/basvuru`,
      lastmod: now,
      changefreq: 'monthly',
      priority: 0.85
    })),
    
    // Use case application pages (30 pages: 10 sectors x 3 use cases)
    ...SECTORS.flatMap(sector => 
      USE_CASE_IDS[sector].map(useCaseId => ({
        loc: `${BASE_URL}/sektor/${sector}/senaryo/${useCaseId}/basvuru`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.75
      }))
    )
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
