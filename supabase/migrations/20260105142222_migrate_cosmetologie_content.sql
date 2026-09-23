/*
  # Migration Cosmétologie vers blocs éditables
  
  Transformation du contenu de la page Cosmétologie en blocs JSON structurés
*/

UPDATE custom_treatments 
SET content = '[
  {
    "type": "hero",
    "data": {
      "title": "Cosmétologie Médicale",
      "subtitle": "Optimisez Votre Routine de Soins",
      "description": "La cosmétologie médicale représente l''alliance entre expertise dermatologique et soins esthétiques avancés. Cette approche scientifique de la beauté permet d''analyser précisément les besoins de votre peau et de vous proposer des protocoles de soins personnalisés avec des produits de qualité pharmaceutique.",
      "duration": "Consultation personnalisée de 30 min"
    }
  },
  {
    "type": "text",
    "data": {
      "title": "Qu''est-ce que la cosmétologie médicale ?",
      "content": "Docteure Fassotte intègre la cosmétologie médicale dans sa pratique pour optimiser et prolonger les résultats de vos traitements esthétiques, tout en préservant la santé et la beauté de votre peau au quotidien.",
      "features": [
        {
          "icon": "Microscope",
          "title": "Analyse dermatologique approfondie",
          "description": "Examen clinique de la peau au microscope, évaluation du phototype et du type de peau"
        },
        {
          "icon": "Target",
          "title": "Diagnostic personnalisé",
          "description": "État actuel de votre peau, facteurs aggravants, besoins prioritaires à traiter"
        }
      ]
    }
  },
  {
    "type": "list",
    "data": {
      "title": "Domaines d''expertise",
      "items": [
        {
          "category": "Anti-âge et prévention",
          "details": ["Protocoles préventifs dès 25 ans", "Soins anti-rides ciblés selon les zones", "Stimulation du collagène par cosmétiques actifs", "Protection solaire adaptée au quotidien", "Antioxydants pour lutter contre le stress oxydatif"]
        },
        {
          "category": "Correction des imperfections",
          "details": ["Traitement de l''acné adulte et juvénile", "Atténuation des taches pigmentaires", "Réduction des pores dilatés", "Amélioration de la texture cutanée", "Unification du teint"]
        },
        {
          "category": "Hydratation et nutrition",
          "details": ["Restauration de la barrière cutanée", "Hydratation profonde selon le type de peau", "Nutrition cellulaire avec actifs concentrés", "Réparation des peaux sensibles et réactives", "Soins spécifiques contour des yeux"]
        }
      ]
    }
  },
  {
    "type": "list",
    "data": {
      "title": "Actifs concentrés",
      "items": [
        {
          "name": "Vitamine C",
          "action": "Antioxydant puissant, éclat"
        },
        {
          "name": "Rétinol/Rétinaldéhyde",
          "action": "Anti-âge de référence"
        },
        {
          "name": "Acides AHA/BHA",
          "action": "Exfoliation et renouvellement"
        },
        {
          "name": "Niacinamide",
          "action": "Régulation sébacée, anti-inflammatoire"
        },
        {
          "name": "Peptides",
          "action": "Stimulation collagénique"
        },
        {
          "name": "Acide hyaluronique",
          "action": "Hydratation intense"
        }
      ]
    }
  },
  {
    "type": "list",
    "data": {
      "title": "Protocoles selon l''âge",
      "items": [
        {
          "category": "20-30 ans : Prévention",
          "objectives": ["Protection solaire quotidienne", "Hydratation adaptée", "Prévention du photovieillissement", "Traitement de l''acné si nécessaire"],
          "routine": ["Nettoyant doux matin et soir", "Sérum antioxydant (vitamine C)", "Hydratant selon type de peau", "Protection solaire SPF 30-50 quotidienne"]
        },
        {
          "category": "30-45 ans : Correction précoce",
          "objectives": ["Correction des premiers signes", "Stimulation du collagène", "Amélioration de la texture", "Prévention accentuée"],
          "routine": ["Sérum vitamine C le matin", "Rétinol progressif le soir", "Hydratant riche en actifs", "Protection solaire renforcée"]
        },
        {
          "category": "45+ ans : Réparation intensive",
          "objectives": ["Correction des signes installés", "Nutrition intensive", "Fermeté et élasticité", "Éclat du teint"],
          "routine": ["Sérums concentrés multi-actifs", "Soins nutritifs riches", "Masques hebdomadaires", "Protection maximale"]
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
          "question": "Quelle différence avec les cosmétiques classiques ?",
          "answer": "Les cosméceutiques contiennent des actifs concentrés à des dosages efficaces, avec études cliniques prouvant leur efficacité."
        },
        {
          "question": "Combien de temps pour voir des résultats ?",
          "answer": "4-6 semaines minimum pour les premiers effets, 3-6 mois pour des résultats optimaux selon la problématique."
        },
        {
          "question": "Peut-on utiliser plusieurs actifs ensemble ?",
          "answer": "Oui, mais selon un protocole précis pour éviter interactions et intolérances. D''où l''importance du conseil médical."
        },
        {
          "question": "Les soins sont-ils adaptés à tous les âges ?",
          "answer": "Absolument, avec des protocoles spécifiques selon l''âge, le type de peau et les besoins individuels."
        }
      ]
    }
  },
  {
    "type": "cta",
    "data": {
      "title": "Consultation cosmétologique",
      "description": "Pour découvrir les soins dermocosmétiques adaptés à votre peau et optimiser votre routine beauté. Analyse personnalisée : Diagnostic complet de votre peau et création d''un protocole de soins sur mesure avec les meilleurs cosméceutiques du marché.",
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
WHERE slug = '/cosmetologie-medicale-liege';
