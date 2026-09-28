// llms.txt (llmstxt.org) : plan du site en Markdown pour les assistants.
// Déduit des mêmes routes et descripteurs que les pages — aucune liste à part.
import { BUSINESS_INFO } from '../constants/businessInfo';
import { estPageTraitement, routesPubliques } from '../contenu/routes';
import { descripteurDe } from './pages';
import { SITE } from './site';

const ligne = (chemin: string) => {
  const d = descripteurDe(chemin);
  return `- [${d.titre.split(' | ')[0]}](${SITE.baseUrl}${chemin}): ${d.metas.find((m) => m.nom === 'description')?.contenu ?? ''}`;
};

export function texteLlms(): string {
  const routes = routesPubliques();
  const traitements = routes.filter((r) => estPageTraitement(r));
  const autres = routes.filter((r) => !estPageTraitement(r));
  const a = BUSINESS_INFO.address;
  return [
    `# ${BUSINESS_INFO.name}`,
    '',
    `> Cabinet de médecine esthétique non chirurgicale de la ${BUSINESS_INFO.doctor.title} ${BUSINESS_INFO.doctor.name}, ${a.street}, ${a.postalCode} ${a.city} (${a.region}, ${a.country}). Consultations sur rendez-vous.`,
    '',
    '## Traitements',
    ...traitements.map(ligne),
    '',
    '## Cabinet',
    ...autres.map(ligne),
    '',
  ].join('\n');
}
