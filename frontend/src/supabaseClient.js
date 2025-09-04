import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

console.log('DEBUG: REACT_APP_SUPABASE_URL =', supabaseUrl);
console.log('DEBUG: REACT_APP_SUPABASE_ANON_KEY =', supabaseAnonKey);
console.log('DEBUG: REACT_APP_SITE_URL =', process.env.REACT_APP_SITE_URL);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
