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

export const SOURCES: Readonly<Record<string, SourcesDePage>> = {
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
