-- ============================================================
-- IMAM ESTUDIO OS — core schema, hardened RBAC, RLS
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ---------- shared helpers ----------
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- ---------- roles ----------
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'app_role') THEN
    CREATE TYPE public.app_role AS ENUM ('owner','admin','editor','operations','viewer');
  END IF;
END
$$;

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL DEFAULT '',
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  granted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
CREATE INDEX IF NOT EXISTS user_roles_user_id_idx ON public.user_roles(user_id);

-- security-definer role predicates (no recursion into RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE OR REPLACE FUNCTION public.has_any_role(_user_id UUID, _roles public.app_role[])
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = ANY(_roles));
$$;

CREATE OR REPLACE FUNCTION public.is_owner()
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT public.has_role(auth.uid(), 'owner');
$$;

CREATE OR REPLACE FUNCTION public.is_staff()
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid());
$$;

-- content: owner, admin, editor
CREATE OR REPLACE FUNCTION public.can_manage_content()
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT public.has_any_role(auth.uid(), ARRAY['owner','admin','editor']::public.app_role[]);
$$;

-- operations: owner, admin, operations
CREATE OR REPLACE FUNCTION public.can_manage_ops()
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT public.has_any_role(auth.uid(), ARRAY['owner','admin','operations']::public.app_role[]);
$$;

-- can see content in the admin regardless of published state
CREATE OR REPLACE FUNCTION public.can_read_content()
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT public.has_any_role(auth.uid(), ARRAY['owner','admin','editor','viewer']::public.app_role[]);
$$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT public.has_any_role(auth.uid(), ARRAY['owner','admin']::public.app_role[]);
$$;

-- ---------- content tables ----------
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gig_id TEXT UNIQUE,
  title TEXT NOT NULL CHECK (length(btrim(title)) > 0),
  slug TEXT NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  category TEXT NOT NULL DEFAULT 'Engineering',
  short_description TEXT NOT NULL DEFAULT '',
  full_description TEXT NOT NULL DEFAULT '',
  starting_price NUMERIC(10,2) CHECK (starting_price IS NULL OR starting_price >= 0),
  hourly_rate NUMERIC(10,2) DEFAULT 18.00 CHECK (hourly_rate IS NULL OR hourly_rate >= 0),
  features TEXT[] NOT NULL DEFAULT '{}',
  tech_stack TEXT[] NOT NULL DEFAULT '{}',
  image_url TEXT,
  cta_label TEXT NOT NULL DEFAULT 'Discuss project',
  is_featured BOOLEAN NOT NULL DEFAULT true,
  is_published BOOLEAN NOT NULL DEFAULT true,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS services_pub_order_idx ON public.services(is_published, display_order);

CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gig_id TEXT UNIQUE,
  title TEXT NOT NULL CHECK (length(btrim(title)) > 0),
  slug TEXT NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  category TEXT NOT NULL DEFAULT 'Engineering',
  client_name TEXT,
  description TEXT NOT NULL DEFAULT '',
  outcomes TEXT[] NOT NULL DEFAULT '{}',
  tags TEXT[] NOT NULL DEFAULT '{}',
  thumbnail_url TEXT NOT NULL,
  gallery_urls TEXT[] NOT NULL DEFAULT '{}',
  is_featured BOOLEAN NOT NULL DEFAULT true,
  is_published BOOLEAN NOT NULL DEFAULT true,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS projects_pub_order_idx ON public.projects(is_published, display_order);

CREATE TABLE IF NOT EXISTS public.pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  template TEXT NOT NULL DEFAULT 'default',
  is_system BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT true,
  seo_title TEXT,
  seo_description TEXT,
  og_image TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.page_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID NOT NULL REFERENCES public.pages(id) ON DELETE CASCADE,
  section_type TEXT NOT NULL,
  title TEXT,
  subtitle TEXT,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  draft_content JSONB,
  display_order INT NOT NULL DEFAULT 0,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  is_locked BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS page_sections_page_order_idx ON public.page_sections(page_id, display_order);

CREATE TABLE IF NOT EXISTS public.media_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename TEXT NOT NULL,
  url TEXT NOT NULL UNIQUE,
  alt_text TEXT,
  mime_type TEXT,
  size_bytes BIGINT,
  used_in TEXT[] NOT NULL DEFAULT '{}',
  is_protected BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.seo_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  route TEXT NOT NULL UNIQUE,
  title TEXT,
  description TEXT,
  og_image TEXT,
  keywords TEXT[] NOT NULL DEFAULT '{}',
  json_ld JSONB,
  noindex BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------- operations tables ----------
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL CHECK (length(btrim(name)) BETWEEN 1 AND 120),
  email TEXT NOT NULL CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' AND length(email) <= 255),
  project_type TEXT NOT NULL DEFAULT 'General enquiry',
  budget TEXT,
  details TEXT NOT NULL CHECK (length(btrim(details)) BETWEEN 1 AND 5000),
  source_cta TEXT NOT NULL DEFAULT 'Direct Contact Form',
  status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New','Contacted','In Scoping','Proposal','Closed','Archived')),
  assigned_to UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS leads_status_created_idx ON public.leads(status, created_at DESC);

CREATE TABLE IF NOT EXISTS public.customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  company TEXT,
  country TEXT,
  tags TEXT[] NOT NULL DEFAULT '{}',
  notes TEXT,
  total_spent NUMERIC(12,2) NOT NULL DEFAULT 0.00,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference TEXT NOT NULL UNIQUE DEFAULT ('IE-' || upper(substr(replace(gen_random_uuid()::text,'-',''),1,8))),
  customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
  service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  title TEXT NOT NULL DEFAULT 'Engagement',
  amount NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (amount >= 0),
  currency TEXT NOT NULL DEFAULT 'USD',
  payment_status TEXT NOT NULL DEFAULT 'Pending' CHECK (payment_status IN ('Pending','Paid','Refunded','Failed')),
  fulfillment_status TEXT NOT NULL DEFAULT 'Unfulfilled' CHECK (fulfillment_status IN ('Unfulfilled','In Progress','Delivered','Cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS orders_created_idx ON public.orders(created_at DESC);

CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  actor_email TEXT,
  action TEXT NOT NULL,
  resource TEXT NOT NULL,
  resource_id TEXT,
  details JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS audit_logs_created_idx ON public.audit_logs(created_at DESC);

-- ---------- updated_at triggers ----------
DO $$
DECLARE t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY['profiles','services','projects','pages','page_sections','media_assets','seo_settings','leads','customers','orders']
  LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS set_updated_at ON public.%I', t);
    EXECUTE format('CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.%I FOR EACH ROW EXECUTE FUNCTION public.set_updated_at()', t);
  END LOOP;
END
$$;

-- ---------- new user bootstrap ----------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.email, ''),
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(COALESCE(NEW.email,''), '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;

  -- first ever account becomes the owner; everyone else gets nothing until granted
  IF NOT EXISTS (SELECT 1 FROM public.user_roles) THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'owner')
    ON CONFLICT DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ---------- audit writer (only path into audit_logs) ----------
CREATE OR REPLACE FUNCTION public.log_audit(_action TEXT, _resource TEXT, _resource_id TEXT DEFAULT NULL, _details JSONB DEFAULT '{}'::jsonb)
RETURNS VOID LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF auth.uid() IS NULL OR NOT public.is_staff() THEN
    RAISE EXCEPTION 'not authorised to write audit log';
  END IF;
  INSERT INTO public.audit_logs (actor_id, actor_email, action, resource, resource_id, details)
  VALUES (auth.uid(), (SELECT email FROM public.profiles WHERE id = auth.uid()), _action, _resource, _resource_id, COALESCE(_details, '{}'::jsonb));
END;
$$;

-- ============================================================
-- GRANTS
-- ============================================================
GRANT SELECT ON public.services, public.projects, public.pages, public.page_sections TO anon;
GRANT INSERT ON public.leads TO anon;

GRANT SELECT, INSERT, UPDATE, DELETE ON
  public.services, public.projects, public.pages, public.page_sections,
  public.media_assets, public.seo_settings, public.leads, public.customers,
  public.orders, public.profiles, public.user_roles TO authenticated;
GRANT SELECT ON public.audit_logs TO authenticated;

GRANT ALL ON public.services, public.projects, public.pages, public.page_sections,
  public.media_assets, public.seo_settings, public.leads, public.customers,
  public.orders, public.profiles, public.user_roles, public.audit_logs TO service_role;

REVOKE EXECUTE ON FUNCTION public.log_audit(TEXT,TEXT,TEXT,JSONB) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.log_audit(TEXT,TEXT,TEXT,JSONB) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_staff() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_owner() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.can_manage_content() TO authenticated;
GRANT EXECUTE ON FUNCTION public.can_manage_ops() TO authenticated;
GRANT EXECUTE ON FUNCTION public.can_read_content() TO authenticated;

-- ============================================================
-- RLS
-- ============================================================
ALTER TABLE public.profiles       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_sections  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_settings   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs     ENABLE ROW LEVEL SECURITY;

-- profiles: self read/update; staff-wide read for admins; only owner may delete
CREATE POLICY "profiles_self_select" ON public.profiles FOR SELECT TO authenticated USING (id = auth.uid() OR public.is_admin());
CREATE POLICY "profiles_self_update" ON public.profiles FOR UPDATE TO authenticated USING (id = auth.uid() OR public.is_admin()) WITH CHECK (id = auth.uid() OR public.is_admin());
CREATE POLICY "profiles_owner_delete" ON public.profiles FOR DELETE TO authenticated USING (public.is_owner());

-- user_roles: staff can see their own; admins can read all; ONLY owner mutates
CREATE POLICY "user_roles_read" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.is_admin());
CREATE POLICY "user_roles_owner_insert" ON public.user_roles FOR INSERT TO authenticated WITH CHECK (public.is_owner());
CREATE POLICY "user_roles_owner_update" ON public.user_roles FOR UPDATE TO authenticated USING (public.is_owner()) WITH CHECK (public.is_owner());
CREATE POLICY "user_roles_owner_delete" ON public.user_roles FOR DELETE TO authenticated USING (public.is_owner());

-- services
CREATE POLICY "services_public_read"  ON public.services FOR SELECT TO anon          USING (is_published = true);
CREATE POLICY "services_staff_read"   ON public.services FOR SELECT TO authenticated USING (is_published = true OR public.can_read_content());
CREATE POLICY "services_edit_insert"  ON public.services FOR INSERT TO authenticated WITH CHECK (public.can_manage_content());
CREATE POLICY "services_edit_update"  ON public.services FOR UPDATE TO authenticated USING (public.can_manage_content()) WITH CHECK (public.can_manage_content());
CREATE POLICY "services_edit_delete"  ON public.services FOR DELETE TO authenticated USING (public.can_manage_content());

-- projects
CREATE POLICY "projects_public_read"  ON public.projects FOR SELECT TO anon          USING (is_published = true);
CREATE POLICY "projects_staff_read"   ON public.projects FOR SELECT TO authenticated USING (is_published = true OR public.can_read_content());
CREATE POLICY "projects_edit_insert"  ON public.projects FOR INSERT TO authenticated WITH CHECK (public.can_manage_content());
CREATE POLICY "projects_edit_update"  ON public.projects FOR UPDATE TO authenticated USING (public.can_manage_content()) WITH CHECK (public.can_manage_content());
CREATE POLICY "projects_edit_delete"  ON public.projects FOR DELETE TO authenticated USING (public.can_manage_content());

-- pages
CREATE POLICY "pages_public_read"  ON public.pages FOR SELECT TO anon          USING (is_published = true);
CREATE POLICY "pages_staff_read"   ON public.pages FOR SELECT TO authenticated USING (is_published = true OR public.can_read_content());
CREATE POLICY "pages_edit_insert"  ON public.pages FOR INSERT TO authenticated WITH CHECK (public.can_manage_content());
CREATE POLICY "pages_edit_update"  ON public.pages FOR UPDATE TO authenticated USING (public.can_manage_content()) WITH CHECK (public.can_manage_content());
CREATE POLICY "pages_edit_delete"  ON public.pages FOR DELETE TO authenticated USING (public.can_manage_content() AND is_system = false);

-- page_sections (public read requires the parent page to be published)
CREATE POLICY "page_sections_public_read" ON public.page_sections FOR SELECT TO anon
  USING (is_visible = true AND EXISTS (SELECT 1 FROM public.pages p WHERE p.id = page_id AND p.is_published = true));
CREATE POLICY "page_sections_staff_read" ON public.page_sections FOR SELECT TO authenticated
  USING (public.can_read_content() OR (is_visible = true AND EXISTS (SELECT 1 FROM public.pages p WHERE p.id = page_id AND p.is_published = true)));
CREATE POLICY "page_sections_edit_insert" ON public.page_sections FOR INSERT TO authenticated WITH CHECK (public.can_manage_content());
CREATE POLICY "page_sections_edit_update" ON public.page_sections FOR UPDATE TO authenticated USING (public.can_manage_content()) WITH CHECK (public.can_manage_content());
CREATE POLICY "page_sections_edit_delete" ON public.page_sections FOR DELETE TO authenticated USING (public.can_manage_content() AND is_locked = false);

-- media assets (staff only)
CREATE POLICY "media_staff_read"   ON public.media_assets FOR SELECT TO authenticated USING (public.is_staff());
CREATE POLICY "media_edit_insert"  ON public.media_assets FOR INSERT TO authenticated WITH CHECK (public.can_manage_content());
CREATE POLICY "media_edit_update"  ON public.media_assets FOR UPDATE TO authenticated USING (public.can_manage_content()) WITH CHECK (public.can_manage_content());
CREATE POLICY "media_edit_delete"  ON public.media_assets FOR DELETE TO authenticated USING (public.can_manage_content() AND is_protected = false);

-- seo settings (public read so the site can render metadata)
CREATE POLICY "seo_public_read"   ON public.seo_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "seo_edit_insert"   ON public.seo_settings FOR INSERT TO authenticated WITH CHECK (public.can_manage_content());
CREATE POLICY "seo_edit_update"   ON public.seo_settings FOR UPDATE TO authenticated USING (public.can_manage_content()) WITH CHECK (public.can_manage_content());
CREATE POLICY "seo_edit_delete"   ON public.seo_settings FOR DELETE TO authenticated USING (public.can_manage_content());

-- leads: anyone may submit, ONLY ops staff may read/mutate. No anon SELECT policy at all.
CREATE POLICY "leads_public_insert" ON public.leads FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "leads_ops_read"      ON public.leads FOR SELECT TO authenticated USING (public.can_manage_ops());
CREATE POLICY "leads_ops_update"    ON public.leads FOR UPDATE TO authenticated USING (public.can_manage_ops()) WITH CHECK (public.can_manage_ops());
CREATE POLICY "leads_admin_delete"  ON public.leads FOR DELETE TO authenticated USING (public.is_admin());

-- customers
CREATE POLICY "customers_ops_read"   ON public.customers FOR SELECT TO authenticated USING (public.can_manage_ops());
CREATE POLICY "customers_ops_insert" ON public.customers FOR INSERT TO authenticated WITH CHECK (public.can_manage_ops());
CREATE POLICY "customers_ops_update" ON public.customers FOR UPDATE TO authenticated USING (public.can_manage_ops()) WITH CHECK (public.can_manage_ops());
CREATE POLICY "customers_admin_delete" ON public.customers FOR DELETE TO authenticated USING (public.is_admin());

-- orders
CREATE POLICY "orders_ops_read"   ON public.orders FOR SELECT TO authenticated USING (public.can_manage_ops());
CREATE POLICY "orders_ops_insert" ON public.orders FOR INSERT TO authenticated WITH CHECK (public.can_manage_ops());
CREATE POLICY "orders_ops_update" ON public.orders FOR UPDATE TO authenticated USING (public.can_manage_ops()) WITH CHECK (public.can_manage_ops());
CREATE POLICY "orders_admin_delete" ON public.orders FOR DELETE TO authenticated USING (public.is_admin());

-- audit logs: read-only for owner/admin. No INSERT/UPDATE/DELETE policy exists,
-- so the ONLY write path is the SECURITY DEFINER log_audit() function.
CREATE POLICY "audit_admin_read" ON public.audit_logs FOR SELECT TO authenticated USING (public.is_admin());
