// Le socle est consommé en source JavaScript, sans types : on déclare ce qu'on emploie.
declare module '@adsim/seo-core' {
  export interface Descripteur {
    titre: string;
    canonical: string | null;
    robots: string | null;
    metas: Array<{ nom?: string; propriete?: string; contenu: string }>;
    liens: Array<{ rel: string; href: string; hreflang?: string }>;
    jsonLd: object[];
  }
  export function descripteurDePage(
    site: { baseUrl: string; imageParDefaut?: string; typeOgParDefaut?: string; carteTwitter?: string; langue?: string },
    page: { titre: string; description: string; chemin: string; noindex?: boolean; image?: string; typeOg?: string; jsonLd?: object[] },
  ): Descripteur;
  export const schema: Record<string, (...args: any[]) => any>;
}
declare module '@adsim/seo-core/react' {
  import type { ComponentType, ReactElement } from 'react';
  export function TeteSeo(props: { descripteur: import('@adsim/seo-core').Descripteur; Helmet: ComponentType<any> }): ReactElement;
}
declare module '@adsim/seo-core/schema' {
  export const adressePostaleLd: (adresse: object, o?: { avecRegion?: boolean }) => object;
  export const etablissement: (o: object) => object;
  export const referenceEtablissement: (o: object) => object;
  export const service: (o: object) => object;
  export const horairesLd: (h: { plages: Array<{ jours: string[]; ouverture: string; fermeture: string }> }) => object[] | undefined;
  export const faqPage: (q: Array<{ question: string; reponse: string }>) => object | null;
  export const filAriane: (e: Array<{ nom: string; url: string }>) => object | null;
}
