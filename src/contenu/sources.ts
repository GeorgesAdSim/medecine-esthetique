// Sources externes des pages de traitement — DONNÉE, versionnée dans le dépôt.
//
// Même principe que les pages internationales de Gramme : une affirmation
// factuelle (durée d'effet, contre-indications, effets indésirables, qui peut
// injecter…) ne s'affiche avec une source que si cette source a été OUVERTE et
// LUE à la date indiquée, et qu'elle dit bien ce que la page affirme.
//
// - `sources` : les documents (RCP, agences de santé, sociétés savantes…).
//   Jamais un blog, un concurrent ou une page commerciale.
// - `appuis` : ce que chaque source confirme, rattaché à l'ancre d'une section
//   de la page (champ `ancre` du bloc). La phrase `confirme` est un résumé
//   FIDÈLE de la source, affiché tel quel sous la section.
// - `extrait` : la phrase exacte de la source (preuve, non affichée), pour
//   pouvoir revérifier sans rouvrir le document.
//
// Les tests (tests/sources.test.ts) refusent une source sans URL https, sans date,
// ou un appui dont l'ancre n'existe pas dans la page publiée.

export interface Source {
  id: string;
  /** Titre du document, tel qu'affiché dans la liste des sources. */
  titre: string;
  /** Éditeur ou organisme (ex. « AFMPS / e-compendium.be »). */
  editeur: string;
  url: string;
  /** Date de lecture, AAAA-MM-JJ. */
  consulteLe: string;
}

export interface Appui {
  /** Ancre de la section de la page (champ `ancre` d'un bloc). */
  ancre: string;
  source: string;
  /** Ce que la source confirme, en une phrase (affiché). */
  confirme: string;
  /** Citation exacte de la source (non affichée). */
  extrait: string;
}

export interface SourcesDePage {
  sources: Source[];
  appuis: Appui[];
}

const RCP_VISTABEL: Source = {
  id: 'rcp-vistabel',
  titre: 'Vistabel — Résumé des caractéristiques du produit (notice scientifique)',
  editeur: 'AbbVie, via e-compendium.be',
  url: 'https://www.e-compendium.be/fr/notices/scientifique/522/19098',
  consulteLe: '2026-09-28',
};

const LU = '2026-09-28';
const src = (id: string, titre: string, editeur: string, url: string): Source => ({ id, titre, editeur, url, consulteLe: LU });

const ANSM_COMBLEMENT = src('ansm-comblement', 'Principaux risques associés aux produits injectables de comblement des rides', 'ANSM (Agence nationale de sécurité du médicament, France)', 'https://ansm.sante.fr/page/principaux-risques-associes-aux-produits-injectables-de-comblement-des-rides');
const FDA_FILLERS = src('fda-fillers', 'Dermal Filler Do’s and Don’ts for Wrinkles, Lips and More', 'FDA (États-Unis)', 'https://www.fda.gov/consumers/consumer-updates/dermal-filler-dos-and-donts-wrinkles-lips-and-more');
const HYALURONIDASE = src('revue-hyaluronidase', 'Considerations for Proper Use of Hyaluronidase in the Management of Hyaluronic Acid Fillers (Yi, Wan, Yoon)', 'Plastic and Reconstructive Surgery Global Open, 2025', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11875574/');
const JUVEDERM_ULTRA = src('juvederm-ultra-dfu', 'Juvéderm Ultra XC — Directions for Use', 'Allergan, via FDA', 'https://www.accessdata.fda.gov/cdrh_docs/pdf5/P050047S044d.pdf');
const VOLUMA_SSED = src('voluma-ssed', 'Juvéderm Voluma XC — Summary of Safety and Effectiveness Data', 'FDA', 'https://www.accessdata.fda.gov/cdrh_docs/pdf11/P110033b.pdf');
const VOLBELLA_DFU = src('volbella-dfu', 'Juvéderm Volbella XC — Directions for Use', 'Allergan, via FDA', 'https://www.accessdata.fda.gov/cdrh_docs/pdf11/P110033S053C.pdf');
const SCULPTRA = src('sculptra-patient', 'A Patient’s Guide to Treatment with Sculptra', 'Galderma, via FDA', 'https://www.accessdata.fda.gov/cdrh_docs/pdf3/P030050S039D.pdf');
const RADIESSE = src('radiesse-ifu', 'Radiesse Injectable Implant — Instructions for Use', 'Merz, via FDA', 'https://www.accessdata.fda.gov/cdrh_docs/pdf5/P050052S162D.pdf');
const SFD_PEELING_MOYEN = src('sfd-peeling-moyen', 'Fiche d’information : peelings chimiques « moyens »', 'Société Française de Dermatologie', 'https://www.sfdermato.org/upload/fiche/peeling-moyens-gdec-01591a3ecfc7a48d5f5a8950147f33c8-c5d79bd47e20777e69fee12943ce035e.pdf');
const HAS_MESO = src('has-mesotherapie', 'Évaluation des risques liés aux pratiques de mésothérapie à visée esthétique (juin 2014)', 'Haute Autorité de santé (France)', 'https://www.has-sante.fr/upload/docs/application/pdf/2014-07/rapport_mve_vd_mel.pdf');
const FILS_PDO = src('surowiak-2022', 'Barbed PDO Thread Face Lift: A Case Study of Bacterial Complication (Surowiak)', 'Plastic and Reconstructive Surgery Global Open, 2022', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8901212/');
const AAD_ANTIAGE = src('aad-anti-age', 'How to select anti-aging skin care products', 'American Academy of Dermatology', 'https://www.aad.org/public/everyday-care/skin-care-secrets/anti-aging/selecting-anti-aging-products');
const FDA_COSMECEUTIQUE = src('fda-cosmeceutique', 'Cosmeceutical', 'FDA (États-Unis)', 'https://www.fda.gov/cosmetics/cosmetics-labeling-claims/cosmeceutical');

export const SOURCES: Readonly<Record<string, SourcesDePage>> = {
  '/acide-hyaluronique-liege': {
    sources: [ANSM_COMBLEMENT, FDA_FILLERS, HYALURONIDASE, JUVEDERM_ULTRA, VOLUMA_SSED, VOLBELLA_DFU],
    appuis: [
      { ancre: 'principe', source: 'fda-fillers', confirme: 'Les produits de comblement autorisés sont temporaires : l’organisme les dégrade et les résorbe progressivement.',
        extrait: 'The effects of most FDA-approved dermal fillers are temporary because they are made from materials that the body eventually breaks down and absorbs.' },
      { ancre: 'zones', source: 'juvederm-ultra-dfu', confirme: 'Sillons nasogéniens : amélioration encore observée à 48 semaines (1 an) chez la majorité des patients suivis.',
        extrait: '87% (20/23) at 24 weeks and 78% (7/9) at 48 weeks (1 year).' },
      { ancre: 'zones', source: 'voluma-ssed', confirme: 'Pommettes : effet maintenu chez 85 % des patients à 12 mois et 67 % à 24 mois.',
        extrait: 'The duration of effect was evaluated by responder rate at 6 months to be 86%, at 12 months to be 85%, and at 24 months to be 67%' },
      { ancre: 'zones', source: 'volbella-dfu', confirme: 'Lèvres et cernes : amélioration chez la majorité des patients jusqu’à 1 an.',
        extrait: 'The majority of subjects demonstrating improvement through 1 year' },
      { ancre: 'precautions', source: 'ansm-comblement', confirme: 'Effets immédiats (hématome, rougeur, œdème) d’une durée d’environ 8 jours ; allergie possible parmi les effets retardés ; produits non résorbables déconseillés.',
        extrait: 'Hématome, érythème, œdème — 8 j. […] L’ANSM déconseille aujourd’hui l’utilisation dans une finalité esthétique des produits injectables non résorbables du fait d’un risque non maîtrisé d’effets indésirables graves très retardés.' },
      { ancre: 'precautions', source: 'fda-fillers', confirme: 'Un produit injecté dans un vaisseau sanguin peut provoquer une nécrose de la peau, un AVC ou une cécité.',
        extrait: 'Filler that enters a blood vessel can cause skin necrosis (death of tissue), stroke, or blindness.' },
      { ancre: 'faq', source: 'revue-hyaluronidase', confirme: 'La hyaluronidase est l’enzyme qui dégrade l’acide hyaluronique, utilisée pour corriger un dépôt indésirable.',
        extrait: 'Hyaluronidase is a crucial enzyme involved in the degradation of HA, playing a significant role in the management of unwanted HA deposits.' },
    ],
  },
  '/stimulateurs-collagene-liege': {
    sources: [SCULPTRA, RADIESSE, FDA_FILLERS],
    appuis: [
      { ancre: 'produits', source: 'sculptra-patient', confirme: 'Acide poly-L-lactique : résultats observés jusqu’à 25 mois après la dernière séance ; en général trois séances.',
        extrait: 'treatment results for some subjects lasted for up to 25 months […] one to four treatment sessions (typically three)' },
      { ancre: 'precautions', source: 'sculptra-patient', confirme: 'Nodules possibles dans la zone traitée ; contre-indiqué en cas d’allergie à un composant ou de tendance aux cicatrices chéloïdes.',
        extrait: 'A reported side effect following treatment with SCULPTRA are lumps and bumps (nodules) that appear in the treated area. […] Are allergic to any ingredient of SCULPTRA […] hypertrophic scarring or keloid formation' },
      { ancre: 'precautions', source: 'radiesse-ifu', confirme: 'Hydroxylapatite de calcium : contre-indiquée en cas d’allergies sévères ; risque d’occlusion en cas d’injection dans un vaisseau ; non validée pour les lèvres ; indiquée pour le dos des mains et le décolleté.',
        extrait: 'Introduction of RADIESSE® into the vasculature may lead to embolization, occlusion of the vessels, ischemia, or infarction. […] The safety and effectiveness for use in the lips has not been established.' },
      { ancre: 'precautions', source: 'fda-fillers', confirme: 'Aucun produit de comblement n’est autorisé pour remodeler le corps ; la FDA met en garde contre les injections dans les fesses.',
        extrait: 'The FDA has not approved injectable silicone or any injectable fillers for body contouring or enhancement. The FDA has warned against getting filler injected into the breasts, buttocks, or spaces between the muscles.' },
    ],
  },
  '/peeling-liege': {
    sources: [SFD_PEELING_MOYEN],
    appuis: [
      { ancre: 'faq', source: 'sfd-peeling-moyen', confirme: 'Picotements ou échauffement pendant quelques minutes ; après un peeling moyen, la peau rougit, brunit puis pèle, avec une éviction sociale de 4 à 8 jours.',
        extrait: 'Une sensation de picotements, d’échauffement ou de brûlure apparaît rapidement, dure quelques minutes et s’atténue peu à peu. […] Pour un peeling moyen, l’éviction sociale peut être de 4 à 8 jours.' },
      { ancre: 'precautions', source: 'sfd-peeling-moyen', confirme: 'Pas de peeling pendant la grossesse et l’allaitement ; complications possibles : taches plus foncées ou plus claires, surinfection, poussée d’herpès.',
        extrait: 'Ils ne doivent pas être réalisés pendant la grossesse et l’allaitement. […] Une hyperpigmentation (tache plus foncée) ou une dépigmentation (tache blanche) […] Une surinfection bactérienne (impétigo), ou virale (poussée herpétique).' },
    ],
  },
  '/mesolift-liege': {
    sources: [HAS_MESO],
    appuis: [
      { ancre: 'precautions', source: 'has-mesotherapie', confirme: 'Les données scientifiques ne constituent pas un fondement solide pour la mésothérapie ; risques : réactions locales, infections à mycobactéries atypiques ; produits souvent utilisés hors autorisation de mise sur le marché.',
        extrait: 'les données acquises de la science ne constituent pas actuellement un fondement solide pour la mésothérapie […] réactions locales (érythème, hématomes, douleurs, prurit) […] hors autorisation de mise sur le marché' },
    ],
  },
  '/fils-tenseurs-liege': {
    sources: [FILS_PDO],
    appuis: [
      { ancre: 'precautions', source: 'surowiak-2022', confirme: 'Complications précoces dans 34 % des cas dans les séries publiées (déplacement du fil, rougeur, infection, fossettes) ; fil visible ou palpable dans environ 4 % des cas.',
        extrait: 'The overall complication rate in the early postoperative period was 34% […] thread visibility/palpability (4%)' },
    ],
  },
  '/cosmetologie-liege': {
    sources: [FDA_COSMECEUTIQUE, AAD_ANTIAGE],
    appuis: [
      { ancre: 'faq', source: 'fda-cosmeceutique', confirme: 'Le terme « cosméceutique » n’a pas de définition légale.',
        extrait: 'The term ‘cosmeceutical’ has no meaning under the law.' },
      { ancre: 'faq', source: 'aad-anti-age', confirme: 'Les soins anti-âge donnent des résultats modestes ; la crème solaire et l’hydratant sont les deux produits anti-âge les plus efficaces.',
        extrait: 'anti-aging skin care products deliver modest results […] sunscreen and moisturizer are the two most-effective anti-aging products you can buy.' },
    ],
  },
  '/liquid-lift-liege': {
    sources: [VOLUMA_SSED, FDA_FILLERS],
    appuis: [
      { ancre: 'avantages', source: 'voluma-ssed', confirme: 'Pommettes : effet maintenu chez 85 % des patients à 12 mois et 67 % à 24 mois.',
        extrait: 'The duration of effect was evaluated by responder rate at 6 months to be 86%, at 12 months to be 85%, and at 24 months to be 67%' },
      { ancre: 'faq', source: 'fda-fillers', confirme: 'Un produit injecté dans un vaisseau sanguin peut provoquer une nécrose de la peau, un AVC ou une cécité.',
        extrait: 'Filler that enters a blood vessel can cause skin necrosis (death of tissue), stroke, or blindness.' },
    ],
  },
  '/botox-liege': {
    sources: [RCP_VISTABEL],
    appuis: [
      {
        ancre: 'zones',
        source: 'rcp-vistabel',
        confirme:
          'Indications reconnues : rides du lion (glabellaires), rides de la patte d’oie et rides du front, chez l’adulte.',
        extrait:
          'VISTABEL est indiqué pour l’amélioration temporaire de l’apparence : des rides verticales intersourcilières modérées à sévères, observées lors du froncement maximal (rides glabellaires) et/ou ; des rides canthales latérales (pattes d’oie) modérées à sévères observées au maximum du sourire et/ou ; des rides du front modérées à sévères observées lors de l’élévation maximale des sourcils, lorsque la sévérité des rides du visage entraîne un retentissement psychologique important chez les patients adultes.',
      },
      {
        ancre: 'fonctionnement',
        source: 'rcp-vistabel',
        confirme:
          'L’amélioration s’observe en général dans la semaine qui suit l’injection ; l’effet a été démontré jusqu’à 4 mois.',
        extrait:
          'Une amélioration de la sévérité des rides glabellaires observées lors du froncement maximal s’observe, en général, en une semaine après le traitement. L’effet du traitement a été démontré jusqu’à 4 mois après injection.',
      },
      {
        ancre: 'deroulement',
        source: 'rcp-vistabel',
        confirme:
          'Le traitement doit être administré par un médecin qualifié, expérimenté et disposant du matériel approprié.',
        extrait:
          'Le traitement par VISTABEL doit être administré par des médecins ayant les qualifications adéquates, ayant une bonne expérience du traitement et disposant de matériel approprié.',
      },
      {
        ancre: 'contre-indications',
        source: 'rcp-vistabel',
        confirme:
          'Contre-indications : hypersensibilité à la toxine botulique ou à un excipient, myasthénie grave, syndrome de Lambert-Eaton, infection aux points d’injection. Non recommandé pendant la grossesse, déconseillé pendant l’allaitement ; effet pouvant être renforcé par les aminosides (aminoglycosides). Effets fréquents : maux de tête, chute de la paupière, ecchymose ou œdème au point d’injection.',
        extrait:
          'VISTABEL est contre-indiqué : chez les individus présentant une hypersensibilité connue à la toxine botulinique de type A ou à l’un des excipients du produit ; en cas de myasthénie grave ou de syndrome de Eaton-Lambert ; en cas d’infection aux sites d’injection proposés. — L’utilisation de VISTABEL est déconseillée durant l’allaitement. — En théorie, l’effet de la toxine botulinique peut être potentialisé par les aminoglycosides […]. — Fréquent : céphalées, paresthésies ; ptosis de la paupière ; […] œdème au site d’injection, ecchymose.',
      },
    ],
  },
};

export const sourcesDe = (chemin: string): SourcesDePage | undefined => SOURCES[chemin];

/** Appuis d'une page regroupés par ancre de section. */
export function appuisParAncre(chemin: string): Record<string, Array<Appui & { source: Source }>> {
  const p = SOURCES[chemin];
  if (!p) return {};
  const parId = new Map(p.sources.map((s) => [s.id, s]));
  const r: Record<string, Array<Appui & { source: Source }>> = {};
  for (const a of p.appuis) {
    const s = parId.get(a.source);
    if (s) (r[a.ancre] ??= []).push({ ...a, source: s });
  }
  return r;
}

const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
/** « 2026-09-28 » → « 28 septembre 2026 ». */
export const dateLisible = (iso: string): string => {
  const [a, m, j] = iso.split('-').map(Number);
  return `${j} ${MOIS[m - 1]} ${a}`;
};
