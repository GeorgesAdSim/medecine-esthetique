/*
  # Création de la table gallery_images pour la gestion des photos

  1. Nouvelle table
    - `gallery_images`
      - `id` (uuid, clé primaire)
      - `category` (text) - Type de soin (botox, hyaluronic, peeling, mesolift, threads, collagen, cabinet)
      - `treatment_name` (text) - Nom du traitement affiché
      - `image_url` (text) - URL de l'image dans le storage
      - `alt_text` (text) - Texte alternatif pour le SEO
      - `description` (text) - Description de l'image
      - `display_order` (integer) - Ordre d'affichage
      - `is_active` (boolean) - Si l'image est visible ou non
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Sécurité
    - Enable RLS sur `gallery_images`
    - Policy SELECT publique pour lecture anonyme
    - Policy INSERT/UPDATE/DELETE pour admin authentifié uniquement
*/

-- Créer la table gallery_images
CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL CHECK (category IN ('botox', 'hyaluronic', 'peeling', 'mesolift', 'threads', 'collagen', 'cabinet')),
  treatment_name text NOT NULL,
  image_url text NOT NULL,
  alt_text text NOT NULL,
  description text,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Policy pour lecture publique
CREATE POLICY "Anyone can view active gallery images"
  ON gallery_images
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- Policy pour les admins - SELECT
CREATE POLICY "Admins can view all gallery images"
  ON gallery_images
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.email = auth.jwt() ->> 'email'
    )
  );

-- Policy pour les admins - INSERT
CREATE POLICY "Admins can insert gallery images"
  ON gallery_images
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.email = auth.jwt() ->> 'email'
    )
  );

-- Policy pour les admins - UPDATE
CREATE POLICY "Admins can update gallery images"
  ON gallery_images
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.email = auth.jwt() ->> 'email'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.email = auth.jwt() ->> 'email'
    )
  );

-- Policy pour les admins - DELETE
CREATE POLICY "Admins can delete gallery images"
  ON gallery_images
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.email = auth.jwt() ->> 'email'
    )
  );

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_gallery_images_category ON gallery_images(category);
CREATE INDEX IF NOT EXISTS idx_gallery_images_display_order ON gallery_images(display_order);
CREATE INDEX IF NOT EXISTS idx_gallery_images_is_active ON gallery_images(is_active);

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_gallery_images_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour updated_at
DROP TRIGGER IF EXISTS set_gallery_images_updated_at ON gallery_images;
CREATE TRIGGER set_gallery_images_updated_at
  BEFORE UPDATE ON gallery_images
  FOR EACH ROW
  EXECUTE FUNCTION update_gallery_images_updated_at();
