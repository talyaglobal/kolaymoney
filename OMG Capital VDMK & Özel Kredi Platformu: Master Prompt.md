# OMG Capital VDMK & Özel Kredi Platformu: Master Prompt

**Proje Adı:** OMG Capital Kaynak Kuruluş Platformu  
**Hazırlayan:** Manus AI  
**Tarih:** 9 Şubat 2026  
**Versiyon:** 1.0

---

## 1. Proje Vizyonu ve Stratejik Amaç

OMG Capital Advisors, Türkiye'nin önde gelen banka dışı finansman danışmanlık şirketlerinden biridir. 2020 yılında kurulan şirket, Varlığa Dayalı Menkul Kıymetler (VDMK), Özel Kredi, İslami Finansman ve envanter finansmanı gibi yapılandırılmış finansman ürünlerinde uzmanlaşmıştır. OMG Capital, tarım, otomotiv, e-ticaret, sanayi, lojistik ve gayrimenkul sektörlerinde 70'den fazla işlem gerçekleştirmiş olup, tüm süreçleri uçtan uca yönetmektedir.

Bu platformun vizyonu, OMG Capital'in iş geliştirme ve operasyon süreçlerini dijitalleştirerek, potansiyel kaynak kuruluşları (reel sektör firmaları) tespit etmekten, onlarla ilk teması kurmaya, ihtiyaca özel finansman yapılarını modellemekten, yapay zeka destekli sunumlarla süreci hızlandırmaya kadar tüm iş geliştirme yaşam döngüsünü merkezi bir sistemde yönetmektir.

**Stratejik Amaç:** Manuel ve parçalı iş akışlarını merkezi, veri odaklı ve otomatize bir sisteme dönüştürerek operasyonel verimliliği artırmak, pazara giriş hızını yükseltmek ve ölçeklenebilir bir büyüme altyapısı oluşturmak.

---

## 2. Hedef Kullanıcı ve Kullanım Senaryoları

Platformun ana kullanıcıları, OMG Capital Advisors bünyesindeki iş geliştirme uzmanları, analistler ve ortaklardır. Bu kullanıcılar, platformu aşağıdaki senaryolarda kullanacaklardır:

**Senaryo 1 - Fırsat Keşfi:** Bir analist, otomotiv sektöründe faaliyet gösteren ve yıllık cirosu 50-100 milyon TL arasında olan potansiyel kaynak kuruluşları aramak için platformun arama motorunu kullanır. Filtreleme sonucunda ortaya çıkan şirketler arasından uygun olanları seçer ve her biri için bir "VDMK Fırsatı" kaydı oluşturur.

**Senaryo 2 - İlk Temas ve İlişki Yönetimi:** İş geliştirme uzmanı, seçilen bir şirketin CFO'su ile LinkedIn üzerinden bağlantı kurmak için platformdan önceden hazırlanmış bir mesaj şablonu seçer ve gönderir. Bu etkileşim otomatik olarak CRM sistemine kaydedilir. Birkaç gün sonra, aynı kişiye e-posta ile takip mesajı gönderilir.

**Senaryo 3 - Kampanya Yönetimi:** OMG Capital, e-ticaret sektöründeki tüm potansiyel müşterilere yönelik bir kampanya başlatmak ister. Kampanya yöneticisi modülünde, üç adımlı bir iletişim planı oluşturulur: İlk gün LinkedIn bağlantı isteği, üçüncü gün e-posta ile VDMK tanıtımı, beşinci gün WhatsApp ile kısa bir hatırlatma. Kampanya otomatik olarak yürütülür ve her adımın sonucu izlenir.

**Senaryo 4 - Manus AI ile Sunum Hazırlama:** Bir analist, görüşme aşamasına gelmiş bir lojistik şirketi için özelleştirilmiş bir sunum hazırlamak ister. Şirketin detay sayfasında "OMG-CAP Sunumu Oluştur" butonuna tıklar. Sistem, şirketin sektörü, cirosu ve kontak bilgilerini kullanarak Manus AI'ya bir istek gönderir. Manus AI, OMG Capital'in referans projelerini (Hepsiburada, Seyidoğlu Otomotiv) ve VDMK mekanizmasını içeren, yaklaşık 10 slaytlık profesyonel bir sunum hazırlar. Sunum linki, analistin ekranında görüntülenir ve doğrudan müşteriye gönderilebilir.

---

## 3. Teknik Mimari ve Teknoloji Seti

Platformun teknik altyapısı, modern ve ölçeklenebilir teknolojiler kullanılarak inşa edilecektir. Bu seçimler, hız, güvenlik ve gelecekteki entegrasyonlar için esneklik sağlamayı hedeflemektedir.

### Frontend Teknolojileri

Kullanıcı arayüzü, **Next.js** framework'ünün en son versiyonu (App Router mimarisi) ile geliştirilecektir. Next.js, sunucu taraflı render (SSR) ve statik site üretimi (SSG) yetenekleri sayesinde hem performans hem de SEO açısından avantaj sağlar. Stil yönetimi için **Tailwind CSS** kullanılacak olup, bileşen kütüphanesi olarak **Shadcn/UI** tercih edilecektir. Shadcn/UI, özelleştirilebilir ve erişilebilir bileşenler sunarak, kurumsal bir görünüm ve kullanıcı deneyimi sağlar. Platform, **Vercel** üzerinde deploy edilecektir.

### Backend ve Veritabanı

Backend altyapısı, **Supabase** platformu üzerine kurulacaktır. Supabase, PostgreSQL tabanlı bir veritabanı, kimlik doğrulama (Supabase Auth), dosya depolama (Supabase Storage) ve gerçek zamanlı veri senkronizasyonu (Supabase Realtime) gibi özellikleri tek bir çatı altında sunar. Kimlik doğrulama, e-posta/şifre kombinasyonu ile birlikte Google ve LinkedIn OAuth entegrasyonlarını destekleyecektir. Veritabanı işlemleri, Supabase Client ve Server-Side SDK'ları kullanılarak gerçekleştirilecektir.

### API Entegrasyonları

Platform, dış dünya ile etkileşim kurmak için birden fazla API entegrasyonuna sahip olacaktır. İletişim kanalları için **LinkedIn API** (mesaj gönderme ve profil bilgisi çekme), **WhatsApp Business API** (Meta üzerinden) ve **Resend** veya **SendGrid** (e-posta gönderimi) kullanılacaktır. Yapay zeka destekli sunum oluşturma özelliği için **Manus AI API** entegre edilecektir.

### Admin Dashboard ve API Gateway Modülü

Platformun yönetim paneli, tüm API bağlantılarını izlemek ve yönetmek için bir **API Gateway Modülü** içerecektir. Bu modül, API durumlarını kontrol etme, gelen verileri inceleme ve bağlantı noktalarını yönetme yeteneklerine sahip olacaktır.

---

## 4. Supabase Veritabanı Şeması

Veritabanı tasarımı, platformun tüm fonksiyonel gereksinimlerini karşılayacak şekilde yapılandırılmıştır. Aşağıdaki tablolar, PostgreSQL formatında Supabase üzerinde oluşturulacaktır.

| Tablo Adı | Sütunlar | İlişkiler | Açıklama |
| :--- | :--- | :--- | :--- |
| `companies` | `id` (uuid, PK), `created_at` (timestamp), `name` (text), `sector` (text), `city` (text), `revenue_range` (text), `employee_count` (int), `website` (text), `linkedin_url` (text), `logo_url` (text), `status` (text) | - | Potansiyel kaynak kuruluşların ana verilerini tutar. `status` alanı: 'Potansiyel', 'Temas Kuruldu', 'Değerlendirme', 'Uygun Değil', 'Müşteri'. |
| `contacts` | `id` (uuid, PK), `company_id` (FK), `name` (text), `title` (text), `email` (text), `phone` (text), `linkedin_profile_url` (text), `created_at` (timestamp) | `company_id` → `companies.id` | Kuruluşlardaki kontak kişileri (CFO, Finans Direktörü, Genel Müdür) tutar. |
| `deals` | `id` (uuid, PK), `company_id` (FK), `product_type` (text), `potential_amount` (numeric), `status` (text), `owner_id` (FK), `created_at` (timestamp), `closed_at` (timestamp) | `company_id` → `companies.id`, `owner_id` → `auth.users.id` | Her bir şirket için potansiyel veya aktif finansman anlaşmalarını takip eder. `product_type`: 'VDMK', 'Özel Kredi', 'İslami Finansman', 'Envanter Finansmanı'. `status`: 'Fırsat', 'Yapılandırma', 'Teklif Sunuldu', 'Kapandı', 'Kaybedildi'. |
| `campaigns` | `id` (uuid, PK), `name` (text), `description` (text), `created_by` (FK), `start_date` (date), `status` (text), `created_at` (timestamp) | `created_by` → `auth.users.id` | Çok adımlı iletişim kampanyalarını tanımlar. `status`: 'Taslak', 'Aktif', 'Duraklatıldı', 'Tamamlandı'. |
| `campaign_steps` | `id` (uuid, PK), `campaign_id` (FK), `step_number` (int), `channel` (text), `template_id` (FK), `delay_days` (int) | `campaign_id` → `campaigns.id`, `template_id` → `templates.id` | Bir kampanyanın adımlarını tanımlar. `channel`: 'LinkedIn', 'Email', 'WhatsApp'. `delay_days`: Önceki adımdan sonra kaç gün beklenileceği. |
| `campaign_targets` | `id` (uuid, PK), `campaign_id` (FK), `contact_id` (FK), `status` (text), `current_step` (int), `created_at` (timestamp) | `campaign_id` → `campaigns.id`, `contact_id` → `contacts.id` | Bir kampanyaya hangi kontakların dahil edildiğini ve her birinin hangi adımda olduğunu tutar. `status`: 'Beklemede', 'İşleniyor', 'Tamamlandı', 'İptal Edildi'. |
| `interactions` | `id` (uuid, PK), `contact_id` (FK), `channel` (text), `direction` (text), `subject` (text), `content` (text), `created_at` (timestamp), `user_id` (FK) | `contact_id` → `contacts.id`, `user_id` → `auth.users.id` | Her bir kontakla yapılan tüm iletişimleri kaydeder. `direction`: 'Giden', 'Gelen'. |
| `templates` | `id` (uuid, PK), `name` (text), `channel` (text), `subject` (text), `body` (text), `created_by` (FK), `created_at` (timestamp) | `created_by` → `auth.users.id` | E-posta, LinkedIn ve WhatsApp için hazır mesaj şablonlarını tutar. `body` alanı, dinamik değişkenler (örn: {{company_name}}, {{contact_name}}) içerebilir. |
| `presentations` | `id` (uuid, PK), `deal_id` (FK), `generated_at` (timestamp), `manus_session_id` (text), `presentation_url` (text), `status` (text) | `deal_id` → `deals.id` | Manus AI tarafından oluşturulan sunumların kaydını ve linkini tutar. `status`: 'Oluşturuluyor', 'Hazır', 'Hata'. |

---

## 5. Modül Bazlı Fonksiyonel Gereksinimler

Platform, beş ana modülden oluşacaktır. Her modül, belirli bir iş akışını desteklemek üzere tasarlanmıştır.

### Modül 1: Akıllı Arama Motoru ve Fırsat Yönetimi

Bu modül, kullanıcıların `companies` tablosunda gelişmiş filtreleme kriterleri kullanarak potansiyel kaynak kuruluşları bulmasını sağlar. Arama arayüzü, sektör, şehir, ciro aralığı ve çalışan sayısı gibi parametrelere göre filtreleme seçenekleri sunar. Arama sonuçları, şirket logosu, ismi, sektörü ve mevcut durumu ile birlikte kart veya liste formatında görüntülenir. Kullanıcı, bir şirket kartına tıkladığında, o şirketin detay sayfasına yönlendirilir.

Ayrıca, arama sonuçlarından bir veya birden fazla şirket seçilerek, toplu olarak yeni `deals` kayıtları oluşturulabilir. Örneğin, bir analist, otomotiv sektöründeki beş şirketi seçerek, her biri için "VDMK Fırsatı" kaydı açabilir ve bu fırsatları kendisine veya ekip arkadaşlarına atayabilir.

### Modül 2: CRM - 360 Derece Müşteri Görünümü

CRM modülü, seçilen bir şirketin tüm bilgilerini tek bir ekranda birleştirir. Şirket detay sayfası, aşağıdaki sekmeleri içerir:

**Genel Bilgiler Sekmesi:** Şirketin adı, sektörü, web sitesi, LinkedIn profili, logo ve mevcut durumu (`status`) gösterilir. Bu bilgiler düzenlenebilir.

**Kontaklar Sekmesi:** Şirkete bağlı tüm kontaklar (`contacts` tablosu) listelenir. Her kontak için isim, unvan, e-posta, telefon ve LinkedIn profil linki görüntülenir. Yeni kontak ekleme ve mevcut kontakları düzenleme formları bu sekmede yer alır.

**Anlaşmalar (Deals) Sekmesi:** Şirketle ilgili tüm potansiyel veya aktif anlaşmalar (`deals` tablosu) listelenir. Her anlaşma için ürün tipi, potansiyel tutar, durum ve sorumlu kişi bilgileri gösterilir. Yeni anlaşma oluşturma butonu bu sekmede bulunur.

**İletişim Geçmişi Sekmesi:** Şirketteki tüm kontaklarla yapılan iletişimler (`interactions` tablosu) zaman akışı (timeline) formatında gösterilir. Her etkileşim, kanal (LinkedIn, E-posta, WhatsApp), yön (Giden/Gelen), içerik ve tarih bilgilerini içerir.

**Entegre İletişim Araçları:** CRM sayfasından ayrılmadan, seçili bir kontak için doğrudan LinkedIn mesajı, e-posta veya WhatsApp mesajı gönderilebilir. Kullanıcı, önceden tanımlanmış `templates` listesinden bir şablon seçebilir veya sıfırdan mesaj yazabilir. Gönderilen her mesaj, otomatik olarak `interactions` tablosuna kaydedilir.

### Modül 3: Kampanya Yöneticisi

Kampanya yöneticisi, belirli bir hedef kitleye yönelik çok adımlı ve çok kanallı iletişim kampanyaları oluşturmayı ve otomatik olarak yürütmeyi sağlar.

**Kampanya Oluşturma Akışı:**

İlk adımda, kampanyaya bir isim ve açıklama verilir. İkinci adımda, kampanya adımları (`campaign_steps`) tanımlanır. Her adım için bir kanal (LinkedIn, E-posta, WhatsApp), bir mesaj şablonu (`template_id`) ve önceki adımdan sonra kaç gün bekleneceği (`delay_days`) belirlenir. Örnek bir kampanya şu şekilde olabilir: Adım 1 - LinkedIn bağlantı isteği (0 gün), Adım 2 - E-posta ile VDMK tanıtımı (3 gün sonra), Adım 3 - WhatsApp ile kısa hatırlatma (5 gün sonra).

Üçüncü adımda, hedef kitle seçilir. Kullanıcı, CRM'deki filtrelenmiş bir listeyi (örn: İstanbul'daki tüm e-ticaret firmaları) veya manuel olarak seçtiği kontakları kampanyaya hedef olarak ekler (`campaign_targets`).

**Kampanya Takibi:** Aktif kampanyaların ilerlemesi, bir dashboard üzerinden izlenir. Dashboard, hangi kontağın hangi adımda olduğunu, kaç mesajın gönderildiğini, kaç yanıt alındığını ve tamamlanma oranlarını gösterir. Kullanıcı, gerektiğinde bir kampanyayı duraklatabilir veya belirli kontakları kampanyadan çıkarabilir.

### Modül 4: Manus AI Sunum Oluşturucu

Bu modül, platformun en kritik ve yenilikçi özelliğidir. Kullanıcılar, bir anlaşma (`deals`) için saniyeler içinde özelleştirilmiş, profesyonel bir sunum hazırlayabilirler.

**Kullanım Akışı:**

Kullanıcı, bir anlaşmanın detay sayfasında belirgin bir şekilde yerleştirilmiş **"OMG-CAP Sunumu Oluştur"** butonuna tıklar. Bu buton, bir Supabase Edge Function'ı tetikler. Edge Function, ilgili `deals`, `companies` ve `contacts` tablolarından gerekli verileri çeker.

**Dinamik Prompt Oluşturma:** Edge Function, Manus AI için aşağıdaki yapıda bir prompt oluşturur:

```
Sen, OMG Capital Advisors adına hareket eden bir sunum hazırlama asistanısın. OMG Capital Advisors, Türkiye'de banka dışı finansman piyasasını derinleştirmeyi hedefleyen, 2020 yılında kurulmuş bir danışmanlık şirketidir. Varlığa Dayalı Menkul Kıymetler (VDMK), Özel Kredi, İslami Finansman ve envanter finansmanı gibi yapılandırılmış ürünlerde uzmanlaşmıştır. Tarım, otomotiv, e-ticaret, sanayi, lojistik ve gayrimenkul sektörlerinde 70'den fazla işlem gerçekleştirmiştir. Tüm süreçleri uçtan uca yönetir, yatırımcı ve borçlanan beklentilerini dengeler, riskin sorumlu bir şekilde üstlenildiği, düzenleyici çerçeveye tam uyumlu ve şeffaf raporlama süreçleriyle desteklenen yapılar geliştirir.

Hedef Şirket Bilgileri:
- Şirket Adı: {{company_name}}
- Sektör: {{sector}}
- Web Sitesi: {{website}}
- Kontak Kişi: {{contact_name}}, {{contact_title}}

Anlaşma Detayları:
- Ürün Tipi: {{product_type}}
- Potansiyel Tutar: {{potential_amount}} TL

Görev: Bu bilgiler ışığında, hedef şirketin yönetimine sunulmak üzere, {{product_type}} ürünümüzün onlara nasıl değer katacağını anlatan, Hepsiburada (500M+ TL VDMK ihracı) ve Seyidoğlu Otomotiv (350M TL, TR A1 rating) gibi referanslarımızı içeren, VDMK mekanizmasını (Kaynak Kuruluş -> Varlık Fonu -> Yatırımcılar akışını) görselleştiren, yaklaşık 10 slaytlık profesyonel bir konsept sunumu hazırla. Sunum, kurumsal bir dil kullanmalı ve OMG Capital'in uçtan uca hizmet yaklaşımını vurgulamalıdır.
```

**Manus AI İsteği:** Edge Function, bu prompt'u Manus AI API'sine gönderir. Manus AI, prompt'taki bilgileri kullanarak, dinamik olarak bir sunum oluşturur. Oluşturulan sunumun linki ve oturum ID'si (`manus_session_id`), `presentations` tablosuna kaydedilir.

**Sonuç Gösterimi:** Sunum hazırlandıktan sonra, kullanıcı arayüzünde bir bildirim gösterilir ve sunum linki, anlaşma detay sayfasında görüntülenir. Kullanıcı, linke tıklayarak sunumu görüntüleyebilir, indirebilir veya doğrudan müşteriye e-posta ile gönderebilir.

### Modül 5: Admin Dashboard ve API Gateway

Admin dashboard, platformun yönetim ve izleme merkezi olarak işlev görür. Bu modül, aşağıdaki özellikleri içerir:

**Kullanıcı Yönetimi:** Supabase Auth ile entegre olarak, platform kullanıcılarını (OMG Capital çalışanları) görüntüleme, yeni kullanıcı ekleme ve rol atama işlemleri yapılır.

**API Gateway Modülü:** Tüm API bağlantılarını (LinkedIn, WhatsApp, E-posta, Manus AI) izlemek ve yönetmek için bir kontrol paneli. Bu panel, her API'nin durumunu (aktif/pasif), son istek zamanını, başarı/hata oranlarını ve gelen verileri inceleme imkanı sunar. API anahtarları ve bağlantı noktaları bu modülden yönetilebilir.

**Genel İstatistikler:** Platformdaki toplam şirket sayısı, aktif anlaşma sayısı, gönderilen mesaj sayısı, oluşturulan sunum sayısı gibi temel metrikleri gösteren bir dashboard.

---

## 6. Kullanıcı Arayüzü ve Tasarım İlkeleri

Platform, kurumsal bir görünüm ve sezgisel bir kullanıcı deneyimi sunmalıdır. Tasarım ilkeleri şunlardır:

**Minimalist ve Profesyonel:** Gereksiz görsel karmaşıklıktan kaçınılmalı, içerik ön planda olmalıdır. Renk paleti, OMG Capital'in kurumsal kimliğine uygun olarak seçilmelidir (örn: koyu mavi, beyaz, gri tonları).

**Hızlı Erişim:** Sık kullanılan işlemler (yeni şirket ekleme, mesaj gönderme, sunum oluşturma) için kısayol butonları ve hızlı erişim menüleri bulunmalıdır.

**Responsive Tasarım:** Platform, masaüstü, tablet ve mobil cihazlarda sorunsuz çalışmalıdır.

**Erişilebilirlik:** WCAG standartlarına uygun olarak, klavye navigasyonu ve ekran okuyucu desteği sağlanmalıdır.

---

## 7. Güvenlik ve Uyumluluk

Platform, hassas iş verilerini barındırdığı için güvenlik en üst düzeyde olmalıdır.

**Kimlik Doğrulama:** Supabase Auth kullanılarak, güvenli e-posta/şifre ve OAuth tabanlı giriş sağlanır. Çok faktörlü kimlik doğrulama (MFA) opsiyonel olarak etkinleştirilebilir.

**Veri Şifreleme:** Tüm veriler, Supabase'in sağladığı şifreleme mekanizmaları ile korunur. API istekleri, HTTPS üzerinden yapılır.

**Rol Tabanlı Erişim Kontrolü (RBAC):** Farklı kullanıcı rollerine (Admin, Analist, Viewer) göre erişim izinleri tanımlanır. Örneğin, sadece Admin rolündeki kullanıcılar, API Gateway modülüne erişebilir.

**KVKK Uyumluluğu:** Platform, Türkiye'deki Kişisel Verilerin Korunması Kanunu'na (KVKK) uyumlu olarak tasarlanmalıdır. Kontak bilgileri, açık rıza alınmadan üçüncü taraflarla paylaşılmaz.

---

## 8. Gelecek Geliştirmeler ve Ölçeklenebilirlik

Platform, ilk versiyonunda yukarıda belirtilen modülleri içerecektir. Ancak, gelecekte aşağıdaki özellikler eklenebilir:

**Yapay Zeka Destekli Öneri Motoru:** Bir şirketin sektörü, cirosu ve geçmiş etkileşimlerine dayanarak, hangi finansman ürününün (VDMK, Özel Kredi vb.) en uygun olduğunu öneren bir sistem.

**Entegre Dokümantasyon Sistemi:** Anlaşma sürecinde kullanılan tüm dökümanların (sözleşmeler, terimler, onay formları) platformda saklanması ve e-imza entegrasyonu ile imzalanması.

**Gelişmiş Analitik:** Kampanya performansı, dönüşüm oranları ve müşteri yaşam döngüsü analizlerini içeren detaylı raporlama araçları.

**Mobil Uygulama:** iOS ve Android için native mobil uygulamalar, saha ekiplerinin platformu hareket halindeyken kullanmasını sağlayabilir.

---

## 9. Sonuç ve Beklenen Etkiler

OMG Capital Kaynak Kuruluş Platformu, şirketin iş geliştirme süreçlerini kökten dönüştürecek bir dijital dönüşüm projesidir. Bu platform sayesinde, potansiyel müşterileri bulma süresi kısalacak, iletişim daha sistematik ve izlenebilir hale gelecek, ve en önemlisi, Manus AI entegrasyonu ile her bir müşteri için özelleştirilmiş sunumlar saniyeler içinde hazırlanabilecektir.

Beklenen etkiler arasında, iş geliştirme ekibinin verimliliğinde en az %40 artış, müşteriye ulaşma süresinde %50 azalma ve sunum hazırlama sürecinde %90'a varan zaman tasarrufu yer almaktadır. Ayrıca, merkezi bir CRM sistemi sayesinde, tüm müşteri etkileşimleri kayıt altına alınacak ve bu veriler, gelecekteki stratejik kararlar için değerli içgörüler sağlayacaktır.

---

**Hazırlayan:** Manus AI  
**İletişim:** Bu prompt, OMG Capital Advisors için özel olarak hazırlanmıştır.
