/*
  # Migration Liquid Lift vers blocs éditables
  
  Transformation du contenu de la page Liquid Lift en blocs JSON structurés
*/

UPDATE custom_treatments 
SET content = '[
  {
    "type": "hero",
    "data": {
      "title": "Liquid Lift",
      "subtitle": "Rajeunissement Global par Injections Stratégiques",
      "description": "Le Liquid Lift représente l''évolution la plus sophistiquée des techniques d''injection en médecine esthétique. Cette approche globale et vectorisée utilise des injections stratégiques d''acide hyaluronique pour créer un véritable effet lifting sans chirurgie.",
      "duration": "Durée : 12-18 mois"
    }
  },
  {
    "type": "text",
    "data": {
      "title": "Qu''est-ce que le Liquid Lift ?",
      "content": "Docteure Fassotte maîtrise cette technique avancée qui permet de restaurer l''architecture naturelle du visage en repositionnant les volumes affaissés et en redéfinissant les contours, pour un rajeunissement harmonieux et naturel.",
      "features": [
        {
          "icon": "Target",
          "title": "Approche vectorielle",
          "description": "Analyse 3D de la structure faciale, identification des vecteurs de lifting naturels, points de tension stratégiques"
        },
        {
          "icon": "Zap",
          "title": "Technique innovante",
          "description": "Injections profondes aux points d''ancrage anatomiques, repositionnement des tissus affaissés, effet cascade sur l''ensemble du visage"
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
          "category": "Architecture du visage",
          "zones": ["Tempes : Restauration des volumes perdus", "Pommettes : Remontée et redéfinition malaire", "Menton : Projection et harmonisation du profil", "Mâchoire : Redéfinition de la jawline", "Angle mandibulaire : Restructuration de l''ovale"]
        },
        {
          "category": "Points de tension stratégiques",
          "zones": ["Lifting des joues par traction vectorisée", "Remontée des commissures labiales", "Ouverture du regard par lifting temporal", "Correction des bajoues par repositionnement", "Amélioration du profil global"]
        }
      ]
    }
  },
  {
    "type": "list",
    "data": {
      "title": "Indications principales",
      "items": [
        {
          "category": "Rajeunissement global",
          "issues": ["Visage affaissé par la gravité et l''âge", "Perte des volumes jeunes du visage", "Relâchement des tissus modéré", "Asymétries liées au vieillissement", "Manque d''harmonie des proportions"]
        },
        {
          "category": "Restructuration faciale",
          "issues": ["Restauration de l''ovale du visage", "Redéfinition des contours perdus", "Amélioration du profil en vue de côté", "Correction des disproportions naturelles", "Optimisation de la beauté naturelle"]
        },
        {
          "category": "Harmonisation esthétique",
          "issues": ["Équilibrage des volumes faciaux", "Amélioration des proportions selon le nombre d''or", "Correction des asymétries mineures", "Sublimation des traits existants", "Rajeunissement sans transformation"]
        }
      ]
    }
  },
  {
    "type": "list",
    "data": {
      "title": "Avantages du Liquid Lift",
      "items": [
        "Effet lifting immédiat sans chirurgie",
        "Approche globale - Vision d''ensemble du visage",
        "Résultats naturels - Respect de votre identité",
        "Durabilité optimale - 12-18 mois de bénéfices",
        "Récupération immédiate - Pas d''éviction sociale",
        "Technique réversible - Ajustements possibles",
        "Alternative sûre à la chirurgie esthétique"
      ]
    }
  },
  {
    "type": "process",
    "data": {
      "title": "Protocole de traitement",
      "duration": "Durée : 60-90 minutes",
      "consultation": {
        "title": "Consultation spécialisée",
        "steps": ["Analyse morphologique approfondie du visage", "Photographies sous différents angles", "Simulation des résultats attendus", "Planification vectorielle personnalisée"]
      },
      "steps": [
        {
          "step": "1",
          "title": "Préparation (20 min)",
          "description": "Marquage des points d''injection stratégiques, anesthésie locale des zones de traitement, préparation des seringues d''acide hyaluronique"
        },
        {
          "step": "2",
          "title": "Phase d''injection (40-60 min)",
          "description": "Injections profondes aux points d''ancrage, repositionnement progressif des volumes, contrôle symétrique constant, ajustements selon l''évolution"
        },
        {
          "step": "3",
          "title": "Finalisation (10 min)",
          "description": "Massage délicat d''homogénéisation, vérification du résultat global, conseils post-traitement"
        }
      ]
    }
  },
  {
    "type": "list",
    "data": {
      "title": "Types d''acide hyaluronique utilisés",
      "items": [
        {
          "name": "Haute densité (G-Prime)",
          "zones": "Pommettes, menton, mâchoire",
          "action": "Restructuration profonde",
          "durability": "15-18 mois"
        },
        {
          "name": "Densité moyenne (G-Classic)",
          "zones": "Tempes, milieu du visage",
          "action": "Volumisation et projection",
          "durability": "12-15 mois"
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
          "question": "Le Liquid Lift fait-il mal ?",
          "answer": "Inconfort modéré durant l''injection, bien contrôlé par l''anesthésie locale. Sensibilité résiduelle 2-7 jours, facilement supportable."
        },
        {
          "question": "Combien de seringues sont nécessaires ?",
          "answer": "Variables selon les besoins : 2-6 seringues généralement. Évaluation précise lors de la consultation selon votre morphologie."
        },
        {
          "question": "Le résultat paraît-il naturel ?",
          "answer": "Parfaitement naturel avec la technique maîtrisée. L''objectif est de restaurer votre architecture faciale jeune, pas de vous transformer."
        },
        {
          "question": "Peut-on reprendre ses activités normalement ?",
          "answer": "Oui immédiatement. Éviter sport intense et exposition à la chaleur pendant 48h. Vie sociale normale dès le lendemain."
        },
        {
          "question": "Compatible avec d''autres traitements ?",
          "answer": "Excellente synergie avec Botox (espacer de 15 jours), peelings, soins dermocosmétiques. Planification globale recommandée."
        }
      ]
    }
  },
  {
    "type": "cta",
    "data": {
      "title": "Consultation avec Docteure Fassotte",
      "description": "Pour découvrir si le Liquid Lift peut répondre à vos objectifs de rajeunissement global. Évaluation personnalisée : Analyse morphologique complète et simulation des résultats possibles avec la technique du Liquid Lift.",
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
WHERE slug = '/rajeunissement-global-liege';
