export const BUSINESS_INFO = {
  name: 'Cabinet Médical Dre Jocelyne Fassotte',
  legalName: 'Docteure Jocelyne Fassotte - Médecine Esthétique',
  doctor: {
    name: 'Jocelyne Fassotte',
    title: 'Dre',
    fullTitle: 'Docteure',
    qualification: 'Médecin Esthétique Diplômée CIME',
    specialty: 'Médecine Esthétique Non Chirurgicale'
  },
  contact: {
    phone: '+32 495 28 09 76',
    phoneRaw: '+32495280976',
    email: 'doc.jofassotte@proximus.be'
  },
  address: {
    street: 'Rue Edouard Sarlet 31',
    city: 'Vaux-sous-Chèvremont',
    postalCode: '4051',
    region: 'Liège',
    country: 'Belgique',
    countryCode: 'BE',
    full: 'Rue Edouard Sarlet 31, 4051 Vaux-sous-Chèvremont, Liège, Belgique'
  },
  geo: {
    latitude: 50.6183,
    longitude: 5.5967,
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Rue+Edouard+Sarlet+31,+4051+Vaux-sous-Chèvremont,+Liège,+Belgique'
  },
  hours: {
    monday: 'Sur rendez-vous',
    tuesday: 'Sur rendez-vous',
    wednesday: 'Sur rendez-vous',
    thursday: 'Sur rendez-vous',
    friday: 'Sur rendez-vous',
    saturday: 'Fermé',
    sunday: 'Fermé',
    structured: [
      'Mo-Fr 09:00-18:00'
    ]
  },
  social: {
    facebook: '',
    instagram: '',
    linkedin: ''
  },
  seo: {
    foundingDate: '2010',
    priceRange: '€€',
    languages: ['fr', 'fr-BE'],
    areaServed: [
      'Liège',
      'Vaux-sous-Chèvremont',
      'Chaudfontaine',
      'Beyne-Heusay',
      'Fléron',
      'Verviers',
      'Spa',
      'Région Wallonne'
    ],
    serviceArea: {
      radius: 30,
      unit: 'km',
      center: 'Liège'
    }
  },
  website: {
    url: 'https://www.fassotte.be',
    domain: 'fassotte.be'
  },
  description: {
    short: 'Cabinet de médecine esthétique à Liège spécialisé en traitements non chirurgicaux pour un rajeunissement naturel et harmonieux.',
    long: 'Le Cabinet Médical de la Dre Jocelyne Fassotte est situé à Liège et propose une gamme complète de traitements de médecine esthétique non chirurgicale. Diplômée du CIME Paris V, la Dre Fassotte allie expertise médicale et sens artistique pour des résultats naturels et personnalisés.'
  },
  services: [
    {
      name: 'Injection Acide Hyaluronique',
      url: '/acide-hyaluronique-liege',
      description: 'Restauration des volumes et comblement des rides'
    },
    {
      name: 'Injection Toxine Botulique (Botox)',
      url: '/botox-liege',
      description: 'Traitement des rides d\'expression'
    },
    {
      name: 'Stimulateurs de Collagène',
      url: '/stimulateurs-collagene-liege',
      description: 'Stimulation naturelle du collagène'
    },
    {
      name: 'Peeling Médical',
      url: '/peeling-liege',
      description: 'Exfoliation contrôlée pour renouveler la peau'
    },
    {
      name: 'Mésolift',
      url: '/mesolift-liege',
      description: 'Revitalisation de la peau par mésothérapie'
    },
    {
      name: 'Fils Tenseurs',
      url: '/fils-tenseurs-liege',
      description: 'Lifting sans chirurgie'
    },
    {
      name: 'Cosmétologie Médicale',
      url: '/cosmetologie-liege',
      description: 'Conseils personnalisés en soins de la peau'
    },
    {
      name: 'Liquid Lift',
      url: '/liquid-lift-liege',
      description: 'Rajeunissement global par injections'
    }
  ]
} as const;

export type BusinessInfo = typeof BUSINESS_INFO;
