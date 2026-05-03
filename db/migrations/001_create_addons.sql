-- Migration: create addons and product_addons tables

-- Create addons table
CREATE TABLE IF NOT EXISTS public.addons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create product_addons join table to associate addons with products (optional)
CREATE TABLE IF NOT EXISTS public.product_addons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL,
  addon_id uuid NOT NULL,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE,
  CONSTRAINT fk_addon FOREIGN KEY (addon_id) REFERENCES public.addons(id) ON DELETE CASCADE
);

-- Example inserts (optional - remove if you seed differently)
INSERT INTO public.addons (name, price) VALUES
('Extra Shot', 5000),
('Whipped Cream', 3000),
('Boba', 5000),
('Jelly', 4000),
('Vanilla Syrup', 3000),
('Hazelnut Syrup', 3000)
ON CONFLICT DO NOTHING;
