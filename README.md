# medecine-esthetique-liege.be

Site de la Dre Jocelyne Fassotte, repris par AdSim. React + Vite, contenu dans
Supabase, **pré-rendu au build** sur le socle [`adsim-core`](https://github.com/GeorgesAdSim/adsim-core).

## Comment le site est servi

- Les pages publiques sont du HTML pré-rendu (`dist/*.html`) à partir de
  `data/contenu.json`, instantané du contenu **publié** dans Supabase.
- L'admin (séquence clavier « admin » sur le site) lit et écrit Supabase. Une
  modification apparaît en ligne après **« Publier le site »** dans le panneau
  d'administration, qui relance un build Netlify (`netlify/functions/publier.mjs`).
- Routes, alias et 301 : `src/contenu/routes.ts` (source unique) et
  `public/_redirects` (vérifié égal par `tests/routes.test.ts`).
- Une URL inconnue reçoit `404.html` avec un vrai statut 404.

## Chaîne de build

```
test → sync → build:ssr → build:client → prerender (+ sitemap)
```

## Développement local

```sh
git clone https://github.com/GeorgesAdSim/adsim-core ../adsim-core
(cd ../adsim-core && git checkout $(cat ../medecine-esthetique/ADSIM_CORE_REF) && pnpm install)
pnpm install
pnpm build                    # SYNC_INSTANTANE=1 pour garder data/contenu.json sans réseau
pnpm preview                  # sert dist/ comme Netlify (301, 404, URL propres)
```

## Réglages Netlify requis

| variable | rôle |
|---|---|
| `ADSIM_CORE_TOKEN` | jeton GitHub lecture seule sur `adsim-core` (clone du socle au build) |
| `NETLIFY_BUILD_HOOK_URL` | build hook de production, appelé par « Publier le site » |

Le workflow GitHub `sync-contenu` (déclenchement manuel) committe un instantané
du contenu publié dans `data/contenu.json`.
