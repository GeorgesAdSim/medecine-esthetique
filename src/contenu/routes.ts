import { ALIAS_LIENS } from './alias';
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
 * Pages filles (une zone ou un problème précis), rattachées à leur page pilier.
 * Structure en silo : l'URL, le fil d'Ariane et le maillage expriment la
 * hiérarchie pilier → fille. Le contenu vit dans custom_pages (slug ci-dessous) ;
 * une page fille n'est servie QUE si ce contenu est publié — le site se
 * construit donc aussi bien avant qu'après l'insertion en base.
 */
export interface SousPage {
  /** Page pilier (une route de CHEMINS_TRAITEMENTS). */
  parent: string;
  /** Slug de la page dans custom_pages. */
  slug: string;
  /** Nom court (fil d'Ariane, titres de liens). */
  nom: string;
  /** Ancre des liens qui pointent vers elle depuis le pilier et les pages sœurs. */
  ancreLien: string;
}
export const SOUS_PAGES: Readonly<Record<string, SousPage>> = {
  '/acide-hyaluronique-liege/levres': {
    parent: '/acide-hyaluronique-liege', slug: 'injection-levres', nom: 'Lèvres',
    ancreLien: 'Injection des lèvres à Liège',
  },
  '/acide-hyaluronique-liege/cernes': {
    parent: '/acide-hyaluronique-liege', slug: 'injection-cernes', nom: 'Cernes',
    ancreLien: 'Injection des cernes à Liège',
  },
  '/botox-liege/rides-du-lion': {
    parent: '/botox-liege', slug: 'rides-du-lion', nom: 'Rides du lion',
    ancreLien: 'Botox des rides du lion à Liège',
  },
};

/** Nom court des pages piliers (fil d'Ariane, titres du maillage). */
export const NOMS_PILIERS: Readonly<Record<string, string>> = {
  '/acide-hyaluronique-liege': 'Acide hyaluronique',
  '/botox-liege': 'Botox',
};

/** Pages filles dont le contenu est publié. */
export const sousPagesPubliees = (): string[] =>
  Object.entries(SOUS_PAGES).filter(([, p]) => (pageParSlug(p.slug)?.content?.length ?? 0) > 0).map(([c]) => c);

/** Pages de traitement servies : les piliers et les pages filles publiées. */
export const cheminsTraitementsPublies = (): string[] => [...CHEMINS_TRAITEMENTS, ...sousPagesPubliees()];
export const estPageTraitement = (chemin: string): boolean => cheminsTraitementsPublies().includes(chemin);

/** Pages filles publiées d'un pilier. */
export const enfantsDe = (pilier: string): string[] => sousPagesPubliees().filter((c) => SOUS_PAGES[c].parent === pilier);

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
  // Contenu des pages filles (servi sous le chemin de leur pilier, SOUS_PAGES).
  'injection-levres', 'injection-cernes', 'rides-du-lion',
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
  ...cheminsTraitementsPublies(),
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
 * Contenu d'une page de traitement :
 * 1. custom_pages (l'éditeur de pages de l'admin, où vit le contenu de six des
 *    huit traitements) : slug = chemin sans « / », sans le suffixe « -liege »,
 *    ou ancien slug redirigé vers ce chemin (ALIAS, ex. « stimulateur-collagene ») ;
 * 2. à défaut, custom_treatments dont le slug est le chemin.
 * Jusqu'au 28/09/2026 l'ordre était inverse : l'acide hyaluronique et les
 * stimulateurs de collagène étaient servis depuis custom_treatments, une version
 * plus ancienne et plus pauvre (blocs « liste » et « protocole » non affichés).
 */
export function traitementDe(chemin: string):
  | { source: 'traitement'; donnees: TraitementContenu }
  | { source: 'page'; donnees: PageContenu }
  | undefined {
  const fille = SOUS_PAGES[chemin];
  if (fille) {
    const p = pageParSlug(fille.slug);
    return p?.content?.length ? { source: 'page', donnees: p } : undefined;
  }
  const nu = chemin.replace(/^\//, '');
  const anciens = Object.entries(ALIAS_LIENS).filter(([, vers]) => vers === chemin).map(([de]) => de.replace(/^\//, ''));
  for (const slug of [nu, nu.replace(/-liege$/, ''), ...anciens]) {
    const p = pageParSlug(slug);
    if (p) return { source: 'page', donnees: p };
  }
  const t = traitementParSlug(chemin);
  if (t) return { source: 'traitement', donnees: t };
  return undefined;
}

/** Date de dernière modification du contenu d'une route (pour le sitemap). */
export function modifieLe(chemin: string): string | undefined {
  if (PAGES_CODE[chemin]) return PAGES_CODE[chemin];
  if (estPageTraitement(chemin)) return traitementDe(chemin)?.donnees.updated_at?.slice(0, 10);
  return pageDe(chemin)?.updated_at?.slice(0, 10);
}

export { ALIAS_LIENS as ALIAS } from './alias';
