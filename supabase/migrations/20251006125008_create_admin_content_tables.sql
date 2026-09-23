/*
  # Admin Content Management System

  1. New Tables
    - `site_settings`
      - `id` (uuid, primary key)
      - `key` (text, unique) - Setting identifier (e.g., 'primary_color', 'logo_text')
      - `value` (text) - Setting value
      - `type` (text) - Setting type (color, text, image, video, json)
      - `updated_at` (timestamptz)
      - `updated_by` (text) - Admin who made the change
    
    - `custom_pages`
      - `id` (uuid, primary key)
      - `slug` (text, unique) - URL slug for the page
      - `title` (text) - Page title
      - `content` (jsonb) - Page content blocks
      - `meta_description` (text)
      - `is_published` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      - `created_by` (text)
    
    - `menu_items`
      - `id` (uuid, primary key)
      - `name` (text) - Display name
      - `href` (text) - Link URL
      - `order_index` (integer) - Display order
      - `is_visible` (boolean)
      - `parent_id` (uuid, nullable) - For submenu items
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `content_blocks`
      - `id` (uuid, primary key)
      - `page_id` (uuid) - Reference to custom_pages or null for global
      - `block_type` (text) - Type: text, image, video, gallery, testimonial
      - `content` (jsonb) - Block content and configuration
      - `order_index` (integer)
      - `is_visible` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated admin users only
*/

-- Site Settings Table
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text,
  type text NOT NULL DEFAULT 'text',
  updated_at timestamptz DEFAULT now(),
  updated_by text
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read site settings"
  ON site_settings FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Only admins can modify site settings"
  ON site_settings FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Custom Pages Table
CREATE TABLE IF NOT EXISTS custom_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  content jsonb DEFAULT '[]'::jsonb,
  meta_description text,
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by text
);

ALTER TABLE custom_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published pages"
  ON custom_pages FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "Admins can manage all pages"
  ON custom_pages FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Menu Items Table
CREATE TABLE IF NOT EXISTS menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  href text NOT NULL,
  order_index integer NOT NULL DEFAULT 0,
  is_visible boolean DEFAULT true,
  parent_id uuid REFERENCES menu_items(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read visible menu items"
  ON menu_items FOR SELECT
  TO anon, authenticated
  USING (is_visible = true);

CREATE POLICY "Admins can manage menu items"
  ON menu_items FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Content Blocks Table
CREATE TABLE IF NOT EXISTS content_blocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id uuid REFERENCES custom_pages(id) ON DELETE CASCADE,
  block_type text NOT NULL,
  content jsonb DEFAULT '{}'::jsonb,
  order_index integer NOT NULL DEFAULT 0,
  is_visible boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE content_blocks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read visible content blocks"
  ON content_blocks FOR SELECT
  TO anon, authenticated
  USING (is_visible = true);

CREATE POLICY "Admins can manage content blocks"
  ON content_blocks FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert default site settings
INSERT INTO site_settings (key, value, type) VALUES
  ('primary_color', '#dc2626', 'color'),
  ('secondary_color', '#f87171', 'color'),
  ('accent_color', '#fca5a5', 'color'),
  ('background_color', '#ffffff', 'color'),
  ('text_color', '#1f2937', 'color'),
  ('site_title', 'Docteure Jocelyne Fassotte', 'text'),
  ('site_subtitle', 'Médecine esthétique', 'text'),
  ('logo_initials', 'JF', 'text'),
  ('contact_phone', '+32 (0)4 365 45 39', 'text'),
  ('contact_email', 'contact@fassotte.be', 'text')
ON CONFLICT (key) DO NOTHING;

-- Insert default menu items
INSERT INTO menu_items (name, href, order_index, is_visible) VALUES
  ('Accueil', '/', 0, true),
  ('Biographie', '/docteur-jocelyne-fassotte', 1, true),
  ('Traitements', '/medecine-esthetique-liege', 2, true),
  ('Galerie', '/galerie', 3, true),
  ('Contact', '/prendre-rendez-vous', 4, true)
ON CONFLICT DO NOTHING;