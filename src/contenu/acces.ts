// Texte de la section « où se faire traiter », commune aux pages de traitement.
// Tout vient de BUSINESS_INFO (faits confirmés le 28/09/2026) : rien n'est écrit
// à la main ici, pour qu'un changement d'horaire ne se corrige qu'à un endroit.
import { BUSINESS_INFO } from '../constants/businessInfo';

const JOURS: Record<string, string> = {
  Monday: 'lundi', Tuesday: 'mardi', Wednesday: 'mercredi', Thursday: 'jeudi',
  Friday: 'vendredi', Saturday: 'samedi', Sunday: 'dimanche',
};
const ORDRE = Object.keys(JOURS);

/** « 09:30 » → « 9h30 ». */
export const heure = (h: string): string => h.replace(/^0/, '').replace(':', 'h');

const enumerer = (mots: string[]): string =>
  mots.length < 2 ? mots.join('') : `${mots.slice(0, -1).join(', ')} et ${mots[mots.length - 1]}`;

const majuscule = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);

/**
 * Horaires en lignes lisibles, jours de mêmes plages regroupés, dans l'ordre de la
 * semaine : « Mercredi et vendredi : 9h30-12h00 et 13h30-19h00 », puis les jours fermés.
 */
export function lignesHoraires(hours = BUSINESS_INFO.hours): string[] {
  const parJour = new Map<string, string[]>();
  for (const p of hours.plages) {
    for (const j of p.jours) parJour.set(j, [...(parJour.get(j) ?? []), `${heure(p.ouverture)}-${heure(p.fermeture)}`]);
  }
  const groupes = new Map<string, string[]>();
  for (const j of ORDRE) {
    const plages = parJour.get(j);
    if (!plages) continue;
    const cle = plages.join(' et ');
    groupes.set(cle, [...(groupes.get(cle) ?? []), JOURS[j]]);
  }
  const lignes = [...groupes].map(([plages, jours]) => `${majuscule(enumerer(jours))} : ${plages}`);
  if (hours.fermes.length) lignes.push(`${majuscule(enumerer(hours.fermes.map((j) => JOURS[j])))} : fermé`);
  return lignes;
}

/** Communes desservies, hors la localité et la commune du cabinet et hors mentions régionales. */
export function communesVoisines(info = BUSINESS_INFO): string[] {
  return info.seo.areaServed.filter(
    (c) => c !== info.address.city && c !== info.address.municipality && c !== 'Liège' && !/^Région/.test(c),
  );
}
