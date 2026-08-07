import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Yeh client aap browser/client components mein use karenge
export const createClient = () =>
  createBrowserClient(supabaseUrl, supabaseAnonKey)