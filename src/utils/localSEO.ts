import { BUSINESS_INFO } from '../constants/businessInfo';

export const generateLocalKeywords = (treatmentName: string): string[] => {
  const base = [
    `${treatmentName} Liège`,
    `${treatmentName} ${BUSINESS_INFO.address.city}`,
    `${treatmentName} ${BUSINESS_INFO.address.region}`,
    `médecine esthétique Liège`,
    `cabinet médecine esthétique Liège`
  ];

  return base;
};

export const generateLocationTitle = (pageName: string, includeBrand: boolean = true): string => {
  if (includeBrand) {
    return `${pageName} à Liège - ${BUSINESS_INFO.doctor.title} ${BUSINESS_INFO.doctor.name}`;
  }
  return `${pageName} à Liège`;
};

export const generateLocationDescription = (treatment: string, benefit: string): string => {
  return `${treatment} à Liège par la ${BUSINESS_INFO.doctor.title} ${BUSINESS_INFO.doctor.name}. ${benefit}. Cabinet situé à ${BUSINESS_INFO.address.city}. Consultation sur rendez-vous au ${BUSINESS_INFO.contact.phone}.`;
};

export const generateAreaServedText = (): string => {
  const areas = BUSINESS_INFO.seo.areaServed;
  if (areas.length === 0) return '';
  if (areas.length === 1) return areas[0];
  if (areas.length === 2) return `${areas[0]} et ${areas[1]}`;

  const lastArea = areas[areas.length - 1];
  const otherAreas = areas.slice(0, -1).join(', ');
  return `${otherAreas} et ${lastArea}`;
};

export const generateCitationText = (format: 'full' | 'short' = 'full'): string => {
  if (format === 'short') {
    return `${BUSINESS_INFO.name} - ${BUSINESS_INFO.address.city} - ${BUSINESS_INFO.contact.phone}`;
  }

  return `${BUSINESS_INFO.name}, ${BUSINESS_INFO.address.full}. Tél: ${BUSINESS_INFO.contact.phone}. Email: ${BUSINESS_INFO.contact.email}`;
};

export const getLocalSEOMeta = (pageName: string) => ({
  title: generateLocationTitle(pageName),
  description: generateLocationDescription(
    pageName,
    'Traitements personnalisés pour un rajeunissement naturel'
  ),
  keywords: [
    ...generateLocalKeywords(pageName),
    BUSINESS_INFO.doctor.name,
    'médecin esthétique',
    'CIME',
    ...BUSINESS_INFO.seo.areaServed
  ].join(', '),
  geo: {
    region: `BE-${BUSINESS_INFO.address.region}`,
    placename: BUSINESS_INFO.address.city,
    position: `${BUSINESS_INFO.geo.latitude};${BUSINESS_INFO.geo.longitude}`
  },
  openGraph: {
    locale: 'fr_BE',
    type: 'website',
    siteName: BUSINESS_INFO.name,
    url: BUSINESS_INFO.website.url,
    image: `${BUSINESS_INFO.website.url}/og-image.jpg`
  }
});

export interface LocationContentProps {
  treatmentName: string;
  benefits: string[];
  duration?: string;
}

export const generateLocationContent = ({
  treatmentName,
  benefits,
  duration
}: LocationContentProps): string => {
  const areas = generateAreaServedText();

  let content = `Le cabinet de la ${BUSINESS_INFO.doctor.title} ${BUSINESS_INFO.doctor.name} propose des traitements de ${treatmentName} à ${BUSINESS_INFO.address.city} et dans toute la région de ${BUSINESS_INFO.address.region}.\n\n`;

  content += `Situé à ${BUSINESS_INFO.address.city}, notre cabinet est facilement accessible depuis ${areas}.\n\n`;

  if (benefits.length > 0) {
    content += `Nos traitements de ${treatmentName} offrent de nombreux avantages :\n`;
    benefits.forEach(benefit => {
      content += `• ${benefit}\n`;
    });
    content += '\n';
  }

  if (duration) {
    content += `Durée des résultats : ${duration}\n\n`;
  }

  content += `Pour prendre rendez-vous au cabinet de ${BUSINESS_INFO.address.city}, contactez-nous au ${BUSINESS_INFO.contact.phone} ou par email à ${BUSINESS_INFO.contact.email}.`;

  return content;
};

export const generateNearbyLocations = () => {
  return BUSINESS_INFO.seo.areaServed.map(area => ({
    name: area,
    distance: area === BUSINESS_INFO.address.city ? '0 km' : `${Math.floor(Math.random() * 30) + 5} km`,
    travelTime: area === BUSINESS_INFO.address.city ? 'Sur place' : `${Math.floor(Math.random() * 40) + 10} min`
  }));
};

export const generateDirectionsText = (from: string): string => {
  return `Depuis ${from}, rejoignez ${BUSINESS_INFO.address.city} pour votre consultation au ${BUSINESS_INFO.address.street}. Le cabinet est facilement accessible en voiture et dispose de places de parking à proximité.`;
};

export const generateLocalBusinessHours = () => {
  return {
    weekdays: {
      label: 'Lundi - Vendredi',
      hours: '09:00 - 18:00',
      note: 'Sur rendez-vous uniquement'
    },
    weekend: {
      label: 'Samedi - Dimanche',
      hours: 'Fermé'
    },
    holidays: {
      note: 'Fermé les jours fériés'
    }
  };
};

export const formatPhoneForDisplay = (phone: string = BUSINESS_INFO.contact.phone): string => {
  return phone;
};

export const formatPhoneForTel = (phone: string = BUSINESS_INFO.contact.phoneRaw): string => {
  return phone;
};

export const getGoogleMapsEmbedUrl = (zoom: number = 15): string => {
  return `https://www.google.com/maps?q=${BUSINESS_INFO.geo.latitude},${BUSINESS_INFO.geo.longitude}&hl=fr&z=${zoom}&output=embed`;
};

export const getGoogleMapsDirectionsUrl = (from?: string): string => {
  const destination = encodeURIComponent(BUSINESS_INFO.address.full);
  if (from) {
    const origin = encodeURIComponent(from);
    return `https://www.google.com/maps/dir/${origin}/${destination}`;
  }
  return BUSINESS_INFO.geo.mapUrl;
};

export const getWazeUrl = (): string => {
  return `https://waze.com/ul?ll=${BUSINESS_INFO.geo.latitude},${BUSINESS_INFO.geo.longitude}&navigate=yes`;
};
