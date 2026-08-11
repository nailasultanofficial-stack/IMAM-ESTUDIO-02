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
    id: "proj-app-free-review-engine",
    slug: "app-free-review-engine",
    title: "Custom App-Free Global Review Engine",
    category: "Shopify / Commerce",
    project_type: "Shopify Theme Engineering",
    collaboration_type: "Engineering Contribution",
    short_description:
      "Replaced a bloated third-party review app with a fully native Shopify Metaobjects review engine â€” custom Liquid, data cleanup, and a premium masonry layout.",
    description:
      "The client's third-party review app (Loox) was pulling in low-quality reviews from the Shop App and destroying their conversion rate. The solution was to rip out the app entirely and build a completely standalone native Review Engine using Shopify Metaobjects and custom Liquid blocks. Before importing, a deep data cleanup was performed â€” converting CSVs to JSON, stripping over 100 duplicated reviews, and prioritizing 22 high-quality photo reviews. The result: a premium photo-first masonry layout with 100% merchant control and zero monthly app fees.",
    summary:
      "Replaced Loox with a custom Shopify Metaobjects native review engine featuring photo-first masonry layout and zero monthly app fees.",
    featured_image:
      "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/9fd5c903a264fd92acdbf2e2fd739290-1781290886134/Custom%20App-Free%20Global%20Review%20Engine.png",
    thumbnail_url:
      "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/9fd5c903a264fd92acdbf2e2fd739290-1781290886134/Custom%20App-Free%20Global%20Review%20Engine.png",
    tech_stack: [
      "Shopify Metaobjects",
      "Shopify Liquid",
      "CSV â†’ JSON Data Cleanup",
      "CSS Masonry Layout",
    ],
    tags: ["Shopify", "Metaobjects", "Review Engine", "Liquid", "No-App"],
    role: "Shopify Theme Engineer",
    contribution:
      "Third-party app removal, Shopify Metaobjects schema design, CSV-to-JSON data migration and deduplication, custom Liquid rendering, and photo-first masonry UI build.",
    year: "2025",
    is_featured: true,
    is_published: true,
    challenge:
      "The client needed urgent 24-hour delivery to replace their Loox review app, which was pulling in uncontrollable, low-quality Shop App reviews. Their raw CSV review data also contained hundreds of duplicated, bot-like entries that looked fake and were harming conversion.",
    approach:
      "Uninstalled the third-party review app, built a completely standalone Shopify Metaobjects and custom Liquid review system from scratch, and performed a full CSV data audit to prioritize 22 high-quality photo reviews.",
    solution:
      "Delivered a premium masonry photo-first review section with 100% merchant control via the native Shopify Theme Editor â€” zero monthly app costs, zero Shop App review bleed, and a clean authentic social proof experience.",
    highlights: [
      "Replaced Third-Party App with Native Metaobjects Engine",
      "Cleaned & Deduped 100+ Bot-Like Review Entries",
      "Photo-First Premium Masonry Layout",
      "Zero Monthly App Subscription Fees",
      "24-Hour Delivery from Scoping to Production",
    ],
    outcomes: [
      "Replaced Third-Party App with Native Metaobjects Engine",
      "Cleaned & Deduped 100+ Bot-Like Review Entries",
      "Photo-First Premium Masonry Layout",
      "Zero Monthly App Subscription Fees",
    ],
  },
  {
    id: "proj-native-variant-swatch-sync",
    slug: "native-variant-swatch-sync",
    title: "Native Variant Swatch Sync System",
    category: "Shopify / Commerce",
    project_type: "Shopify Theme Engineering",
    collaboration_type: "Engineering Contribution",
    short_description:
      "Fixed a catastrophic cart bug caused by a conflicting third-party swatch app â€” built a custom Liquid/JS swatch bridge binding directly to Shopify's native variant payload.",
    description:
      "The client's Swatch King app was conflicting with native size selectors: customers would visually select a color + size, but the backend script would fail and send the wrong variant to checkout â€” causing abandoned carts and lost revenue. The solution was to completely uninstall the conflicting app and build a custom UI swatch layer from scratch, engineering a direct Liquid/JS bridge that binds custom macro-texture swatches (Gold, Silver, Emerald) to Shopify's native hidden radio buttons. The result: 100% absolute cart stability with zero app dependencies.",
    summary:
      "Replaced a conflicting swatch app with a custom Liquid/JS bridge that communicates directly with Shopify's native variant payload for guaranteed cart accuracy.",
    featured_image:
      "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/32bd59d08205bff66285bd1764063660-1778413982446/Native%20Variant%20Swatch%20Sync%20System.png",
    thumbnail_url:
      "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/32bd59d08205bff66285bd1764063660-1778413982446/Native%20Variant%20Swatch%20Sync%20System.png",
    tech_stack: [
      "Shopify Liquid",
      "Vanilla JavaScript",
      "Shopify Variant API",
      "Custom CSS Swatches",
    ],
    tags: ["Shopify", "Liquid", "Variant Swatches", "Cart Fix", "JavaScript"],
    role: "Shopify Theme Engineer",
    contribution:
      "Third-party swatch app removal, custom macro-texture swatch UI engineering, Liquid/JS event bridge to Shopify native radio button inputs, and end-to-end cart payload testing.",
    year: "2025",
    is_featured: true,
    is_published: true,
    challenge:
      "A third-party swatch app (Swatch King) was creating a critical cart bug: customers would select a specific color + size, but the backend script would silently send the wrong variant to checkout â€” destroying conversion and eroding customer trust.",
    approach:
      "Completely uninstalled the conflicting app. Built a custom swatch UI that communicates directly with Shopify's native hidden radio buttons, bypassing all unreliable app JavaScript layers entirely.",
    solution:
      "A fully custom swatch system where each visual macro-texture swatch (Gold, Silver, Emerald) triggers a direct event dispatch to the native Shopify variant selector â€” guaranteeing correct size + color reaches the checkout every time.",
    highlights: [
      "Fixed Critical Wrong-Variant Cart Bug",
      "Removed Conflicting Third-Party App Entirely",
      "Custom Liquid/JS Direct Variant Bridge",
      "Premium Macro-Texture Swatch UI (Gold, Silver, Emerald)",
      "100% Native Shopify Variant Payload Accuracy",
    ],
    outcomes: [
      "Fixed Critical Wrong-Variant Cart Bug",
      "Removed Conflicting Third-Party App Entirely",
      "Custom Liquid/JS Direct Variant Bridge",
      "100% Native Shopify Variant Payload Accuracy",
    ],
  },
  {
    id: "proj-build-your-own-box-configurator",
    slug: "build-your-own-box-configurator",
    title: "Custom Build-Your-Own Box Configurator",
    category: "Shopify / Commerce",
    project_type: "Shopify Custom Section Development",
    collaboration_type: "Engineering Contribution",
    short_description:
      "Multi-step interactive tray bundle builder with live visual previews, tray-size slot logic, and a native smart inventory manager built directly into the Shopify Theme Editor.",
    description:
      "A premium nuts and dried fruit brand needed to replace a basic static tray page with an interactive multi-step bundle builder. The solution was a custom Shopify Liquid and JavaScript section built from scratch, featuring independent tray sizes with custom CSS clip-paths for live visual previews, smart inventory logic with a native Sold Out Manager synced to Shopify's backend, and line-item properties for clean checkout passage.",
    summary:
      "Built a fully interactive visual tray bundle builder with smart inventory logic, live clip-path previews, and a native Theme Editor sold-out management system.",
    featured_image:
      "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/fd2f01c830263bee62571c11faebccde-1778411479697/Custom%20Shopify%20Tray%20Builder%20%20UI%20UX%20Redesign.png",
    thumbnail_url:
      "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/fd2f01c830263bee62571c11faebccde-1778411479697/Custom%20Shopify%20Tray%20Builder%20%20UI%20UX%20Redesign.png",
    tech_stack: [
      "Shopify Liquid",
      "Vanilla JavaScript",
      "CSS Clip-Path",
      "Shopify Line-Item Properties",
    ],
    tags: ["Shopify", "Bundle Builder", "Interactive UI", "Custom Section", "Inventory Logic"],
    role: "Shopify Theme Engineer",
    contribution:
      "Custom Liquid section architecture, JavaScript multi-step tray logic, CSS clip-path live preview system, native Theme Editor Sold Out Manager, and Shopify line-item property checkout integration.",
    year: "2025",
    is_featured: true,
    is_published: true,
    challenge:
      "The client needed a highly visual, multi-step bundle builder supporting multiple physical tray sizes (6 and 8 slots), real-time visual feedback as selections were made, out-of-stock slot handling, and clean checkout integration â€” all without a third-party app.",
    approach:
      "Built a custom Liquid section with independent tray templates, CSS clip-path slot visualizations for live preview, and JavaScript-driven selection state management that enforces tray capacity rules and communicates inventory status to customers in real time.",
    solution:
      "An interactive tray builder where customers build their custom selections visually, with live clip-path previews per slot, smart inventory enforcement, and a native Sold Out Manager built directly into the Shopify Theme Editor for merchant control.",
    highlights: [
      "Multi-Step Bundle Builder with Live Visual Previews",
      "CSS Clip-Path Custom Slot Visualizations",
      "6-Slot & 8-Slot Tray Size Logic",
      "Native Theme Editor Sold Out Manager",
      "Clean Line-Item Properties Checkout Integration",
    ],
    outcomes: [
      "Multi-Step Bundle Builder with Live Visual Previews",
      "CSS Clip-Path Custom Slot Visualizations",
      "Native Theme Editor Sold Out Manager",
      "Clean Line-Item Properties Checkout Integration",
    ],
  },
  {
    id: "proj-single-page-bundle-builder",
    slug: "single-page-bundle-builder",
    title: "Single-Page Dynamic Bundle Builder",
    category: "Shopify / Commerce",
    project_type: "Shopify Custom Section Development",
    collaboration_type: "Engineering Contribution",
    short_description:
      "Engineered a frictionless single-page 'Build Your Custom Set' experience with JavaScript category-lock validation protecting merchant margins on a Buy 1 Get 2 Free offer.",
    description:
      "The client wanted to recreate a high-end 'Build Your Custom Set' (Buy 1, Get 2 Free) experience on a single frictionless landing page â€” no multi-step popups. The critical challenge was building strict margin-protection logic preventing customers from abusing the offer (e.g., adding 3 expensive rings instead of the required 1 ring + 1 bracelet + 1 pouch combination). The solution was a custom one-page UI with product grids, a sticky 'Your Bundle' summary, and JavaScript validation that locks categories once selected â€” forcing the exact required combination before the Add-to-Cart button activates.",
    summary:
      "Built a premium single-page bundle configurator with JavaScript margin-protection logic integrated with Shopify's native automatic discount engine.",
    featured_image:
      "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/ed3739932751d6c42cbc54f05d01abf0-1778413886064/Single-Page%20Dynamic%20Bundle%20Builder.png",
    thumbnail_url:
      "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/ed3739932751d6c42cbc54f05d01abf0-1778413886064/Single-Page%20Dynamic%20Bundle%20Builder.png",
    tech_stack: ["Shopify Liquid", "Vanilla JavaScript", "Shopify Discount Engine", "Custom UI"],
    tags: ["Shopify", "Bundle Builder", "JavaScript", "CRO", "Discount Engine"],
    role: "Shopify Theme Engineer",
    contribution:
      "Single-page bundle UI architecture, JavaScript category-lock validation engine, sticky bundle summary panel, Shopify automatic discount engine integration, and Add-to-Cart activation gating.",
    year: "2025",
    is_featured: true,
    is_published: true,
    challenge:
      "Previous bundle setups required multi-step popups. The client needed all selections on one page. Critically, the offer required strict margin-protection â€” preventing customers from selecting 3 expensive items instead of the mandated 1 ring + 1 bracelet + 1 pouch combination.",
    approach:
      "Developed a custom one-page UI where product grids and a sticky 'Your Bundle' live summary coexist. Wrote custom JavaScript that locks each product category once a selection is made, enforcing the exact required bundle composition before enabling Add-to-Cart.",
    solution:
      "A seamless single-page premium bundle experience: customers select their combination with instant visual feedback, the sticky summary updates live, and the Add-to-Cart button only activates once the exact merchant-specified combination is met. Fully integrated with Shopify's native automatic discount engine.",
    highlights: [
      "Zero Multi-Step Popup â€” All Selections on One Page",
      "JavaScript Category-Lock Margin Protection",
      "Sticky Live Bundle Summary Panel",
      "Shopify Native Automatic Discount Engine Integration",
      "Add-to-Cart Activation Gating Logic",
    ],
    outcomes: [
      "Zero Multi-Step Popup â€” All Selections on One Page",
      "JavaScript Category-Lock Margin Protection",
      "Shopify Native Automatic Discount Engine Integration",
      "Add-to-Cart Activation Gating Logic",
    ],
  },
  {
    id: "proj-smart-cart-drawer",
    slug: "smart-cart-drawer",
    title: "Conversion-Optimized Smart Cart Drawer",
    category: "Shopify / Commerce",
    project_type: "Shopify Cart Engineering",
    collaboration_type: "Engineering Contribution",
    short_description:
      "Overhauled a jewelry brand's static cart into a gamified AOV-driving cart drawer with a 3-step progress bar, auto-injected free gift logic, and a session-persistent countdown timer.",
    description:
      "A high-end jewelry brand needed to aggressively increase Average Order Value (AOV) without slow, bloated apps. The solution was a complete cart drawer overhaul using custom Liquid and JavaScript: a dynamic 3-step progress bar with custom iconography that updates in real-time as items are added, a strict auto-inject logic that drops a specific Free Gift variant into the cart when thresholds are met (and auto-removes it if cart value drops), and a session-persistent countdown timer engineered without any third-party app dependency.",
    summary:
      "Built a gamified cart drawer with dynamic AOV progress bar, auto-inject free gift logic, and session-persistent countdown timer â€” all native Liquid and JavaScript, zero apps.",
    featured_image:
      "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/1351b35b4d2eca8cf7da2d75ec6e5d8d-1778413683681/Conversion-Optimized%20Smart%20Cart%20Drawer.png",
    thumbnail_url:
      "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/1351b35b4d2eca8cf7da2d75ec6e5d8d-1778413683681/Conversion-Optimized%20Smart%20Cart%20Drawer.png",
    tech_stack: ["Shopify Liquid", "Vanilla JavaScript", "Shopify AJAX Cart API", "CSS Animations"],
    tags: ["Shopify", "Cart Drawer", "AOV Optimization", "JavaScript", "Free Gift Logic"],
    role: "Shopify Theme Engineer",
    contribution:
      "Complete cart drawer rebuild, dynamic 3-step progress bar with iconography, auto-inject/auto-remove free gift variant logic via Shopify AJAX Cart API, and session-persistent countdown timer engineering.",
    year: "2025",
    is_featured: true,
    is_published: true,
    challenge:
      "The client's existing cart was completely static. They needed a 'Buy 3, Pay 2 + Free Gift' progress experience with a visual progress bar and a session-persistent countdown timer â€” all without the page speed penalty of bloated third-party cart apps.",
    approach:
      "Completely rebuilt the cart drawer in custom Liquid and JavaScript. Designed a 3-step AOV progress bar with custom iconography that updates in real-time, engineered auto-inject/auto-remove logic for the free gift variant via Shopify's AJAX Cart API, and built a native JavaScript session-persistent countdown timer.",
    solution:
      "A highly psychological, gamified cart experience: the progress bar visually rewards customers for adding more items, the countdown timer creates urgency, and the free gift automatically appears when thresholds are met â€” then disappears if the cart value drops. Zero app dependencies.",
    highlights: [
      "Dynamic 3-Step AOV Progress Bar with Live Updates",
      "Auto-Inject & Auto-Remove Free Gift Variant Logic",
      "Session-Persistent Countdown Timer (No App)",
      "Native Shopify AJAX Cart API Integration",
      "Zero Third-Party App Dependencies",
    ],
    outcomes: [
      "Dynamic 3-Step AOV Progress Bar with Live Updates",
      "Auto-Inject & Auto-Remove Free Gift Variant Logic",
      "Session-Persistent Countdown Timer (No App)",
      "Zero Third-Party App Dependencies",
    ],
  },
];
