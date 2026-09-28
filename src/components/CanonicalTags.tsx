import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BUSINESS_INFO } from '../constants/businessInfo';

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
  if (pathname.startsWith('/admin') || pathname === '/setup-admin') return null;
  const href = canonicalFor(pathname);

  return (
    <Helmet>
      <link rel="canonical" href={href} />
      <meta property="og:url" content={href} />
    </Helmet>
  );
};

export default CanonicalTags;
