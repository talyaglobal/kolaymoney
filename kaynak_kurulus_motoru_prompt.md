# Master Prompt: OMG Capital VDMK & Özel Kredi Platformu

## 1. Proje Vizyonu ve Stratejik Amaç

**Vizyon:** OMG Capital Advisors'ın, Türkiye'nin lider banka dışı, yapılandırılmış finansman sağlayıcısı olma misyonunu destekleyecek dijital bir operasyon merkezi kurmak. Bu platform, potansiyel kaynak kuruluşları (reel sektör firmaları) tespit etmekten, onlarla ilk teması kurmaya, ihtiyaca özel finansman yapılarını (VDMK, Özel Kredi vb.) modellemekten, Manus AI destekli sunumlarla süreci hızlandırmaya kadar tüm iş geliştirme ve yapılandırma yaşam döngüsünü uçtan uca yönetecektir.

**Stratejik Amaç:** Manuel ve parçalı iş akışlarını merkezi, veri odaklı ve otomatize bir sisteme dönüştürerek OMG Capital'in operasyonel verimliliğini artırmak, pazara giriş hızını yükseltmek ve ölçeklenebilir bir büyüme altyapısı oluşturmak.

## 2. Hedef Kullanıcı ve Rolü

*   **Ana Kullanıcı:** OMG Capital Advisors bünyesindeki iş geliştirme uzmanları, analistler ve ortaklar.
*   **Kullanıcı Rolü:** Platform, bu ekibin potansiyel müşterileri bulmasını, onlarla etkileşimlerini bir CRM sistemi üzerinden yönetmesini, kampanyalar düzenlemesini ve her bir müşteri için saniyeler içinde özelleştirilmiş, profesyonel sunumlar hazırlamasını sağlayan birincil aracı olacaktır.

## 3. Teknik Mimari ve Teknoloji Seti

*   **Frontend:**
    *   **Framework:** Next.js (Latest Version, App Router)
    *   **Styling:** Tailwind CSS
    *   **UI Kütüphanesi:** Shadcn/UI
    *   **Deployment:** Vercel

*   **Backend & Veritabanı:**
    *   **Platform:** Supabase (PostgreSQL)
    *   **Authentication:** Supabase Auth (Email/Password ve Google/LinkedIn OAuth)
    *   **Veritabanı Erişimi:** Supabase Client & Server-Side SDK
    *   **Storage:** Supabase Storage (sunumlar, logolar, dokümanlar)

*   **API Entegrasyonları:**
    *   **İletişim Kanalları:** LinkedIn API, WhatsApp Business API, Resend (E-posta).
    *   **Yapay Zeka:** Manus AI API (Sunum ve içerik üretimi).

## 4. Geliştirilmiş Supabase Veritabanı Şeması

| Tablo Adı | Sütunlar | Açıklama |
| :--- | :--- | :--- |
| `companies` | `id` (uuid, PK), `name` (text), `sector` (text), `revenue_range` (text), `status` (text: 'Potansiyel', 'Temas Kuruldu', 'Değerlendirme', 'Müşteri'), `website` (text), `linkedin_url` (text) | Kaynak kuruluşların ana verilerini tutar. |
| `contacts` | `id` (uuid, PK), `company_id` (FK -> companies.id), `name` (text), `title` (text), `email` (text), `phone` (text), `linkedin_profile_url` (text) | Kuruluşlardaki kontak kişileri tutar. |
| `deals` | `id` (uuid, PK), `company_id` (FK -> companies.id), `product_type` (text: 'VDMK', 'Özel Kredi', 'İslami Finansman'), `potential_amount` (numeric), `status` (text: 'Fırsat', 'Yapılandırma', 'Kapandı'), `owner_id` (FK -> auth.users.id) | Her bir şirket için potansiyel veya aktif finansman anlaşmalarını takip eder. |
| `campaigns` | `id` (uuid, PK), `name` (text), `created_by` (FK -> auth.users.id), `status` (text: 'Aktif', 'Tamamlandı') | Çok adımlı iletişim kampanyalarını tanımlar. |
| `campaign_steps` | `id` (uuid, PK), `campaign_id` (FK -> campaigns.id), `step_number` (int), `channel` (text: 'LinkedIn', 'Email', 'WhatsApp'), `template_id` (FK -> templates.id), `delay_days` (int) | Bir kampanyanın adımlarını tanımlar. |
| `interactions` | `id` (uuid, PK), `contact_id` (FK -> contacts.id), `channel` (text), `direction` (text: 'Giden', 'Gelen'), `content` (text), `created_at` (timestamp) | Kontaklarla yapılan tüm iletişimleri kaydeder. |
| `templates` | `id` (uuid, PK), `name` (text), `channel` (text), `body` (text) | İletişim şablonlarını tutar. |
| `presentations` | `id` (uuid, PK), `deal_id` (FK -> deals.id), `generated_at` (timestamp), `manus_session_id` (text), `presentation_url` (text) | Manus AI tarafından oluşturulan sunumların kaydını tutar. |

## 5. Modül Bazlı Fonksiyonel Gereksinimler

### Modül 1: Arama Motoru ve Fırsat Yönetimi

*   **Akıllı Arama:** Kullanıcıların `companies` tablosunda sektör, ciro, çalışan sayısı gibi kriterlere göre potansiyel kaynak kuruluşları bulmasını sağlar.
*   **Fırsat Yaratma:** Arama sonuçlarından bir şirket seçildiğinde, tek tıkla yeni bir `deals` kaydı (örn: VDMK Fırsatı) oluşturulabilmelidir. Bu fırsat, ilgili OMG Capital analistine atanır.

### Modül 2: CRM - 360 Derece Müşteri Görünümü

*   **Şirket Detay Sayfası:** Şirket bilgilerini, ilgili `contacts` listesini, açık `deals` kayıtlarını ve tüm `interactions` geçmişini tek bir ekranda birleştirir.
*   **Entegre İletişim:** Bu ekrandan ayrılmadan, seçili bir kontak için LinkedIn, e-posta veya WhatsApp üzerinden, önceden tanımlanmış `templates` kullanılarak iletişim başlatılabilir.

### Modül 3: Kampanya Yöneticisi

*   **Otomatik İş Akışları:** Belirli bir filtreye uyan şirketlere (örn: Lojistik sektöründeki tüm potansiyel müşteriler) yönelik çok adımlı (`campaign_steps`) ve çok kanallı (`channel`) iletişim kampanyaları tasarlanmasını ve otomatik olarak yürütülmesini sağlar.

### Modül 4: Manus AI Sunum Oluşturucu - **Platformun Kalbi**

*   **Tek Tıkla Sunum:** `deals` detay sayfasında yer alan **"OMG-CAP Sunumu Oluştur"** butonu, platformun en kritik özelliğidir.
*   **Dinamik Prompt Üretimi:** Butona basıldığında, sistem arka planda Manus AI için dinamik bir prompt oluşturur. Bu prompt aşağıdaki bilgileri içerir:
    *   **OMG-CAP Kimliği:** "Biz, OMG Capital Advisors olarak, Türkiye'de banka dışı finansman piyasasını derinleştirmeyi hedefleyen, VDMK ve Özel Kredi gibi yapılandırılmış ürünlerde uzmanlaşmış bir danışmanlık şirketiyiz. Süreçleri uçtan uca yönetir, yatırımcı ve borçlanan beklentilerini dengeleriz."
    *   **Hedef Şirket Bilgileri:** İlgili `companies` ve `contacts` tablolarından alınan şirket adı, sektörü, web sitesi ve C-level kontak bilgileri.
    *   **Anlaşma Detayları:** `deals` tablosundan alınan ürün tipi (VDMK) ve potansiyel anlaşma büyüklüğü.
    *   **İstenen Çıktı:** "Bu bilgiler ışığında, hedef şirketin yönetimine sunulmak üzere, VDMK ürünümüzün onlara nasıl değer katacağını anlatan, Hepsiburada ve Seyidoğlu gibi referanslarımızı içeren, yaklaşık 10 slaytlık profesyonel bir konsept sunumu hazırla."
*   **Sonuç:** Manus AI tarafından üretilen sunumun linki, `presentations` tablosuna kaydedilir ve kullanıcı arayüzünde gösterilir.
