/*
  # Fix infinite recursion in admin_users policies

  1. Problem
    - Current policies check admin_users table to verify permissions
    - This creates infinite recursion: to read admin_users, we need to read admin_users
  
  2. Solution
    - Drop existing recursive policies
    - Create simpler policies that use auth.uid() directly
    - Authenticated users can read their own data by matching auth.uid()
    - No complex subqueries that reference the same table
  
  3. Security
    - Users can only access their own admin record
    - No recursive checks needed
    - Insert/delete operations restricted (only via server/admin tools)
*/

-- Drop all existing policies on admin_users
DROP POLICY IF EXISTS "Admins can read own data" ON admin_users;
DROP POLICY IF EXISTS "Admins can manage own data" ON admin_users;
DROP POLICY IF EXISTS "Super admins can manage all admins" ON admin_users;
DROP POLICY IF EXISTS "Super admins can create admins" ON admin_users;

-- Create simple, non-recursive policies
-- Allow authenticated users to read their own admin record
CREATE POLICY "Users can read own admin record"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Allow authenticated users to update their own last_login
CREATE POLICY "Users can update own last_login"
  ON admin_users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Note: INSERT and DELETE are not allowed via RLS
-- These operations should only be done by superadmin via direct DB access
