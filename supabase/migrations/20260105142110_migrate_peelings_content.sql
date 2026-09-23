/*
  # Migration Peelings vers blocs éditables
  
  Transformation du contenu de la page Peelings en blocs JSON structurés
*/

UPDATE custom_treatments 
SET content = '[
  {
    "type": "hero",
    "data": {
      "title": "Peelings Chimiques",
      "subtitle": "Révélez l''Éclat de Votre Peau",
      "description": "Le peeling chimique est un traitement de médecine esthétique qui consiste à appliquer une solution acide contrôlée sur la peau pour éliminer les couches superficielles endommagées. Cette exfoliation stimule le renouvellement cellulaire et révèle une peau plus lisse, lumineuse et uniforme.",
      "duration": "1 à 6 séances selon l''objectif"
    }
  },
  {
    "type": "text",
    "data": {
      "title": "Comment ça fonctionne ?",
      "content": "Mécanisme d''action du peeling chimique",
      "features": [
        {
          "icon": "Sparkles",
          "title": "Exfoliation contrôlée",
          "description": "Élimination des couches superficielles endommagées"
        },
        {
          "icon": "Activity",
          "title": "Renouvellement cellulaire",
          "description": "Stimulation du renouvellement cellulaire en profondeur"
        },
        {
          "icon": "Zap",
          "title": "Stimulation collagène",
          "description": "Activation de la production de collagène et d''élastine"
        }
      ]
    }
  },
  {
    "type": "list",
    "data": {
      "title": "Types de peelings proposés",
      "items": [
        {
          "category": "Peelings superficiels",
          "duration": "15-30 minutes",
          "downtime": "Aucune éviction sociale",
          "frequency": "Toutes les 2-4 semaines",
          "types": [
            {
              "name": "Acide glycolique (20-70%)",
              "origin": "Canne à sucre",
              "action": "Exfoliation douce, stimulation cellulaire",
              "ideal": "Teint terne, pores dilatés, rides superficielles"
            },
            {
              "name": "Acide lactique (30-88%)",
              "origin": "Fermentation lactique",
              "action": "Exfoliation + hydratation",
              "ideal": "Peaux sensibles, phototypes foncés"
            }
          ]
        },
        {
          "category": "Peelings moyens",
          "duration": "30-45 minutes",
          "downtime": "7-14 jours",
          "frequency": "1-2 fois par an",
          "types": [
            {
              "name": "TCA (Acide Trichloracétique) 15-35%",
              "action": "Coagulation protéique, stimulation collagénique intense",
              "ideal": "Rides modérées, taches marquées, cicatrices d''acné"
            }
          ]
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
          "category": "Problèmes de pigmentation",
          "issues": ["Taches brunes (lentigos solaires)", "Mélasma (masque de grossesse)", "Hyperpigmentation post-inflammatoire", "Teint irrégulier et terne"]
        },
        {
          "category": "Signes de l''âge",
          "issues": ["Rides superficielles à modérées", "Texture rugueuse", "Perte d''éclat et de luminosité", "Relâchement cutané léger"]
        },
        {
          "category": "Problèmes d''acné et séquelles",
          "issues": ["Cicatrices d''acné superficielles", "Pores dilatés", "Points noirs (comédons)", "Séquelles pigmentaires d''acné"]
        }
      ]
    }
  },
  {
    "type": "process",
    "data": {
      "title": "Déroulement de la séance",
      "steps": [
        {
          "step": "1",
          "title": "Préparation (10 min)",
          "description": "Démaquillage, nettoyage approfondi et dégraissage avec solution spécialisée"
        },
        {
          "step": "2",
          "title": "Application (10-25 min)",
          "description": "Application progressive de la solution avec surveillance continue de la réaction"
        },
        {
          "step": "3",
          "title": "Soins post-application (10 min)",
          "description": "Masque apaisant, crème réparatrice et protection solaire"
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
          "question": "Le peeling est-il douloureux ?",
          "answer": "Sensation de picotements et chaleur pendant l''application, bien tolérée. Inconfort léger les premiers jours avec tiraillements normaux."
        },
        {
          "question": "Combien de séances sont nécessaires ?",
          "answer": "1 à 6 séances selon l''objectif : 1 séance pour l''éclat immédiat, 3-6 pour traiter taches ou rides marquées."
        },
        {
          "question": "Peut-on faire un peeling toute l''année ?",
          "answer": "Préférable octobre à mars. Protection solaire stricte indispensable. Éviter absolument l''été pour peelings moyens."
        },
        {
          "question": "Puis-je me maquiller après ?",
          "answer": "Immédiatement pour peelings superficiels, après cicatrisation complète pour peelings moyens (10-14 jours)."
        }
      ]
    }
  },
  {
    "type": "cta",
    "data": {
      "title": "Consultation avec Docteure Fassotte",
      "description": "Pour déterminer le peeling le plus adapté à votre type de peau et vos objectifs esthétiques. Analyse personnalisée et proposition de protocole sur mesure pour des résultats optimaux en toute sécurité.",
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
WHERE slug = '/peelings-chimiques-liege';
