/*
  # Migration Fils Tenseurs vers blocs éditables
  
  Transformation du contenu de la page Fils Tenseurs en blocs JSON structurés
*/

UPDATE custom_treatments 
SET content = '[
  {
    "type": "hero",
    "data": {
      "title": "Fils Tenseurs à Cônes Bidirectionnels",
      "subtitle": "Lifting Non Chirurgical Innovant",
      "description": "Les fils tenseurs à cônes bidirectionnels représentent l''évolution la plus avancée du lifting non chirurgical. Ces fils résorbables en PDO sont équipés de cônes multidirectionnels qui permettent un ancrage optimal et une traction vectorisée précise dans les deux sens.",
      "duration": "Durée : 12-18 mois"
    }
  },
  {
    "type": "text",
    "data": {
      "title": "Technologie des cônes bidirectionnels",
      "features": [
        {
          "icon": "Target",
          "title": "Ancrage multidirectionnel",
          "description": "Cônes bidirectionnels intégrés pour un ancrage optimal dans les tissus"
        },
        {
          "icon": "Zap",
          "title": "Traction optimisée",
          "description": "Traction selon deux vecteurs opposés pour un effet lifting maximal"
        },
        {
          "icon": "Activity",
          "title": "Stimulation renforcée",
          "description": "Stimulation collagénique renforcée autour des cônes"
        }
      ]
    }
  },
  {
    "type": "list",
    "data": {
      "title": "Zones de traitement",
      "items": [
        {
          "category": "Tiers supérieur du visage",
          "zones": ["Lifting des sourcils et ouverture du regard", "Correction des tempes creusées", "Redéfinition de l''arcade sourcilière"]
        },
        {
          "category": "Tiers moyen du visage",
          "zones": ["Remontée des pommettes (lifting malaire)", "Correction des sillons naso-géniens", "Restauration du volume jugal", "Amélioration de l''ovale"]
        },
        {
          "category": "Tiers inférieur du visage",
          "zones": ["Redéfinition de la mâchoire (jawline)", "Lifting cervical (cou)", "Correction des bajoues", "Amélioration du double menton"]
        }
      ]
    }
  },
  {
    "type": "list",
    "data": {
      "title": "Avantages des fils à cônes bidirectionnels",
      "items": [
        "Efficacité maximale - Ancrage optimal des cônes",
        "Résultats immédiats - Effet lifting visible dès la sortie",
        "Durabilité supérieure - 12-18 mois vs 6-12 mois fils lisses",
        "Stimulation renforcée - Néocollagénèse optimisée",
        "Sécurité prouvée - Matériau PDO résorbable",
        "Technique précise - Vecteurs bidirectionnels calculés",
        "Récupération rapide - Reprise d''activité sous 48-72h"
      ]
    }
  },
  {
    "type": "process",
    "data": {
      "title": "Déroulement de la séance",
      "duration": "Durée : 45-90 minutes selon l''étendue",
      "steps": [
        {
          "step": "1",
          "title": "Préparation (15 min)",
          "description": "Désinfection et marquage des trajets, anesthésie locale des zones d''insertion, préparation du matériel stérilisé"
        },
        {
          "step": "2",
          "title": "Insertion des fils (30-60 min)",
          "description": "Introduction avec canules fines, positionnement selon vecteurs calculés, ancrage des cônes aux points stratégiques"
        },
        {
          "step": "3",
          "title": "Finalisation (15 min)",
          "description": "Coupe des fils au niveau cutané, massage délicat pour optimisation, vérification du résultat symétrique"
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
          "question": "Le traitement est-il douloureux ?",
          "answer": "Inconfort modéré pendant l''insertion, bien contrôlé par l''anesthésie locale. Sensibilité résiduelle 1-2 semaines, facilement gérée."
        },
        {
          "question": "Quand voit-on les résultats définitifs ?",
          "answer": "Effet lifting immédiat, résultat optimal à 2-3 mois quand la stimulation collagénique est maximale."
        },
        {
          "question": "Les fils sont-ils visibles ou palpables ?",
          "answer": "Non, les fils à cônes bidirectionnels sont placés en profondeur. Palpation possible les premiers jours, puis intégration complète."
        },
        {
          "question": "Peut-on reprendre ses activités normalement ?",
          "answer": "Activités légères dès J+1, sport et efforts intenses après 1 semaine. Vie sociale normale sous 3-5 jours."
        }
      ]
    }
  },
  {
    "type": "cta",
    "data": {
      "title": "Consultation avec Docteure Fassotte",
      "description": "Pour découvrir si les fils tenseurs à cônes bidirectionnels peuvent répondre à vos objectifs de rajeunissement. Évaluation personnalisée et simulation des résultats possibles.",
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
WHERE slug = '/lifting-fils-tenseurs-liege';
