// Sert dist/ comme Netlify, pour vérifier le build en local :
// /page → page.html, règles 301 et 200 de dist/_redirects, 404.html en 404.
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');
const port = Number(process.env.PORT || 4173);
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.xml': 'application/xml', '.txt': 'text/plain', '.json': 'application/json', '.png': 'image/png', '.jpeg': 'image/jpeg', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml' };

const regles = (await readFile(path.join(dist, '_redirects'), 'utf-8'))
  .split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#'))
  .map((l) => { const [de, vers, statut] = l.split(/\s+/); return { de, vers, statut: parseInt(statut, 10) }; });

const existe = async (f) => { try { return (await stat(f)).isFile(); } catch { return false; } };
const envoyer = async (res, f, statut = 200) => {
  res.writeHead(statut, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream' });
  res.end(await readFile(f));
};

http.createServer(async (req, res) => {
  const chemin = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  for (const r of regles) {
    const joker = r.de.endsWith('/*');
    if (chemin === r.de || (joker && chemin.startsWith(r.de.slice(0, -1)))) {
      if (r.statut === 301) { res.writeHead(301, { location: r.vers }); return res.end(); }
      return envoyer(res, path.join(dist, r.vers));
    }
  }
  const brut = path.join(dist, chemin);
  if (await existe(brut)) return envoyer(res, brut);
  if (chemin === '/') return envoyer(res, path.join(dist, 'index.html'));
  if (chemin.endsWith('/') && chemin !== '/') { res.writeHead(301, { location: chemin.replace(/\/+$/, '') }); return res.end(); }
  if (await existe(`${brut}.html`)) return envoyer(res, `${brut}.html`);
  return envoyer(res, path.join(dist, '404.html'), 404);
}).listen(port, () => console.log(`dist/ servi sur http://localhost:${port}`));
