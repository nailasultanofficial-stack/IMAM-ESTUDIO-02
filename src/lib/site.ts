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
