import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import LoginForm from './LoginForm';

const Footer: React.FC = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      {showLoginModal && <LoginForm onClose={() => setShowLoginModal(false)} />}
    <footer className="bg-neutral-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                <span className="text-white font-playfair font-bold text-xl">JF</span>
              </div>
              <div>
                <h3 className="font-playfair font-semibold text-lg">
                  Docteure Jocelyne Fassotte
                </h3>
                <p className="text-neutral-400 text-sm">Médecine esthétique</p>
              </div>
            </Link>
            <p className="text-neutral-300 font-inter">
              Révélez votre beauté naturelle avec des traitements personnalisés 
              et des techniques douces pour un rajeunissement harmonieux.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-playfair font-semibold text-lg">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-400" />
                <a
                  href="tel:+32495280976"
                  className="font-inter hover:text-primary-400 transition-colors"
                >
                  +32 495 28 09 76
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-400" />
                <a 
                  href="mailto:doc.jofassotte@proximus.be"
                  className="font-inter hover:text-primary-400 transition-colors"
                >
                  doc.jofassotte@proximus.be
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary-400" />
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Rue+Edouard+Sarlet+31,+4051+Vaux-sous-Chèvremont,+Liège,+Belgique"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-inter hover:text-primary-400 transition-colors"
                >
                  <div>Rue Edouard Sarlet 31</div>
                  <div>4051 Vaux-sous-Chèvremont</div>
                  <div>Liège, Belgique</div>
                </a>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-playfair font-semibold text-lg">Nos services</h4>
            <ul className="space-y-2 font-inter text-neutral-300">
              <li>
                <Link to="/acide-hyaluronique-liege" className="hover:text-primary-400 transition-colors">
                  • Acide hyaluronique
                </Link>
              </li>
              <li>
                <Link to="/botox-liege" className="hover:text-primary-400 transition-colors">
                  • Toxine botulique
                </Link>
              </li>
              <li>
                <Link to="/peeling-liege" className="hover:text-primary-400 transition-colors">
                  • Peelings médicaux
                </Link>
              </li>
              <li>
                <Link to="/mesolift-liege" className="hover:text-primary-400 transition-colors">
                  • Mésolift
                </Link>
              </li>
              <li>
                <Link to="/fils-tenseurs-liege" className="hover:text-primary-400 transition-colors">
                  • Fils tenseurs
                </Link>
              </li>
              <li>
                <Link to="/stimulateurs-collagene-liege" className="hover:text-primary-400 transition-colors">
                  • Stimulateurs de collagène
                </Link>
              </li>
              <li>
                <Link to="/cosmetologie-liege" className="hover:text-primary-400 transition-colors">
                  • Cosmétologie
                </Link>
              </li>
              <li>
                <Link to="/liquid-lift-liege" className="hover:text-primary-400 transition-colors">
                  • Liquid Lift
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-700 mt-8 pt-8 text-center">
          <p className="text-neutral-400 font-inter text-sm mb-4">
            © 2025 Docteure Jocelyne Fassotte. Tous droits réservés.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link to="/docteur-jocelyne-fassotte" className="text-neutral-400 hover:text-primary-400 transition-colors">
              À propos
            </Link>
            <Link to="/traitements" className="text-neutral-400 hover:text-primary-400 transition-colors">
              Services
            </Link>
            <Link to="/galerie" className="text-neutral-400 hover:text-primary-400 transition-colors">
              Galerie
            </Link>
            <Link to="/contact" className="text-neutral-400 hover:text-primary-400 transition-colors">
              Contact
            </Link>
            <a href="tel:+32495280976" className="text-neutral-400 hover:text-primary-400 transition-colors">
              Urgences
            </a>
            <a href="mailto:doc.jofassotte@proximus.be" className="text-neutral-400 hover:text-primary-400 transition-colors">
              Email
            </a>
            <Link to="/politique-confidentialite" className="text-neutral-400 hover:text-primary-400 transition-colors">
              Confidentialité
            </Link>
            <button
              onClick={() => setShowLoginModal(true)}
              className="text-neutral-400 hover:text-primary-400 transition-colors"
            >
              Connexion
            </button>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;