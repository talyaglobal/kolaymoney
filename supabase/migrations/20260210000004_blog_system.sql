-- ============================================
-- BLOG SYSTEM
-- Created: 2026-02-10
-- Purpose: Blog posts table and seed data
-- ============================================

-- ============================================
-- 1. BLOG POSTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT 'KolayMoney Ekibi',
  author_title TEXT,
  author_avatar TEXT,
  publish_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  modified_date TIMESTAMPTZ,
  featured_image TEXT,
  tags TEXT[] NOT NULL DEFAULT '{}',
  read_time INTEGER NOT NULL DEFAULT 5,
  is_published BOOLEAN NOT NULL DEFAULT true,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  view_count INTEGER NOT NULL DEFAULT 0,
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON public.blog_posts(is_published, publish_date DESC);
CREATE INDEX idx_blog_posts_featured ON public.blog_posts(is_featured, publish_date DESC);
CREATE INDEX idx_blog_posts_tags ON public.blog_posts USING GIN(tags);

-- ============================================
-- 2. RLS POLICIES
-- ============================================
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Public read access for published posts
DROP POLICY IF EXISTS "blog_posts_public_read" ON public.blog_posts;
CREATE POLICY "blog_posts_public_read"
ON public.blog_posts FOR SELECT
TO anon, authenticated
USING (is_published = true);

-- Admin full access
DROP POLICY IF EXISTS "blog_posts_admin_all" ON public.blog_posts;
CREATE POLICY "blog_posts_admin_all"
ON public.blog_posts FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE id = auth.uid()
    AND role IN ('admin', 'super_admin')
  )
);

-- ============================================
-- 3. UPDATED_AT TRIGGER
-- ============================================
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON public.blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- 4. VIEW COUNT FUNCTION
-- ============================================
CREATE OR REPLACE FUNCTION public.increment_blog_view_count(post_slug TEXT)
RETURNS void AS $$
BEGIN
  UPDATE public.blog_posts
  SET view_count = view_count + 1
  WHERE slug = post_slug AND is_published = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 5. VERIFICATION
-- ============================================
DO $$
BEGIN
  RAISE NOTICE 'Blog system tables created successfully';
  RAISE NOTICE 'Table: blog_posts';
  RAISE NOTICE 'RLS: Enabled';
  RAISE NOTICE 'Policies: Public read, Admin full access';
END $$;
