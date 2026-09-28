import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BUSINESS_INFO } from '../constants/businessInfo';
import { normaliser, routesPubliques } from '../contenu/routes';

/**
 * Canonical auto-référent sur chaque page publique.
 *
 * Toujours sur l'origine principale (www), sans slash final ni paramètres,
 * pour que la version sans www et les URL avec ?utm=… pointent vers la même
 * adresse. Les alias sont redirigés en 301 côté Netlify (public/_redirects),
 * ils n'atteignent donc jamais ce composant.
 */
const canonicalFor = (pathname: string): string => {
  const path = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
  return `${BUSINESS_INFO.website.url}${path}`;
};

const CanonicalTags: React.FC = () => {
  const { pathname } = useLocation();
  // Pas de canonical sur la 404, l'admin ou une URL inconnue.
  const chemin = normaliser(pathname);
  if (!routesPubliques().includes(chemin)) return null;
  const href = canonicalFor(chemin);

  return (
    <Helmet>
      <link rel="canonical" href={href} />
      <meta property="og:url" content={href} />
    </Helmet>
  );
};

export default CanonicalTags;
