-- ============================================================
-- TECH AVINYA - SUPABASE DATABASE SCHEMA
-- Run this in your Supabase project's SQL Editor (supabase.com/dashboard)
-- ============================================================

-- 1. REGISTRATIONS / ENROLLMENTS TABLE
CREATE TABLE IF NOT EXISTS public.registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id VARCHAR(100) NOT NULL,
    event_title VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    college VARCHAR(255) NOT NULL,
    roll_number VARCHAR(50),
    team_name VARCHAR(255),
    team_members JSONB DEFAULT '[]'::jsonb,
    in_game_id VARCHAR(100),
    note TEXT,
    screenshot_url TEXT,
    status VARCHAR(50) DEFAULT 'Pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast lookups by event and status
CREATE INDEX IF NOT EXISTS idx_registrations_event_id ON public.registrations (event_id);
CREATE INDEX IF NOT EXISTS idx_registrations_status ON public.registrations (status);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON public.registrations (created_at DESC);

-- 2. SPONSOR INQUIRIES ("CONNECT WITH US") TABLE
CREATE TABLE IF NOT EXISTS public.sponsor_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    website VARCHAR(255),
    tier VARCHAR(100) NOT NULL,
    message TEXT,
    status VARCHAR(50) DEFAULT 'New', -- 'New', 'Contacted', 'Confirmed', 'Declined'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for sponsor inquiries
CREATE INDEX IF NOT EXISTS idx_sponsors_tier ON public.sponsor_inquiries (tier);
CREATE INDEX IF NOT EXISTS idx_sponsors_status ON public.sponsor_inquiries (status);
CREATE INDEX IF NOT EXISTS idx_sponsors_created_at ON public.sponsor_inquiries (created_at DESC);

-- 3. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sponsor_inquiries ENABLE ROW LEVEL SECURITY;

-- 4. RLS POLICIES FOR REGISTRATIONS
-- Allow anyone (public / backend) to submit registrations
DROP POLICY IF EXISTS "Allow public insert to registrations" ON public.registrations;
CREATE POLICY "Allow public insert to registrations" 
ON public.registrations 
FOR INSERT 
WITH CHECK (true);

-- Allow service_role or full read access for backend
DROP POLICY IF EXISTS "Allow full access to registrations" ON public.registrations;
CREATE POLICY "Allow full access to registrations" 
ON public.registrations 
FOR ALL 
USING (true)
WITH CHECK (true);

-- 5. RLS POLICIES FOR SPONSOR INQUIRIES
-- Allow anyone to submit sponsor inquiries
DROP POLICY IF EXISTS "Allow public insert to sponsor_inquiries" ON public.sponsor_inquiries;
CREATE POLICY "Allow public insert to sponsor_inquiries" 
ON public.sponsor_inquiries 
FOR INSERT 
WITH CHECK (true);

-- Allow full access for backend
DROP POLICY IF EXISTS "Allow full access to sponsor_inquiries" ON public.sponsor_inquiries;
CREATE POLICY "Allow full access to sponsor_inquiries" 
ON public.sponsor_inquiries 
FOR ALL 
USING (true)
WITH CHECK (true);

-- 6. STORAGE BUCKET FOR PAYMENT SCREENSHOTS (OPTIONAL/RECOMMENDED)
-- Create bucket 'payment-proofs' if storage schema is available
INSERT INTO storage.buckets (id, name, public)
VALUES ('payment-proofs', 'payment-proofs', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage policies for payment-proofs bucket
DROP POLICY IF EXISTS "Public can upload payment proofs" ON storage.objects;
CREATE POLICY "Public can upload payment proofs"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'payment-proofs');

DROP POLICY IF EXISTS "Public can view payment proofs" ON storage.objects;
CREATE POLICY "Public can view payment proofs"
ON storage.objects FOR SELECT
USING (bucket_id = 'payment-proofs');
