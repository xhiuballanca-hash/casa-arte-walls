ALTER TABLE public.inquiries ALTER COLUMN email DROP NOT NULL;
ALTER TABLE public.inquiries ADD COLUMN IF NOT EXISTS city text;