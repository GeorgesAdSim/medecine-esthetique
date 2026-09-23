/*
  # Migration Stimulateurs de Collagène vers blocs éditables
  
  Transformation du contenu de la page Stimulateurs de Collagène en blocs JSON structurés
*/

UPDATE custom_treatments 
SET content = '[
  {
    "type": "hero",
    "data": {
      "title": "Stimulateurs de Collagène",
      "subtitle": "Rajeunissement Naturel et Progressif",
      "description": "Ces traitements agissent en profondeur pour relancer la production naturelle de collagène de votre peau. Une approche révolutionnaire qui inverse le processus de vieillissement naturel.",
      "duration": "2-3 séances espacées de 4-6 semaines, résultats jusqu''à 2 ans"
    }
  },
  {
    "type": "text",
    "data": {
      "title": "Qu''est-ce qu''un stimulateur de collagène ?",
      "content": "Les stimulateurs de collagène représentent une approche révolutionnaire en médecine esthétique. Contrairement aux techniques de comblement classiques, ces traitements agissent en profondeur pour relancer la production naturelle de collagène de votre peau.",
      "features": [
        {
          "icon": "Zap",
          "title": "Injection",
          "description": "Micro-particules biocompatibles dans les couches profondes"
        },
        {
          "icon": "Activity",
          "title": "Stimulation",
          "description": "Activation des fibroblastes productrices de collagène"
        },
        {
          "icon": "Shield",
          "title": "Reconstruction",
          "description": "Reconstruction progressive de la matrice dermique"
        },
        {
          "icon": "Heart",
          "title": "Amélioration",
          "description": "Fermeté et élasticité durables"
        }
      ]
    }
  },
  {
    "type": "list",
    "data": {
      "title": "Produits utilisés par Docteure Fassotte",
      "description": "Seuls les produits certifiés CE et de qualité pharmaceutique sont utilisés",
      "items": [
        {
          "category": "Sculptra (Acide Poly-L-Lactique)",
          "features": ["100% résorbable et biocompatible", "Stimulation progressive sur 2 ans", "Résultats naturels et harmonieux"]
        },
        {
          "category": "Radiesse (Hydroxylapatite de Calcium)",
          "features": ["Double action : effet immédiat + stimulation", "Durabilité de 12-18 mois", "Excellent pour la restructuration"]
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
          "category": "Visage",
          "zones": ["Joues et pommettes (restauration des volumes)", "Tempes creusées", "Redéfinition de l''ovale du visage", "Rides nasolabiales et plis d''amertume"]
        },
        {
          "category": "Corps",
          "zones": ["Décolleté (amélioration texture)", "Dos des mains (rajeunissement)", "Brazilian Butt Lift non-chirurgical"]
        }
      ]
    }
  },
  {
    "type": "list",
    "data": {
      "title": "Avantages uniques",
      "items": [
        "Résultats naturels et progressifs (pas d''effet artificiel)",
        "Durabilité exceptionnelle : 18-24 mois",
        "Amélioration globale de la qualité de peau",
        "Biocompatibilité parfaite (aucun risque d''allergie)",
        "Stimulation de la régénération cellulaire",
        "Alternative au lifting chirurgical"
      ]
    }
  },
  {
    "type": "process",
    "data": {
      "title": "Protocole de traitement",
      "déroulement": {
        "séances": "2-3 injections espacées de 4-6 semaines",
        "durée": "30-45 minutes par séance",
        "anesthésie": "Locale pour votre confort",
        "récupération": "Reprise d''activité immédiate"
      },
      "évolution": [
        {
          "period": "Semaines 1-4",
          "description": "Début de stimulation, léger œdème normal"
        },
        {
          "period": "Mois 2-6",
          "description": "Production active de collagène, amélioration progressive"
        },
        {
          "period": "Mois 6-24",
          "description": "Résultats optimaux, peau ferme et tonique"
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
          "question": "Les résultats sont-ils immédiats ?",
          "answer": "Non, l''effet est progressif. Premiers résultats à 6-8 semaines, optimal à 6 mois."
        },
        {
          "question": "Est-ce douloureux ?",
          "answer": "Inconfort minimal grâce à l''anesthésie locale. Bien toléré par la plupart des patients."
        },
        {
          "question": "Combien de temps ça dure ?",
          "answer": "18-24 mois en moyenne, parfois plus selon les zones et les patients."
        },
        {
          "question": "Compatible avec autres traitements ?",
          "answer": "Parfaitement. Se combine idéalement avec Botox, acide hyaluronique, peelings."
        }
      ]
    }
  },
  {
    "type": "cta",
    "data": {
      "title": "Consultation personnalisée",
      "description": "Découvrez si les stimulateurs de collagène conviennent à vos objectifs esthétiques lors d''une consultation avec Docteure Fassotte.",
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
WHERE slug = '/stimulateurs-collagene-liege';
