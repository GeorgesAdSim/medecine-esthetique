import { describe, expect, it } from 'vitest';
import { communesVoisines, heure, lignesHoraires } from '../src/contenu/acces';
import { ancreDe } from '../src/utils/ancre';

describe('section « où se faire traiter »', () => {
  it('horaires regroupés dans l’ordre de la semaine, jours fermés à la fin', () => {
    expect(lignesHoraires()).toEqual([
      'Mercredi et vendredi : 9h30-12h00 et 13h30-19h00',
      'Jeudi : 9h30-12h00 et 14h00-18h00',
      'Lundi et mardi : fermé',
    ]);
  });

  it('heures au format français', () => {
    expect(heure('09:30')).toBe('9h30');
    expect(heure('19:00')).toBe('19h00');
  });

  it('communes voisines : ni la localité du cabinet, ni sa commune, ni Liège, ni la région', () => {
    const c = communesVoisines();
    expect(c).not.toContain('Vaux-sous-Chèvremont');
    expect(c).not.toContain('Chaudfontaine');
    expect(c).not.toContain('Liège');
    expect(c.some((x) => /Région/.test(x))).toBe(false);
    expect(c.length).toBeGreaterThan(0);
  });
});

describe('ancres de section', () => {
  it('retient un identifiant sûr, ignore le reste', () => {
    expect(ancreDe({ content: { ancre: 'contre-indications' } })).toBe('contre-indications');
    expect(ancreDe({ content: { ancre: 'Contre indications' } })).toBeUndefined();
    expect(ancreDe({ content: { ancre: '"><script>' } })).toBeUndefined();
    expect(ancreDe({ content: {} })).toBeUndefined();
    expect(ancreDe({})).toBeUndefined();
  });
});
