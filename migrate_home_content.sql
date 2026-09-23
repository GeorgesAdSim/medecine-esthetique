-- Insert or update home page entry
INSERT INTO custom_pages (slug, title, meta_description, is_published, content_blocks)
VALUES (
  'accueil',
  'Médecine Esthétique à Liège - Dre Jocelyne Fassotte',
  'Cabinet de médecine esthétique à Liège. Dre Jocelyne Fassotte, spécialiste diplômée CIME, propose des traitements esthétiques personnalisés et naturels.',
  true,
  '[
    {
      "id": "home-hero",
      "block_type": "hero",
      "block_order": 1,
      "content": {
        "title": "Médecine Esthétique à Liège - Dre Jocelyne Fassotte",
        "subtitle": "Spécialiste Qualifiée en Médecine Esthétique Non Chirurgicale",
        "description": "Diplômée du Collège International de Médecine Esthétique de Paris V (C.I.M.E.), le cursus diplômant du CIME est le seul à être reconnu en Belgique pour la formation de spécialiste qualifié en Médecine esthétique non chirurgicale.",
        "image": "/image copy copy copy copy copy copy.png",
        "imageAlt": "Docteure Jocelyne Fassotte au congrès SIME à Rome"
      }
    },
    {
      "id": "home-treatments",
      "block_type": "treatments",
      "block_order": 2,
      "content": {
        "title": "Les Traitements de Dre Fassotte",
        "subtitle": "Des solutions personnalisées pour révéler votre beauté avec des techniques douces et des résultats naturels.",
        "treatments": [
          {
            "title": "Acide hyaluronique",
            "description": "Restaurez les volumes naturels et comblez les rides pour un visage harmonieux et rajeuni.",
            "duration": "6-18 mois",
            "href": "/acide-hyaluronique-liege"
          },
          {
            "title": "Toxine botulique",
            "description": "Détendez les muscles faciaux pour atténuer les rides d''expression avec subtilité.",
            "duration": "4-6 mois",
            "href": "/botox-liege"
          },
          {
            "title": "Peelings",
            "description": "Révélez l''éclat de votre peau avec des peelings adaptés à vos besoins.",
            "duration": "Variable",
            "href": "/peeling-liege"
          },
          {
            "title": "Mésolift",
            "description": "Revitalisez votre peau en profondeur avec des cocktails d''actifs personnalisés.",
            "duration": "3-6 mois",
            "href": "/mesolift-liege"
          },
          {
            "title": "Fils tenseurs",
            "description": "Lifting naturel sans chirurgie pour retendre et repositionner les tissus.",
            "duration": "12-18 mois",
            "href": "/fils-tenseurs-liege"
          },
          {
            "title": "Cosmétologie",
            "description": "Conseils personnalisés et soins cosmétiques adaptés à votre type de peau.",
            "duration": "Permanent",
            "href": "/cosmetologie-liege"
          },
          {
            "title": "Stimulateurs de collagène",
            "description": "Ces traitements agissent en profondeur pour relancer la production naturelle de collagène de votre peau.",
            "duration": "Jusqu''à 24 mois",
            "href": "/stimulateurs-collagene-liege"
          }
        ]
      }
    },
    {
      "id": "home-approach",
      "block_type": "steps",
      "block_order": 3,
      "content": {
        "title": "Une approche personnalisée",
        "steps": [
          {
            "title": "Écoute attentive",
            "description": "Chaque consultation commence par une écoute approfondie des attentes et préoccupations esthétiques de ses patients."
          },
          {
            "title": "Analyse personnalisée",
            "description": "La Dre Fassotte réalise une analyse détaillée du visage pour proposer les traitements les plus adaptés à chaque morphologie."
          },
          {
            "title": "Techniques douces",
            "description": "Elle utilise les techniques les plus avancées pour minimiser l''inconfort et optimiser les résultats."
          },
          {
            "title": "Suivi personnalisé",
            "description": "La Dre Fassotte assure un accompagnement continu pour garantir la satisfaction de ses patients et ajuster les traitements si nécessaire."
          }
        ]
      }
    },
    {
      "id": "home-cta",
      "block_type": "cta",
      "block_order": 4,
      "content": {
        "title": "Prêt(e) à révéler votre beauté naturelle ?",
        "description": "Prenez rendez-vous pour une consultation personnalisée et découvrez comment sublimer votre beauté naturelle.",
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
  ]'::jsonb
)
ON CONFLICT (slug)
DO UPDATE SET
  content_blocks = EXCLUDED.content_blocks,
  title = EXCLUDED.title,
  meta_description = EXCLUDED.meta_description,
  is_published = EXCLUDED.is_published,
  updated_at = now();
