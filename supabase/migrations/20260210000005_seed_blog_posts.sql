-- ============================================
-- SEED BLOG POSTS
-- Created: 2026-02-10
-- Purpose: Seed initial blog posts from data/blog/posts.ts
-- ============================================

-- Clear existing blog posts
TRUNCATE public.blog_posts CASCADE;

-- Insert blog posts
INSERT INTO public.blog_posts (slug, title, excerpt, content, author, publish_date, tags, read_time, is_published, is_featured) VALUES

-- Post 1: VDMK Nedir
('vdmk-nedir-kapsamli-rehber', 
'VDMK Nedir? Kapsamlı Rehber',
'Varlığa Dayalı Menkul Kıymet (VDMK) nedir, nasıl çalışır ve işletmenize nasıl fayda sağlar? Detaylı rehberimizde tüm merak edilenleri öğrenin.',
'# VDMK Nedir? Kapsamlı Rehber

Varlığa Dayalı Menkul Kıymet (VDMK), işletmelerin dönen varlıklarını, alacaklarını veya gelir getiren varlıklarını sermaye piyasalarında nakde çevirme yöntemidir.

**VDMK''nın Temel Özellikleri**

**1. Alternatif Finansman**
Geleneksel banka kredilerine alternatif olarak, işletmeler varlıklarını menkul kıymetleştirerek finansman sağlayabilir.

**2. Hızlı Süreç**
Klasik kredi süreçlerine göre çok daha hızlı değerlendirme ve onay süreci.

**3. Rekabetçi Maliyetler**
Banka kredilerine göre daha uygun maliyetlerle finansman imkanı.

**VDMK Türleri**

**Alacak Finansmanı**
İşletmelerin müşterilerinden olan alacaklarının menkul kıymetleştirilmesi.

**Stok Finansmanı**
Dönen varlıklar üzerinden finansman sağlanması.

**Kira Geliri Finansmanı**
Gayrimenkul kira gelirlerinin menkul kıymetleştirilmesi.

**VDMK Süreci**

1. **Başvuru**: İşletme finansman talebini iletir
2. **Değerlendirme**: Varlıklar ve alacaklar analiz edilir
3. **Yapılandırma**: VDMK paketi oluşturulur
4. **Onay**: SPK onayı alınır
5. **İhraç**: Menkul kıymetler yatırımcılara satılır
6. **Finansman**: İşletme nakdi alır

**Kimler VDMK Kullanabilir?**

- Düzenli alacağı olan işletmeler
- Minimum 5M TL yıllık cirosu olan firmalar
- Güçlü müşteri portföyüne sahip şirketler
- Büyüme hedefi olan işletmeler

**VDMK''nın Avantajları**

✓ Banka limitlerini doldurmaz
✓ Bilanço dışı finansman
✓ Rekabetçi maliyetler
✓ Hızlı onay süreci
✓ Esnek vade seçenekleri

**Sonuç**

VDMK, modern işletmeler için güçlü bir finansman aracıdır. Doğru yapılandırıldığında, işletmelerin büyüme hedeflerine ulaşmasında kritik rol oynar.',
'KolayMoney Ekibi',
'2026-02-01',
ARRAY['VDMK', 'Finansman', 'Rehber'],
8,
true,
true),

-- Post 2: VDMK vs Banka Kredisi
('vdmk-vs-banka-kredisi-karsilastirma',
'VDMK vs Banka Kredisi: Hangisi Daha Avantajlı?',
'VDMK ve banka kredisi arasındaki farkları, avantaj ve dezavantajları detaylı karşılaştırma ile öğrenin.',
'# VDMK vs Banka Kredisi: Hangisi Daha Avantajlı?

İşletmeler finansman ihtiyaçlarını karşılarken iki ana seçenekle karşılaşır: Geleneksel banka kredileri ve VDMK. Her ikisinin de kendine özgü avantajları var.

**Maliyet Karşılaştırması**

**Banka Kredisi**
- Yıllık faiz: %42-45
- Ek masraflar: Dosya, ekspertiz, sigorta
- Teminat maliyeti
- Toplam maliyet: %45-50

**VDMK**
- Yıllık iskonto: %38-42
- Komisyon: %0.5-1
- Minimal ek masraf
- Toplam maliyet: %40-45

**Süreç Hızı**

**Banka Kredisi**: 2-4 hafta
- Başvuru ve evrak toplama
- Ekspertiz ve değerleme
- Komite onayı
- Sözleşme ve kullandırım

**VDMK**: 1-2 hafta
- Alacak analizi
- Yapılandırma
- SPK onayı
- İhraç ve finansman

**Teminat Gereksinimleri**

**Banka Kredisi**
- Gayrimenkul ipoteği
- Ticari teminat mektubu
- Kefalet
- Nakit blokaj

**VDMK**
- Alacakların kendisi teminat
- Ek teminat gerekmez
- Daha esnek yapı

**Limit Kapasitesi**

**Banka Kredisi**
- Sabit kredi limiti
- Büyüme ile sınırlı artış
- Çoklu banka ihtiyacı

**VDMK**
- Alacak büyüklüğüne göre
- Esnek limit artışı
- Tek kaynak yeterli

**Bilanço Etkisi**

**Banka Kredisi**
- Bilançoda borç olarak görünür
- Finansal oranları etkiler
- Kredi notunu zorlar

**VDMK**
- Bilanço dışı işlem
- Finansal oranları korur
- Kredi notunu etkilemez

**Hangi Durumda Hangisi?**

**Banka Kredisi Tercih Edilmeli**
- Küçük tutarlar (5M TL altı)
- Uzun vadeli yatırım
- Sabit varlık finansmanı

**VDMK Tercih Edilmeli**
- Büyük tutarlar (5M TL üzeri)
- Dönen varlık finansmanı
- Banka limitleri doluysa
- Hızlı büyüme hedefi varsa

**Sonuç**

Her iki finansman aracının da yeri var. İşletmenizin ihtiyacına, büyüklüğüne ve hedeflerine göre doğru aracı seçmek kritik.',
'KolayMoney Ekibi',
'2026-02-03',
ARRAY['VDMK', 'Banka Kredisi', 'Karşılaştırma', 'Finansman'],
10,
true,
true),

-- Post 3: VDMK Başvuru Süreci
('vdmk-basvuru-sureci-adim-adim',
'VDMK Başvuru Süreci: Adım Adım Rehber',
'VDMK başvurusu nasıl yapılır? Hangi belgeler gerekir? Süreç nasıl işler? Tüm detayları öğrenin.',
'# VDMK Başvuru Süreci: Adım Adım Rehber

VDMK başvurusu yapmak karmaşık görünse de, doğru bilgi ve rehberlikle oldukça basit bir süreç.

**Adım 1: Ön Değerlendirme**

İlk aşamada şirketinizin VDMK''ya uygunluğu değerlendirilir:

- Minimum 6 ay faaliyet süresi
- Yıllık ciro 5M TL üzeri
- Düzenli alacak portföyü
- Güçlü müşteri tabanı

**Adım 2: Gerekli Belgeler**

Başvuru için hazırlanması gereken belgeler:

**Şirket Belgeleri**
- Ticaret sicil gazetesi
- İmza sirküleri
- Vergi levhası
- Faaliyet belgesi

**Finansal Belgeler**
- Son 2 yıl mali tablolar
- Alacak yaşlandırma raporu
- Müşteri listesi
- Ciro beyanı

**Alacak Belgeleri**
- Fatura örnekleri
- Sözleşmeler
- Tahsilat geçmişi
- Müşteri bilgileri

**Adım 3: Alacak Analizi**

Alacak portföyünüz detaylı analiz edilir:

- Müşteri konsantrasyonu
- Tahsilat performansı
- Vade yapısı
- Sektör dağılımı
- Risk değerlendirmesi

**Adım 4: Yapılandırma**

VDMK paketi oluşturulur:

- Alacak seçimi
- Vade belirleme
- Fiyatlandırma
- Yatırımcı profili
- Risk yapısı

**Adım 5: SPK Süreci**

Sermaye Piyasası Kurulu onayı:

- Başvuru dosyası hazırlığı
- SPK''ya sunuş
- İnceleme süreci (5-10 iş günü)
- Onay belgesi

**Adım 6: İhraç ve Finansman**

Son aşamada ihraç gerçekleşir:

- Yatırımcı bulma
- Satış işlemi
- Fon transferi
- Kullandırım

**Süre ve Zaman Çizelgesi**

- Ön değerlendirme: 1-2 gün
- Belge toplama: 3-5 gün
- Alacak analizi: 2-3 gün
- Yapılandırma: 2-3 gün
- SPK onayı: 5-10 gün
- İhraç: 1-2 gün

**Toplam Süre**: 2-3 hafta

**Başarı İçin İpuçları**

✓ Belgeleri eksiksiz hazırlayın
✓ Alacak kalitesine dikkat edin
✓ Müşteri çeşitliliği sağlayın
✓ Tahsilat geçmişini güçlendirin
✓ Profesyonel danışman kullanın

**Sonuç**

VDMK başvuru süreci, doğru hazırlık ile sorunsuz ilerler. KolayMoney olarak tüm aşamalarda yanınızdayız.',
'KolayMoney Ekibi',
'2026-02-05',
ARRAY['VDMK', 'Başvuru', 'Süreç', 'Rehber'],
12,
true,
false);

-- Verification
DO $$
DECLARE
  post_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO post_count FROM public.blog_posts;
  RAISE NOTICE '============================================';
  RAISE NOTICE 'Blog posts seeded successfully';
  RAISE NOTICE 'Total posts: %', post_count;
  RAISE NOTICE '============================================';
END $$;
