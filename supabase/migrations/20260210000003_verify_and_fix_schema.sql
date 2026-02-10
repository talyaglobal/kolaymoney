-- ============================================
-- SCHEMA VERIFICATION AND FIXES
-- Created: 2026-02-10
-- Purpose: Ensure all tables and fields exist
-- ============================================

-- ============================================
-- 1. VERIFY AND CREATE MISSING TABLES
-- ============================================

-- Ensure applications table exists with all fields
DO $$ 
BEGIN
  -- Add any missing columns to applications table
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'applications' AND column_name = 'idempotency_key') THEN
    ALTER TABLE public.applications ADD COLUMN idempotency_key TEXT UNIQUE;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'applications' AND column_name = 'notes') THEN
    ALTER TABLE public.applications ADD COLUMN notes TEXT;
  END IF;
END $$;

-- Ensure compliance_applications table exists with all fields
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables 
                 WHERE table_schema = 'public' AND table_name = 'compliance_applications') THEN
    RAISE NOTICE 'Creating compliance_applications table...';
    
    CREATE TABLE public.compliance_applications (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      
      -- Company Info
      company_name TEXT NOT NULL,
      tax_number TEXT NOT NULL,
      company_type TEXT NOT NULL CHECK (company_type IN ('limited', 'anonim', 'sahis', 'kollektif')),
      sector TEXT NOT NULL,
      founding_year INTEGER NOT NULL,
      
      -- Contact
      contact_name TEXT NOT NULL,
      contact_title TEXT NOT NULL,
      contact_email TEXT NOT NULL,
      contact_phone TEXT NOT NULL,
      company_address TEXT NOT NULL,
      city TEXT NOT NULL,
      
      -- Financial
      annual_revenue NUMERIC NOT NULL,
      credit_sales_ratio NUMERIC NOT NULL,
      average_payment_term INTEGER NOT NULL,
      average_basket_size NUMERIC NOT NULL,
      monthly_receivables NUMERIC NOT NULL,
      
      -- VDMK Request
      requested_amount NUMERIC NOT NULL,
      requested_term INTEGER NOT NULL,
      purpose TEXT NOT NULL,
      
      -- Questionnaire
      question_responses JSONB NOT NULL DEFAULT '{}',
      
      -- Compliance Scoring
      compliance_score NUMERIC NOT NULL DEFAULT 0,
      is_passed BOOLEAN NOT NULL DEFAULT false,
      scoring_details JSONB NOT NULL DEFAULT '{}',
      
      -- Status
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
    
    ALTER TABLE public.compliance_applications ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Ensure sector_questions table exists
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables 
                 WHERE table_schema = 'public' AND table_name = 'sector_questions') THEN
    RAISE NOTICE 'Creating sector_questions table...';
    
    CREATE TABLE public.sector_questions (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      sector_slug TEXT NOT NULL,
      question_text TEXT NOT NULL,
      question_type TEXT NOT NULL CHECK (question_type IN ('single_choice', 'multiple_choice', 'number', 'yes_no', 'text')),
      options JSONB,
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
    
    ALTER TABLE public.sector_questions ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Ensure application_notifications table exists
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables 
                 WHERE table_schema = 'public' AND table_name = 'application_notifications') THEN
    RAISE NOTICE 'Creating application_notifications table...';
    
    CREATE TABLE public.application_notifications (
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
  END IF;
END $$;

-- ============================================
-- 2. ENSURE UPDATED_AT TRIGGERS
-- ============================================

-- Create or replace updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for all tables with updated_at
DO $$
BEGIN
  -- applications table
  IF EXISTS (SELECT 1 FROM information_schema.columns 
             WHERE table_name = 'applications' AND column_name = 'updated_at') THEN
    DROP TRIGGER IF EXISTS update_applications_updated_at ON public.applications;
    CREATE TRIGGER update_applications_updated_at
      BEFORE UPDATE ON public.applications
      FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
  
  -- compliance_applications table
  IF EXISTS (SELECT 1 FROM information_schema.columns 
             WHERE table_name = 'compliance_applications' AND column_name = 'updated_at') THEN
    DROP TRIGGER IF EXISTS update_compliance_applications_updated_at ON public.compliance_applications;
    CREATE TRIGGER update_compliance_applications_updated_at
      BEFORE UPDATE ON public.compliance_applications
      FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
  
  -- sector_questions table
  IF EXISTS (SELECT 1 FROM information_schema.columns 
             WHERE table_name = 'sector_questions' AND column_name = 'updated_at') THEN
    DROP TRIGGER IF EXISTS update_sector_questions_updated_at ON public.sector_questions;
    CREATE TRIGGER update_sector_questions_updated_at
      BEFORE UPDATE ON public.sector_questions
      FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
END $$;

-- ============================================
-- 3. ENSURE RLS POLICIES
-- ============================================

-- Compliance Applications RLS
DO $$
BEGIN
  -- Enable RLS if not already enabled
  ALTER TABLE public.compliance_applications ENABLE ROW LEVEL SECURITY;
  
  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "compliance_applications_insert" ON public.compliance_applications;
  DROP POLICY IF EXISTS "compliance_applications_admin_read" ON public.compliance_applications;
  DROP POLICY IF EXISTS "compliance_applications_admin_update" ON public.compliance_applications;
  
  -- Create policies
  CREATE POLICY "compliance_applications_insert"
  ON public.compliance_applications FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
  
  CREATE POLICY "compliance_applications_admin_read"
  ON public.compliance_applications FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin', 'viewer')
    )
  );
  
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
END $$;

-- Sector Questions RLS
DO $$
BEGIN
  ALTER TABLE public.sector_questions ENABLE ROW LEVEL SECURITY;
  
  DROP POLICY IF EXISTS "sector_questions_public_read" ON public.sector_questions;
  DROP POLICY IF EXISTS "sector_questions_admin_all" ON public.sector_questions;
  
  CREATE POLICY "sector_questions_public_read"
  ON public.sector_questions FOR SELECT
  TO anon, authenticated
  USING (is_active = true);
  
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
END $$;

-- ============================================
-- 4. VERIFY STORAGE BUCKETS
-- ============================================

-- Create application-documents bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('application-documents', 'application-documents', false)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for application-documents
DO $$
BEGIN
  -- Drop existing policies
  DROP POLICY IF EXISTS "application_documents_upload" ON storage.objects;
  DROP POLICY IF EXISTS "application_documents_read" ON storage.objects;
  DROP POLICY IF EXISTS "application_documents_delete" ON storage.objects;
  
  -- Allow authenticated users to upload
  CREATE POLICY "application_documents_upload"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'application-documents');
  
  -- Allow admins to read
  CREATE POLICY "application_documents_read"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'application-documents' AND
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE id = auth.uid()
    )
  );
  
  -- Allow admins to delete
  CREATE POLICY "application_documents_delete"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'application-documents' AND
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  );
END $$;

-- ============================================
-- 5. CREATE HELPFUL VIEWS
-- ============================================

-- View for all applications with admin info
CREATE OR REPLACE VIEW public.applications_with_admin AS
SELECT 
  a.*,
  au.full_name as reviewer_name,
  au.email as reviewer_email
FROM public.applications a
LEFT JOIN public.admin_users au ON a.reviewed_by = au.id;

-- View for compliance applications with statistics
CREATE OR REPLACE VIEW public.compliance_applications_stats AS
SELECT 
  sector,
  COUNT(*) as total_applications,
  AVG(compliance_score) as avg_score,
  COUNT(*) FILTER (WHERE is_passed = true) as passed_count,
  COUNT(*) FILTER (WHERE status = 'approved') as approved_count,
  COUNT(*) FILTER (WHERE status = 'rejected') as rejected_count,
  COUNT(*) FILTER (WHERE status = 'pending') as pending_count
FROM public.compliance_applications
GROUP BY sector;

-- ============================================
-- 6. VERIFICATION QUERY
-- ============================================

-- Output verification results
DO $$
DECLARE
  table_count INTEGER;
  applications_count INTEGER;
  compliance_count INTEGER;
  questions_count INTEGER;
  admin_count INTEGER;
BEGIN
  -- Count tables
  SELECT COUNT(*) INTO table_count
  FROM information_schema.tables
  WHERE table_schema = 'public'
  AND table_name IN ('applications', 'compliance_applications', 'sector_questions', 'admin_users', 'application_documents', 'application_notifications', 'activity_log');
  
  -- Count records
  SELECT COUNT(*) INTO applications_count FROM public.applications;
  SELECT COUNT(*) INTO compliance_count FROM public.compliance_applications;
  SELECT COUNT(*) INTO questions_count FROM public.sector_questions;
  SELECT COUNT(*) INTO admin_count FROM public.admin_users;
  
  RAISE NOTICE '============================================';
  RAISE NOTICE 'SCHEMA VERIFICATION COMPLETE';
  RAISE NOTICE '============================================';
  RAISE NOTICE 'Tables found: %', table_count;
  RAISE NOTICE 'Applications: %', applications_count;
  RAISE NOTICE 'Compliance Applications: %', compliance_count;
  RAISE NOTICE 'Sector Questions: %', questions_count;
  RAISE NOTICE 'Admin Users: %', admin_count;
  RAISE NOTICE '============================================';
END $$;
