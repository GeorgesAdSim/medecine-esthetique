interface TreatmentRelation {
  title: string;
  description: string;
  href: string;
  category?: string;
}

export const treatmentRelations: Record<string, TreatmentRelation[]> = {
  'acide-hyaluronique-liege': [
    {
      title: 'Toxine Botulique',
      description: 'Complétez votre traitement avec la toxine botulique pour traiter les rides dynamiques',
      href: '/botox-liege',
      category: 'Injections'
    },
    {
      title: 'Fils Tenseurs',
      description: 'Associez un lifting naturel pour un effet restructurant complet',
      href: '/fils-tenseurs-liege',
      category: 'Lifting'
    },
    {
      title: 'Mésolift',
      description: 'Optimisez vos résultats avec une revitalisation en profondeur',
      href: '/mesolift-liege',
      category: 'Mésothérapie'
    }
  ],
  'botox-liege': [
    {
      title: 'Acide Hyaluronique',
      description: 'Combinez avec un traitement de comblement pour un résultat harmonieux',
      href: '/acide-hyaluronique-liege',
      category: 'Injections'
    },
    {
      title: 'Peeling',
      description: 'Améliorez la texture de votre peau pour des résultats optimaux',
      href: '/peeling-liege',
      category: 'Soins'
    },
    {
      title: 'Liquid Lift',
      description: 'Découvrez notre protocole de rajeunissement global',
      href: '/liquid-lift-liege',
      category: 'Protocole'
    }
  ],
  'fils-tenseurs-liege': [
    {
      title: 'Acide Hyaluronique',
      description: 'Restaurez les volumes perdus en complément du lifting',
      href: '/acide-hyaluronique-liege',
      category: 'Injections'
    },
    {
      title: 'Stimulateurs de Collagène',
      description: 'Renforcez la structure cutanée pour des résultats durables',
      href: '/stimulateurs-collagene-liege',
      category: 'Biostimulation'
    },
    {
      title: 'Toxine Botulique',
      description: 'Détendez les muscles faciaux pour un rajeunissement global',
      href: '/botox-liege',
      category: 'Injections'
    }
  ],
  'liquid-lift-liege': [
    {
      title: 'Acide Hyaluronique',
      description: 'Élément clé du protocole liquid lift pour restaurer les volumes',
      href: '/acide-hyaluronique-liege',
      category: 'Injections'
    },
    {
      title: 'Toxine Botulique',
      description: 'Composante essentielle pour traiter les rides dynamiques',
      href: '/botox-liege',
      category: 'Injections'
    },
    {
      title: 'Stimulateurs de Collagène',
      description: 'Pour un rajeunissement en profondeur et durable',
      href: '/stimulateurs-collagene-liege',
      category: 'Biostimulation'
    }
  ],
  'mesolift-liege': [
    {
      title: 'Peeling',
      description: 'Préparez votre peau avant le mésolift pour de meilleurs résultats',
      href: '/peeling-liege',
      category: 'Soins'
    },
    {
      title: 'Acide Hyaluronique',
      description: 'Combinez revitalisation et comblement pour un effet optimal',
      href: '/acide-hyaluronique-liege',
      category: 'Injections'
    },
    {
      title: 'Cosmétologie',
      description: 'Prolongez les effets avec des soins cosmétologiques adaptés',
      href: '/cosmetologie-liege',
      category: 'Soins'
    }
  ],
  'peeling-liege': [
    {
      title: 'Mésolift',
      description: 'Revitalisez votre peau après le peeling pour un éclat maximal',
      href: '/mesolift-liege',
      category: 'Mésothérapie'
    },
    {
      title: 'Cosmétologie',
      description: 'Entretenez votre peau avec des protocoles de soins personnalisés',
      href: '/cosmetologie-liege',
      category: 'Soins'
    },
    {
      title: 'Toxine Botulique',
      description: 'Associez au peeling pour traiter rides et texture',
      href: '/botox-liege',
      category: 'Injections'
    }
  ],
  'stimulateurs-collagene-liege': [
    {
      title: 'Acide Hyaluronique',
      description: 'Combinez biostimulation et comblement pour des résultats complets',
      href: '/acide-hyaluronique-liege',
      category: 'Injections'
    },
    {
      title: 'Fils Tenseurs',
      description: 'Associez effet liftant immédiat et stimulation du collagène',
      href: '/fils-tenseurs-liege',
      category: 'Lifting'
    },
    {
      title: 'Liquid Lift',
      description: 'Intégrez dans un protocole de rajeunissement global',
      href: '/liquid-lift-liege',
      category: 'Protocole'
    }
  ],
  'cosmetologie-liege': [
    {
      title: 'Mésolift',
      description: 'Revitalisez votre peau en profondeur',
      href: '/mesolift-liege',
      category: 'Mésothérapie'
    },
    {
      title: 'Peeling',
      description: 'Améliorez la texture et la qualité de votre peau',
      href: '/peeling-liege',
      category: 'Soins'
    },
    {
      title: 'Acide Hyaluronique',
      description: 'Restaurez les volumes du visage',
      href: '/acide-hyaluronique-liege',
      category: 'Injections'
    }
  ]
};

export const getTreatmentRelations = (treatmentSlug: string): TreatmentRelation[] => {
  return treatmentRelations[treatmentSlug] || [];
};

export const getAllTreatments = (): Array<{ slug: string; title: string }> => {
  return [
    { slug: 'acide-hyaluronique-liege', title: 'Acide Hyaluronique' },
    { slug: 'botox-liege', title: 'Toxine Botulique' },
    { slug: 'fils-tenseurs-liege', title: 'Fils Tenseurs' },
    { slug: 'liquid-lift-liege', title: 'Liquid Lift' },
    { slug: 'mesolift-liege', title: 'Mésolift' },
    { slug: 'peeling-liege', title: 'Peeling' },
    { slug: 'stimulateurs-collagene-liege', title: 'Stimulateurs de Collagène' },
    { slug: 'cosmetologie-liege', title: 'Cosmétologie' }
  ];
};
