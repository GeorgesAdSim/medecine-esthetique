-- BROUILLON — NON APPLIQUÉ. Trois pages filles (lot 9), à valider par la Dre
-- Fassotte, puis à exécuter dans l'éditeur SQL Supabase.
-- /acide-hyaluronique-liege/sillons-nasogeniens, /botox-liege/pattes-d-oie,
-- /botox-liege/rides-du-front. Idempotent (même slug : pas de doublon).

INSERT INTO custom_pages (slug, title, content, meta_description, is_published)
SELECT 'sillons-nasogeniens', 'Sillons nasogéniens', '[
  {
    "id": "block-hero-0",
    "type": "hero",
    "order": 0,
    "content": {
      "title": "Sillons nasogéniens : injection d''acide hyaluronique à Liège",
      "subtitle": "Adoucir les plis entre le nez et la bouche, par la Dre Jocelyne Fassotte, médecin esthétique",
      "description": "Les sillons nasogéniens sont les plis qui descendent des ailes du nez vers les coins de la bouche. Quand ils se creusent, une injection d''acide hyaluronique peut les combler et adoucir l''expression. L''amélioration a été observée jusqu''à un an dans les études, et le produit se résorbe progressivement.",
      "image": "https://hxgfakegwewcfkxvltgl.supabase.co/storage/v1/object/public/media/1771937027109-qefsfr.jpeg",
      "imageAlt": "Zones d''injection acide hyaluronique sur le visage",
      "ctaText": "Prendre rendez-vous",
      "ctaLink": "/prendre-rendez-vous"
    }
  },
  {
    "id": "block-text-1",
    "type": "text",
    "order": 1,
    "content": {
      "ancre": "pourquoi",
      "title": "Pourquoi les sillons nasogéniens se creusent",
      "paragraphs": [
        "Le sillon nasogénien existe chez tout le monde : c''est le pli que dessine le sourire. Avec les années, la peau perd de sa fermeté, les volumes des joues diminuent et le pli se marque, même au repos, donnant un air fatigué ou triste.",
        "L''acide hyaluronique, injecté dans le derme, comble le sillon. Quand le pli vient surtout d''un relâchement de la joue, d''autres zones peuvent être évaluées en consultation, comme les pommettes dans une approche plus globale de type [[Liquid Lift|/liquid-lift-liege]].",
        "Le traitement des sillons fait partie des [[injections d''acide hyaluronique|/acide-hyaluronique-liege]] pratiquées au cabinet."
      ]
    }
  },
  {
    "id": "block-cards-2",
    "type": "cards",
    "order": 2,
    "content": {
      "ancre": "deroulement",
      "title": "Le déroulement d''une injection des sillons",
      "subtitle": "Une séance courte, au cabinet, après une consultation.",
      "cards": [
        {
          "title": "1. Consultation",
          "description": "Analyse du sillon au repos et au sourire, de vos attentes, de vos antécédents et traitements en cours.",
          "details": [
            "Choix du produit et de la quantité"
          ]
        },
        {
          "title": "2. Injection",
          "description": "Injection précise d''un acide hyaluronique adapté, contenant de la lidocaïne.",
          "details": [
            "Effet visible dès la séance"
          ]
        },
        {
          "title": "3. Les jours qui suivent",
          "description": "Rougeur, gonflement, sensibilité ou bleus sont fréquents au début.",
          "details": [
            "Le plus souvent résolus en une semaine",
            "Éviter sport intensif, soleil et chaleur pendant 24 heures"
          ]
        }
      ]
    }
  },
  {
    "id": "block-cards-3",
    "type": "cards",
    "order": 3,
    "content": {
      "ancre": "precautions",
      "title": "Effets possibles et précautions",
      "subtitle": "Ce que disent les notices et les autorités de santé.",
      "cards": [
        {
          "title": "Effets fréquents",
          "description": "Au point d''injection, dans les jours qui suivent.",
          "details": [
            "Rougeur, gonflement, fermeté",
            "Petites boules, bleus, sensibilité",
            "En général résolus en une semaine"
          ]
        },
        {
          "title": "Complications rares",
          "description": "À connaître avant tout traitement.",
          "details": [
            "Injection dans un vaisseau : nécrose de la peau, exceptionnellement troubles visuels",
            "Allergie, parfois retardée",
            "Dissolution possible par la hyaluronidase"
          ]
        }
      ]
    }
  },
  {
    "id": "block-faq-4",
    "type": "faq",
    "order": 4,
    "content": {
      "ancre": "faq",
      "title": "Questions fréquentes sur les sillons nasogéniens",
      "questions": [
        {
          "question": "Combien de temps dure l''injection des sillons nasogéniens ?",
          "answer": "Dans l''étude du produit, l''amélioration était encore présente à un an chez la majorité des personnes suivies. La durée varie selon le produit, la profondeur du sillon et la personne."
        },
        {
          "question": "Est-ce douloureux ?",
          "answer": "L''injection est bien supportée : les produits utilisés contiennent de la lidocaïne, un anesthésiant. Une sensibilité peut persister quelques jours."
        },
        {
          "question": "Le résultat paraît-il naturel ?",
          "answer": "L''objectif est d''adoucir le sillon, pas de l''effacer : un léger pli au sourire est naturel. La quantité injectée est adaptée à votre visage."
        },
        {
          "question": "Quels sont les effets indésirables ?",
          "answer": "Les plus fréquents sont une rougeur, un gonflement, une sensibilité ou des bleus, qui disparaissent en général en une semaine. Des complications rares mais graves existent si le produit pénètre dans un vaisseau sanguin ; c''est pourquoi l''injection est réalisée par un médecin."
        },
        {
          "question": "Peut-on revenir en arrière ?",
          "answer": "Oui : l''acide hyaluronique peut être dissous par une enzyme, la hyaluronidase, si nécessaire."
        },
        {
          "question": "Et les plis d''amertume ?",
          "answer": "Les plis qui descendent des coins de la bouche se traitent aussi par acide hyaluronique ; la correction relève le coin de la bouche. Ils peuvent être traités dans la même séance, selon l''évaluation en consultation."
        }
      ]
    }
  },
  {
    "id": "block-cta-5",
    "type": "cta",
    "order": 5,
    "content": {
      "title": "Des sillons qui vous donnent un air fatigué ?",
      "description": "Prenez rendez-vous pour une consultation avec la Dre Fassotte : analyse de vos sillons, explication du traitement et réponse à toutes vos questions.",
      "primaryButton": {
        "link": "/prendre-rendez-vous",
        "text": "Prendre rendez-vous"
      },
      "secondaryButton": {
        "link": "tel:+32495280976",
        "text": "+32 495 28 09 76"
      }
    }
  }
]'::jsonb, 'Sillons nasogéniens marqués : injection d’acide hyaluronique à Liège par la Dre Fassotte. Pourquoi ils se creusent, déroulement, durée, effets possibles.', true
WHERE NOT EXISTS (SELECT 1 FROM custom_pages WHERE slug = 'sillons-nasogeniens');

INSERT INTO custom_pages (slug, title, content, meta_description, is_published)
SELECT 'pattes-d-oie', 'Pattes d''oie', '[
  {
    "id": "block-hero-0",
    "type": "hero",
    "order": 0,
    "content": {
      "title": "Pattes d''oie à Liège : traitement par toxine botulique",
      "subtitle": "Détendre le regard sans l''empêcher de sourire, par la Dre Jocelyne Fassotte, médecin esthétique",
      "description": "Les pattes d''oie sont les rides en éventail qui se forment au coin des yeux quand on sourit. La toxine botulique détend le muscle qui les creuse : le regard paraît plus reposé, et le sourire reste le vôtre. L''amélioration apparaît en général dans la semaine et dure jusqu''à environ 4 mois.",
      "image": "https://hxgfakegwewcfkxvltgl.supabase.co/storage/v1/object/public/media/1771937938348-o7yq2d.jpeg",
      "imageAlt": "Zones d''injection Botox - Rides du front, glabelle, rides périoculaires, plis d''amertume",
      "ctaText": "Prendre rendez-vous",
      "ctaLink": "/prendre-rendez-vous"
    }
  },
  {
    "id": "block-text-1",
    "type": "text",
    "order": 1,
    "content": {
      "ancre": "pourquoi",
      "title": "Pourquoi les pattes d''oie se marquent",
      "paragraphs": [
        "Autour de l''œil, un muscle circulaire se contracte à chaque sourire et plisse la peau au coin des yeux. La peau y est fine : avec le temps et le soleil, ces rides d''expression restent visibles plus longtemps, puis même au repos.",
        "La [[toxine botulique (Botox)|/botox-liege]] agit sur ce muscle. Les rides de la patte d''oie sont l''une des trois indications officielles de la toxine botulique en esthétique, avec les [[rides du lion|/botox-liege/rides-du-lion]] et les rides du front."
      ]
    }
  },
  {
    "id": "block-cards-2",
    "type": "cards",
    "order": 2,
    "content": {
      "ancre": "deroulement",
      "title": "Le déroulement du traitement",
      "subtitle": "Une séance courte, au cabinet, après une consultation.",
      "cards": [
        {
          "title": "1. Consultation",
          "description": "Analyse de vos rides au sourire et au repos, de vos antécédents et traitements en cours.",
          "details": [
            "Vérification des contre-indications"
          ]
        },
        {
          "title": "2. Injection",
          "description": "Quelques points au coin de chaque œil ; la notice officielle en prévoit trois de chaque côté.",
          "details": [
            "Aiguilles très fines",
            "Séance de quelques minutes"
          ]
        },
        {
          "title": "3. Les résultats",
          "description": "L''amélioration apparaît en général dans la semaine ; l''effet dure jusqu''à environ 4 mois.",
          "details": [
            "Renouvellement possible, pas avant trois mois"
          ]
        }
      ]
    }
  },
  {
    "id": "block-cards-3",
    "type": "cards",
    "order": 3,
    "content": {
      "ancre": "contre-indications",
      "title": "Contre-indications et effets possibles",
      "subtitle": "Ce que dit la notice officielle du produit.",
      "cards": [
        {
          "title": "Contre-indications",
          "description": "Le traitement n''est pas réalisé dans ces situations.",
          "details": [
            "Allergie à la toxine botulique ou à un composant",
            "Myasthénie, syndrome de Lambert-Eaton",
            "Infection au point d''injection",
            "Grossesse et allaitement : non recommandé"
          ]
        },
        {
          "title": "Effets possibles",
          "description": "En général passagers.",
          "details": [
            "Bleu (hématome) au point d''injection",
            "Maux de tête",
            "Chute temporaire de la paupière"
          ]
        }
      ]
    }
  },
  {
    "id": "block-faq-4",
    "type": "faq",
    "order": 4,
    "content": {
      "ancre": "faq",
      "title": "Questions fréquentes sur les pattes d''oie",
      "questions": [
        {
          "question": "Combien de temps dure le Botox pour les pattes d''oie ?",
          "answer": "L''amélioration apparaît en général dans la semaine et l''effet dure jusqu''à environ 4 mois, selon la notice officielle du produit. Le traitement peut ensuite être renouvelé, avec un intervalle d''au moins trois mois."
        },
        {
          "question": "Pourrai-je encore sourire normalement ?",
          "answer": "Oui : la dose est adaptée pour adoucir les rides sans supprimer l''expression. Le sourire reste naturel."
        },
        {
          "question": "Est-ce douloureux ?",
          "answer": "L''injection se fait avec des aiguilles très fines, en quelques points : l''inconfort est bref."
        },
        {
          "question": "Quels sont les effets indésirables ?",
          "answer": "Le plus fréquent est un petit bleu au point d''injection ; des maux de tête ou une chute temporaire de la paupière sont possibles. Ils sont en général passagers."
        },
        {
          "question": "Peut-on traiter les pattes d''oie et les rides du lion en même temps ?",
          "answer": "Oui, la notice prévoit ce traitement combiné ; le plan de traitement est défini en consultation."
        },
        {
          "question": "Et les rides sous les yeux ?",
          "answer": "La toxine botulique agit sur les rides d''expression du coin de l''œil. Un creux sous l''œil relève d''une autre approche, évaluée au cas par cas en consultation."
        }
      ]
    }
  },
  {
    "id": "block-cta-5",
    "type": "cta",
    "order": 5,
    "content": {
      "title": "Envie d''un regard plus reposé ?",
      "description": "Prenez rendez-vous pour une consultation avec la Dre Fassotte : analyse de vos pattes d''oie, explication du traitement et réponse à toutes vos questions.",
      "primaryButton": {
        "link": "/prendre-rendez-vous",
        "text": "Prendre rendez-vous"
      },
      "secondaryButton": {
        "link": "tel:+32495280976",
        "text": "+32 495 28 09 76"
      }
    }
  }
]'::jsonb, 'Pattes d’oie à Liège : toxine botulique par la Dre Fassotte. Pourquoi elles se marquent, déroulement, délai d’effet, durée, contre-indications et FAQ.', true
WHERE NOT EXISTS (SELECT 1 FROM custom_pages WHERE slug = 'pattes-d-oie');

INSERT INTO custom_pages (slug, title, content, meta_description, is_published)
SELECT 'rides-du-front', 'Rides du front', '[
  {
    "id": "block-hero-0",
    "type": "hero",
    "order": 0,
    "content": {
      "title": "Rides du front à Liège : traitement par toxine botulique",
      "subtitle": "Lisser le front en gardant un visage expressif, par la Dre Jocelyne Fassotte, médecin esthétique",
      "description": "Les rides du front sont les lignes horizontales qui se creusent quand on lève les sourcils. La toxine botulique détend le muscle du front : les rides s''adoucissent, sans figer le visage. L''amélioration apparaît en général dans la semaine et dure jusqu''à environ 4 mois.",
      "image": "https://hxgfakegwewcfkxvltgl.supabase.co/storage/v1/object/public/media/1771937938348-o7yq2d.jpeg",
      "imageAlt": "Zones d''injection Botox - Rides du front, glabelle, rides périoculaires, plis d''amertume",
      "ctaText": "Prendre rendez-vous",
      "ctaLink": "/prendre-rendez-vous"
    }
  },
  {
    "id": "block-text-1",
    "type": "text",
    "order": 1,
    "content": {
      "ancre": "pourquoi",
      "title": "Pourquoi les rides du front apparaissent",
      "paragraphs": [
        "Le muscle du front soulève les sourcils : quand on s''étonne, qu''on parle avec expression ou qu''on compense des paupières lourdes. À force, la peau garde la trace de ces mouvements et des lignes horizontales se marquent.",
        "La [[toxine botulique (Botox)|/botox-liege]] détend ce muscle. Le front est souvent traité avec les [[rides du lion|/botox-liege/rides-du-lion]], entre les sourcils, pour un résultat équilibré ; la notice officielle prévoit ce traitement combiné."
      ]
    }
  },
  {
    "id": "block-cards-2",
    "type": "cards",
    "order": 2,
    "content": {
      "ancre": "deroulement",
      "title": "Le déroulement du traitement",
      "subtitle": "Une séance courte, au cabinet, après une consultation.",
      "cards": [
        {
          "title": "1. Consultation",
          "description": "Analyse de vos rides, de la position de vos sourcils, de vos antécédents et traitements en cours.",
          "details": [
            "Vérification des contre-indications"
          ]
        },
        {
          "title": "2. Injection",
          "description": "Quelques points répartis sur le front ; la notice officielle en prévoit cinq.",
          "details": [
            "Aiguilles très fines",
            "Séance de quelques minutes"
          ]
        },
        {
          "title": "3. Les résultats",
          "description": "L''amélioration apparaît en général dans la semaine ; l''effet dure jusqu''à environ 4 mois.",
          "details": [
            "Renouvellement possible, pas avant trois mois"
          ]
        }
      ]
    }
  },
  {
    "id": "block-cards-3",
    "type": "cards",
    "order": 3,
    "content": {
      "ancre": "contre-indications",
      "title": "Contre-indications et effets possibles",
      "subtitle": "Ce que dit la notice officielle du produit.",
      "cards": [
        {
          "title": "Contre-indications",
          "description": "Le traitement n''est pas réalisé dans ces situations.",
          "details": [
            "Allergie à la toxine botulique ou à un composant",
            "Myasthénie, syndrome de Lambert-Eaton",
            "Infection au point d''injection",
            "Grossesse et allaitement : non recommandé"
          ]
        },
        {
          "title": "Effets possibles",
          "description": "Fréquents mais en général passagers.",
          "details": [
            "Maux de tête",
            "Chute temporaire de la paupière",
            "Sensation de tension de la peau",
            "Élévation de la queue du sourcil (« effet Méphisto »)",
            "Bleu au point d''injection"
          ]
        }
      ]
    }
  },
  {
    "id": "block-faq-4",
    "type": "faq",
    "order": 4,
    "content": {
      "ancre": "faq",
      "title": "Questions fréquentes sur les rides du front",
      "questions": [
        {
          "question": "Combien de temps dure le Botox pour le front ?",
          "answer": "L''amélioration apparaît en général dans la semaine et l''effet dure jusqu''à environ 4 mois, selon la notice officielle du produit. Le traitement peut ensuite être renouvelé, avec un intervalle d''au moins trois mois."
        },
        {
          "question": "Vais-je avoir le front figé ?",
          "answer": "Non : la dose est adaptée à la force du muscle et à la position de vos sourcils, pour adoucir les rides en gardant de l''expression."
        },
        {
          "question": "Pourquoi traiter aussi les rides du lion ?",
          "answer": "Les muscles du front et ceux entre les sourcils travaillent ensemble ; les traiter ensemble donne un résultat plus équilibré. La notice officielle prévoit ce traitement combiné."
        },
        {
          "question": "Quels sont les effets indésirables ?",
          "answer": "Les plus fréquents sont des maux de tête, une chute temporaire de la paupière, une sensation de tension de la peau ou une élévation de la queue du sourcil. Ils sont en général passagers et expliqués en consultation."
        },
        {
          "question": "Est-ce douloureux ?",
          "answer": "L''injection se fait avec des aiguilles très fines, en quelques points : l''inconfort est bref."
        }
      ]
    }
  },
  {
    "id": "block-cta-5",
    "type": "cta",
    "order": 5,
    "content": {
      "title": "Envie d''un front plus lisse ?",
      "description": "Prenez rendez-vous pour une consultation avec la Dre Fassotte : analyse de vos rides du front, explication du traitement et réponse à toutes vos questions.",
      "primaryButton": {
        "link": "/prendre-rendez-vous",
        "text": "Prendre rendez-vous"
      },
      "secondaryButton": {
        "link": "tel:+32495280976",
        "text": "+32 495 28 09 76"
      }
    }
  }
]'::jsonb, 'Rides du front à Liège : toxine botulique par la Dre Fassotte. Pourquoi elles apparaissent, déroulement, délai d’effet, durée, effets possibles et FAQ.', true
WHERE NOT EXISTS (SELECT 1 FROM custom_pages WHERE slug = 'rides-du-front');

-- Cartes des piliers liées aux nouvelles pages filles (le contenu reprend les liens du lot 8).
UPDATE custom_pages SET content = '[
  {
    "id": "block-hero-0",
    "type": "hero",
    "order": 0,
    "content": {
      "image": "https://hxgfakegwewcfkxvltgl.supabase.co/storage/v1/object/public/media/1771937027109-qefsfr.jpeg",
      "title": "Injection Acide Hyaluronique Liège",
      "ctaLink": "/contact",
      "ctaText": "Prendre rendez-vous",
      "imageAlt": "Zones d''injection acide hyaluronique sur le visage",
      "subtitle": "Traitement anti-âge naturel à Liège",
      "description": "La Dre Fassotte propose des injections d''acide hyaluronique à Liège pour restaurer les volumes, combler les rides et redonner éclat et hydratation au visage de façon naturelle. Spécialiste qualifiée en médecine esthétique non chirurgicale."
    }
  },
  {
    "id": "block-heading-1",
    "type": "heading",
    "order": 1,
    "content": {
      "text": "Qu''est-ce que l''acide hyaluronique ?",
      "level": "h2"
    }
  },
  {
    "id": "block-features-2",
    "type": "features",
    "order": 2,
    "content": {
      "features": [
        {
          "icon": "droplets",
          "title": "Substance naturelle",
          "description": "Présent naturellement dans notre peau, l''acide hyaluronique maintient l''hydratation et le volume des tissus."
        },
        {
          "icon": "shield",
          "title": "Résorbable",
          "description": "Il est progressivement dégradé et résorbé par l''organisme. Il est bien toléré dans la grande majorité des cas ; une allergie reste possible, et une allergie connue au produit est une contre-indication."
        },
        {
          "icon": "heart",
          "title": "Résultats naturels",
          "description": "Permet d''obtenir des résultats harmonieux qui respectent la morphologie naturelle de votre visage."
        }
      ],
      "ancre": "principe"
    }
  },
  {
    "id": "block-heading-3",
    "type": "heading",
    "order": 3,
    "content": {
      "text": "Zones traitables",
      "level": "h2",
      "subtitle": "L''acide hyaluronique peut être utilisé sur différentes zones du visage pour des résultats personnalisés et naturels."
    }
  },
  {
    "id": "block-cards-4",
    "type": "cards",
    "order": 4,
    "content": {
      "cards": [
        {
          "title": "Lèvres",
          "details": [
            "Augmentation subtile du volume",
            "Redéfinition du contour",
            "Hydratation intense"
          ],
          "duration": "6-12 mois",
          "description": "Volume naturel et hydratation",
          "href": "/acide-hyaluronique-liege/levres"
        },
        {
          "title": "Rides et sillons",
          "details": [
            "Rides nasogéniennes",
            "Sillons d''amertume",
            "Plis d''amaigrissement"
          ],
          "duration": "Jusqu''à 1 an environ",
          "description": "Comblement des rides marquées",
          "href": "/acide-hyaluronique-liege/sillons-nasogeniens"
        },
        {
          "title": "Volumes faciaux",
          "details": [
            "Pommettes",
            "Tempes",
            "Menton",
            "Mâchoires"
          ],
          "duration": "12 à 24 mois selon la zone",
          "description": "Restauration des volumes perdus"
        },
        {
          "title": "Cernes",
          "details": [
            "Technique délicate",
            "Résultats naturels",
            "Regard rajeuni"
          ],
          "duration": "Jusqu''à 1 an environ",
          "description": "Correction des cernes creusés",
          "href": "/acide-hyaluronique-liege/cernes"
        }
      ],
      "ancre": "zones"
    }
  },
  {
    "id": "block-image-text-5",
    "type": "image-text",
    "order": 5,
    "content": {
      "image": "/image copy copy copy copy copy copy copy.png",
      "title": "La technique \"Soft Filling\"",
      "points": [
        {
          "title": "Injections micro-dosées",
          "description": "Technique de petites quantités pour un résultat naturel et progressive."
        },
        {
          "title": "Respect de l''anatomie",
          "description": "Placement précis selon la structure unique de votre visage."
        },
        {
          "title": "Confort optimal",
          "description": "Utilisation de produits avec lidocaïne et techniques douces."
        }
      ],
      "imageAlt": "Zones d''injection acide hyaluronique - Technique Soft Filling",
      "description": "Ma technique privilégiée consiste en des injections douces et progressives qui respectent l''anatomie naturelle du visage pour des résultats harmonieux et une intégration parfaite.",
      "imagePosition": "right"
    }
  },
  {
    "id": "block-cards-precautions",
    "type": "cards",
    "content": {
      "ancre": "precautions",
      "title": "Acide hyaluronique : effets indésirables et précautions",
      "subtitle": "Les injections d''acide hyaluronique sont des actes médicaux. Voici ce que disent les autorités de santé.",
      "cards": [
        {
          "title": "Effets fréquents",
          "description": "Au point d’injection, dans les jours qui suivent.",
          "details": [
            "Rougeur, gonflement, hématome",
            "En général résolus en une à deux semaines"
          ]
        },
        {
          "title": "Complications rares",
          "description": "À connaître avant tout traitement.",
          "details": [
            "Allergie, possible même plusieurs mois après",
            "Injection dans un vaisseau : nécrose de la peau et, exceptionnellement, troubles visuels",
            "Produits résorbables uniquement : les autorités déconseillent les produits non résorbables"
          ]
        }
      ]
    },
    "order": 6
  },
  {
    "id": "block-faq-6",
    "type": "faq",
    "order": 7,
    "content": {
      "title": "Questions fréquentes",
      "subtitle": "Tout ce que vous devez savoir sur les injections d''acide hyaluronique",
      "questions": [
        {
          "answer": "L''inconfort est minimal grâce à l''utilisation d''une crème anesthésiante et à la technique douce. La plupart des patients décrivent une sensation de légère pression.",
          "question": "Le traitement est-il douloureux ?"
        },
        {
          "answer": "Rougeur, gonflement, sensibilité ou petits hématomes au point d''injection, qui disparaissent en général en une à deux semaines. Des complications rares mais graves existent, notamment si le produit pénètre dans un vaisseau sanguin : c''est pourquoi l''injection est réalisée par un médecin. En cas de besoin, l''acide hyaluronique peut être dissous par une enzyme, la hyaluronidase.",
          "question": "Quels sont les effets secondaires possibles ?"
        },
        {
          "answer": "Les résultats sont visibles immédiatement et s''améliore dans les 2 semaines suivant l''injection, le temps que l''acide hyaluronique s''intègre naturellement.",
          "question": "Quand voit-on les résultats ?"
        },
        {
          "answer": "Oui, la reprise des activités est possible immédiatement. Il est recommandé d''éviter le sport intensif, le soleil et la chaleur pendant les 24 heures qui suivent.",
          "question": "Peut-on reprendre ses activités normalement ?"
        }
      ],
      "ancre": "faq"
    }
  },
  {
    "id": "block-cta-7",
    "type": "cta",
    "order": 8,
    "content": {
      "title": "Prêt(e) pour une consultation ?",
      "description": "Découvrez comment l''acide hyaluronique peut révéler votre beauté naturelle. Prenez rendez-vous pour une consultation personnalisée.",
      "primaryButton": {
        "link": "/contact",
        "text": "Prendre rendez-vous"
      },
      "secondaryButton": {
        "link": "tel:+32495280976",
        "text": "+32 495 28 09 76"
      }
    }
  }
]'::jsonb, updated_at = now() WHERE slug = 'acide-hyaluronique';

UPDATE custom_pages SET content = '[
  {
    "id": "block-hero-0",
    "type": "hero",
    "order": 0,
    "content": {
      "image": "https://hxgfakegwewcfkxvltgl.supabase.co/storage/v1/object/public/media/1771937938348-o7yq2d.jpeg",
      "title": "Botox à Liège : injections de toxine botulique",
      "ctaLink": "/contact",
      "ctaText": "Prendre rendez-vous",
      "imageAlt": "Zones d''injection Botox - Rides du front, glabelle, rides périoculaires, plis d''amertume",
      "subtitle": "Par la Dre Jocelyne Fassotte, médecin esthétique, à Vaux-sous-Chèvremont (Chaudfontaine)",
      "description": "La toxine botulique, plus communément appelée Botox, est une neurotoxine purifiée utilisée en médecine esthétique depuis plus de 20 ans. Injectée par un médecin dans les muscles des rides d''expression (rides du lion, front, pattes d''oie), elle les détend temporairement : le visage paraît plus reposé, sans figer les expressions. La séance dure 15 à 30 minutes ; l''amélioration apparaît en général dans la semaine et l''effet est démontré jusqu''à environ 4 mois."
    }
  },
  {
    "id": "block-features-1",
    "type": "features",
    "order": 1,
    "content": {
      "title": "Comment ça fonctionne ?",
      "features": [
        {
          "title": "Détente musculaire",
          "description": "Détente musculaire des zones hyperactives pour un lissage progressif des rides d''expression."
        },
        {
          "title": "Effet préventif",
          "description": "Prévention de l''approfondissement des rides avec un effet naturel sans paralysie complète."
        },
        {
          "title": "Durabilité",
          "description": "Effet démontré jusqu''à environ 4 mois, renouvelable selon les besoins."
        }
      ],
      "subtitle": "La toxine botulique bloque temporairement la transmission nerveuse au niveau des muscles traités",
      "ancre": "fonctionnement"
    }
  },
  {
    "id": "block-cards-2",
    "type": "cards",
    "order": 2,
    "content": {
      "ancre": "zones",
      "title": "Botox des rides du lion, du front et des pattes d''oie",
      "subtitle": "Les zones les plus demandées sont celles du haut du visage, où les rides naissent des contractions répétées. Le dosage est adapté à chaque zone et à la force de vos muscles.",
      "cards": [
        {
          "title": "Rides du lion",
          "description": "Les rides verticales entre les sourcils (rides inter-sourcilières, ou rides de contrariété) donnent un air sévère ou fatigué. Détendre les muscles qui les creusent adoucit le regard.",
          "details": [
            "Rides verticales entre les sourcils",
            "Air soucieux ou fatigué atténué"
          ],
          "href": "/botox-liege/rides-du-lion"
        },
        {
          "title": "Rides du front",
          "description": "Les rides horizontales du front apparaissent quand on lève les sourcils. Une injection dosée les lisse tout en laissant le front mobile.",
          "details": [
            "Rides horizontales du front",
            "Effet lifting naturel des sourcils"
          ],
          "href": "/botox-liege/rides-du-front"
        },
        {
          "title": "Pattes d''oie",
          "description": "Les rides au coin des yeux se marquent quand on sourit. Les détendre ouvre le regard sans empêcher de sourire.",
          "details": [
            "Rides de la patte d''oie",
            "Rides sous les yeux (selon évaluation)",
            "Regard plus ouvert et détendu"
          ],
          "href": "/botox-liege/pattes-d-oie"
        },
        {
          "title": "Autres indications",
          "description": "Selon l''évaluation en consultation, la toxine botulique peut aussi être utilisée pour d''autres indications.",
          "details": [
            "Correction du sourire gingival",
            "Rides du cou (bandes platysmales)",
            "Hyperhidrose (transpiration excessive)"
          ]
        }
      ]
    }
  },
  {
    "id": "block-features-3",
    "type": "features",
    "order": 3,
    "content": {
      "title": "Avantages du Botox",
      "features": [
        {
          "title": "Résultats naturels",
          "description": "Vous restez vous-même, en mieux"
        },
        {
          "title": "Traitement préventif",
          "description": "Empêche l''aggravation des rides"
        },
        {
          "title": "Intervention rapide",
          "description": "15-30 minutes seulement"
        },
        {
          "title": "Aucune éviction sociale",
          "description": "Reprise d''activité immédiate"
        },
        {
          "title": "Effet progressif",
          "description": "Résultats visibles en général dans la semaine"
        },
        {
          "title": "Temporaire",
          "description": "Retour progressif à l''état initial en quelques mois"
        }
      ]
    }
  },
  {
    "id": "block-cards-4",
    "type": "cards",
    "order": 4,
    "content": {
      "cards": [
        {
          "title": "Préparation",
          "description": "Désinfection et marquage des points d''injection"
        },
        {
          "title": "Injections",
          "description": "Injections précises dans les muscles ciblés"
        },
        {
          "title": "Contrôle immédiat",
          "description": "Vérification et conseils post-traitement"
        }
      ],
      "title": "Déroulement d''une séance",
      "subtitle": "Durée totale : 15-30 minutes",
      "ancre": "deroulement"
    }
  },
  {
    "id": "block-cards-5",
    "type": "cards",
    "order": 5,
    "content": {
      "cards": [
        {
          "title": "Consultation personnalisée",
          "details": [
            "Analyse morphologique de votre visage au repos et en mouvement",
            "Évaluation des besoins selon vos expressions habituelles",
            "Plan de traitement adapté à vos objectifs",
            "Information complète sur le protocole et les résultats attendus"
          ],
          "description": "Analyse morphologique de votre visage au repos et en mouvement"
        },
        {
          "title": "Technique d''injection",
          "details": [
            "Produits certifiés Botox® ou Vistabel® exclusivement",
            "Injections précises avec aiguilles ultra-fines",
            "Dosage personnalisé selon l''intensité des rides",
            "Technique douce pour minimiser l''inconfort"
          ],
          "description": "Produits certifiés et technique experte"
        }
      ],
      "title": "Le traitement par Docteure Fassotte"
    }
  },
  {
    "id": "block-cards-conseils",
    "type": "cards",
    "order": 6,
    "content": {
      "ancre": "avant-apres",
      "title": "Avant et après la séance de Botox",
      "subtitle": "Quelques précautions simples, expliquées en détail lors de la consultation.",
      "cards": [
        {
          "title": "Avant la séance",
          "description": "Une consultation précède toujours le traitement.",
          "details": [
            "Signaler vos traitements en cours, notamment les anticoagulants",
            "Signaler vos antécédents médicaux et une éventuelle grossesse",
            "Préciser vos attentes et vos traitements esthétiques précédents"
          ]
        },
        {
          "title": "Après la séance",
          "description": "Vous reprenez vos activités immédiatement.",
          "details": [
            "Éviter le sport intense et la position couchée pendant 4 heures",
            "Ne pas masser ni frotter les zones traitées le jour même",
            "L''effet apparaît en 3 à 7 jours et atteint son maximum vers 2 semaines"
          ]
        }
      ]
    }
  },
  {
    "id": "block-cards-contre-indications",
    "type": "cards",
    "order": 7,
    "content": {
      "ancre": "contre-indications",
      "title": "Contre-indications et effets secondaires du Botox",
      "subtitle": "La toxine botulique est un médicament : son injection relève d''un médecin, après un examen et un interrogatoire médical.",
      "cards": [
        {
          "title": "Contre-indications",
          "description": "Le traitement n''est pas réalisé dans les situations suivantes.",
          "details": [
            "Grossesse et allaitement",
            "Maladie neuromusculaire (myasthénie, syndrome de Lambert-Eaton)",
            "Infection ou inflammation au point d''injection",
            "Allergie connue à la toxine botulique ou à un composant du produit",
            "Certains médicaments, dont les antibiotiques de la famille des aminosides"
          ]
        },
        {
          "title": "Effets secondaires possibles",
          "description": "Ils sont le plus souvent légers et passagers.",
          "details": [
            "Maux de tête, rougeur, petit gonflement ou bleu aux points d''injection",
            "Chute temporaire de la paupière ou du sourcil, effet fréquent selon la notice du produit",
            "Ces effets sont en général passagers et expliqués en consultation"
          ]
        }
      ]
    }
  },
  {
    "id": "block-faq-6",
    "type": "faq",
    "order": 8,
    "content": {
      "title": "Questions fréquentes sur le Botox",
      "subtitle": "Tout ce que vous devez savoir sur la toxine botulique",
      "questions": [
        {
          "answer": "L''inconfort est très léger, comparable à une piqûre de moustique. Aucune anesthésie n''est nécessaire.",
          "question": "L''injection est-elle douloureuse ?"
        },
        {
          "question": "Combien coûte une séance de Botox à Liège ?",
          "answer": "Le tarif dépend du nombre de zones traitées. Il vous est communiqué lors de la consultation, avant toute injection."
        },
        {
          "question": "Combien de temps dure l''effet du Botox ?",
          "answer": "L''effet est démontré jusqu''à environ 4 mois après l''injection, selon la notice officielle du produit. La durée varie selon la zone, la dose et la personne ; le traitement peut ensuite être renouvelé."
        },
        {
          "answer": "L''amélioration apparaît en général dans la semaine qui suit l''injection.",
          "question": "Quand voit-on les premiers résultats ?"
        },
        {
          "answer": "Non, avec un dosage approprié et une technique experte, vous conservez vos expressions naturelles.",
          "question": "Vais-je avoir l''air figé ?"
        },
        {
          "answer": "Oui immédiatement, en évitant simplement sport intense et position couchée pendant 4h.",
          "question": "Puis-je reprendre mes activités normalement ?"
        },
        {
          "answer": "Les effets indésirables les plus fréquents sont des maux de tête, une rougeur ou un petit bleu au point d''injection, et parfois une chute temporaire de la paupière ou du sourcil. Ils sont en général passagers. Les risques et les contre-indications sont expliqués lors de la consultation.",
          "question": "Y a-t-il des risques ?"
        },
        {
          "answer": "Dès l''apparition des rides dynamiques, généralement vers 25-30 ans en prévention.",
          "question": "À quel âge commencer ?"
        },
        {
          "answer": "Parfaitement. Se combine idéalement avec acide hyaluronique et peelings.",
          "question": "Compatible avec d''autres traitements ?"
        },
        {
          "answer": "L''effet s''estompe progressivement et le visage retrouve son aspect initial.",
          "question": "Que se passe-t-il si j''arrête ?"
        },
        {
          "question": "Botox ou acide hyaluronique : quelle différence ?",
          "answer": "La toxine botulique détend les muscles responsables des rides d''expression (front, rides du lion, pattes d''oie). L''acide hyaluronique comble un creux ou restaure un volume, par exemple les sillons ou les cernes. Les deux peuvent être associés ; le choix se fait en consultation."
        }
      ],
      "ancre": "faq"
    }
  },
  {
    "id": "block-cta-7",
    "type": "cta",
    "order": 9,
    "content": {
      "title": "Consultation avec Docteure Fassotte",
      "description": "Pour découvrir comment la toxine botulique peut détendre votre regard et prévenir le vieillissement. Consultation personnalisée : Analyse de vos besoins et proposition de traitement sur mesure.",
      "primaryButton": {
        "link": "/contact",
        "text": "Prendre rendez-vous"
      },
      "secondaryButton": {
        "link": "tel:+32495280976",
        "text": "+32 495 28 09 76"
      }
    }
  }
]'::jsonb, updated_at = now() WHERE slug = 'botox';
