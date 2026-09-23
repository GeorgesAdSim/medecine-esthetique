/*
  # Corriger les politiques RLS pour custom_pages
  
  1. Modifications
    - Supprimer les anciennes politiques qui comparent les IDs
    - Créer de nouvelles politiques qui vérifient l'email de l'utilisateur
    - Les admins peuvent gérer toutes les pages
    - Tout le monde peut lire les pages publiées
  
  2. Sécurité
    - Les politiques vérifient que l'email de l'utilisateur authentifié existe dans admin_users
    - Seuls les utilisateurs actifs peuvent gérer le contenu
*/

-- Supprimer les anciennes politiques
DROP POLICY IF EXISTS "Read pages" ON custom_pages;
DROP POLICY IF EXISTS "Admins manage pages" ON custom_pages;

-- Créer les nouvelles politiques basées sur l'email
CREATE POLICY "Admins can manage all pages"
  ON custom_pages
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.email = (SELECT auth.jwt()->>'email')
      AND admin_users.is_active = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.email = (SELECT auth.jwt()->>'email')
      AND admin_users.is_active = true
    )
  );

CREATE POLICY "Anyone can read published pages"
  ON custom_pages
  FOR SELECT
  TO authenticated
  USING (
    is_published = true
    OR EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.email = (SELECT auth.jwt()->>'email')
      AND admin_users.is_active = true
    )
  );
