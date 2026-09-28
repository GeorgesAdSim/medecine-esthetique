// Pré-rendu statique des pages publiques, après le build client.
//
// Repris de adsim-core/templates/site/scripts/prerender.mjs (copié une fois).
// Différences propres à ce site : routes lues dans le bundle SSR
// (routesPubliques(), déduites de data/contenu.json) et 404 écrite à
// dist/404.html, que Netlify sert avec un vrai statut 404.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { ecrireSitemap } from './sitemap.mjs';

const racine = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(racine, 'dist');
const distServerDir = path.join(racine, 'dist-server');
const POINT_INJECTION = '<div id="root"></div>';

/** Fichier plat servi pour une route : /a → a.html (jamais a/index.html). */
export const fichierDe = (dir, route) =>
  (route === '/' ? path.join(dir, 'index.html') : path.join(dir, `${route.replace(/^\//, '')}.html`));

async function main() {
  if (!existsSync(distDir)) throw new Error('dist/ introuvable — lance `pnpm build:client` avant le pré-rendu.');
  if (!existsSync(distServerDir)) throw new Error('dist-server/ introuvable — lance `pnpm build:ssr` avant le pré-rendu.');

  const gabarit = await readFile(path.join(distDir, 'index.html'), 'utf-8');
  // Garde-fou : relancé sans build client, le script prendrait l'accueil déjà
  // pré-rendu pour gabarit et recopierait ses balises dans toutes les pages.
  if (!gabarit.includes(POINT_INJECTION)) {
    throw new Error('dist/index.html est déjà pré-rendu : relance `pnpm build:client` avant le pré-rendu.');
  }

  // Coquille vide, pour le back-office (/admin/*, /setup-admin → app.html).
  await writeFile(path.join(distDir, 'app.html'), gabarit, 'utf-8');

  const bundle = await import(pathToFileURL(path.join(distServerDir, 'entry-server.js')).href);
  const verrouillees = new Set(bundle.PAGES_VERROUILLEES ?? []);
  const routes = bundle.routesPubliques().filter((r) => !verrouillees.has(r));
  if (new Set(routes).size !== routes.length) throw new Error('routesPubliques() contient un doublon.');

  const echecs = [];
  let ok = 0;
  for (const route of [...routes, '/404']) {
    try {
      const { html, helmet } = bundle.render(route);
      const tete = [helmet.title, helmet.meta, helmet.link, helmet.script].map((x) => x.toString()).join('\n');
      if (!html.trim()) throw new Error('rendu vide');
      const attributsHtml = helmet.htmlAttributes.toString();

      const final = gabarit
        .replace(/<title>.*?<\/title>/s, '')
        .replace(/<html[^>]*>/, `<html ${attributsHtml || 'lang="fr"'}>`)
        .replace('</head>', `${tete}\n  </head>`)
        .replace(POINT_INJECTION, `<div id="root">${html}</div>`);

      const cible = route === '/404' ? path.join(distDir, '404.html') : fichierDe(distDir, route);
      await mkdir(path.dirname(cible), { recursive: true });
      await writeFile(cible, final, 'utf-8');
      ok++;
    } catch (e) {
      echecs.push({ route, erreur: e?.message || String(e) });
    }
  }

  console.log(`  pré-rendu : ${ok}/${routes.length + 1} pages (404 comprise).`);
  if (echecs.length) {
    for (const e of echecs) console.error(`  ✗ ${e.route} : ${e.erreur}`);
    process.exitCode = 1;
    return;
  }

  // Sitemap APRÈS le pré-rendu, et à partir de lui : aucune URL déclarée sans
  // page réellement écrite.
  if (!(await ecrireSitemap({ racine, distDir, bundle, routes }))) process.exitCode = 1;
}

main().catch((e) => { console.error(e); process.exitCode = 1; });
