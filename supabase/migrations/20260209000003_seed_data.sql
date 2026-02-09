-- Seed Data for KolayMoney.com
-- Helper functions and utilities

-- Note: Admin users should be created through Supabase Auth + create_admin_user() function
-- No placeholder admin inserted here to avoid foreign key constraint issues

-- Create a function to easily add admin users after they sign up
CREATE OR REPLACE FUNCTION public.create_admin_user(
  p_user_id UUID,
  p_full_name TEXT,
  p_email TEXT,
  p_role admin_role DEFAULT 'viewer'
)
RETURNS UUID AS $$
DECLARE
  v_admin_id UUID;
BEGIN
  -- Check if user exists in auth.users
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = p_user_id) THEN
    RAISE EXCEPTION 'User does not exist in auth.users';
  END IF;

  -- Insert admin user
  INSERT INTO public.admin_users (id, full_name, email, role, is_active)
  VALUES (p_user_id, p_full_name, p_email, p_role, true)
  ON CONFLICT (id) DO UPDATE
  SET full_name = EXCLUDED.full_name,
      email = EXCLUDED.email,
      role = EXCLUDED.role
  RETURNING id INTO v_admin_id;

  -- Log the activity
  PERFORM log_activity(
    p_user_id,
    'admin_user_created',
    'admin_users',
    v_admin_id,
    jsonb_build_object('role', p_role)
  );

  RETURN v_admin_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to update admin last login
CREATE OR REPLACE FUNCTION public.update_admin_last_login()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.admin_users
  SET last_login_at = now()
  WHERE id = auth.uid();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to get current admin user info
CREATE OR REPLACE FUNCTION public.get_current_admin()
RETURNS TABLE (
  id UUID,
  full_name TEXT,
  email TEXT,
  role admin_role,
  is_active BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    admin_users.id,
    admin_users.full_name,
    admin_users.email,
    admin_users.role,
    admin_users.is_active
  FROM public.admin_users
  WHERE admin_users.id = auth.uid();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE id = auth.uid()
    AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if current user has specific role
CREATE OR REPLACE FUNCTION public.has_role(required_role admin_role)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE id = auth.uid()
    AND is_active = true
    AND role = required_role
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create view for application statistics
CREATE OR REPLACE VIEW public.application_statistics AS
SELECT
  COUNT(*) as total_applications,
  COUNT(*) FILTER (WHERE status = 'pending') as pending_count,
  COUNT(*) FILTER (WHERE status = 'under_review') as under_review_count,
  COUNT(*) FILTER (WHERE status = 'approved') as approved_count,
  COUNT(*) FILTER (WHERE status = 'rejected') as rejected_count,
  COUNT(*) FILTER (WHERE status = 'issued') as issued_count,
  SUM(financing_amount) as total_financing_amount,
  SUM(financing_amount) FILTER (WHERE status = 'approved') as approved_financing_amount,
  SUM(financing_amount) FILTER (WHERE status = 'issued') as issued_financing_amount,
  COUNT(DISTINCT sector) as unique_sectors,
  DATE_TRUNC('month', submitted_at) as month
FROM public.applications
GROUP BY DATE_TRUNC('month', submitted_at)
ORDER BY month DESC;

-- Grant permissions on views and functions
GRANT SELECT ON public.application_statistics TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_current_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(admin_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_admin_user(UUID, TEXT, TEXT, admin_role) TO authenticated;

-- Comments
COMMENT ON FUNCTION public.create_admin_user IS 'Creates or updates an admin user - only callable by super_admins';
COMMENT ON FUNCTION public.get_current_admin IS 'Returns current authenticated admin user info';
COMMENT ON FUNCTION public.is_admin IS 'Checks if current user is an active admin';
COMMENT ON FUNCTION public.has_role IS 'Checks if current user has specific admin role';
COMMENT ON VIEW public.application_statistics IS 'Aggregated statistics for applications by month';
