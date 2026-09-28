-- Appliqué en production le 28/09/2026 (éditeur SQL Supabase). Trace, ne pas rejouer.
-- Décisions du 28/09/2026 (Georges) : téléphone = GSM, horaires réels, pas de carte sur la page rendez-vous.
UPDATE custom_pages SET
  content = (
    SELECT jsonb_agg(
      CASE elem->>'id'
        WHEN 'block-contact-info-2' THEN jsonb_set(elem, '{content,phone}', '"+32 495 28 09 76"')
        WHEN 'block-cards-4' THEN jsonb_set(elem, '{content,cards}', '[
          {"title": "Horaires de consultation", "details": [
            "Lundi et mardi : fermé",
            "Mercredi : 9h30 - 12h00 et 13h30 - 19h00",
            "Jeudi : 9h30 - 12h00 et 14h00 - 18h00",
            "Vendredi : 9h30 - 12h00 et 13h30 - 19h00"
          ]},
          {"title": "Informations pratiques", "details": [
            "Consultation sur rendez-vous uniquement",
            "Première consultation : 30 minutes",
            "Traitements : durée variable"
          ]}
        ]'::jsonb)
        WHEN 'block-cta-5' THEN jsonb_set(elem, '{content,primaryButton,link}', '"tel:+32495280976"')
        ELSE elem
      END ORDER BY ord)
    FROM jsonb_array_elements(content) WITH ORDINALITY AS t(elem, ord)
    WHERE elem->>'id' <> 'block-map-3'
  ),
  updated_at = now()
WHERE slug = 'prendre-rendez-vous';

UPDATE custom_pages SET
  content = (
    SELECT jsonb_agg(
      CASE elem->>'id'
        WHEN 'block-cta-3' THEN jsonb_set(elem, '{content,secondaryButton}', '{"link": "tel:+32495280976", "text": "+32 495 28 09 76"}')
        ELSE elem
      END ORDER BY ord)
    FROM jsonb_array_elements(content) WITH ORDINALITY AS t(elem, ord)
  ),
  updated_at = now()
WHERE slug = 'accueil';

SELECT slug, jsonb_array_length(content) AS blocs, updated_at FROM custom_pages WHERE slug IN ('prendre-rendez-vous', 'accueil');
