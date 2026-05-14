-- Migration: insert 'Makanan' category

-- Adds a 'Makanan' category if it doesn't already exist.
-- Uses gen_random_uuid() to generate id when supported by the DB (Postgres + pgcrypto),
-- otherwise the DB should provide a default or you can replace with a fixed uuid.

INSERT INTO public.categories (id, name, description, created_at)
VALUES (
  gen_random_uuid(),
  'Makanan',
  'Menu makanan / cemilan dan makanan berat',
  now()
)
ON CONFLICT (name) DO NOTHING;
