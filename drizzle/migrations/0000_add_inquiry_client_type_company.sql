ALTER TABLE public.inquiries
  ADD COLUMN IF NOT EXISTS company text,
  ADD COLUMN IF NOT EXISTS client_type text;