/**
 * Sektörel Uygunluk Soruları
 * Her sektör için 10 soru (toplam 100 soru)
 */

import { SectorQuestion } from '@/types/compliance'

export const SECTOR_QUESTIONS: SectorQuestion[] = [
  // ============================================
  // 1. BEYAZ EŞYA & KÜÇÜK EV ALETLERİ
  // ============================================
  {
    id: 'beyaz-esya-1',
    sectorSlug: 'beyaz-esya',
    questionText: 'Şirketinizin faaliyet süresi kaç yıldır?',
    questionType: 'single_choice',
    weight: 8,
    category: 'experience',
    isRequired: true,
    orderIndex: 1,
    isActive: true,
    options: [
      { id: '1', label: '0-1 yıl', score: 20 },
      { id: '2', label: '1-3 yıl', score: 60 },
      { id: '3', label: '3-5 yıl', score: 80 },
      { id: '4', label: '5+ yıl', score: 100 }
    ],
    helpText: 'Minimum 6 aylık faaliyet gereklidir'
  },
  {
    id: 'beyaz-esya-2',
    sectorSlug: 'beyaz-esya',
    questionText: 'Yıllık cirosunuz hangi aralıkta?',
    questionType: 'single_choice',
    weight: 10,
    category: 'financial',
    isRequired: true,
    orderIndex: 2,
    isActive: true,
    options: [
      { id: '1', label: '0-5M TL', score: 30 },
      { id: '2', label: '5-10M TL', score: 70 },
      { id: '3', label: '10-25M TL', score: 90 },
      { id: '4', label: '25M+ TL', score: 100 }
    ],
    helpText: 'Minimum 5M TL yıllık ciro şartı'
  },
  {
    id: 'beyaz-esya-3',
    sectorSlug: 'beyaz-esya',
    questionText: 'Satışlarınızın yüzde kaçı taksitli/vadeli?',
    questionType: 'single_choice',
    weight: 9,
    category: 'operational',
    isRequired: true,
    orderIndex: 3,
    isActive: true,
    options: [
      { id: '1', label: '%0-30', score: 30 },
      { id: '2', label: '%30-50', score: 60 },
      { id: '3', label: '%50-70', score: 85 },
      { id: '4', label: '%70+', score: 100 }
    ],
    helpText: 'VDMK için minimum %30 vadeli satış oranı önerilir'
  },
  {
    id: 'beyaz-esya-4',
    sectorSlug: 'beyaz-esya',
    questionText: 'Ortalama taksit/vade süreniz ne kadar?',
    questionType: 'single_choice',
    weight: 7,
    category: 'operational',
    isRequired: true,
    orderIndex: 4,
    isActive: true,
    options: [
      { id: '1', label: '0-3 ay', score: 60 },
      { id: '2', label: '3-6 ay', score: 85 },
      { id: '3', label: '6-12 ay', score: 100 },
      { id: '4', label: '12+ ay', score: 90 }
    ]
  },
  {
    id: 'beyaz-esya-5',
    sectorSlug: 'beyaz-esya',
    questionText: 'Taksit alacaklarınızın tahsilat performansı nedir?',
    questionType: 'single_choice',
    weight: 10,
    category: 'financial',
    isRequired: true,
    orderIndex: 5,
    isActive: true,
    options: [
      { id: '1', label: '%80 altı', score: 20, isQualifying: false },
      { id: '2', label: '%80-90', score: 70 },
      { id: '3', label: '%90-95', score: 90 },
      { id: '4', label: '%95+', score: 100 }
    ],
    helpText: 'Minimum %90 tahsilat performansı gereklidir'
  },
  {
    id: 'beyaz-esya-6',
    sectorSlug: 'beyaz-esya',
    questionText: 'Mevcut aylık taksit alacak tutarınız ne kadardır?',
    questionType: 'single_choice',
    weight: 8,
    category: 'financial',
    isRequired: true,
    orderIndex: 6,
    isActive: true,
    options: [
      { id: '1', label: '0-2M TL', score: 50 },
      { id: '2', label: '2-5M TL', score: 75 },
      { id: '3', label: '5-10M TL', score: 90 },
      { id: '4', label: '10M+ TL', score: 100 }
    ]
  },
  {
    id: 'beyaz-esya-7',
    sectorSlug: 'beyaz-esya',
    questionText: 'Kaç adet satış noktanız/mağazanız var?',
    questionType: 'single_choice',
    weight: 6,
    category: 'operational',
    isRequired: true,
    orderIndex: 7,
    isActive: true,
    options: [
      { id: '1', label: 'Sadece online', score: 70 },
      { id: '2', label: '1-5 nokta', score: 80 },
      { id: '3', label: '5-15 nokta', score: 95 },
      { id: '4', label: '15+ nokta', score: 100 }
    ]
  },
  {
    id: 'beyaz-esya-8',
    sectorSlug: 'beyaz-esya',
    questionText: 'POS cihazı kullanıyor musunuz?',
    questionType: 'yes_no',
    weight: 7,
    category: 'operational',
    isRequired: true,
    orderIndex: 8,
    isActive: true,
    options: [
      { id: 'yes', label: 'Evet', score: 100 },
      { id: 'no', label: 'Hayır', score: 40 }
    ]
  },
  {
    id: 'beyaz-esya-9',
    sectorSlug: 'beyaz-esya',
    questionText: 'Tedarikçilerinize ödeme vadeniz ne kadar?',
    questionType: 'single_choice',
    weight: 5,
    category: 'operational',
    isRequired: true,
    orderIndex: 9,
    isActive: true,
    options: [
      { id: '1', label: 'Peşin', score: 60 },
      { id: '2', label: '15-30 gün', score: 85 },
      { id: '3', label: '30-60 gün', score: 100 },
      { id: '4', label: '60+ gün', score: 95 }
    ]
  },
  {
    id: 'beyaz-esya-10',
    sectorSlug: 'beyaz-esya',
    questionText: 'Yasal takipteki (icra/dava) alacağınız var mı?',
    questionType: 'single_choice',
    weight: 9,
    category: 'legal',
    isRequired: true,
    orderIndex: 10,
    isActive: true,
    options: [
      { id: '1', label: 'Evet, %10\'dan fazla', score: 30 },
      { id: '2', label: 'Evet, %10\'dan az', score: 70 },
      { id: '3', label: 'Hayır', score: 100 }
    ]
  },

  // ============================================
  // 2. ELEKTRONİK
  // ============================================
  {
    id: 'elektronik-1',
    sectorSlug: 'elektronik',
    questionText: 'Şirketinizin faaliyet süresi kaç yıldır?',
    questionType: 'single_choice',
    weight: 8,
    category: 'experience',
    isRequired: true,
    orderIndex: 1,
    isActive: true,
    options: [
      { id: '1', label: '0-1 yıl', score: 20 },
      { id: '2', label: '1-3 yıl', score: 60 },
      { id: '3', label: '3-5 yıl', score: 80 },
      { id: '4', label: '5+ yıl', score: 100 }
    ]
  },
  {
    id: 'elektronik-2',
    sectorSlug: 'elektronik',
    questionText: 'Yıllık cirosunuz hangi aralıkta?',
    questionType: 'single_choice',
    weight: 10,
    category: 'financial',
    isRequired: true,
    orderIndex: 2,
    isActive: true,
    options: [
      { id: '1', label: '0-5M TL', score: 30 },
      { id: '2', label: '5-15M TL', score: 70 },
      { id: '3', label: '15-50M TL', score: 90 },
      { id: '4', label: '50M+ TL', score: 100 }
    ]
  },
  {
    id: 'elektronik-3',
    sectorSlug: 'elektronik',
    questionText: 'Hangi ürün kategorilerinde faaliyet gösteriyorsunuz?',
    questionType: 'multiple_choice',
    weight: 6,
    category: 'operational',
    isRequired: true,
    orderIndex: 3,
    isActive: true,
    options: [
      { id: '1', label: 'Akıllı Telefon', score: 25 },
      { id: '2', label: 'Laptop/Tablet', score: 25 },
      { id: '3', label: 'TV/Ses Sistemleri', score: 25 },
      { id: '4', label: 'Küçük Elektronik', score: 15 },
      { id: '5', label: 'Aksesuar', score: 10 }
    ],
    helpText: 'Birden fazla seçebilirsiniz'
  },
  {
    id: 'elektronik-4',
    sectorSlug: 'elektronik',
    questionText: 'Satışlarınızın yüzde kaçı taksitli?',
    questionType: 'single_choice',
    weight: 9,
    category: 'operational',
    isRequired: true,
    orderIndex: 4,
    isActive: true,
    options: [
      { id: '1', label: '%0-40', score: 40 },
      { id: '2', label: '%40-60', score: 70 },
      { id: '3', label: '%60-80', score: 90 },
      { id: '4', label: '%80+', score: 100 }
    ]
  },
  {
    id: 'elektronik-5',
    sectorSlug: 'elektronik',
    questionText: 'Ortalama taksit süresi?',
    questionType: 'single_choice',
    weight: 7,
    category: 'operational',
    isRequired: true,
    orderIndex: 5,
    isActive: true,
    options: [
      { id: '1', label: '3 ay', score: 70 },
      { id: '2', label: '6 ay', score: 90 },
      { id: '3', label: '9 ay', score: 100 },
      { id: '4', label: '12+ ay', score: 95 }
    ]
  },
  {
    id: 'elektronik-6',
    sectorSlug: 'elektronik',
    questionText: 'Tahsilat performansınız?',
    questionType: 'single_choice',
    weight: 10,
    category: 'financial',
    isRequired: true,
    orderIndex: 6,
    isActive: true,
    options: [
      { id: '1', label: '%75 altı', score: 10, isQualifying: false },
      { id: '2', label: '%75-85', score: 60 },
      { id: '3', label: '%85-90', score: 85 },
      { id: '4', label: '%90+', score: 100 }
    ]
  },
  {
    id: 'elektronik-7',
    sectorSlug: 'elektronik',
    questionText: 'Apple, Samsung gibi premium markaların yetkili bayisi misiniz?',
    questionType: 'yes_no',
    weight: 6,
    category: 'operational',
    isRequired: true,
    orderIndex: 7,
    isActive: true,
    options: [
      { id: 'yes', label: 'Evet', score: 100 },
      { id: 'no', label: 'Hayır', score: 70 }
    ]
  },
  {
    id: 'elektronik-8',
    sectorSlug: 'elektronik',
    questionText: 'Stok devir hızınız (yıllık)?',
    questionType: 'single_choice',
    weight: 7,
    category: 'operational',
    isRequired: true,
    orderIndex: 8,
    isActive: true,
    options: [
      { id: '1', label: '2-4 kez', score: 60 },
      { id: '2', label: '4-6 kez', score: 80 },
      { id: '3', label: '6-8 kez', score: 95 },
      { id: '4', label: '8+ kez', score: 100 }
    ]
  },
  {
    id: 'elektronik-9',
    sectorSlug: 'elektronik',
    questionText: 'E-ticaret satış kanalınız var mı?',
    questionType: 'yes_no',
    weight: 5,
    category: 'operational',
    isRequired: true,
    orderIndex: 9,
    isActive: true,
    options: [
      { id: 'yes', label: 'Evet', score: 100 },
      { id: 'no', label: 'Hayır', score: 60 }
    ]
  },
  {
    id: 'elektronik-10',
    sectorSlug: 'elektronik',
    questionText: 'Garanti/servis hizmeti sunuyor musunuz?',
    questionType: 'yes_no',
    weight: 4,
    category: 'operational',
    isRequired: true,
    orderIndex: 10,
    isActive: true,
    options: [
      { id: 'yes', label: 'Evet', score: 100 },
      { id: 'no', label: 'Hayır', score: 80 }
    ]
  },

  // ============================================
  // 3. LOJİSTİK (Öncelikli)
  // ============================================
  {
    id: 'lojistik-1',
    sectorSlug: 'lojistik',
    questionText: 'Faaliyet süreniz?',
    questionType: 'single_choice',
    weight: 8,
    category: 'experience',
    isRequired: true,
    orderIndex: 1,
    isActive: true,
    options: [
      { id: '1', label: '0-1 yıl', score: 20 },
      { id: '2', label: '1-3 yıl', score: 60 },
      { id: '3', label: '3-5 yıl', score: 85 },
      { id: '4', label: '5+ yıl', score: 100 }
    ]
  },
  {
    id: 'lojistik-2',
    sectorSlug: 'lojistik',
    questionText: 'Yıllık cirosunuz?',
    questionType: 'single_choice',
    weight: 10,
    category: 'financial',
    isRequired: true,
    orderIndex: 2,
    isActive: true,
    options: [
      { id: '1', label: '0-10M TL', score: 40 },
      { id: '2', label: '10-30M TL', score: 70 },
      { id: '3', label: '30-80M TL', score: 90 },
      { id: '4', label: '80M+ TL', score: 100 }
    ]
  },
  {
    id: 'lojistik-3',
    sectorSlug: 'lojistik',
    questionText: 'Hizmet tipiniz?',
    questionType: 'multiple_choice',
    weight: 7,
    category: 'operational',
    isRequired: true,
    orderIndex: 3,
    isActive: true,
    options: [
      { id: '1', label: 'Karayolu taşımacılığı', score: 30 },
      { id: '2', label: 'Depolama (3PL)', score: 25 },
      { id: '3', label: 'Dağıtım', score: 25 },
      { id: '4', label: 'E-ticaret lojistiği', score: 20 }
    ]
  },
  {
    id: 'lojistik-4',
    sectorSlug: 'lojistik',
    questionText: 'Vadeli satış oranınız?',
    questionType: 'single_choice',
    weight: 9,
    category: 'operational',
    isRequired: true,
    orderIndex: 4,
    isActive: true,
    options: [
      { id: '1', label: '%50 altı', score: 40 },
      { id: '2', label: '%50-70', score: 70 },
      { id: '3', label: '%70-85', score: 90 },
      { id: '4', label: '%85+', score: 100 }
    ]
  },
  {
    id: 'lojistik-5',
    sectorSlug: 'lojistik',
    questionText: 'Ortalama fatura vadesi?',
    questionType: 'single_choice',
    weight: 8,
    category: 'operational',
    isRequired: true,
    orderIndex: 5,
    isActive: true,
    options: [
      { id: '1', label: '30 gün', score: 70 },
      { id: '2', label: '45 gün', score: 85 },
      { id: '3', label: '60 gün', score: 100 },
      { id: '4', label: '90+ gün', score: 90 }
    ]
  },
  {
    id: 'lojistik-6',
    sectorSlug: 'lojistik',
    questionText: 'Tahsilat performansınız?',
    questionType: 'single_choice',
    weight: 10,
    category: 'financial',
    isRequired: true,
    orderIndex: 6,
    isActive: true,
    options: [
      { id: '1', label: '%85 altı', score: 30, isQualifying: false },
      { id: '2', label: '%85-90', score: 70 },
      { id: '3', label: '%90-95', score: 90 },
      { id: '4', label: '%95+', score: 100 }
    ]
  },
  {
    id: 'lojistik-7',
    sectorSlug: 'lojistik',
    questionText: 'Filo büyüklüğünüz?',
    questionType: 'single_choice',
    weight: 7,
    category: 'operational',
    isRequired: true,
    orderIndex: 7,
    isActive: true,
    options: [
      { id: '1', label: '0-10 araç', score: 60 },
      { id: '2', label: '10-25 araç', score: 80 },
      { id: '3', label: '25-50 araç', score: 95 },
      { id: '4', label: '50+ araç', score: 100 }
    ]
  },
  {
    id: 'lojistik-8',
    sectorSlug: 'lojistik',
    questionText: 'Depo alanınız var mı?',
    questionType: 'yes_no',
    weight: 6,
    category: 'operational',
    isRequired: true,
    orderIndex: 8,
    isActive: true,
    options: [
      { id: 'yes', label: 'Evet, kendi depomuz', score: 100 },
      { id: 'partly', label: 'Evet, kiralık', score: 80 },
      { id: 'no', label: 'Hayır', score: 50 }
    ]
  },
  {
    id: 'lojistik-9',
    sectorSlug: 'lojistik',
    questionText: 'Kaç müşteriniz var?',
    questionType: 'single_choice',
    weight: 6,
    category: 'operational',
    isRequired: true,
    orderIndex: 9,
    isActive: true,
    options: [
      { id: '1', label: '0-20', score: 60 },
      { id: '2', label: '20-50', score: 80 },
      { id: '3', label: '50-150', score: 95 },
      { id: '4', label: '150+', score: 100 }
    ]
  },
  {
    id: 'lojistik-10',
    sectorSlug: 'lojistik',
    questionText: 'ISO 9001 veya benzeri sertifikanız var mı?',
    questionType: 'yes_no',
    weight: 5,
    category: 'legal',
    isRequired: false,
    orderIndex: 10,
    isActive: true,
    options: [
      { id: 'yes', label: 'Evet', score: 100 },
      { id: 'no', label: 'Hayır', score: 70 }
    ]
  },

  // ============================================
  // 4. TARIM (Öncelikli)
  // ============================================
  {
    id: 'tarim-1',
    sectorSlug: 'tarim',
    questionText: 'Faaliyet süreniz?',
    questionType: 'single_choice',
    weight: 8,
    category: 'experience',
    isRequired: true,
    orderIndex: 1,
    isActive: true,
    options: [
      { id: '1', label: '0-2 yıl', score: 30 },
      { id: '2', label: '2-5 yıl', score: 70 },
      { id: '3', label: '5-10 yıl', score: 90 },
      { id: '4', label: '10+ yıl', score: 100 }
    ]
  },
  {
    id: 'tarim-2',
    sectorSlug: 'tarim',
    questionText: 'Yıllık cirosunuz?',
    questionType: 'single_choice',
    weight: 10,
    category: 'financial',
    isRequired: true,
    orderIndex: 2,
    isActive: true,
    options: [
      { id: '1', label: '0-10M TL', score: 40 },
      { id: '2', label: '10-30M TL', score: 70 },
      { id: '3', label: '30-80M TL', score: 90 },
      { id: '4', label: '80M+ TL', score: 100 }
    ]
  },
  {
    id: 'tarim-3',
    sectorSlug: 'tarim',
    questionText: 'Faaliyet alanınız?',
    questionType: 'multiple_choice',
    weight: 7,
    category: 'operational',
    isRequired: true,
    orderIndex: 3,
    isActive: true,
    options: [
      { id: '1', label: 'Traktör/Tarım Makineleri', score: 30 },
      { id: '2', label: 'Tohum/Gübre Distribütörü', score: 25 },
      { id: '3', label: 'Tarımsal İlaç', score: 25 },
      { id: '4', label: 'Sulama Sistemleri', score: 20 }
    ]
  },
  {
    id: 'tarim-4',
    sectorSlug: 'tarim',
    questionText: 'Vadeli satış oranınız?',
    questionType: 'single_choice',
    weight: 9,
    category: 'operational',
    isRequired: true,
    orderIndex: 4,
    isActive: true,
    options: [
      { id: '1', label: '%40 altı', score: 40 },
      { id: '2', label: '%40-60', score: 70 },
      { id: '3', label: '%60-75', score: 90 },
      { id: '4', label: '%75+', score: 100 }
    ]
  },
  {
    id: 'tarim-5',
    sectorSlug: 'tarim',
    questionText: 'Ortalama vade?',
    questionType: 'single_choice',
    weight: 8,
    category: 'operational',
    isRequired: true,
    orderIndex: 5,
    isActive: true,
    options: [
      { id: '1', label: '90 gün', score: 75 },
      { id: '2', label: '120 gün', score: 90 },
      { id: '3', label: '150 gün', score: 100 },
      { id: '4', label: '180+ gün', score: 85 }
    ]
  },
  {
    id: 'tarim-6',
    sectorSlug: 'tarim',
    questionText: 'Tahsilat performansınız?',
    questionType: 'single_choice',
    weight: 10,
    category: 'financial',
    isRequired: true,
    orderIndex: 6,
    isActive: true,
    options: [
      { id: '1', label: '%75 altı', score: 20, isQualifying: false },
      { id: '2', label: '%75-85', score: 60 },
      { id: '3', label: '%85-89', score: 85 },
      { id: '4', label: '%89+', score: 100 }
    ]
  },
  {
    id: 'tarim-7',
    sectorSlug: 'tarim',
    questionText: 'Bayi ağınız var mı?',
    questionType: 'single_choice',
    weight: 7,
    category: 'operational',
    isRequired: true,
    orderIndex: 7,
    isActive: true,
    options: [
      { id: '1', label: 'Hayır', score: 50 },
      { id: '2', label: '1-50 bayi', score: 75 },
      { id: '3', label: '50-200 bayi', score: 90 },
      { id: '4', label: '200+ bayi', score: 100 }
    ]
  },
  {
    id: 'tarim-8',
    sectorSlug: 'tarim',
    questionText: 'Mevsimsel satış dalgalanmanız ne kadar?',
    questionType: 'single_choice',
    weight: 6,
    category: 'operational',
    isRequired: true,
    orderIndex: 8,
    isActive: true,
    options: [
      { id: '1', label: 'Çok yüksek (%80+ fark)', score: 60 },
      { id: '2', label: 'Yüksek (%50-80 fark)', score: 80 },
      { id: '3', label: 'Orta (%30-50 fark)', score: 95 },
      { id: '4', label: 'Düşük (%30 altı)', score: 100 }
    ]
  },
  {
    id: 'tarim-9',
    sectorSlug: 'tarim',
    questionText: 'Üretici misiniz yoksa distribütör mü?',
    questionType: 'single_choice',
    weight: 5,
    category: 'operational',
    isRequired: true,
    orderIndex: 9,
    isActive: true,
    options: [
      { id: '1', label: 'Üretici', score: 100 },
      { id: '2', label: 'İthalatçı', score: 95 },
      { id: '3', label: 'Distribütör', score: 90 },
      { id: '4', label: 'Bayi', score: 70 }
    ]
  },
  {
    id: 'tarim-10',
    sectorSlug: 'tarim',
    questionText: 'Tarım Bakanlığı onaylı ürünleriniz var mı?',
    questionType: 'yes_no',
    weight: 6,
    category: 'legal',
    isRequired: true,
    orderIndex: 10,
    isActive: true,
    options: [
      { id: 'yes', label: 'Evet', score: 100 },
      { id: 'no', label: 'Hayır', score: 60 }
    ]
  },

  // ============================================
  // 5. MOBİLYA
  // ============================================
  {
    id: 'mobilya-1',
    sectorSlug: 'mobilya',
    questionText: 'Mobilya sektöründe kaç yıldır faaliyet gösteriyorsunuz?',
    questionType: 'single_choice',
    weight: 7,
    category: 'experience',
    isRequired: true,
    orderIndex: 1,
    isActive: true,
    options: [
      { id: '1', label: '0-2 yıl', score: 30 },
      { id: '2', label: '2-5 yıl', score: 70 },
      { id: '3', label: '5-10 yıl', score: 90 },
      { id: '4', label: '10+ yıl', score: 100 }
    ]
  },
  {
    id: 'mobilya-2',
    sectorSlug: 'mobilya',
    questionText: 'Yıllık cirosunuz?',
    questionType: 'single_choice',
    weight: 10,
    category: 'financial',
    isRequired: true,
    orderIndex: 2,
    isActive: true,
    options: [
      { id: '1', label: '0-3M TL', score: 20 },
      { id: '2', label: '3-8M TL', score: 60 },
      { id: '3', label: '8-20M TL', score: 85 },
      { id: '4', label: '20M+ TL', score: 100 }
    ]
  },
  {
    id: 'mobilya-3',
    sectorSlug: 'mobilya',
    questionText: 'Aylık ortalama alacak tutarınız?',
    questionType: 'single_choice',
    weight: 9,
    category: 'financial',
    isRequired: true,
    orderIndex: 3,
    isActive: true,
    options: [
      { id: '1', label: '0-500K TL', score: 40 },
      { id: '2', label: '500K-1M TL', score: 70 },
      { id: '3', label: '1M-3M TL', score: 90 },
      { id: '4', label: '3M+ TL', score: 100 }
    ]
  },
  {
    id: 'mobilya-4',
    sectorSlug: 'mobilya',
    questionText: 'Taksitli satış oranınız?',
    questionType: 'single_choice',
    weight: 8,
    category: 'operational',
    isRequired: true,
    orderIndex: 4,
    isActive: true,
    options: [
      { id: '1', label: '%0-20', score: 30 },
      { id: '2', label: '%20-40', score: 60 },
      { id: '3', label: '%40-60', score: 80 },
      { id: '4', label: '%60+', score: 100 }
    ]
  },
  {
    id: 'mobilya-5',
    sectorSlug: 'mobilya',
    questionText: 'Ortalama vade süreniz (gün)?',
    questionType: 'single_choice',
    weight: 7,
    category: 'operational',
    isRequired: true,
    orderIndex: 5,
    isActive: true,
    options: [
      { id: '1', label: '0-30 gün', score: 60 },
      { id: '2', label: '30-60 gün', score: 80 },
      { id: '3', label: '60-90 gün', score: 90 },
      { id: '4', label: '90+ gün', score: 100 }
    ]
  },
  {
    id: 'mobilya-6',
    sectorSlug: 'mobilya',
    questionText: 'Kaç satış noktanız var?',
    questionType: 'single_choice',
    weight: 6,
    category: 'operational',
    isRequired: true,
    orderIndex: 6,
    isActive: true,
    options: [
      { id: '1', label: '1-2 mağaza', score: 50 },
      { id: '2', label: '3-5 mağaza', score: 75 },
      { id: '3', label: '6-10 mağaza', score: 90 },
      { id: '4', label: '10+ mağaza', score: 100 }
    ]
  },
  {
    id: 'mobilya-7',
    sectorSlug: 'mobilya',
    questionText: 'Üretim mi yapıyorsunuz yoksa sadece satış mı?',
    questionType: 'single_choice',
    weight: 6,
    category: 'operational',
    isRequired: true,
    orderIndex: 7,
    isActive: true,
    options: [
      { id: '1', label: 'Sadece satış', score: 60 },
      { id: '2', label: 'Satış + Montaj', score: 75 },
      { id: '3', label: 'Üretim + Satış', score: 90 },
      { id: '4', label: 'Tam entegre üretim', score: 100 }
    ]
  },
  {
    id: 'mobilya-8',
    sectorSlug: 'mobilya',
    questionText: 'Vergi borcu var mı?',
    questionType: 'yes_no',
    weight: 5,
    category: 'legal',
    isRequired: true,
    orderIndex: 8,
    isActive: true,
    options: [
      { id: 'yes', label: 'Evet', score: 0, isQualifying: true },
      { id: 'no', label: 'Hayır', score: 100 }
    ]
  },
  {
    id: 'mobilya-9',
    sectorSlug: 'mobilya',
    questionText: 'TSE belgeleriniz var mı?',
    questionType: 'yes_no',
    weight: 5,
    category: 'legal',
    isRequired: true,
    orderIndex: 9,
    isActive: true,
    options: [
      { id: 'yes', label: 'Evet', score: 100 },
      { id: 'no', label: 'Hayır', score: 70 }
    ]
  },
  {
    id: 'mobilya-10',
    sectorSlug: 'mobilya',
    questionText: 'Müşteri portföyünüzde kurumsal firmalar var mı?',
    questionType: 'yes_no',
    weight: 4,
    category: 'operational',
    isRequired: true,
    orderIndex: 10,
    isActive: true,
    options: [
      { id: 'yes', label: 'Evet', score: 100 },
      { id: 'no', label: 'Hayır', score: 60 }
    ]
  },

  // ============================================
  // 6. OTOMOTİV B2C (Galeri, Servis)
  // ============================================
  {
    id: 'otomotiv-b2c-1',
    sectorSlug: 'otomotiv-b2c',
    questionText: 'Otomotiv sektöründe kaç yıldır faaliyet gösteriyorsunuz?',
    questionType: 'single_choice',
    weight: 8,
    category: 'experience',
    isRequired: true,
    orderIndex: 1,
    isActive: true,
    options: [
      { id: '1', label: '0-2 yıl', score: 30 },
      { id: '2', label: '2-5 yıl', score: 70 },
      { id: '3', label: '5-10 yıl', score: 90 },
      { id: '4', label: '10+ yıl', score: 100 }
    ]
  },
  {
    id: 'otomotiv-b2c-2',
    sectorSlug: 'otomotiv-b2c',
    questionText: 'Yıllık cirosunuz?',
    questionType: 'single_choice',
    weight: 10,
    category: 'financial',
    isRequired: true,
    orderIndex: 2,
    isActive: true,
    options: [
      { id: '1', label: '0-10M TL', score: 30 },
      { id: '2', label: '10-25M TL', score: 70 },
      { id: '3', label: '25-50M TL', score: 90 },
      { id: '4', label: '50M+ TL', score: 100 }
    ]
  },
  {
    id: 'otomotiv-b2c-3',
    sectorSlug: 'otomotiv-b2c',
    questionText: 'Aylık ortalama alacak tutarınız?',
    questionType: 'single_choice',
    weight: 9,
    category: 'financial',
    isRequired: true,
    orderIndex: 3,
    isActive: true,
    options: [
      { id: '1', label: '0-1M TL', score: 40 },
      { id: '2', label: '1M-3M TL', score: 70 },
      { id: '3', label: '3M-5M TL', score: 90 },
      { id: '4', label: '5M+ TL', score: 100 }
    ]
  },
  {
    id: 'otomotiv-b2c-4',
    sectorSlug: 'otomotiv-b2c',
    questionText: 'Taksitli satış oranınız?',
    questionType: 'single_choice',
    weight: 8,
    category: 'operational',
    isRequired: true,
    orderIndex: 4,
    isActive: true,
    options: [
      { id: '1', label: '%0-30', score: 40 },
      { id: '2', label: '%30-50', score: 70 },
      { id: '3', label: '%50-70', score: 90 },
      { id: '4', label: '%70+', score: 100 }
    ]
  },
  {
    id: 'otomotiv-b2c-5',
    sectorSlug: 'otomotiv-b2c',
    questionText: 'Yetkili servisiniz var mı?',
    questionType: 'yes_no',
    weight: 7,
    category: 'operational',
    isRequired: true,
    orderIndex: 5,
    isActive: true,
    options: [
      { id: 'yes', label: 'Evet', score: 100 },
      { id: 'no', label: 'Hayır', score: 60 }
    ]
  },
  {
    id: 'otomotiv-b2c-6',
    sectorSlug: 'otomotiv-b2c',
    questionText: 'Kaç showroom/galeriniz var?',
    questionType: 'single_choice',
    weight: 6,
    category: 'operational',
    isRequired: true,
    orderIndex: 6,
    isActive: true,
    options: [
      { id: '1', label: '1 nokta', score: 60 },
      { id: '2', label: '2-3 nokta', score: 80 },
      { id: '3', label: '4-5 nokta', score: 90 },
      { id: '4', label: '5+ nokta', score: 100 }
    ]
  },
  {
    id: 'otomotiv-b2c-7',
    sectorSlug: 'otomotiv-b2c',
    questionText: 'Hangi marka/markaları temsil ediyorsunuz?',
    questionType: 'single_choice',
    weight: 7,
    category: 'operational',
    isRequired: true,
    orderIndex: 7,
    isActive: true,
    options: [
      { id: '1', label: 'Sadece 2. el', score: 50 },
      { id: '2', label: '1 marka yetkili bayi', score: 80 },
      { id: '3', label: '2+ marka yetkili bayi', score: 100 },
      { id: '4', label: 'Premium marka', score: 100 }
    ]
  },
  {
    id: 'otomotiv-b2c-8',
    sectorSlug: 'otomotiv-b2c',
    questionText: 'Vergi/SGK borcu var mı?',
    questionType: 'yes_no',
    weight: 5,
    category: 'legal',
    isRequired: true,
    orderIndex: 8,
    isActive: true,
    options: [
      { id: 'yes', label: 'Evet', score: 0, isQualifying: true },
      { id: 'no', label: 'Hayır', score: 100 }
    ]
  },
  {
    id: 'otomotiv-b2c-9',
    sectorSlug: 'otomotiv-b2c',
    questionText: 'Ticaret Odası kaydınız aktif mi?',
    questionType: 'yes_no',
    weight: 4,
    category: 'legal',
    isRequired: true,
    orderIndex: 9,
    isActive: true,
    options: [
      { id: 'yes', label: 'Evet', score: 100 },
      { id: 'no', label: 'Hayır', score: 0, isQualifying: true }
    ]
  },
  {
    id: 'otomotiv-b2c-10',
    sectorSlug: 'otomotiv-b2c',
    questionText: 'Banka kredisi kullanıyor musunuz?',
    questionType: 'yes_no',
    weight: 6,
    category: 'financial',
    isRequired: true,
    orderIndex: 10,
    isActive: true,
    options: [
      { id: 'yes', label: 'Evet, düzenli ödüyorum', score: 100 },
      { id: 'no', label: 'Hayır', score: 70 }
    ]
  },

  // ============================================
  // 7. FMCG (Hızlı Tüketim Malları)
  // ============================================
  {
    id: 'fmcg-1',
    sectorSlug: 'fmcg',
    questionText: 'FMCG sektöründe kaç yıldır faaliyet gösteriyorsunuz?',
    questionType: 'single_choice',
    weight: 7,
    category: 'experience',
    isRequired: true,
    orderIndex: 1,
    isActive: true,
    options: [
      { id: '1', label: '0-2 yıl', score: 40 },
      { id: '2', label: '2-5 yıl', score: 70 },
      { id: '3', label: '5-10 yıl', score: 90 },
      { id: '4', label: '10+ yıl', score: 100 }
    ]
  },
  {
    id: 'fmcg-2',
    sectorSlug: 'fmcg',
    questionText: 'Yıllık cirosunuz?',
    questionType: 'single_choice',
    weight: 10,
    category: 'financial',
    isRequired: true,
    orderIndex: 2,
    isActive: true,
    options: [
      { id: '1', label: '0-5M TL', score: 30 },
      { id: '2', label: '5-15M TL', score: 70 },
      { id: '3', label: '15-30M TL', score: 90 },
      { id: '4', label: '30M+ TL', score: 100 }
    ]
  },
  {
    id: 'fmcg-3',
    sectorSlug: 'fmcg',
    questionText: 'Aylık ortalama alacak tutarınız?',
    questionType: 'single_choice',
    weight: 9,
    category: 'financial',
    isRequired: true,
    orderIndex: 3,
    isActive: true,
    options: [
      { id: '1', label: '0-500K TL', score: 40 },
      { id: '2', label: '500K-1.5M TL', score: 70 },
      { id: '3', label: '1.5M-3M TL', score: 90 },
      { id: '4', label: '3M+ TL', score: 100 }
    ]
  },
  {
    id: 'fmcg-4',
    sectorSlug: 'fmcg',
    questionText: 'Vadeli satış oranınız?',
    questionType: 'single_choice',
    weight: 8,
    category: 'operational',
    isRequired: true,
    orderIndex: 4,
    isActive: true,
    options: [
      { id: '1', label: '%0-20', score: 30 },
      { id: '2', label: '%20-50', score: 70 },
      { id: '3', label: '%50-70', score: 90 },
      { id: '4', label: '%70+', score: 100 }
    ]
  },
  {
    id: 'fmcg-5',
    sectorSlug: 'fmcg',
    questionText: 'Ortalama vade süreniz (gün)?',
    questionType: 'single_choice',
    weight: 7,
    category: 'operational',
    isRequired: true,
    orderIndex: 5,
    isActive: true,
    options: [
      { id: '1', label: '0-30 gün', score: 70 },
      { id: '2', label: '30-60 gün', score: 85 },
      { id: '3', label: '60-90 gün', score: 95 },
      { id: '4', label: '90+ gün', score: 100 }
    ]
  },
  {
    id: 'fmcg-6',
    sectorSlug: 'fmcg',
    questionText: 'Kaç distribütör/bayi ile çalışıyorsunuz?',
    questionType: 'single_choice',
    weight: 6,
    category: 'operational',
    isRequired: true,
    orderIndex: 6,
    isActive: true,
    options: [
      { id: '1', label: '1-10 bayi', score: 50 },
      { id: '2', label: '10-50 bayi', score: 75 },
      { id: '3', label: '50-100 bayi', score: 90 },
      { id: '4', label: '100+ bayi', score: 100 }
    ]
  },
  {
    id: 'fmcg-7',
    sectorSlug: 'fmcg',
    questionText: 'Depo/lojistik altyapınız var mı?',
    questionType: 'yes_no',
    weight: 6,
    category: 'operational',
    isRequired: true,
    orderIndex: 7,
    isActive: true,
    options: [
      { id: 'yes', label: 'Evet, kendi depomuz var', score: 100 },
      { id: 'no', label: 'Hayır, 3. parti kullanıyoruz', score: 70 }
    ]
  },
  {
    id: 'fmcg-8',
    sectorSlug: 'fmcg',
    questionText: 'Gıda Güvenlik Belgesi (ISO 22000) var mı?',
    questionType: 'yes_no',
    weight: 5,
    category: 'legal',
    isRequired: true,
    orderIndex: 8,
    isActive: true,
    options: [
      { id: 'yes', label: 'Evet', score: 100 },
      { id: 'no', label: 'Hayır', score: 60 }
    ]
  },
  {
    id: 'fmcg-9',
    sectorSlug: 'fmcg',
    questionText: 'Vergi/SGK borcu var mı?',
    questionType: 'yes_no',
    weight: 5,
    category: 'legal',
    isRequired: true,
    orderIndex: 9,
    isActive: true,
    options: [
      { id: 'yes', label: 'Evet', score: 0, isQualifying: true },
      { id: 'no', label: 'Hayır', score: 100 }
    ]
  },
  {
    id: 'fmcg-10',
    sectorSlug: 'fmcg',
    questionText: 'Ulusal zincir marketlere satış yapıyor musunuz?',
    questionType: 'yes_no',
    weight: 4,
    category: 'operational',
    isRequired: true,
    orderIndex: 10,
    isActive: true,
    options: [
      { id: 'yes', label: 'Evet', score: 100 },
      { id: 'no', label: 'Hayır', score: 60 }
    ]
  },

  // ============================================
  // 8. İNŞAAT & YAPI MALZEMELERİ
  // ============================================
  {
    id: 'insaat-1',
    sectorSlug: 'insaat',
    questionText: 'İnşaat sektöründe kaç yıldır faaliyet gösteriyorsunuz?',
    questionType: 'single_choice',
    weight: 8,
    category: 'experience',
    isRequired: true,
    orderIndex: 1,
    isActive: true,
    options: [
      { id: '1', label: '0-2 yıl', score: 30 },
      { id: '2', label: '2-5 yıl', score: 70 },
      { id: '3', label: '5-10 yıl', score: 90 },
      { id: '4', label: '10+ yıl', score: 100 }
    ]
  },
  {
    id: 'insaat-2',
    sectorSlug: 'insaat',
    questionText: 'Yıllık cirosunuz?',
    questionType: 'single_choice',
    weight: 10,
    category: 'financial',
    isRequired: true,
    orderIndex: 2,
    isActive: true,
    options: [
      { id: '1', label: '0-10M TL', score: 30 },
      { id: '2', label: '10-30M TL', score: 70 },
      { id: '3', label: '30-75M TL', score: 90 },
      { id: '4', label: '75M+ TL', score: 100 }
    ]
  },
  {
    id: 'insaat-3',
    sectorSlug: 'insaat',
    questionText: 'Aylık ortalama alacak tutarınız?',
    questionType: 'single_choice',
    weight: 9,
    category: 'financial',
    isRequired: true,
    orderIndex: 3,
    isActive: true,
    options: [
      { id: '1', label: '0-1M TL', score: 40 },
      { id: '2', label: '1M-3M TL', score: 70 },
      { id: '3', label: '3M-6M TL', score: 90 },
      { id: '4', label: '6M+ TL', score: 100 }
    ]
  },
  {
    id: 'insaat-4',
    sectorSlug: 'insaat',
    questionText: 'Vadeli satış oranınız?',
    questionType: 'single_choice',
    weight: 8,
    category: 'operational',
    isRequired: true,
    orderIndex: 4,
    isActive: true,
    options: [
      { id: '1', label: '%0-30', score: 40 },
      { id: '2', label: '%30-60', score: 75 },
      { id: '3', label: '%60-80', score: 90 },
      { id: '4', label: '%80+', score: 100 }
    ]
  },
  {
    id: 'insaat-5',
    sectorSlug: 'insaat',
    questionText: 'Ortalama vade süreniz (gün)?',
    questionType: 'single_choice',
    weight: 7,
    category: 'operational',
    isRequired: true,
    orderIndex: 5,
    isActive: true,
    options: [
      { id: '1', label: '0-60 gün', score: 70 },
      { id: '2', label: '60-90 gün', score: 85 },
      { id: '3', label: '90-120 gün', score: 95 },
      { id: '4', label: '120+ gün', score: 100 }
    ]
  },
  {
    id: 'insaat-6',
    sectorSlug: 'insaat',
    questionText: 'Müteahhit firmalara satış yapıyor musunuz?',
    questionType: 'yes_no',
    weight: 7,
    category: 'operational',
    isRequired: true,
    orderIndex: 6,
    isActive: true,
    options: [
      { id: 'yes', label: 'Evet', score: 100 },
      { id: 'no', label: 'Hayır', score: 60 }
    ]
  },
  {
    id: 'insaat-7',
    sectorSlug: 'insaat',
    questionText: 'Kaç satış noktanız var?',
    questionType: 'single_choice',
    weight: 6,
    category: 'operational',
    isRequired: true,
    orderIndex: 7,
    isActive: true,
    options: [
      { id: '1', label: '1 nokta', score: 60 },
      { id: '2', label: '2-3 nokta', score: 80 },
      { id: '3', label: '4-6 nokta', score: 90 },
      { id: '4', label: '6+ nokta', score: 100 }
    ]
  },
  {
    id: 'insaat-8',
    sectorSlug: 'insaat',
    questionText: 'İMO/MMO üyeliğiniz var mı?',
    questionType: 'yes_no',
    weight: 5,
    category: 'legal',
    isRequired: true,
    orderIndex: 8,
    isActive: true,
    options: [
      { id: 'yes', label: 'Evet', score: 100 },
      { id: 'no', label: 'Hayır', score: 70 }
    ]
  },
  {
    id: 'insaat-9',
    sectorSlug: 'insaat',
    questionText: 'Vergi/SGK borcu var mı?',
    questionType: 'yes_no',
    weight: 5,
    category: 'legal',
    isRequired: true,
    orderIndex: 9,
    isActive: true,
    options: [
      { id: 'yes', label: 'Evet', score: 0, isQualifying: true },
      { id: 'no', label: 'Hayır', score: 100 }
    ]
  },
  {
    id: 'insaat-10',
    sectorSlug: 'insaat',
    questionText: 'Kamu ihalelerine katılıyor musunuz?',
    questionType: 'yes_no',
    weight: 4,
    category: 'operational',
    isRequired: true,
    orderIndex: 10,
    isActive: true,
    options: [
      { id: 'yes', label: 'Evet', score: 100 },
      { id: 'no', label: 'Hayır', score: 70 }
    ]
  },

  // ============================================
  // 9. OTOMOTİV B2B (Yedek Parça, Lastik)
  // ============================================
  {
    id: 'otomotiv-b2b-1',
    sectorSlug: 'otomotiv-b2b',
    questionText: 'Otomotiv yan sanayi sektöründe kaç yıldır faaliyet gösteriyorsunuz?',
    questionType: 'single_choice',
    weight: 8,
    category: 'experience',
    isRequired: true,
    orderIndex: 1,
    isActive: true,
    options: [
      { id: '1', label: '0-2 yıl', score: 30 },
      { id: '2', label: '2-5 yıl', score: 70 },
      { id: '3', label: '5-10 yıl', score: 90 },
      { id: '4', label: '10+ yıl', score: 100 }
    ]
  },
  {
    id: 'otomotiv-b2b-2',
    sectorSlug: 'otomotiv-b2b',
    questionText: 'Yıllık cirosunuz?',
    questionType: 'single_choice',
    weight: 10,
    category: 'financial',
    isRequired: true,
    orderIndex: 2,
    isActive: true,
    options: [
      { id: '1', label: '0-5M TL', score: 30 },
      { id: '2', label: '5-15M TL', score: 70 },
      { id: '3', label: '15-40M TL', score: 90 },
      { id: '4', label: '40M+ TL', score: 100 }
    ]
  },
  {
    id: 'otomotiv-b2b-3',
    sectorSlug: 'otomotiv-b2b',
    questionText: 'Aylık ortalama alacak tutarınız?',
    questionType: 'single_choice',
    weight: 9,
    category: 'financial',
    isRequired: true,
    orderIndex: 3,
    isActive: true,
    options: [
      { id: '1', label: '0-500K TL', score: 40 },
      { id: '2', label: '500K-1.5M TL', score: 70 },
      { id: '3', label: '1.5M-3M TL', score: 90 },
      { id: '4', label: '3M+ TL', score: 100 }
    ]
  },
  {
    id: 'otomotiv-b2b-4',
    sectorSlug: 'otomotiv-b2b',
    questionText: 'Vadeli satış oranınız?',
    questionType: 'single_choice',
    weight: 8,
    category: 'operational',
    isRequired: true,
    orderIndex: 4,
    isActive: true,
    options: [
      { id: '1', label: '%0-30', score: 40 },
      { id: '2', label: '%30-60', score: 75 },
      { id: '3', label: '%60-80', score: 90 },
      { id: '4', label: '%80+', score: 100 }
    ]
  },
  {
    id: 'otomotiv-b2b-5',
    sectorSlug: 'otomotiv-b2b',
    questionText: 'Ortalama vade süreniz (gün)?',
    questionType: 'single_choice',
    weight: 7,
    category: 'operational',
    isRequired: true,
    orderIndex: 5,
    isActive: true,
    options: [
      { id: '1', label: '0-30 gün', score: 70 },
      { id: '2', label: '30-60 gün', score: 85 },
      { id: '3', label: '60-90 gün', score: 95 },
      { id: '4', label: '90+ gün', score: 100 }
    ]
  },
  {
    id: 'otomotiv-b2b-6',
    sectorSlug: 'otomotiv-b2b',
    questionText: 'Kaç bayi/servis ile çalışıyorsunuz?',
    questionType: 'single_choice',
    weight: 6,
    category: 'operational',
    isRequired: true,
    orderIndex: 6,
    isActive: true,
    options: [
      { id: '1', label: '1-20 bayi', score: 50 },
      { id: '2', label: '20-50 bayi', score: 75 },
      { id: '3', label: '50-100 bayi', score: 90 },
      { id: '4', label: '100+ bayi', score: 100 }
    ]
  },
  {
    id: 'otomotiv-b2b-7',
    sectorSlug: 'otomotiv-b2b',
    questionText: 'Hangi tip ürünler satıyorsunuz?',
    questionType: 'single_choice',
    weight: 7,
    category: 'operational',
    isRequired: true,
    orderIndex: 7,
    isActive: true,
    options: [
      { id: '1', label: 'Sadece yan sanayi', score: 60 },
      { id: '2', label: 'Orijinal + Yan sanayi', score: 80 },
      { id: '3', label: 'Sadece orijinal', score: 100 },
      { id: '4', label: 'Özel ithalat', score: 90 }
    ]
  },
  {
    id: 'otomotiv-b2b-8',
    sectorSlug: 'otomotiv-b2b',
    questionText: 'ISO 9001 belgeniz var mı?',
    questionType: 'yes_no',
    weight: 5,
    category: 'legal',
    isRequired: true,
    orderIndex: 8,
    isActive: true,
    options: [
      { id: 'yes', label: 'Evet', score: 100 },
      { id: 'no', label: 'Hayır', score: 70 }
    ]
  },
  {
    id: 'otomotiv-b2b-9',
    sectorSlug: 'otomotiv-b2b',
    questionText: 'Vergi/SGK borcu var mı?',
    questionType: 'yes_no',
    weight: 5,
    category: 'legal',
    isRequired: true,
    orderIndex: 9,
    isActive: true,
    options: [
      { id: 'yes', label: 'Evet', score: 0, isQualifying: true },
      { id: 'no', label: 'Hayır', score: 100 }
    ]
  },
  {
    id: 'otomotiv-b2b-10',
    sectorSlug: 'otomotiv-b2b',
    questionText: 'OEM (ana sanayi) firmalara tedarik yapıyor musunuz?',
    questionType: 'yes_no',
    weight: 4,
    category: 'operational',
    isRequired: true,
    orderIndex: 10,
    isActive: true,
    options: [
      { id: 'yes', label: 'Evet', score: 100 },
      { id: 'no', label: 'Hayır', score: 60 }
    ]
  },

  // ============================================
  // 10. MAKİNE & EKİPMAN
  // ============================================
  {
    id: 'makine-ekipman-1',
    sectorSlug: 'makine-ekipman',
    questionText: 'Makine/ekipman sektöründe kaç yıldır faaliyet gösteriyorsunuz?',
    questionType: 'single_choice',
    weight: 8,
    category: 'experience',
    isRequired: true,
    orderIndex: 1,
    isActive: true,
    options: [
      { id: '1', label: '0-2 yıl', score: 30 },
      { id: '2', label: '2-5 yıl', score: 70 },
      { id: '3', label: '5-10 yıl', score: 90 },
      { id: '4', label: '10+ yıl', score: 100 }
    ]
  },
  {
    id: 'makine-ekipman-2',
    sectorSlug: 'makine-ekipman',
    questionText: 'Yıllık cirosunuz?',
    questionType: 'single_choice',
    weight: 10,
    category: 'financial',
    isRequired: true,
    orderIndex: 2,
    isActive: true,
    options: [
      { id: '1', label: '0-10M TL', score: 30 },
      { id: '2', label: '10-30M TL', score: 70 },
      { id: '3', label: '30-75M TL', score: 90 },
      { id: '4', label: '75M+ TL', score: 100 }
    ]
  },
  {
    id: 'makine-ekipman-3',
    sectorSlug: 'makine-ekipman',
    questionText: 'Aylık ortalama alacak tutarınız?',
    questionType: 'single_choice',
    weight: 9,
    category: 'financial',
    isRequired: true,
    orderIndex: 3,
    isActive: true,
    options: [
      { id: '1', label: '0-1M TL', score: 40 },
      { id: '2', label: '1M-3M TL', score: 70 },
      { id: '3', label: '3M-6M TL', score: 90 },
      { id: '4', label: '6M+ TL', score: 100 }
    ]
  },
  {
    id: 'makine-ekipman-4',
    sectorSlug: 'makine-ekipman',
    questionText: 'Vadeli satış oranınız?',
    questionType: 'single_choice',
    weight: 8,
    category: 'operational',
    isRequired: true,
    orderIndex: 4,
    isActive: true,
    options: [
      { id: '1', label: '%0-40', score: 50 },
      { id: '2', label: '%40-60', score: 75 },
      { id: '3', label: '%60-80', score: 90 },
      { id: '4', label: '%80+', score: 100 }
    ]
  },
  {
    id: 'makine-ekipman-5',
    sectorSlug: 'makine-ekipman',
    questionText: 'Ortalama vade süreniz (gün)?',
    questionType: 'single_choice',
    weight: 7,
    category: 'operational',
    isRequired: true,
    orderIndex: 5,
    isActive: true,
    options: [
      { id: '1', label: '0-60 gün', score: 70 },
      { id: '2', label: '60-120 gün', score: 85 },
      { id: '3', label: '120-180 gün', score: 95 },
      { id: '4', label: '180+ gün', score: 100 }
    ]
  },
  {
    id: 'makine-ekipman-6',
    sectorSlug: 'makine-ekipman',
    questionText: 'Yetkili servis hizmeti veriyor musunuz?',
    questionType: 'yes_no',
    weight: 7,
    category: 'operational',
    isRequired: true,
    orderIndex: 6,
    isActive: true,
    options: [
      { id: 'yes', label: 'Evet', score: 100 },
      { id: 'no', label: 'Hayır', score: 60 }
    ]
  },
  {
    id: 'makine-ekipman-7',
    sectorSlug: 'makine-ekipman',
    questionText: 'Hangi tip ürünler satıyorsunuz?',
    questionType: 'single_choice',
    weight: 6,
    category: 'operational',
    isRequired: true,
    orderIndex: 7,
    isActive: true,
    options: [
      { id: '1', label: 'Sadece ithal', score: 80 },
      { id: '2', label: 'Yerli üretim', score: 90 },
      { id: '3', label: 'İthal + Yerli', score: 100 },
      { id: '4', label: '2. el', score: 50 }
    ]
  },
  {
    id: 'makine-ekipman-8',
    sectorSlug: 'makine-ekipman',
    questionText: 'CE belgeleriniz var mı?',
    questionType: 'yes_no',
    weight: 5,
    category: 'legal',
    isRequired: true,
    orderIndex: 8,
    isActive: true,
    options: [
      { id: 'yes', label: 'Evet', score: 100 },
      { id: 'no', label: 'Hayır', score: 60 }
    ]
  },
  {
    id: 'makine-ekipman-9',
    sectorSlug: 'makine-ekipman',
    questionText: 'Vergi/SGK borcu var mı?',
    questionType: 'yes_no',
    weight: 5,
    category: 'legal',
    isRequired: true,
    orderIndex: 9,
    isActive: true,
    options: [
      { id: 'yes', label: 'Evet', score: 0, isQualifying: true },
      { id: 'no', label: 'Hayır', score: 100 }
    ]
  },
  {
    id: 'makine-ekipman-10',
    sectorSlug: 'makine-ekipman',
    questionText: 'Sanayi kuruluşlarına satış yapıyor musunuz?',
    questionType: 'yes_no',
    weight: 4,
    category: 'operational',
    isRequired: true,
    orderIndex: 10,
    isActive: true,
    options: [
      { id: 'yes', label: 'Evet', score: 100 },
      { id: 'no', label: 'Hayır', score: 60 }
    ]
  }
]

/**
 * Sektöre göre soruları getir
 */
export function getQuestionsBySector(sectorSlug: string): SectorQuestion[] {
  return SECTOR_QUESTIONS.filter(q => q.sectorSlug === sectorSlug && q.isActive)
    .sort((a, b) => a.orderIndex - b.orderIndex)
}

/**
 * Tüm aktif soruları getir
 */
export function getAllActiveQuestions(): SectorQuestion[] {
  return SECTOR_QUESTIONS.filter(q => q.isActive)
}

/**
 * Kategoriye göre soruları getir
 */
export function getQuestionsByCategory(
  sectorSlug: string,
  category: string
): SectorQuestion[] {
  return SECTOR_QUESTIONS.filter(
    q => q.sectorSlug === sectorSlug && q.category === category && q.isActive
  ).sort((a, b) => a.orderIndex - b.orderIndex)
}
