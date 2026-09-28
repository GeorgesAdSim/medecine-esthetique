#!/usr/bin/env node
// Le lanceur d'audit du projet.
//
// Le projet monte le harnais du socle avec SA configuration, SES règles et SES
// collecteurs. C'est la dernière étape du build : s'il échoue, rien n'est mis
// en ligne.
import path from 'node:path';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { auditer, rendre, resoudreConfig } from '@adsim/seo-audit';
import { REGLES_PROJET } from './src/regles-audit.js';

const AIDE = `
audit — vérification du build avant mise en ligne

  node audit.mjs --racine <dossier du projet> [--json <fichier>] [--strict]
`;

function lireArguments(argv) {
  const o = { racine: process.cwd(), json: null, strict: false, aide: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '-h' || a === '--help') o.aide = true;
    else if (a === '--strict') o.strict = true;
    else if (a === '--json') o.json = argv[++i];
    else if (a === '--racine') o.racine = argv[++i];
    else throw new Error(`option inconnue : « ${a} »`);
  }
  return o;
}

async function main() {
  const o = lireArguments(process.argv.slice(2));
  if (o.aide) { console.log(AIDE); return 0; }

  const racine = path.resolve(o.racine);
  const config = resoudreConfig(JSON.parse(
    await readFile(new URL('./adsim-seo.config.json', import.meta.url), 'utf-8'),
  ));

  const resultat = await auditer({
    racine,
    config,
    reglesProjet: REGLES_PROJET,
    collecteursProjet: [],
  });

  const { texte, json, code } = rendre(resultat, { strict: o.strict });
  (code === 0 ? console.log : console.error)(texte);

  if (o.json) {
    const cible = path.resolve(process.cwd(), o.json);
    await mkdir(path.dirname(cible), { recursive: true });
    await writeFile(cible, `${JSON.stringify(json, null, 2)}\n`, 'utf-8');
  }
  return code;
}

main().then((c) => { process.exitCode = c; })
  .catch((e) => { console.error(`audit : ${e?.message || e}`); process.exitCode = 1; });
