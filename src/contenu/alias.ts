/**
 * Anciennes URL et doublons → URL retenue. Servis en 301 par Netlify
 * (public/_redirects, vérifié égal par test) et, pour les liens internes suivis
 * sans rechargement, redirigés côté navigateur par le routeur.
 */
export const ALIAS_LIENS: Readonly<Record<string, string>> = {
  '/toxine-botulique-liege': '/botox-liege',
  '/peelings-chimiques-liege': '/peeling-liege',
  '/mesotherapie-liege': '/mesolift-liege',
  '/lifting-fils-tenseurs-liege': '/fils-tenseurs-liege',
  '/cosmetologie-medicale-liege': '/cosmetologie-liege',
  '/rajeunissement-global-liege': '/liquid-lift-liege',
  '/stimulateurs-collagene': '/stimulateurs-collagene-liege',
  '/traitements': '/medecine-esthetique-liege',
  '/services': '/medecine-esthetique-liege',
  '/soins': '/medecine-esthetique-liege',
  '/contact': '/prendre-rendez-vous',
  '/consultation-medecine-esthetique-liege': '/prendre-rendez-vous',
  '/biographie': '/docteur-jocelyne-fassotte',
  '/a-propos': '/docteur-jocelyne-fassotte',
  '/galerie-photos-avant-apres': '/galerie',
  '/resultats-medecine-esthetique': '/galerie',
  '/protection-donnees-medicales': '/politique-confidentialite',
  // Pages de la base qui doublonnent une route existante (servies avant par /:slug)
  '/accueil': '/',
  '/botox': '/botox-liege',
  '/acide-hyaluronique': '/acide-hyaluronique-liege',
  '/stimulateur-collagene': '/stimulateurs-collagene-liege',
  '/peeling': '/peeling-liege',
  '/mesolift': '/mesolift-liege',
  '/fils-tenseurs': '/fils-tenseurs-liege',
  '/cosmetologie': '/cosmetologie-liege',
  '/liquid-lift': '/liquid-lift-liege',
};
