-- Add missing columns for soft delete functionality
ALTER TABLE public.proposals 
ADD COLUMN IF NOT EXISTS is_deleted boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS deletion_reason text;
