
# **KolayMoney.com - Master Prompt**

## **1. Proje Vizyonu ve Stratejik Konumlandırma**

**KolayMoney.com**, Türkiye'deki KOBİ'ler ve büyük işletmeler için alternatif finansman çözümlerine erişimi dijitalleştiren bir platformdur. OMG Capital Advisors ile olan **stratejik ortaklık** çerçevesinde, Varlığa Dayalı Menkul Kıymet (VDMK) ihraç sürecini uçtan uca yöneten bir arayüz görevi görür. Platform, **"Kaynak Kuruluş"** potansiyeli taşıyan firmaları tespit etmek, onlarla ilk teması kurmak, VDMK sürecine hazırlamak ve OMG Capital'in uzmanlığına sunmak üzere tasarlanmıştır.

**İş Modeli Akışı:**
1.  **Potansiyel Keşfi:** Akıllı arama motoru ve entegre kampanya araçları (LinkedIn, Mail, WhatsApp) ile VDMK'ya uygun şirketler bulunur ve hedeflenir.
2.  **İlk Temas ve Değerlendirme:** CRM modülü üzerinden ilk temas kurulur, firmaların finansal verileri toplanır ve ön değerlendirme yapılır.
3.  **Otomatik Sunum Hazırlığı:** **Manus AI Sunum Oluşturucu**, toplanan veriler ve OMG-CAP'in referans projeleri (Hepsiburada, Seyidoğlu vb.) ile firmaya özel, ikna edici bir VDMK konsept sunumu hazırlar.
4.  **Uzman Onayı:** Hazırlanan sunum ve ön değerlendirme, OMG Capital Advisors ekibine sunulur. Onaylanan firmalarla yapılandırma sürecine geçilir.

## **2. Teknik Mimari ve Teknoloji Seti**

- **Frontend:** Next.js (Latest Version) - App Router
- **Backend & Veritabanı:** Supabase (PostgreSQL)
- **Kimlik Doğrulama:** Supabase Auth
- **UI/UX:** Tailwind CSS & Shadcn/UI
- **AI Entegrasyonu:** Manus AI (API aracılığıyla)

## **3. Veritabanı Şeması (Supabase)**

```sql
-- 1. Şirketler (Potansiyel Kaynak Kuruluşlar)
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    sector TEXT,
    sub_sector TEXT,
    revenue BIGINT,
    employee_count INT,
    city TEXT,
    website TEXT,
    linkedin_url TEXT,
    status TEXT DEFAULT 'lead', -- lead, contacted, proposal, onboarded, rejected
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. İlgili Kişiler
CREATE TABLE contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES companies(id),
    name TEXT NOT NULL,
    title TEXT,
    email TEXT UNIQUE,
    phone TEXT,
    linkedin_profile TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Kampanyalar
CREATE TABLE campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    target_audience TEXT, -- (Örn: B2B İnşaat Malzemeleri)
    status TEXT DEFAULT 'draft', -- draft, active, completed
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Kampanya Adımları
CREATE TABLE campaign_steps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id UUID REFERENCES campaigns(id),
    step_order INT NOT NULL,
    channel TEXT NOT NULL, -- linkedin, email, whatsapp
    template_id UUID REFERENCES templates(id),
    delay_hours INT DEFAULT 24 -- Sonraki adımdan önceki bekleme süresi
);

-- 5. Kampanya Hedefleri (Hangi şirket hangi kampanyada)
CREATE TABLE campaign_targets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id UUID REFERENCES campaigns(id),
    company_id UUID REFERENCES companies(id),
    status TEXT DEFAULT 'pending', -- pending, sent, replied, failed
    current_step INT DEFAULT 1
);

-- 6. Etkileşimler (Tüm iletişim kaydı)
CREATE TABLE interactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contact_id UUID REFERENCES contacts(id),
    channel TEXT, -- email, call, meeting, linkedin_dm
    content TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. Mesaj Şablonları
CREATE TABLE templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    subject TEXT, -- Email için
    body TEXT NOT NULL, -- {{contact_name}}, {{company_name}} gibi değişkenler içerebilir
    channel TEXT -- email, linkedin, whatsapp
);

-- 8. Sunumlar
CREATE TABLE presentations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES companies(id),
    manus_ai_job_id TEXT,
    presentation_url TEXT,
    status TEXT DEFAULT 'generating', -- generating, ready, presented
    created_at TIMESTAMPTZ DEFAULT now()
);
```

## **4. Ana Modüller**

### **Modül 1: Akıllı Kaynak Kuruluş Arama Motoru**
- **Arayüz:** Sektör, ciro, çalışan sayısı, lokasyon gibi filtrelere sahip gelişmiş arama.
- **Veri Kaynakları:** (Entegrasyon) BIST, MKK, Ticaret Sicil Gazetesi API'leri ve web scraping ile potansiyel firmaların tespiti.
- **Fonksiyon:** Arama sonuçlarını doğrudan CRM'e (companies tablosu) ekleme.

### **Modül 2: CRM - 360 Derece Müşteri Görünümü**
- **Arayüz:** Seçilen bir şirketin tüm bilgilerini, ilgili kişileri (contacts), geçmiş etkileşimleri (interactions) ve sunum durumunu (presentations) gösteren tek bir sayfa.
- **Fonksiyon:** Manuel olarak yeni etkileşim (arama, toplantı notu) ekleme.

### **Modül 3: Kampanya Yöneticisi**
- **Arayüz:**
    1.  **Şablon Oluşturucu:** Değişkenler kullanarak LinkedIn, E-posta ve WhatsApp için mesaj şablonları oluşturma.
    2.  **İş Akışı Tasarımcısı:** Sürükle-bırak arayüzü ile kampanya adımlarını (örn: 1. Adım: LinkedIn Bağlantı İsteği, 2. Adım: 24 saat sonra E-posta gönder) tasarlama.
    3.  **Hedef Kitle Seçimi:** Arama motorundan veya manuel olarak kampanyaya dahil edilecek şirketleri seçme.
- **Fonksiyon:** Kampanyayı başlatma ve `campaign_targets` tablosundaki durumu otomatik güncelleme.

### **Modül 4: Manus AI Sunum Oluşturucu**
- **Arayüz:** Şirket detay sayfasında bulunan "Sunum Oluştur" butonu.
- **Fonksiyon:**
    1.  Butona tıklandığında, sistem `companies` ve `contacts` tablolarından ilgili firma verilerini çeker.
    2.  Aşağıdaki dinamik **prompt'u** oluşturur ve Manus AI API'sine gönderir:

        ```json
        {
          "task": "presentation_generation",
          "presentation_title": "[Firma Adı] için VDMK Finansman Modeli Önerisi",
          "style_instruction": {
            "aesthetic_direction": "Rigid modular grid, brutalist typography, high-contrast black, white, and electric blue. Focus on data, structure, and trust.",
            "color_palette": "Background: #FFFFFF, Title: #000000, Body: #333333, Accent: #0047FF",
            "typography": "Font Family: Inter, Headline: 48px 900, Subtitle: 24px 700, Body: 16px 400"
          },
          "content_input": {
            "company_name": "{{company.name}}",
            "sector": "{{company.sector}}",
            "revenue": "{{company.revenue}}",
            "contact_name": "{{contact.name}}",
            "contact_title": "{{contact.title}}"
          },
          "slide_outline": [
            { "id": "cover", "page_title": "[Firma Adı] için Özel Finansman Çözümü", "summary": "Giriş ve başlık" },
            { "id": "omg_intro", "page_title": "Stratejik Finansman Ortağınız: OMG Capital Advisors", "summary": "OMG Capital'in uzmanlığı, 70+ başarılı işlem ve banka dışı finansmandaki rolü." },
            { "id": "vdmk_what_is", "page_title": "Varlığa Dayalı Menkul Kıymet (VDMK) Nedir?", "summary": "VDMK mekanizmasının basit bir şema ile anlatımı." },
            { "id": "why_vdmk", "page_title": "Neden VDMK? [Firma Adı] için Avantajlar", "summary": "Düşük maliyet, uzun vade, bilanço dışı finansman gibi avantajların firmaya özel vurgulanması." },
            { "id": "references", "page_title": "Başarı Hikayeleri: Sektör Liderlerinin Tercihi", "summary": "Hepsiburada (500M TL), Seyidoğlu (200M TL), Maygold (600M TL) ve Tarfin (120M TL) gibi referans projelerin kilit metriklerle sunumu." },
            { "id": "process", "page_title": "3 Adımda Hızlı ve Şeffaf Süreç", "summary": "1. Analiz, 2. Yapılandırma, 3. İhraç adımlarını içeren basit bir yol haritası." },
            { "id": "contact", "page_title": "Sonraki Adımlar ve İletişim", "summary": "info@kolaymoney.com ve bir sonraki toplantı için çağrı." }
          ]
        }
        ```
    3.  Manus AI'dan dönen `presentation_url` ve `job_id`'yi `presentations` tablosuna kaydeder.

## **5. Kullanım Senaryosu (End-to-End)**

1.  **Kullanıcı (İş Geliştirme Uzmanı):** Platforma giriş yapar.
2.  **Arama:** Arama motorunu kullanarak "İnşaat Malzemeleri" sektöründe, cirosu 500M TL üzerinde olan firmaları listeler.
3.  **Seçim:** Listeden 10 firmayı seçer ve "Yeni Kampanya Oluştur" der.
4.  **Kampanya Kurulumu:**
    *   Kampanyaya "İnşaat Sektörü VDMK Fırsatı" adını verir.
    *   **Adım 1 (LinkedIn):** Önceden hazırladığı "Bağlantı İsteği" şablonunu seçer.
    *   **Adım 2 (E-posta):** 48 saat bekleme süresi koyar ve "VDMK Tanıtım" e-posta şablonunu seçer.
5.  **Otomasyon:** Kampanyayı başlatır. Sistem, 10 firmadaki CFO'lara (contacts) otomatik olarak LinkedIn daveti gönderir.
6.  **Yanıt:** Bir firmanın CFO'su LinkedIn'den olumlu yanıt verir. Sistem bu yanıtı `interactions` tablosuna kaydeder ve kampanya akışını o firma için durdurur.
7.  **Sunum:** İş geliştirme uzmanı, ilgili firmanın CRM sayfasına gider ve "Sunum Oluştur" butonuna tıklar.
8.  **AI Devrede:** Manus AI, 5 dakika içinde firmaya özel VDMK sunumunu hazırlar ve linkini CRM sayfasına ekler.
9.  **Kapanış:** Uzman, hazır sunum linkini CFO ile paylaşarak toplantı talep eder.


## **6. Pazarlama ve Landing Page (Halka Açık Web Sitesi)**

Bu bölüm, KolayMoney.com'un halka açık yüzünü ve potansiyel "Kaynak Kuruluş"ları çekmek için kullanılacak pazarlama sayfasının yapısını tanımlar.

**Amacı:** VDMK sürecini basit ve anlaşılır bir dille anlatmak, avantajlarını vurgulamak ve firmaları "Hemen Başvur" veya "Bilgi Al" eylem çağrısına yönlendirmektir.

### **Landing Page Yapısı**

1.  **Hero Section (Ana Karşılama Alanı):**
    *   **Ana Başlık:** "İşletmeniz için Hızlı ve Alternatif Finansman: VDMK"
    *   **Alt Başlık:** "Dönen varlıklarınızı, alacaklarınızı veya kira gelirlerinizi sermaye piyasalarında nakde çevirin."
    *   **CTA (Eylem Çağrısı):** "Hemen Başvur" (form'a yönlendirir) ve "Daha Fazla Bilgi Al" (Nasıl Çalışır? bölümüne scroll eder).

2.  **"VDMK Nedir?" Bölümü:**
    *   Basit, animasyonlu bir infografik ile VDMK mekanizmasının 4 adımda anlatımı:
        1.  **Kaynak Kuruluş:** Alacaklarınızı belirleyin.
        2.  **Varlık Fonu:** Alacaklarınızı fona devredin.
        3.  **İhraç:** OMG Capital uzmanlığıyla VDMK'lar ihraç edilsin.
        4.  **Nakit Akışı:** Anında finansmana ulaşın.

3.  **Hedef Sektörler Bölümü:**
    *   Dinamik ve interaktif bir ızgara (grid) yapısı ile hedeflenen sektörlerin logoları veya ikonları ile gösterimi.
    *   **B2C Sektörleri:** Beyaz Eşya, Elektronik, Mobilya, Otomotiv, Sağlık, Eğitim.
    *   **B2B Sektörleri:** FMCG & Toptan Dağıtım, İnşaat Malzemeleri, Otomotiv Yedek Parça, Tekstil, Tarım Girdileri, Lojistik.

4.  **Başarı Hikayeleri (Referanslar) Bölümü:**
    *   Güven oluşturmak için OMG Capital Advisors tarafından yapılandırılmış projelerin bir "carousel" veya "kart" yapısı içinde sunumu.
    *   **Hepsiburada:** Logo + "500 Milyon TL+ İhraç, E-ticaret & BNPL Alacakları"
    *   **Seyidoğlu Otomotiv:** Logo + "350 Milyon TL İhraç, Ticari Alacaklar, TurkRating A1 Notu"
    *   **Maygold Otomotiv:** Logo + "600 Milyon TL İhraç, Otomotiv Sektörü"
    *   **Tarfin:** Logo + "120 Milyon TL+ İhraç, Tarım Tedarik Zinciri Finansmanı"

5.  **"Nasıl Çalışır?" Bölümü:**
    *   Süreci 3 basit adıma indiren bir bölüm:
        1.  **Ön Başvuru:** Web sitesindeki kısa formu doldurun.
        2.  **Değerlendirme & Sunum:** Ekibimiz verilerinizi analiz etsin ve size özel Manus AI destekli sunumu hazırlasın.
        3.  **Yapılandırma & İhraç:** OMG Capital uzmanları ile VDMK yapınız oluşturulsun ve ihraç tamamlansın.

6.  **Stratejik Ortak Logosu:**
    *   Sayfanın alt kısmında, "Stratejik İş Ortağımız" başlığıyla **OMG Capital Advisors** logosuna yer verilir.

7.  **Son Eylem Çağrısı (CTA) Bölümü:**
    *   Sayfanın en altında, büyük ve dikkat çekici bir başlıkla: "Finansmana Erişimin Kolay Yoluyla Tanışın."
    *   Basit bir başvuru formu (Firma Adı, Yetkili Adı, E-posta, Telefon, Ciro Aralığı).
