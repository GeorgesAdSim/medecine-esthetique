import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { routesPubliques } from '../src/contenu/routes';
import { descripteurDe } from '../src/seo/pages';
import { LIMITES } from '../src/seo/site';

const config = JSON.parse(readFileSync(new URL('../adsim-seo.config.json', import.meta.url), 'utf-8'));
const desc = (d: ReturnType<typeof descripteurDe>) => d.metas.find((m) => m.nom === 'description')?.contenu ?? '';

describe('descripteurs SEO', () => {
  it('mêmes seuils que la configuration d’audit', () => {
    expect(LIMITES).toEqual({
      titreMax: config.contenu.titreLongueurMax,
      descriptionMin: config.contenu.descriptionLongueurMin,
      descriptionMax: config.contenu.descriptionLongueurMax,
    });
  });

  it('chaque route a un titre et une description aux bonnes longueurs', () => {
    for (const r of routesPubliques()) {
      const d = descripteurDe(r);
      expect(d.titre.length, r).toBeLessThanOrEqual(LIMITES.titreMax);
      expect(desc(d).length, r).toBeGreaterThanOrEqual(LIMITES.descriptionMin);
      expect(desc(d).length, r).toBeLessThanOrEqual(LIMITES.descriptionMax);
      expect(d.canonical, r).toBe(`${config.site.baseUrl}${r}`);
    }
  });

  it('titres uniques', () => {
    const t = routesPubliques().map((r) => descripteurDe(r).titre);
    expect(new Set(t).size).toBe(t.length);
  });

  it('URL inconnue : noindex, sans canonical', () => {
    const d = descripteurDe('/nexiste-pas');
    expect(d.robots).toBe('noindex,follow');
    expect(d.canonical).toBeNull();
  });

  it('traitements : Service + FAQPage renvoyant au cabinet (+ MedicalWebPage si la page cite des sources)', () => {
    const ld = descripteurDe('/botox-liege').jsonLd as any[];
    expect(ld.map((n) => n['@type'])).toEqual(['MedicalClinic', 'Service', 'BreadcrumbList', 'FAQPage', 'MedicalWebPage']);
    expect(ld[4].publisher['@id']).toBe(ld[0]['@id']);
    expect(ld[1].provider['@id']).toBe(ld[0]['@id']);
  });
});

describe('horaires confirmés', () => {
  it('accueil : mercredi à vendredi seulement, jamais lundi ni mardi', () => {
    const clinique = (descripteurDe('/').jsonLd as any[])[0];
    const jours = clinique.openingHoursSpecification.flatMap((p: any) => [p.dayOfWeek].flat());
    expect(new Set(jours)).toEqual(new Set(['Wednesday', 'Thursday', 'Friday']));
  });
});

describe('position confirmée', () => {
  it('accueil : coordonnées de la fiche Google et lien vers la fiche', () => {
    const clinique = (descripteurDe('/').jsonLd as any[])[0];
    expect(clinique.geo).toEqual({ '@type': 'GeoCoordinates', latitude: 50.6066396, longitude: 5.6285276 });
    expect(clinique.hasMap).toBe('https://www.google.com/maps?cid=3884643552219898504');
  });
});
