import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { ALIAS, CHEMINS_TRAITEMENTS, PAGES_FIXES, pageDe, routesPubliques, traitementDe, modifieLe } from '../src/contenu/routes';

const redirects = readFileSync(new URL('../public/_redirects', import.meta.url), 'utf-8')
  .split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#'))
  .map((l) => l.split(/\s+/));

describe('routes publiques', () => {
  it('chaque route a du contenu publié', () => {
    for (const c of Object.keys(PAGES_FIXES)) expect(pageDe(c), c).toBeDefined();
    for (const c of CHEMINS_TRAITEMENTS) expect(traitementDe(c), c).toBeDefined();
  });

  it('aucun doublon, aucune route qui soit aussi un alias', () => {
    const r = routesPubliques();
    expect(new Set(r).size).toBe(r.length);
    for (const c of r) expect(ALIAS[c], c).toBeUndefined();
  });

  it('chaque route a une date de modification (sitemap)', () => {
    for (const c of routesPubliques()) expect(modifieLe(c), c).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('les alias pointent vers une route publique', () => {
    for (const [de, vers] of Object.entries(ALIAS)) expect(routesPubliques(), `${de} → ${vers}`).toContain(vers);
  });
});

describe('public/_redirects', () => {
  it('reprend exactement la table ALIAS, en 301 forcés', () => {
    const r301 = Object.fromEntries(redirects.filter(([, , s]) => s === '301!').map(([de, vers]) => [de, vers]));
    expect(r301).toEqual(ALIAS);
  });

  it("n'a pas de repli « /* » qui masquerait les 404", () => {
    expect(redirects.some(([de]) => de === '/*')).toBe(false);
  });
});
