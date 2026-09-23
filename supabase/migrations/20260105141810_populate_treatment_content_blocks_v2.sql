/*
  # Migration du contenu des traitements vers des blocs éditables
  
  1. Description
    - Transformation de tout le contenu hard-codé des pages de traitements
    - Organisation en blocs JSON structurés et éditables via le CMS
    - Conservation de toutes les informations existantes
  
  2. Contenu migré pour chaque traitement
    - Section Hero (titre, sous-titre, description, image)
    - Sections de texte explicatif
    - Listes (avantages, zones, indications)
    - FAQ (questions fréquentes)
    - Galerie d'images
    - Call-to-action
    
  3. Structure des blocs
    - Type: hero, text, list, faq, gallery, cta, process
    - Contenu JSON avec tous les détails
*/

-- 1. TOXINE BOTULIQUE (BOTOX)
UPDATE custom_treatments 
SET content = '[
  {
    "type": "hero",
    "data": {
      "title": "Botox Liège - Toxine Botulique",
      "subtitle": "Relaxation musculaire pour atténuer les rides",
      "description": "La toxine botulique, plus communément appelée Botox, est une neurotoxine purifiée utilisée en médecine esthétique depuis plus de 20 ans. Elle agit en détendant temporairement les muscles responsables des rides d''expression, offrant un effet lissant naturel sans figer les expressions.",
      "duration": "Durée des résultats : 4-6 mois"
    }
  },
  {
    "type": "text",
    "data": {
      "title": "Comment ça fonctionne ?",
      "content": "La toxine botulique bloque temporairement la transmission nerveuse au niveau des muscles traités",
      "features": [
        {
          "icon": "Target",
          "title": "Détente musculaire",
          "description": "Détente musculaire des zones hyperactives pour un lissage progressif des rides d''expression."
        },
        {
          "icon": "Shield",
          "title": "Effet préventif",
          "description": "Prévention de l''approfondissement des rides avec un effet naturel sans paralysie complète."
        },
        {
          "icon": "Clock",
          "title": "Durabilité",
          "description": "Durabilité de 4 à 6 mois avec possibilité de renouvellement selon les besoins."
        }
      ]
    }
  },
  {
    "type": "list",
    "data": {
      "title": "Zones de traitement",
      "description": "La toxine botulique peut être utilisée sur différentes zones pour traiter rides d''expression et autres indications médicales.",
      "items": [
        {
          "category": "Front",
          "description": "Rides horizontales du front",
          "details": ["Rides horizontales du front", "Rides de contrariété entre les sourcils", "Effet lifting naturel des sourcils"]
        },
        {
          "category": "Contour des yeux",
          "description": "Rides de la patte d''oie",
          "details": ["Rides de la patte d''oie", "Rides sous les yeux (selon évaluation)", "Regard plus ouvert et détendu"]
        },
        {
          "category": "Zones avancées",
          "description": "Rides du lion (inter-sourcilières)",
          "details": ["Rides du lion (inter-sourcilières)", "Correction du sourire gingival", "Rides du cou (bandes platysmales)", "Hyperhidrose (transpiration excessive)"]
        }
      ]
    }
  },
  {
    "type": "list",
    "data": {
      "title": "Avantages du Botox",
      "items": [
        "Résultats naturels - Vous restez vous-même, en mieux",
        "Traitement préventif - Empêche l''aggravation des rides",
        "Intervention rapide - 15-30 minutes seulement",
        "Aucune éviction sociale - Reprise d''activité immédiate",
        "Effet progressif - Résultats visibles en 3-7 jours",
        "Réversible - Retour à l''état initial après 4-6 mois"
      ]
    }
  },
  {
    "type": "process",
    "data": {
      "title": "Déroulement d''une séance",
      "duration": "Durée totale : 15-30 minutes",
      "steps": [
        {
          "step": "1",
          "title": "Préparation",
          "description": "Désinfection et marquage des points d''injection"
        },
        {
          "step": "2",
          "title": "Injections",
          "description": "Injections précises dans les muscles ciblés"
        },
        {
          "step": "3",
          "title": "Contrôle immédiat",
          "description": "Vérification et conseils post-traitement"
        }
      ]
    }
  },
  {
    "type": "faq",
    "data": {
      "title": "Questions fréquentes",
      "subtitle": "Tout ce que vous devez savoir sur la toxine botulique",
      "items": [
        {
          "question": "L''injection est-elle douloureuse ?",
          "answer": "L''inconfort est très léger, comparable à une piqûre de moustique. Aucune anesthésie n''est nécessaire."
        },
        {
          "question": "Quand voit-on les premiers résultats ?",
          "answer": "L''effet commence à 3-7 jours, avec un résultat optimal à 2 semaines."
        },
        {
          "question": "Vais-je avoir l''air figé ?",
          "answer": "Non, avec un dosage approprié et une technique experte, vous conservez vos expressions naturelles."
        },
        {
          "question": "Puis-je reprendre mes activités normalement ?",
          "answer": "Oui immédiatement, en évitant simplement sport intense et position couchée pendant 4h."
        },
        {
          "question": "Y a-t-il des risques ?",
          "answer": "Les complications sont exceptionnelles avec un médecin expérimenté. Effets secondaires rares et temporaires."
        }
      ]
    }
  },
  {
    "type": "cta",
    "data": {
      "title": "Consultation avec Docteure Fassotte",
      "description": "Pour découvrir comment la toxine botulique peut détendre votre regard et prévenir le vieillissement. Consultation personnalisée : Analyse de vos besoins et proposition de traitement sur mesure.",
      "primaryButton": {
        "text": "Prendre rendez-vous",
        "link": "/contact"
      },
      "secondaryButton": {
        "text": "+32 495 28 09 76",
        "link": "tel:+32495280976"
      }
    }
  }
]'::jsonb,
updated_at = now()
WHERE slug = '/toxine-botulique-liege';
