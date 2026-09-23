import React, { useState, useEffect } from 'react';
import { X, Cookie, Shield, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà donné son consentement
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('cookieConsent', 'all');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setIsVisible(false);
  };

  const acceptEssential = () => {
    localStorage.setItem('cookieConsent', 'essential');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setIsVisible(false);
  };

  const rejectAll = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-primary-200 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <Cookie className="w-8 h-8 text-primary-600" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <h3 className="font-playfair font-semibold text-lg text-neutral-800">
                Gestion des cookies
              </h3>
              <Shield className="w-5 h-5 text-primary-600 ml-2" />
            </div>
            
            <p className="font-inter text-neutral-700 mb-4 leading-relaxed">
              En tant que cabinet médical, nous utilisons des cookies pour améliorer votre expérience 
              et respecter nos obligations légales. Certains cookies sont essentiels au fonctionnement 
              du site, d'autres nous aident à analyser l'utilisation pour améliorer nos services.
            </p>

            {showDetails && (
              <div className="bg-neutral-50 rounded-lg p-4 mb-4 space-y-3">
                <div>
                  <h4 className="font-inter font-semibold text-neutral-800 mb-2 flex items-center">
                    <Shield className="w-4 h-4 text-green-600 mr-2" />
                    Cookies essentiels (obligatoires)
                  </h4>
                  <p className="font-inter text-sm text-neutral-600">
                    Nécessaires au fonctionnement du site : sécurité, navigation, formulaires de contact, 
                    prise de rendez-vous. Conformément à la loi belge sur les soins de santé.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-inter font-semibold text-neutral-800 mb-2 flex items-center">
                    <Eye className="w-4 h-4 text-blue-600 mr-2" />
                    Cookies d'analyse (optionnels)
                  </h4>
                  <p className="font-inter text-sm text-neutral-600">
                    Nous aident à comprendre comment améliorer notre site et nos services médicaux. 
                    Données anonymisées conformément au RGPD.
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 items-start">
              <button
                onClick={acceptAll}
                className="bg-gradient-primary text-white px-6 py-2 rounded-full font-inter font-semibold hover:shadow-lg transition-all duration-300"
              >
                Accepter tous les cookies
              </button>
              
              <button
                onClick={acceptEssential}
                className="border-2 border-primary-400 text-primary-600 px-6 py-2 rounded-full font-inter font-semibold hover:bg-primary-50 transition-all duration-300"
              >
                Cookies essentiels uniquement
              </button>
              
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-neutral-600 hover:text-primary-600 font-inter text-sm underline transition-colors"
              >
                {showDetails ? 'Masquer les détails' : 'Voir les détails'}
              </button>
              
              <Link
                to="/politique-confidentialite"
                className="text-neutral-600 hover:text-primary-600 font-inter text-sm underline transition-colors"
              >
                Politique de confidentialité
              </Link>
            </div>

            <p className="font-inter text-xs text-neutral-500 mt-3">
              Conformément à la législation belge sur la protection des données et les soins de santé. 
              Vous pouvez modifier vos préférences à tout moment.
            </p>
          </div>

          <button
            onClick={rejectAll}
            className="flex-shrink-0 p-2 text-neutral-400 hover:text-neutral-600 transition-colors"
            title="Refuser tous les cookies optionnels"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;