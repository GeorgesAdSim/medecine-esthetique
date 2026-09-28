import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Page d'erreur. Pré-rendue en dist/404.html, que Netlify sert avec un vrai
 * statut 404 pour toute URL inconnue.
 */
const NotFound: React.FC = () => (
  <>
    <div className="min-h-screen flex items-center justify-center pt-32 pb-16">
      <div className="text-center px-4">
        <h1 className="font-playfair text-4xl font-bold text-neutral-800 mb-4">Page introuvable</h1>
        <p className="font-inter text-neutral-600 mb-8">Cette page n'existe pas ou n'est plus disponible.</p>
        <Link to="/" className="font-inter text-primary-600 underline">Retour à l'accueil</Link>
      </div>
    </div>
  </>
);

export default NotFound;
