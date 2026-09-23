/*
  # Create Brevo Configuration Table

  1. New Tables
    - `brevo_config`
      - `id` (integer, primary key) - Single row configuration
      - `api_key` (text) - Brevo API key
      - `sender_email` (text) - Brevo sender email
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `brevo_config` table
    - Add policy for service role access only (backend use)
    - This table should only be accessed by Edge Functions

  3. Data
    - Insert initial configuration with Brevo credentials
*/

CREATE TABLE IF NOT EXISTS brevo_config (
  id integer PRIMARY KEY DEFAULT 1,
  api_key text NOT NULL,
  sender_email text NOT NULL,
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT single_row CHECK (id = 1)
);

ALTER TABLE brevo_config ENABLE ROW LEVEL SECURITY;

-- Only service role can access (Edge Functions)
CREATE POLICY "Service role can read brevo config"
  ON brevo_config
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Service role can update brevo config"
  ON brevo_config
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Insert the Brevo configuration
INSERT INTO brevo_config (id, api_key, sender_email)
VALUES (
  1,
  'YOUR_BREVO_API_KEY_HERE',
  'jocelynefassotte5@gmail.com'
)
ON CONFLICT (id) DO UPDATE
SET 
  api_key = EXCLUDED.api_key,
  sender_email = EXCLUDED.sender_email,
  updated_at = now();