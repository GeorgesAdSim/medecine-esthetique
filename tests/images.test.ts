import { mkdtemp, readdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { resoudre } from '../src/contenu/imagesManifeste';
// @ts-expect-error — script Node en JS
import { convertir, sources } from '../scripts/images.mjs';

const SUPA = 'https://hxgfakegwewcfkxvltgl.supabase.co/storage/v1/object/public/media/';

describe('images du contenu', () => {
  it('ne retient que les images Supabase, sans doublon, où qu’elles soient', () => {
    const contenu = {
      pages: [{ content: [{ content: { image: `${SUPA}a.jpeg`, texte: 'rien' } }] }],
      galerie: [{ image_url: `${SUPA}gallery/b.jpg` }, { image_url: `${SUPA}a.jpeg` }],
      autre: ['https://images.pexels.com/x.jpeg', `${SUPA}doc.pdf`],
    };
    expect(sources(contenu)).toEqual([`${SUPA}a.jpeg`, `${SUPA}gallery/b.jpg`]);
  });

  it('une image de 5 400 px donne des variantes AVIF et WebP plafonnées à 1 600 px', async () => {
    const octets = await sharp({ create: { width: 5400, height: 3600, channels: 3, background: '#c88' } }).jpeg().toBuffer();
    const dossier = await mkdtemp(path.join(tmpdir(), 'images-'));
    const e = await convertir(octets, dossier);
    expect([e.largeur, e.hauteur]).toEqual([5400, 3600]);
    expect(e.webp.map(([l]: [number]) => l)).toEqual([480, 800, 1200, 1600]);
    expect(e.avif).toHaveLength(4);
    expect((await readdir(dossier)).length).toBe(8);
  });

  it('une petite image n’est jamais agrandie', async () => {
    const octets = await sharp({ create: { width: 600, height: 400, channels: 3, background: '#888' } }).png().toBuffer();
    const e = await convertir(octets, await mkdtemp(path.join(tmpdir(), 'images-')));
    expect(e.webp.map(([l]: [number]) => l)).toEqual([480, 600]);
  });

  it('résolution : variantes si présentes, sinon URL d’origine', () => {
    const m = { [`${SUPA}a.jpeg`]: { largeur: 5400, hauteur: 3600, avif: [[480, '/media/x-480.avif']], webp: [[480, '/media/x-480.webp'], [800, '/media/x-800.webp'], [1600, '/media/x-1600.webp']] } };
    const r = resoudre(`${SUPA}a.jpeg`, m as never);
    expect(r.src).toBe('/media/x-800.webp');
    expect(r.webp).toBe('/media/x-480.webp 480w, /media/x-800.webp 800w, /media/x-1600.webp 1600w');
    expect([r.largeur, r.hauteur]).toEqual([5400, 3600]);
    expect(resoudre(`${SUPA}inconnue.jpeg`, m as never)).toEqual({ src: `${SUPA}inconnue.jpeg` });
  });
});
