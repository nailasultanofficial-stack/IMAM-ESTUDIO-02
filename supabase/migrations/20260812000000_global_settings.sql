CREATE TABLE IF NOT EXISTS public.global_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS Policies
ALTER TABLE public.global_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to global_settings" 
ON public.global_settings 
FOR SELECT 
TO public 
USING (true);

CREATE POLICY "Allow admins to modify global_settings" 
ON public.global_settings 
FOR ALL 
TO public 
USING (public.is_admin());

-- Insert defaults
INSERT INTO public.global_settings (key, value) VALUES
('site_config', '{
  "name": "MALIK JAHANZAIB",
  "founder": "Malik Jahanzaib",
  "role": "Senior Full-Stack Engineer & UI/UX Architect",
  "handle": "@jahanzeb1809",
  "whatsapp": "923091925177",
  "email": "malikshahzaib1809@gmail.com",
  "rating": "5.0",
  "fiverrReviews": 1,
  "location": "Pakistan",
  "languages": ["English", "Urdu"]
}'::jsonb),
('nav_links', '[
  { "label": "Home", "to": "/" },
  { "label": "Work", "to": "/work" },
  { "label": "Capabilities", "to": "/services" },
  { "label": "About", "to": "/about" },
  { "label": "Process", "to": "/process" }
]'::jsonb)
ON CONFLICT (key) DO NOTHING;
