-- ============================================================
-- Seed data for IMAM ESTUDIO OS
-- Idempotent seeding for homepage, services, projects, seo
-- ============================================================

-- 1. Default Pages
INSERT INTO public.pages (slug, title, template, is_system, is_published, seo_title, seo_description)
VALUES
  ('home', 'Homepage', 'home', true, true, 'IMAM ESTUDIO — Founder-Led Engineering Studio', 'High-performance Shopify commerce, AI automation pipelines, and full-stack SaaS engineering.'),
  ('about', 'About', 'default', true, true, 'About — IMAM ESTUDIO', 'Mudasar Imam is a Senior Full Stack Engineer & AI Automation Architect.'),
  ('process', 'Process', 'default', true, true, 'Engineering Methodology — IMAM ESTUDIO', 'Our 4-phase engineering methodology for building high-integrity software.'),
  ('contact', 'Contact', 'default', true, true, 'Start an Engagement — IMAM ESTUDIO', 'Discuss your Shopify commerce, AI automation, or custom SaaS engineering project.')
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
      'Engineering for brands that cannot afford downtime.',
      'Founder-led Shopify commerce, AI automation, and custom SaaS systems.',
      '{
        "eyebrow": "IMAM ESTUDIO OS",
        "primary_cta_label": "Start an engagement",
        "primary_cta_url": "/contact?source=hero",
        "secondary_cta_label": "Explore work",
        "secondary_cta_url": "/work",
        "desktop_hero_image": "https://yqaslfozryelumtlkoxk.supabase.co/storage/v1/object/public/asset/Cinematic%20Portrait%20in%20a%20Dark%20Tech%20Studio.png",
        "mobile_hero_image": "https://yqaslfozryelumtlkoxk.supabase.co/storage/v1/object/public/asset/mobile%20Cinematic%20Portrait%20in%20a%20Modern%20Black%20Interior%20mobile.png"
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
          {"value": "100%", "label": "Code Ownership"},
          {"value": "10+", "label": "Core Disciplines"},
          {"value": "<24h", "label": "Direct Turnaround"},
          {"value": "Zero", "label": "Agency Overhead"}
        ]
      }'::jsonb,
      1, true, false
    ),
    (
      home_id,
      'founder',
      'Mudasar Imam',
      'Senior Full Stack Engineer & AI Automation Architect',
      '{
        "portrait_url": "https://yqaslfozryelumtlkoxk.supabase.co/storage/v1/object/public/asset/Mudasar%20Imam%20Senior%20Full%20Stack%20Engineer%20and%20AI%20Automation%20Architect.png",
        "bio": "I scope, architect, write, test, deploy, and maintain custom software applications. When you work with IMAM ESTUDIO, you interact directly with the principal engineer writing your code.",
        "skills": ["Shopify Plus", "Hydrogen/Remix", "AI Pipelines & RAG", "Next.js / TanStack", "Node.js / Python", "PostgreSQL / Supabase"]
      }'::jsonb,
      2, true, false
    ),
    (
      home_id,
      'featured_work',
      'Featured Engineering Case Studies',
      'Architected for scale and performance.',
      '{}'::jsonb,
      3, true, false
    ),
    (
      home_id,
      'capabilities',
      'Ten Engineering Disciplines',
      'From custom Shopify apps to enterprise AI automation.',
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
          {"step": "01", "name": "Technical Blueprint", "description": "Architecture diagrams, data models, schema definitions, and API specifications before writing code."},
          {"step": "02", "name": "Milestone-Driven Sprints", "description": "Clean, typed, testable code pushed to GitHub with transparent status updates and PR reviews."},
          {"step": "03", "name": "Security & RLS Hardening", "description": "Comprehensive security pass, RLS verification, penetration checks, and error boundary tests."},
          {"step": "04", "name": "Production Handover", "description": "CI/CD deployment, production database verification, complete technical documentation, and monitoring."}
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
        "headline": "Direct access to the engineer building your system.",
        "points": [
          "Async-first communication with weekly technical syncs.",
          "Direct GitHub repository access and code visibility.",
          "Production-ready CI/CD deployments and documentation."
        ]
      }'::jsonb,
      6, true, false
    ),
    (
      home_id,
      'final_cta',
      'Ready to build software that stays shipped?',
      'Let us review your requirements and provide a technical plan.',
      '{
        "button_label": "Start a Project",
        "button_url": "/contact?source=final_cta",
        "whatsapp_label": "Direct WhatsApp",
        "whatsapp_number": "+923191106310"
      }'::jsonb,
      7, true, false
    );
END
$$;

-- 3. Seed 10 Services
INSERT INTO public.services (gig_id, title, slug, category, short_description, full_description, starting_price, hourly_rate, features, tech_stack, image_url, cta_label, is_featured, is_published, display_order)
VALUES
  (
    'srv-01',
    'Custom Shopify Theme Architecture',
    'shopify-theme-architecture',
    'Shopify Commerce',
    'Pixel-perfect, high-converting Liquid/Tailwind Shopify themes built from scratch with zero bloat.',
    'Engineered for maximum Core Web Vitals performance. Includes custom sections, Liquid schema extensions, dynamic cart drawers, and responsive design systems without app dependency.',
    3500.00, 18.00,
    ARRAY['Liquid & Dawn Schema', 'Core Web Vitals Optimization', 'Custom Section Engine', 'Cart Drawer & Upsells', 'Mobile First UX'],
    ARRAY['Shopify Liquid', 'TailwindCSS', 'JavaScript ESNext', 'Theme App Extensions'],
    'https://yqaslfozryelumtlkoxk.supabase.co/storage/v1/object/public/asset/Cinematic%20Portrait%20in%20a%20Dark%20Tech%20Studio.png',
    'Discuss Shopify Theme', true, true, 1
  ),
  (
    'srv-02',
    'Custom Shopify App Development',
    'shopify-app-development',
    'Shopify Commerce',
    'Public and private embedded Shopify apps extending store checkout, admin, and backend workflows.',
    'Bespoke Shopify CLI app development using Remix/Node.js, GraphQL Admin API, webhooks, and App Proxy extensions for custom merchant logic.',
    4500.00, 18.00,
    ARRAY['GraphQL Admin API', 'Embedded App Bridge UI', 'Webhook Listeners & Handlers', 'Shopify Checkout Extensions', 'Billing API Integration'],
    ARRAY['Node.js', 'Remix', 'TypeScript', 'Shopify App Bridge', 'Supabase'],
    'https://res.cloudinary.com/demo/image/upload/v1/samples/ecommerce/analog-clock.jpg',
    'Build Shopify App', true, true, 2
  ),
  (
    'srv-03',
    'Headless Commerce & Hydrogen',
    'headless-commerce-hydrogen',
    'Shopify Commerce',
    'Ultra-fast headless storefronts powered by Shopify Hydrogen, Remix, and Vercel edge deployment.',
    'Decoupled storefront architecture designed for enterprise sub-second page loads, global edge caching, and custom content management integration.',
    6000.00, 18.00,
    ARRAY['Shopify Storefront API', 'Hydrogen & Remix Server Components', 'Edge Caching & CDN', 'Custom CMS Integration', 'Multi-Currency & Internationalization'],
    ARRAY['Shopify Hydrogen', 'Remix', 'Vercel Edge', 'GraphQL', 'TailwindCSS'],
    'https://res.cloudinary.com/demo/image/upload/v1/samples/ecommerce/shoes.jpg',
    'Scope Headless Store', true, true, 3
  ),
  (
    'srv-04',
    'AI Automation & Workflow Pipelines',
    'ai-automation-pipelines',
    'AI Automation',
    'End-to-end automated business process flows connecting LLMs, database webhooks, and APIs.',
    'Custom Python and Node.js workflow engines that automate document extraction, customer classification, automated dispatch, and intelligence routing.',
    3000.00, 18.00,
    ARRAY['LLM Agent Workflows', 'Document & Data Parsing', 'Webhook & Event Triggers', 'Multi-Step API Orchestration', 'Error Handling & Queueing'],
    ARRAY['Python', 'Node.js', 'OpenAI API', 'Claude API', 'Supabase Edge Functions'],
    'https://res.cloudinary.com/demo/image/upload/v1/samples/technology/workflow-automation.jpg',
    'Automate Workflows', true, true, 4
  ),
  (
    'srv-05',
    'Custom RAG Assistants & Knowledge Bases',
    'rag-assistants-knowledge-bases',
    'AI Automation',
    'Domain-specific Retrieval-Augmented Generation assistants trained on your internal documentation and product catalog.',
    'Vector embedding pipelines with PgVector and OpenAI embeddings, offering secure, hallucination-resistant domain search and customer chat automation.',
    4000.00, 18.00,
    ARRAY['PgVector Hybrid Search', 'Embeddings Pipeline', 'Context-Aware Chat Interfaces', 'Role-Gated Document Access', 'Analytics & Evaluation'],
    ARRAY['PgVector', 'OpenAI Embeddings', 'LangChain', 'TypeScript', 'Supabase'],
    'https://res.cloudinary.com/demo/image/upload/v1/samples/technology/ai-dashboard.jpg',
    'Build RAG Assistant', true, true, 5
  ),
  (
    'srv-06',
    'Full-Stack SaaS Engineering',
    'full-stack-saas-engineering',
    'Full Stack SaaS',
    'Production-grade web applications with modern frontend, backend RBAC, payments, and PostgreSQL database.',
    'Complete greenfield software production. Architected from database schema and RLS security policies to high-velocity React interface and Vercel hosting.',
    7500.00, 18.00,
    ARRAY['Database Architecture & RLS', 'RBAC & Auth Systems', 'React/Next.js/TanStack Frontend', 'REST & GraphQL APIs', 'Deployment & CI/CD'],
    ARRAY['React 19', 'TanStack Router', 'Supabase', 'PostgreSQL', 'TailwindCSS'],
    'https://res.cloudinary.com/demo/image/upload/v1/samples/technology/analytics-chart.jpg',
    'Start SaaS Build', true, true, 6
  ),
  (
    'srv-07',
    'API & Microservices Systems Integration',
    'api-systems-integration',
    'Full Stack SaaS',
    'Reliable integration of third-party ERPs, CRMs, payment gateways, and custom backend microservices.',
    'Bulletproof middleware and API connectors ensuring zero data loss, automated retry strategies, rate limiting compliance, and real-time syncing.',
    3500.00, 18.00,
    ARRAY['REST / GraphQL Integrations', 'ERP & CRM Data Sync', 'Webhook Security Verification', 'Idempotent Retry Queues', 'Log Audit & Telemetry'],
    ARRAY['Node.js', 'Express/Fastify', 'PostgreSQL', 'Redis', 'Docker'],
    'https://res.cloudinary.com/demo/image/upload/v1/samples/technology/tech-server.jpg',
    'Integrate APIs', false, true, 7
  ),
  (
    'srv-08',
    'High-Performance Web Applications',
    'high-performance-web-apps',
    'Engineering',
    'Complex interactive web tools, data visualizers, and web platforms tuned for speed and precision.',
    'Engineered UI applications featuring complex client state management, responsive data tables, live charting, and accessibility compliance.',
    4000.00, 18.00,
    ARRAY['Dynamic Layout Math & Responsive UI', 'Interactive Charts & Tables', 'Sub-100ms Page Load Metrics', 'WCAG AA Accessibility', 'Offline & PWA Capabilities'],
    ARRAY['TypeScript', 'React', 'Recharts', 'Radix UI', 'Vite'],
    'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/architecture-building.jpg',
    'Build App', false, true, 8
  ),
  (
    'srv-09',
    'Enterprise Data Transformation Pipelines',
    'data-transformation-pipelines',
    'Engineering',
    'Scalable ETL/ELT pipelines for ingesting, cleaning, and structuring operational business data.',
    'Automated data ingestion from GCS/S3 to PostgreSQL and BigQuery, executing data validation, deduplication, schema enforcement, and reporting view creation.',
    5000.00, 18.00,
    ARRAY['Automated Ingestion Pipelines', 'Schema Validation & Cleaning', 'Deduplication & Normalization', 'Audit Logging & Alerts', 'Reporting Views'],
    ARRAY['Python', 'SQL', 'BigQuery', 'PostgreSQL', 'Dataform'],
    'https://res.cloudinary.com/demo/image/upload/v1/samples/technology/tech-server.jpg',
    'Build Pipeline', false, true, 9
  ),
  (
    'srv-10',
    'Technical Architecture & Security Audits',
    'technical-architecture-security-audits',
    'Engineering',
    'Deep-dive audit of database schema, RLS policies, code quality, API security, and performance bottlenecks.',
    'Comprehensive technical review of existing codebases, identifying security vulnerabilities, RLS leaks, slow queries, missing indexes, and unhandled failure paths.',
    2500.00, 18.00,
    ARRAY['PostgreSQL RLS Audit', 'Frontend & API Vulnerability Scan', 'Performance & Query Optimization', 'Type Safety & Code Structure', 'Actionable Technical Report'],
    ARRAY['PostgreSQL', 'Supabase CLI', 'TypeScript', 'Security Auditing'],
    'https://yqaslfozryelumtlkoxk.supabase.co/storage/v1/object/public/asset/Mudasar%20Imam%20Senior%20Full%20Stack%20Engineer%20and%20AI%20Automation%20Architect.png',
    'Request Audit', false, true, 10
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

-- 4. Seed 10 Projects
INSERT INTO public.projects (gig_id, title, slug, category, client_name, description, outcomes, tags, thumbnail_url, gallery_urls, is_featured, is_published, display_order)
VALUES
  (
    '360070233',
    'Industrial B2B Commerce Platform',
    'industrial-b2b-commerce',
    'Shopify Commerce',
    'Global Manufacturing Corp',
    'Custom Shopify Plus B2B storefront built with Liquid and custom React checkout components handling 50,000+ SKUs and tiered wholesale pricing.',
    ARRAY['99.99% Store Uptime', '3.2x Increase in B2B Orders', 'Sub-second Product Search'],
    ARRAY['Shopify Plus', 'Liquid', 'TailwindCSS', 'B2B Wholesale'],
    'https://res.cloudinary.com/demo/image/upload/v1/samples/ecommerce/accessories-bag.jpg',
    ARRAY['https://res.cloudinary.com/demo/image/upload/v1/samples/ecommerce/accessories-bag.jpg'],
    true, true, 1
  ),
  (
    '408370669',
    'AI-Powered Customer Support Assistant',
    'ai-customer-support-assistant',
    'AI Automation',
    'SaaS Logistics Brand',
    'Custom vector search assistant integrated into Shopify store chat. Resolves customer order tracking and technical inquiry queries using PgVector RAG.',
    ARRAY['65% Reduction in Support Tickets', 'Instant 24/7 Response Time', 'Zero Hallucination Guardrails'],
    ARRAY['AI Assistant', 'PgVector', 'OpenAI', 'TypeScript', 'Supabase'],
    'https://yqaslfozryelumtlkoxk.supabase.co/storage/v1/object/public/asset/Cinematic%20Portrait%20in%20a%20Dark%20Tech%20Studio.png',
    ARRAY['https://yqaslfozryelumtlkoxk.supabase.co/storage/v1/object/public/asset/Cinematic%20Portrait%20in%20a%20Dark%20Tech%20Studio.png'],
    true, true, 2
  ),
  (
    '475539431',
    'Multi-Store Subscriptions Engine',
    'multi-store-subscriptions-engine',
    'Shopify Commerce',
    'Nutritional Supplements Co',
    'Custom Shopify embedded app managing recurring subscription bundles and dynamic swap logic across 5 international store regions.',
    ARRAY['$1.2M Recurring Monthly Revenue Managed', 'Custom Customer Portal', 'Automated Failed Payment Retry'],
    ARRAY['Shopify App', 'Remix', 'GraphQL API', 'Node.js'],
    'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/architecture-building.jpg',
    ARRAY['https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/architecture-building.jpg'],
    true, true, 3
  ),
  (
    '493974686',
    'High-Volume Inventory Sync Pipeline',
    'high-volume-inventory-sync',
    'Systems Integration',
    'Global Fashion Retailer',
    'Real-time inventory synchronization engine connecting SAP ERP, warehouse WMS, and 3 Shopify Plus stores.',
    ARRAY['100,000 Daily Inventory Updates', 'Zero Over-selling Incidents', 'Under 500ms API Latency'],
    ARRAY['Python', 'Node.js', 'PostgreSQL', 'Webhooks'],
    'https://res.cloudinary.com/demo/image/upload/v1/samples/technology/tech-server.jpg',
    ARRAY['https://res.cloudinary.com/demo/image/upload/v1/samples/technology/tech-server.jpg'],
    true, true, 4
  ),
  (
    '493979596',
    'Custom Headless Hydrogen Storefront',
    'custom-headless-hydrogen-storefront',
    'Shopify Commerce',
    'Luxury Apparel House',
    'Decoupled Hydrogen/Remix storefront deployed to Vercel Edge with custom Sanity CMS integration for editorial brand storytelling.',
    ARRAY['98/100 Mobile Lighthouse Score', '0.4s First Contentful Paint', '42% Conversion Boost'],
    ARRAY['Hydrogen', 'Remix', 'Vercel Edge', 'GraphQL'],
    'https://res.cloudinary.com/demo/image/upload/v1/samples/ecommerce/shoes.jpg',
    ARRAY['https://res.cloudinary.com/demo/image/upload/v1/samples/ecommerce/shoes.jpg'],
    true, true, 5
  ),
  (
    '493991616',
    'Enterprise Knowledge Base RAG System',
    'enterprise-knowledge-base-rag',
    'AI Automation',
    'FinTech Solutions Ltd',
    'Internal AI search and document synthesis portal processing 10,000+ technical PDF documents with strict role-based access control.',
    ARRAY['Under 2 Second Query Response', 'Role-Based Document Filtering', 'Fully Audited Inquiries'],
    ARRAY['PgVector', 'Python', 'React', 'TailwindCSS'],
    'https://res.cloudinary.com/demo/image/upload/v1/samples/technology/ai-dashboard.jpg',
    ARRAY['https://res.cloudinary.com/demo/image/upload/v1/samples/technology/ai-dashboard.jpg'],
    true, true, 6
  ),
  (
    '495364262',
    'Multi-Tenant Analytics SaaS Dashboard',
    'multi-tenant-analytics-saas',
    'Full Stack SaaS',
    'E-Commerce Analytics Inc',
    'Full-stack B2B SaaS platform delivering real-time store performance insights, cohort retention analysis, and revenue attribution.',
    ARRAY['Multi-Tenant Isolation with RLS', 'Real-time Charting with Recharts', 'Integrated Subscription Billing'],
    ARRAY['React 19', 'TanStack Router', 'Supabase RLS', 'PostgreSQL'],
    'https://res.cloudinary.com/demo/image/upload/v1/samples/technology/analytics-chart.jpg',
    ARRAY['https://res.cloudinary.com/demo/image/upload/v1/samples/technology/analytics-chart.jpg'],
    true, true, 7
  ),
  (
    '495371376',
    'Shopify POS Custom Checkout Extensions',
    'shopify-pos-custom-extensions',
    'Shopify Commerce',
    'Boutique Retail Chain',
    'Custom Shopify POS UI extensions enabling custom loyalty redemption, store credit, and inventory transfer directly at retail point of sale.',
    ARRAY['Deployed to 25 Retail Outlets', 'Instant Retail Staff Adoption', 'Zero Checkout Lag'],
    ARRAY['Shopify POS Extensions', 'TypeScript', 'GraphQL'],
    'https://res.cloudinary.com/demo/image/upload/v1/samples/ecommerce/analog-clock.jpg',
    ARRAY['https://res.cloudinary.com/demo/image/upload/v1/samples/ecommerce/analog-clock.jpg'],
    false, true, 8
  ),
  (
    '495375633',
    'Automated Lead Enrichment Pipeline',
    'automated-lead-enrichment',
    'AI Automation',
    'Enterprise Sales Agency',
    'Autonomous lead scraping, web analysis, enrichment, and CRM dispatch system powered by LLM processing and Supabase queues.',
    ARRAY['10,000 Weekly Enriched Leads', '94% Data Accuracy Rate', 'Automated CRM Dispatch'],
    ARRAY['Python', 'OpenAI', 'Supabase Functions', 'Zod'],
    'https://res.cloudinary.com/demo/image/upload/v1/samples/technology/workflow-automation.jpg',
    ARRAY['https://res.cloudinary.com/demo/image/upload/v1/samples/technology/workflow-automation.jpg'],
    false, true, 9
  ),
  (
    '496125007',
    'Real-time Logistics Tracking Platform',
    'real-time-logistics-tracking',
    'Full Stack SaaS',
    'Global Freight Networks',
    'Custom shipment tracking portal with interactive map visualizer, automated SMS notifications, and customer status updates.',
    ARRAY['Real-time Websocket Updates', '50,000 Active Monthly Users', 'Integrated Customer Alerts'],
    ARRAY['React', 'Node.js', 'PostgreSQL', 'TailwindCSS'],
    'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/logistics-map.jpg',
    ARRAY['https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/logistics-map.jpg'],
    false, true, 10
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
  ('/', 'IMAM ESTUDIO — Founder-Led Engineering Studio', 'High-performance Shopify commerce, AI automation pipelines, and full-stack SaaS engineering by Mudasar Imam.', ARRAY['Shopify Developer', 'AI Automation Architect', 'Full Stack Engineer', 'Hydrogen', 'Supabase'], false),
  ('/work', 'Selected Work — IMAM ESTUDIO', 'Case studies across Shopify commerce, AI automation, SaaS and systems integration.', ARRAY['Case Studies', 'Shopify Projects', 'AI Systems'], false),
  ('/services', 'Capabilities — IMAM ESTUDIO', 'Ten engineering disciplines across Shopify commerce, AI automation and product engineering.', ARRAY['Shopify Services', 'AI Engineering', 'Full Stack Development'], false),
  ('/about', 'About Mudasar Imam — IMAM ESTUDIO', 'Senior Full Stack Engineer & AI Automation Architect building systems that stay shipped.', ARRAY['Mudasar Imam', 'Senior Engineer'], false),
  ('/process', 'Engineering Process — IMAM ESTUDIO', '4-phase engineering methodology for building high-integrity software.', ARRAY['Methodology', 'Engineering Process'], false),
  ('/contact', 'Contact & Inquiries — IMAM ESTUDIO', 'Discuss your project requirements directly with the principal engineer.', ARRAY['Contact', 'Hire Engineer'], false)
ON CONFLICT (route) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  keywords = EXCLUDED.keywords,
  noindex = EXCLUDED.noindex;
