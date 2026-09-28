// Lecture du manifeste d'images produit par scripts/images.mjs (fonctions pures, testées).

export type Variante = [largeur: number, url: string];
export interface EntreeImage {
  largeur: number;
  hauteur: number;
  avif: Variante[];
  webp: Variante[];
}
export type Manifeste = Record<string, EntreeImage>;

export interface ImageResolue {
  /** URL de repli pour <img src> : jamais l'original quand une variante existe. */
  src: string;
  largeur?: number;
  hauteur?: number;
  avif?: string;
  webp?: string;
}

const srcset = (v: Variante[]): string => v.map(([l, u]) => `${u} ${l}w`).join(', ');

/**
 * Résout une image du contenu. Absente du manifeste (image externe, build hors
 * ligne) : on garde l'URL d'origine, sans dimensions.
 */
export function resoudre(src: string, manifeste: Manifeste): ImageResolue {
  const e = manifeste[src];
  if (!e || !e.webp.length) return { src };
  // Repli : la variante WebP la plus proche de 800 px (navigateurs sans srcset).
  const repli = e.webp.find(([l]) => l >= 800) ?? e.webp[e.webp.length - 1];
  return {
    src: repli[1],
    largeur: e.largeur,
    hauteur: e.hauteur,
    avif: e.avif.length ? srcset(e.avif) : undefined,
    webp: srcset(e.webp),
  };
}
