// Central API configuration for Tech Avinya frontend

const isLocalhost = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

export const API_BASE_URL = 
  import.meta.env.VITE_API_BASE_URL || 
  (isLocalhost ? 'http://localhost:8080' : 'https://tech-avinya-backend.onrender.com');

export const SUPABASE_CONFIG = {
  url: import.meta.env.VITE_SUPABASE_URL || 'https://cgpnvdntkvahxzzwwwke.supabase.co',
  anonKey: import.meta.env.VITE_SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNncG52ZG50a3ZhaHh6end3d2tlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE3NzI4MTMsImV4cCI6MjEwNzM0ODgxM30.qCbodoI2iZfK6tpXbduIEs7p-sRGCHx7PcOxASgDHbM',
};

// --- Resilient Supabase REST Fallback Operations ---
export const fetchDirectFromSupabase = async (tableName) => {
  const url = `${SUPABASE_CONFIG.url}/rest/v1/${tableName}?select=*&order=created_at.desc`;
  const response = await fetch(url, {
    headers: {
      'apikey': SUPABASE_CONFIG.anonKey,
      'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Supabase query error (${response.status})`);
  }

  return response.json();
};

export const updateDirectInSupabase = async (tableName, id, updates) => {
  const url = `${SUPABASE_CONFIG.url}/rest/v1/${tableName}?id=eq.${id}`;
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'apikey': SUPABASE_CONFIG.anonKey,
      'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error(`Supabase update error (${response.status})`);
  }

  return response.json();
};

export const insertDirectToSupabase = async (tableName, record) => {
  const url = `${SUPABASE_CONFIG.url}/rest/v1/${tableName}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_CONFIG.anonKey,
      'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
    },
    body: JSON.stringify(record),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Supabase insert error (${response.status}): ${errorText}`);
  }

  return response.json();
};

export const uploadScreenshotDirect = async (file) => {
  if (!file) return null;
  try {
    const fileExt = file.name ? file.name.split('.').pop() : 'png';
    const fileName = `enrollments/${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const uploadUrl = `${SUPABASE_CONFIG.url}/storage/v1/object/payment-proofs/${fileName}`;

    const res = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_CONFIG.anonKey,
        'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
        'Content-Type': file.type || 'image/png',
      },
      body: file,
    });

    if (res.ok) {
      return `${SUPABASE_CONFIG.url}/storage/v1/object/public/payment-proofs/${fileName}`;
    }
  } catch (e) {
    console.warn('[Direct Storage Upload Warning]', e);
  }

  // Fallback: convert to base64 Data URL so screenshot is always preserved
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  });
};

export default API_BASE_URL;
