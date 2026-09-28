// Le sitemap : assemblage ici, sérialisation dans @adsim/sitemap.
//
// ÉCART AU TEMPLATE, voulu : le `lastmod` n'est pas calculé par empreinte avec
// un magasin versionné (data/sitemap-lastmod.json). Ce site se construit sur
// Netlify, dans un conteneur éphémère, à chaque « Publier » : le magasin
// réécrit y serait perdu (adsim-core, OBSERVATIONS § 3). La date vient donc de
// la base — `updated_at` de la page ou du traitement — lue dans le bundle SSR
// (modifieLe). Voir SUGGESTIONS-SOCLE.md § 1.
import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { entreeXml, sitemapXml } from '@adsim/sitemap';

const fichierDe = (distDir, url) =>
  (url === '/' ? path.join(distDir, 'index.html') : path.join(distDir, `${url.slice(1)}.html`));

/** @returns {Promise<boolean>} false si le sitemap n'a pas pu être produit */
export async function ecrireSitemap({ racine, distDir, bundle, routes }) {
  const { site } = JSON.parse(await readFile(path.join(racine, 'adsim-seo.config.json'), 'utf-8'));
  const baseUrl = site.baseUrl;
  if (!baseUrl || baseUrl.endsWith('/')) {
    console.error('  ✗ sitemap : site.baseUrl manquant ou avec slash final (adsim-seo.config.json)');
    return false;
  }

  const erreurs = [];
  const entrees = [];
  for (const url of [...routes].sort((a, b) => (a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b)))) {
    if (!existsSync(fichierDe(distDir, url))) { erreurs.push(`${url} déclarée sans page pré-rendue`); continue; }
    const lastmod = bundle.modifieLe(url);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(lastmod ?? '')) { erreurs.push(`${url} sans date de modification`); continue; }
    entrees.push(entreeXml({ baseUrl, url, lastmod }));
  }
  if (erreurs.length) {
    for (const e of erreurs) console.error(`  ✗ sitemap : ${e}`);
    return false;
  }

  const xml = sitemapXml({
    entrees,
    commentaire: ['Généré au build — ne pas modifier à la main.', 'lastmod : date de modification du contenu dans la base.'],
  });
  await writeFile(path.join(distDir, 'sitemap.xml'), xml, 'utf-8');
  console.log(`  sitemap : ${entrees.length} URL déclarées.`);
  return true;
}
