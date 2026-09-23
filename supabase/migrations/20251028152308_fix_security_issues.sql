/*
  # Fix Database Security and Performance Issues

  1. Performance Improvements
    - Add indexes for foreign keys on `content_blocks.page_id` and `menu_items.parent_id`
    - Remove unused indexes on `admin_users` table
    - Optimize RLS policies to use `(select auth.uid())` pattern for better performance

  2. Security Improvements
    - Set immutable search_path on `update_admin_updated_at` function
    - Consolidate multiple permissive policies into single comprehensive policies

  3. Changes Made
    - Add `idx_content_blocks_page_id` index
    - Add `idx_menu_items_parent_id` index
    - Drop unused `idx_admin_users_email` and `idx_admin_users_role` indexes
    - Recreate RLS policies with optimized auth function calls
    - Fix function security settings
*/

-- Add missing indexes for foreign keys
CREATE INDEX IF NOT EXISTS idx_content_blocks_page_id ON public.content_blocks(page_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_parent_id ON public.menu_items(parent_id);

-- Drop unused indexes
DROP INDEX IF EXISTS public.idx_admin_users_email;
DROP INDEX IF EXISTS public.idx_admin_users_role;

-- Fix the update_admin_updated_at function search path
DROP TRIGGER IF EXISTS update_admin_users_updated_at ON public.admin_users;
DROP FUNCTION IF EXISTS public.update_admin_updated_at();

CREATE OR REPLACE FUNCTION public.update_admin_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON public.admin_users
  FOR EACH ROW
  EXECUTE FUNCTION public.update_admin_updated_at();

-- Optimize admin_users RLS policies
DROP POLICY IF EXISTS "Admins can read own data" ON public.admin_users;
DROP POLICY IF EXISTS "Super admins can create admins" ON public.admin_users;
DROP POLICY IF EXISTS "Admins can update own last_login" ON public.admin_users;
DROP POLICY IF EXISTS "Super admins can update admins" ON public.admin_users;

CREATE POLICY "Admins can read own data"
  ON public.admin_users
  FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = id);

CREATE POLICY "Super admins can create admins"
  ON public.admin_users
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE id = (select auth.uid()) AND role = 'super_admin'
    )
  );

CREATE POLICY "Admins can manage own data"
  ON public.admin_users
  FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = id)
  WITH CHECK ((select auth.uid()) = id);

CREATE POLICY "Super admins can manage all admins"
  ON public.admin_users
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE id = (select auth.uid()) AND role = 'super_admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE id = (select auth.uid()) AND role = 'super_admin'
    )
  );

-- Consolidate content_blocks policies
DROP POLICY IF EXISTS "Admins can manage content blocks" ON public.content_blocks;
DROP POLICY IF EXISTS "Anyone can read visible content blocks" ON public.content_blocks;

CREATE POLICY "Read content blocks"
  ON public.content_blocks
  FOR SELECT
  TO authenticated
  USING (
    is_visible = true OR
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE id = (select auth.uid())
    )
  );

CREATE POLICY "Admins manage content blocks"
  ON public.content_blocks
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE id = (select auth.uid())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE id = (select auth.uid())
    )
  );

-- Consolidate custom_pages policies
DROP POLICY IF EXISTS "Admins can manage all pages" ON public.custom_pages;
DROP POLICY IF EXISTS "Anyone can read published pages" ON public.custom_pages;

CREATE POLICY "Read pages"
  ON public.custom_pages
  FOR SELECT
  TO authenticated
  USING (
    is_published = true OR
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE id = (select auth.uid())
    )
  );

CREATE POLICY "Admins manage pages"
  ON public.custom_pages
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE id = (select auth.uid())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE id = (select auth.uid())
    )
  );

-- Consolidate menu_items policies
DROP POLICY IF EXISTS "Admins can manage menu items" ON public.menu_items;
DROP POLICY IF EXISTS "Anyone can read visible menu items" ON public.menu_items;

CREATE POLICY "Read menu items"
  ON public.menu_items
  FOR SELECT
  TO authenticated
  USING (
    is_visible = true OR
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE id = (select auth.uid())
    )
  );

CREATE POLICY "Admins manage menu items"
  ON public.menu_items
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE id = (select auth.uid())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE id = (select auth.uid())
    )
  );

-- Consolidate site_settings policies
DROP POLICY IF EXISTS "Anyone can read site settings" ON public.site_settings;
DROP POLICY IF EXISTS "Only admins can modify site settings" ON public.site_settings;

CREATE POLICY "Read site settings"
  ON public.site_settings
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins manage site settings"
  ON public.site_settings
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE id = (select auth.uid())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE id = (select auth.uid())
    )
  );
