import { describe, expect, it } from 'vitest';
import { cheminsTraitementsPublies, traitementDe } from '../src/contenu/routes';
import { EN_BREF } from '../src/contenu/enBref';

describe('encadré « En bref »', () => {
  it('chaque page de traitement publiée en a un, sans ligne vide', () => {
    for (const c of cheminsTraitementsPublies()) {
      expect(EN_BREF[c], c).toBeDefined();
      for (const [l, v] of EN_BREF[c]) expect(l.trim() && v.trim(), `${c} : ${l}`).toBeTruthy();
    }
  });

  it('aucun prix tant que les honoraires ne sont pas confirmés', () => {
    for (const [c, lignes] of Object.entries(EN_BREF)) {
      for (const [, v] of lignes) expect(v, c).not.toMatch(/€|euro/i);
    }
  });

  it('le H1 de chaque page de traitement contient « Liège »', () => {
    for (const c of cheminsTraitementsPublies()) {
      const hero = (traitementDe(c)?.donnees.content as any[])?.[0];
      expect(hero?.type, c).toBe('hero');
      expect((hero.content ?? hero.data).title, c).toMatch(/Liège/);
    }
  });
});
