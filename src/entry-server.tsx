// Point d'entrée du rendu serveur — et CONTRAT avec les scripts de build.
//
// scripts/prerender.mjs et scripts/sitemap.mjs sont des modules Node : ils ne
// peuvent pas importer du TypeScript. Ils consomment ce bundle compilé et y
// lisent l'UNIQUE implémentation des routes du projet :
//
//   render(url) → { html, helmet }     le pré-rendu
//   routesPubliques()                  les chemins à écrire
//   modifieLe(chemin)                  lastmod du sitemap (date de la base)
//   PAGES_VERROUILLEES                 routées mais non écrites
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async';
import App from './App';

export { routesPubliques, modifieLe, ALIAS } from './contenu/routes';
export { texteLlms } from './seo/llms';

export const PAGES_VERROUILLEES: readonly string[] = [];

export function render(url: string): { html: string; helmet: HelmetServerState } {
  const contexte: { helmet?: HelmetServerState } = {};
  const html = renderToString(
    <React.StrictMode>
      <HelmetProvider context={contexte}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    </React.StrictMode>,
  );
  if (!contexte.helmet) throw new Error(`render(${url}) : Helmet n'a produit aucun <head>.`);
  return { html, helmet: contexte.helmet };
}
