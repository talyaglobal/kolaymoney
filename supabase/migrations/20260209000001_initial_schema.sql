-- KolayMoney.com Initial Database Schema
-- Following backend engineering principles: data integrity, proper indexing, audit trails

-- Create enums for type safety
CREATE TYPE sector_type AS ENUM (
  'b2c_retail',
  'b2c_automotive',
  'b2c_education',
  'b2b_fmcg',
  'b2b_construction',
  'b2b_logistics'
);

CREATE TYPE receivables_type AS ENUM (
  'invoices',
  'promissory_notes',
  'pos_installments',
  'contracts'
);

CREATE TYPE application_status AS ENUM (
  'pending',
  'under_review',
  'approved',
  'rejected',
  'issued'
);

CREATE TYPE admin_role AS ENUM (
  'super_admin',
  'admin',
  'viewer'
);

CREATE TYPE document_type AS ENUM (
  'financial_statement',
  'tax_certificate',
  'trade_registry',
  'receivables_list',
  'other'
);

-- Applications table - Core VDMK applications
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL CHECK (length(company_name) >= 2 AND length(company_name) <= 200),
  tax_number TEXT NOT NULL CHECK (tax_number ~ '^\d{10}$'),
  contact_person TEXT NOT NULL CHECK (length(contact_person) >= 2 AND length(contact_person) <= 100),
  email TEXT NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  phone TEXT NOT NULL CHECK (phone ~ '^\+90\d{10}$'),
  sector sector_type NOT NULL,
  financing_amount NUMERIC(15, 2) NOT NULL CHECK (financing_amount >= 100000 AND financing_amount <= 100000000),
  receivables_type receivables_type NOT NULL,
  payment_terms_months INTEGER NOT NULL CHECK (payment_terms_months >= 0 AND payment_terms_months <= 18),
  status application_status NOT NULL DEFAULT 'pending',
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES auth.users(id),
  notes TEXT,
  idempotency_key TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create immutable function for date extraction
CREATE OR REPLACE FUNCTION immutable_date(timestamptz) 
RETURNS date AS $$
  SELECT $1::date;
$$ LANGUAGE sql IMMUTABLE;

-- Prevent duplicate submissions on same day (idempotency)
CREATE UNIQUE INDEX idx_applications_duplicate_prevention 
ON public.applications (email, tax_number, immutable_date(submitted_at));

-- Performance indexes
CREATE INDEX idx_applications_status ON public.applications(status);
CREATE INDEX idx_applications_submitted_at ON public.applications(submitted_at DESC);
CREATE INDEX idx_applications_email ON public.applications(email);
CREATE INDEX idx_applications_tax_number ON public.applications(tax_number);

-- Admin users table
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL CHECK (length(full_name) >= 2 AND length(full_name) <= 100),
  email TEXT UNIQUE NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  role admin_role NOT NULL DEFAULT 'viewer',
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_admin_users_email ON public.admin_users(email);
CREATE INDEX idx_admin_users_role ON public.admin_users(role);

-- Application documents table
CREATE TABLE IF NOT EXISTS public.application_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
  document_type document_type NOT NULL,
  file_name TEXT NOT NULL CHECK (length(file_name) > 0),
  file_path TEXT NOT NULL CHECK (length(file_path) > 0),
  file_size INTEGER NOT NULL CHECK (file_size > 0 AND file_size <= 10485760), -- Max 10MB
  mime_type TEXT NOT NULL,
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_application_documents_application_id ON public.application_documents(application_id);
CREATE INDEX idx_application_documents_uploaded_at ON public.application_documents(uploaded_at DESC);

-- Activity log for audit trail
CREATE TABLE IF NOT EXISTS public.activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.admin_users(id) ON DELETE SET NULL,
  action TEXT NOT NULL CHECK (length(action) > 0),
  resource_type TEXT NOT NULL CHECK (length(resource_type) > 0),
  resource_id UUID NOT NULL,
  metadata JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_activity_log_user_id ON public.activity_log(user_id);
CREATE INDEX idx_activity_log_resource ON public.activity_log(resource_type, resource_id);
CREATE INDEX idx_activity_log_created_at ON public.activity_log(created_at DESC);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for applications table
CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON public.applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to log activity
CREATE OR REPLACE FUNCTION log_activity(
  p_user_id UUID,
  p_action TEXT,
  p_resource_type TEXT,
  p_resource_id UUID,
  p_metadata JSONB DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  v_log_id UUID;
BEGIN
  INSERT INTO public.activity_log (user_id, action, resource_type, resource_id, metadata)
  VALUES (p_user_id, p_action, p_resource_type, p_resource_id, p_metadata)
  RETURNING id INTO v_log_id;
  
  RETURN v_log_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Comments for documentation
COMMENT ON TABLE public.applications IS 'VDMK (Asset-Backed Securities) applications from businesses';
COMMENT ON TABLE public.admin_users IS 'Admin users with role-based access control';
COMMENT ON TABLE public.application_documents IS 'Documents uploaded with applications';
COMMENT ON TABLE public.activity_log IS 'Audit trail for all admin actions';
