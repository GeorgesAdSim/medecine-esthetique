// Le contenu publié du site, figé au build par scripts/sync.mjs.
//
// Les pages publiques lisent ICI, de façon synchrone : c'est ce qui permet de
// les pré-rendre (le serveur n'attend aucune requête) et d'afficher au premier
// rendu du navigateur exactement ce qui a été pré-rendu.
//
// L'admin, lui, lit et écrit toujours Supabase. Une modification n'apparaît sur
// le site qu'après « Publier » (nouveau build → nouveau sync).
import contenu from '../../data/contenu.json';

export interface PageContenu {
  id: string;
  slug: string;
  title: string;
  content: any[] | null;
  meta_description?: string | null;
  is_published: boolean;
  updated_at: string;
  [cle: string]: unknown;
}

export interface TraitementContenu {
  id: string;
  slug: string;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  content: any[] | null;
  duration?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  is_active: boolean;
  updated_at: string;
  [cle: string]: unknown;
}

export interface EntreeMenu {
  id: string;
  name: string;
  href: string;
  order_index: number;
  is_visible: boolean;
  parent_id?: string | null;
}

export interface ImageGalerie {
  id: string;
  category: string;
  treatment_name: string;
  image_url: string;
  alt_text: string;
  description?: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface Contenu {
  pages: PageContenu[];
  traitements: TraitementContenu[];
  menu: EntreeMenu[];
  reglages: Array<{ key: string; value: string; updated_at: string }>;
  galerie: ImageGalerie[];
}

import { ALIAS_LIENS } from './alias';

/**
 * Les liens internes saisis dans l'admin vers une ancienne URL (ex. « /contact »)
 * sont réécrits vers l'URL retenue : sans cela, chaque clic passe par une 301.
 * Seules les chaînes ÉGALES à un alias sont touchées, jamais un champ `slug`
 * (les slugs de custom_treatments ressemblent à des chemins).
 */
function reecrireLiens<T>(v: T): T {
  if (typeof v === 'string') return ((ALIAS_LIENS as Record<string, string>)[v] ?? v) as T;
  if (Array.isArray(v)) return v.map(reecrireLiens) as T;
  if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, k === 'slug' ? x : reecrireLiens(x)])) as T;
  return v;
}

export const CONTENU = reecrireLiens(contenu as unknown as Contenu);

export const pageParSlug = (slug: string): PageContenu | undefined =>
  CONTENU.pages.find((p) => p.slug === slug && p.is_published);

export const traitementParSlug = (slug: string): TraitementContenu | undefined =>
  CONTENU.traitements.find((t) => t.slug === slug && t.is_active);

export const menuPrincipal = (): EntreeMenu[] =>
  CONTENU.menu.filter((m) => m.is_visible && !m.parent_id).sort((a, b) => a.order_index - b.order_index);

export const reglages = (): Record<string, string> =>
  Object.fromEntries(CONTENU.reglages.map((r) => [r.key, r.value]));

export const imagesGalerie = (): ImageGalerie[] =>
  CONTENU.galerie
    .filter((i) => i.is_active)
    .sort((a, b) => a.display_order - b.display_order || b.created_at.localeCompare(a.created_at));
