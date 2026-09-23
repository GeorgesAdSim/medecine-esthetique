/*
  # Peuplement initial de menu_items

  ## Description
  Cette migration peuple la table `menu_items` avec les liens de navigation
  actuellement hardcodés dans le composant Header.tsx.

  ## Données insérées
  - 5 items de menu principal :
    1. Accueil (/)
    2. À propos (/docteur-jocelyne-fassotte)
    3. Traitements (/medecine-esthetique-liege)
    4. Galerie (/galerie)
    5. Contact (/prendre-rendez-vous)

  ## Structure
  - Tous les items sont de niveau racine (parent_id = NULL)
  - Ordre défini par order_index (0-4)
  - Tous les items sont visibles par défaut

  ## Impact
  - Permet de rendre le menu éditable via AdminDashboard
  - Fait partie de la Vague 4 : Menu & Footer dynamiques
*/

-- Vider la table si elle contient déjà des données (pour idempotence)
TRUNCATE TABLE menu_items RESTART IDENTITY CASCADE;

-- Insérer les items du menu principal
INSERT INTO menu_items (name, href, parent_id, order_index, is_visible, created_at, updated_at) VALUES
  ('Accueil', '/', NULL, 0, true, now(), now()),
  ('À propos', '/docteur-jocelyne-fassotte', NULL, 1, true, now(), now()),
  ('Traitements', '/medecine-esthetique-liege', NULL, 2, true, now(), now()),
  ('Galerie', '/galerie', NULL, 3, true, now(), now()),
  ('Contact', '/prendre-rendez-vous', NULL, 4, true, now(), now());
