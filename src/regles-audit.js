// Règles d'audit propres à ce site, branchées dans le harnais de @adsim/seo-audit.
// Identifiants préfixés « mel- » (médecine esthétique Liège).

/** Propriétés JSON-LD interdites tant que les faits ne sont pas confirmés (QUESTIONS.md). */
const PROPRIETES_NON_CONFIRMEES = ['openingHours', 'openingHoursSpecification', 'geo', 'foundingDate', 'priceRange', 'aggregateRating', 'review'];

/** Formulations de promesse, à proscrire dans les surfaces de référencement (publicité des actes esthétiques). */
const PROMESSES = /\bgaranti(e|s|es)?\b|\bmeilleur(e|s|es)?\b|\bsans risque\b|\bmiracle\b/i;

const blocs = (page) => page.blocsLd.flatMap((b) => { try { return [JSON.parse(b)]; } catch { return []; } });

/** @type {import('@adsim/seo-audit').Regle[]} */
export const REGLES_PROJET = [
  {
    id: 'mel-jsonld-faits-confirmes',
    title: 'Aucun fait non confirmé (horaires, GPS, fondation, prix, avis) dans le JSON-LD',
    severity: 'error',
    *run(ctx) {
      for (const p of ctx.build.pagesIndexables) {
        for (const b of blocs(p)) {
          for (const cle of PROPRIETES_NON_CONFIRMEES) {
            if (JSON.stringify(b).includes(`"${cle}"`)) yield { ou: p.url, message: `propriété « ${cle} » émise sans fait confirmé` };
          }
        }
      }
    },
  },
  {
    id: 'mel-pas-de-promesse',
    title: 'Ni titre ni description ne promettent un résultat',
    severity: 'error',
    *run(ctx) {
      for (const p of ctx.build.pagesIndexables) {
        const m = `${p.titre} ${p.description}`.match(PROMESSES);
        if (m) yield { ou: p.url, message: `formulation « ${m[0]} » dans le titre ou la description` };
      }
    },
  },
];
