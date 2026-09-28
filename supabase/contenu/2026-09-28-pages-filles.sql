-- BROUILLON — NON APPLIQUÉ. Trois pages filles (lot 8), à valider par la Dre
-- Fassotte, puis à exécuter dans l'éditeur SQL Supabase et à publier.
-- Servies sous leur pilier : /acide-hyaluronique-liege/levres, /cernes,
-- /botox-liege/rides-du-lion (src/contenu/routes.ts, SOUS_PAGES).
-- Idempotent : une page déjà présente (même slug) n'est pas recréée.

INSERT INTO custom_pages (slug, title, content, meta_description, is_published)
SELECT 'injection-levres', 'Injection des lèvres', '[
  {
    "id": "block-hero-0",
    "type": "hero",
    "order": 0,
    "content": {
      "title": "Injection des lèvres à Liège : acide hyaluronique",
      "subtitle": "Volume, contour et ridules, par la Dre Jocelyne Fassotte, médecin esthétique",
      "description": "L''injection d''acide hyaluronique redonne du volume aux lèvres, redessine leur contour ou atténue les ridules qui les entourent. La Dre Fassotte adapte la quantité et le produit à votre visage, pour un résultat qui reste le vôtre. Le produit est résorbable et l''amélioration peut durer jusqu''à environ un an.",
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
      "ancre": "indications",
      "title": "Ce que l''injection des lèvres peut corriger",
      "paragraphs": [
        "Les lèvres perdent du volume avec l''âge, leur contour s''estompe et de fines rides verticales apparaissent au-dessus de la lèvre supérieure. Selon votre demande, la Dre Fassotte travaille une ou plusieurs de ces zones, avec un acide hyaluronique choisi pour les tissus des lèvres.",
        "Le traitement des lèvres fait partie des [[injections d''acide hyaluronique|/acide-hyaluronique-liege]] pratiquées au cabinet : même produit, même médecin, mais une zone qui demande une technique propre."
      ]
    }
  },
  {
    "id": "block-cards-2",
    "type": "cards",
    "order": 2,
    "content": {
      "ancre": "techniques",
      "title": "Lèvres : les gestes possibles",
      "subtitle": "Chaque zone se traite séparément ou en association, selon l''analyse de votre visage.",
      "cards": [
        {
          "title": "Le contour",
          "description": "L''injection ourle les lèvres et efface les ridules verticales.",
          "details": [
            "Lèvres mieux dessinées",
            "Ridules du contour atténuées"
          ]
        },
        {
          "title": "Le volume",
          "description": "Augmentation et arrondi des lèvres avec un acide hyaluronique spécifique aux tissus des lèvres.",
          "details": [
            "Volume ajusté à votre morphologie",
            "Possibilité de procéder par petites touches"
          ]
        },
        {
          "title": "La projection de la lèvre supérieure",
          "description": "Soit par acide hyaluronique au niveau de l''arc de Cupidon, soit par toxine botulique au niveau du muscle orbiculaire.",
          "details": [
            "Choix du geste en consultation"
          ]
        },
        {
          "title": "Les ridules et les commissures",
          "description": "Les ridules au-dessus de la lèvre (lèvre blanche) se traitent avec un acide hyaluronique modérément réticulé, souvent en plusieurs séances ; la correction des commissures relève le coin de la bouche.",
          "details": [
            "Ridules verticales « code-barres »",
            "Commissures et plis d''amertume"
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
      "ancre": "deroulement",
      "title": "Le déroulement d''une injection des lèvres",
      "subtitle": "La lèvre est une zone très sensible : une anesthésie locale est systématiquement pratiquée.",
      "cards": [
        {
          "title": "1. Consultation",
          "description": "Analyse de votre visage, de vos attentes et de vos antécédents ; choix du produit et de la quantité.",
          "details": [
            "Traitements en cours, allergies, grossesse",
            "Antécédents de bouton de fièvre à signaler"
          ]
        },
        {
          "title": "2. Injection",
          "description": "Anesthésie locale, puis injections précises dans les zones choisies.",
          "details": [
            "Produits contenant de la lidocaïne",
            "Résultat visible dès la fin de la séance"
          ]
        },
        {
          "title": "3. Les jours qui suivent",
          "description": "Les lèvres sont gonflées et sensibles au début : c''est la réaction la plus fréquente.",
          "details": [
            "Gonflement parfois marqué pendant 2 à 4 semaines",
            "Éviter sport intensif, soleil et chaleur pendant 24 heures"
          ]
        }
      ]
    }
  },
  {
    "id": "block-cards-4",
    "type": "cards",
    "order": 4,
    "content": {
      "ancre": "precautions",
      "title": "Effets possibles et précautions",
      "subtitle": "Les injections des lèvres sont des actes médicaux : voici ce que disent les notices et les autorités de santé.",
      "cards": [
        {
          "title": "Effets fréquents",
          "description": "Au point d''injection, dans les jours ou semaines qui suivent.",
          "details": [
            "Gonflement, sensibilité, fermeté",
            "Hématomes",
            "Résolus en général en moins d’un mois"
          ]
        },
        {
          "title": "Complications rares",
          "description": "À connaître avant tout traitement.",
          "details": [
            "Injection dans un vaisseau : nécrose de la peau, exceptionnellement troubles visuels",
            "Allergie, parfois retardée",
            "L''acide hyaluronique peut être dissous par la hyaluronidase si nécessaire"
          ]
        }
      ]
    }
  },
  {
    "id": "block-faq-5",
    "type": "faq",
    "order": 5,
    "content": {
      "ancre": "faq",
      "title": "Questions fréquentes sur l’injection des lèvres",
      "questions": [
        {
          "question": "Combien de temps dure une injection des lèvres ?",
          "answer": "L''amélioration dure jusqu''à environ un an chez la majorité des personnes traitées dans les études. Le produit est résorbé progressivement ; la durée varie selon le produit, la zone et votre organisme."
        },
        {
          "question": "L''injection des lèvres fait-elle mal ?",
          "answer": "La lèvre est une zone sensible : une anesthésie locale est systématiquement pratiquée, et les produits utilisés contiennent de la lidocaïne, un anesthésiant."
        },
        {
          "question": "Combien de temps restent-elles gonflées ?",
          "answer": "Le gonflement est la réaction la plus fréquente. Il diminue en quelques jours, mais peut rester visible deux à quatre semaines. Prévoyez la séance à distance d''un événement important."
        },
        {
          "question": "Le résultat sera-t-il naturel ?",
          "answer": "La quantité injectée est adaptée à votre visage, et le volume peut être construit progressivement. L''objectif est d''harmoniser les lèvres avec vos traits, pas de les transformer."
        },
        {
          "question": "Peut-on revenir en arrière ?",
          "answer": "Oui : l''acide hyaluronique est résorbable et peut, si nécessaire, être dissous par une enzyme, la hyaluronidase."
        },
        {
          "question": "Qu''est-ce que le « lip flip » ?",
          "answer": "C''est la projection de la lèvre supérieure par injection de toxine botulique dans le muscle qui entoure la bouche. La Dre Fassotte peut le proposer, seul ou en complément de l''acide hyaluronique, selon l''évaluation en consultation."
        },
        {
          "question": "Quelles sont les contre-indications ?",
          "answer": "Une allergie connue au produit ou à la lidocaïne, une infection ou un bouton de fièvre en cours sur la zone, la grossesse et l''allaitement : ces situations sont vérifiées en consultation avant toute injection."
        }
      ]
    }
  },
  {
    "id": "block-cta-6",
    "type": "cta",
    "order": 6,
    "content": {
      "title": "Un projet pour vos lèvres ?",
      "description": "Prenez rendez-vous pour une consultation avec la Dre Fassotte : analyse de votre visage, choix du geste et du produit, et réponse à toutes vos questions avant l''injection.",
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
]'::jsonb, 'Injection des lèvres à l’acide hyaluronique à Liège par la Dre Fassotte : volume, contour, ridules, déroulement, durée, effets possibles et questions fréquentes.', true
WHERE NOT EXISTS (SELECT 1 FROM custom_pages WHERE slug = 'injection-levres');

INSERT INTO custom_pages (slug, title, content, meta_description, is_published)
SELECT 'injection-cernes', 'Injection des cernes', '[
  {
    "id": "block-hero-0",
    "type": "hero",
    "order": 0,
    "content": {
      "title": "Cernes creusés : injection d''acide hyaluronique à Liège",
      "subtitle": "Corriger le creux sous les yeux, par la Dre Jocelyne Fassotte, médecin esthétique",
      "description": "Quand le cerne est un creux sous l''œil, qui donne un air fatigué même après une bonne nuit, une injection d''acide hyaluronique peut combler cette vallée. La Dre Fassotte évalue d''abord le type de cerne : seul le cerne creusé relève de ce traitement. L''amélioration peut durer jusqu''à environ un an.",
      "image": "https://hxgfakegwewcfkxvltgl.supabase.co/storage/v1/object/public/media/gallery/72tc6naks2a-1771936402863.jpeg",
      "imageAlt": "Acide hyaluronique pour les cernes",
      "ctaText": "Prendre rendez-vous",
      "ctaLink": "/prendre-rendez-vous"
    }
  },
  {
    "id": "block-text-1",
    "type": "text",
    "order": 1,
    "content": {
      "ancre": "types",
      "title": "Tous les cernes ne se traitent pas de la même façon",
      "paragraphs": [
        "Un cerne peut être un creux (la « vallée des larmes » qui se marque sous l''œil), une coloration de la peau, ou une poche. L''injection d''acide hyaluronique corrige le creux : elle ne fait pas disparaître une pigmentation ni une poche graisseuse.",
        "C''est pourquoi la consultation commence par un examen du regard. Si l''injection n''est pas la bonne réponse, la Dre Fassotte vous le dit, et d''autres approches peuvent être discutées, comme des [[soins de cosmétologie médicale|/cosmetologie-liege]].",
        "L''injection des cernes fait partie des [[injections d''acide hyaluronique|/acide-hyaluronique-liege]] pratiquées au cabinet ; c''est une zone délicate, où la peau est fine et les vaisseaux nombreux."
      ]
    }
  },
  {
    "id": "block-cards-2",
    "type": "cards",
    "order": 2,
    "content": {
      "ancre": "deroulement",
      "title": "Le déroulement d''une injection des cernes",
      "subtitle": "Une séance courte, au cabinet, après une consultation.",
      "cards": [
        {
          "title": "1. Consultation",
          "description": "Examen du regard, type de cerne, attentes, antécédents et traitements en cours.",
          "details": [
            "Le traitement est proposé seulement s’il est indiqué"
          ]
        },
        {
          "title": "2. Injection",
          "description": "Petites quantités d''un acide hyaluronique adapté à la zone, injectées avec précision.",
          "details": [
            "Produits contenant de la lidocaïne",
            "Effet visible dès la séance"
          ]
        },
        {
          "title": "3. Les jours qui suivent",
          "description": "Sensibilité, gonflement et bleus sont fréquents au début.",
          "details": [
            "Le plus souvent résolus en une à deux semaines",
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
          "description": "Chez plus d''un tiers des personnes traitées dans les études.",
          "details": [
            "Sensibilité au toucher",
            "Bleus",
            "Gonflement",
            "En général résolus en une à deux semaines"
          ]
        },
        {
          "title": "Complications rares",
          "description": "À connaître avant tout traitement.",
          "details": [
            "Injection dans un vaisseau : troubles visuels, exceptionnellement graves",
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
      "title": "Questions fréquentes sur l’injection des cernes",
      "questions": [
        {
          "question": "Combien de temps dure l''injection des cernes ?",
          "answer": "L''amélioration du creux sous l''œil dure jusqu''à environ un an chez la majorité des personnes traitées dans les études. La durée varie selon le produit et la personne."
        },
        {
          "question": "Est-ce que ça fait mal ?",
          "answer": "L''injection est bien supportée : les produits utilisés contiennent de la lidocaïne, un anesthésiant, et les quantités sont petites. Une sensibilité au toucher peut persister quelques jours."
        },
        {
          "question": "Aurai-je des bleus ?",
          "answer": "C''est possible : dans les études, des bleus apparaissent chez environ quatre personnes sur dix, et disparaissent en général en une à deux semaines."
        },
        {
          "question": "L''acide hyaluronique fait-il disparaître les cernes foncés ?",
          "answer": "Non. L''injection comble un creux ; elle ne modifie pas la couleur de la peau et ne supprime pas une poche. Le type de cerne est déterminé en consultation."
        },
        {
          "question": "Y a-t-il des risques ?",
          "answer": "Les effets les plus fréquents sont passagers : sensibilité, bleus, gonflement. Des complications rares mais graves existent si le produit pénètre dans un vaisseau sanguin, notamment des troubles de la vue : c''est pourquoi l''injection des cernes est réalisée par un médecin qui connaît l''anatomie de la zone."
        },
        {
          "question": "Peut-on revenir en arrière ?",
          "answer": "Oui : l''acide hyaluronique peut être dissous par une enzyme, la hyaluronidase, si nécessaire."
        }
      ]
    }
  },
  {
    "id": "block-cta-5",
    "type": "cta",
    "order": 5,
    "content": {
      "title": "Un regard fatigué à cause de cernes creusés ?",
      "description": "Prenez rendez-vous pour une consultation avec la Dre Fassotte : examen de vos cernes, indication ou non d''une injection, et réponse à toutes vos questions.",
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
]'::jsonb, 'Cernes creusés : injection d’acide hyaluronique à Liège par la Dre Fassotte. Pour qui, déroulement, durée des résultats, effets possibles et précautions.', true
WHERE NOT EXISTS (SELECT 1 FROM custom_pages WHERE slug = 'injection-cernes');

INSERT INTO custom_pages (slug, title, content, meta_description, is_published)
SELECT 'rides-du-lion', 'Rides du lion', '[
  {
    "id": "block-hero-0",
    "type": "hero",
    "order": 0,
    "content": {
      "title": "Rides du lion à Liège : traitement par toxine botulique",
      "subtitle": "Adoucir les rides entre les sourcils, par la Dre Jocelyne Fassotte, médecin esthétique",
      "description": "Les rides du lion sont les rides verticales qui se creusent entre les sourcils quand on fronce. La toxine botulique détend les muscles qui les provoquent : le regard paraît plus reposé, sans être figé. L''amélioration apparaît en général dans la semaine et l''effet a été démontré jusqu''à 4 mois.",
      "image": "https://hxgfakegwewcfkxvltgl.supabase.co/storage/v1/object/public/media/gallery/5qy87j4adzq-1771936296521.jpeg",
      "imageAlt": "Injection de Botox à Liège",
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
      "title": "Pourquoi les rides du lion se creusent",
      "paragraphs": [
        "Chaque fois que l''on fronce les sourcils, par concentration, contrariété ou sous le soleil, de petits muscles entre les sourcils se contractent et plissent la peau. Répété des milliers de fois, ce mouvement finit par marquer des rides verticales, qui donnent un air sévère ou fatigué.",
        "Ce sont des rides d''expression : on les traite en agissant sur le muscle, avec la [[toxine botulique (Botox)|/botox-liege]]. Les rides du lion sont d''ailleurs l''une des indications officielles de la toxine botulique en esthétique, avec les rides du front et les pattes d''oie."
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
          "description": "Analyse de vos rides au repos et en mouvement, de vos antécédents et de vos traitements en cours.",
          "details": [
            "Vérification des contre-indications"
          ]
        },
        {
          "title": "2. Injection",
          "description": "Quelques points d''injection entre et au-dessus des sourcils ; la notice officielle en prévoit cinq.",
          "details": [
            "Aiguilles très fines",
            "Séance de quelques minutes"
          ]
        },
        {
          "title": "3. Les résultats",
          "description": "L''amélioration apparaît en général dans la semaine ; l''effet a été démontré jusqu''à 4 mois.",
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
            "Rougeur, bleu ou gonflement au point d''injection"
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
      "title": "Questions fréquentes sur les rides du lion",
      "questions": [
        {
          "question": "Combien de temps dure le Botox pour les rides du lion ?",
          "answer": "L''amélioration apparaît en général dans la semaine qui suit l''injection et l''effet a été démontré jusqu''à 4 mois, selon la notice officielle du produit. Le traitement peut ensuite être renouvelé, avec un intervalle d''au moins trois mois."
        },
        {
          "question": "Vais-je avoir l''air figé ?",
          "answer": "Non : la dose est adaptée à la force de vos muscles, pour adoucir le froncement sans supprimer l''expression du regard."
        },
        {
          "question": "Est-ce douloureux ?",
          "answer": "L''injection se fait avec des aiguilles très fines, en quelques points : l''inconfort est bref."
        },
        {
          "question": "Quels sont les effets indésirables ?",
          "answer": "Les plus fréquents sont des maux de tête, une chute temporaire de la paupière et une rougeur ou un bleu au point d''injection. Ils sont en général passagers et expliqués en consultation."
        },
        {
          "question": "Et si la ride reste visible au repos ?",
          "answer": "Une ride ancienne peut rester marquée même quand le muscle est détendu. La Dre Fassotte évalue en consultation ce que la toxine botulique peut apporter et si un traitement complémentaire est utile."
        },
        {
          "question": "Peut-on traiter en même temps le front et les pattes d''oie ?",
          "answer": "Oui, ce sont les deux autres indications de la toxine botulique en esthétique ; le plan de traitement est défini en consultation."
        }
      ]
    }
  },
  {
    "id": "block-cta-5",
    "type": "cta",
    "order": 5,
    "content": {
      "title": "Envie d''un regard plus détendu ?",
      "description": "Prenez rendez-vous pour une consultation avec la Dre Fassotte : analyse de vos rides du lion, explication du traitement et réponse à toutes vos questions.",
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
]'::jsonb, 'Rides du lion à Liège : toxine botulique par la Dre Fassotte. Pourquoi elles se creusent, déroulement, délai d’effet, durée, contre-indications et FAQ.', true
WHERE NOT EXISTS (SELECT 1 FROM custom_pages WHERE slug = 'rides-du-lion');

-- Maillage dans le contenu des piliers : les cartes « Lèvres », « Cernes » et
-- « Rides du lion » deviennent des liens vers leur page fille.
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
          "description": "Comblement des rides marquées"
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
          ]
        },
        {
          "title": "Pattes d''oie",
          "description": "Les rides au coin des yeux se marquent quand on sourit. Les détendre ouvre le regard sans empêcher de sourire.",
          "details": [
            "Rides de la patte d''oie",
            "Rides sous les yeux (selon évaluation)",
            "Regard plus ouvert et détendu"
          ]
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

