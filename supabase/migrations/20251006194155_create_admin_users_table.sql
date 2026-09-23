/*
  # Create Admin Users Authentication System

  1. New Tables
    - `admin_users`
      - `id` (uuid, primary key) - Unique identifier for each admin
      - `email` (text, unique) - Admin email address
      - `name` (text) - Admin full name
      - `role` (text) - Role: 'super_admin' or 'admin'
      - `is_active` (boolean) - Account status
      - `created_at` (timestamptz) - Account creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp
      - `last_login` (timestamptz) - Last successful login timestamp

  2. Security
    - Enable RLS on `admin_users` table
    - Add policy for authenticated users to read only their own data
    - Only users with valid Supabase auth session can access
    - Email addresses are whitelisted and must match Supabase auth users

  3. Important Notes
    - This table works with Supabase Auth
    - Only the three authorized email addresses can be admins
    - Passwords are managed through Supabase Auth, not stored here
*/

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  role text NOT NULL DEFAULT 'admin',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  last_login timestamptz,
  CONSTRAINT valid_role CHECK (role IN ('super_admin', 'admin')),
  CONSTRAINT valid_email CHECK (
    email IN (
      'doc.jofassotte@proximus.be',
      'valeriematrige@gmail.com',
      'valerie@fassotte.be'
    )
  )
);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policy: Authenticated users can read only their own data
CREATE POLICY "Admins can read own data"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = email);

-- Policy: Only super_admins can insert new admins
CREATE POLICY "Super admins can create admins"
  ON admin_users
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = auth.jwt() ->> 'email'
      AND role = 'super_admin'
      AND is_active = true
    )
  );

-- Policy: Admins can update their own last_login
CREATE POLICY "Admins can update own last_login"
  ON admin_users
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'email' = email)
  WITH CHECK (auth.jwt() ->> 'email' = email);

-- Policy: Super admins can update any admin
CREATE POLICY "Super admins can update admins"
  ON admin_users
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = auth.jwt() ->> 'email'
      AND role = 'super_admin'
      AND is_active = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = auth.jwt() ->> 'email'
      AND role = 'super_admin'
      AND is_active = true
    )
  );

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);

-- Create index on role for faster role checks
CREATE INDEX IF NOT EXISTS idx_admin_users_role ON admin_users(role);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_admin_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_admin_users_updated_at ON admin_users;
CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION update_admin_updated_at();