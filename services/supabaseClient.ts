import { createClient } from '@supabase/supabase-js';

// Use placeholders to prevent crash during initialization if env vars are missing.
// This allows the app to render a "Setup Required" screen instead of a white screen error.
const supabaseUrl = process.env.SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'placeholder';

// Check if the variables are actually present for UI logic
export const isConfigured = 
  !!process.env.SUPABASE_URL && 
  !!process.env.SUPABASE_ANON_KEY && 
  process.env.SUPABASE_URL.length > 0;

if (!isConfigured) {
  console.warn("Supabase is not configured. Using placeholder values.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);