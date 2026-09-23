/*
  # Migration Acide Hyaluronique vers blocs éditables
  
  Transformation du contenu de la page Acide Hyaluronique en blocs JSON structurés
*/

UPDATE custom_treatments 
SET content = '[
  {
    "type": "hero",
    "data": {
      "title": "Injection Acide Hyaluronique Liège",
      "subtitle": "Traitement anti-âge naturel à Liège",
      "description": "La Dre Fassotte propose des injections d''acide hyaluronique à Liège pour restaurer les volumes, combler les rides et redonner éclat et hydratation au visage de façon naturelle. Spécialiste qualifiée en médecine esthétique non chirurgicale.",
      "duration": "Durée : 6-18 mois"
    }
  },
  {
    "type": "text",
    "data": {
      "title": "Qu''est-ce que l''acide hyaluronique ?",
      "features": [
        {
          "icon": "Droplets",
          "title": "Substance naturelle",
          "description": "Présent naturellement dans notre peau, l''acide hyaluronique maintient l''hydratation et le volume des tissus."
        },
        {
          "icon": "Shield",
          "title": "100% biocompatible",
          "description": "Parfaitement toléré par l''organisme, il ne présente aucun risque allergique et se résorbe naturellement."
        },
        {
          "icon": "Heart",
          "title": "Résultats naturels",
          "description": "Permet d''obtenir des résultats harmonieux qui respectent la morphologie naturelle de votre visage."
        }
      ]
    }
  },
  {
    "type": "list",
    "data": {
      "title": "Zones traitables",
      "description": "L''acide hyaluronique peut être utilisé sur différentes zones du visage pour des résultats personnalisés et naturels.",
      "items": [
        {
          "category": "Lèvres",
          "description": "Volume naturel et hydratation",
          "duration": "6-12 mois",
          "details": ["Augmentation subtile du volume", "Redéfinition du contour", "Hydratation intense"]
        },
        {
          "category": "Rides et sillons",
          "description": "Comblement des rides marquées",
          "duration": "12-18 mois",
          "details": ["Rides nasogéniennes", "Sillons d''amertume", "Plis d''amaigrissement"]
        },
        {
          "category": "Volumes faciaux",
          "description": "Restauration des volumes perdus",
          "duration": "12-18 mois",
          "details": ["Pommettes", "Tempes", "Menton", "Mâchoires"]
        },
        {
          "category": "Cernes",
          "description": "Correction des cernes creusés",
          "duration": "12-15 mois",
          "details": ["Technique délicate", "Résultats naturels", "Regard rajeuni"]
        }
      ]
    }
  },
  {
    "type": "text",
    "data": {
      "title": "La technique \"Soft Filling\"",
      "content": "Ma technique privilégiée consiste en des injections douces et progressives qui respectent l''anatomie naturelle du visage pour des résultats harmonieux et une intégration parfaite.",
      "features": [
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
      ]
    }
  },
  {
    "type": "faq",
    "data": {
      "title": "Questions fréquentes",
      "subtitle": "Tout ce que vous devez savoir sur les injections d''acide hyaluronique",
      "items": [
        {
          "question": "Le traitement est-il douloureux ?",
          "answer": "L''inconfort est minimal grâce à l''utilisation d''une crème anesthésiante et à la technique douce. La plupart des patients décrivent une sensation de légère pression."
        },
        {
          "question": "Quels sont les effets secondaires possibles ?",
          "answer": "Léger œdème et rougeur transitoires (24-48h). Possibles petits hématomes qui s''estompent en quelques jours. Tous les effets sont temporaires."
        },
        {
          "question": "Quand voit-on les résultats ?",
          "answer": "Les résultats sont visibles immédiatement et s''améliore dans les 2 semaines suivant l''injection, le temps que l''acide hyaluronique s''intègre naturellement."
        },
        {
          "question": "Peut-on reprendre ses activités normalement ?",
          "answer": "Oui, la reprise des activités est possible immédiatement. Il est recommandé d''éviter le sport intensif et les massages pendant 24h."
        }
      ]
    }
  },
  {
    "type": "cta",
    "data": {
      "title": "Prêt(e) pour une consultation ?",
      "description": "Découvrez comment l''acide hyaluronique peut révéler votre beauté naturelle. Prenez rendez-vous pour une consultation personnalisée.",
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
WHERE slug = '/acide-hyaluronique-liege';
