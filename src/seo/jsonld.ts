// JSON-LD de chaque page, construit avec les constructeurs du socle.
//
// N'INVENTE RIEN : seuls des faits confirmés et affichés sur le site y figurent.
// Horaires et position (fiche Google Business Profile) confirmés le 28/09/2026.
// Volontairement absents tant qu'ils ne sont pas confirmés (QUESTIONS.md) :
// date de fondation, fourchette de prix.
import * as schema from '@adsim/seo-core/schema';
import { BUSINESS_INFO } from '../constants/businessInfo';
import { NOMS_PILIERS, SOUS_PAGES, estPageTraitement, pageDe, traitementDe } from '../contenu/routes';
import { SITE } from './site';
import { sourcesDe } from '../contenu/sources';

const BASE = SITE.baseUrl;
export const ID_CABINET = `${BASE}/#cabinet`;
export const ID_MEDECIN = `${BASE}/#dre-jocelyne-fassotte`;
const TYPE = 'MedicalClinic';

const adresse = schema.adressePostaleLd({
  rue: BUSINESS_INFO.address.street,
  localite: BUSINESS_INFO.address.city,
  codePostal: BUSINESS_INFO.address.postalCode,
  region: BUSINESS_INFO.address.region,
  codePays: BUSINESS_INFO.address.countryCode,
});

const identite = {
  type: TYPE,
  id: ID_CABINET,
  nom: BUSINESS_INFO.name,
  url: `${BASE}/`,
  telephone: BUSINESS_INFO.contact.phoneRaw,
  adresse,
};

const medecin = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': ID_MEDECIN,
  name: `${BUSINESS_INFO.doctor.title} ${BUSINESS_INFO.doctor.name}`,
  jobTitle: 'Médecin esthétique',
  worksFor: { '@id': ID_CABINET },
  alumniOf: { '@type': 'EducationalOrganization', name: 'Collège International de Médecine Esthétique (CIME), Paris V' },
});

/** Questions d'un bloc FAQ, sous ses deux formes (pages : content.questions ; traitements : data.items). */
function questionsAffichees(blocs: any[] | null | undefined): Array<{ question: string; reponse: string }> {
  const faq = (blocs ?? []).find((b) => b?.type === 'faq');
  const c = faq?.content ?? faq?.data ?? {};
  const liste: any[] = c.questions ?? c.items ?? [];
  return liste
    .filter((q) => typeof q?.question === 'string' && typeof q?.answer === 'string')
    .map((q) => ({ question: q.question, reponse: q.answer }));
}

const ariane = (titre: string, chemin: string) => {
  const fille = SOUS_PAGES[chemin];
  return schema.filAriane([
    { nom: 'Accueil', url: `${BASE}/` },
    { nom: 'Traitements', url: `${BASE}/medecine-esthetique-liege` },
    ...(fille ? [{ nom: NOMS_PILIERS[fille.parent] ?? fille.parent, url: `${BASE}${fille.parent}` }] : []),
    { nom: fille ? fille.nom : titre, url: `${BASE}${chemin}` },
  ]);
};

/** Page de traitement et documents qu'elle cite (src/contenu/sources.ts) — seulement s'il y en a. */
function pageCitations(chemin: string, nom: string): object | null {
  const p = sourcesDe(chemin);
  if (!p?.sources.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    '@id': `${BASE}${chemin}#page`,
    url: `${BASE}${chemin}`,
    name: nom,
    inLanguage: 'fr-BE',
    publisher: { '@id': ID_CABINET },
    citation: p.sources.map((s) => ({ '@type': 'CreativeWork', name: s.titre, url: s.url, publisher: s.editeur })),
  };
}

export function jsonLdDe(chemin: string, titre: string): object[] {
  if (chemin === '/') {
    return [schema.etablissement({ ...identite, image: SITE.imageParDefaut, horaires: schema.horairesLd(BUSINESS_INFO.hours),
      geo: schema.geoLd(BUSINESS_INFO.geo),
      proprietesSupplementaires: { hasMap: BUSINESS_INFO.geo.mapUrl },
    }), medecin()];
  }
  if (chemin === '/docteur-jocelyne-fassotte') {
    return [schema.referenceEtablissement(identite), medecin()];
  }
  if (estPageTraitement(chemin)) {
    const t = traitementDe(chemin);
    const nom = titre.split(' | ')[0];
    return [
      schema.referenceEtablissement(identite),
      schema.service({
        serviceType: nom.replace(/ à Liège$/, ''),
        nom,
        url: `${BASE}${chemin}`,
        fournisseurId: ID_CABINET,
      }),
      ariane(nom.replace(/ à Liège$/, ''), chemin),
      schema.faqPage(questionsAffichees(t?.donnees.content)),
      pageCitations(chemin, nom),
    ].filter(Boolean) as object[];
  }
  const p = pageDe(chemin);
  return [schema.referenceEtablissement(identite), schema.faqPage(questionsAffichees(p?.content))].filter(Boolean) as object[];
}
