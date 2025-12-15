-- 1. Enable Row Level Security on the proposals table
ALTER TABLE public.proposals ENABLE ROW LEVEL SECURITY;

-- 2. Policy to allow Admins to UPDATE any proposal
-- This assumes you have a 'profiles' table with a 'role' column.
CREATE POLICY "Admins can update proposals"
ON public.proposals
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- 3. Policy to allow Admins to DELETE proposals (if you use hard deletes)
CREATE POLICY "Admins can delete proposals"
ON public.proposals
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- 4. CRITICAL FIX: Update the Status Check Constraint
-- Your current table definition restricts status to ['Proposed', 'Under Review', 'Adopted', 'Rejected'].
-- The admin dashboard tries to set status to 'Approved' and 'Removed', which would fail without this change.

ALTER TABLE public.proposals DROP CONSTRAINT IF EXISTS proposals_status_check;

ALTER TABLE public.proposals ADD CONSTRAINT proposals_status_check CHECK (
  status = ANY (ARRAY[
    'Proposed'::text,
    'Under Review'::text,
    'Adopted'::text,
    'Rejected'::text,
    'Approved'::text,  -- Added
    'Removed'::text    -- Added
  ])
);

-- 5. (Optional) Ensure Admins can Select/Read all proposals
CREATE POLICY "Admins can read all proposals"
ON public.proposals
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);
