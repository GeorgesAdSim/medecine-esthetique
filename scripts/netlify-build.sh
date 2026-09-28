#!/usr/bin/env bash
# Build Netlify : récupère le socle adsim-core à la version figée, puis lance la
# chaîne du projet.
#
# Le socle est consommé en `link:../adsim-core/packages/*` (comme Pierret). En
# local, ../adsim-core est un clone de travail ; sur Netlify, on le clone ici, à
# la révision écrite dans ADSIM_CORE_REF (fichier versionné) — un changement du
# socle n'entre donc dans ce site que par un commit qui déplace cette révision.
#
# Dépôt privé : jeton GitHub en lecture seule dans la variable Netlify
# ADSIM_CORE_TOKEN (fine-grained, « Contents: read » sur adsim-core uniquement).
set -euo pipefail
cd "$(dirname "$0")/.."

REF="$(tr -d '[:space:]' < ADSIM_CORE_REF)"
SOCLE="../adsim-core"

if [ ! -d "$SOCLE/.git" ]; then
  : "${ADSIM_CORE_TOKEN:?ADSIM_CORE_TOKEN manquant (variable d'environnement Netlify)}"
  git init -q "$SOCLE"
  git -C "$SOCLE" fetch -q --depth 1 "https://x-access-token:${ADSIM_CORE_TOKEN}@github.com/GeorgesAdSim/adsim-core.git" "$REF"
  git -C "$SOCLE" checkout -q FETCH_HEAD
fi
echo "  socle : adsim-core @ $(git -C "$SOCLE" rev-parse --short HEAD)"

corepack enable
(cd "$SOCLE" && pnpm install --frozen-lockfile --prod=false)
pnpm install --frozen-lockfile
pnpm build
