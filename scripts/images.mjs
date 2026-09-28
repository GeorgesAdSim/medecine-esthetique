// Images du contenu → variantes AVIF/WebP redimensionnées, servies depuis le domaine.
//
// Pourquoi : les images arrivent de l'admin telles quelles (Supabase Storage), parfois
// en 5 400 px et 7 Mo pour un affichage de 665 px — c'était le LCP de l'accueil
// (38,9 s sur mobile, PageSpeed du 28/09/2026). Ici, chaque image Supabase citée par
// le contenu publié (data/contenu.json) est téléchargée une fois par build,
// redimensionnée et convertie.
//
// Sorties (non versionnées, régénérées à chaque build) :
//   public/media/<empreinte>-<largeur>.<avif|webp>
//   data/images.json : { "<src d'origine>": { largeur, hauteur, avif: [[l, url]…], webp: [[l, url]…] } }
// Le rendu (src/contenu/images.ts) lit ce manifeste ; une image absente du manifeste
// garde son URL d'origine — le site reste juste, seulement plus lent.
//
// IMAGES_STRICT=1 (builds Netlify) : un téléchargement ou une conversion qui échoue
// arrête le build. Sans lui (poste hors ligne), on avertit et on continue.
import { createHash } from 'node:crypto';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const racine = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SORTIE = path.join(racine, 'public/media');
const MANIFESTE = path.join(racine, 'data/images.json');
const PUBLIC_URL = '/media';

/** Largeurs produites (plafonnées à la largeur d'origine). */
export const LARGEURS = [480, 800, 1200, 1600];
const QUALITE = { avif: 50, webp: 72 };
const STRICT = process.env.IMAGES_STRICT === '1';

const EXT = /\.(jpe?g|png|webp)$/i;
const DISTANTE = /^https:\/\/[a-z0-9]+\.supabase\.co\/storage\/v1\/object\/public\/[^\s"'<>]+$/;

/** Toutes les chaînes d'une valeur JSON, récursivement. */
function* chaines(v) {
  if (typeof v === 'string') yield v;
  else if (Array.isArray(v)) for (const x of v) yield* chaines(x);
  else if (v && typeof v === 'object') for (const x of Object.values(v)) yield* chaines(x);
}

/** Images Supabase (jpeg, png, webp) citées n'importe où dans le contenu publié. */
export function sources(contenu) {
  return [...new Set([...chaines(contenu)].filter((s) => DISTANTE.test(s) && EXT.test(new URL(s).pathname)))].sort();
}

async function telecharger(src) {
  const r = await fetch(src);
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return Buffer.from(await r.arrayBuffer());
}

/** Variantes AVIF + WebP d'une image, écrites dans `sortie` ; renvoie l'entrée du manifeste. */
export async function convertir(octets, sortie = SORTIE) {
  const empreinte = createHash('sha256').update(octets).digest('hex').slice(0, 12);
  const { width, height, orientation } = await sharp(octets, { failOn: 'none' }).metadata();
  if (!width || !height) throw new Error('dimensions illisibles');
  // rotate() applique l'orientation EXIF : de 5 à 8, largeur et hauteur s'échangent.
  const [l, h] = (orientation ?? 1) >= 5 ? [height, width] : [width, height];
  const largeurs = [...new Set([...LARGEURS.filter((x) => x < l), Math.min(l, LARGEURS.at(-1))])].sort((a, b) => a - b);

  const entree = { largeur: l, hauteur: h, avif: [], webp: [] };
  for (const w of largeurs) {
    for (const format of ['avif', 'webp']) {
      const nom = `${empreinte}-${w}.${format}`;
      await sharp(octets, { failOn: 'none' }).rotate().resize({ width: w, withoutEnlargement: true })
        [format]({ quality: QUALITE[format] }).toFile(path.join(sortie, nom));
      entree[format].push([w, `${PUBLIC_URL}/${nom}`]);
    }
  }
  return entree;
}

async function main() {
  const liste = sources(JSON.parse(await readFile(path.join(racine, 'data/contenu.json'), 'utf-8')));
  await rm(SORTIE, { recursive: true, force: true });
  await mkdir(SORTIE, { recursive: true });

  const manifeste = {};
  const echecs = [];
  let avant = 0;
  for (const src of liste) {
    try {
      const octets = await telecharger(src);
      avant += octets.length;
      manifeste[src] = await convertir(octets);
    } catch (e) {
      echecs.push(`${src} : ${e.cause?.code ?? e.message}`);
    }
  }
  await writeFile(MANIFESTE, `${JSON.stringify(manifeste, null, 2)}\n`, 'utf-8');

  const n = Object.keys(manifeste).length;
  console.log(`  images : ${n}/${liste.length} converties (${(avant / 1048576).toFixed(1)} Mo d'origine).`);
  if (echecs.length) {
    const msg = `  images : ${echecs.length} échec(s)\n    ${echecs.join('\n    ')}`;
    if (STRICT) throw new Error(msg);
    console.warn(`${msg}\n  (hors IMAGES_STRICT : ces images gardent leur URL d'origine)`);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((e) => { console.error(e.message ?? e); process.exit(1); });
}
