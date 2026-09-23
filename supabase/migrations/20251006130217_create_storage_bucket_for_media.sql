/*
  # Storage Bucket for Media Files

  1. Storage Setup
    - Create a public storage bucket named 'media'
    - Configure bucket for public access
    - Set up policies for file upload and access
  
  2. Security
    - Authenticated users can upload files
    - Everyone can view public files
    - File size and type restrictions
*/

-- Create storage bucket for media files
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'media',
  'media',
  true,
  10485760,
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload media files"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'media');

-- Allow authenticated users to update their files
CREATE POLICY "Authenticated users can update media files"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'media')
WITH CHECK (bucket_id = 'media');

-- Allow authenticated users to delete files
CREATE POLICY "Authenticated users can delete media files"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'media');

-- Allow public read access to all media files
CREATE POLICY "Public can view media files"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'media');
