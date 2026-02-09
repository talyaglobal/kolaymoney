/**
 * Sektör Verisi Index
 * Tüm sektör verilerini merkezi olarak export eder
 */

import { SectorData, SectorSlug } from '@/types/sector'
import { beyazEsyaData } from './beyazEsya'
import { elektronikData } from './elektronik'
import { lojistikData } from './lojistik'
import { tarimData } from './tarim'
import { mobilyaData } from './mobilya'
import { otomotivB2CData } from './otomotivB2C'
import { fmcgData } from './fmcg'
import { insaatData } from './insaat'
import { otomotivB2BData } from './otomotivB2B'
import { makineEkipmanData } from './makineEkipman'

export const SECTORS_DATA: Record<SectorSlug, SectorData> = {
  'beyaz-esya': beyazEsyaData,
  'elektronik': elektronikData,
  'lojistik': lojistikData,
  'tarim': tarimData,
  'mobilya': mobilyaData,
  'otomotiv-b2c': otomotivB2CData,
  'fmcg': fmcgData,
  'insaat': insaatData,
  'otomotiv-b2b': otomotivB2BData,
  'makine-ekipman': makineEkipmanData,
}

/**
 * Sektör listesi (sıralı)
 */
export const SECTORS_LIST: SectorSlug[] = [
  'beyaz-esya',
  'elektronik',
  'lojistik',
  'tarim',
  'mobilya',
  'otomotiv-b2c',
  'fmcg',
  'insaat',
  'otomotiv-b2b',
  'makine-ekipman',
]

/**
 * Sektör verisi getir
 */
export function getSectorData(slug: SectorSlug): SectorData | null {
  return SECTORS_DATA[slug] || null
}

/**
 * Tüm sektörleri getir
 */
export function getAllSectors(): SectorData[] {
  return SECTORS_LIST.map(slug => SECTORS_DATA[slug]).filter(Boolean)
}

/**
 * Kategoriye göre sektörleri getir
 */
export function getSectorsByCategory(category: 'B2C' | 'B2B'): SectorData[] {
  return getAllSectors().filter(sector => sector.category === category)
}
