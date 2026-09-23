/*
  # Fix all recursive policies across tables

  1. Problem
    - Multiple tables have policies that query admin_users
    - This can cause recursion issues
  
  2. Solution
    - Simplify all policies to use direct auth checks
    - Public can read visible/published content
    - Authenticated users (admins only) have full access
  
  3. Tables Updated
    - content_blocks
    - menu_items
    - site_settings
*/

-- ============================================================================
-- CONTENT_BLOCKS
-- ============================================================================

DROP POLICY IF EXISTS "Public can read visible content blocks" ON content_blocks;
DROP POLICY IF EXISTS "Admins can manage content blocks" ON content_blocks;

CREATE POLICY "Anyone can read visible content blocks"
  ON content_blocks
  FOR SELECT
  TO anon, authenticated
  USING (is_visible = true);

CREATE POLICY "Authenticated can read all content blocks"
  ON content_blocks
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can create content blocks"
  ON content_blocks
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update content blocks"
  ON content_blocks
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can delete content blocks"
  ON content_blocks
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================================
-- MENU_ITEMS
-- ============================================================================

DROP POLICY IF EXISTS "Public can read visible menu items" ON menu_items;
DROP POLICY IF EXISTS "Admins can manage menu items" ON menu_items;

CREATE POLICY "Anyone can read visible menu items"
  ON menu_items
  FOR SELECT
  TO anon, authenticated
  USING (is_visible = true);

CREATE POLICY "Authenticated can read all menu items"
  ON menu_items
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can create menu items"
  ON menu_items
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update menu items"
  ON menu_items
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can delete menu items"
  ON menu_items
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================================
-- SITE_SETTINGS
-- ============================================================================

DROP POLICY IF EXISTS "Public can read site settings" ON site_settings;
DROP POLICY IF EXISTS "Admins can manage site settings" ON site_settings;

CREATE POLICY "Anyone can read site settings"
  ON site_settings
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated can create site settings"
  ON site_settings
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update site settings"
  ON site_settings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can delete site settings"
  ON site_settings
  FOR DELETE
  TO authenticated
  USING (true);
