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
  if [ -z "${ADSIM_CORE_TOKEN:-}" ]; then
    echo "ADSIM_CORE_TOKEN manquant (variable Netlify)" >&2
    exit 1
  fi
  git init -q "$SOCLE"
  # Jeton passé en en-tête HTTP, jamais dans l'URL (qui peut apparaître dans un message d'erreur).
  AUTH="$(printf 'x-access-token:%s' "$ADSIM_CORE_TOKEN" | base64 | tr -d '\n')"
  git -C "$SOCLE" -c http.extraHeader="Authorization: Basic ${AUTH}" \
    fetch -q --depth 1 https://github.com/GeorgesAdSim/adsim-core.git "$REF"
  git -C "$SOCLE" checkout -q FETCH_HEAD
fi
echo "  socle : adsim-core @ $(git -C "$SOCLE" rev-parse --short HEAD)"

# Aperçus de PR (deploy-preview, branch-deploy) : on construit l'instantané
# data/contenu.json de la branche, pas la base — c'est ce qui permet de relire
# un changement de contenu proposé en PR avant de l'écrire en base. La
# production (et le bouton « Publier ») lit toujours la base.
if [ "${CONTEXT:-production}" != "production" ]; then
  export SYNC_INSTANTANE=1
  echo "  contenu : instantané de la branche (contexte ${CONTEXT})"
fi

# Images : sur Netlify (réseau disponible), une image du contenu qui ne se
# convertit pas arrête le build plutôt que de servir l'original de 7 Mo.
export IMAGES_STRICT=1

corepack enable
(cd "$SOCLE" && pnpm install --frozen-lockfile --prod=false)
pnpm install --frozen-lockfile
pnpm build
