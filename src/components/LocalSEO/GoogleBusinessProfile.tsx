import React from 'react';
import { MapPin, Star, Clock, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../../constants/businessInfo';

interface GoogleBusinessProfileProps {
  showReviews?: boolean;
  showMap?: boolean;
  className?: string;
}

const GoogleBusinessProfile: React.FC<GoogleBusinessProfileProps> = ({
  showReviews = true,
  showMap = true,
  className = ''
}) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-primary text-white p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-playfair text-2xl font-bold mb-2">
              {BUSINESS_INFO.name}
            </h3>
            <p className="text-white/90 mb-3">
              {BUSINESS_INFO.doctor.qualification}
            </p>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{BUSINESS_INFO.address.city}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Phone className="w-4 h-4" />
                <span>{BUSINESS_INFO.contact.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Integration */}
      {showMap && (
        <div className="relative h-64 bg-neutral-100">
          <iframe
            src={`https://www.google.com/maps?q=${BUSINESS_INFO.geo.latitude},${BUSINESS_INFO.geo.longitude}&hl=fr&z=15&output=embed`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localisation du cabinet"
          />
        </div>
      )}

      {/* Business Info */}
      <div className="p-6 space-y-4">
        <div>
          <h4 className="font-semibold text-neutral-800 mb-2 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-primary-600" />
            Adresse
          </h4>
          <address className="text-neutral-600 not-italic ml-7">
            {BUSINESS_INFO.address.street}
            <br />
            {BUSINESS_INFO.address.postalCode} {BUSINESS_INFO.address.city}
            <br />
            {BUSINESS_INFO.address.region}, {BUSINESS_INFO.address.country}
          </address>
        </div>

        <div>
          <h4 className="font-semibold text-neutral-800 mb-2 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-primary-600" />
            Horaires
          </h4>
          <div className="text-neutral-600 ml-7 space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Lundi - Vendredi</span>
              <span className="font-medium">Sur rendez-vous</span>
            </div>
            <div className="flex justify-between">
              <span>Samedi - Dimanche</span>
              <span className="text-neutral-400">Fermé</span>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-neutral-200">
          <a
            href={BUSINESS_INFO.geo.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-primary-600 text-white px-4 py-3 rounded-lg font-semibold text-center hover:bg-primary-700 transition-colors"
          >
            Itinéraire
          </a>
          <a
            href={`tel:${BUSINESS_INFO.contact.phoneRaw}`}
            className="flex-1 border-2 border-primary-600 text-primary-600 px-4 py-3 rounded-lg font-semibold text-center hover:bg-primary-50 transition-colors"
          >
            Appeler
          </a>
        </div>

        {/* Google Business Profile Link */}
        <div className="text-center pt-4">
          <p className="text-sm text-neutral-500 mb-2">
            Retrouvez-nous sur Google
          </p>
          <a
            href={`https://www.google.com/search?q=${encodeURIComponent(BUSINESS_INFO.name + ' ' + BUSINESS_INFO.address.city)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
          >
            <span>Voir notre profil Google Business</span>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default GoogleBusinessProfile;
