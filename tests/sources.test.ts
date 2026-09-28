import { describe, expect, it } from 'vitest';
import { SOURCES, appuisParAncre, dateLisible } from '../src/contenu/sources';
import { CHEMINS_TRAITEMENTS, cheminsTraitementsPublies, traitementDe } from '../src/contenu/routes';
import { jsonLdDe } from '../src/seo/jsonld';

/** Toutes les ancres de section d'une page publiée. */
const ancres = (chemin: string): Set<string> => {
  const blocs: any[] = traitementDe(chemin)?.donnees.content ?? [];
  return new Set(blocs.map((b) => (b.content ?? b.data ?? {}).ancre).filter(Boolean));
};

describe('sources externes des pages de traitement', () => {
  for (const [chemin, page] of Object.entries(SOURCES)) {
    it(`${chemin} : chaque source est un document https daté`, () => {
      expect(page.sources.length).toBeGreaterThan(0);
      for (const s of page.sources) {
        expect(s.url, s.id).toMatch(/^https:\/\//);
        expect(s.consulteLe, s.id).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(s.titre.trim() && s.editeur.trim(), s.id).toBeTruthy();
      }
      expect(new Set(page.sources.map((s) => s.id)).size).toBe(page.sources.length);
    });

    it(`${chemin} : chaque appui cite une source connue, avec extrait, sous une section qui existe`, () => {
      const ids = new Set(page.sources.map((s) => s.id));
      const presentes = ancres(chemin);
      for (const a of page.appuis) {
        expect(ids.has(a.source), `${a.ancre} → ${a.source}`).toBe(true);
        expect(a.extrait.length, a.ancre).toBeGreaterThan(20);
        expect(presentes.has(a.ancre), `ancre « ${a.ancre} » absente de la page`).toBe(true);
      }
    });

    it(`${chemin} : chaque source est citée au moins une fois et publiée en JSON-LD`, () => {
      const citees = new Set(page.appuis.map((a) => a.source));
      for (const s of page.sources) expect(citees.has(s.id), s.id).toBe(true);
      const page_ = jsonLdDe(chemin, 'Titre | x').find((n: any) => n['@type'] === 'MedicalWebPage') as any;
      expect(page_.citation.map((c: any) => c.url)).toEqual(page.sources.map((s) => s.url));
    });
  }

  it('regroupement par ancre et date lisible', () => {
    expect(Object.keys(appuisParAncre('/botox-liege'))).toContain('contre-indications');
    expect(appuisParAncre('/nexiste-pas')).toEqual({});
    expect(dateLisible('2026-09-28')).toBe('28 septembre 2026');
  });

  it('MedicalWebPage si et seulement si la page cite des sources', () => {
    for (const c of CHEMINS_TRAITEMENTS) {
      const a = jsonLdDe(c, 'X | y').some((n: any) => n['@type'] === 'MedicalWebPage');
      expect(a, c).toBe(Boolean(SOURCES[c]));
    }
  });

  it('toutes les pages de traitement (piliers et pages filles) citent leurs sources', () => {
    for (const c of cheminsTraitementsPublies()) expect(SOURCES[c], c).toBeDefined();
  });

  it('pages de traitement servies depuis l’éditeur de pages (custom_pages)', () => {
    for (const c of CHEMINS_TRAITEMENTS) expect(traitementDe(c)?.source, c).toBe('page');
  });
});
