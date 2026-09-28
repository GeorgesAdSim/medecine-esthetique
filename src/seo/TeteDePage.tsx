import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { TeteSeo } from '@adsim/seo-core/react';
import { descripteurDe } from './pages';

/**
 * Le <head> de la page courante, UNIQUE point d'émission : les composants de
 * page n'écrivent plus de title, meta ni canonical.
 */
const TeteDePage: React.FC = () => {
  const { pathname } = useLocation();
  if (pathname.startsWith('/admin') || pathname === '/setup-admin') return null;
  return <TeteSeo descripteur={descripteurDe(pathname)} Helmet={Helmet} />;
};

export default TeteDePage;
