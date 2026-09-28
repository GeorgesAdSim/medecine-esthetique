/*
  # Écriture réservée aux administrateurs

  1. Problème
    - Les politiques RLS donnaient INSERT / UPDATE / DELETE à tout rôle
      `authenticated`. Les inscriptions Supabase étant ouvertes (avec
      confirmation automatique), n'importe qui pouvait créer un compte avec la
      clé publique du site et modifier pages, traitements, menu, réglages,
      galerie et médias.
    - Le contrôle « email admin autorisé » n'existait que dans le navigateur.

  2. Correction
    - `public.is_admin()` : vrai si l'utilisateur connecté correspond à une
      ligne active de `admin_users` (par email, comme le fait AuthContext),
      avec un email confirmé. SECURITY DEFINER pour éviter la récursion RLS
      sur admin_users.
    - Pour chaque table éditable : suppression de toutes les politiques
      réservées au rôle authenticated (les lectures publiques anon restent
      intactes), puis recréation lecture/écriture conditionnées à is_admin().
    - Même chose pour le bucket de stockage `media`.

  3. À faire en plus, hors SQL
    - Désactiver les inscriptions (Authentication → Sign In / Providers →
      « Allow new users to sign up »). Sans cela, un compte créé avec l'email
      d'un admin qui n'a jamais activé son accès deviendrait admin.
*/

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, auth
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_users a
    JOIN auth.users u ON lower(u.email) = lower(a.email)
    WHERE u.id = auth.uid()
      AND a.is_active = true
      AND u.email_confirmed_at IS NOT NULL
  );
$$;

REVOKE ALL ON FUNCTION public.is_admin() FROM public;
GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated;

DO $$
DECLARE
  t text;
  pol record;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'custom_pages', 'custom_treatments', 'menu_items', 'site_settings',
    'gallery_images', 'media'
  ]
  LOOP
    IF to_regclass('public.' || t) IS NULL THEN
      RAISE NOTICE 'Table % absente, ignorée', t;
      CONTINUE;
    END IF;

    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);

    -- Supprime toute politique qui ne s'adresse pas aussi au public (anon/public) :
    -- ce sont les politiques « authenticated » trop larges.
    FOR pol IN
      SELECT policyname FROM pg_policies
      WHERE schemaname = 'public' AND tablename = t
        AND NOT ('anon' = ANY (roles) OR 'public' = ANY (roles))
    LOOP
      EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', pol.policyname, t);
    END LOOP;

    EXECUTE format('CREATE POLICY "Admins read all" ON public.%I FOR SELECT TO authenticated USING (public.is_admin())', t);
    EXECUTE format('CREATE POLICY "Admins insert" ON public.%I FOR INSERT TO authenticated WITH CHECK (public.is_admin())', t);
    EXECUTE format('CREATE POLICY "Admins update" ON public.%I FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin())', t);
    EXECUTE format('CREATE POLICY "Admins delete" ON public.%I FOR DELETE TO authenticated USING (public.is_admin())', t);
  END LOOP;
END $$;

-- Politiques publiques en écriture éventuellement présentes (ne devraient pas exister)
DO $$
DECLARE pol record;
BEGIN
  FOR pol IN
    SELECT tablename, policyname FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename IN ('custom_pages','custom_treatments','menu_items','site_settings','gallery_images','media')
      AND cmd <> 'SELECT'
      AND ('anon' = ANY (roles) OR 'public' = ANY (roles))
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', pol.policyname, pol.tablename);
  END LOOP;
END $$;

-- Stockage : bucket media
DROP POLICY IF EXISTS "Authenticated users can upload media files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update media files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete media files" ON storage.objects;
DROP POLICY IF EXISTS "Admins upload media files" ON storage.objects;
DROP POLICY IF EXISTS "Admins update media files" ON storage.objects;
DROP POLICY IF EXISTS "Admins delete media files" ON storage.objects;

CREATE POLICY "Admins upload media files" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'media' AND public.is_admin());

CREATE POLICY "Admins update media files" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'media' AND public.is_admin())
  WITH CHECK (bucket_id = 'media' AND public.is_admin());

CREATE POLICY "Admins delete media files" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'media' AND public.is_admin());
