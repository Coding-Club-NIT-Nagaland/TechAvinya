import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import ws from 'ws';

dotenv.config();

// Polyfill global WebSocket for Node.js < 22 runtimes (e.g. Render Node 20)
if (typeof globalThis.WebSocket === 'undefined') {
  globalThis.WebSocket = ws;
}

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    '⚠️ [Supabase Warning] SUPABASE_URL or SUPABASE_KEY/SUPABASE_SERVICE_ROLE_KEY is missing from environment variables. Database operations will fail until valid credentials are provided.'
  );
}

export const supabase = (supabaseUrl && supabaseKey)
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
      realtime: {
        transport: ws,
      },
    })
  : null;

export const isSupabaseConfigured = () => Boolean(supabase);
