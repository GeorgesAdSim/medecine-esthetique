import { describe, expect, it } from 'vitest';
import { CHEMINS_TRAITEMENTS, NOMS_PILIERS, SOUS_PAGES, enfantsDe, routesPubliques, sousPagesPubliees, traitementDe } from '../src/contenu/routes';
import { descripteurDe } from '../src/seo/pages';
import { LIMITES } from '../src/seo/site';

describe('silo pilier → pages filles', () => {
  it('chaque page fille a un pilier connu, nommé, et une URL sous ce pilier', () => {
    for (const [c, f] of Object.entries(SOUS_PAGES)) {
      expect(CHEMINS_TRAITEMENTS, c).toContain(f.parent);
      expect(NOMS_PILIERS[f.parent], c).toBeTruthy();
      expect(c.startsWith(f.parent + '/'), c).toBe(true);
    }
  });

  it('une page fille publiée est une route, avec son contenu, et listée par son pilier', () => {
    for (const c of sousPagesPubliees()) {
      expect(routesPubliques(), c).toContain(c);
      expect(traitementDe(c)?.source, c).toBe('page');
      expect(enfantsDe(SOUS_PAGES[c].parent), c).toContain(c);
    }
  });

  it('le slug d’une page fille ne crée pas de doublon à /{slug}', () => {
    for (const f of Object.values(SOUS_PAGES)) expect(routesPubliques()).not.toContain('/' + f.slug);
  });

  it('fil d’Ariane JSON-LD à quatre niveaux : accueil, traitements, pilier, page fille', () => {
    for (const c of sousPagesPubliees()) {
      const ld = descripteurDe(c).jsonLd as any[];
      const fil = ld.find((n) => n['@type'] === 'BreadcrumbList');
      expect(fil.itemListElement.map((i: any) => i.item), c).toEqual([
        'https://www.medecine-esthetique-liege.be/',
        'https://www.medecine-esthetique-liege.be/medecine-esthetique-liege',
        'https://www.medecine-esthetique-liege.be' + SOUS_PAGES[c].parent,
        'https://www.medecine-esthetique-liege.be' + c,
      ]);
    }
  });

  it('titre et description rédigés, aux bonnes longueurs', () => {
    for (const c of sousPagesPubliees()) {
      const d = descripteurDe(c);
      expect(d.titre.length, c).toBeLessThanOrEqual(LIMITES.titreMax);
      expect(d.titre, c).toMatch(/Liège/);
    }
  });
});
