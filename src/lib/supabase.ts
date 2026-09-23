import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface SiteSetting {
  id: string;
  key: string;
  value: string;
  type: 'color' | 'text' | 'image' | 'video' | 'json';
  updated_at: string;
  updated_by?: string;
}

export interface CustomPage {
  id: string;
  slug: string;
  title: string;
  content: ContentBlock[];
  meta_description?: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  created_by?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  href: string;
  order_index: number;
  is_visible: boolean;
  parent_id?: string;
  created_at: string;
  updated_at: string;
}

export interface ContentBlock {
  id: string;
  page_id?: string;
  block_type: 'text' | 'image' | 'video' | 'gallery' | 'testimonial';
  content: any;
  order_index: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}
