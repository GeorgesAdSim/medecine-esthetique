import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { BUSINESS_INFO } from '../../constants/businessInfo';

interface NAPInfoProps {
  variant?: 'full' | 'compact' | 'inline';
  showIcons?: boolean;
  className?: string;
}

const NAPInfo: React.FC<NAPInfoProps> = ({
  variant = 'full',
  showIcons = true,
  className = ''
}) => {
  if (variant === 'inline') {
    return (
      <span className={className} itemScope itemType="https://schema.org/MedicalBusiness">
        <span itemProp="name">{BUSINESS_INFO.name}</span>
        {' - '}
        <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
          <span itemProp="streetAddress">{BUSINESS_INFO.address.street}</span>
          {', '}
          <span itemProp="postalCode">{BUSINESS_INFO.address.postalCode}</span>
          {' '}
          <span itemProp="addressLocality">{BUSINESS_INFO.address.city}</span>
        </span>
        {' - '}
        <span itemProp="telephone">{BUSINESS_INFO.contact.phone}</span>
      </span>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={className} itemScope itemType="https://schema.org/MedicalBusiness">
        <meta itemProp="name" content={BUSINESS_INFO.name} />
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            {showIcons && <Phone className="w-4 h-4 flex-shrink-0" />}
            <a
              href={`tel:${BUSINESS_INFO.contact.phoneRaw}`}
              itemProp="telephone"
              className="hover:underline"
            >
              {BUSINESS_INFO.contact.phone}
            </a>
          </div>
          <div className="flex items-center space-x-2">
            {showIcons && <Mail className="w-4 h-4 flex-shrink-0" />}
            <a
              href={`mailto:${BUSINESS_INFO.contact.email}`}
              itemProp="email"
              className="hover:underline"
            >
              {BUSINESS_INFO.contact.email}
            </a>
          </div>
          <div className="flex items-start space-x-2">
            {showIcons && <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />}
            <address
              itemProp="address"
              itemScope
              itemType="https://schema.org/PostalAddress"
              className="not-italic"
            >
              <span itemProp="streetAddress">{BUSINESS_INFO.address.street}</span>
              <br />
              <span itemProp="postalCode">{BUSINESS_INFO.address.postalCode}</span>
              {' '}
              <span itemProp="addressLocality">{BUSINESS_INFO.address.city}</span>
            </address>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className} itemScope itemType="https://schema.org/MedicalBusiness">
      <meta itemProp="name" content={BUSINESS_INFO.name} />
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          {showIcons && (
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6 text-primary-600" />
            </div>
          )}
          <div>
            <h3 className="font-semibold text-neutral-800 mb-1">Téléphone</h3>
            <a
              href={`tel:${BUSINESS_INFO.contact.phoneRaw}`}
              itemProp="telephone"
              className="text-primary-600 hover:text-primary-700 transition-colors"
            >
              {BUSINESS_INFO.contact.phone}
            </a>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {showIcons && (
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Mail className="w-6 h-6 text-primary-600" />
            </div>
          )}
          <div>
            <h3 className="font-semibold text-neutral-800 mb-1">Email</h3>
            <a
              href={`mailto:${BUSINESS_INFO.contact.email}`}
              itemProp="email"
              className="text-primary-600 hover:text-primary-700 transition-colors"
            >
              {BUSINESS_INFO.contact.email}
            </a>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          {showIcons && (
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-primary-600" />
            </div>
          )}
          <div>
            <h3 className="font-semibold text-neutral-800 mb-1">Adresse</h3>
            <address
              itemProp="address"
              itemScope
              itemType="https://schema.org/PostalAddress"
              className="not-italic text-neutral-600"
            >
              <span itemProp="streetAddress" className="block">{BUSINESS_INFO.address.street}</span>
              <span itemProp="postalCode">{BUSINESS_INFO.address.postalCode}</span>
              {' '}
              <span itemProp="addressLocality">{BUSINESS_INFO.address.city}</span>
              <br />
              <span itemProp="addressRegion">{BUSINESS_INFO.address.region}</span>
              {', '}
              <span itemProp="addressCountry">{BUSINESS_INFO.address.country}</span>
            </address>
            <a
              href={BUSINESS_INFO.geo.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 text-sm mt-2 inline-block"
            >
              Voir sur Google Maps →
            </a>
          </div>
        </div>

        <meta itemProp="geo" content={`${BUSINESS_INFO.geo.latitude};${BUSINESS_INFO.geo.longitude}`} />
      </div>
    </div>
  );
};

export default NAPInfo;
