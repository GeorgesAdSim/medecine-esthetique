/*
  # Activer l'accès anonyme en lecture pour toutes les tables publiques
  
  1. Modifications
    - Permettre l'accès anonyme (anon role) pour la lecture
    - Les utilisateurs non authentifiés peuvent voir le site public
    - Les admins authentifiés gardent leurs permissions de modification
  
  2. Sécurité
    - Lecture publique pour le contenu visible
    - Modification restreinte aux admins authentifiés uniquement
*/

-- Custom Pages - Accès anonyme pour les pages publiées
DROP POLICY IF EXISTS "Public can read published pages" ON custom_pages;

CREATE POLICY "Public can read published pages"
  ON custom_pages
  FOR SELECT
  TO anon, authenticated
  USING (
    is_published = true
    OR (
      auth.jwt()->>'email' IS NOT NULL
      AND EXISTS (
        SELECT 1 FROM admin_users
        WHERE admin_users.email = (SELECT auth.jwt()->>'email')
        AND admin_users.is_active = true
      )
    )
  );

-- Site Settings - Accès anonyme en lecture
DROP POLICY IF EXISTS "Public can read site settings" ON site_settings;

CREATE POLICY "Public can read site settings"
  ON site_settings
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Menu Items - Accès anonyme pour les items visibles
DROP POLICY IF EXISTS "Public can read visible menu items" ON menu_items;

CREATE POLICY "Public can read visible menu items"
  ON menu_items
  FOR SELECT
  TO anon, authenticated
  USING (
    is_visible = true
    OR (
      auth.jwt()->>'email' IS NOT NULL
      AND EXISTS (
        SELECT 1 FROM admin_users
        WHERE admin_users.email = (SELECT auth.jwt()->>'email')
        AND admin_users.is_active = true
      )
    )
  );

-- Content Blocks - Accès anonyme pour les blocks visibles
DROP POLICY IF EXISTS "Public can read visible content blocks" ON content_blocks;

CREATE POLICY "Public can read visible content blocks"
  ON content_blocks
  FOR SELECT
  TO anon, authenticated
  USING (
    is_visible = true
    OR (
      auth.jwt()->>'email' IS NOT NULL
      AND EXISTS (
        SELECT 1 FROM admin_users
        WHERE admin_users.email = (SELECT auth.jwt()->>'email')
        AND admin_users.is_active = true
      )
    )
  );
