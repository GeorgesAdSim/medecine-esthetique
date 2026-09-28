// POST /.netlify/functions/publier — relance le build de production.
//
// Le site public est pré-rendu à partir du contenu publié : une modification
// faite dans l'admin n'apparaît qu'après un nouveau build. Cette fonction le
// déclenche, et seulement pour un administrateur :
//   1. jeton de session Supabase (Authorization: Bearer …) → utilisateur ;
//   2. rpc is_admin() avec ce même jeton (règle de la migration RLS) ;
//   3. appel du build hook Netlify, dont l'URL reste côté serveur.
//
// Variable Netlify : NETLIFY_BUILD_HOOK_URL (secret, portée « Functions »).
// L'URL et la clé PUBLIQUE (anon) de Supabase sont reprises ici : les
// variables de [build.environment] de netlify.toml n'existent qu'au build,
// pas à l'exécution des fonctions. Ce ne sont pas des secrets (elles sont
// déjà dans le JavaScript du site).
const SUPABASE_URL = 'https://hxgfakegwewcfkxvltgl.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4Z2Zha2Vnd2V3Y2ZreHZsdGdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NTIyOTQsImV4cCI6MjA3NTMyODI5NH0.ikzj4r0C564KNnkHrS9LflxEp7ZDJVE6QoU4cJpVoQs';
const json = (statut, corps) => new Response(JSON.stringify(corps), {
  status: statut,
  headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
});

export default async (req) => {
  if (req.method !== 'POST') return json(405, { erreur: 'Méthode non autorisée' });

  const url = process.env.VITE_SUPABASE_URL || SUPABASE_URL;
  const cle = process.env.VITE_SUPABASE_ANON_KEY || SUPABASE_ANON_KEY;
  const hook = process.env.NETLIFY_BUILD_HOOK_URL;

  const jeton = (req.headers.get('authorization') || '').replace(/^Bearer\s+/i, '');
  if (!jeton) return json(401, { erreur: 'Connexion requise' });
  if (!hook) return json(500, { erreur: 'Publication non configurée (NETLIFY_BUILD_HOOK_URL)' });

  const entetes = { apikey: cle, Authorization: `Bearer ${jeton}` };
  const utilisateur = await fetch(`${url}/auth/v1/user`, { headers: entetes });
  if (!utilisateur.ok) return json(401, { erreur: 'Session invalide ou expirée' });

  const admin = await fetch(`${url}/rest/v1/rpc/is_admin`, {
    method: 'POST',
    headers: { ...entetes, 'content-type': 'application/json' },
    body: '{}',
  });
  if (!admin.ok || (await admin.json()) !== true) return json(403, { erreur: 'Réservé aux administrateurs' });

  const build = await fetch(hook, { method: 'POST' });
  if (!build.ok) return json(502, { erreur: 'Le build n’a pas pu être lancé' });

  return json(202, { ok: true, message: 'Publication lancée : le site sera à jour dans 2 à 3 minutes.' });
};
