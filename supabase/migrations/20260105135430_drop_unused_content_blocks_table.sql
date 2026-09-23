/*
  # Suppression table content_blocks inutilisée

  ## Description
  Cette migration supprime la table `content_blocks` qui n'est plus utilisée.
  Les blocs de contenu sont maintenant stockés directement dans la colonne
  `content` (JSONB) de la table `custom_pages`.

  ## Tables supprimées
  - `content_blocks` - Table legacy non utilisée (0 lignes)

  ## Justification
  - Le nouveau système CMS stocke les blocs directement dans `custom_pages.content`
  - La table `content_blocks` était utilisée par l'ancien système PageBuilder
  - Suppression dans le cadre du nettoyage Phase 4 (Vague 1)
  - Aucune donnée n'est perdue car la table est vide

  ## Impact
  - Aucun impact sur les fonctionnalités existantes
  - Simplifie la structure de la base de données
  - Supprime une table inutilisée et sa foreign key constraint
*/

-- Supprimer la table content_blocks et toutes ses contraintes
DROP TABLE IF EXISTS content_blocks CASCADE;
