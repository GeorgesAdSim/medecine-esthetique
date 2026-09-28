import { BUSINESS_INFO } from '../constants/businessInfo';
import { pageParSlug } from '../contenu';

/** Image de partage par défaut : la photo du hero de l'accueil (base publiée). */
const imageAccueil = (): string | undefined => {
  const hero = (pageParSlug('accueil')?.content ?? []).find((b: any) => b?.type === 'hero');
  const src = (hero as any)?.content?.image;
  return typeof src === 'string' && src.startsWith('https://') ? src : undefined;
};

export const SITE = {
  baseUrl: BUSINESS_INFO.website.url,
  imageParDefaut: imageAccueil(),
  typeOgParDefaut: 'website',
  carteTwitter: 'summary_large_image',
  langue: 'fr',
};

/** Mêmes seuils que adsim-seo.config.json (contenu.*), vérifiés par test. */
export const LIMITES = { titreMax: 65, descriptionMin: 100, descriptionMax: 170 };
