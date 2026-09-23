/*
  # Add valerie@adsim.fr as authorized admin and create user

  1. Security Changes
    - Update email constraint to include valerie@adsim.fr
    - Creates admin user in auth.users with email valerie@adsim.fr
    - Adds entry to admin_users table with super_admin role
    
  2. Important Notes
    - Password is securely hashed
    - User has full admin privileges
    - Email is confirmed automatically
*/

-- Update the email constraint to include valerie@adsim.fr
ALTER TABLE admin_users DROP CONSTRAINT IF EXISTS valid_email;

ALTER TABLE admin_users ADD CONSTRAINT valid_email CHECK (
  email IN (
    'doc.jofassotte@proximus.be',
    'valeriematrige@gmail.com',
    'valerie@fassotte.be',
    'valerie@adsim.fr'
  )
);

-- Insert user into auth.users and admin_users
DO $$
DECLARE
  new_user_id uuid;
  existing_user_id uuid;
BEGIN
  -- Check if user already exists
  SELECT id INTO existing_user_id FROM auth.users WHERE email = 'valerie@adsim.fr';
  
  IF existing_user_id IS NULL THEN
    -- Generate a new UUID for the user
    new_user_id := gen_random_uuid();
    
    -- Insert into auth.users
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      recovery_sent_at,
      last_sign_in_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token
    )
    VALUES (
      '00000000-0000-0000-0000-000000000000',
      new_user_id,
      'authenticated',
      'authenticated',
      'valerie@adsim.fr',
      crypt('AdSim2025', gen_salt('bf')),
      NOW(),
      NOW(),
      NOW(),
      '{"provider":"email","providers":["email"]}',
      '{}',
      NOW(),
      NOW(),
      '',
      '',
      '',
      ''
    );
  ELSE
    -- Use existing user ID and update password
    new_user_id := existing_user_id;
    UPDATE auth.users
    SET encrypted_password = crypt('AdSim2025', gen_salt('bf')),
        updated_at = NOW()
    WHERE id = existing_user_id;
  END IF;

  -- Insert or update in admin_users table
  INSERT INTO public.admin_users (
    id,
    email,
    name,
    role,
    is_active,
    created_at,
    updated_at
  )
  VALUES (
    new_user_id,
    'valerie@adsim.fr',
    'Valérie',
    'super_admin',
    true,
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE SET
    role = 'super_admin',
    is_active = true,
    updated_at = NOW();
END $$;
