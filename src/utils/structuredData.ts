import { BUSINESS_INFO } from '../constants/businessInfo';

export interface StructuredDataProps {
  type: 'organization' | 'localBusiness' | 'medicalBusiness' | 'physician' | 'service' | 'breadcrumb' | 'faq';
  data?: any;
}

export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  '@id': `${BUSINESS_INFO.website.url}#organization`,
  'name': BUSINESS_INFO.legalName,
  'alternateName': BUSINESS_INFO.name,
  'url': BUSINESS_INFO.website.url,
  'logo': `${BUSINESS_INFO.website.url}/logo.png`,
  'image': `${BUSINESS_INFO.website.url}/cabinet.jpg`,
  'description': BUSINESS_INFO.description.long,
  'priceRange': BUSINESS_INFO.seo.priceRange,
  'telephone': BUSINESS_INFO.contact.phone,
  'email': BUSINESS_INFO.contact.email,
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': BUSINESS_INFO.address.street,
    'addressLocality': BUSINESS_INFO.address.city,
    'addressRegion': BUSINESS_INFO.address.region,
    'postalCode': BUSINESS_INFO.address.postalCode,
    'addressCountry': BUSINESS_INFO.address.countryCode
  },
  'geo': {
    '@type': 'GeoCoordinates',
    'latitude': BUSINESS_INFO.geo.latitude,
    'longitude': BUSINESS_INFO.geo.longitude
  },
  'openingHoursSpecification': [
    {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      'opens': '09:00',
      'closes': '18:00'
    }
  ],
  'areaServed': BUSINESS_INFO.seo.areaServed.map(area => ({
    '@type': 'City',
    'name': area
  })),
  'medicalSpecialty': 'Aesthetic Medicine',
  'paymentAccepted': 'Cash, Bank Transfer',
  'currenciesAccepted': 'EUR',
  'founder': {
    '@type': 'Person',
    'name': `${BUSINESS_INFO.doctor.title} ${BUSINESS_INFO.doctor.name}`,
    'jobTitle': BUSINESS_INFO.doctor.qualification
  },
  'foundingDate': BUSINESS_INFO.seo.foundingDate,
  'sameAs': [
    BUSINESS_INFO.social.facebook,
    BUSINESS_INFO.social.instagram,
    BUSINESS_INFO.social.linkedin
  ].filter(Boolean)
});

export const generateLocalBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'MedicalClinic',
  '@id': `${BUSINESS_INFO.website.url}#localbusiness`,
  'name': BUSINESS_INFO.legalName,
  'image': `${BUSINESS_INFO.website.url}/cabinet.jpg`,
  'telephone': BUSINESS_INFO.contact.phone,
  'email': BUSINESS_INFO.contact.email,
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': BUSINESS_INFO.address.street,
    'addressLocality': BUSINESS_INFO.address.city,
    'addressRegion': BUSINESS_INFO.address.region,
    'postalCode': BUSINESS_INFO.address.postalCode,
    'addressCountry': BUSINESS_INFO.address.countryCode
  },
  'geo': {
    '@type': 'GeoCoordinates',
    'latitude': BUSINESS_INFO.geo.latitude,
    'longitude': BUSINESS_INFO.geo.longitude
  },
  'url': BUSINESS_INFO.website.url,
  'priceRange': BUSINESS_INFO.seo.priceRange,
  'openingHours': BUSINESS_INFO.hours.structured,
  'hasMap': BUSINESS_INFO.geo.mapUrl,
  'description': BUSINESS_INFO.description.short
});

export const generatePhysicianSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Physician',
  '@id': `${BUSINESS_INFO.website.url}#physician`,
  'name': `${BUSINESS_INFO.doctor.title} ${BUSINESS_INFO.doctor.name}`,
  'honorificPrefix': BUSINESS_INFO.doctor.title,
  'givenName': BUSINESS_INFO.doctor.name.split(' ')[0],
  'familyName': BUSINESS_INFO.doctor.name.split(' ')[1],
  'jobTitle': BUSINESS_INFO.doctor.qualification,
  'description': `${BUSINESS_INFO.doctor.qualification} spécialisée en ${BUSINESS_INFO.doctor.specialty}`,
  'medicalSpecialty': 'Aesthetic Medicine',
  'worksFor': {
    '@type': 'MedicalClinic',
    'name': BUSINESS_INFO.name,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': BUSINESS_INFO.address.street,
      'addressLocality': BUSINESS_INFO.address.city,
      'addressRegion': BUSINESS_INFO.address.region,
      'postalCode': BUSINESS_INFO.address.postalCode,
      'addressCountry': BUSINESS_INFO.address.countryCode
    }
  },
  'telephone': BUSINESS_INFO.contact.phone,
  'email': BUSINESS_INFO.contact.email,
  'url': BUSINESS_INFO.website.url,
  'alumniOf': {
    '@type': 'EducationalOrganization',
    'name': 'Collège International de Médecine Esthétique (CIME) - Paris V'
  }
});

export const generateServiceSchema = (service: {
  name: string;
  description: string;
  url: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'MedicalProcedure',
  'name': service.name,
  'description': service.description,
  'url': `${BUSINESS_INFO.website.url}${service.url}`,
  'procedureType': 'Aesthetic Medical Procedure',
  'howPerformed': 'Minimally Invasive',
  'provider': {
    '@type': 'Physician',
    'name': `${BUSINESS_INFO.doctor.title} ${BUSINESS_INFO.doctor.name}`,
    'worksFor': {
      '@type': 'MedicalClinic',
      'name': BUSINESS_INFO.name,
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': BUSINESS_INFO.address.city,
        'addressRegion': BUSINESS_INFO.address.region,
        'addressCountry': BUSINESS_INFO.address.countryCode
      }
    }
  },
  'availableService': {
    '@type': 'MedicalTherapy',
    'name': service.name
  }
});

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  'itemListElement': items.map((item, index) => ({
    '@type': 'ListItem',
    'position': index + 1,
    'name': item.name,
    'item': `${BUSINESS_INFO.website.url}${item.url}`
  }))
});

export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': faqs.map(faq => ({
    '@type': 'Question',
    'name': faq.question,
    'acceptedAnswer': {
      '@type': 'Answer',
      'text': faq.answer
    }
  }))
});

export const generateAggregateSchema = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    generateOrganizationSchema(),
    generateLocalBusinessSchema(),
    generatePhysicianSchema()
  ]
});

export const injectStructuredData = (schema: any) => {
  if (typeof window === 'undefined') return;

  const scriptId = 'structured-data';
  let script = document.getElementById(scriptId);

  if (!script) {
    script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(schema);
};
