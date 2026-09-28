// Ce que chaque page émet dans son <head> : titre, description, canonical,
// partage, JSON-LD. Calculé par `descripteurDePage` (@adsim/seo-core), une
// fonction pure — le composant ne fait que le rendre.
//
// Titre et description : ceux saisis dans l'admin (meta_title,
// meta_description) s'ils respectent les longueurs que l'audit exige, sinon
// les valeurs par défaut ci-dessous. L'admin garde donc la main ; il ne peut
// simplement pas publier un titre trop long ou une description trop courte.
//
// Rédaction : informative, sans promesse de résultat (publicité des actes
// esthétiques encadrée — loi du 23 mai 2013).
import { descripteurDePage, type Descripteur } from '@adsim/seo-core';
import { CONTENU } from '../contenu';
import { estPageTraitement, PAGES_CODE, PAGES_FIXES, normaliser, pageDe, routesPubliques, traitementDe } from '../contenu/routes';
import { LIMITES, SITE } from './site';
import { jsonLdDe } from './jsonld';

interface Defaut { titre: string; description: string }

export const DEFAUTS: Readonly<Record<string, Defaut>> = {
  '/': {
    titre: 'Médecine esthétique à Liège | Dre Jocelyne Fassotte',
    description:
      'Cabinet de médecine esthétique non chirurgicale de la Dre Jocelyne Fassotte, diplômée du CIME, à Vaux-sous-Chèvremont (Liège). Consultations sur rendez-vous.',
  },
  '/docteur-jocelyne-fassotte': {
    titre: 'Dre Jocelyne Fassotte, médecin esthétique à Liège',
    description:
      'Parcours et approche de la Dre Jocelyne Fassotte, médecin esthétique diplômée du Collège International de Médecine Esthétique (CIME), installée près de Liège.',
  },
  '/medecine-esthetique-liege': {
    titre: 'Traitements de médecine esthétique à Liège | Dre Fassotte',
    description:
      'Acide hyaluronique, toxine botulique, peelings, mésolift, fils tenseurs, stimulateurs de collagène : les traitements proposés par la Dre Fassotte près de Liège.',
  },
  '/galerie': {
    titre: 'Galerie photos | Dre Jocelyne Fassotte, Liège',
    description:
      'Photos du cabinet et des traitements de médecine esthétique de la Dre Jocelyne Fassotte à Vaux-sous-Chèvremont, près de Liège, présentées par type de soin.',
  },
  '/prendre-rendez-vous': {
    titre: 'Prendre rendez-vous | Dre Jocelyne Fassotte, Liège',
    description:
      'Prendre rendez-vous pour une consultation de médecine esthétique avec la Dre Jocelyne Fassotte : adresse du cabinet à Vaux-sous-Chèvremont, téléphone et plan d’accès.',
  },
  '/acide-hyaluronique-liege': {
    titre: 'Acide hyaluronique à Liège | Dre Jocelyne Fassotte',
    description:
      'Injections d’acide hyaluronique à Liège par la Dre Jocelyne Fassotte : déroulement de la séance, zones traitées, durée des effets et réponses aux questions fréquentes.',
  },
  '/botox-liege': {
    titre: 'Botox à Liège | Toxine botulique par la Dre Fassotte',
    description:
      'Botox à Liège par la Dre Jocelyne Fassotte, médecin esthétique : rides du lion, front et pattes d’oie, déroulement, contre-indications et questions fréquentes.',
  },
  '/acide-hyaluronique-liege/levres': {
    titre: 'Injection des lèvres à Liège | Dre Jocelyne Fassotte',
    description:
      'Injection des lèvres à l’acide hyaluronique à Liège par la Dre Fassotte : volume, contour, ridules, déroulement, durée, effets possibles et questions fréquentes.',
  },
  '/acide-hyaluronique-liege/cernes': {
    titre: 'Injection des cernes à Liège | Dre Jocelyne Fassotte',
    description:
      'Cernes creusés : injection d’acide hyaluronique à Liège par la Dre Fassotte. Pour qui, déroulement, durée des résultats, effets possibles et précautions.',
  },
  '/botox-liege/rides-du-lion': {
    titre: 'Rides du lion : Botox à Liège | Dre Jocelyne Fassotte',
    description:
      'Rides du lion à Liège : toxine botulique par la Dre Fassotte. Pourquoi elles se creusent, déroulement, délai d’effet, durée, contre-indications et FAQ.',
  },
  '/acide-hyaluronique-liege/sillons-nasogeniens': {
    titre: 'Sillons nasogéniens : injection à Liège | Dre Fassotte',
    description:
      'Sillons nasogéniens marqués : injection d’acide hyaluronique à Liège par la Dre Fassotte. Pourquoi ils se creusent, déroulement, durée, effets possibles.',
  },
  '/botox-liege/pattes-d-oie': {
    titre: 'Pattes d’oie : Botox à Liège | Dre Jocelyne Fassotte',
    description:
      'Pattes d’oie à Liège : toxine botulique par la Dre Fassotte. Pourquoi elles se marquent, déroulement, délai d’effet, durée, contre-indications et FAQ.',
  },
  '/botox-liege/rides-du-front': {
    titre: 'Rides du front : Botox à Liège | Dre Jocelyne Fassotte',
    description:
      'Rides du front à Liège : toxine botulique par la Dre Fassotte. Pourquoi elles apparaissent, déroulement, délai d’effet, durée, effets possibles et FAQ.',
  },
  '/stimulateurs-collagene-liege': {
    titre: 'Stimulateurs de collagène à Liège | Dre Fassotte',
    description:
      'Stimulateurs de collagène à Liège, par la Dre Jocelyne Fassotte : principe du traitement, déroulement des séances, délais et réponses aux questions fréquentes.',
  },
  '/peeling-liege': {
    titre: 'Peeling médical à Liège | Dre Jocelyne Fassotte',
    description:
      'Peelings chimiques médicaux à Liège par la Dre Jocelyne Fassotte : types de peelings, indications, déroulement, suites et questions fréquentes avant le soin.',
  },
  '/mesolift-liege': {
    titre: 'Mésolift à Liège | Dre Jocelyne Fassotte',
    description:
      'Mésolift (mésothérapie esthétique) à Liège par la Dre Jocelyne Fassotte : principe, produits injectés, déroulement des séances et réponses aux questions fréquentes.',
  },
  '/fils-tenseurs-liege': {
    titre: 'Fils tenseurs à Liège | Dre Jocelyne Fassotte',
    description:
      'Fils tenseurs résorbables à Liège par la Dre Jocelyne Fassotte : principe du lifting non chirurgical, déroulement, suites et réponses aux questions fréquentes.',
  },
  '/cosmetologie-liege': {
    titre: 'Cosmétologie médicale à Liège | Dre Jocelyne Fassotte',
    description:
      'Cosmétologie médicale à Liège avec la Dre Jocelyne Fassotte : analyse de la peau, conseils et soins adaptés, et réponses aux questions fréquentes.',
  },
  '/liquid-lift-liege': {
    titre: 'Liquid lift à Liège | Dre Jocelyne Fassotte',
    description:
      'Liquid lift à Liège par la Dre Jocelyne Fassotte : principe des injections d’acide hyaluronique pour un rajeunissement global, déroulement et questions fréquentes.',
  },
  '/politique-confidentialite': {
    titre: 'Politique de confidentialité | Dre Jocelyne Fassotte',
    description:
      'Politique de confidentialité du site de la Dre Jocelyne Fassotte : données collectées, finalités, durée de conservation, cookies et exercice de vos droits.',
  },
};

const titreValide = (t?: string | null): t is string => !!t && t.length <= LIMITES.titreMax;
const descriptionValide = (d?: string | null): d is string =>
  !!d && d.length >= LIMITES.descriptionMin && d.length <= LIMITES.descriptionMax;

/** Ce qu'a saisi l'admin pour la route, s'il y a quelque chose. */
function saisieAdmin(chemin: string): { titre?: string | null; description?: string | null } {
  if (estPageTraitement(chemin)) {
    const t = traitementDe(chemin);
    if (!t) return {};
    const d = t.donnees as { meta_title?: string | null; meta_description?: string | null };
    return { titre: d.meta_title, description: d.meta_description };
  }
  const p = pageDe(chemin) as { meta_title?: string | null; meta_description?: string | null; title?: string } | undefined;
  return p ? { titre: p.meta_title, description: p.meta_description } : {};
}

/** Titre de repli pour une page libre créée dans l'admin, sans défaut rédigé. */
const titreLibre = (chemin: string) => {
  const p = pageDe(chemin);
  const t = `${p?.title ?? chemin.slice(1)} | Dre Jocelyne Fassotte`;
  return t.length <= LIMITES.titreMax ? t : (p?.title ?? chemin.slice(1)).slice(0, LIMITES.titreMax);
};

export function descripteurDe(url: string): Descripteur {
  const chemin = normaliser(url);
  if (!routesPubliques().includes(chemin)) {
    return descripteurDePage(SITE, {
      titre: 'Page introuvable | Dre Jocelyne Fassotte',
      description: 'Cette page n’existe pas ou n’est plus disponible. Retrouvez les traitements de médecine esthétique de la Dre Jocelyne Fassotte depuis l’accueil.',
      chemin,
      noindex: true,
    });
  }
  const admin = saisieAdmin(chemin);
  const defaut = DEFAUTS[chemin];
  const titre = titreValide(admin.titre) ? admin.titre : defaut?.titre ?? titreLibre(chemin);
  const description = descriptionValide(admin.description) ? admin.description : defaut?.description ?? admin.description ?? '';
  return descripteurDePage(SITE, { titre, description, chemin, jsonLd: jsonLdDe(chemin, titre) });
}

// Référencés pour que l'arbre de dépendances reste explicite.
void PAGES_FIXES; void PAGES_CODE; void CONTENU;
