-- ============================================
-- COMPLIANCE & APPLICATION SYSTEM
-- Created: 2026-02-10
-- ============================================

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

DROP POLICY IF EXISTS "sector_questions_public_read" ON public.sector_questions;
CREATE POLICY "sector_questions_public_read"
ON public.sector_questions FOR SELECT
TO anon, authenticated
USING (is_active = true);

DROP POLICY IF EXISTS "sector_questions_admin_all" ON public.sector_questions;
CREATE POLICY "sector_questions_admin_all"
ON public.sector_questions FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE id = auth.uid()
    AND role IN ('admin', 'super_admin')
  )
);

-- Compliance Applications: User can insert, admin can read all
ALTER TABLE public.compliance_applications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "compliance_applications_insert" ON public.compliance_applications;
CREATE POLICY "compliance_applications_insert"
ON public.compliance_applications FOR INSERT
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "compliance_applications_admin_read" ON public.compliance_applications;
CREATE POLICY "compliance_applications_admin_read"
ON public.compliance_applications FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE id = auth.uid()
    AND role IN ('admin', 'super_admin')
  )
);

DROP POLICY IF EXISTS "compliance_applications_admin_update" ON public.compliance_applications;
CREATE POLICY "compliance_applications_admin_update"
ON public.compliance_applications FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE id = auth.uid()
    AND role IN ('admin', 'super_admin')
  )
);

-- Notifications: Admin only
ALTER TABLE public.application_notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "notifications_admin_all" ON public.application_notifications;
CREATE POLICY "notifications_admin_all"
ON public.application_notifications FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE id = auth.uid()
    AND role IN ('admin', 'super_admin')
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

DROP TRIGGER IF EXISTS trigger_sector_questions_updated_at ON public.sector_questions;
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

DROP TRIGGER IF EXISTS trigger_compliance_applications_updated_at ON public.compliance_applications;
CREATE TRIGGER trigger_compliance_applications_updated_at
BEFORE UPDATE ON public.compliance_applications
FOR EACH ROW EXECUTE FUNCTION update_compliance_applications_updated_at();
