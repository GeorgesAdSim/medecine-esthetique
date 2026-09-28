import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock } from 'lucide-react';
import { BUSINESS_INFO } from '../constants/businessInfo';
import { communesVoisines, lignesHoraires } from '../contenu/acces';

/**
 * « Où se faire traiter » : adresse, horaires et accès du cabinet, sur chaque page
 * de traitement. C'est le volet local des pages (le cabinet est à Vaux-sous-Chèvremont,
 * commune de Chaudfontaine) — une section par page, pas de page par commune.
 */
const AccesCabinet: React.FC<{ traitement: string }> = ({ traitement }) => {
  const { address, contact, geo } = BUSINESS_INFO;
  return (
    <section id="cabinet" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-playfair text-3xl font-bold text-neutral-800 mb-6">
          {traitement} près de Liège : le cabinet à {address.city} ({address.municipality})
        </h2>
        <p className="font-inter text-lg text-neutral-700 leading-relaxed mb-8">
          Les consultations et les soins ont lieu au cabinet de la Dre Jocelyne Fassotte, à {address.city},
          dans la commune de {address.municipality}, à l'est de Liège. Il est accessible depuis Liège comme depuis{' '}
          {communesVoisines().join(', ').replace(/, ([^,]*)$/, ' et $1')}.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-inter text-neutral-700">
          <div className="flex items-start">
            <MapPin className="w-5 h-5 text-primary-500 mr-3 flex-shrink-0 mt-1" />
            <p>
              {address.street}
              <br />
              {address.postalCode} {address.city}
              <br />
              <a href={geo.mapUrl} className="text-primary-600 underline" rel="noopener">
                Itinéraire (Google Maps)
              </a>
            </p>
          </div>
          <div className="flex items-start">
            <Clock className="w-5 h-5 text-primary-500 mr-3 flex-shrink-0 mt-1" />
            <ul>
              {lignesHoraires().map((l) => (
                <li key={l}>{l}</li>
              ))}
              <li>Sur rendez-vous</li>
            </ul>
          </div>
          <div className="flex items-start">
            <Phone className="w-5 h-5 text-primary-500 mr-3 flex-shrink-0 mt-1" />
            <p>
              <a href={`tel:${contact.phoneRaw}`} className="text-primary-600 underline">
                {contact.phone}
              </a>
              <br />
              <Link to="/prendre-rendez-vous" className="text-primary-600 underline">
                Prendre rendez-vous en ligne
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccesCabinet;
