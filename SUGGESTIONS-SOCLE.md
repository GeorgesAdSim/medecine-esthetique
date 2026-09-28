# Suggestions pour le socle adsim-core

Constats faits depuis ce site, non appliqués au socle (le projet consomme le
socle, il ne le modifie pas). Socle @ révision de `ADSIM_CORE_REF`.

## 1. Le `lastmod` par empreinte ne tient pas un build en conteneur éphémère

**Contexte.** Ce site se reconstruit sur Netlify à chaque « Publier » de l'admin.
Le template calcule le `lastmod` par empreinte du HTML, avec une mémoire
versionnée (`data/sitemap-lastmod.json`) que le build réécrit : sur Netlify,
l'écriture est perdue à chaque build (constat déjà noté dans
`OBSERVATIONS.md` § 3 du socle).

**Contournement local.** La date vient de la base (`updated_at` de la page ou du
traitement), exposée par le bundle SSR (`modifieLe`) ; le sitemap est sérialisé
avec `entreeXml` / `sitemapXml` de `@adsim/sitemap`, sans `composerSitemap`.

**Proposition.** Que `composerSitemap` accepte des dates fournies par l'appelant
(`dates: Record<url, 'YYYY-MM-DD'>`) comme alternative aux empreintes : c'est le
cas de tout site dont le contenu vient d'une base datée.

## 2. Consommation hors monorepo sur un hébergeur qui construit

**Contexte.** Pierret consomme le socle en `link:../adsim-core` et construit en
local. Ici, le bouton « Publier » exige un build chez Netlify.

**Contournement local.** `scripts/netlify-build.sh` clone `adsim-core` à la
révision de `ADSIM_CORE_REF` dans `../adsim-core` (jeton `ADSIM_CORE_TOKEN`),
installe le socle puis le projet. Les dépendances restent en `link:` — même
forme que Pierret.

**Proposition.** Documenter cette recette dans le GUIDE § 6.2, ou publier les
paquets sur un registre privé (ce qui lèverait aussi le besoin du jeton).
