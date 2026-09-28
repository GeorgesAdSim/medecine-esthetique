// LA table des routes publiques, et la résolution d'un chemin vers son contenu.
//
// Unique implémentation, consommée par :
//   - les composants de page (DynamicPage, DynamicTreatmentPage, Home) ;
//   - entry-server.tsx, qui la réexporte pour scripts/routes.mjs (pré-rendu)
//     et scripts/sitemap.mjs.
// Deux listes divergeraient à la première page ajoutée ; celle-ci est la seule.
//
// Les correspondances reprennent À L'IDENTIQUE ce que faisait le site avant le
// pré-rendu (slugMapping de DynamicPage, variantes de DynamicTreatmentPage) :
// ce lot change la manière de servir les pages, pas leur contenu.
import { CONTENU, pageParSlug, traitementParSlug, type PageContenu, type TraitementContenu } from './index';

/** Pages éditoriales : chemin → slug de custom_pages. */
export const PAGES_FIXES: Readonly<Record<string, string>> = {
  '/': 'accueil',
  '/docteur-jocelyne-fassotte': 'a-propos',
  '/medecine-esthetique-liege': 'traitements',
  '/galerie': 'galerie',
  '/prendre-rendez-vous': 'prendre-rendez-vous',
};

/** Pages de traitement liées depuis le site. */
export const CHEMINS_TRAITEMENTS: readonly string[] = [
  '/acide-hyaluronique-liege',
  '/botox-liege',
  '/stimulateurs-collagene-liege',
  '/peeling-liege',
  '/mesolift-liege',
  '/fils-tenseurs-liege',
  '/cosmetologie-liege',
  '/liquid-lift-liege',
];

/**
 * Pages rendues par un composant du code, sans contenu en base, avec la date
 * de leur dernière modification (sitemap) — à mettre à jour avec le fichier.
 */
export const PAGES_CODE: Readonly<Record<string, string>> = {
  '/politique-confidentialite': '2026-09-28',
};

/**
 * Slugs de custom_pages qui ne reçoivent PAS de route /{slug} : soit ils
 * alimentent déjà une route ci-dessus, soit ce sont des doublons hérités
 * (redirigés en 301 dans public/_redirects). Toute AUTRE page publiée dans
 * l'admin devient automatiquement /{slug}.
 */
export const SLUGS_SANS_ROUTE_PROPRE: ReadonlySet<string> = new Set([
  'accueil', 'a-propos', 'traitements', 'galerie', 'prendre-rendez-vous', 'contact',
  'docteur-jocelyne-fassotte', 'medecine-esthetique-liege',
  'acide-hyaluronique', 'botox', 'stimulateur-collagene', 'peeling', 'mesolift',
  'fils-tenseurs', 'cosmetologie', 'liquid-lift',
]);

/** Pages publiées créées dans l'admin, servies à /{slug}. */
export const cheminsPagesLibres = (): string[] =>
  CONTENU.pages
    .filter((p) => p.is_published && !SLUGS_SANS_ROUTE_PROPRE.has(p.slug) && /^[a-z0-9-]+$/.test(p.slug))
    .map((p) => `/${p.slug}`)
    .sort();

/** Toutes les routes à pré-rendre (sans la 404). */
export const routesPubliques = (): string[] => [
  ...Object.keys(PAGES_FIXES),
  ...CHEMINS_TRAITEMENTS,
  ...Object.keys(PAGES_CODE),
  ...cheminsPagesLibres(),
];

/** Chemin normalisé : sans requête, sans ancre, sans slash final. */
export const normaliser = (url: string): string => url.replace(/[?#].*$/, '').replace(/\/+$/, '') || '/';

/** Page éditoriale d'un chemin (fixe ou libre), si elle existe et a des blocs. */
export function pageDe(chemin: string): PageContenu | undefined {
  const slug = PAGES_FIXES[chemin] ?? (cheminsPagesLibres().includes(chemin) ? chemin.slice(1) : undefined);
  const page = slug ? pageParSlug(slug) : undefined;
  return page && Array.isArray(page.content) && page.content.length > 0 ? page : undefined;
}

/**
 * Contenu d'une page de traitement, dans l'ordre historique :
 * 1. custom_treatments dont le slug est le chemin ;
 * 2. custom_pages, slug = chemin sans « / », puis sans le suffixe « -liege ».
 */
export function traitementDe(chemin: string):
  | { source: 'traitement'; donnees: TraitementContenu }
  | { source: 'page'; donnees: PageContenu }
  | undefined {
  const t = traitementParSlug(chemin);
  if (t) return { source: 'traitement', donnees: t };
  const nu = chemin.replace(/^\//, '');
  for (const slug of [nu, nu.replace(/-liege$/, '')]) {
    const p = pageParSlug(slug);
    if (p) return { source: 'page', donnees: p };
  }
  return undefined;
}

/** Date de dernière modification du contenu d'une route (pour le sitemap). */
export function modifieLe(chemin: string): string | undefined {
  if (PAGES_CODE[chemin]) return PAGES_CODE[chemin];
  if (CHEMINS_TRAITEMENTS.includes(chemin)) return traitementDe(chemin)?.donnees.updated_at?.slice(0, 10);
  return pageDe(chemin)?.updated_at?.slice(0, 10);
}

/**
 * Anciennes URL et doublons → URL retenue. Servis en 301 par Netlify
 * (public/_redirects, vérifié égal par test) et, pour les liens internes suivis
 * sans rechargement, redirigés côté navigateur par le routeur.
 */
export const ALIAS: Readonly<Record<string, string>> = {
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
