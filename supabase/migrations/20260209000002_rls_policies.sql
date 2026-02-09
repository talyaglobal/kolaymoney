-- Row Level Security Policies
-- Following principle: "Always enable RLS - no exceptions"

-- Enable RLS on all tables
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- APPLICATIONS TABLE POLICIES
-- ============================================================================

-- Public can INSERT applications (for form submissions)
-- No authentication required for initial submission
CREATE POLICY "applications_public_insert"
ON public.applications
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Authenticated admins can SELECT all applications
CREATE POLICY "applications_admin_select"
ON public.applications
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE admin_users.id = auth.uid()
    AND admin_users.is_active = true
  )
);

-- Admins and super_admins can UPDATE applications
CREATE POLICY "applications_admin_update"
ON public.applications
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE admin_users.id = auth.uid()
    AND admin_users.is_active = true
    AND admin_users.role IN ('admin', 'super_admin')
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE admin_users.id = auth.uid()
    AND admin_users.is_active = true
    AND admin_users.role IN ('admin', 'super_admin')
  )
);

-- Only super_admins can DELETE applications
CREATE POLICY "applications_super_admin_delete"
ON public.applications
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE admin_users.id = auth.uid()
    AND admin_users.is_active = true
    AND admin_users.role = 'super_admin'
  )
);

-- ============================================================================
-- ADMIN_USERS TABLE POLICIES
-- ============================================================================

-- Authenticated admins can SELECT all admin users
CREATE POLICY "admin_users_select"
ON public.admin_users
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users au
    WHERE au.id = auth.uid()
    AND au.is_active = true
  )
);

-- Only super_admins can INSERT new admin users
CREATE POLICY "admin_users_super_admin_insert"
ON public.admin_users
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE admin_users.id = auth.uid()
    AND admin_users.is_active = true
    AND admin_users.role = 'super_admin'
  )
);

-- Only super_admins can UPDATE admin users
CREATE POLICY "admin_users_super_admin_update"
ON public.admin_users
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE admin_users.id = auth.uid()
    AND admin_users.is_active = true
    AND admin_users.role = 'super_admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE admin_users.id = auth.uid()
    AND admin_users.is_active = true
    AND admin_users.role = 'super_admin'
  )
);

-- Only super_admins can DELETE admin users
CREATE POLICY "admin_users_super_admin_delete"
ON public.admin_users
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE admin_users.id = auth.uid()
    AND admin_users.is_active = true
    AND admin_users.role = 'super_admin'
  )
);

-- ============================================================================
-- APPLICATION_DOCUMENTS TABLE POLICIES
-- ============================================================================

-- Public can INSERT documents (tied to application submission)
CREATE POLICY "application_documents_public_insert"
ON public.application_documents
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Admins can SELECT all documents
CREATE POLICY "application_documents_admin_select"
ON public.application_documents
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE admin_users.id = auth.uid()
    AND admin_users.is_active = true
  )
);

-- Admins can UPDATE documents
CREATE POLICY "application_documents_admin_update"
ON public.application_documents
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE admin_users.id = auth.uid()
    AND admin_users.is_active = true
    AND admin_users.role IN ('admin', 'super_admin')
  )
);

-- Super admins can DELETE documents
CREATE POLICY "application_documents_super_admin_delete"
ON public.application_documents
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE admin_users.id = auth.uid()
    AND admin_users.is_active = true
    AND admin_users.role = 'super_admin'
  )
);

-- ============================================================================
-- ACTIVITY_LOG TABLE POLICIES
-- ============================================================================

-- Only authenticated admins can SELECT activity logs
CREATE POLICY "activity_log_admin_select"
ON public.activity_log
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE admin_users.id = auth.uid()
    AND admin_users.is_active = true
  )
);

-- System can INSERT activity logs (via function)
CREATE POLICY "activity_log_system_insert"
ON public.activity_log
FOR INSERT
TO authenticated
WITH CHECK (true);

-- No one can UPDATE or DELETE activity logs (immutable audit trail)
-- Except super_admins in emergency situations
CREATE POLICY "activity_log_super_admin_delete"
ON public.activity_log
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE admin_users.id = auth.uid()
    AND admin_users.is_active = true
    AND admin_users.role = 'super_admin'
  )
);

-- ============================================================================
-- STORAGE POLICIES (for application documents)
-- ============================================================================

-- Create storage bucket for application documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('application-documents', 'application-documents', false)
ON CONFLICT (id) DO NOTHING;

-- Public can upload to application-documents bucket
CREATE POLICY "application_documents_upload"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'application-documents');

-- Admins can view all documents
CREATE POLICY "application_documents_view"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'application-documents'
  AND EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE admin_users.id = auth.uid()
    AND admin_users.is_active = true
  )
);

-- Super admins can delete documents
CREATE POLICY "application_documents_delete"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'application-documents'
  AND EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE admin_users.id = auth.uid()
    AND admin_users.is_active = true
    AND admin_users.role = 'super_admin'
  )
);
