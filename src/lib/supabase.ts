import { createClient } from '@supabase/supabase-js';

// Trinity Express Bus - Supabase Database
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://awowbixrozodsdrovswr.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_6HzovrNTkZ26MSAy3QRMAQ_u-kbvpeY';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase URL or Key. Using defaults.');
}

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);
