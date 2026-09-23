/*
  # Create custom_treatments table

  1. New Tables
    - `custom_treatments`
      - `id` (uuid, primary key)
      - `slug` (text, unique) - URL slug for the treatment page
      - `title` (text) - Treatment title
      - `subtitle` (text) - Short subtitle
      - `description` (text) - Detailed description
      - `content` (jsonb) - Structured content blocks
      - `duration` (text) - Treatment duration
      - `meta_title` (text) - SEO meta title
      - `meta_description` (text) - SEO meta description
      - `featured_image` (text) - Main image URL
      - `gallery_images` (jsonb) - Array of gallery images
      - `related_treatments` (jsonb) - Array of related treatment slugs
      - `is_active` (boolean) - Whether the treatment is published
      - `display_order` (integer) - Order in treatment lists
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `custom_treatments` table
    - Add policy for public read access to active treatments
    - Add policy for authenticated admin users to manage treatments
*/

CREATE TABLE IF NOT EXISTS custom_treatments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  subtitle text,
  description text,
  content jsonb DEFAULT '[]'::jsonb,
  duration text,
  meta_title text,
  meta_description text,
  featured_image text,
  gallery_images jsonb DEFAULT '[]'::jsonb,
  related_treatments jsonb DEFAULT '[]'::jsonb,
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE custom_treatments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active treatments"
  ON custom_treatments
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can view all treatments"
  ON custom_treatments
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert treatments"
  ON custom_treatments
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update treatments"
  ON custom_treatments
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete treatments"
  ON custom_treatments
  FOR DELETE
  TO authenticated
  USING (true);

-- Insert initial treatment data
INSERT INTO custom_treatments (slug, title, subtitle, description, duration, meta_title, meta_description, display_order, is_active)
VALUES
  (
    '/acide-hyaluronique-liege',
    'Acide hyaluronique',
    'Restauration des volumes et hydratation profonde',
    'L''acide hyaluronique est une molécule naturellement présente dans notre peau qui permet de restaurer les volumes, combler les rides et hydrater la peau en profondeur.',
    '6-18 mois',
    'Injections Acide Hyaluronique à Liège | Dr Fassotte',
    'Traitement par acide hyaluronique à Liège. Restauration des volumes, comblement des rides, hydratation profonde. Résultats naturels et harmonieux.',
    1,
    true
  ),
  (
    '/toxine-botulique-liege',
    'Toxine botulique (Botox)',
    'Relaxation musculaire pour atténuer les rides',
    'La toxine botulique permet de relaxer les muscles responsables des rides d''expression pour un visage plus détendu et reposé.',
    '4-6 mois',
    'Botox à Liège | Toxine Botulique | Dr Fassotte',
    'Injections de toxine botulique (Botox) à Liège. Atténuation des rides d''expression, résultats naturels. Consultez le Dr Fassotte.',
    2,
    true
  ),
  (
    '/peelings-chimiques-liege',
    'Peelings médicaux',
    'Exfoliation contrôlée pour renouveler la peau',
    'Les peelings chimiques permettent d''exfolier la peau en profondeur pour stimuler le renouvellement cellulaire et améliorer la qualité de la peau.',
    'Variable',
    'Peelings Chimiques à Liège | Dr Fassotte',
    'Peelings médicaux à Liège. Exfoliation contrôlée, renouvellement de la peau, traitement des imperfections. Cabinet du Dr Fassotte.',
    3,
    true
  ),
  (
    '/mesotherapie-liege',
    'Mésolift',
    'Cocktail de vitamines et acides aminés',
    'Le mésolift consiste en l''injection de micro-doses de vitamines, minéraux et acides aminés pour revitaliser et hydrater la peau en profondeur.',
    '3-6 mois',
    'Mésolift à Liège | Mésothérapie Visage | Dr Fassotte',
    'Mésolift et mésothérapie du visage à Liège. Revitalisation, hydratation profonde, éclat du teint. Dr Fassotte, médecine esthétique.',
    4,
    true
  ),
  (
    '/lifting-fils-tenseurs-liege',
    'Fils tenseurs',
    'Lifting naturel sans chirurgie',
    'Les fils tenseurs permettent de retendre et repositionner les tissus du visage de manière naturelle, sans chirurgie, pour un effet lifting immédiat.',
    '12-18 mois',
    'Fils Tenseurs à Liège | Lifting sans Chirurgie | Dr Fassotte',
    'Pose de fils tenseurs à Liège. Lifting naturel sans chirurgie, retension des tissus, résultats immédiats. Cabinet Dr Fassotte.',
    5,
    true
  ),
  (
    '/cosmetologie-medicale-liege',
    'Cosmétologie médicale',
    'Conseils personnalisés et soins adaptés',
    'La cosmétologie médicale associe des soins cosmétiques de haute qualité à une expertise médicale pour des conseils personnalisés adaptés à votre type de peau.',
    'Permanent',
    'Cosmétologie Médicale à Liège | Dr Fassotte',
    'Cosmétologie médicale à Liège. Conseils personnalisés, soins adaptés à votre peau, produits de qualité médicale. Dr Fassotte.',
    6,
    true
  ),
  (
    '/stimulateurs-collagene-liege',
    'Stimulateurs de collagène',
    'Stimulation naturelle du collagène',
    'Les stimulateurs de collagène activent la production naturelle de collagène de votre peau pour un rajeunissement progressif et durable.',
    '18-24 mois',
    'Stimulateurs de Collagène à Liège | Dr Fassotte',
    'Injections de stimulateurs de collagène à Liège. Stimulation naturelle, rajeunissement progressif, résultats durables. Dr Fassotte.',
    7,
    true
  ),
  (
    '/rajeunissement-global-liege',
    'Liquid Lift',
    'Rajeunissement global du visage',
    'Le liquid lift est une technique globale combinant plusieurs injections stratégiques pour un rajeunissement harmonieux de l''ensemble du visage.',
    '12-18 mois',
    'Liquid Lift à Liège | Rajeunissement Global | Dr Fassotte',
    'Liquid lift à Liège. Rajeunissement global par injections stratégiques, résultats harmonieux et naturels. Cabinet Dr Fassotte.',
    8,
    true
  )
ON CONFLICT (slug) DO NOTHING;
