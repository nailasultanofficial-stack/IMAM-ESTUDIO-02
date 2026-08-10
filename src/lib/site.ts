/**
 * Static brand constants for Malik Jahanzaib personal portfolio.
 * Operational content lives in Supabase database and is managed via /admin.
 */

export const SITE = {
  name: "MALIK JAHANZAIB",
  founder: "Malik Jahanzaib",
  role: "Senior Full-Stack Engineer & UI/UX Architect",
  handle: "@jahanzeb1809",
  whatsapp: "923191106310",
  email: "malikjahanzaib@gmail.com",
  rating: "5.0",
  fiverrReviews: 1,
  location: "Pakistan",
  languages: ["English", "Urdu"],
} as const;

export const NAV_LINKS = [
  { label: "Work", to: "/work" },
  { label: "Capabilities", to: "/services" },
  { label: "About", to: "/about" },
  { label: "Process", to: "/process" },
] as const;

export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${SITE.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Build a /contact link that carries CTA attribution. */
export function contactHref(source: string): string {
  return `/contact?source=${encodeURIComponent(source)}`;
}

export const FEATURED_GIG_SERVICES = [
  {
    id: "485281780",
    slug: "custom-native-liquid-sections",
    category: "Themes/Plugins Installation",
    title: "Custom Native Liquid Sections",
    short_description: "I will build custom native liquid sections for your shopify store",
    full_description:
      "Build high-performance, modular custom Liquid sections for your Shopify theme to eliminate app subscriptions and boost store conversion.",
    starting_price: 25,
    hourly_rate: 35,
    features: [
      "Custom native Liquid code",
      "Zero monthly app fees",
      "Theme Customizer settings & schema",
      "100% Mobile responsive & sub-second render",
    ],
    tech_stack: ["Shopify Liquid", "Custom Sections", "Theme Architecture", "CRO"],
    is_published: true,
    display_order: 1,
    cta_label: "Order Liquid Section",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    image_url:
      "https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs/485281780/original/48722d6d3f7b018744d9c94c6bdc11d8f14301fa.png",
    fiverr_url: "https://fiverr.com/jahanzeb1809/fix-shopify-and-website-bugs-fast",
  },
  {
    id: "494892850",
    slug: "shopify-store-redesign",
    category: "Website Builders Design",
    title: "Shopify Store Redesign for High Conversion",
    short_description: "I will redesign your shopify store for high conversion and UI UX",
    full_description:
      "Complete mobile-first Shopify store redesign focused on conversion rate optimization, modern UI/UX design, and fast checkout integration.",
    starting_price: 65,
    hourly_rate: 45,
    features: [
      "Full mobile-first UI/UX overhaul",
      "High conversion homepage & product page",
      "Cart drawer & upsell optimization",
      "PageSpeed & Core Web Vitals hardening",
    ],
    tech_stack: ["Shopify Plus", "UI/UX Design", "Conversion Rate", "Mobile First"],
    is_published: true,
    display_order: 2,
    cta_label: "Order Store Redesign",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    image_url:
      "https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs/494892850/original/2b61663d23154209df1cef3d91a6e8862f614094.png",
    fiverr_url:
      "https://fiverr.com/jahanzeb1809/redesign-your-shopify-store-for-high-conversion-and-ui-ux",
  },
  {
    id: "494910179",
    slug: "n8n-ai-automations",
    category: "Automations & Agents",
    title: "Custom n8n AI Automations & Workflows",
    short_description: "I will build custom n8n ai automations and business workflows",
    full_description:
      "Automate repetitive operational tasks, customer support routing, document processing, and API syncs using custom n8n workflows and LLM AI agents.",
    starting_price: 35,
    hourly_rate: 40,
    features: [
      "n8n custom workflow nodes",
      "OpenAI & LLM API integrations",
      "Webhooks & database syncing",
      "Automated lead & support routing",
    ],
    tech_stack: ["n8n Workflow", "AI Agents", "OpenAI API", "Business Automation"],
    is_published: true,
    display_order: 3,
    cta_label: "Order n8n Automation",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    image_url:
      "https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs/494910179/original/8b361cf59a9b34d5858b3010e62b847290b92143.png",
    fiverr_url:
      "https://fiverr.com/jahanzeb1809/build-custom-n8n-ai-automations-and-business-workflows",
  },
  {
    id: "494912736",
    slug: "nextjs-saas-web-app",
    category: "Full Stack Web Applications",
    title: "High Performance Next.js SaaS Web App",
    short_description: "I will develop a high performance next js saas web app",
    full_description:
      "Architect and engineer production-grade Next.js SaaS applications with full-stack TypeScript, Supabase backend, PostgreSQL RLS security, and Tailwind design systems.",
    starting_price: 125,
    hourly_rate: 55,
    features: [
      "Next.js App Router & Server Components",
      "Supabase Auth & Postgres RLS database",
      "Stripe payment integration",
      "Production Vercel deployment",
    ],
    tech_stack: ["Next.js", "React 19", "Supabase", "TypeScript", "TailwindCSS"],
    is_published: true,
    display_order: 4,
    cta_label: "Order SaaS Web App",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    image_url:
      "https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs/494912736/original/d6e1fa4814b3a1d6029d55646baf670ccd1160b3.png",
    fiverr_url: "https://fiverr.com/jahanzeb1809/develop-a-high-performance-next-js-saas-web-app",
  },
];

export const FEATURED_GIG_PROJECTS = [
  {
    id: "proj-shopify-theme-debugging",
    slug: "shopify-theme-debugging-guide",
    title: "Shopify Theme Debugging & Technical Architecture",
    category: "Shopify / Commerce",
    project_type: "Shopify Theme Engineering",
    collaboration_type: "Collaborative Project",
    short_description:
      "Diagnostic analysis and technical restructuring resolving critical Shopify theme Liquid overrides and mobile layout shifts.",
    description:
      "Conducted a thorough front-end diagnostic analysis to identify app overrides causing UI breaks. Developed a comprehensive step-by-step troubleshooting architecture detailing Liquid code fixes and CSS layout restructuring.",
    summary:
      "Delivered a step-by-step developer troubleshooting manual and fixed critical Shopify theme Liquid bugs.",
    featured_image:
      "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_card/v1/attachments/project_item/attachment/d8b09eb148c72f7e988dc94ed3036728-1776980863006/Shopify%20Theme%20Debugging%20_%20Fixing%20Guide.png",
    thumbnail_url:
      "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_card/v1/attachments/project_item/attachment/d8b09eb148c72f7e988dc94ed3036728-1776980863006/Shopify%20Theme%20Debugging%20_%20Fixing%20Guide.png",
    tech_stack: ["Shopify Liquid", "CSS Layout", "JS Debugging", "Theme Architecture"],
    tags: ["Shopify Liquid", "Bug Fixing", "Theme Architecture", "Mobile UX"],
    role: "Senior Full-Stack Engineer · UI/UX Architect",
    contribution:
      "Malik led the diagnostic front-end analysis, isolated third-party JavaScript conflicts, refactored broken Liquid collection logic, and authored the technical step-by-step developer remediation manual.",
    client_name: "E-Commerce Merchant",
    year: "2026",
    is_featured: true,
    is_published: true,
    challenge:
      "The merchant experienced critical theme conflicts including an inactive 'Add to Cart' trigger, broken featured collection grid layouts on mobile viewports, and severe layout shifts after installing third-party apps.",
    approach:
      "Isolated specific CSS and JavaScript event conflicts, eliminated conflicting Liquid overrides, and engineered a modular theme layout structure to prevent app collision.",
    solution:
      "Restored cart drawer functionality, fixed mobile collection grids, and eliminated cumulative layout shifts while establishing clean Liquid customization standards.",
    outcomes: [
      "Restored Add-to-Cart & Checkout Funnel",
      "Fixed Broken Mobile Collection Grids",
      "Eliminated App JavaScript Conflicts",
      "Delivered Step-by-Step Theme Remediation Manual",
    ],
  },
  {
    id: "proj-custom-native-liquid-sections",
    slug: "custom-native-liquid-sections",
    title: "Custom Native Shopify Liquid Sections Architecture",
    category: "Shopify / Commerce",
    project_type: "Shopify Native Liquid",
    collaboration_type: "Collaborative Project",
    short_description:
      "Modular, zero-dependency Liquid sections engineered to eliminate monthly app subscriptions and boost store render speeds.",
    description:
      "Engineered custom native Liquid sections directly inside Shopify theme architectures with custom customizer schemas, inline CSS variables, and sub-second render speeds.",
    summary:
      "Built modular, zero-dependency Liquid sections for custom theme architectures on Shopify.",
    featured_image:
      "https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs/485281780/original/48722d6d3f7b018744d9c94c6bdc11d8f14301fa.png",
    thumbnail_url:
      "https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs/485281780/original/48722d6d3f7b018744d9c94c6bdc11d8f14301fa.png",
    tech_stack: ["Shopify Liquid", "Custom Schema", "JavaScript (ESNext)", "TailwindCSS"],
    tags: ["Shopify Liquid", "Custom Sections", "Theme Architecture", "CRO"],
    role: "Lead Full-Stack Engineer · UI/UX Architect",
    contribution:
      "Malik engineered the custom native Liquid schemas, built responsive touch-drag interactions in vanilla JS, and structured settings schemas for zero-dependency customizer control.",
    client_name: "D2C E-Commerce Brand",
    year: "2026",
    is_featured: true,
    is_published: true,
    challenge:
      "Merchants rely heavily on third-party page builder apps that inject bloated JavaScript, degrade Core Web Vitals, slow down mobile checkout, and incur recurring monthly app fees.",
    approach:
      "Engineered custom native Liquid sections directly inside the merchant's theme architecture using native schema settings, inline CSS variables, and lightweight vanilla JS.",
    solution:
      "Developed reusable sections (shoppable hotspots, dynamic sticky product bars, mega menus, custom swatch pickers) fully controllable via the native Shopify Theme Customizer.",
    outcomes: [
      "Zero Monthly App Subscriptions",
      "Sub-Second Theme Render Speed",
      "100% Native Theme Customizer Integration",
      "Mobile-Optimized Touch Interactions",
    ],
  },
  {
    id: "proj-shopify-store-redesign",
    slug: "shopify-store-redesign",
    title: "Shopify Store Redesign for High Conversion",
    category: "Shopify / Commerce",
    project_type: "Shopify Storefront Redesign",
    collaboration_type: "Collaborative Project",
    short_description:
      "Mobile-first Shopify e-commerce redesign focused on conversion rate optimization, modern UI/UX design, and sub-second page performance.",
    description:
      "Complete mobile-first Shopify storefront redesign built for high conversion, responsive touch ergonomics, and Core Web Vitals excellence.",
    summary: "Comprehensive e-commerce UI/UX redesign and conversion rate optimization.",
    featured_image:
      "https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs/494892850/original/2b61663d23154209df1cef3d91a6e8862f614094.png",
    thumbnail_url:
      "https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs/494892850/original/2b61663d23154209df1cef3d91a6e8862f614094.png",
    tech_stack: ["Shopify Plus", "UI/UX Architecture", "Liquid", "TailwindCSS", "CRO"],
    tags: ["Shopify Plus", "UI/UX Design", "Conversion Rate", "Mobile First"],
    role: "Lead Full-Stack Engineer · UI/UX Architect",
    contribution:
      "Malik led the mobile-first UI/UX redesign, created responsive design tokens, engineered the slide-out cart drawer with dynamic upsells, and optimized page speed metrics.",
    client_name: "High-Growth Apparel Brand",
    year: "2026",
    is_featured: true,
    is_published: true,
    challenge:
      "The legacy storefront suffered from low mobile conversion rates, clunky navigation, high bounce rates on product detail pages, and slow asset loading.",
    approach:
      "Performed a complete UI/UX audit, created responsive design tokens, and rebuilt the frontend layout using mobile-first grid systems and optimized media loading.",
    solution:
      "Redesigned homepage, collection filters, sticky cart drawer with dynamic upsells, and trust-building social proof blocks to maximize conversion.",
    outcomes: [
      "Mobile-First UI/UX Overhaul",
      "Streamlined Cart Drawer & Upsells",
      "Core Web Vitals Performance Hardening",
      "Frictionless Checkout Ergonomics",
    ],
  },
  {
    id: "proj-n8n-ai-automations",
    slug: "n8n-ai-automations",
    title: "Custom n8n AI Automations & Workflow Systems",
    category: "AI & Automation",
    project_type: "AI Operations & Automation",
    collaboration_type: "Collaborative Project",
    short_description:
      "End-to-end automated business process workflows connecting LLMs, vector search, webhooks, database syncs, and customer support routing.",
    description:
      "Architected custom n8n AI automation pipelines connecting OpenAI agents, vector knowledge retrieval, webhooks, and real-time database syncs.",
    summary: "Architected enterprise n8n workflow pipelines with OpenAI & custom agent nodes.",
    featured_image:
      "https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs/494910179/original/8b361cf59a9b34d5858b3010e62b847290b92143.png",
    thumbnail_url:
      "https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs/494910179/original/8b361cf59a9b34d5858b3010e62b847290b92143.png",
    tech_stack: ["n8n Workflows", "AI Agents", "OpenAI API", "Webhooks", "PostgreSQL"],
    tags: ["n8n Workflow", "AI Agents", "OpenAI API", "Business Automation"],
    role: "Senior AI & Automation Architect",
    contribution:
      "Malik designed self-hosted n8n automation pipelines, built custom JavaScript node transformers, integrated OpenAI agent tools, and configured PostgreSQL webhook logging.",
    client_name: "SaaS & Operations Agency",
    year: "2026",
    is_featured: true,
    is_published: true,
    challenge:
      "Manual lead processing, fragmented CRM updates, and slow response times were causing lost sales pipeline and high operational overhead for business teams.",
    approach:
      "Designed self-hosted n8n automation pipelines integrated with OpenAI, Slack, CRM webhooks, and PostgreSQL for real-time data flow.",
    solution:
      "Deployed automated AI agents capable of classifying inbound inquiries, summarizing client documentation, generating personalized outreach drafts, and updating internal databases instantly.",
    outcomes: [
      "Automated Customer Lead & Support Routing",
      "Zero Manual Data Entry across API Integrations",
      "Custom LLM Context Retrieval (RAG)",
      "24/7 Operations Monitoring & Automated Alerts",
    ],
  },
  {
    id: "proj-nextjs-saas-web-app",
    slug: "nextjs-saas-web-app",
    title: "High Performance Next.js SaaS Web Application",
    category: "React / Next.js",
    project_type: "Full-Stack SaaS Platform",
    collaboration_type: "Collaborative Project",
    short_description:
      "Production-ready Next.js SaaS web application built with React 19, Supabase Auth, PostgreSQL RLS security, and Tailwind design system.",
    description:
      "Full-stack Next.js SaaS application engineered with React Server Components, Supabase PostgreSQL RLS security, and Stripe billing workflows.",
    summary: "Production SaaS application built with Next.js App Router, Supabase, and Stripe.",
    featured_image:
      "https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs/494912736/original/d6e1fa4814b3a1d6029d55646baf670ccd1160b3.png",
    thumbnail_url:
      "https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs/494912736/original/d6e1fa4814b3a1d6029d55646baf670ccd1160b3.png",
    tech_stack: ["Next.js", "React 19", "TypeScript", "Supabase", "TailwindCSS"],
    tags: ["Next.js", "React 19", "Supabase", "TypeScript", "TailwindCSS"],
    role: "Principal Full-Stack Engineer",
    contribution:
      "Malik architected the Next.js App Router structure, designed Supabase PostgreSQL Row-Level Security (RLS) policies, built state management using TanStack Query, and styled dark-mode dashboard components.",
    client_name: "B2B Enterprise SaaS",
    year: "2026",
    is_featured: true,
    is_published: true,
    challenge:
      "Building a modern SaaS product requires enterprise security, fast initial page loads, seamless state management, and scalable API architecture without vendor lock-in.",
    approach:
      "Architected a Next.js App Router project leveraging React Server Components, TanStack Query, Supabase PostgreSQL with strict RLS policies, and TailwindCSS design tokens.",
    solution:
      "Delivered a responsive SaaS web app complete with real-time dashboard analytics, role-based user management, automated billing webhooks, and dark mode aesthetic.",
    outcomes: [
      "Full Multi-Tenant Authentication & RBAC",
      "PostgreSQL Row-Level Security (RLS)",
      "Stripe Recurring Billing Integration",
      "Sub-100ms Serverless Edge API Responses",
    ],
  },
];
