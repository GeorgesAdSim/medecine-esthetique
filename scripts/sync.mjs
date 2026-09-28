// Lecture de la base de contenu (Supabase) → data/contenu.json, versionné.
//
// Le site public ne lit plus Supabase dans le navigateur : il est pré-rendu à
// partir de ce fichier. L'admin, lui, continue d'écrire dans Supabase ; le
// bouton « Publier » relance un build, dont c'est la première étape.
//
// Seul le contenu PUBLIÉ est lu (pages publiées, traitements actifs, menu
// visible, images actives) : un brouillon ne peut pas fuiter dans le HTML.
// Lecture avec la clé publique (anon), soumise aux mêmes règles RLS que le site.
//
// Sortie déterministe (tri stable, champs techniques retirés) : deux builds sur
// les mêmes données écrivent le même fichier, octet pour octet.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const racine = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cible = path.join(racine, 'data/contenu.json');

/** Lit VITE_SUPABASE_* dans l'environnement, sinon dans netlify.toml. */
async function identifiants() {
  let url = process.env.VITE_SUPABASE_URL;
  let cle = process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !cle) {
    const toml = await readFile(path.join(racine, 'netlify.toml'), 'utf-8');
    url ||= toml.match(/VITE_SUPABASE_URL\s*=\s*"([^"]+)"/)?.[1];
    cle ||= toml.match(/VITE_SUPABASE_ANON_KEY\s*=\s*"([^"]+)"/)?.[1];
  }
  if (!url || !cle) throw new Error('VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY introuvables');
  return { url, cle };
}

const REQUETES = {
  pages: 'custom_pages?select=*&is_published=eq.true&order=slug',
  traitements: 'custom_treatments?select=*&is_active=eq.true&order=slug',
  menu: 'menu_items?select=*&is_visible=eq.true&order=order_index,name',
  reglages: 'site_settings?select=*&order=key',
  galerie: 'gallery_images?select=*&is_active=eq.true&order=display_order,id',
};

// Champs qui ne servent pas au rendu et qui bougeraient le fichier pour rien.
const RETIRES = new Set(['created_by', 'updated_by']);
const nettoyer = (ligne) => Object.fromEntries(Object.entries(ligne).filter(([k]) => !RETIRES.has(k)));

async function lire({ url, cle }, requete) {
  const r = await fetch(`${url}/rest/v1/${requete}`, { headers: { apikey: cle, Authorization: `Bearer ${cle}` } });
  if (!r.ok) throw new Error(`${requete.split('?')[0]} : HTTP ${r.status} ${await r.text()}`);
  return (await r.json()).map(nettoyer);
}

async function main() {
  // Build hors ligne (poste sans accès à Supabase) : on garde l'instantané versionné.
  if (process.env.SYNC_INSTANTANE === '1') {
    console.log('  sync : SYNC_INSTANTANE=1, instantané data/contenu.json conservé tel quel.');
    return;
  }
  const ids = await identifiants();
  const contenu = {};
  for (const [nom, requete] of Object.entries(REQUETES)) {
    try {
      contenu[nom] = await lire(ids, requete);
    } catch (e) {
      // Galerie : la colonne display_order peut ne pas exister sur une base plus ancienne.
      if (nom === 'galerie') contenu[nom] = await lire(ids, 'gallery_images?select=*&is_active=eq.true&order=id');
      else throw e;
    }
  }

  // Garde-fous : une base vide ou inaccessible ne doit pas produire un site vide.
  if (!contenu.pages.some((p) => p.slug === 'accueil')) throw new Error('page « accueil » absente des pages publiées');
  if (contenu.menu.length === 0) throw new Error('menu vide');

  await mkdir(path.dirname(cible), { recursive: true });
  const texte = `${JSON.stringify(contenu, null, 2)}\n`;
  let avant = '';
  try { avant = await readFile(cible, 'utf-8'); } catch { /* premier sync */ }
  await writeFile(cible, texte, 'utf-8');
  console.log(
    `  sync : ${contenu.pages.length} pages, ${contenu.traitements.length} traitements, ${contenu.menu.length} entrées de menu, ` +
    `${contenu.reglages.length} réglages, ${contenu.galerie.length} images — ${avant === texte ? 'inchangé' : 'mis à jour'}.`,
  );
}

main().catch((e) => {
  console.error('  ✗ sync :', e?.message || e);
  process.exit(1);
});
