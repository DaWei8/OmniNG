-- 1. Setup User Roles
-- First, creating an enum for roles creates a structured way to handle permissions
CREATE TYPE user_role AS ENUM ('user', 'admin');

-- Add role to your existing profiles table
ALTER TABLE profiles 
ADD COLUMN role user_role DEFAULT 'user';

-- 2. News Table
CREATE TABLE news (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT,
  content TEXT NOT NULL,
  image_url TEXT,
  author_id UUID REFERENCES auth.users NOT NULL,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS for News
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- News Policies
CREATE POLICY "Public can read news" 
  ON news FOR SELECT 
  USING (true);

CREATE POLICY "Admins can insert news" 
  ON news FOR INSERT 
  WITH CHECK (
    exists (
      select 1 from profiles 
      where id = auth.uid() 
      and role = 'admin'
    )
  );

CREATE POLICY "Admins can update news" 
  ON news FOR UPDATE 
  USING (
    exists (
      select 1 from profiles 
      where id = auth.uid() 
      and role = 'admin'
    )
  );

CREATE POLICY "Admins can delete news" 
  ON news FOR DELETE 
  USING (
    exists (
      select 1 from profiles 
      where id = auth.uid() 
      and role = 'admin'
    )
  );

-- 3. Update Proposals Table for Admin Moderation
-- Add fields to handle "Soft Delete" and status
ALTER TABLE proposals 
ADD COLUMN is_deleted BOOLEAN DEFAULT false,
ADD COLUMN deletion_reason TEXT,
ADD COLUMN admin_notes TEXT;

-- Update Proposals Policies
-- Ensure Admins can update any proposal (to approve or censor)
CREATE POLICY "Admins can update any proposal" 
  ON proposals FOR UPDATE 
  USING (
    exists (
      select 1 from profiles 
      where id = auth.uid() 
      and role = 'admin'
    )
  );

-- 4. Solutions Table
CREATE TABLE solutions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  proposal_id UUID REFERENCES proposals(id), -- Optional: Link solution to a citizen proposal
  status TEXT DEFAULT 'Proposed', -- 'Proposed', 'In Progress', 'Implemented'
  author_id UUID REFERENCES auth.users NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS for Solutions
ALTER TABLE solutions ENABLE ROW LEVEL SECURITY;

-- Solutions Policies
CREATE POLICY "Public can read solutions" 
  ON solutions FOR SELECT 
  USING (true);

CREATE POLICY "Admins can manage solutions" 
  ON solutions FOR ALL 
  USING (
    exists (
      select 1 from profiles 
      where id = auth.uid() 
      and role = 'admin'
    )
  );

-- 5. Helper Function to Check Admin (Optional, for easier SQL calls)
CREATE OR REPLACE FUNCTION is_admin() 
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
