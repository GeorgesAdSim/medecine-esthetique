// Encadré « En bref » en tête de chaque page de traitement : l'essentiel en
// quelques lignes, repris tel quel par les moteurs et les assistants IA.
//
// N'INVENTE RIEN : chaque valeur reprend un fait déjà affiché ET sourcé sur la
// page (src/contenu/sources.ts) ou une donnée du cabinet (BUSINESS_INFO). Pas de
// prix tant que les honoraires ne sont pas confirmés (QUESTIONS.md).

export type LigneEnBref = [libelle: string, valeur: string];

const PAR_QUI = 'La Dre Jocelyne Fassotte, médecin esthétique, au cabinet de Vaux-sous-Chèvremont (Chaudfontaine)';
const TOXINE_CI = 'Grossesse et allaitement, myasthénie, syndrome de Lambert-Eaton, infection de la zone, allergie au produit';
const AH_CI = 'Allergie connue au produit ou à la lidocaïne, infection de la zone, grossesse et allaitement';

const toxine = (zone: string, points: string): LigneEnBref[] => [
  ['Traitement', `Toxine botulique ${zone}, injectée par un médecin`],
  ['Séance', `Quelques minutes, ${points}`],
  ['Résultat', 'Visible en général dans la semaine'],
  ['Durée de l’effet', 'Jusqu’à environ 4 mois ; renouvellement pas avant trois mois'],
  ['Suites', 'Reprise immédiate ; éviter sport intense et position couchée pendant 4 heures'],
  ['Contre-indications', TOXINE_CI],
  ['Par qui', PAR_QUI],
];

const acide = (zone: string, duree: string, suites: string): LigneEnBref[] => [
  ['Traitement', `Acide hyaluronique résorbable ${zone}, avec lidocaïne`],
  ['Résultat', 'Visible dès la séance'],
  ['Durée', duree],
  ['Suites', suites],
  ['Réversible', 'Oui, par une enzyme (hyaluronidase) si nécessaire'],
  ['Contre-indications', AH_CI],
  ['Par qui', PAR_QUI],
];

export const EN_BREF: Readonly<Record<string, LigneEnBref[]>> = {
  '/botox-liege': toxine('(Botox, Vistabel)', 'avec des aiguilles très fines'),
  '/botox-liege/rides-du-lion': toxine('entre les sourcils', 'cinq points d’injection prévus par la notice'),
  '/botox-liege/pattes-d-oie': toxine('au coin des yeux', 'trois points de chaque côté prévus par la notice'),
  '/botox-liege/rides-du-front': toxine('sur le front', 'cinq points d’injection prévus par la notice'),
  '/acide-hyaluronique-liege': acide('', 'Environ 1 an pour les rides, les lèvres et les cernes ; jusqu’à 2 ans pour les pommettes', 'Rougeur, gonflement ou bleus pendant une à deux semaines ; éviter sport, soleil et chaleur 24 heures'),
  '/acide-hyaluronique-liege/levres': acide('pour les lèvres', 'Jusqu’à environ 1 an', 'Gonflement fréquent, parfois deux à quatre semaines ; anesthésie locale systématique'),
  '/acide-hyaluronique-liege/cernes': acide('sous les yeux', 'Jusqu’à environ 1 an', 'Sensibilité, bleus ou gonflement, en général une à deux semaines'),
  '/acide-hyaluronique-liege/sillons-nasogeniens': acide('dans les sillons', 'Environ 1 an', 'Rougeur, gonflement ou bleus, en général une semaine'),
  '/stimulateurs-collagene-liege': [
    ['Traitement', 'Acide poly-L-lactique (Sculptra) ou hydroxylapatite de calcium (Radiesse)'],
    ['Séances', 'En général trois pour l’acide poly-L-lactique'],
    ['Résultat', 'Progressif, en quelques semaines'],
    ['Durée', 'De 12-18 mois (hydroxylapatite) à environ 2 ans (poly-L-lactique)'],
    ['Suites', 'Gonflement, rougeur ou bleus ; petits nodules possibles, parfois tardifs'],
    ['Contre-indications', 'Allergie à un composant, tendance aux cicatrices chéloïdes'],
    ['Par qui', PAR_QUI],
  ],
  '/liquid-lift-liege': [
    ['Traitement', 'Injections d’acide hyaluronique en profondeur, sur plusieurs zones du visage'],
    ['Résultat', 'Visible dès la séance'],
    ['Durée', '12 à 18 mois environ, selon la zone'],
    ['Suites', 'Gonflement, sensibilité ou bleus, en général deux semaines'],
    ['Réversible', 'Oui, par hyaluronidase si nécessaire'],
    ['Par qui', PAR_QUI],
  ],
  '/peeling-liege': [
    ['Traitement', 'Application d’une solution qui exfolie la peau, superficielle ou moyenne'],
    ['Séances', 'Peeling superficiel : 3 à 6 séances espacées d’environ 15 jours'],
    ['Suites', 'Tiraillements quelques jours ; peeling moyen : la peau pèle, éviction sociale de 4 à 8 jours'],
    ['Indispensable', 'Protection solaire stricte, indice SPF 50+'],
    ['Contre-indications', 'Grossesse, allaitement, allergie à un actif'],
    ['Par qui', PAR_QUI],
  ],
  '/mesolift-liege': [
    ['Traitement', 'Micro-injections de substances revitalisantes dans la peau du visage'],
    ['Objectif', 'Un teint plus éclatant ; l’effet varie selon les personnes'],
    ['Séances', 'Plusieurs, rythme défini en consultation'],
    ['Suites', 'Petites rougeurs ou bleus quelques jours'],
    ['Par qui', PAR_QUI],
  ],
  '/fils-tenseurs-liege': [
    ['Traitement', 'Fils résorbables à cônes, placés sous la peau sous anesthésie locale'],
    ['Résultat', 'Effet de soutien visible dès la séance'],
    ['Suites', 'Gonflement, bleus, sensibilité les premières semaines'],
    ['Durée', 'L’effet s’atténue en quelques semaines à quelques mois selon les études'],
    ['Par qui', PAR_QUI],
  ],
  '/cosmetologie-liege': [
    ['Principe', 'Une routine de soins choisie pour votre peau, sur avis médical'],
    ['Premiers effets', 'Au moins 6 semaines, parfois jusqu’à 3 mois'],
    ['Base de tout', 'La protection solaire quotidienne'],
    ['Par qui', PAR_QUI],
  ],
};
