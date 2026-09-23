/*
  # Migration Mésolift vers blocs éditables
  
  Transformation du contenu de la page Mésolift en blocs JSON structurés
*/

UPDATE custom_treatments 
SET content = '[
  {
    "type": "hero",
    "data": {
      "title": "Mésolift",
      "subtitle": "Revitalisez Votre Peau en Profondeur",
      "description": "Le Mésolift est une technique de mésothérapie esthétique qui consiste à injecter des micro-doses de substances revitalisantes directement dans le derme superficiel. Cette méthode permet d''apporter à votre peau les nutriments essentiels dont elle a besoin pour retrouver éclat, fermeté et hydratation.",
      "duration": "3-4 séances espacées de 2-3 semaines"
    }
  },
  {
    "type": "text",
    "data": {
      "title": "Comment ça fonctionne ?",
      "content": "Contrairement aux injections de comblement, le Mésolift agit comme un véritable cocktail de vitamines administré directement là où la peau en a le plus besoin.",
      "features": [
        {
          "icon": "Target",
          "title": "Injection superficielle",
          "description": "Dans le derme à 1-4mm de profondeur avec aiguilles très fines"
        },
        {
          "icon": "Droplets",
          "title": "Apport nutritionnel",
          "description": "Apport direct de nutriments aux cellules cutanées"
        },
        {
          "icon": "Activity",
          "title": "Stimulation cellulaire",
          "description": "Activation des fibroblastes pour la production de collagène"
        }
      ]
    }
  },
  {
    "type": "list",
    "data": {
      "title": "Composition des cocktails Mésolift",
      "description": "Cocktails personnalisés selon vos besoins spécifiques",
      "items": [
        {
          "category": "Cocktail hydratant",
          "components": ["Acide hyaluronique non réticulé (hydratation)", "Vitamines du complexe B (métabolisme cellulaire)", "Vitamine C (antioxydant, stimulation collagène)", "Minéraux et oligo-éléments"]
        },
        {
          "category": "Cocktail anti-âge",
          "components": ["Peptides biomimétiques (stimulation cellulaire)", "Acides aminés essentiels", "Coenzymes (énergie cellulaire)", "Antioxydants (protection radicaux libres)"]
        },
        {
          "category": "Cocktail éclaircissant",
          "components": ["Vitamine C concentrée", "Acide kojique (dépigmentant doux)", "Arbutine (uniformisation du teint)", "Glutathion (détoxification cellulaire)"]
        }
      ]
    }
  },
  {
    "type": "list",
    "data": {
      "title": "Avantages du Mésolift",
      "items": [
        "Hydratation intense et durable de la peau",
        "Amélioration immédiate de l''éclat du teint",
        "Stimulation naturelle des processus de régénération",
        "Traitement préventif du vieillissement cutané",
        "Adapté à tous types de peau et tous phototypes",
        "Aucune éviction sociale - reprise d''activité immédiate",
        "Résultats progressifs et naturels"
      ]
    }
  },
  {
    "type": "process",
    "data": {
      "title": "Déroulement d''une séance",
      "duration": "Durée totale : 30-45 minutes",
      "steps": [
        {
          "step": "1",
          "title": "Préparation (10 min)",
          "description": "Démaquillage, nettoyage et désinfection. Application de crème anesthésiante si nécessaire."
        },
        {
          "step": "2",
          "title": "Traitement (20-30 min)",
          "description": "Préparation du cocktail personnalisé et injections multiples selon technique de nappage."
        },
        {
          "step": "3",
          "title": "Finalisation (5 min)",
          "description": "Application de sérum apaisant, protection solaire et conseils post-traitement."
        }
      ]
    }
  },
  {
    "type": "faq",
    "data": {
      "title": "Questions fréquentes",
      "items": [
        {
          "question": "Le Mésolift est-il douloureux ?",
          "answer": "Inconfort minimal grâce aux aiguilles très fines et à l''anesthésie locale. Sensation de légers picotements bien tolérée."
        },
        {
          "question": "Quand voit-on les premiers résultats ?",
          "answer": "Dès la première séance pour l''éclat et l''hydratation. Effets cumulatifs après 2-3 séances."
        },
        {
          "question": "Combien de séances sont nécessaires ?",
          "answer": "3-4 séances pour une cure complète, puis entretien tous les 2-3 mois selon les besoins."
        },
        {
          "question": "Peut-on faire du Mésolift toute l''année ?",
          "answer": "Oui, c''est même recommandé. Particulièrement bénéfique aux changements de saison."
        }
      ]
    }
  },
  {
    "type": "cta",
    "data": {
      "title": "Consultation avec Docteure Fassotte",
      "description": "Pour découvrir comment le Mésolift peut revitaliser votre peau et lui redonner tout son éclat. Analyse personnalisée et composition d''un cocktail sur mesure pour des résultats optimaux.",
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
WHERE slug = '/mesotherapie-liege';
