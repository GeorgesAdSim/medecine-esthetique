-- BROUILLON — NON APPLIQUÉ. Corrections de sécurité des 7 pages de traitement
-- (hors Botox), d'après docs/sources/2026-09-28-sources-traitements.md.
-- À valider par la Dre Fassotte, puis à exécuter dans l'éditeur SQL Supabase
-- et à publier (bouton « Publier » de l'admin). Une instruction par page.

UPDATE custom_pages SET content = '[
  {
    "id": "block-hero-0",
    "type": "hero",
    "order": 0,
    "content": {
      "image": "https://hxgfakegwewcfkxvltgl.supabase.co/storage/v1/object/public/media/1771937027109-qefsfr.jpeg",
      "title": "Injection Acide Hyaluronique Liège",
      "ctaLink": "/contact",
      "ctaText": "Prendre rendez-vous",
      "imageAlt": "Zones d''injection acide hyaluronique sur le visage",
      "subtitle": "Traitement anti-âge naturel à Liège",
      "description": "La Dre Fassotte propose des injections d''acide hyaluronique à Liège pour restaurer les volumes, combler les rides et redonner éclat et hydratation au visage de façon naturelle. Spécialiste qualifiée en médecine esthétique non chirurgicale."
    }
  },
  {
    "id": "block-heading-1",
    "type": "heading",
    "order": 1,
    "content": {
      "text": "Qu''est-ce que l''acide hyaluronique ?",
      "level": "h2"
    }
  },
  {
    "id": "block-features-2",
    "type": "features",
    "order": 2,
    "content": {
      "features": [
        {
          "icon": "droplets",
          "title": "Substance naturelle",
          "description": "Présent naturellement dans notre peau, l''acide hyaluronique maintient l''hydratation et le volume des tissus."
        },
        {
          "icon": "shield",
          "title": "Résorbable",
          "description": "Il est progressivement dégradé et résorbé par l''organisme. Il est bien toléré dans la grande majorité des cas ; une allergie reste possible, et une allergie connue au produit est une contre-indication."
        },
        {
          "icon": "heart",
          "title": "Résultats naturels",
          "description": "Permet d''obtenir des résultats harmonieux qui respectent la morphologie naturelle de votre visage."
        }
      ],
      "ancre": "principe"
    }
  },
  {
    "id": "block-heading-3",
    "type": "heading",
    "order": 3,
    "content": {
      "text": "Zones traitables",
      "level": "h2",
      "subtitle": "L''acide hyaluronique peut être utilisé sur différentes zones du visage pour des résultats personnalisés et naturels."
    }
  },
  {
    "id": "block-cards-4",
    "type": "cards",
    "order": 4,
    "content": {
      "cards": [
        {
          "title": "Lèvres",
          "details": [
            "Augmentation subtile du volume",
            "Redéfinition du contour",
            "Hydratation intense"
          ],
          "duration": "6-12 mois",
          "description": "Volume naturel et hydratation"
        },
        {
          "title": "Rides et sillons",
          "details": [
            "Rides nasogéniennes",
            "Sillons d''amertume",
            "Plis d''amaigrissement"
          ],
          "duration": "Jusqu''à 1 an environ",
          "description": "Comblement des rides marquées"
        },
        {
          "title": "Volumes faciaux",
          "details": [
            "Pommettes",
            "Tempes",
            "Menton",
            "Mâchoires"
          ],
          "duration": "12 à 24 mois selon la zone",
          "description": "Restauration des volumes perdus"
        },
        {
          "title": "Cernes",
          "details": [
            "Technique délicate",
            "Résultats naturels",
            "Regard rajeuni"
          ],
          "duration": "Jusqu''à 1 an environ",
          "description": "Correction des cernes creusés"
        }
      ],
      "ancre": "zones"
    }
  },
  {
    "id": "block-image-text-5",
    "type": "image-text",
    "order": 5,
    "content": {
      "image": "/image copy copy copy copy copy copy copy.png",
      "title": "La technique \"Soft Filling\"",
      "points": [
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
      ],
      "imageAlt": "Zones d''injection acide hyaluronique - Technique Soft Filling",
      "description": "Ma technique privilégiée consiste en des injections douces et progressives qui respectent l''anatomie naturelle du visage pour des résultats harmonieux et une intégration parfaite.",
      "imagePosition": "right"
    }
  },
  {
    "id": "block-cards-precautions",
    "type": "cards",
    "content": {
      "ancre": "precautions",
      "title": "Acide hyaluronique : effets indésirables et précautions",
      "subtitle": "Les injections d''acide hyaluronique sont des actes médicaux. Voici ce que disent les autorités de santé.",
      "cards": [
        {
          "title": "Effets fréquents",
          "description": "Au point d’injection, dans les jours qui suivent.",
          "details": [
            "Rougeur, gonflement, hématome",
            "En général résolus en une à deux semaines"
          ]
        },
        {
          "title": "Complications rares",
          "description": "À connaître avant tout traitement.",
          "details": [
            "Allergie, possible même plusieurs mois après",
            "Injection dans un vaisseau : nécrose de la peau et, exceptionnellement, troubles visuels",
            "Produits résorbables uniquement : les autorités déconseillent les produits non résorbables"
          ]
        }
      ]
    },
    "order": 6
  },
  {
    "id": "block-faq-6",
    "type": "faq",
    "order": 7,
    "content": {
      "title": "Questions fréquentes",
      "subtitle": "Tout ce que vous devez savoir sur les injections d''acide hyaluronique",
      "questions": [
        {
          "answer": "L''inconfort est minimal grâce à l''utilisation d''une crème anesthésiante et à la technique douce. La plupart des patients décrivent une sensation de légère pression.",
          "question": "Le traitement est-il douloureux ?"
        },
        {
          "answer": "Rougeur, gonflement, sensibilité ou petits hématomes au point d''injection, qui disparaissent en général en une à deux semaines. Des complications rares mais graves existent, notamment si le produit pénètre dans un vaisseau sanguin : c''est pourquoi l''injection est réalisée par un médecin. En cas de besoin, l''acide hyaluronique peut être dissous par une enzyme, la hyaluronidase.",
          "question": "Quels sont les effets secondaires possibles ?"
        },
        {
          "answer": "Les résultats sont visibles immédiatement et s''améliore dans les 2 semaines suivant l''injection, le temps que l''acide hyaluronique s''intègre naturellement.",
          "question": "Quand voit-on les résultats ?"
        },
        {
          "answer": "Oui, la reprise des activités est possible immédiatement. Il est recommandé d''éviter le sport intensif, le soleil et la chaleur pendant les 24 heures qui suivent.",
          "question": "Peut-on reprendre ses activités normalement ?"
        }
      ],
      "ancre": "faq"
    }
  },
  {
    "id": "block-cta-7",
    "type": "cta",
    "order": 8,
    "content": {
      "title": "Prêt(e) pour une consultation ?",
      "description": "Découvrez comment l''acide hyaluronique peut révéler votre beauté naturelle. Prenez rendez-vous pour une consultation personnalisée.",
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
]'::jsonb, updated_at = now() WHERE slug = 'acide-hyaluronique';

UPDATE custom_pages SET content = '[
  {
    "id": "block-hero-0",
    "type": "hero",
    "order": 0,
    "content": {
      "image": "https://hxgfakegwewcfkxvltgl.supabase.co/storage/v1/object/public/media/1771941142697-1y37rq.jpeg",
      "title": "Stimulateurs de Collagène",
      "ctaLink": "/contact",
      "ctaText": "Consultation personnalisée",
      "imageAlt": "Stimulation du collagène",
      "subtitle": "Rajeunissement Naturel et Progressif",
      "description": "Ces traitements agissent en profondeur pour relancer la production naturelle de collagène de votre peau. Les résultats apparaissent progressivement, au fil des semaines."
    }
  },
  {
    "id": "block-features-1",
    "type": "features",
    "order": 1,
    "content": {
      "title": "Qu''est-ce qu''un stimulateur de collagène ?",
      "features": [
        {
          "title": "Injection",
          "description": "Micro-particules biocompatibles dans les couches profondes"
        },
        {
          "title": "Stimulation",
          "description": "Activation des fibroblastes productrices de collagène"
        },
        {
          "title": "Reconstruction",
          "description": "Reconstruction progressive de la matrice dermique"
        },
        {
          "title": "Amélioration",
          "description": "Fermeté et élasticité durables"
        }
      ],
      "subtitle": "Mécanisme d''action des stimulateurs"
    }
  },
  {
    "id": "block-cards-2",
    "type": "cards",
    "order": 2,
    "content": {
      "cards": [
        {
          "title": "Sculptra (Acide Poly-L-Lactique)",
          "details": [
            "Résorbable",
            "Résultats observés jusqu''à 25 mois dans les études",
            "Résultats naturels et harmonieux"
          ],
          "description": "Résultats progressifs, jusqu''à 2 ans environ"
        },
        {
          "title": "Radiesse (Hydroxylapatite de Calcium)",
          "details": [
            "Double action : effet immédiat + stimulation",
            "Durabilité de 12-18 mois",
            "Excellent pour la restructuration"
          ],
          "description": "Double action : effet immédiat + stimulation"
        }
      ],
      "title": "Produits utilisés par Docteure Fassotte",
      "subtitle": "Seuls des produits marqués CE sont utilisés",
      "ancre": "produits"
    }
  },
  {
    "id": "block-cards-3",
    "type": "cards",
    "order": 3,
    "content": {
      "cards": [
        {
          "title": "Visage",
          "details": [
            "Joues et pommettes (restauration des volumes)",
            "Tempes creusées",
            "Redéfinition de l''ovale du visage",
            "Rides nasolabiales et plis d''amertume"
          ],
          "description": "Restauration des volumes"
        },
        {
          "title": "Corps",
          "details": [
            "Décolleté (amélioration texture)",
            "Dos des mains (rajeunissement)"
          ],
          "description": "Amélioration de la texture"
        }
      ],
      "title": "Zones de traitement"
    }
  },
  {
    "id": "block-features-4",
    "type": "features",
    "order": 4,
    "content": {
      "title": "Avantages uniques",
      "features": [
        {
          "title": "Résultats naturels et progressifs",
          "description": "Pas d''effet artificiel"
        },
        {
          "title": "Durabilité exceptionnelle",
          "description": "Jusqu''à 18 à 24 mois selon le produit"
        },
        {
          "title": "Amélioration globale",
          "description": "Qualité de peau"
        },
        {
          "title": "Stimulation",
          "description": "Régénération cellulaire"
        },
        {
          "title": "Sans chirurgie",
          "description": "Traitement par injections"
        }
      ]
    }
  },
  {
    "id": "block-cards-precautions",
    "type": "cards",
    "content": {
      "ancre": "precautions",
      "title": "Stimulateurs de collagène : effets indésirables et contre-indications",
      "subtitle": "Ce que disent les notices des produits.",
      "cards": [
        {
          "title": "Effets indésirables",
          "description": "Les plus fréquents et les plus importants.",
          "details": [
            "Gonflement, rougeur, hématome au point d''injection",
            "Petits nodules sous la peau, parfois plusieurs mois après (acide poly-L-lactique)",
            "Rarement, occlusion d''un vaisseau (hydroxylapatite de calcium)"
          ]
        },
        {
          "title": "Contre-indications",
          "description": "Le traitement n’est pas réalisé dans ces cas.",
          "details": [
            "Allergie à un composant du produit",
            "Antécédents de cicatrices chéloïdes ou hypertrophiques (acide poly-L-lactique)",
            "Pas d''injection dans les lèvres (hydroxylapatite de calcium)"
          ]
        }
      ]
    },
    "order": 5
  },
  {
    "id": "block-faq-5",
    "type": "faq",
    "order": 6,
    "content": {
      "title": "Questions fréquentes",
      "questions": [
        {
          "answer": "Non, l''effet est progressif : il apparaît en quelques semaines (6 à 12 semaines en général pour l''acide poly-L-lactique). Plusieurs séances espacées sont souvent nécessaires, en général trois.",
          "question": "Les résultats sont-ils immédiats ?"
        },
        {
          "answer": "Inconfort minimal grâce à l''anesthésie locale. Bien toléré par la plupart des patients.",
          "question": "Est-ce douloureux ?"
        },
        {
          "answer": "De 12 à 18 mois environ pour l''hydroxylapatite de calcium, et jusqu''à 2 ans environ pour l''acide poly-L-lactique, selon les zones et les personnes.",
          "question": "Combien de temps ça dure ?"
        },
        {
          "answer": "Parfaitement. Se combine idéalement avec Botox, acide hyaluronique, peelings.",
          "question": "Compatible avec autres traitements ?"
        },
        {
          "answer": "Les effets les plus fréquents sont un gonflement, une rougeur ou un hématome au point d''injection. De petits nodules sous la peau peuvent apparaître, parfois plusieurs mois après ; plus rarement, l''injection dans un vaisseau peut entraîner des complications graves. Les risques et les contre-indications sont expliqués en consultation.",
          "question": "Y a-t-il des risques ?"
        }
      ],
      "ancre": "faq"
    }
  },
  {
    "id": "block-cta-6",
    "type": "cta",
    "order": 7,
    "content": {
      "title": "Consultation personnalisée",
      "description": "Découvrez si les stimulateurs de collagène conviennent à vos objectifs esthétiques lors d''une consultation avec Docteure Fassotte.",
      "primaryButton": {
        "link": "/contact",
        "text": "Prendre rendez-vous"
      }
    }
  }
]'::jsonb, updated_at = now() WHERE slug = 'stimulateur-collagene';

UPDATE custom_pages SET content = '[
  {
    "id": "block-hero-0",
    "type": "hero",
    "order": 0,
    "content": {
      "image": "https://hxgfakegwewcfkxvltgl.supabase.co/storage/v1/object/public/media/1771938013395-wu24k.jpg",
      "title": "Peelings Chimiques",
      "ctaLink": "/contact",
      "ctaText": "Consultation personnalisée",
      "imageAlt": "Traitement peeling chimique professionnel",
      "subtitle": "Révélez l''Éclat de Votre Peau",
      "description": "Le peeling chimique est un traitement de médecine esthétique qui consiste à appliquer une solution acide contrôlée sur la peau pour éliminer les couches superficielles endommagées. Cette exfoliation stimule le renouvellement cellulaire et révèle une peau plus lisse, lumineuse et uniforme."
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
          "title": "Exfoliation contrôlée",
          "description": "Élimination des couches superficielles endommagées"
        },
        {
          "title": "Renouvellement cellulaire",
          "description": "Stimulation du renouvellement cellulaire en profondeur"
        },
        {
          "title": "Stimulation collagène",
          "description": "Stimulation du derme : épaisseur et élasticité"
        }
      ],
      "subtitle": "Mécanisme d''action du peeling chimique",
      "ancre": "principe"
    }
  },
  {
    "id": "block-cards-2",
    "type": "cards",
    "order": 2,
    "content": {
      "cards": [
        {
          "title": "Problèmes de pigmentation",
          "details": [
            "Taches brunes (lentigos solaires)",
            "Mélasma (masque de grossesse)",
            "Hyperpigmentation post-inflammatoire",
            "Teint irrégulier et terne"
          ]
        },
        {
          "title": "Signes de l''âge",
          "details": [
            "Rides superficielles à modérées",
            "Texture rugueuse",
            "Perte d''éclat et de luminosité"
          ]
        },
        {
          "title": "Problèmes d''acné et séquelles",
          "details": [
            "Cicatrices d''acné superficielles",
            "Pores dilatés",
            "Points noirs (comédons)",
            "Séquelles pigmentaires d''acné"
          ]
        }
      ],
      "title": "Indications principales",
      "ancre": "indications"
    }
  },
  {
    "id": "block-cards-precautions",
    "type": "cards",
    "content": {
      "ancre": "precautions",
      "title": "Peeling : contre-indications et complications possibles",
      "subtitle": "Ce que disent les fiches d’information de la Société Française de Dermatologie.",
      "cards": [
        {
          "title": "Contre-indications",
          "description": "Le peeling n’est pas réalisé dans ces cas.",
          "details": [
            "Grossesse et allaitement",
            "Allergie à l''un des actifs",
            "Herpès récidivant : traitement préventif nécessaire"
          ]
        },
        {
          "title": "Complications possibles",
          "description": "Rares, et expliquées en consultation.",
          "details": [
            "Tache plus foncée ou plus claire",
            "Poussée d’herpès, surinfection",
            "Risque pigmentaire accru sur les peaux foncées"
          ]
        }
      ]
    },
    "order": 3
  },
  {
    "id": "block-faq-3",
    "type": "faq",
    "order": 4,
    "content": {
      "title": "Questions fréquentes",
      "subtitle": "Tout ce que vous devez savoir sur les peelings",
      "questions": [
        {
          "answer": "Des picotements ou une sensation de chaleur apparaissent pendant l''application et s''atténuent en quelques minutes. Après un peeling superficiel, la peau tiraille quelques jours ; après un peeling moyen, elle rougit, brunit puis pèle, et l''éviction sociale peut être de 4 à 8 jours.",
          "question": "Le peeling est-il douloureux ?"
        },
        {
          "answer": "Pour un peeling superficiel, une série de 3 à 6 séances espacées d''environ 15 jours ; un peeling moyen ne se répète qu''après plusieurs mois.",
          "question": "Combien de séances sont nécessaires ?"
        },
        {
          "answer": "Une protection solaire stricte (indice SPF 50+) est indispensable après tout peeling. Le moment du traitement se choisit avec la docteure, selon le type de peeling et votre exposition au soleil.",
          "question": "Peut-on faire un peeling toute l''année ?"
        }
      ],
      "ancre": "faq"
    }
  },
  {
    "id": "block-cta-4",
    "type": "cta",
    "order": 5,
    "content": {
      "title": "Consultation avec Docteure Fassotte",
      "description": "Pour déterminer le peeling le plus adapté à votre type de peau et vos objectifs esthétiques. Analyse personnalisée et proposition de protocole sur mesure pour des résultats optimaux en toute sécurité.",
      "primaryButton": {
        "link": "/contact",
        "text": "Prendre rendez-vous"
      }
    }
  }
]'::jsonb, updated_at = now() WHERE slug = 'peeling';

UPDATE custom_pages SET content = '[
  {
    "id": "block-hero-0",
    "type": "hero",
    "order": 0,
    "content": {
      "image": "https://hxgfakegwewcfkxvltgl.supabase.co/storage/v1/object/public/media/1771938077781-yio16q.jpg",
      "title": "Mésolift",
      "ctaLink": "/contact",
      "ctaText": "Consultation personnalisée",
      "imageAlt": "Mésolift - Traitement revitalisant pour peau déshydratée et fatiguée",
      "subtitle": "Revitalisez Votre Peau en Profondeur",
      "description": "Le Mésolift est une technique de mésothérapie esthétique qui consiste à injecter de petites quantités de substances revitalisantes (acide hyaluronique non réticulé, vitamines…) dans la peau, sur l''ensemble du visage. L''objectif est un teint plus éclatant et une peau mieux hydratée."
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
          "title": "Injection superficielle",
          "description": "Petites quantités injectées dans la peau, avec des aiguilles fines"
        },
        {
          "title": "Cocktail sur mesure",
          "description": "Acide hyaluronique non réticulé, vitamines ou oligo-éléments selon votre peau"
        },
        {
          "title": "Objectif éclat",
          "description": "Teint plus lumineux et peau mieux hydratée ; l''effet varie selon les personnes"
        }
      ],
      "subtitle": "Mécanisme d''action du Mésolift",
      "ancre": "principe"
    }
  },
  {
    "id": "block-cards-2",
    "type": "cards",
    "order": 2,
    "content": {
      "cards": [
        {
          "title": "Visage",
          "details": [
            "Visage complet : Revitalisation globale",
            "Contour des yeux : Hydratation du regard",
            "Joues et pommettes : Restauration de l''éclat",
            "Front : Amélioration de la texture",
            "Cou et décolleté : Extension du soin anti-âge"
          ]
        },
        {
          "title": "Indications spécifiques",
          "details": [
            "Peau déshydratée et terne",
            "Premiers signes de l''âge (25-45 ans)",
            "Peau fatiguée et stressée",
            "Teint irrégulier",
            "Texture rugueuse",
            "Pores dilatés"
          ]
        }
      ],
      "title": "Zones de traitement"
    }
  },
  {
    "id": "block-features-3",
    "type": "features",
    "order": 3,
    "content": {
      "title": "Avantages du Mésolift",
      "features": [
        {
          "title": "Éclat du teint",
          "description": "Objectif principal du traitement"
        },
        {
          "title": "Sur mesure",
          "description": "Cocktail adapté à votre peau"
        },
        {
          "title": "Reprise rapide",
          "description": "Petites rougeurs ou hématomes possibles quelques jours"
        }
      ]
    }
  },
  {
    "id": "block-cards-precautions",
    "type": "cards",
    "content": {
      "ancre": "precautions",
      "title": "Mésolift : ce que disent les autorités de santé",
      "subtitle": "La mésothérapie esthétique a été évaluée par la Haute Autorité de santé (2014) et l''Inserm (2010).",
      "cards": [
        {
          "title": "Efficacité",
          "description": "Les études disponibles ne suffisent pas à démontrer l''efficacité de la mésothérapie esthétique.",
          "details": [
            "Résultats variables d''une personne à l''autre",
            "Plusieurs séances en général"
          ]
        },
        {
          "title": "Risques",
          "description": "Rares, mais à connaître.",
          "details": [
            "Réactions locales : rougeur, hématome, douleur, démangeaisons",
            "Infections rares, d''où une asepsie rigoureuse",
            "Produits parfois utilisés hors de l''indication de leur autorisation"
          ]
        }
      ]
    },
    "order": 4
  },
  {
    "id": "block-faq-4",
    "type": "faq",
    "order": 5,
    "content": {
      "title": "Questions fréquentes",
      "questions": [
        {
          "answer": "Inconfort minimal grâce aux aiguilles très fines et à l''anesthésie locale. Sensation de légers picotements bien tolérée.",
          "question": "Le Mésolift est-il douloureux ?"
        },
        {
          "answer": "L''effet recherché est un teint plus lumineux ; il varie d''une personne à l''autre et plusieurs séances sont en général proposées.",
          "question": "Quand voit-on les premiers résultats ?"
        },
        {
          "answer": "Le traitement se fait en plusieurs séances ; leur nombre et leur rythme sont définis en consultation, selon votre peau et vos attentes.",
          "question": "Combien de séances sont nécessaires ?"
        }
      ],
      "ancre": "faq"
    }
  },
  {
    "id": "block-cta-5",
    "type": "cta",
    "order": 6,
    "content": {
      "title": "Consultation avec Docteure Fassotte",
      "description": "Pour découvrir comment le Mésolift peut revitaliser votre peau et lui redonner tout son éclat. Analyse personnalisée et composition d''un cocktail sur mesure pour des résultats optimaux.",
      "primaryButton": {
        "link": "/contact",
        "text": "Prendre rendez-vous"
      }
    }
  }
]'::jsonb, updated_at = now() WHERE slug = 'mesolift';

UPDATE custom_pages SET content = '[
  {
    "id": "block-hero-0",
    "type": "hero",
    "order": 0,
    "content": {
      "image": "https://hxgfakegwewcfkxvltgl.supabase.co/storage/v1/object/public/media/1771937869075-5o7i96.jpeg",
      "title": "Fils Tenseurs à Cônes Bidirectionnels",
      "ctaLink": "/contact",
      "ctaText": "Consultation personnalisée",
      "imageAlt": "Fils tenseurs à cônes - Lifting non chirurgical avec vecteurs de traction",
      "subtitle": "Lifting Non Chirurgical Innovant",
      "description": "Les fils tenseurs à cônes bidirectionnels sont une technique de lifting non chirurgical. Ces fils résorbables, placés sous la peau, portent de petits cônes qui s''ancrent dans les tissus et permettent de les repositionner."
    }
  },
  {
    "id": "block-features-1",
    "type": "features",
    "order": 1,
    "content": {
      "title": "Technologie des cônes bidirectionnels",
      "features": [
        {
          "title": "Ancrage multidirectionnel",
          "description": "Cônes bidirectionnels intégrés pour un ancrage optimal dans les tissus"
        },
        {
          "title": "Traction optimisée",
          "description": "Traction selon deux vecteurs opposés pour repositionner les tissus"
        },
        {
          "title": "Fils résorbables",
          "description": "Les fils se résorbent progressivement dans l''organisme"
        }
      ],
      "ancre": "principe"
    }
  },
  {
    "id": "block-cards-2",
    "type": "cards",
    "order": 2,
    "content": {
      "cards": [
        {
          "title": "Tiers supérieur du visage",
          "details": [
            "Lifting des sourcils et ouverture du regard",
            "Correction des tempes creusées",
            "Redéfinition de l''arcade sourcilière"
          ]
        },
        {
          "title": "Tiers moyen du visage",
          "details": [
            "Remontée des pommettes (lifting malaire)",
            "Correction des sillons naso-géniens",
            "Restauration du volume jugal",
            "Amélioration de l''ovale"
          ]
        },
        {
          "title": "Tiers inférieur du visage",
          "details": [
            "Redéfinition de la mâchoire (jawline)",
            "Lifting cervical (cou)",
            "Correction des bajoues",
            "Amélioration du double menton"
          ]
        }
      ],
      "title": "Zones de traitement"
    }
  },
  {
    "id": "block-features-3",
    "type": "features",
    "order": 3,
    "content": {
      "title": "Avantages des fils à cônes bidirectionnels",
      "features": [
        {
          "title": "Sans chirurgie",
          "description": "Sous anesthésie locale, sans cicatrice"
        },
        {
          "title": "Effet immédiat",
          "description": "Soutien des tissus visible dès la séance"
        },
        {
          "title": "Résorbables",
          "description": "Les fils disparaissent progressivement"
        }
      ]
    }
  },
  {
    "id": "block-cards-precautions",
    "type": "cards",
    "content": {
      "ancre": "precautions",
      "title": "Fils tenseurs : complications possibles",
      "subtitle": "Ce que rapportent les publications médicales.",
      "cards": [
        {
          "title": "Fréquentes, en général passagères",
          "description": "Dans les premières semaines.",
          "details": [
            "Gonflement, bleus, rougeur",
            "Petites fossettes ou irrégularités de la peau",
            "Gêne ou douleur au toucher"
          ]
        },
        {
          "title": "Plus rares",
          "description": "Expliquées en consultation.",
          "details": [
            "Fil visible, palpable ou qui se déplace",
            "Infection, parfois nécessitant de retirer le fil",
            "Asymétrie"
          ]
        }
      ]
    },
    "order": 4
  },
  {
    "id": "block-faq-4",
    "type": "faq",
    "order": 5,
    "content": {
      "title": "Questions fréquentes",
      "questions": [
        {
          "answer": "L''insertion se fait sous anesthésie locale. Une sensibilité, un gonflement ou des bleus sont fréquents les premières semaines ; plus rarement, une gêne persiste plus longtemps.",
          "question": "Le traitement est-il douloureux ?"
        },
        {
          "answer": "L''effet de soutien est visible immédiatement. Dans les études publiées, l''effet lifting mesurable s''atténue en quelques semaines à quelques mois ; la durée varie selon les personnes et se discute en consultation.",
          "question": "Quand voit-on les résultats définitifs ?"
        },
        {
          "answer": "Ils sont placés sous la peau et ne se voient pas en général. On peut les sentir au toucher les premières semaines ; plus rarement, un fil reste visible ou palpable (environ 4 % des cas dans une série publiée).",
          "question": "Les fils sont-ils visibles ou palpables ?"
        }
      ],
      "ancre": "faq"
    }
  },
  {
    "id": "block-cta-5",
    "type": "cta",
    "order": 6,
    "content": {
      "title": "Consultation avec Docteure Fassotte",
      "description": "Pour découvrir si les fils tenseurs à cônes bidirectionnels peuvent répondre à vos objectifs de rajeunissement. Évaluation personnalisée et simulation des résultats possibles.",
      "primaryButton": {
        "link": "/contact",
        "text": "Prendre rendez-vous"
      }
    }
  },
  {
    "id": "block-gallery-6",
    "type": "gallery",
    "order": 7,
    "content": {
      "title": "Galerie Photos",
      "images": [
        {
          "alt": "",
          "src": "",
          "caption": ""
        }
      ]
    }
  }
]'::jsonb, updated_at = now() WHERE slug = 'fils-tenseurs';

UPDATE custom_pages SET content = '[
  {
    "id": "block-hero-0",
    "type": "hero",
    "order": 0,
    "content": {
      "image": "https://hxgfakegwewcfkxvltgl.supabase.co/storage/v1/object/public/media/1771947129554-8n7lyf.jpeg",
      "title": "Cosmétologie Médicale",
      "ctaLink": "/contact",
      "ctaText": "Consultation personnalisée",
      "imageAlt": "Cosmétologie médicale",
      "subtitle": "Optimisez Votre Routine de Soins",
      "description": "La cosmétologie médicale associe un regard médical et des soins cosmétiques choisis pour votre peau. La Dre Fassotte analyse les besoins de votre peau et vous propose une routine de soins personnalisée."
    }
  },
  {
    "id": "block-features-1",
    "type": "features",
    "order": 1,
    "content": {
      "title": "Domaines d''expertise",
      "features": [
        {
          "title": "Anti-âge et prévention",
          "description": "Protocoles préventifs, soins anti-rides, stimulation du collagène"
        },
        {
          "title": "Correction des imperfections",
          "description": "Traitement de l''acné, atténuation des taches, réduction des pores"
        },
        {
          "title": "Hydratation et nutrition",
          "description": "Restauration de la barrière cutanée, hydratation profonde"
        }
      ]
    }
  },
  {
    "id": "block-cards-2",
    "type": "cards",
    "order": 2,
    "content": {
      "cards": [
        {
          "title": "20-30 ans : Prévention",
          "details": [
            "Protection solaire quotidienne",
            "Hydratation adaptée",
            "Prévention du photovieillissement",
            "Traitement de l''acné si nécessaire"
          ]
        },
        {
          "title": "30-45 ans : Correction précoce",
          "details": [
            "Correction des premiers signes",
            "Stimulation du collagène",
            "Amélioration de la texture",
            "Prévention accentuée"
          ]
        },
        {
          "title": "45+ ans : Réparation intensive",
          "details": [
            "Correction des signes installés",
            "Nutrition intensive",
            "Fermeté et élasticité",
            "Éclat du teint"
          ]
        }
      ],
      "title": "Protocoles selon l''âge"
    }
  },
  {
    "id": "block-features-3",
    "type": "features",
    "order": 3,
    "content": {
      "title": "Avantages de la cosmétologie médicale",
      "features": [
        {
          "title": "Approche scientifique",
          "description": "Analyse précise des besoins"
        },
        {
          "title": "Actifs choisis",
          "description": "Selon votre type de peau et vos objectifs"
        },
        {
          "title": "Personnalisation complète",
          "description": "Protocole unique à chaque patient"
        },
        {
          "title": "Suivi médical",
          "description": "Ajustements selon l''évolution"
        }
      ]
    }
  },
  {
    "id": "block-faq-4",
    "type": "faq",
    "order": 4,
    "content": {
      "title": "Questions fréquentes",
      "questions": [
        {
          "answer": "Ce sont aussi des cosmétiques : le terme « cosméceutique » n''a pas de définition légale. La différence tient au choix des actifs, adaptés à votre peau par un médecin. Leurs effets sont réels mais modestes : une crème ne remplace pas un traitement médical. La protection solaire quotidienne reste le soin anti-âge le plus efficace.",
          "question": "Quelle différence avec les cosmétiques classiques ?"
        },
        {
          "answer": "Au moins 6 semaines, parfois jusqu’à 3 mois, selon le soin et la problématique.",
          "question": "Combien de temps pour voir des résultats ?"
        },
        {
          "answer": "Absolument, avec des protocoles spécifiques selon l''âge, le type de peau et les besoins individuels.",
          "question": "Les soins sont-ils adaptés à tous les âges ?"
        }
      ],
      "ancre": "faq"
    }
  },
  {
    "id": "block-cta-5",
    "type": "cta",
    "order": 5,
    "content": {
      "title": "Consultation cosmétologique",
      "description": "Pour découvrir les soins adaptés à votre peau et optimiser votre routine. Analyse personnalisée : diagnostic de votre peau et routine de soins sur mesure.",
      "primaryButton": {
        "link": "/contact",
        "text": "Prendre rendez-vous"
      }
    }
  }
]'::jsonb, updated_at = now() WHERE slug = 'cosmetologie';

UPDATE custom_pages SET content = '[
  {
    "id": "block-hero-0",
    "type": "hero",
    "order": 0,
    "content": {
      "image": "https://hxgfakegwewcfkxvltgl.supabase.co/storage/v1/object/public/media/1771948366443-fxls6x.jpeg",
      "title": "Liquid Lift",
      "ctaLink": "/contact",
      "ctaText": "Consultation personnalisée",
      "imageAlt": "Liquid Lift",
      "subtitle": "Rajeunissement Global par Injections Stratégiques",
      "description": "Le Liquid Lift est une approche globale du visage : des injections d''acide hyaluronique, placées en profondeur à des points précis, restaurent les volumes et redonnent du soutien aux tissus, sans chirurgie."
    }
  },
  {
    "id": "block-features-1",
    "type": "features",
    "order": 1,
    "content": {
      "title": "Qu''est-ce que le Liquid Lift ?",
      "features": [
        {
          "title": "Approche vectorielle",
          "description": "Analyse 3D de la structure faciale et identification des vecteurs de lifting naturels"
        },
        {
          "title": "Technique innovante",
          "description": "Injections profondes aux points d''ancrage anatomiques pour repositionner les tissus"
        },
        {
          "title": "Résultats immédiats",
          "description": "Effet lifting immédiat et durable avec création de points de soutien naturels"
        }
      ],
      "subtitle": "Technique innovante de rajeunissement facial"
    }
  },
  {
    "id": "block-cards-2",
    "type": "cards",
    "order": 2,
    "content": {
      "cards": [
        {
          "title": "Architecture du visage",
          "details": [
            "Tempes : Restauration des volumes perdus",
            "Pommettes : Remontée et redéfinition malaire",
            "Menton : Projection et harmonisation du profil",
            "Mâchoire : Redéfinition de la jawline",
            "Angle mandibulaire : Restructuration de l''ovale"
          ]
        },
        {
          "title": "Points de tension stratégiques",
          "details": [
            "Lifting des joues par traction vectorisée",
            "Remontée des commissures labiales",
            "Ouverture du regard par lifting temporal",
            "Correction des bajoues par repositionnement"
          ]
        }
      ],
      "title": "Zones de traitement"
    }
  },
  {
    "id": "block-cards-3",
    "type": "cards",
    "order": 3,
    "content": {
      "cards": [
        {
          "title": "Rajeunissement global",
          "details": [
            "Visage affaissé par la gravité et l''âge",
            "Perte des volumes jeunes du visage",
            "Relâchement des tissus modéré"
          ]
        },
        {
          "title": "Restructuration faciale",
          "details": [
            "Restauration de l''ovale du visage",
            "Redéfinition des contours perdus",
            "Amélioration du profil en vue de côté"
          ]
        },
        {
          "title": "Harmonisation esthétique",
          "details": [
            "Équilibrage des volumes faciaux",
            "Sublimation des traits existants"
          ]
        }
      ],
      "title": "Indications principales"
    }
  },
  {
    "id": "block-features-4",
    "type": "features",
    "order": 4,
    "content": {
      "title": "Avantages du Liquid Lift",
      "features": [
        {
          "title": "Effet lifting immédiat",
          "description": "Sans chirurgie"
        },
        {
          "title": "Approche globale",
          "description": "Vision d''ensemble du visage"
        },
        {
          "title": "Résultats naturels",
          "description": "Respect de votre identité"
        },
        {
          "title": "Durabilité optimale",
          "description": "12 à 18 mois environ, selon la zone"
        },
        {
          "title": "Reprise rapide",
          "description": "Gonflements et bleus possibles jusqu’à deux semaines"
        }
      ],
      "ancre": "avantages"
    }
  },
  {
    "id": "block-faq-5",
    "type": "faq",
    "order": 5,
    "content": {
      "title": "Questions fréquentes",
      "questions": [
        {
          "answer": "L''inconfort pendant l''injection est limité par l''anesthésie. Sensibilité, gonflement ou bleus disparaissent en général en deux semaines, parfois un peu plus.",
          "question": "Le Liquid Lift fait-il mal ?"
        },
        {
          "answer": "Le volume dépend des zones traitées et de votre morphologie ; un traitement global peut nécessiter plusieurs seringues, en une ou plusieurs séances. Il est évalué précisément en consultation.",
          "question": "Combien de seringues sont nécessaires ?"
        },
        {
          "answer": "Parfaitement naturel avec la technique maîtrisée. L''objectif est de restaurer votre architecture faciale jeune, pas de vous transformer.",
          "question": "Le résultat paraît-il naturel ?"
        },
        {
          "question": "Y a-t-il des risques ?",
          "answer": "Les effets les plus fréquents sont un gonflement, une sensibilité ou des bleus. Des complications rares mais graves existent si le produit pénètre dans un vaisseau sanguin ; c''est pourquoi l''injection est réalisée par un médecin. L''acide hyaluronique peut être dissous par une enzyme, la hyaluronidase, en cas de besoin."
        }
      ],
      "ancre": "faq"
    }
  },
  {
    "id": "block-cta-6",
    "type": "cta",
    "order": 6,
    "content": {
      "title": "Consultation avec Docteure Fassotte",
      "description": "Pour découvrir si le Liquid Lift peut répondre à vos objectifs de rajeunissement global. Évaluation personnalisée : Analyse morphologique complète et simulation des résultats possibles avec la technique du Liquid Lift.",
      "primaryButton": {
        "link": "/contact",
        "text": "Prendre rendez-vous"
      }
    }
  }
]'::jsonb, updated_at = now() WHERE slug = 'liquid-lift';
