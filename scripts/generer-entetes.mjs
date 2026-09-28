// Produit `dist/_headers` : en-têtes de sécurité, dont la CSP.
//
// ─────────────────────────────────────────────────────────────────────────────
// POURQUOI GÉNÉRÉ, ET NON ÉCRIT À LA MAIN
// ─────────────────────────────────────────────────────────────────────────────
//
// Le gabarit contient des scripts INLINE. Une CSP qui les autoriserait par
// `'unsafe-inline'` n'autoriserait pas qu'eux : elle autoriserait TOUT script
// inline, y compris celui qu'un tiers parviendrait à injecter — c'est-à-dire
// exactement ce contre quoi elle est posée.
//
// La bonne réponse est le hachage : `'sha256-…'` autorise CE script-là, au
// caractère près. Une modification du gabarit change le hachage, et ce script
// le recalcule au build. Écrit à la main, il serait faux au premier commit qui
// touche le gabarit — et la panne serait un site blanc.
//
// ⚠️ `script-src` ABSENTE N'EST PAS UNE POLITIQUE PLUS SOUPLE. Un script
// qu'elle ne couvre pas retombe sur `default-src`, qui vaut 'self' — donc ni
// inline, ni origine tierce. L'omission applique la politique la PLUS dure, et
// c'est la seule qu'on n'aura pas relue.
//
// ⚠️ PAS DE `'strict-dynamic'` sans nonce. Elle DÉSACTIVE les sources par hôte,
// `'self'` compris : le bundle applicatif, chargé par une balise statique sans
// nonce ni `integrity`, serait bloqué. Le HTML pré-rendu s'afficherait
// normalement et rien ne le montrerait.
import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { hachagesInline } from '@adsim/primitives';

const racine = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(racine, 'dist');

/**
 * Origines tierces réellement chargées par le site.
 *
 * Toute origine absente d'ici sera bloquée. Ajouter une intégration au site,
 * c'est ajouter son origine ici — et c'est bien le but : cette liste est le
 * seul endroit où l'on décide qui a le droit de s'exécuter dans l'origine du
 * site.
 */
const ORIGINES = {
  script: [],
  // Tailwind et les composants posent des styles inline ; Google Fonts sert la feuille.
  style: ["'unsafe-inline'", 'https://fonts.googleapis.com'],
  font: ['https://fonts.gstatic.com'],
  // Médias de l'admin (Supabase Storage) et images d'illustration du contenu.
  image: ['https://hxgfakegwewcfkxvltgl.supabase.co', 'https://images.pexels.com', 'https://via.placeholder.com'],
  // API Supabase : session admin, aperçu, écriture depuis l'admin, fonction d'envoi des RDV.
  connexion: ['https://hxgfakegwewcfkxvltgl.supabase.co'],
  // Prise de rendez-vous myconsultation.be, vidéo YouTube (blocs de contenu).
  // Pas de carte Google Maps intégrée (décision du 28/09/2026).
  cadre: ['https://www.myconsultation.be', 'https://www.youtube.com'],
};

async function main() {
  if (!existsSync(distDir)) throw new Error('dist/ introuvable — lance le build avant.');

  // Les scripts inline viennent tous du gabarit, donc sont identiques sur
  // toutes les pages. On balaye quand même les trois documents produits hors
  // pré-rendu : ils pourraient diverger.
  const hachages = new Set();
  for (const nom of ['index.html', 'app.html', '404.html']) {
    const c = path.join(distDir, nom);
    if (existsSync(c)) for (const h of hachagesInline(await readFile(c, 'utf-8'))) hachages.add(h);
  }

  const scriptSrc = ["'self'", ...[...hachages].sort(), ...ORIGINES.script].join(' ');

  const appliquee = [
    "default-src 'self'",
    ['style-src', "'self'", ...ORIGINES.style].filter(Boolean).join(' '),
    ['font-src', "'self'", ...ORIGINES.font, 'data:'].filter(Boolean).join(' '),
    `img-src 'self' data: blob:${ORIGINES.image.length ? ` ${ORIGINES.image.join(' ')}` : ''}`,
    `connect-src 'self'${ORIGINES.connexion.length ? ` ${ORIGINES.connexion.join(' ')}` : ''}`,
    ...(ORIGINES.cadre.length ? [`frame-src ${ORIGINES.cadre.join(' ')}`] : []),
    // Les quatre qui ne peuvent rien casser et qui protègent réellement.
    "object-src 'none'",
    "base-uri 'self'",
    // La soumission reste sur le site : sans elle, un script qui repointe un
    // formulaire exfiltre ce que la personne y a saisi, sans que rien ne le
    // lui montre.
    "form-action 'self'",
    "frame-ancestors 'none'",
    'upgrade-insecure-requests',
    `script-src ${scriptSrc}`,
    // Déclarée explicitement plutôt que laissée retomber sur `script-src` : le
    // repli est correct, mais il rend le diagnostic indirect.
    `script-src-elem ${scriptSrc}`,
  ];

  // Le Report-Only ne porte QUE ce qui est en observation, et JAMAIS une
  // directive que le mode rapport ignore — `upgrade-insecure-requests`,
  // `frame-ancestors` et `sandbox` y produisent un avertissement console à
  // chaque page, pour un effet nul.
  const rapport = ["require-trusted-types-for 'script'"];

  // ⚠️ TOUS les commentaires sont en DÉBUT DE LIGNE. L'hébergeur lit ce fichier
  // ligne à ligne : à l'intérieur d'un bloc de chemin, une ligne indentée est
  // un EN-TÊTE, pas un commentaire.
  const entetes = `# GÉNÉRÉ par scripts/generer-entetes.mjs — ne pas éditer à la main.
#
# Les hachages correspondent aux scripts inline de dist/index.html tel qu'il
# vient d'être construit. Modifier le gabarit sans relancer le build produit
# une CSP qui bloque le site.

/*
  Content-Security-Policy: ${appliquee.join('; ')}
  Content-Security-Policy-Report-Only: ${rapport.join('; ')}
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Cross-Origin-Opener-Policy: same-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()

/assets/*
  Cache-Control: public, max-age=31536000, immutable
`;

  await writeFile(path.join(distDir, '_headers'), entetes, 'utf-8');
  console.log(`  en-têtes : ${hachages.size} script(s) inline haché(s), script-src appliquée.`);
}

main().catch((e) => { console.error('  ✗ génération des en-têtes :', e?.message || e); process.exit(1); });
