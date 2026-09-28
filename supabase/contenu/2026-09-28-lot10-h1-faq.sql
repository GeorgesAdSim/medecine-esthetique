-- BROUILLON — NON APPLIQUÉ. Lot 10 : titres H1 avec « Liège » sur 7 piliers et
-- FAQ élargies sur les 3 pages filles du lot 8 (celles du lot 9 sont dans son
-- propre SQL). Mises à jour CIBLÉES (jsonb_set) : n'écrasent rien d'autre, et
-- l'ajout de questions ne se fait qu'une fois (garde sur la première question).

UPDATE custom_pages SET content = jsonb_set(content, '{0,content,title}', '"Injections d''acide hyaluronique à Liège"'::jsonb), updated_at = now()
WHERE slug = 'acide-hyaluronique' AND content->0->>'type' = 'hero';

UPDATE custom_pages SET content = jsonb_set(content, '{0,content,title}', '"Peeling du visage à Liège : peelings médicaux"'::jsonb), updated_at = now()
WHERE slug = 'peeling' AND content->0->>'type' = 'hero';

UPDATE custom_pages SET content = jsonb_set(content, '{0,content,title}', '"Mésolift à Liège : mésothérapie du visage"'::jsonb), updated_at = now()
WHERE slug = 'mesolift' AND content->0->>'type' = 'hero';

UPDATE custom_pages SET content = jsonb_set(content, '{0,content,title}', '"Fils tenseurs à Liège : lifting sans chirurgie"'::jsonb), updated_at = now()
WHERE slug = 'fils-tenseurs' AND content->0->>'type' = 'hero';

UPDATE custom_pages SET content = jsonb_set(content, '{0,content,title}', '"Cosmétologie médicale à Liège"'::jsonb), updated_at = now()
WHERE slug = 'cosmetologie' AND content->0->>'type' = 'hero';

UPDATE custom_pages SET content = jsonb_set(content, '{0,content,title}', '"Liquid Lift à Liège : rajeunissement global par injections"'::jsonb), updated_at = now()
WHERE slug = 'liquid-lift' AND content->0->>'type' = 'hero';

UPDATE custom_pages SET content = jsonb_set(content, '{0,content,title}', '"Stimulateurs de collagène à Liège"'::jsonb), updated_at = now()
WHERE slug = 'stimulateur-collagene' AND content->0->>'type' = 'hero';

UPDATE custom_pages p
SET content = jsonb_set(p.content, ARRAY[f.i::text, 'content', 'questions'], (p.content->f.i->'content'->'questions') || '[{"question": "Que faut-il éviter après l''injection ?", "answer": "Pendant les 24 heures qui suivent : le sport intensif, l''exposition au soleil et à la chaleur. Les autres activités reprennent immédiatement."}, {"question": "Faut-il une consultation avant l''injection ?", "answer": "Oui : une consultation précède toujours le traitement. Elle permet d''examiner la zone, de vérifier les contre-indications et de définir ensemble le produit et la quantité."}, {"question": "Qui réalise l''injection ?", "answer": "La Dre Jocelyne Fassotte, médecin esthétique diplômée du Collège International de Médecine Esthétique (CIME), au cabinet de Vaux-sous-Chèvremont. L''injection d''acide hyaluronique est un acte médical."}, {"question": "Combien coûte le traitement ?", "answer": "Le tarif dépend de la quantité de produit utilisée. Il vous est communiqué lors de la consultation, avant toute injection."}, {"question": "Comment se passent les jours qui suivent ?", "answer": "Le jour même, les lèvres sont gonflées et sensibles, et des bleus peuvent apparaître. Le gonflement diminue ensuite progressivement : dans l''étude du produit, il durait de 15 à 30 jours chez environ quatre personnes sur dix."}, {"question": "Quand peut-on juger le résultat ?", "answer": "Une fois le gonflement résorbé : le volume des premiers jours ne reflète pas le résultat final."}, {"question": "J''ai souvent des boutons de fièvre : est-ce un problème ?", "answer": "Un bouton de fièvre en cours fait reporter l''injection. Si vous en faites souvent, signalez-le en consultation."}]'::jsonb), updated_at = now()
FROM (SELECT ord - 1 AS i FROM custom_pages, jsonb_array_elements(content) WITH ORDINALITY AS e(b, ord)
      WHERE slug = 'injection-levres' AND b->>'type' = 'faq' LIMIT 1) f
WHERE p.slug = 'injection-levres' AND position('Que faut-il éviter après l''injection ?' in p.content::text) = 0;

UPDATE custom_pages p
SET content = jsonb_set(p.content, ARRAY[f.i::text, 'content', 'questions'], (p.content->f.i->'content'->'questions') || '[{"question": "Que faut-il éviter après l''injection ?", "answer": "Pendant les 24 heures qui suivent : le sport intensif, l''exposition au soleil et à la chaleur. Les autres activités reprennent immédiatement."}, {"question": "Faut-il une consultation avant l''injection ?", "answer": "Oui : une consultation précède toujours le traitement. Elle permet d''examiner la zone, de vérifier les contre-indications et de définir ensemble le produit et la quantité."}, {"question": "Qui réalise l''injection ?", "answer": "La Dre Jocelyne Fassotte, médecin esthétique diplômée du Collège International de Médecine Esthétique (CIME), au cabinet de Vaux-sous-Chèvremont. L''injection d''acide hyaluronique est un acte médical."}, {"question": "Combien coûte le traitement ?", "answer": "Le tarif dépend de la quantité de produit utilisée. Il vous est communiqué lors de la consultation, avant toute injection."}, {"question": "Comment se passent les jours qui suivent ?", "answer": "Sensibilité au toucher, gonflement ou bleus sont fréquents les premiers jours et disparaissent le plus souvent en une à deux semaines."}]'::jsonb), updated_at = now()
FROM (SELECT ord - 1 AS i FROM custom_pages, jsonb_array_elements(content) WITH ORDINALITY AS e(b, ord)
      WHERE slug = 'injection-cernes' AND b->>'type' = 'faq' LIMIT 1) f
WHERE p.slug = 'injection-cernes' AND position('Que faut-il éviter après l''injection ?' in p.content::text) = 0;

UPDATE custom_pages p
SET content = jsonb_set(p.content, ARRAY[f.i::text, 'content', 'questions'], (p.content->f.i->'content'->'questions') || '[{"question": "Que faut-il éviter après l''injection ?", "answer": "Pendant 4 heures, évitez le sport intense et la position couchée, et ne massez pas les zones traitées le jour même. Les autres activités reprennent immédiatement."}, {"question": "Quand refaire le traitement ?", "answer": "Quand l''effet s''estompe, en général après quelques mois ; la notice officielle prévoit un intervalle d''au moins trois mois entre deux traitements."}, {"question": "Qui réalise l''injection ?", "answer": "La Dre Jocelyne Fassotte, médecin esthétique diplômée du Collège International de Médecine Esthétique (CIME). La notice officielle précise que la toxine botulique doit être administrée par des médecins qualifiés et expérimentés."}, {"question": "Combien coûte le traitement ?", "answer": "Le tarif dépend du nombre de zones traitées. Il vous est communiqué lors de la consultation, avant toute injection."}]'::jsonb), updated_at = now()
FROM (SELECT ord - 1 AS i FROM custom_pages, jsonb_array_elements(content) WITH ORDINALITY AS e(b, ord)
      WHERE slug = 'rides-du-lion' AND b->>'type' = 'faq' LIMIT 1) f
WHERE p.slug = 'rides-du-lion' AND position('Que faut-il éviter après l''injection ?' in p.content::text) = 0;
