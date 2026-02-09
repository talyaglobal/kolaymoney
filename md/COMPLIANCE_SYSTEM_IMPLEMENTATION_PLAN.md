# 🎯 Compliance & Application System - Implementation Plan

**Tarih:** 10 Şubat 2026  
**Durum:** 📋 Plan Hazır - Implementation Bekliyor  
**Öncelik:** Yüksek

---

## 📋 PROJE KAPSAMI

10 sektör için dinamik uygunluk anketi ve başvuru formu sistemi:

### Özellikler
- ✅ Sektöre özel dinamik sorular (10 soru × 10 sektör = 100 soru)
- ✅ Her soru için ağırlık puanı (1-10)
- ✅ Otomatik compliance score hesaplama (0-100)
- ✅ Minimum %60 uygunluk şartı
- ✅ Admin dashboard'da soru yönetimi
- ✅ Başvuru durumu takibi
- ✅ Gerçek zamanlı skorlama
- ✅ Email notification sistemi

### Sektörler
1. Beyaz Eşya & Küçük Ev Aletleri
2. Elektronik
3. Mobilya & Dekorasyon
4. Otomotiv (B2C)
5. FMCG & Toptan Dağıtım
6. İnşaat Malzemeleri
7. Otomotiv Yedek Parça (B2B)
8. Makine-Ekipman & Endüstriyel
9. Tarım Girdileri
10. Lojistik / Taşımacılık

---

## 🗄️ DATABASE SCHEMA

### Supabase Migration Gerekli

**Dosya:** `supabase/migrations/YYYYMMDD_compliance_system.sql`

```sql
-- ============================================
-- 1. SECTOR QUESTIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.sector_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sector_slug TEXT NOT NULL,
  question_text TEXT NOT NULL,
  question_type TEXT NOT NULL CHECK (question_type IN ('single_choice', 'multiple_choice', 'number', 'yes_no', 'text')),
  options JSONB, -- QuestionOption[]
  weight INTEGER NOT NULL DEFAULT 5 CHECK (weight >= 1 AND weight <= 10),
  category TEXT NOT NULL CHECK (category IN ('financial', 'operational', 'legal', 'experience')),
  is_required BOOLEAN NOT NULL DEFAULT true,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  help_text TEXT,
  placeholder TEXT,
  validation_rules JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_sector_questions_sector ON public.sector_questions(sector_slug, is_active);
CREATE INDEX idx_sector_questions_category ON public.sector_questions(category);

-- ============================================
-- 2. COMPLIANCE APPLICATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.compliance_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Şirket Bilgileri
  company_name TEXT NOT NULL,
  tax_number TEXT NOT NULL,
  company_type TEXT NOT NULL CHECK (company_type IN ('limited', 'anonim', 'sahis', 'kollektif')),
  sector TEXT NOT NULL,
  founding_year INTEGER NOT NULL,
  
  -- İletişim
  contact_name TEXT NOT NULL,
  contact_title TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  company_address TEXT NOT NULL,
  city TEXT NOT NULL,
  
  -- Finansal
  annual_revenue NUMERIC NOT NULL,
  credit_sales_ratio NUMERIC NOT NULL,
  average_payment_term INTEGER NOT NULL,
  average_basket_size NUMERIC NOT NULL,
  monthly_receivables NUMERIC NOT NULL,
  
  -- VDMK Talebi
  requested_amount NUMERIC NOT NULL,
  requested_term INTEGER NOT NULL,
  purpose TEXT NOT NULL,
  
  -- Anket Cevapları
  question_responses JSONB NOT NULL DEFAULT '{}',
  
  -- Compliance Scoring
  compliance_score NUMERIC NOT NULL DEFAULT 0,
  is_passed BOOLEAN NOT NULL DEFAULT false,
  scoring_details JSONB NOT NULL DEFAULT '{}',
  
  -- Başvuru Durumu
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'rejected', 'more_info_needed')),
  rejection_reason TEXT,
  review_notes TEXT,
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMPTZ,
  
  -- Documents
  documents JSONB,
  
  -- Tracking
  source TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_compliance_applications_sector ON public.compliance_applications(sector, status);
CREATE INDEX idx_compliance_applications_score ON public.compliance_applications(compliance_score);
CREATE INDEX idx_compliance_applications_created ON public.compliance_applications(created_at DESC);
CREATE INDEX idx_compliance_applications_status ON public.compliance_applications(status);
CREATE INDEX idx_compliance_applications_email ON public.compliance_applications(contact_email);

-- ============================================
-- 3. APPLICATION NOTIFICATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.application_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES public.compliance_applications(id) ON DELETE CASCADE,
  recipient_email TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('application_received', 'under_review', 'approved', 'rejected', 'more_info')),
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  sent_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_notifications_application ON public.application_notifications(application_id);
CREATE INDEX idx_notifications_status ON public.application_notifications(status);

-- ============================================
-- 4. RLS POLICIES
-- ============================================

-- Sector Questions: Public read, admin write
ALTER TABLE public.sector_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "sector_questions_public_read"
ON public.sector_questions FOR SELECT
TO anon, authenticated
USING (is_active = true);

CREATE POLICY "sector_questions_admin_all"
ON public.sector_questions FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_profiles
    WHERE user_id = auth.uid()
    AND 'admin' = ANY(roles)
  )
);

-- Compliance Applications: User can insert, admin can read all
ALTER TABLE public.compliance_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "compliance_applications_insert"
ON public.compliance_applications FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "compliance_applications_admin_read"
ON public.compliance_applications FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_profiles
    WHERE user_id = auth.uid()
    AND 'admin' = ANY(roles)
  )
);

CREATE POLICY "compliance_applications_admin_update"
ON public.compliance_applications FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_profiles
    WHERE user_id = auth.uid()
    AND 'admin' = ANY(roles)
  )
);

-- Notifications: Admin only
ALTER TABLE public.application_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "notifications_admin_all"
ON public.application_notifications FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_profiles
    WHERE user_id = auth.uid()
    AND 'admin' = ANY(roles)
  )
);

-- ============================================
-- 5. TRIGGERS
-- ============================================

-- Updated_at trigger for sector_questions
CREATE OR REPLACE FUNCTION update_sector_questions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_sector_questions_updated_at
BEFORE UPDATE ON public.sector_questions
FOR EACH ROW EXECUTE FUNCTION update_sector_questions_updated_at();

-- Updated_at trigger for compliance_applications
CREATE OR REPLACE FUNCTION update_compliance_applications_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_compliance_applications_updated_at
BEFORE UPDATE ON public.compliance_applications
FOR EACH ROW EXECUTE FUNCTION update_compliance_applications_updated_at();
```

---

## 📊 TAMAMLANAN DOSYALAR

### 1. Types ✅
- `src/types/compliance.ts` - Tüm type definitions

### 2. Scoring Engine ✅
- `src/lib/compliance/scoringEngine.ts` - Puanlama algoritması

### 3. Soru Seed Data (Kısmi) ✅
- `src/data/compliance/sectorQuestions.ts` - İlk 4 sektör soruları

---

## 🚀 IMPLEMENTATION ADIMLARI

### ADIM 1: Database Migration
```bash
# Migration oluştur
supabase migration new compliance_system

# SQL'i migration dosyasına kopyala
# supabase/migrations/YYYYMMDD_compliance_system.sql

# Migration uygula
supabase db reset
supabase db push

# Types generate et
supabase gen types typescript --linked > src/lib/supabase/types.ts
```

### ADIM 2: Kalan Sektör Sorularını Ekle
Dosya: `src/data/compliance/sectorQuestions.ts`

Her sektör için 10 soru ekle:
- Mobilya (10 soru)
- Otomotiv B2C (10 soru)
- FMCG (10 soru)
- İnşaat (10 soru)
- Otomotiv B2B (10 soru)
- Makine & Ekipman (10 soru)

**Pattern:**
- 1-2 soru: Deneyim (experience)
- 3-4 soru: Finansal (financial) - yüksek ağırlık
- 5-7 soru: Operasyonel (operational)
- 8-10 soru: Yasal/Diğer (legal)

### ADIM 3: Multi-Step Form Component'leri

**Ana Form:** `src/components/compliance/ComplianceApplicationForm.tsx`
- 6 adımlı form
- Progress indicator
- Form validation (Zod)
- Real-time scoring

**Step Component'leri:**
1. `CompanyInfoStep.tsx` - Şirket bilgileri
2. `ContactInfoStep.tsx` - İletişim bilgileri
3. `FinancialInfoStep.tsx` - Finansal bilgiler
4. `VDMKRequestStep.tsx` - VDMK talebi
5. `QuestionnaireStep.tsx` - Uygunluk anketi (dinamik)
6. `ReviewStep.tsx` - Özet ve onay

**Özel Component'ler:**
- `QuestionRenderer.tsx` - Soru tipine göre render
- `ScoreDisplay.tsx` - Compliance score gösterimi
- `CategoryScoreCard.tsx` - Kategori bazlı skorlar

### ADIM 4: API Endpoints (Supabase Edge Functions)

**1. Get Sector Questions**
```typescript
// supabase/functions/get-sector-questions/index.ts
// GET /api/sectors/{slug}/questions
// Returns: SectorQuestion[]
```

**2. Submit Application**
```typescript
// supabase/functions/submit-compliance-application/index.ts
// POST /api/compliance/applications
// Body: ComplianceFormData
// Returns: { id, complianceScore, isPassed, scoringDetails }
// Actions:
//   - Validate form data
//   - Calculate compliance score
//   - Save to database
//   - Trigger email notifications
```

**3. Get Applications (Admin)**
```typescript
// supabase/functions/get-applications/index.ts
// GET /api/admin/applications?status=pending&sector=beyaz-esya
// Returns: ComplianceApplication[]
```

**4. Update Application Status (Admin)**
```typescript
// supabase/functions/update-application-status/index.ts
// PATCH /api/admin/applications/{id}
// Body: { status, reviewNotes, rejectionReason }
```

### ADIM 5: Admin Dashboard

**Dosya:** `src/pages/admin/ComplianceApplications.tsx`

**Özellikler:**
- Başvuru listesi (filtreleme: sektör, durum, skor)
- Detaylı görünüm (modal)
- Compliance score breakdown
- Kategori skorları (chart)
- Durum güncelleme
- Review notes ekleme
- Email gönderme

**Dosya:** `src/pages/admin/QuestionManager.tsx`

**Özellikler:**
- Sektör bazlı soru listesi
- Soru ekleme/düzenleme/silme
- Ağırlık ve kategori yönetimi
- Aktif/pasif toggle
- Sıralama (drag & drop)
- Bulk operations

### ADIM 6: Email Notifications

**Dosya:** `supabase/functions/send-compliance-email/index.ts`

**Email Tipleri:**
1. **application_received** - Başvuru alındı
2. **under_review** - İnceleme başladı
3. **approved** - Onaylandı
4. **rejected** - Reddedildi
5. **more_info** - Ek bilgi gerekli

**Template'ler:**
- Compliance score gösterimi
- Kategori skorları
- Öneriler
- Sonraki adımlar
- İletişim bilgileri

---

## 📁 DOSYA YAPISI

```
src/
├── components/
│   └── compliance/
│       ├── ComplianceApplicationForm.tsx (Ana form)
│       ├── steps/
│       │   ├── CompanyInfoStep.tsx
│       │   ├── ContactInfoStep.tsx
│       │   ├── FinancialInfoStep.tsx
│       │   ├── VDMKRequestStep.tsx
│       │   ├── QuestionnaireStep.tsx
│       │   └── ReviewStep.tsx
│       ├── QuestionRenderer.tsx
│       ├── ScoreDisplay.tsx
│       └── CategoryScoreCard.tsx
├── data/
│   └── compliance/
│       └── sectorQuestions.ts (100 soru)
├── lib/
│   └── compliance/
│       ├── scoringEngine.ts ✅
│       └── validation.ts
├── pages/
│   ├── ComplianceApplicationPage.tsx
│   └── admin/
│       ├── ComplianceApplications.tsx
│       └── QuestionManager.tsx
├── types/
│   └── compliance.ts ✅
└── hooks/
    ├── useComplianceForm.ts
    └── useComplianceScore.ts

supabase/
├── migrations/
│   └── YYYYMMDD_compliance_system.sql
└── functions/
    ├── get-sector-questions/
    ├── submit-compliance-application/
    ├── get-applications/
    ├── update-application-status/
    └── send-compliance-email/
```

---

## 🎨 UI/UX FLOW

### User Journey

1. **Sektör Seçimi**
   - `/sektorler` sayfasından sektör seç
   - Veya direkt `/basvuru?sektor=beyaz-esya`

2. **Form Doldurma (6 Adım)**
   - Step 1: Şirket bilgileri
   - Step 2: İletişim
   - Step 3: Finansal bilgiler
   - Step 4: VDMK talebi
   - Step 5: Uygunluk anketi (10 soru)
   - Step 6: Özet ve onay

3. **Skorlama & Sonuç**
   - Otomatik compliance score hesaplama
   - %60+ → "Uygun" (yeşil)
   - %40-60 → "Geliştirilmeli" (sarı)
   - %40 altı → "Uygun Değil" (kırmızı)

4. **Email Notification**
   - Kullanıcıya: Başvuru alındı + skor
   - Admin'e: Yeni başvuru + detaylar

### Admin Journey

1. **Dashboard**
   - Toplam başvuru sayısı
   - Ortalama compliance score
   - Durum dağılımı
   - Son başvurular

2. **Başvuru Listesi**
   - Filtreleme (sektör, durum, skor)
   - Sıralama (tarih, skor)
   - Arama (şirket adı, email)

3. **Başvuru Detayı**
   - Tüm form bilgileri
   - Compliance score breakdown
   - Kategori skorları (chart)
   - Soru-cevap listesi
   - Durum güncelleme
   - Review notes

4. **Soru Yönetimi**
   - Sektör bazlı soru listesi
   - Soru ekleme/düzenleme
   - Ağırlık ayarlama
   - Aktif/pasif toggle

---

## 💡 SCORING ALGORİTMASI

### Hesaplama Formülü

```
Toplam Skor = Σ (Soru Skoru × Ağırlık) / Σ (Max Skor × Ağırlık) × 100

Örnek:
Soru 1: 80/100 puan, ağırlık 8 → 640 puan
Soru 2: 100/100 puan, ağırlık 10 → 1000 puan
...
Toplam: 7200 / 10000 = %72 (UYGUN)
```

### Kategori Skorları

Her kategori için ayrı hesaplama:
- **Financial** (Finansal): En yüksek ağırlık
- **Operational** (Operasyonel): Orta ağırlık
- **Legal** (Yasal): Orta ağırlık
- **Experience** (Deneyim): Düşük ağırlık

### Qualifying Criteria

Bazı sorular "qualifying" (eleme) sorusu:
- `isQualifying: false` → Bu seçenek seçilirse otomatik fail
- Örnek: "Tahsilat %75 altı" → Fail

---

## 📧 EMAIL TEMPLATES

### 1. Application Received (Başvuru Alındı)

**Konu:** Başvurunuz Alındı - KolayMoney VDMK Finansman

**İçerik:**
```
Sayın [Contact Name],

[Company Name] için yaptığınız VDMK finansman başvurusu alınmıştır.

BAŞVURU BİLGİLERİ:
- Başvuru No: [ID]
- Sektör: [Sector]
- Talep Edilen Tutar: [Requested Amount]
- Vade: [Requested Term] gün

UYGUNLUK SKORU: %[Compliance Score]

[IF isPassed]
✅ TEBRİKLER! Başvurunuz uygunluk kriterlerini karşılıyor.
Başvurunuz 48 saat içinde detaylı olarak değerlendirilecek ve size dönüş yapılacaktır.

[ELSE]
⚠️ Başvurunuz şu an minimum kriterleri tam olarak karşılamamaktadır.
Ancak başvurunuz incelenecek ve alternatif çözümler için size dönüş yapılacaktır.

ÖNERİLER:
[Recommendations]

SONRAKI ADIMLAR:
1. Başvurunuz 48 saat içinde değerlendirilecek
2. Ek bilgi gerekirse sizinle iletişime geçilecek
3. Sonuç email ile bildirilecek

İletişim: hq@talya.vc | +90 555 868 16 34

Saygılarımızla,
OMG Capital Advisors
```

---

## 🔧 IMPLEMENTATION CHECKLIST

### Backend
- [ ] Database migration oluştur ve uygula
- [ ] Supabase types generate et
- [ ] Edge Functions oluştur (5 adet)
- [ ] RLS policies test et
- [ ] Email templates hazırla

### Frontend
- [ ] Kalan 6 sektör sorularını ekle (60 soru)
- [ ] ComplianceApplicationForm component'i
- [ ] 6 step component'i
- [ ] QuestionRenderer component'i
- [ ] ScoreDisplay component'i
- [ ] Admin: ComplianceApplications sayfası
- [ ] Admin: QuestionManager sayfası
- [ ] Routing güncelle

### Testing
- [ ] Form validation test
- [ ] Scoring algorithm test
- [ ] Email notification test
- [ ] Admin panel test
- [ ] Responsive test
- [ ] E2E test

---

## 📈 BAŞARI KRİTERLERİ

1. ✅ 10 sektör × 10 soru = 100 soru hazır
2. ✅ Compliance score doğru hesaplanıyor
3. ✅ %60 threshold doğru çalışıyor
4. ✅ Email notifications gönderiliyor
5. ✅ Admin panel tam fonksiyonel
6. ✅ Form UX akıcı ve sezgisel
7. ✅ Mobile responsive
8. ✅ Build hatasız

---

## 🎯 NEXT SESSION PROMPT

Yeni conversation başlattığınızda:

```
Merhaba! KolayMoney.com için "Compliance & Application System" implement edeceğiz.

MEVCUT DURUM:
- 10 sektör sayfası hazır ✅
- Types ve scoring engine hazır ✅
- İlk 4 sektör soruları hazır ✅
- Implementation plan hazır ✅

YAPILACAKLAR:
1. Database migration (supabase)
2. Kalan 60 soru ekle
3. Multi-step form component'leri
4. API endpoints (edge functions)
5. Admin dashboard
6. Email notifications

Detaylı plan: md/COMPLIANCE_SYSTEM_IMPLEMENTATION_PLAN.md

Başlayalım!
```

---

**Son Güncelleme:** 10 Şubat 2026  
**Durum:** Plan Hazır - Implementation Bekliyor  
**Tahmini Süre:** 4-6 saat (yeni session'da)
