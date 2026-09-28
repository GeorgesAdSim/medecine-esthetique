-- BROUILLON — NON APPLIQUÉ. À valider par la Dre Fassotte, puis à exécuter dans
-- l'éditeur SQL Supabase et à publier (bouton « Publier » de l'admin).
-- Page /botox-liege alignée sur la notice officielle (RCP Vistabel, e-compendium.be,
-- lue le 28/09/2026) : durée « jusqu'à environ 4 mois » (au lieu de 4 à 6 mois),
-- amélioration « en général dans la semaine », chute de paupière = effet FRÉQUENT
-- (et non « rare »), plus d'« aucun effet de rebond » non sourcé.
UPDATE custom_pages SET
  content = '[
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
          ]
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
]'::jsonb,
  updated_at = now()
WHERE slug = 'botox';
