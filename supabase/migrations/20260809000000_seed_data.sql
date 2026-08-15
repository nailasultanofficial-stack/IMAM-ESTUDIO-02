-- ============================================================
-- Seed data for IMAM ESTUDIO OS
-- Idempotent seeding for homepage, services, projects, seo
-- ============================================================

-- 1. Default Pages
INSERT INTO public.pages (slug, title, template, is_system, is_published, seo_title, seo_description)
VALUES
  ('home', 'Homepage', 'home', true, true, 'IMAM ESTUDIO — Senior Full-Stack Engineer & UI/UX Architect', 'Engineering High Conversion Shopify and React Platforms, custom Next.js SaaS web apps, and n8n AI automations.'),
  ('about', 'About', 'default', true, true, 'About IMAM ESTUDIO', 'Senior Full-Stack Engineer and UI/UX Architect helping brands replace slow template websites with high performance platforms.'),
  ('process', 'Process', 'default', true, true, 'Engineering Methodology — IMAM ESTUDIO', '4-phase engineering methodology for building high-integrity software.'),
  ('contact', 'Contact', 'default', true, true, 'Start an Engagement — IMAM ESTUDIO', 'Discuss your Shopify commerce, Next.js SaaS, or custom n8n AI automation project.')
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description;

-- 2. Page Sections for Homepage
DO $$
DECLARE
  home_id UUID;
BEGIN
  SELECT id INTO home_id FROM public.pages WHERE slug = 'home';
  
  -- Clear existing sections to re-seed cleanly
  DELETE FROM public.page_sections WHERE page_id = home_id;

  INSERT INTO public.page_sections (page_id, section_type, title, subtitle, content, display_order, is_visible, is_locked)
  VALUES
    (
      home_id,
      'hero',
      'Engineering High-Conversion Shopify & React Platforms.',
      'Senior Full-Stack Engineer & UI/UX Architect building high-performance commerce, SaaS apps, and n8n AI automation systems.',
      '{
        "eyebrow": "IMAM ESTUDIO",
        "primary_cta_label": "Start an engagement",
        "primary_cta_url": "/contact?source=hero",
        "secondary_cta_label": "Explore work",
        "secondary_cta_url": "/work",
        "desktop_hero_image": "https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs/494912736/original/d6e1fa4814b3a1d6029d55646baf670ccd1160b3.png",
        "mobile_hero_image": "https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs/494892850/original/2b61663d23154209df1cef3d91a6e8862f614094.png"
      }'::jsonb,
      0, true, true
    ),
    (
      home_id,
      'trust_strip',
      'Proven execution across global platforms',
      'Engineered for reliability',
      '{
        "metrics": [
          {"value": "5.0 ★", "label": "Client Rating"},
          {"value": "100%", "label": "App-Free Shopify Liquid"},
          {"value": "<24h", "label": "Direct Turnaround"},
          {"value": "Zero", "label": "Agency Overhead"}
        ]
      }'::jsonb,
      1, true, false
    ),
    (
      home_id,
      'founder',
      'IMAM ESTUDIO',
      'Senior Full-Stack Engineer & UI/UX Architect',
      '{
        "portrait_url": "https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs/494912736/original/d6e1fa4814b3a1d6029d55646baf670ccd1160b3.png",
        "bio": "Welcome! I am IMAM ESTUDIO, a Senior Full-Stack Engineer and UI/UX Architect. I help brands replace slow, template-based websites with high-performance web applications, headless eCommerce solutions, and AI-powered automation systems. From custom Next.js platforms and Framer websites to advanced Shopify development, I build scalable, conversion-focused digital experiences.",
        "skills": ["Custom Shopify Liquid", "Shopify Store Redesign", "n8n AI Automations", "Next.js / React 19", "Headless Commerce", "Mobile-First UI/UX"]
      }'::jsonb,
      2, true, false
    ),
    (
      home_id,
      'featured_work',
      'Featured Case Studies',
      'Architected for speed, conversion, and scale.',
      '{}'::jsonb,
      3, true, false
    ),
    (
      home_id,
      'capabilities',
      'Engineering Services & Capabilities',
      'From custom Shopify Liquid sections to full-stack Next.js SaaS platforms.',
      '{}'::jsonb,
      4, true, false
    ),
    (
      home_id,
      'approach',
      '4-Phase Engineering Methodology',
      'Rigorous execution from architecture to production.',
      '{
        "phases": [
          {"step": "01", "name": "Discovery & Architecture", "description": "Analyzing conversion bottlenecks, user flows, data models, and API specifications before writing code."},
          {"step": "02", "name": "Milestone Sprints", "description": "Clean, typed, testable code pushed directly to GitHub with transparent status updates and PR reviews."},
          {"step": "03", "name": "Optimization & Hardening", "description": "Core Web Vitals tuning, mobile responsiveness pass, security hardening, and error boundary testing."},
          {"step": "04", "name": "Production Launch", "description": "CI/CD deployment to Vercel, production database verification, complete documentation, and handover."}
        ]
      }'::jsonb,
      5, true, false
    ),
    (
      home_id,
      'collaboration',
      'Direct Principal Engineering Access',
      'No account managers. No middle layers.',
      '{
        "headline": "Direct collaboration with IMAM ESTUDIO.",
        "points": [
          "Direct line to the principal engineer scoping and writing your code.",
          "Custom Shopify solutions that eliminate bloated, recurring app fees.",
          "Production-ready CI/CD deployments on Vercel Edge with zero downtime."
        ]
      }'::jsonb,
      6, true, false
    ),
    (
      home_id,
      'final_cta',
      'Ready to build a high-conversion platform?',
      'Let us review your requirements and provide a technical plan.',
      '{
        "button_label": "Start an Engagement",
        "button_url": "/contact?source=final_cta",
        "whatsapp_label": "Direct WhatsApp",
        "whatsapp_number": "+923191106310"
      }'::jsonb,
      7, true, false
    );
END
$$;

-- 3. Seed Services (From IMAM ESTUDIO Fiverr Data + Core Expertise)
INSERT INTO public.services (gig_id, title, slug, category, short_description, full_description, starting_price, hourly_rate, features, tech_stack, image_url, cta_label, is_featured, is_published, display_order)
VALUES
  (
    '485281780',
    'Custom Native Shopify Liquid Sections',
    'custom-shopify-liquid-sections',
    'Themes/Plugins Installation',
    'I will build custom native liquid sections for your shopify store.',
    'Bespoke native Shopify Liquid section development that extends your current theme without requiring bloated third-party apps or monthly subscriptions.',
    25.00, 25.00,
    ARRAY['Native Shopify Liquid Code', 'Theme App Extension Support', 'Zero Monthly App Fees', 'Mobile-First Responsive Design', 'Custom Schema Customizers'],
    ARRAY['Shopify Liquid', 'Theme App Extensions', 'TailwindCSS', 'JavaScript ESNext'],
    'https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs/485281780/original/48722d6d3f7b018744d9c94c6bdc11d8f14301fa.png',
    'Order Liquid Section', true, true, 1
  ),
  (
    '494892850',
    'Shopify Store Redesign for High Conversion & UI/UX',
    'shopify-store-redesign-conversion-ui-ux',
    'Website Builders Design',
    'I will redesign your shopify store for high conversion and UI UX.',
    'Complete conversion-focused Shopify store overhaul. Re-architecting store navigation, product pages, checkout flows, and mobile responsiveness for maximum revenue.',
    65.00, 25.00,
    ARRAY['Conversion Rate Optimization (CRO)', 'Mobile-First UI/UX Redesign', 'Sub-second Page Loading', 'Custom Cart Drawer & Upsells', 'Checkout Experience Tuning'],
    ARRAY['Shopify Plus', 'UI/UX Architecture', 'Liquid', 'TailwindCSS', 'JavaScript'],
    'https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs/494892850/original/2b61663d23154209df1cef3d91a6e8862f614094.png',
    'Order Store Redesign', true, true, 2
  ),
  (
    '494910179',
    'Custom n8n AI Automations & Business Workflows',
    'n8n-ai-automations-workflows',
    'Automations & Agents',
    'I will build custom n8n ai automations and business workflows.',
    'AI-powered business process automation using custom n8n nodes, LLM reasoning pipelines, automated CRM syncing, document processing, and webhook triggers.',
    35.00, 25.00,
    ARRAY['Custom n8n Workflow Architecture', 'OpenAI & Claude LLM Integration', 'Automated Lead & CRM Routing', 'Webhook & Event Trigger Handlers', 'Operational Load Reduction'],
    ARRAY['n8n', 'AI Agents', 'OpenAI API', 'REST APIs', 'Node.js', 'Supabase'],
    'https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs/494910179/original/8b361cf59a9b34d5858b3010e62b847290b92143.png',
    'Build n8n Automation', true, true, 3
  ),
  (
    '494912736',
    'High Performance Next.js SaaS Web App',
    'high-performance-nextjs-saas-web-app',
    'Full Stack Web Applications',
    'I will develop a high performance next js saas web app.',
    'Production-grade full-stack web applications built with Next.js, React 19, Supabase PostgreSQL, role-based authentication, and modern dashboard UI.',
    125.00, 25.00,
    ARRAY['Next.js & React 19 Frontend', 'Supabase Database & Row-Level Security', 'Role-Based Authentication (RBAC)', 'Responsive Admin Dashboard UI', 'Vercel Edge Deployment'],
    ARRAY['React 19', 'Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'TailwindCSS'],
    'https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs/494912736/original/d6e1fa4814b3a1d6029d55646baf670ccd1160b3.png',
    'Develop SaaS App', true, true, 4
  ),
  (
    '494915000',
    'Headless Shopify Commerce & Hydrogen Storefronts',
    'headless-shopify-hydrogen',
    'Headless eCommerce',
    'Decoupled Hydrogen and Remix storefronts for sub-second global execution.',
    'Decoupled storefront architecture built with Shopify Hydrogen, Remix, and Vercel edge deployment for enterprise speed and custom content layouts.',
    250.00, 25.00,
    ARRAY['Shopify Storefront API GraphQL', 'Hydrogen & Remix Server Components', 'Vercel Edge Deployment', 'Sanity/Headless CMS Integration'],
    ARRAY['Shopify Hydrogen', 'Remix', 'GraphQL', 'Vercel Edge', 'TailwindCSS'],
    'https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs/494892850/original/2b61663d23154209df1cef3d91a6e8862f614094.png',
    'Scope Headless Project', true, true, 5
  ),
  (
    '494916000',
    'Framer Interactive Websites & Design Systems',
    'framer-interactive-websites',
    'UI/UX & Web Builders',
    'High-end Framer websites engineered with microinteractions and mobile responsiveness.',
    'Custom Framer website design and component architecture built with fluid interactions, responsive breakpoints, and conversion-focused visual hierarchy.',
    85.00, 25.00,
    ARRAY['Custom Framer Component Architecture', 'Fluid Microinteractions & Motion', 'Mobile-First Breakpoint Tuning', 'SEO Meta & Canonical Setup'],
    ARRAY['Framer', 'UI/UX Design', 'React', 'CSS 3D Transforms'],
    'https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs/485281780/original/48722d6d3f7b018744d9c94c6bdc11d8f14301fa.png',
    'Order Framer Site', true, true, 6
  )
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  short_description = EXCLUDED.short_description,
  full_description = EXCLUDED.full_description,
  starting_price = EXCLUDED.starting_price,
  hourly_rate = EXCLUDED.hourly_rate,
  features = EXCLUDED.features,
  tech_stack = EXCLUDED.tech_stack,
  image_url = EXCLUDED.image_url,
  cta_label = EXCLUDED.cta_label,
  is_featured = EXCLUDED.is_featured,
  is_published = EXCLUDED.is_published,
  display_order = EXCLUDED.display_order;

-- 4. Seed Projects
INSERT INTO public.projects (gig_id, title, slug, category, client_name, description, outcomes, tags, thumbnail_url, gallery_urls, is_featured, is_published, display_order)
VALUES
  (
    '485281780',
    'High-Conversion Shopify Store Redesign',
    'shopify-high-conversion-redesign',
    'Shopify Commerce',
    'E-Commerce Brand',
    'Custom Shopify store redesign focusing on mobile-first UI/UX architecture, custom Liquid sections, and app dependency elimination.',
    ARRAY['48% Increase in Conversion Rate', 'Sub-second Page Loads', 'Zero App Subscription Costs'],
    ARRAY['Shopify', 'Liquid', 'UI/UX', 'TailwindCSS'],
    'https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs/494892850/original/2b61663d23154209df1cef3d91a6e8862f614094.png',
    ARRAY['https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs/494892850/original/2b61663d23154209df1cef3d91a6e8862f614094.png'],
    true, true, 1
  ),
  (
    '494910179',
    'Automated n8n AI Workflow System',
    'n8n-automated-ai-workflow',
    'AI Automation',
    'Business Operations Team',
    'Custom n8n AI workflow automating lead routing, document processing, and customer support ticket dispatch.',
    ARRAY['70% Reduction in Manual Tasks', 'Real-time Event Triggers', 'Zero Data Loss Pipeline'],
    ARRAY['n8n', 'AI Agents', 'OpenAI', 'REST APIs'],
    'https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs/494910179/original/8b361cf59a9b34d5858b3010e62b847290b92143.png',
    ARRAY['https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs/494910179/original/8b361cf59a9b34d5858b3010e62b847290b92143.png'],
    true, true, 2
  ),
  (
    '494912736',
    'Next.js & React 19 SaaS Platform',
    'nextjs-react-saas-platform',
    'Full Stack Web Applications',
    'SaaS Startup',
    'Production-grade Next.js 19 SaaS application with Supabase PostgreSQL, Row-Level Security (RLS), and RBAC admin controls.',
    ARRAY['99.99% Store Uptime', 'Multi-tenant RLS Isolation', 'Instant Global Edge CDN'],
    ARRAY['React 19', 'Next.js', 'Supabase', 'PostgreSQL'],
    'https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs/494912736/original/d6e1fa4814b3a1d6029d55646baf670ccd1160b3.png',
    ARRAY['https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs/494912736/original/d6e1fa4814b3a1d6029d55646baf670ccd1160b3.png'],
    true, true, 3
  ),
  (
    '485281781',
    'App-Free Custom Native Liquid Sections',
    'app-free-custom-liquid-sections',
    'Shopify Commerce',
    'D2C Brand',
    'Custom native Shopify Liquid sections and custom cart drawers removing third-party app subscriptions.',
    ARRAY['$1,200 Annual App Savings', '100/100 Mobile Lighthouse', 'Native Theme Integration'],
    ARRAY['Shopify Liquid', 'Theme Extensions', 'TailwindCSS'],
    'https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs/485281780/original/48722d6d3f7b018744d9c94c6bdc11d8f14301fa.png',
    ARRAY['https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs/485281780/original/48722d6d3f7b018744d9c94c6bdc11d8f14301fa.png'],
    true, true, 4
  )
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  client_name = EXCLUDED.client_name,
  description = EXCLUDED.description,
  outcomes = EXCLUDED.outcomes,
  tags = EXCLUDED.tags,
  thumbnail_url = EXCLUDED.thumbnail_url,
  gallery_urls = EXCLUDED.gallery_urls,
  is_featured = EXCLUDED.is_featured,
  is_published = EXCLUDED.is_published,
  display_order = EXCLUDED.display_order;

-- 5. Default SEO Settings
INSERT INTO public.seo_settings (route, title, description, keywords, noindex)
VALUES
  ('/', 'IMAM ESTUDIO — Senior Full-Stack Engineer & UI/UX Architect', 'Engineering High Conversion Shopify and React Platforms, custom Next.js SaaS apps, and n8n AI automations.', ARRAY['Shopify Developer', 'React Engineer', 'Next.js SaaS', 'n8n AI Automations', 'UI/UX Architect'], false),
  ('/work', 'Selected Case Studies — IMAM ESTUDIO', 'Case studies across Shopify commerce, Next.js SaaS applications, n8n AI automations, and UI/UX design.', ARRAY['Case Studies', 'Shopify Projects', 'Next.js Apps', 'n8n Workflows'], false),
  ('/services', 'Engineering Capabilities — IMAM ESTUDIO', 'Custom Shopify Liquid, Next.js SaaS development, n8n AI workflow automations, and UI/UX architecture.', ARRAY['Shopify Services', 'n8n Automations', 'Next.js Development', 'Framer Sites'], false),
  ('/about', 'About IMAM ESTUDIO', 'Senior Full-Stack Engineer & UI/UX Architect helping brands replace slow template websites with high performance platforms.', ARRAY['IMAM ESTUDIO', 'Senior Engineer', 'UI UX Architect'], false),
  ('/process', 'Engineering Process — IMAM ESTUDIO', '4-phase engineering methodology for building high-integrity software and conversion platforms.', ARRAY['Methodology', 'Engineering Process'], false),
  ('/contact', 'Contact & Inquiries — IMAM ESTUDIO', 'Start a project directly with Senior Full-Stack Engineer IMAM ESTUDIO.', ARRAY['Contact IMAM ESTUDIO', 'Hire Shopify Developer', 'Hire Next.js Developer'], false)
ON CONFLICT (route) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  keywords = EXCLUDED.keywords,
  noindex = EXCLUDED.noindex;
