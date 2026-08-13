-- ============================================================
-- Update Projects and Services based on Fiverr Data
-- ============================================================

BEGIN;

-- Wipe existing incorrect projects and services
DELETE FROM public.projects;
DELETE FROM public.services;

-- Insert Services

INSERT INTO public.services (slug, title, short_description, full_description, icon_name, image_url, order_index, is_published, features, created_at, updated_at)
VALUES (
    'themes-plugins-installation',
    'Themes/Plugins Installation',
    '',
    '',
    'layout',
    'https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs/485281780/original/48722d6d3f7b018744d9c94c6bdc11d8f14301fa.png',
    1,
    true,
    '[]'::jsonb,
    now(),
    now()
);

INSERT INTO public.services (slug, title, short_description, full_description, icon_name, image_url, order_index, is_published, features, created_at, updated_at)
VALUES (
    'website-builders-design',
    'Website Builders Design',
    '',
    '',
    'layout',
    'https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs/494892850/original/2b61663d23154209df1cef3d91a6e8862f614094.png',
    1,
    true,
    '[]'::jsonb,
    now(),
    now()
);

INSERT INTO public.services (slug, title, short_description, full_description, icon_name, image_url, order_index, is_published, features, created_at, updated_at)
VALUES (
    'automations-agents',
    'Automations & Agents',
    '',
    '',
    'layout',
    'https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs/494910179/original/8b361cf59a9b34d5858b3010e62b847290b92143.png',
    1,
    true,
    '[]'::jsonb,
    now(),
    now()
);

INSERT INTO public.services (slug, title, short_description, full_description, icon_name, image_url, order_index, is_published, features, created_at, updated_at)
VALUES (
    'full-stack-web-applications',
    'Full Stack Web Applications',
    '',
    '',
    'layout',
    'https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs/494912736/original/d6e1fa4814b3a1d6029d55646baf670ccd1160b3.png',
    1,
    true,
    '[]'::jsonb,
    now(),
    now()
);

-- Insert Projects

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'custom-app-free-global-review-engine-1',
    'Custom App-Free Global Review Engine',
    'Fiverr Client',
    'Various',
    '',
    'Custom App-Free Global Review Engine Client Goal: The client needed to establish high-end social proof without relying on a third-party app (Loox) that was pulling in uncontrollable, low-quality reviews from the Shop App, which was killing their conversion rate. The Challenge: We needed an urgent, 24-hour turnaround to replace the app entirely. Furthermore, their raw CSV review data contained hundreds of messy, duplicated bot-like text entries that looked fake. The Solution: I ripped out the third-party app and built a completely standalone, native Review Engine using Shopify Metaobjects and custom Liquid blocks. Before importing, I performed a deep data cleanup—converting CSVs to JSON, stripping out over 100 duplicated reviews, and prioritizing 22 high-quality photo reviews. The Result: I designed a beautiful, premium masonry layout that displays photo-first reviews at the top. The client now has 100% control over their social proof, zero monthly app fees, and a lightning-fast, highly authentic review section.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/9fd5c903a264fd92acdbf2e2fd739290-1781290886134/Custom%20App-Free%20Global%20Review%20Engine.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    1,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'native-variant-swatch-sync-system-2',
    'Native Variant Swatch Sync System',
    'Fiverr Client',
    'Various',
    '',
    'Native Variant Swatch Sync System Client Goal: To fix a catastrophic cart bug that was destroying the store''s conversion rate, while maintaining a premium visual aesthetic. The Challenge: The client''s third-party swatch app (Swatch King) was conflicting with the theme''s native size selectors. Customers would visually select a specific color and size, but the backend script would fail, sending the wrong product variant to the checkout. Customers were abandoning carts due to this error. The Solution: I completely uninstalled the conflicting third-party app and built a custom UI swatch layer from scratch. I engineered a direct Liquid/JS bridge that binds custom visual macro-texture swatches (Gold, Silver, Emerald) directly to Shopify''s native, hidden radio buttons. The Result: 100% absolute cart stability. By bypassing unreliable app scripts and communicating directly with Shopify''s native variant payload, the correct size and color are added to the cart instantly every single time, drastically improving the store''s reliability and speed.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/32bd59d08205bff66285bd1764063660-1778413982446/Native%20Variant%20Swatch%20Sync%20System.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    2,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'customization-3',
    'Customization',
    'Fiverr Client',
    'Various',
    '',
    'Made on Fiverr Customization "Delivered exactly what needed! Recommending!"',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/delivery/asset/620ec0903d2242e76cd4a4417a12948a-1712329353/screencapture-tanelwardrobe-collections-wardrobe-sale-2024-04-05-19_57_45.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    3,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'custom-build-your-own-box-configurator-4',
    'Custom Build-Your-Own Box Configurator',
    'Fiverr Client',
    'Various',
    '',
    'Custom Build-Your-Own Box Configurator Client & Goals: A premium nuts and dried fruit brand needed to replace a basic, static custom tray page with an interactive, highly visual multi-step bundle builder. They wanted customers to build their own trays by selecting specific slots, with real-time visual feedback. Challenges: The project required complex multi-step logic, live visual previews without page reloads, restricting selections based on the physical tray size (6 slots vs. 8 slots), and handling out-of-stock items so customers wouldn''t order unavailable products. How I Dealt With Them: I developed a custom Shopify Liquid and JavaScript section from scratch. I created independent tray sizes with custom clip-paths to generate live visual previews as items were selected. To solve the inventory issue, I coded a "Smart Inventory Logic" system and built a "Sold Out Manager" directly into the Theme Editor. This automatically synced with Shopify''s backend to hide out-of-stock items. Finally, I ensured all custom selections were passed cleanly to the checkout using line-item properties.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/fd2f01c830263bee62571c11faebccde-1778411479697/Custom%20Shopify%20Tray%20Builder%20%20UI%20UX%20Redesign.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    4,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'single-page-dynamic-bundle-builder-5',
    'Single-Page Dynamic Bundle Builder',
    'Fiverr Client',
    'Various',
    '',
    'Single-Page Dynamic Bundle Builder Client Goal: The client wanted to recreate a high-end "Build Your Custom Set" experience (Buy 1, Get 2 Free) on a single, frictionless landing page. The Challenge: Previous bundle setups required multi-step popups. The new requirement demanded all selections happen on one page. Crucially, I had to engineer strict margin-protection logic to prevent customers from abusing the offer (e.g., preventing them from adding 3 expensive rings instead of 1 ring, 1 free bracelet, and 1 free pouch). The Solution: I built a custom one-page UI where product grids and a sticky "Your Bundle" summary coexist dynamically. I wrote custom JavaScript validation that locks categories once an item is selected—forcing the exact required combination (1 Ring, 1 Bracelet, 1 Pouch) before the Add-to-Cart button activates. The Result: A flawless, high-converting premium bundle experience that fully integrates with Shopify''s native automatic discount engine, protecting the merchant''s profit margins while delighting the customer.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/ed3739932751d6c42cbc54f05d01abf0-1778413886064/Single-Page%20Dynamic%20Bundle%20Builder.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    5,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'wix-layout-copied-from-template-6',
    'Wix :Layout Copied from template',
    'Fiverr Client',
    'Various',
    '',
    'Wix :Layout Copied from template ABK Logistics is specialize in comprehensive logistics, offering services that range from the import of merchandise, customs agency, international cargo agency and distribution. We Design ABK Logistics Site to get stand out from the other logistics companies. We get idea of lay out from a premium tamplate Named as "Cargel Logistics & Cargel".',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/98ea043114600a1cc52c46bd802aedab-1712487396224/logistics%20WEBSITE%20DESIGN.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    6,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'conversion-optimized-smart-cart-drawer-7',
    'Conversion-Optimized Smart Cart Drawer',
    'Fiverr Client',
    'Various',
    '',
    'Conversion-Optimized Smart Cart Drawer Client Goal: A high-end jewelry brand wanted to aggressively increase their Average Order Value (AOV) and create a sense of urgency during the checkout process. The Challenge: Their existing cart was static. They needed a complex "Buy 3, Pay 2 + Free Gift" logic with a visual progress bar and a session-persistent countdown timer, all without relying on bloated apps that slow down page speed. The Solution: I completely overhauled their cart drawer using custom Liquid and JavaScript. I implemented a dynamic 3-step progress bar with custom iconography that updates in real-time as items are added. I also engineered a strict logic script that automatically injects a specific Free Gift variant into the cart when thresholds are met, and auto-removes it if the cart value drops. The Result: A highly psychological, gamified cart experience that natively drives higher AOV and urgency, complete with a sticky countdown timer that persists smoothly across the user''s session.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/1351b35b4d2eca8cf7da2d75ec6e5d8d-1778413683681/Conversion-Optimized%20Smart%20Cart%20Drawer.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    7,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'cloned-amazon-s-website-8',
    'Cloned Amazon''s website',
    'Fiverr Client',
    'Various',
    '',
    'Cloned Amazon''s website Just cloned Amazon''s website using only HTML and CSS! 💻✨ Check out my latest project and see how close it looks to the real deal. #WebDevelopment #Coding #HTML #CSS #Tech #Programming #Developer #WebDesign #TechSkills #Project',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/0a090c286e0766e97cca297cd036d29a-1717002256616/AMAZON%20FULL%20PAGE.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    8,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'extreme-gaming-casino-website-9',
    'Extreme Gaming Casino Website',
    'Fiverr Client',
    'Various',
    '',
    'Extreme Gaming Casino Website "Extreme Gaming" is an online casino platform designed to provide a thrilling and engaging experience for casino enthusiasts. This website is developed using WordPress, ensuring ease of use, flexibility, and scalability. Our goal is to create a visually stunning, user-friendly, and secure platform that meets the client''s specific requirements and exceeds user expectations.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/f401a01f8cdaae27d5bd42124f4cc782-1718251898130/screencapture-xn-extreme-rk6mz66e-2024-06-10-15_42_56.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    9,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'custom-product-images-showcase-for-shopify-stores-10',
    'Custom Product Images Showcase for Shopify Stores',
    'Fiverr Client',
    'Various',
    '',
    'Custom Product Images Showcase for Shopify Stores This project demonstrates a Custom Product Images Showcase Section built for Shopify stores. Tailored to elevate user engagement, this section includes the following features: Randomized Image Display: Displays product images in a random order every time the page loads, creating a fresh browsing experience. Dynamic Image Grid: A visually appealing grid layout that highlights all product images with hover effects and lazy loading for enhanced performance. Responsive Design: Fully optimized for seamless performance across desktops, tablets, and mobile devices. Theme Editor Integration: Allows store owners to set the number of images to display through the Shopify theme editor, making it highly customizable. This project is designed for Shopify merchants looking to showcase their product visuals effectively and attractively.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/917e05f2e94f8a08a8b79f1b9ccaea56-1733422213354/Custom%20Product%20Images%20Showcase%20for%20Shopify%20Stores.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    10,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'product-page-ui-mobile-gallery-sticky-atc-11',
    'Product Page UI: Mobile Gallery & Sticky ATC',
    'Fiverr Client',
    'Various',
    '',
    'Product Page UI: Mobile Gallery & Sticky ATC Client & Goals A sports nutrition brand needed to boost mobile conversion rates (CRO). The goal: a frictionless mobile checkout, dynamic delivery expectations, and a premium "SaaS-style" media gallery. Challenges Standard Shopify themes were too bulky on mobile. The client needed a custom "split-grid" mobile gallery without breaking the desktop layout. They also required a Sticky Add-to-Cart (ATC) bar synced to a complex delivery timer calculating strict cutoff hours and country-specific weekend rules (e.g., Saturday delivery for NL/BE). Lastly, sold-out variants needed a "Notify Me" lead-capture flow instead of a basic "Sold Out" button. How I Dealt With Them I engineered a custom, app-free Shopify 2.0 solution: • Mobile Gallery: Built a 1+2 media grid for screens <999px. Wrote vanilla JS to sync side-preview images with the main slider, safely skipping hidden variant images. • Sticky ATC: Developed a persistent mobile bar with a variant selector, dynamic pricing, and a back-in-stock modal. • Delivery Engine: Coded Liquid logic to calculate real-time shipping dates based on localization, cutoff times, and weekend rules. • Smooth UX: Added smooth-scroll anchor links for reviews. Result A lightning-fast, high-converting mobile product page with a premium UI and transparent delivery promises.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/e4cea8de8d5ac0591a7fb6bcf91db17d-1776722805011/Mobile-First%20Conversion%20UXSplit%20Gallery%20_%20Sticky%20ATC.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    11,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'urgent-shopify-launch-support-bug-fixes-12',
    'Urgent Shopify Launch Support & Bug Fixes',
    'Fiverr Client',
    'Various',
    '',
    'Urgent Shopify Launch Support & Bug Fixes Client & Goals The client was preparing for a highly anticipated brand launch for their store ("ASHA") but was blocked by critical front-end UI glitches. The goal was to provide same-day, emergency development support to diagnose and resolve these bugs to ensure a flawless go-live. Challenges Right before the launch window, the store experienced two major visual bugs. First, a CSS/loading conflict caused collection banner text to incorrectly turn black after the page loaded, ruining the design. Second, the mobile navigation menu drawer was completely broken, with the malfunction specifically isolated to the homepage''s behavior. How I Dealt With Them Working under a strict 24-hour deadline, I audited the theme''s code: • Banner Fix: I isolated and removed the conflicting CSS/JS override that was forcing the text color change on the collection templates. • Mobile Menu Repair: I debugged the homepage-specific navigation logic, repairing the drawer''s scripts to ensure it opened and closed smoothly across all devices. • QA Check: I performed a rapid cross-check of the store''s overall mobile responsiveness and launch stability to prevent any other surprises. Result All critical UI bugs were successfully resolved within 24 hours. The storefront was stabilized, allowing the client to execute their launch smoothly and with full confidence.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/a093401cc761bbf61be3b3663c1edb7b-1776724087407/Collection%20Banner%20Fix%20_%20Mobile%20Menu%20Drawer%20Repair.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    12,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'high-converting-b2b-lead-gen-funnel-in-framer-13',
    'High-Converting B2B Lead Gen Funnel in Framer',
    'Fiverr Client',
    'Various',
    '',
    'High-Converting B2B Lead Gen Funnel in Framer The Client & Goal: I partnered with noll.media, a marketing agency targeting the German industrial and manufacturing sector. They needed a custom, conversion-focused one-page funnel ("Maschinenbauer 3.0") built in Framer. The primary goal was to generate high-quality B2B leads and applicant bookings via a seamless Calendly integration, entirely in German. The Challenge: The client provided a standard SaaS Framer template, but it needed to be heavily adapted into a specialized B2B funnel. The core challenge was conceptual: they didn''t just want a website; they wanted a visual representation of a "System/Machine." We needed to visually communicate the complex process of taking raw, unstructured inputs (traffic/applicants) and processing them into structured, high-value outputs (leads). Additionally, the design lacked the stark, high-contrast visual hierarchy required to clearly separate "Before" and "After" states for their clients. The Solution: Custom Visual Architecture: I completely redesigned the core sections of the template to create a custom input/output visual flow, effectively illustrating their "Machine" concept without cluttering the UI. High-Contrast UX: I implemented a strong visual hierarchy using striking neon-green accents against a dark industrial aesthetic to drastically emphasize the "After" states and the "Geeignet für" (Suitable for) target audience crit',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/37acf12af2f8afcab5adb2ad4272a267-1777980329669/High-Converting%20B2B%20Lead%20Gen%20Funnel%20in%20Framer.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    13,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'custom-shopify-page-templates-14',
    'Custom Shopify Page Templates',
    'Fiverr Client',
    'Various',
    '',
    'Custom Shopify Page Templates Client & Goals: A premium health and wellness brand needed to elevate their store’s UX to match high-end competitors. Their goal was to redesign their core informational pages (Science, Technology) and Best Seller collection. Challenges: The client’s previous theme was rigid, hard to edit, and visually outdated compared to their top competitors. They needed a polished look without losing the ability to edit content themselves. Solution: I engineered custom, responsive Liquid templates using Shopify OS 2.0 architecture. I delivered a component-based design that matched the premium SaaS aesthetic of their competitors while remaining 100% editable via the Shopify Theme Editor, ensuring the client had full control over their new, fast-loading, SEO-friendly pages.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/5e90d70ea922eb48f59481af3997d49b-1777984027534/Technology%20_%20Science.jpg',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    14,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'high-converting-product-page-ux-15',
    'High-Converting Product Page UX',
    'Fiverr Client',
    'Various',
    '',
    'High-Converting Product Page UX Client & Goals: The client was driving expensive paid traffic to their product pages but experiencing a low conversion rate. The goal was to optimize the "Above the Fold" experience to capture sales instantly. Challenges: The original product page was cluttered with long text blocks and lacked immediate trust signals, causing users to bounce before understanding the product''s value. Solution: I executed a conversion-focused UI redesign. I streamlined the layout by introducing strategic trust badges (FDA Approved, Guarantee, Shipping), pushed star ratings to the top, and condensed the core value proposition into punchy bullet points. I also optimized the Add-to-Cart section to be compact and frictionless, resulting in a cleaner, premium, high-converting product page',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/89c15206774015258078d66e4d216a63-1781291071411/Product%20Cards%20Enhancement%20_%20Mobile%20Centering.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    15,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'dynamic-shopify-mega-menu-build-16',
    'Dynamic Shopify Mega Menu Build',
    'Fiverr Client',
    'Various',
    '',
    'Dynamic Shopify Mega Menu Build Client & Goals: An e-commerce brand needed a robust, visually appealing way to showcase their expanding product lines directly in the header navigation. Challenges: The client had accidentally broken their previous hardcoded menu, leading to layout issues and "Flash of Unstyled Text" (FOUT) font loading errors that made the site look unprofessional. Solution: I developed a fully dynamic, advanced Mega Menu from scratch. I built a flexible 4-column product grid layout that the client could easily manage and update via the Theme Editor without touching code. Furthermore, I optimized the CSS delivery to instantly load custom fonts, eliminating the flashing issue and delivering a seamless, high-end desktop navigation experience.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/d55f012356ac1a409bab9dd34d221167-1777986077600/Above-The-Fold%20PDP%20Redesign.jpg',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    16,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'mobile-ux-audit-cro-sprints-17',
    'Mobile UX Audit & CRO Sprints',
    'Fiverr Client',
    'Various',
    '',
    'Mobile UX Audit & CRO Sprints Client & Goals: A high-volume Shopify store was suffering from an unsustainable Cost Per Acquisition (CPA) and low conversion rates on mobile devices. The goal was to systematically identify and remove buying friction. Challenges: Heatmap data showed that users were highly engaged but overwhelmed by cluttered mobile elements, mixed signals, and an unclear Add-to-Cart path, causing them to drop off before checkout. Solution: I implemented a data-driven 48-hour CRO testing cycle. In Sprint 1, I consolidated cluttered announcement bars, optimized image load times, and built a persistent "Sticky Add-to-Cart" bar for mobile users. By removing distractions and making the purchase path frictionless, we successfully pushed more users deeper into the checkout funnel.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/41798b3b301f2976de1ec9e646b43568-1777986331271/Advanced%20Dynamic%20Mega%20Menu%20Development.jpg',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    17,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'fix-shopify-meta-lead-pixel-bug-18',
    'Fix Shopify Meta Lead Pixel Bug',
    'Fiverr Client',
    'Various',
    '',
    'Fix Shopify Meta Lead Pixel Bug Client & Goals: I worked with an up-and-coming Shopify apparel brand running Facebook (Meta) Ads to collect SMS numbers via a Klaviyo embedded form. Their primary goal was to accurately track these sign-ups as "Lead" events in Meta to optimize their ad spend and improve attribution. The Challenge: The client was experiencing a major reporting discrepancy: Meta Ads was showing significantly more "Leads" than the actual number of SMS subscribers appearing in Klaviyo. The root cause was that Klaviyo embedded forms submit via AJAX. The client''s existing tracking script was firing the Meta Lead event immediately upon a button click, regardless of whether the signup was actually successful (e.g., if a user entered an invalid number or was already subscribed). We also had to ensure the tracking worked flawlessly across different browsers, including Safari. How I Dealt With It: Removed Faulty Logic: I stripped out the inaccurate click-based tracking script that was causing inflated ad metrics. Custom Success Hook: I engineered a lightweight JavaScript solution that specifically listened for Klaviyo''s internal success callback. This ensured the fbq(''track'', ''Lead'') event only fired after a verified, successful SMS signup. Theme Integration: I properly integrated the tracking code into the Shopify theme layout, ensuring it worked seamlessly on both the storefront and the password page.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/3ae567024deb411e8992f157d7e4d945-1781291245191/Klaviyo%20SMS%20to%20Meta%20Lead%20Tracking.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    18,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'amazon-style-product-page-pdp-redesign-19',
    'Amazon-Style Product Page (PDP) Redesign',
    'Fiverr Client',
    'Various',
    '',
    'Amazon-Style Product Page (PDP) Redesign Client & Goals: An expanding e-commerce food brand wanted to overhaul their Product Detail Pages (PDP) to match the high-converting, heavily structured layout of Amazon. The goal was to build trust, highlight product benefits, and streamline the buying flow. Challenges: Reorganizing a massive amount of product data (descriptions, complex subscription models, and variants) without breaking the existing theme. The client also needed larger "A+ Content" modules and dedicated trust signals that were missing from their default theme. How I Dealt With Them: I developed a highly structured, reusable Liquid product page template. I redesigned the "Buy Box" to clearly separate one-time purchases from "Subscribe & Save" options, using custom CSS to override and clean up the subscription app''s clunky default layout. I added custom blocks for Trust Badges, bullet-point USP sections, and integrated a seamless slide-out cart drawer (iCart) to replace the standard cart page, drastically improving the mobile conversion funnel.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/a3c4d6623133240cc9080244544d7eb1-1778411661333/Amazon-Style%20Product%20Page%20(PDP)%20Redesign.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    19,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'custom-responsive-category-navigation-ui-20',
    'Custom Responsive Category Navigation UI',
    'Fiverr Client',
    'Various',
    '',
    'Custom Responsive Category Navigation UI Client & Goals: A retail brand with a growing catalog needed to upgrade their homepage and collection pages. Their default theme layout was bulky and took up too much screen space. They wanted a tight, highly visual, grid-based category navigation system. Challenges: The native Shopify blocks did not allow for a clean 4-column layout that scaled elegantly to mobile. The client also needed to be able to swap out categories and images themselves without needing a developer every time. How I Dealt With Them: I coded a custom Shopify section tailored for visual discovery. I utilized CSS Grid to ensure perfect spacing and a flawless 4-column desktop to 2-column mobile responsive shift. I added premium micro-interactions (soft hover lifts and color transitions) to make it feel like a high-end SaaS interface. I built the entire section to be 100% manageable via the Shopify T',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/d15b8a333f3945473141f1ae3bd68e3a-1778411912745/Responsive%20Category%20Grid%20_%20Navigation.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    20,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'advanced-checkout-shipping-logic-21',
    'Advanced Checkout & Shipping Logic',
    'Fiverr Client',
    'Various',
    '',
    'Advanced Checkout & Shipping Logic Client & Goals: An established e-commerce store wanted to optimize their checkout shipping options. They needed to maintain their rule of "Free Standard Shipping over $50" while seamlessly integrating an automatically calculated "UPS 2-Day Express" option. Challenges: The store''s existing Shopify shipping zones were overlapping, causing fatal "Shipping not available" errors at checkout. Additionally, activating UPS live carrier rates required strict API verification that was blocking any edits to the shipping profiles. How I Dealt With Them: I conducted a full audit of their shipping profile and resolved the overlapping zone conflicts. I securely integrated and verified the official UPS application to unlock automated rate calculations. Finally, I cleaned up the checkout UI so customers were presented with a frictionless, easy-to-understand choice between standard flat-rate shipping or live-calculated 2-day express, completely eliminating the checkout errors.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/f04276d62609cab4fd49f64254290555-1781291437386/Advanced%20Checkout%20_%20Shipping%20Logic.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    21,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'custom-shopify-bundle-selection-ui-22',
    'Custom Shopify Bundle Selection UI',
    'Fiverr Client',
    'Various',
    '',
    'Custom Shopify Bundle Selection UI I created a custom Shopify bundle selection frontend layout for an eCommerce store. The client wanted a bundle builder style section inspired by a reference website, but with a different custom design instead of an exact clone. The goal was to create a clean and modern layout where customers could visually select products step by step, view bundle options, and understand the selection flow easily. For this project, I focused on the frontend layout and UI structure. The design included a bundle selection interface, product cards, selected product states, step-by-step navigation style, pricing area, and a responsive layout structure. The main challenge was keeping the design similar in behavior to the reference while making it visually different and suitable for the client’s Shopify store. I handled this by creating a clean custom layout with modern spacing, clear product selection cards, and a user-friendly bundle flow. The final result was a Shopify-ready frontend layout that the client could integrate with their own functionality.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/9f85ee5a4a291c1144720ca609e2fbed-1781291611149/Custom%20Shopify%20Bundle%20Selection%20UI.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    22,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'interactive-shade-quiz-variant-mapper-23',
    'Interactive Shade Quiz & Variant Mapper',
    'Fiverr Client',
    'Various',
    '',
    'Interactive Shade Quiz & Variant Mapper Client Goal: A cosmetics brand needed a way to help customers accurately select their skin tone and automatically map that choice to the correct product variant. The Challenge: Customers were confused by standard drop-down menus, leading to high drop-off rates. Furthermore, the client wanted to avoid paying monthly fees for heavy third-party quiz apps. The Solution: I engineered a custom, app-free "Find Your Color" interactive quiz directly into their Shopify theme using Liquid and JavaScript. The UI guides users through a visual selection process using reference images and abstract color swatches. The Result: Once a shade is selected, the custom logic flawlessly links it to the corresponding Shopify variant and automatically opens the cart drawer. I also built full Theme Editor integration so the client can easily swap out text, swatches, and images without touching the code.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/b31c877165a0c5d691f8a2a0cb7d6332-1778413546621/Interactive%20Shade%20Quiz%20_%20Variant%20Mapper.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    23,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'custom-shopify-sections-ui-fixes-24',
    'Custom Shopify Sections & UI Fixes',
    'Fiverr Client',
    'Various',
    '',
    'Custom Shopify Sections & UI Fixes The client, an e-commerce brand, needed specific UI enhancements for their Shopify store. While they loved their mobile layout, the desktop version suffered from alignment issues, disproportionate banners, and buttons that visually merged together. Additionally, they wanted to replace the generic Shopify contact form with a custom, full-width, image-backed form, and implement a modern product slider that visually extends off the screen to minimize vertical scrolling. The Solution: I engineered custom, reusable Liquid sections for both the image-backed contact form and the interactive product slider. For the layout issues, I meticulously adjusted the CSS and Liquid code to ensure pixel-perfect button spacing, proper banner scaling, and flawless visual hierarchy across all desktop and mobile breakpoints without breaking their existing mobile design.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/9e933869522d27305feaf2c39eb0e9a2-1778611724902/Custom%20Shopify%20Sections%20_%20UI%20Fixes.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    24,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'shopify-symmetry-theme-code-migration-25',
    'Shopify Symmetry Theme Code Migration',
    'Fiverr Client',
    'Various',
    '',
    'Shopify Symmetry Theme Code Migration The client upgraded their Shopify store to the premium Symmetry theme but needed to retain the highly specific custom code, layout features, and visual identity from their previous theme. The Challenge: Migrating legacy custom functionalities into a brand-new theme without breaking the new theme''s native architecture, JavaScript files, or responsive design parameters. The Solution: I carefully analyzed the old codebase, extracted the necessary custom Liquid, CSS, and JS, and refactored it to align with modern Shopify 2.0 standards. I seamlessly integrated these custom sections into the Symmetry theme, ensuring the site matched the previous design exactly. Finally, I conducted rigorous QA testing across desktop and mobile devices to ensure flawless responsiveness and performance before handing it back to the client.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/57066f8760209630b1ca76b4664bcedc-1778612083465/Shopify%20Symmetry%20Theme%20Code%20Migration.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    25,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'urgent-bug-fix-add-to-cart-restored-26',
    'Urgent Bug Fix: Add to Cart Restored',
    'Fiverr Client',
    'Various',
    '',
    'Urgent Bug Fix: Add to Cart Restored The client faced a critical e-commerce emergency: their primary "Add to Cart" button was malfunctioning, directly halting their ability to make sales and threatening their daily revenue. The Challenge: Time was of the essence. I needed to dive into an existing codebase, isolate the specific issue causing the checkout flow to fail, and deploy a fix immediately without disrupting any other store features. The Solution: Using Shopify developer tools, I audited the product page architecture and quickly identified a stray, conflicting third-party script that was overriding the core cart form logic. I safely isolated and removed the problematic code, cleaned up the script errors, and fully restored the "Add to Cart" functionality within hours. The store was quickly back to processing orders safely and securely.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/e3aaf4ebd1118dfe151bba47ae7cbf6f-1778612269331/Urgent%20Bug%20Fix%20Add%20to%20Cart%20Restored.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    26,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'custom-shopify-countdown-lead-gen-27',
    'Custom Shopify Countdown & Lead Gen',
    'Fiverr Client',
    'Various',
    '',
    'Custom Shopify Countdown & Lead Gen My client, a growing streetwear brand, needed a high-converting, fully customizable countdown timer combined with a newsletter signup to drive urgency during limited drops. The primary challenge was building a timer that could target exact future dates and times directly from the Shopify theme editor without relying on bulky, monthly-subscription apps. I engineered a lightweight Liquid section with precise JavaScript time logic and native Shopify form integration. The result was a seamless, responsive section that significantly boosted email captures and drop-day sales, all while remaining 100% editable for the merchant.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/d6f2f587d00795d0080902004e7a5ca0-1778621692142/Custom%20Shopify%20Countdown%20_%20Lead%20Gen.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    27,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'dynamic-css-highlight-marker-for-sales-28',
    'Dynamic CSS Highlight Marker for Sales',
    'Fiverr Client',
    'Various',
    '',
    'Dynamic CSS Highlight Marker for Sales The client wanted a visually striking way to highlight specific elements, such as sale prices and navigation menus, mimicking a physical yellow marker effect. The goal was to increase the visibility of ongoing sales without cluttering the UI with heavy graphics. I developed a custom CSS and Liquid solution that automatically wraps sale prices and specific menu items in a pixel-perfect, dynamic highlight color. I integrated this logic into the theme editor, empowering the brand''s team to control the highlight colors and placements instantly without needing to touch the code.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/353d492496746d875853e4091c111d7c-1778622005072/Dynamic%20CSS%20Highlight%20Marker%20for%20Sales.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    28,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'shopify-theme-custom-rebuild-29',
    'Shopify Theme Custom Rebuild',
    'Fiverr Client',
    'Various',
    '',
    'Shopify Theme Custom Rebuild An established streetwear brand approached me to completely rebuild their Shopify store to match a premium, high-end competitor''s aesthetic. The goal was a 1:1 structural copy featuring complex layouts like sticky headers, seamless Ajax cart drawers, and dynamic inventory overlays. The challenge was ensuring perfect responsive spacing and complex UI behaviors without sacrificing load speed or native Shopify 2.0 modularity. I developed a completely bespoke Shopify theme, translating their vision into a lightning-fast, conversion-optimized storefront that perfectly mirrors the requested high-end feel while allowing the client full control over their content.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/486f68d73ad6a095f33245985965baa8-1778622302370/Shopify%20Theme%20Custom%20Rebuild.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    29,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'smart-variant-swatches-inventory-ui-30',
    'Smart Variant Swatches & Inventory UI',
    'Fiverr Client',
    'Various',
    '',
    'Smart Variant Swatches & Inventory UI The client needed an advanced product page UI to handle complex color and size variations without relying on third-party apps that slow down the site. They requested automatic 50/50 split-color swatches (e.g., black/yellow) and smart sold-out states where unavailable sizes are visually crossed out, rather than greying out the entire product image. I utilized advanced Liquid architecture and custom CSS to automatically read variant color names and generate perfect half-and-half swatches dynamically. I also implemented smart inventory logic to visually strike through sold-out sizes, providing a flawless, app-free user experience that directly improved their conversion flow.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/6c6ad027fbc46db6a87242da85f83fcf-1781291814440/Smart%20Variant%20Swatches%20_%20Inventory%20UI.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    30,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'dynamic-shopify-pricing-cards-ui-31',
    'Dynamic Shopify Pricing Cards UI',
    'Fiverr Client',
    'Various',
    '',
    'Dynamic Shopify Pricing Cards UI Client & Goals: My client, a GPS tracking tech brand, needed a custom pricing section to showcase their hardware subscription plans. They required a professional, SaaS-style layout that linked directly to an external checkout system (Hapn), but they needed to be able to manage all the content themselves. Challenges: The section needed to be highly flexible, allowing the store owner to add, remove, or reorder subscription tiers without touching a single line of code. It also had to match their existing brand typography and UI perfectly across both desktop and mobile apps. How I dealt with them: I engineered a custom Shopify Liquid section utilizing dynamic blocks. I added extensive Theme Editor settings so the client could easily customize pricing text, billing cycles, savings callouts, and "Best Value / Most Popular" badges. I ensured the typography scale matched their exact specifications and made the UI fully responsive, delivering a premium, conversion-ready aesthetic.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/f501e54beebc1cdf96a8aa6c88836991-1781291986899/Dynamic%20Shopify%20Pricing%20Cards%20UI.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    31,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    '2-step-shopify-onboarding-flow-32',
    '2-Step Shopify Onboarding Flow',
    'Fiverr Client',
    'Various',
    '',
    '2-Step Shopify Onboarding Flow Client & Goals: Following the successful delivery of a custom pricing section, the client requested a more advanced user journey. They needed to capture a unique device IMEI number from the customer before they could select a subscription plan, creating a seamless multi-step onboarding experience. Challenges: The input required strict validation to ensure users couldn''t proceed with invalid data. Furthermore, the UI needed to look like a native app flow, including custom-designed navigation buttons, and the captured data had to be successfully passed to the Shopify backend upon order completion. How I dealt with them: I developed a custom JavaScript-driven 2-step flow. For the first step, I built an input field with strict validation logic (ensuring the IMEI was exactly between 7 and 20 digits). I crafted custom UI elements, including a precisely scaled back button to match their design references. Finally, I utilized Shopify''s line-item properties to securely capture the validated IMEI and pass it directly to the merchant''s back-office order details for smooth fulfillment.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/f8386428998ee02153497f8d89feedc6-1781292137243/2-Step%20Shopify%20Onboarding%20Flow.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    32,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'high-converting-custom-hero-section-33',
    'High-Converting Custom Hero Section',
    'Fiverr Client',
    'Various',
    '',
    'High-Converting Custom Hero Section The Client & Goal: An electronics and tech accessory brand needed a premium, SaaS-style hero section for their Shopify store, inspired by top-tier Dutch webshops. They wanted a responsive 50/50 split layout integrating their TrustedShops widget and a dynamic benefit bar. The Challenge: The client was using the "Impact" theme and needed the new section to perfectly match their existing typography and branding without causing CSS conflicts across the site. The Solution: I developed a robust, modular .liquid section featuring conflict-free scoped CSS (-midevv-kn). I included dynamic blocks for the TrustPilot/TrustedShops embeds, draggable benefit icons, and a layout that flawlessly stacks the image below the text on mobile devices. The entire section is 100% editable directly from the Shopify Theme Editor, empowering the merchant to update content without touching a single line of code.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/83727e5a1e35f9c08894c65212bcc001-1779794834916/High-Converting%20Custom%20Hero%20Section.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    33,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'dynamic-promo-badges-custom-labels-34',
    'Dynamic Promo Badges & Custom Labels',
    'Fiverr Client',
    'Various',
    '',
    'Dynamic Promo Badges & Custom Labels The Client & Goal: A Shopify merchant needed a way to highlight promotional campaigns (like "Back to School") directly on their product cards across the homepage, collection pages, and predictive search dropdowns. The Challenge: The label needed to automatically appear only when a product was part of a specific, targeted collection, rather than applying globally to all products. The Solution: I built a custom promo label feature integrated deeply into their theme settings. The merchant can now enable/disable the badge, choose a specific trigger collection, type in custom text (e.g., "Limited Offer"), and define the badge color using a color picker. The logic automatically scans product collections and renders the badge seamlessly without slowing down page load speeds.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/31f3361f17f184888ccf1ef11832bab7-1779794936970/Dynamic%20Promo%20Badges%20_%20Custom%20Labels.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    34,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'conversion-optimized-bundle-builder-35',
    'Conversion-Optimized Bundle Builder',
    'Fiverr Client',
    'Various',
    '',
    'Conversion-Optimized Bundle Builder The Client & Goal: The client wanted to implement a highly visual, card-based bundle selector on their product pages (e.g., 1 Pack, 2 Pack, 3 Pack) to increase Average Order Value (AOV). The Challenge: Creating new Shopify variants for these bundles would critically break the client''s internal backend systems and Google Sheets inventory tracking. The Solution: I designed a custom UX that looks and feels exactly like a premium variant selector (with "Most Popular" badges, dynamic pricing, and savings callouts) but operates purely on the frontend. When a user selects a bundle card, my custom JavaScript silently adjusts the native cart quantity input. This achieved the conversion-boosting UI the client desired while keeping their backend variant structure 100% untouched and safe.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/b41307750680113d8079521240090a6a-1779795060042/Conversion-Optimized%20Bundle%20Builder.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    35,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'advanced-gamified-cart-drawer-upsell-36',
    'Advanced Gamified Cart Drawer Upsell',
    'Fiverr Client',
    'Various',
    '',
    'Advanced Gamified Cart Drawer Upsell The Client & Goal: The client wanted to replace a clunky, expensive third-party app with a fully custom Cart Drawer to handle free gifts, upsells, and urgency drivers cleanly within their theme. The Challenge: Shopify only allows one automatic discount at a time. The client already had an automatic tiered discount running, which conflicted with the "Free Gift at €75" functionality I built, causing the 100% discount not to apply. The Solution: I engineered a smart workaround using a "€0 Gift Strategy". I created hidden €0 products that do not show up in store searches or collections. The custom cart drawer calculates the €75 threshold via an animated progress bar. Once unlocked, the customer can choose from 3 premium gifts. I also integrated a swipeable "You Might Also Like" product carousel and a live countdown timer in the announcement bar. This saved the client monthly app fees while dramatically improving the checkout UX.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/3a4912fc5531893fb88cb832450768b0-1779795147216/Advanced%20Gamified%20Cart%20Drawer%20Upsell.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    36,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'custom-seo-breadcrumb-navigation-37',
    'Custom SEO Breadcrumb Navigation',
    'Fiverr Client',
    'Various',
    '',
    'Custom SEO Breadcrumb Navigation Client & Goal: The client, running the Netherlands-based Shopify store WingBee, needed to implement clear, user-friendly breadcrumb navigation on all Product and Collection pages. The goal was to improve user experience and store navigation while precisely matching their brand''s typography—all without relying on bloated, monthly-fee third-party apps. Challenges: Delivering a highly customizable, SEO-optimized custom feature within a strict 24-hour turnaround time and a micro-budget, while ensuring the code seamlessly integrated with their existing Shopify OS 2.0 theme architecture without causing any performance drops. How I Dealt With It: I engineered a lightweight, custom Liquid snippet that handles dynamic routing for both products and collections. To ensure the client could easily adjust the design in the future, I built the styling using CSS variables for typography, weight, and spacing. Furthermore, I hardcoded JSON-LD structured data (schema markup) directly into the snippet, instantly boosting their store''s SEO and Google search indexing capabilities. The final result was a lightning-fast, fully responsive, and accessible navigation trail delivered perfectly on time.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/c331394e2efc0c7b290947247911955d-1779795464037/Custom%20SEO%20Breadcrumb%20Navigation.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    37,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'shopify-custom-pricing-mobile-grid-optimization-38',
    'Shopify Custom Pricing & Mobile Grid Optimization',
    'Fiverr Client',
    'Various',
    '',
    'Shopify Custom Pricing & Mobile Grid Optimization Client & Goals: Honest Supplements, a growing health and fitness brand, needed to synchronize their dynamic pricing labels across their store. Their primary goal was to ensure consistency by replacing old "Member Price" terminology with "Our Price" and "Retail Price," while strategically reorganizing their homepage to feature high-priority products. The Challenge: The store had disconnected pricing data—the homepage and collection pages were not reflecting the updated prices shown on individual product pages. Additionally, the mobile shopping experience was suffering from a default 1-column product grid, which caused excessive vertical scrolling and high friction for mobile buyers. How I Dealt With It: I audited the theme and updated the Liquid templates to dynamically pull and display the correct unified pricing labels across all pages. I then reorganized the homepage collections via the Shopify backend to preserve the client''s ability to edit them later without touching code. To add extra value, I identified the mobile UX flaw and proactively pitched a 2-column mobile grid layout. After client approval, I implemented the custom CSS/Liquid mobile layout, completely transforming the mobile browsing experience, reducing scroll fatigue, and optimizing the store for higher conversions.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/95a44c0737c73f379749e631675843f4-1779795712914/Shopify%20Custom%20Pricing%20_%20Mobile%20Grid%20Optimization.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    38,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'dynamic-custom-payment-icons-39',
    'Dynamic Custom Payment Icons',
    'Fiverr Client',
    'Various',
    '',
    'Dynamic Custom Payment Icons The Goal: The client needed to increase trust and conversions on their supplement store (Vibefuel) by displaying localized payment icons (iDEAL, Bancontact, Klarna, etc.) directly below the "Add to Cart" button.The Challenge: They didn''t want to use a heavy app, and they needed the ability to easily turn specific icons on and off without touching the code.The Solution: I developed a lightweight, custom Shopify Liquid snippet and integrated it seamlessly into their product template. I added custom schema settings to the theme editor, allowing the client to toggle individual payment icons dynamically. This resulted in a cleaner UI, improved social proof, and a 100% editor-friendly setup.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/8962fb5b1df146c800ea0790e8942774-1779797164177/Dynamic%20Custom%20Payment%20Icons.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    39,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'premium-custom-shopify-theme-40',
    'Premium Custom Shopify Theme',
    'Fiverr Client',
    'Various',
    '',
    'Premium Custom Shopify Theme The Goal: The client was launching a high-end car detailing brand (Detailing Masters) and required a premium, mobile-first e-commerce store built from scratch to match their physical service''s sleek branding.The Challenge: The store needed advanced UX features, including a complex custom mega-menu, interactive product page accordions, and a highly specific visual aesthetic inspired by top industry competitors, all without relying on bloated page builders.The Solution: I engineered a fully custom Shopify theme from the ground up using clean Liquid architecture. I developed over 17 individual, highly modular sections, ensuring the client had complete control over the layout and content directly from the Shopify Theme Editor. The final deliverable was a blazing-fast, highly responsive, and strictly branded storefront optimized for conversions.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/414cc5495b4c52d85457250f2fef8454-1779797264553/Premium%20Custom%20Shopify%20Theme.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    40,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'google-reviews-api-chat-41',
    'Google Reviews API & Chat',
    'Fiverr Client',
    'Various',
    '',
    'Google Reviews API & Chat The Goal: The client wanted to eliminate expensive monthly subscription fees for third-party review and chat apps on two of their Webflow websites (Detailing Masters & Joët Essence).The Challenge: They needed a robust, automated way to display real-time 5-star Google reviews and a global floating WhatsApp widget without slowing down the website or relying on paid SaaS plugins.The Solution: I developed a custom, subscription-free architecture. I integrated the Google Places API and Maps JavaScript API to automatically fetch and sync their live business reviews into a beautifully styled, custom masonry grid. Alongside this, I hard-coded a lightweight WhatsApp floating widget. This future-proofed their sites, improved page load speeds, and completely removed their monthly app overhead.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/949be9aa118042a360e81d157ad78e01-1779797373353/Google%20Reviews%20API%20_%20Chat.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    41,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'custom-subscription-buy-box-ui-42',
    'Custom Subscription Buy Box UI',
    'Fiverr Client',
    'Various',
    '',
    'Custom Subscription Buy Box UI The Client & Goal: SimpliNutrition, a premium health supplement brand, needed a highly customized, conversion-optimized "Subscribe & Save" buy box. They wanted a flawless, multi-tiered interface (One-Time, Monthly, and a 3-Month Bundle) seamlessly integrated with their existing Loop Subscriptions app. The Challenge: The client required a 3-month prepaid subscription bundle (billing for 3 months at once). However, Loop Subscriptions restricts prepaid selling plans to their expensive "PRO" tier. The client was on the standard plan and could not configure this backend setup without upgrading. Furthermore, the UI needed to perfectly match a high-converting reference design they provided, which default app widgets could not achieve. The Solution & Execution: To save the client from expensive recurring app fees, I engineered a custom Liquid and JavaScript workaround. Backend Strategy: We set up a separate "3-Month Supply" product in the Shopify admin with standard subscription settings. Frontend UI: I built a custom, SaaS-style buy box section that visually merged both products into one seamless interface. Dynamic Logic: Using vanilla JavaScript, I intercepted the form state so that clicking the "Quarterly Supply" card dynamically swapped the submitted variant_id and selling_plan to route the customer to the correct product perfectly. The Result: A beautiful, fully responsive,',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/61d26e680be69a6dd87b2b8cc1396d60-1779799589123/Custom%20Subscription%20Buy%20Box%20UI.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    42,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'custom-interactive-drawer-navigation-menu-43',
    'Custom Interactive Drawer Navigation Menu',
    'Fiverr Client',
    'Various',
    '',
    'Custom Interactive Drawer Navigation Menu Client: A high-end, rustic custom furniture brand ("Covered In Sawdust") needing a highly unique, branded navigation experience. Goals: Transform a static graphic of a wooden chest of drawers into a fully interactive, hover-friendly, 7-link hero navigation menu. Challenges: The client was struggling with z-index layering, inconsistent click targets, and broken mobile responsiveness due to absolute-positioned overlays in the Shopify Spotlight theme. Solutions: I extracted the individual drawer components from the banner to engineer dynamic hover animations (making the drawers visually "pull out"). I rebuilt the custom Liquid and CSS, ensuring pixel-perfect alignment and full mobile responsiveness. Finally, I integrated link settings into the theme schema so the client could easily update the URLs in the future without touching the code.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/5b16aee58520c2e11e013575e6afb3b3-1779809391803/Custom%20Interactive%20Drawer%20Navigation%20Menu.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    43,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'shopify-homepage-redesign-theme-setup-44',
    'Shopify Homepage Redesign & Theme Setup',
    'Fiverr Client',
    'Various',
    '',
    'Shopify Homepage Redesign & Theme Setup Client: A handmade furniture business owner launching their brand. Goals: Restore the site after AI-generated code broke the layout, and visually style the Homepage to reflect a premium, rustic aesthetic. Challenges: The client had zero coding experience and was stuck in "coding hell." The site needed to look custom but remain 100% manageable by a non-technical user. Solutions: I cleaned up the broken code and rebuilt the homepage using native, customizable Shopify sections. I integrated custom typography, designed a footer email capture, linked social media placecards, and built a dynamic quote header. Most importantly, I moved all customization options into the Shopify Theme Editor so the client could manage text, fonts, and images entirely code-free.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/4e16f764993ee5bd4a8eba54473b95cb-1779809540820/Shopify%20Homepage%20Redesign%20_%20Theme%20Setup.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    44,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'custom-shopify-blog-template-header-ui-45',
    'Custom Shopify Blog Template & Header UI',
    'Fiverr Client',
    'Various',
    '',
    'Custom Shopify Blog Template & Header UI Client: A custom furniture maker wanting to share their craftsmanship journey through a branded blog called "The Sawdust Journal." Goals: Design a highly readable, mobile-optimized blog layout and upgrade the site''s main header to accept dynamic background images. Challenges: Ensuring the blog matched the new brand aesthetic perfectly while providing the client an effortless backend experience to upload posts and swap header backgrounds. Solutions: I developed a custom blog grid template featuring clean post previews, featured images, dates, category tags, and a "Load More" pagination setup. For the header, I coded a new schema setting that allowed the client to upload and assign background images directly from the Shopify visual editor. I also provided a custom video tutorial to ensure they felt confident managing it.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/eb65274454f7ac85ff219c9c22032d5d-1781292278587/Custom%20Shopify%20Blog%20Template%20_%20Header%20UI.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    45,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'e-commerce-pivot-to-custom-order-flow-46',
    'E-Commerce Pivot to Custom Order Flow',
    'Fiverr Client',
    'Various',
    '',
    'E-Commerce Pivot to Custom Order Flow Client: A local furniture builder executing a phased business launch. Goals: Shift the website away from a traditional "Add to Cart" e-commerce model toward a localized, custom-order inspiration gallery. Challenges: Rerouting the UX to focus purely on lead generation and custom inquiries. The project was handed to me after another freelancer abandoned it, meaning I had to quickly pick up the pieces, align the UI with their newly printed marketing materials, and hit a strict December 1st launch deadline. Solutions: I overhauled the site flow, reorganizing the Homepage to highlight their "1-2-3 Process" and visually striking Inspiration Gallery. I built a comprehensive, mobile-friendly custom contact form designed specifically to capture deep project details for high-ticket furniture orders, effectively turning their Shopify store into a seamless lead-generation tool.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/daf34fa12c8a9fee848f1c8c6fd3db60-1779809864207/E-Commerce%20Pivot%20to%20Custom%20Order%20Flow.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    46,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'custom-shopify-slider-with-smooth-mobile-gestures-47',
    'Custom Shopify Slider with Smooth Mobile Gestures',
    'Fiverr Client',
    'Various',
    '',
    'Custom Shopify Slider with Smooth Mobile Gestures The goal for this initial project was to create a specific custom section for the client’s developing jewelry brand, Siparantum. The client wanted to replicate the slick, responsive functionality of a reference site (uk.craftdlondon.com), specifically a smooth product slider. Challenges included developing a static-to-dynamic workflow that allowed the client easy management from the Shopify editor while maintaining professional front-end smoothness. I successfully coded a custom section from scratch using Liquid, CSS, and JavaScript. I focused heavily on touch-optimized swiping and perfect mobile responsiveness to ensure a frictionless user experience. This successful deliverable established trust, leading to a much larger full-store redesign project.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/2569c0fdef71e3cf57ac0f6c2fbdec3a-1779810582062/Custom%20Shopify%20Slider%20with%20Smooth%20Mobile%20Gestures.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    47,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'luxury-shopify-redesign-complex-feature-build-48',
    'Luxury Shopify Redesign & Complex Feature Build',
    'Fiverr Client',
    'Various',
    '',
    'Luxury Shopify Redesign & Complex Feature Build This project involved a complete overhaul of the client''s Shopify store, transforming it from a basic setup to a high-end, branded experience. The goal was to fully redesign Siparantum.com to match the advanced UX/UI and features of a competitor reference site (uk.craftdlondon.com), focusing on optimization and conversions. Challenges included implementing complex logic for a dynamic "Create Your Own Set" bundle feature within Shopify Basic plan limitations and managing custom server-side image uploads for bespoke designs. I redesigned the entire store from scratch, including the optimized header/mega menu, polished collection grid with advanced mobile filtering, custom product card sliders, and a streamlined footer. Despite delays and complexities, I ensured transparent communication and delivered a finished, professional brand asset.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/c2256cb4c0e7c4a6daeed28ba4df8c54-1779810701653/Luxury%20Shopify%20Redesign%20_%20Complex%20Feature%20Build.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    48,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'advanced-shopify-product-builder-custom-uploads-49',
    'Advanced Shopify Product Builder & Custom Uploads',
    'Fiverr Client',
    'Various',
    '',
    'Advanced Shopify Product Builder & Custom Uploads The Client & Goal: To increase average order value (AOV) for a luxury jewelry brand, the client required two advanced features: a complex "Make Your Own Set" product builder and a secure "Upload Your Own Design" feature with engraving text options. The Challenges: Shopify natively does not allow for intricate custom sets that pull from multiple existing product inventories, nor does it easily support customer image uploads directly on the product page for the Basic plan without heavy customization. The Solution: I engineered a complex "product bundle" logic within the theme, allowing customers to select multiple distinct items to build their set. Crucially, I developed a custom system to handle customer image uploads and optional engraving text data, linking them directly to the cart. I also designed and coded an advanced desktop mega menu with images and optimized the mobile drawer menu with custom dividing lines for a premium navigation experience.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/cff5f4fe694fa41026ec2906ba0f3294-1779810919985/Advanced%20Shopify%20Product%20Builder%20_%20Custom%20Uploads.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    49,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'custom-shopify-product-add-ons-widget-50',
    'Custom Shopify Product Add-Ons & Widget',
    'Fiverr Client',
    'Various',
    '',
    'Custom Shopify Product Add-Ons & Widget Client Overview: An e-commerce merchant specializing in heavy-duty tools and dollies (Aardvark Tool) needed a seamless way to upsell accessories directly on their primary product pages. The Goal: The client wanted optional product add-ons available as checkboxes on specific product pages. The requirements included dynamically calculating and displaying the new total price in real-time, and ensuring that clicking "Add to Cart" would bundle the main product and all selected accessories into the cart simultaneously. The Challenge: Building a multi-product add-to-cart function requires careful AJAX API handling to ensure no items are dropped. Additionally, the custom code needed to seamlessly integrate with the client''s existing Liquid theme without breaking their current cart drawer or product schema. Later, a theme update removed the custom code, creating a maintenance challenge for the client. The Solution: Custom Widget Development: I engineered a lightweight, conversion-focused widget using clean Liquid, CSS, and vanilla JavaScript. Dynamic UX: I implemented a real-time DOM updater that calculates the base price plus selected add-ons, displaying the final math instantly to the user without a page reload. AJAX Integration: I utilized Shopify''s Cart API to fire multiple items into the cart in a single, frictionless click. Future-Proof Documentation: When the client''s them',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/039715e8053bd08b73cdfff155149817-1779811564296/Custom%20Shopify%20Product%20Add-Ons%20_%20Widget.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    50,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'infinite-shopify-testimonial-slider-51',
    'Infinite Shopify Testimonial Slider',
    'Fiverr Client',
    'Various',
    '',
    'Infinite Shopify Testimonial Slider The client, running a custom neon sign brand, needed a premium review slider to build trust and match the aesthetic of a high-end reference site. The Challenge: The primary challenge was ensuring a buttery smooth, true infinite scroll on mobile devices without any harsh jumping or performance lag, while keeping the section 100% editable. The Solution: I engineered a custom Liquid section featuring an infinite ribbon layout. I utilized lightweight JavaScript for flawless touch-swipe interactions, integrated dynamic gradient star ratings, and exposed all settings (spacing, colors, typography) to the Shopify Theme Editor so the merchant retains full control without touching the code.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/129e1f7bfe74fb6116ec454f689ca231-1779812740624/Infinite%20Shopify%20Testimonial%20Slider.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    51,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'advanced-mega-menu-header-setup-52',
    'Advanced Mega Menu & Header Setup',
    'Fiverr Client',
    'Various',
    '',
    'Advanced Mega Menu & Header Setup The client required a highly functional, mobile-optimized header featuring a sticky announcement bar and a complex, image-rich mega menu to improve catalog routing. The Challenge: Shopify''s native architecture easily links images for Collections, but does not natively support assigning featured images to standard Pages within a dropdown menu. The Solution: I developed a custom Mega Menu Liquid block that dynamically links and renders specific image assets for standard pages. I ensured the layout maintained a perfect visual hierarchy, scaling gracefully from a robust desktop dropdown to a sleek, conversion-friendly mobile drawer.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/1f11348ca6f914389ffaa03b291af3fc-1779812890180/Advanced%20Mega%20Menu%20_%20Header%20Setup.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    52,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'high-converting-e-commerce-footer-53',
    'High-Converting E-commerce Footer',
    'Fiverr Client',
    'Various',
    '',
    'High-Converting E-commerce Footer The client needed a complete overhaul of their site''s footer to improve secondary navigation, integrate lead capture, and establish brand authority through trust badges. The Challenge: Replicating a complex, multi-column dark-mode layout while strictly avoiding hardcoded content, ensuring the client could easily update links, text, and graphics in the future. The Solution: I built a scalable footer architecture leveraging robust Shopify Liquid schemas. The final product features a seamless newsletter integration, localized payment provider icons, and clean CSS grid alignments, fully preserving merchant editability in the theme customizer.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/ca082cffe8a48ab86d2a72a0e090b333-1779813195590/High-Converting%20E-commerce%20Footer.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    53,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'cinematic-auto-play-hero-section-54',
    'Cinematic Auto-Play Hero Section',
    'Fiverr Client',
    'Various',
    '',
    'Cinematic Auto-Play Hero Section The client was preparing to launch aggressive paid ad campaigns and urgently required a visually striking, conversion-optimized video hero banner for their landing page. The Challenge: Implementing auto-playing background video can severely hurt LCP (Largest Contentful Paint) speed and mobile performance if not coded correctly. The Solution: I built a lightweight, highly responsive video banner optimized for fast media rendering. It features a strong visual hierarchy with responsive typography and dual high-conversion CTAs (Call to Actions). The section is fully mobile-first, ensuring ad traffic experiences zero layout shift and rapid load times.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/cb9a5f79290392e2a4f4d0fddc3c82c8-1779813316968/Cinematic%20Auto-Play%20Hero%20Section.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    54,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'custom-shopify-tabbed-hero-slider-55',
    'Custom Shopify Tabbed Hero Slider',
    'Fiverr Client',
    'Various',
    '',
    'Custom Shopify Tabbed Hero Slider Client & Goal: An e-commerce health and wellness brand needed a highly specific, complex hero section for their Shopify store. The goal was to build a pixel-perfect replica of a tabbed slider (similar to industry leaders like iHerb), allowing users to switch slides via interactive bottom tabs. The Challenge: The client required the section to be fully editable within the Shopify Theme Editor (changing images, tab names, and links) without hardcoding. Additionally, traditional desktop tabs do not translate well to mobile screens without breaking the responsive layout. The client also required a "code-only" handoff for privacy reasons, meaning the Liquid code had to be completely bug-free and self-contained for easy manual installation. The Solution: I engineered a custom Liquid section featuring a sleek, horizontal tab navigation integrated directly into the slider. For mobile, I developed a custom UI logic that transformed the static desktop tabs into a fluid, horizontally scrollable UI element underneath the banners. I utilized flexible Shopify schema settings, ensuring the merchant had 100% control over the content. The final code was lightweight, conversion-optimized, and seamlessly integrated into their existing theme structure.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/34c2a7d2a8af0b19107ab4b0eb9e78ef-1779828381064/Custom%20Shopify%20Tabbed%20Hero%20Slider.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    55,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'shopify-2-0-hybrid-header-footer-56',
    'Shopify 2.0 Hybrid Header & Footer',
    'Fiverr Client',
    'Various',
    '',
    'Shopify 2.0 Hybrid Header & Footer Client & Goal: A sports supplement brand was migrating their store from a legacy Shopify 1.0 theme to the modern Shopify 2.0 Dawn theme. They needed their complex, custom-built header and footer replicated precisely in the new environment without losing any existing visual styling or functionality. The Challenge: The client''s existing navigation setup was highly complex. They had several distinct main menus configured in their Shopify admin and needed the ability to manually add unlimited, separate menu blocks into the header via the Theme Editor. Standard Dawn theme headers only support a single, flat native navigation menu. The Solution: I built a highly advanced, modular header section from scratch. I engineered a custom "Menu Source" schema setting that allowed the client to dynamically control the navigation architecture. They could choose to display: 1) The native navigation menu only, 2) Custom blocks only, or 3) A hybrid of the native menu plus custom added blocks. This provided the merchant with infinite scalability for their complex mega-menus while maintaining a lightweight, zero-dependency codebase that integrated flawlessly with Dawn 2.0.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/1f509e451bedfcccb19f09074461780e-1781292759817/Shopify%202.0%20Hybrid%20Header%20_%20Footer.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    56,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'b2b-wholesale-shopify-store-redesign-57',
    'B2B Wholesale Shopify Store Redesign',
    'Fiverr Client',
    'Various',
    '',
    'B2B Wholesale Shopify Store Redesign My client, an established "Cash & Carry" business, needed to transition their physical wholesale model into a modern, easy-to-use B2B Shopify store. Their goal was to create a clean, straightforward purchasing experience for bulk buyers, similar to industry leaders. The primary challenge was organizing a large, complex inventory while keeping the user interface simple and intuitive. Additionally, the existing site had broken core functionalities, including unresponsive "Add to Cart" buttons. I addressed these challenges by implementing a highly responsive, custom-coded UI with clear visual hierarchy, dynamic pricing displays, and optimized graphics. I also conducted a thorough debugging session to fix the cart issues, ensuring a frictionless checkout process that is now ready for high-volume B2B orders.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/52c845613e653345dc4b1546dacc48a6-1779828971253/B2B%20Wholesale%20Shopify%20Store%20Redesign.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    57,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'shopify-store-monthly-maintenance-seo-58',
    'Shopify Store Monthly Maintenance & SEO',
    'Fiverr Client',
    'Various',
    '',
    'Shopify Store Monthly Maintenance & SEO After a successful initial redesign, the client required ongoing technical support to ensure their wholesale store remained fast, secure, and up-to-date. The goal was to establish a reliable monthly maintenance routine so the business owners could focus on operations rather than website management. Challenges arose from the need to constantly update changing product graphics, fix broken page links, and integrate third-party elements like custom Google Maps for their physical warehouse location. I created a comprehensive maintenance plan that included weekly performance audits, broken link detection, custom graphic updates, and SEO enhancements. By taking ownership of the site''s technical health, I ensured zero downtime and a constantly polished user experience.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/6d52f8681bb556c3dd2a72530f09d864-1779829109652/Shopify%20Store%20Monthly%20Maintenance%20_%20SEO.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    58,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'corporate-logistics-freight-website-59',
    'Corporate Logistics & Freight Website',
    'Fiverr Client',
    'Various',
    '',
    'Corporate Logistics & Freight Website A rapidly growing logistics group approached me to build a dedicated, authoritative corporate website to represent their freight and supply chain services. Their goal was to establish digital trust with a modern, lead-generating platform distinct from their retail operations. A major technical challenge during this project was navigating strict two-factor authentication (2FA) barriers and restrictive hosting environments on the client''s end, which initially blocked development. To overcome this and keep the project moving fast, I spun up an independent development server to build the entire site—including a custom-designed logo and a lead-generation layout. Once the client reviewed and approved the live staging site, I securely migrated the complete, polished website over to their primary Bluehost server, resulting in a flawless launch.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/729f03bf71af17757eaf7cd06e5ac06b-1779829338267/Corporate%20Logistics%20_%20Freight%20Website.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    59,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'dynamic-atc-button-custom-navigation-60',
    'Dynamic ATC Button & Custom Navigation',
    'Fiverr Client',
    'Various',
    '',
    'Dynamic ATC Button & Custom Navigation The client, operating a Shopify grocery and delivery store, needed to streamline their shopping experience and navigation to match high-end retail platforms. Their primary goals were to implement a dynamic "Quick Add to Cart" button on collection product cards and to build a highly structured, permanent left-side category menu. A key technical challenge arose during mobile testing: the custom sidebar elements and product images were not scaling correctly on iOS/iPhone devices, and the initial Add to Cart button remained stuck on the "Added" state, preventing users from quickly adding multiple quantities of the same item. To solve this, I engineered a custom Shopify Liquid section for the category navigation, featuring hover-activated submenus for desktop and a touch-optimized, full-screen menu for mobile. For the cart functionality, I wrote lightweight JavaScript to create a multi-click dynamic button that briefly displays a black "Added" confirmation for 1 second before automatically resetting. Finally, I debugged the CSS targeting iOS breakpoints to ensure flawless mobile responsiveness and adjusted the typography scale for optimal readability across all screens.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/91ca648efc0d6f3c63e2c87c632b8dd9-1779829767165/Dynamic%20ATC%20Button%20_%20Custom%20Navigation.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    60,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'shopify-gamification-xp-system-61',
    'Shopify Gamification & XP System',
    'Fiverr Client',
    'Various',
    '',
    'Shopify Gamification & XP System My client, the founder of RC Arsenal, wanted to gamify his e-commerce store to increase community engagement. His goal was to introduce an XP system, badges, and a custom "Garage" profile for users. A major challenge was the initial reliance on third-party apps like Gameball, which complicated the user flow and added unnecessary bloat. I resolved this by migrating the entire logic to native Shopify Metafields. I developed a complete frontend architecture, including a live section switcher and automated the customer onboarding process using Shopify Flow. Now, when a user signs up, their XP, rank, tier, and avatar metafields are initialized automatically without admin intervention. The result is a highly engaging, lightweight, and completely custom gamification loop built directly into the Shopify theme.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/228ef7a3b5548ba766272ff615c702b7-1779831150981/Shopify%20Gamification%20_%20XP%20System.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    61,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'shopify-user-profile-garage-ui-62',
    'Shopify User Profile & Garage UI',
    'Fiverr Client',
    'Various',
    '',
    'Shopify User Profile & Garage UI The objective of this project was to replace the generic Shopify customer account page with an immersive, tactical "Garage" dashboard. The client needed a mobile-friendly layout where users could view their earned badges, track their XP progress, and see their current subscription tier. The technical challenge was allowing users to upload their own vehicle images and profile avatars directly from the frontend into secure Shopify Metafields. I built a custom, secure file uploading system tied to the customer''s account, utilizing clean HTML/CSS/JS for the interface. The UI features a sleek, dark-themed gaming aesthetic with a 100% responsive design, ensuring perfect display across all mobile devices.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/e4fe776e11752dfdbb1ea88de33d87d0-1779831033665/Custom%20Shopify%20Gamified%20User%20Garage%20UI.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    62,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'custom-shopify-leaderboard-setup-63',
    'Custom Shopify Leaderboard Setup',
    'Fiverr Client',
    'Various',
    '',
    'Custom Shopify Leaderboard Setup RC Arsenal required a dedicated "Killboard" (Leaderboard) page to drive competition among their customers. The visual goal was a dark-themed, military-inspired table layout with interactive filter tabs for "Global," "Country," "Tier," and "Faction." A significant roadblock emerged when dealing with Shopify''s strict API limitations regarding fetching collective customer data to public-facing pages. To bypass this restriction while keeping the theme fast and secure, I engineered a hybrid manual and automated data system utilizing custom page templates. I delivered a highly scalable, modular Liquid architecture that allows the merchant to easily manage the community rankings from the CMS without touching a single line of code.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/9f595c689affa7206983f8b04a788743-1779830903522/Custom%20Shopify%20Leaderboard%20Setup.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    63,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'custom-responsive-video-hero-section-64',
    'Custom Responsive Video Hero Section',
    'Fiverr Client',
    'Various',
    '',
    'Custom Responsive Video Hero Section Client Goal: The client, representing a high-end artisan bakery, needed help getting their Shopify homepage over the finish line. Specifically, they required a custom video background section that precisely matched a provided Figma design—featuring a perfectly centered layout for desktop and a full-viewport, edge-to-edge scaling experience for mobile. The Challenge: The existing live site had custom navigation and footer configurations that could easily be broken by standard theme transfers. Additionally, the video needed to be fully responsive without distorting the cinematic background or cutting off the centered text and call-to-action buttons. The Solution: To protect the client''s live environment, I developed the feature within a separate draft theme. I built a standalone, highly customizable Liquid section (custom-video-banner.liquid) that handled the complex CSS media queries required for the mobile-viewport expansion. Once the code was strictly isolated from global settings like theme.liquid and footer.liquid, I safely migrated only the new section to the live theme. This ensured the client achieved their exact Figma design seamlessly, with zero downtime or disruption to their existing menus.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/be63580b5de6f936ea5cccbc34dc8c5e-1781125588288/Custom%20Responsive%20Video%20Hero%20Section.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    64,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'custom-shopify-ajax-mini-cart-65',
    'Custom Shopify AJAX Mini Cart',
    'Fiverr Client',
    'Various',
    '',
    'Custom Shopify AJAX Mini Cart Client & Goals: The client, a premium jewelry brand (BijouxBee), wanted to replace their bulky default Shopify cart page with a modern, fast, and conversion-optimized slide-out mini cart. The goal was to replicate the seamless UX of a specific high-end reference store, ensuring customers could review their cart without leaving the shopping experience. Challenges: The existing cart was poorly optimized for mobile, hiding products and causing friction. Furthermore, the client needed the solution to be highly modular so it could be easily exported and copy-pasted across 3 to 4 of their other international stores running the same theme. Solution: I engineered a custom, AJAX-powered mini cart drawer using lightweight vanilla JavaScript and Shopify''s Section Rendering API. I designed a mobile-first UI with real-time price updates, sleek CSS animations, and a prominent "Proceed to Checkout" flow. The code was cleanly packaged into a single Liquid snippet for effortless deployment across their entire network of stores. The result was a frictionless, zero-reload cart experience that significantly improved mobile usability.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/83292b001f50d3da9d914c947edab98a-1781126735733/Custom%20Shopify%20AJAX%20Mini%20Cart.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    65,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'wix-logistics-website-redesign-66',
    'Wix Logistics Website Redesign',
    'Fiverr Client',
    'Various',
    '',
    'Wix Logistics Website Redesign The client, a global logistics and freight company, needed a complete UI overhaul of their existing Wix website to match the modern, premium aesthetic of specific high-end Elementor templates without losing their original content. The primary challenge was working within the structural limitations of Wix to replicate complex WordPress layouts, particularly ensuring the mobile version remained clean and legible. To solve this, I completely reconstructed their visual hierarchy, implemented a custom sticky menu layout, and manually optimized the mobile breakpoints so that all critical tracking and service information flowed perfectly on smaller screens. I also duplicated the site to provide the client with distinct A/B color variations (Yellow vs. Orange) to finalize their brand identity.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/2a779172ac06161dafe2be313c33194c-1781126929170/Wix%20Logistics%20Website%20Redesign.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    66,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'custom-shopify-product-page-footer-67',
    'Custom Shopify Product Page & Footer',
    'Fiverr Client',
    'Various',
    '',
    'Custom Shopify Product Page & Footer The client needed specific UI/UX updates to modernize their Shopify product pages and footer to improve the overall shopping experience. Goals: Create a custom quantity selector, integrate a "You May Also Like" cross-sell section, and restructure the footer layout. Challenges: Ensuring the custom CSS and Liquid code blended perfectly with their existing theme without breaking mobile responsiveness. Solution: I wrote clean, lightweight HTML, CSS, and Shopify Liquid to build out the custom sections. I ensured the cross-sell section was dynamically linked to product recommendations and optimized the footer for clean navigation and trust-building.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/ebe6fee17212720ab1b675f60d864e8f-1781127182013/Custom%20Shopify%20Product%20Page%20_%20Footer.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    67,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'shopify-mobile-filter-ux-optimization-68',
    'Shopify Mobile Filter UX Optimization',
    'Fiverr Client',
    'Various',
    '',
    'Shopify Mobile Filter UX Optimization Mobile traffic accounts for the majority of e-commerce sales, and this client needed a smoother, more intuitive filtering system for their mobile users. Goals: Redesign the default mobile filter into a modern, clean, slide-out UI. Challenges: Mobile real estate is limited, so the filter needed to be easily accessible without overlapping critical product information. Solution: I developed a custom mobile-first layout using CSS and JavaScript. I implemented a seamless slide-out drawer style for the filters, ensuring touch targets were appropriately sized for thumbs, making it significantly easier for shoppers to find what they want on smaller screens.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/209225824a5a43ab609a8ca78a9fafc4-1781127364744/Shopify%20Mobile%20Filter%20UX%20Optimization.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    68,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'shopify-slider-ui-fix-interactivity-69',
    'Shopify Slider UI Fix & Interactivity',
    'Fiverr Client',
    'Various',
    '',
    'Shopify Slider UI Fix & Interactivity The client was experiencing a critical UI bug on their Shopify store where their product media slider had become completely unresponsive to clicks, and the navigation arrows were poorly sized and placed. Goals: Fix the "non-clickable" bug, resize the navigation buttons, and reposition them for a cleaner look. Challenges: Diagnosing frontend layout conflicts (like overlapping z-indexes or pointer-event blockers) that were preventing the slider script from registering user clicks. Solution: I debugged the DOM, isolated the overlapping container issue, and corrected the CSS hierarchy. I then adjusted the button sizing and positioning using absolute positioning to ensure the arrows were aesthetically pleasing and featured accessible, functional touch targets.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/877bb8a0be118539a0da07a0bf475694-1781127761107/Shopify%20Slider%20UI%20Fix%20_%20Interactivity.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    69,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'shopify-typography-custom-section-design-70',
    'Shopify Typography & Custom Section Design',
    'Fiverr Client',
    'Various',
    '',
    'Shopify Typography & Custom Section Design Client & Goals: A high-end lifestyle brand approached The Imam Studio to elevate their online storefront''s visual identity. Their primary goal was to establish a premium, trustworthy aesthetic through a mathematical typography hierarchy and bespoke UI elements that drive conversions. Challenges: The client''s existing Shopify theme was rigid. The default typography settings lacked the modularity needed for a truly custom look, and the out-of-the-box sections felt generic, causing a high bounce rate on product and collection pages. How I Dealt With Them: I completely overhauled the store''s typography by engineering a custom Liquid architecture that integrates natively with the Shopify Theme Editor. This allowed the merchant to seamlessly toggle between "Playfair Display" for elegant headings and "Inter" for highly readable body text without touching any code. To complement the typography, I designed and coded bespoke "Feature Grid" and "Image with Text Overlay" sections from scratch. I focused on clean spacing, accessible contrast, and flawless cross-device rendering. The final result is a polished, SaaS-style e-commerce experience that perfectly balances beautiful UI/UX design with lightweight, high-performance code.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/c1dbb1d148b4df08bb86117303b64919-1781127857022/Shopify%20Typography%20_%20Custom%20Section%20Design.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    70,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'multi-platform-custom-coding-showcase-71',
    'Multi-Platform Custom Coding Showcase',
    'Fiverr Client',
    'Various',
    '',
    'Multi-Platform Custom Coding Showcase The Client & Goals: A prominent client required advanced, custom front-end development across three distinct brands and platforms: Rock Candy Epoxy (Shopify), Profence (Squarespace), and Cristan Cordan (WordPress/Wix). The goal was to elevate the UI/UX, implement dynamic pricing, and build interactive multi-step forms that went beyond native theme capabilities. The Challenge: Each platform has entirely different underlying architectures (Liquid vs. Squarespace DOM vs. standard CMS). The challenge was writing lightweight, secure, and responsive custom code for all three without breaking their respective theme editors or slowing down page load speeds. The Solution: Acting as a lead full-stack frontend engineer, I deployed custom HTML, CSS, JavaScript, and Shopify Liquid across the board. For Rock Candy Epoxy, I engineered dynamic Liquid variant selections with customized active states. For Profence, I injected custom JavaScript to handle complex product filtering logic natively within Squarespace. For Cristan Cordan, I built a high-converting, responsive multi-step booking flow. The final delivery provided the client with three production-ready, highly optimized websites with seamless, mobile-first interactive elements.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/100d832422df70fff0572ff848b63784-1781128493520/Multi-Platform%20Custom%20Coding%20Showcase.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    71,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'shopify-general-store-rebrand-customization-72',
    'Shopify General Store Rebrand & Customization',
    'Fiverr Client',
    'Various',
    '',
    'Shopify General Store Rebrand & Customization Client & Goals: The client initially launched an aquatic-themed Shopify store but decided to pivot mid-launch to a clean, modern "general store" aesthetic (similar to G-Fuel or Vat19). The goal was to rebrand the site, strip away the niche styling, integrate new logos, and build a conversion-focused layout. Challenges: The main challenge was managing a complete design pivot without breaking the existing theme or requiring a full rebuild from scratch. The client also needed specific homepage sections (like the featured collections grids) to match perfectly, alongside structural improvements to the product pages. Solutions: I utilized custom CSS and Liquid to safely overwrite the old aquatic styles, ensuring the new design felt modern and premium. I restructured the homepage by perfectly aligning the lower featured collections to mirror the top grid, establishing a strong visual hierarchy. Finally, I optimized the product page by adding new element sections, ensuring the UI was fully mobile-responsive and optimized for high conversions.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/7f3343f669ce2f6ae368f5afc4167a58-1781128904977/Shopify%20General%20Store%20Rebrand%20_%20Customization.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    72,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'custom-shopify-section-integration-73',
    'Custom Shopify Section Integration',
    'Fiverr Client',
    'Various',
    '',
    'Custom Shopify Section Integration The client needed custom-coded sections transferred and integrated smoothly into their current Shopify theme without breaking the existing layout. The main goal was to retain the exact design and functionality while ensuring the new sections remained 100% editable within the native Shopify Theme Editor. A key challenge was avoiding code conflicts with the live theme. I carefully extracted the Liquid, CSS, and JavaScript files, integrated them seamlessly, and thoroughly tested the responsive layout across mobile and desktop devices. The final delivery provided a pixel-perfect, bug-free section that the client''s team could easily manage and customize without touching any code.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/1164022f2a061c2f42a9c830bcf5ed0b-1781128942809/Custom%20Shopify%20Section%20Integration.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    73,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'smooth-shopify-cart-drawer-ux-fix-74',
    'Smooth Shopify Cart Drawer UX Fix',
    'Fiverr Client',
    'Various',
    '',
    'Smooth Shopify Cart Drawer UX Fix My client, running the wellness brand Relaxvest, needed a high-converting, premium feel for their Shopify cart. Their existing third-party cart app lacked smooth animations, featured cluttered text, and had small touch targets that hurt the mobile experience. The main challenge was that the Upcart app was overriding the theme''s native styles and causing visual errors when elements were altered. I stepped in to clean up the CSS and carefully override the app''s default styling. I implemented a smooth slide-in animation, enlarged the checkout button and close icons for optimal mobile touch targets, and restructured the layout to remove clutter. The result was a sleek, professional cart experience that directly improved usability and conversion readiness.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/81b221054091eed10e9638ddaa7e7875-1781171130871/Smooth%20Shopify%20Cart%20Drawer%20UX%20Fix.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    74,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'custom-shopify-mega-menu-ui-75',
    'Custom Shopify Mega Menu UI',
    'Fiverr Client',
    'Various',
    '',
    'Custom Shopify Mega Menu UI Client & Goals: Flawless Jewels is a growing brand that needed a more intuitive and visually engaging way for customers to explore their expanding catalog. The primary goal was to enhance product discovery, elevate the brand''s aesthetic, and ultimately drive higher conversion rates through a seamless user journey. Challenges: The store''s default theme navigation was becoming cluttered, making it difficult for shoppers to find specific jewelry categories quickly. Additionally, the standard dropdown lacked the visual hierarchy expected from a high-end storefront, and the mobile experience felt restrictive. Solution: I engineered a custom, multi-column dropdown mega menu natively within Shopify Liquid, preserving the merchant''s ability to easily edit links from the theme editor. To improve scannability, I implemented a strong visual hierarchy utilizing clean spacing, organized category lists, and integrated visual navigation thumbnails. I also added a dedicated column for promotional banners to drive traffic to featured collections. The entire component was designed mobile-first, ensuring accessible contrast, smooth interactions, and lightweight JavaScript to maintain optimal page speed.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/9760e156b30f6172323e4ddee2046dea-1781171469057/Custom%20Shopify%20Mega%20Menu%20UI.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    75,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'custom-shopify-responsive-pop-up-form-76',
    'Custom Shopify Responsive Pop-Up Form',
    'Fiverr Client',
    'Various',
    '',
    'Custom Shopify Responsive Pop-Up Form Client & Goals: The client needed a customized, brand-aligned pop-up form for their Shopify store (Naialea) to capture leads and provide quick access to their returns portal, without relying on bulky, site-slowing third-party apps. Challenges: The primary challenge was ensuring the custom HTML/CSS integrated flawlessly with the existing Shopify theme''s styling architecture while remaining perfectly responsive across all mobile devices. How I Dealt With Them: I engineered a lightweight, clean-coded pop-up directly within the theme. I focused heavily on UI/UX, implementing a clear visual hierarchy with a conversion-optimized Call-To-Action (CTA) button and beautifully spaced input fields. I seamlessly integrated the secondary link to the returns portal and thoroughly tested the component across screen sizes to guarantee a premium, frictionless user experience.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/d7c59c5c3c744b41ecb6098f3874d518-1781171812916/Custom%20Shopify%20Responsive%20Pop-Up%20Form.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    76,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'dynamic-shopify-video-testimonial-slider-77',
    'Dynamic Shopify Video Testimonial Slider',
    'Fiverr Client',
    'Various',
    '',
    'Dynamic Shopify Video Testimonial Slider Client Goal: The client wanted to elevate their Shopify product page by integrating a high-converting, split-panel video testimonial slider. They provided a specific reference from a top-tier brand and needed a pixel-perfect, fully functional replica that seamlessly integrated into their existing Dawn theme. The Challenge: Hardcoding the section would have been easy, but it wouldn''t serve the client''s long-term needs. The real challenge was engineering a complex UI layout—combining text panels, interactive navigation, and responsive video embeds—while keeping it 100% dynamic and easily editable for a non-technical merchant. My Solution: I engineered a custom Shopify Liquid section from scratch. I built a robust backend schema that allowed the client to easily swap videos, update headings, rewrite testimonials, and modify the call-to-action buttons directly inside the native Shopify Theme Editor. On the frontend, I utilized lightweight, optimized CSS and JavaScript to ensure smooth carousel scrolling and flawless mobile responsiveness without impacting page load speed. The Result: The project was delivered in under 24 hours. The client received a highly polished, production-ready section that perfectly matched their vision. The seamless execution resulted in a flawless 5-star review and a generous tip.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/9216ce0d0f7efbc4eab3321fc5c3d221-1781172155839/Dynamic%20Shopify%20Video%20Testimonial%20Slider.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    77,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'shopify-dawn-theme-customization-banner-fix-78',
    'Shopify Dawn Theme Customization & Banner Fix',
    'Fiverr Client',
    'Various',
    '',
    'Shopify Dawn Theme Customization & Banner Fix Client & Goals: The client, a returning e-commerce store owner, needed urgent help optimizing their Shopify storefront on the Dawn theme. Their primary goal was to fix a malfunctioning homepage banner, align the typography and color scheme with their brand identity, and ensure the section remained fully editable for future updates. Challenges: The existing homepage banner was not displaying perfectly across devices, and the brand''s specific fonts and colors were not globally applied or functioning as intended within the theme settings. Solutions: I successfully debugged and rewrote the Liquid code for the custom homepage banner section to ensure flawless responsiveness and functionality. I implemented custom CSS to enforce the brand''s exact fonts and color palette. Crucially, I meticulously preserved the Shopify Theme Editor schema, ensuring the client has complete, code-free control to swap images, edit text, and change button links directly from their dashboard. Delivered in under 24 hours with 100% satisfaction.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/82dcc17a7a0329c90710ca958fa86c15-1781184457710/Shopify%20Dawn%20Theme%20Customization%20_%20Banner%20Fix.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    78,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'custom-shopify-tabs-style-measurements-79',
    'Custom Shopify Tabs: Style & Measurements',
    'Fiverr Client',
    'Various',
    '',
    'Custom Shopify Tabs: Style & Measurements Client & Goals: The client, an online apparel brand, needed to upgrade their product page to handle complex, bespoke product variations. The goal was to replace standard variant dropdowns with a highly intuitive, visually appealing two-tab interface to improve the user journey and conversion rate. The Challenge: The primary challenge was organizing a massive amount of product data—fabric types, collar styles, cuff designs, and over seven specific body measurements—without overwhelming the buyer or breaking the mobile layout. The UI needed to feel premium, lightweight, and native to their existing theme. The Solution: I engineered a custom, mobile-first Shopify section utilizing Liquid, HTML, CSS, and lightweight JavaScript. I built a dynamic tabbed layout: Style Tab: A visual selection interface displaying image swatches for customized components (Fabric, Collar, Cuffs, Front & Back, Stitches). Measurements Tab: A clean, stacked dropdown UI for precise tailoring inputs (Neck, Shoulder, Chest, Waist, Arm, Wrist, Thob Length). The final result was a production-ready, highly responsive UI that flawlessly integrated into the store''s aesthetic. The project was delivered in under 48 hours, resulting in a 5-star review and a more streamlined "build-your-own" shopping experience for their customers.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/550a54571c8af1c0599c7d6e77b94152-1781184842011/Custom%20Shopify%20Tabs%20%20Style%20_%20Measurements.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    79,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'dynamic-flickity-product-slider-for-prestige-theme-80',
    'Dynamic Flickity Product Slider for Prestige Theme',
    'Fiverr Client',
    'Various',
    '',
    'Dynamic Flickity Product Slider for Prestige Theme The client wanted to replicate the smooth product card image slider functionality from the Broadcast theme onto their active Prestige theme. The goal was to improve the visual browsing experience without needing to migrate to an entirely new theme. Implementing the core Flickity slider was straightforward, but a significant technical challenge arose immediately: whenever the user applied collection filters or navigated to a new page, the AJAX filtering broke the DOM, causing the sliders to stop functioning. To solve this, I engineered a robust JavaScript solution that listens for the native filter updates and seamlessly re-initializes the Flickity sliders after any dynamic content refresh. The final implementation featured a fully mobile-responsive design, a sleek progress bar indicator, and smooth hover-activation for desktop users. The result was a flawless, high-end browsing experience that earned a 5-star review.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/dd6398bceddfc05c692c3da37cbd6af9-1781185376513/Dynamic%20Flickity%20Product%20Slider%20for%20Prestige%20Theme.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    80,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'custom-shopify-image-marquee-slider-81',
    'Custom Shopify Image Marquee Slider',
    'Fiverr Client',
    'Various',
    '',
    'Custom Shopify Image Marquee Slider Client & Goals: An e-commerce brand owner needed a highly engaging, continuous-scroll image slider for their product pages to improve visual presentation on both desktop and mobile devices. The goal was a premium, modern feel without sacrificing site speed. Challenges: The client required the slider to be completely dynamic—meaning it needed to pull images seamlessly from existing Shopify Collections or allow manual image uploads via custom Theme Editor blocks, all while maintaining a smooth, glitch-free marquee loop. Solution: Engineered a custom Liquid section utilizing lightweight JavaScript (Flickity/SwiperJS) to create an infinite marquee effect. Built a robust JSON schema allowing the merchant to toggle between "Collection Source" or "Custom Blocks" directly in the Shopify Theme Editor. Configured multi-image blocks (up to 5 images per block) with proper alt-text rendering for SEO and accessibility. Provided a custom video walkthrough demonstrating exactly how to add, configure, and manage the new section on their live store.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/1ab0fbe0146a855b8a3b500cc5d2c3c1-1781185911780/Custom%20Shopify%20Image%20Marquee%20Slider.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    81,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'custom-subscription-buy-box-variants-82',
    'Custom Subscription Buy Box & Variants',
    'Fiverr Client',
    'Various',
    '',
    'Custom Subscription Buy Box & Variants Client & Goals: I worked with a premium pet nutrition brand that needed to upgrade their product pages to improve their subscription opt-in rates. The goal was to build a highly converting, custom-coded "Buy Box" featuring a modern variant selector and an integrated "Subscribe & Save" toggle that matched a high-end SaaS aesthetic. Challenges: The primary challenge was technical compatibility. The store was utilizing a third-party subscription app that dynamically injected elements into the DOM, which caused conflicts with the custom JavaScript needed to update the main price dynamically when a user switched between variants and subscription tiers. Furthermore, the store was actively using Replo, which required careful integration to ensure the native Liquid code rendered correctly. How I Dealt With Them: As a Senior Shopify Developer, I engineered a custom Liquid section that bypassed the third-party app conflicts. I built a seamless, interactive UI with "Best Deal" badges and dynamic price updating. To ensure the merchant had full control, I exposed all styling parameters—including variant swatch colors, active borders, and spacing—directly to the Shopify Theme Editor. The final result was a perfectly mobile-responsive, highly accessible, and conversion-optimized checkout flow.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/5b3b46f79a1a714d0da0e433b1a3354c-1781186372021/Custom%20Subscription%20Buy%20Box%20_%20Variants.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    82,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'custom-product-page-data-collection-form-83',
    'Custom Product Page Data Collection Form',
    'Fiverr Client',
    'Various',
    '',
    'Custom Product Page Data Collection Form Client & Goals: A tailored pet nutrition brand required a way to collect highly specific data about their customers'' pets (such as age, weight, breed, and allergies) directly on the product page before the item was added to the cart. The goal was a clean, user-friendly UI that seamlessly passed this data into Shopify''s cart line item properties. Challenges: The client needed the form to be fully customizable without touching code in the future. Additionally, the existing store heavily relied on a drag-and-drop page builder, making native theme modifications tricky. The form also needed to dynamically adjust its layout to remain visually balanced on both mobile and desktop screens. How I Dealt With Them: I developed a modular, block-based Shopify section. By structuring the form fields as configurable blocks within the Theme Editor, the client gained the ability to easily add, remove, or edit questions on the fly. I implemented a robust CSS grid layout to ensure inputs (like Age and Weight) aligned perfectly on desktops while stacking cleanly on mobile devices. I also added global settings for background colors, input borders, and error states, delivering a polished, production-ready UX that captured critical customer data flawlessly.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/20ec645a8e787e92454165da3c395aef-1781186417907/Custom%20Product%20Page%20Data%20Collection%20Form.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    83,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'custom-shopify-trustpilot-section-84',
    'Custom Shopify Trustpilot Section',
    'Fiverr Client',
    'Various',
    '',
    'Custom Shopify Trustpilot Section My client, an established Shopify developer and agency owner, needed a reliable partner to handle overflow development work. The goal for this specific project was to build a custom, highly dynamic Trustpilot Review section from scratch using HTML, CSS, JavaScript, and Shopify Liquid. The main technical challenge was ensuring flawless responsive design across all devices without causing layout shifts or horizontal scrolling—specifically handling viewport width constraints to maintain a clean edge-to-edge layout without CSS overflow bugs. I developed and delivered a fully modular Shopify section featuring a smooth Flickity carousel and SEO-ready Schema markup. The final code was deeply integrated with the Shopify Theme Editor, allowing the client to easily add, edit, and style reviews without touching the code. The project was successfully delivered in under 24 hours, resulting in a 5-star review and an ongoing development partnership.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/866a0a036517a968215abf28f8c37205-1781186726768/Custom%20Shopify%20Trustpilot%20Section.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    84,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'custom-shopify-product-page-ui-ux-85',
    'Custom Shopify Product Page UI/UX',
    'Fiverr Client',
    'Various',
    '',
    'Custom Shopify Product Page UI/UX Client & Goals: My client, a German health and wellness brand, wanted to completely overhaul their Shopify product page to match the premium, high-converting aesthetic of top-tier e-commerce brands. The primary goal was to replicate a specific, modern SaaS-style layout that emphasized clean visual hierarchy, social proof, and mobile responsiveness. Challenges: Visual Consistency: The client had a mix of rectangular and square product images, which broke the clean, uniform grid layout they desired. Long product titles were also pushing content down and ruining the alignment of the product cards. Custom Functionality: The reference store utilized unique features like a dynamic "Number of customers who bought" badge and custom trust icons that were not natively available in the client''s current theme. How I Solved Them: As a Senior Shopify Developer, I engineered custom Liquid sections to replicate the desired UI while preserving full merchant editability in the Shopify Theme Editor. To fix the visual inconsistencies, I implemented custom CSS logic (aspect-ratio: 1/1 and object-fit: cover) to force all images into a uniform, polished grid. I also applied smart title truncation to keep all product cards perfectly aligned. For the custom functionality, I coded a dynamic social proof feature ("132 in den letzten 4 Wochen gekauft") and integrated custom vector icons (Made in Ger',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/955313cd04313cedeb60d11a7af30981-1781187510386/Custom%20Shopify%20Product%20Page%20UI%20UX.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    85,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'custom-jewelry-featured-collection-86',
    'Custom Jewelry Featured Collection',
    'Fiverr Client',
    'Various',
    '',
    'Custom Jewelry Featured Collection The client, a premium jewelry brand, needed a highly customized "Featured Collection" section flawlessly integrated into their CRO Raphael theme. Their primary goal was to increase conversions by displaying dynamic variant image swatches directly on the product grid, alongside automated savings badges and clean review snippets. A major challenge was overriding the default theme CSS to enforce a strict two-column layout on mobile devices while maintaining perfect UI spacing, removing hardcoded vendor tags, and ensuring high-contrast pricing typography. I developed a lightweight, bloat-free Liquid section and customized the JSON schema, granting the merchant 100% control over the layout, product limits, and spacing directly from the Shopify Theme Customizer.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/3405ae2aa8f2bf3eb2cec244e73213a2-1781187854368/Custom%20Jewelry%20Featured%20Collection.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    86,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'dynamic-shopify-gifting-form-87',
    'Dynamic Shopify Gifting Form',
    'Fiverr Client',
    'Various',
    '',
    'Dynamic Shopify Gifting Form Client & Goals: My client runs a specialized premium gifting website and needed a seamless way for buyers to input recipient details (Name, Delivery Address, and Gift Message) directly on the product page before adding to the cart—similar to a high-end flower delivery service. The goal was to avoid bulky monthly apps and keep the site fast. Challenges: The client wanted the form to be dynamic so they could add or remove fields in the future. Additionally, the data needed to attach correctly to the order via Line Item Properties, requiring careful integration with the premium theme''s native architecture. How I Dealt With Them: I developed a 100% custom, app-free solution using Shopify Liquid, HTML, and targeted JavaScript. I built a clean, fully responsive form embedded right above the "Add to Cart" button. To ensure merchant editability, I structured the code so the client could easily modify the input fields later. The result was a frictionless, highly-converting user flow tailored exactly to their business model.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/94d4602504bfaa605f97b5b6dbabc121-1781188266591/Dynamic%20Shopify%20Gifting%20Form.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    87,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'shopify-section-migration-ui-setup-88',
    'Shopify Section Migration & UI Setup',
    'Fiverr Client',
    'Various',
    '',
    'Shopify Section Migration & UI Setup An e-commerce brand migrating to the premium "Olivia" Shopify theme needed to seamlessly transfer six custom, conversion-critical sections from their old architecture. The goal was to preserve the original design while integrating fully with the new theme''s global settings and layout constraints. During the migration, several technical challenges emerged: the legacy slider code conflicted with the new theme''s JavaScript framework, custom comparison tables suffered from vertical alignment issues due to varying text lengths, and native container widths were breaking the mobile UX. To resolve this, I rewrote the slider integration from scratch, implementing custom navigation and infinite loop capabilities. I applied advanced CSS Grid and Flexbox techniques to the comparison section, ensuring identical card heights regardless of content size. Finally, I mapped all static variables to dynamic Liquid schema settings, granting the merchant complete control over background colors, typography, and responsive padding directly inside the Shopify Theme Editor. The result was a pixel-perfect, highly maintainable UI that preserved the merchant''s workflow.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/febae609834852f3584be9f00a33028c-1781188137294/Shopify%20Section%20Migration%20_%20UI%20Setup.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    88,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'shopify-custom-ui-texturing-89',
    'Shopify Custom UI Texturing',
    'Fiverr Client',
    'Various',
    '',
    'Shopify Custom UI Texturing Client & Goals: A boutique Shopify brand approached me to elevate their store''s visual identity. They wanted to implement a bespoke, textured background design to specific sections of their website, such as the main header navigation and primary Call-To-Action buttons, to match their unique brand aesthetic. Challenges: The main challenge was precision targeting. The client explicitly required that the texture only apply to the header and buttons, while keeping functional UI elements—like the slide-out AJAX cart drawer—completely clean and solid. How I Dealt With Them: Instead of relying on heavy page builders, I wrote lightweight, highly targeted CSS to apply the custom texture overlays seamlessly. I isolated the exact CSS classes for the header and buttons, ensuring absolute layout integrity. I also verified that the cart drawer and mobile menus remained pristine and untextured, delivering a pixel-perfect, conflict-free UI upgrade that loaded instantly.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/c0154eba85192ec9ca9b98d0b88042bc-1781188374058/Shopify%20Custom%20UI%20Texturing.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    89,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'premium-shopify-scroll-animation-sections-90',
    'Premium Shopify Scroll Animation Sections',
    'Fiverr Client',
    'Various',
    '',
    'Premium Shopify Scroll Animation Sections Client & Goals The client was looking to elevate their Shopify store (running the Concept theme) by introducing high-end, dynamic scrolling animations similar to top-tier industry brands. The goal was to build three distinct, highly interactive areas: a Scroll Animated Intro, a Scroll Animated Split Section, and a Feature Scroll Section, to make the user journey highly engaging. Challenges Creating complex, scroll-triggered animations requires precision, especially when ensuring cross-device compatibility. The main challenges included ensuring text faded out seamlessly without leaving awkward white space during horizontal desktop splits, completely restructuring the alternating image/text flow for a flawless mobile experience, and managing the image focal point zooming effects. Most importantly, all of these advanced technical features had to remain 100% customizable from the Shopify Theme Editor so the client wouldn''t need to touch the code. How I Dealt With Them I engineered custom Liquid sections powered by lightweight CSS and JavaScript to handle the scroll events smoothly without impacting page load speed. I refactored the mobile layout logic to stack elements logically rather than trying to force desktop animations onto small screens. To ensure merchant editability, I built comprehensive schemas, giving the client full control over text positioning (9 different alignmen',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/9cbec09aa7fb2bdf2332e1a3254ad0b5-1781188691428/Premium%20Shopify%20Scroll%20Animation%20Sections.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    90,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'custom-shopify-product-section-ui-91',
    'Custom Shopify Product Section UI',
    'Fiverr Client',
    'Various',
    '',
    'Custom Shopify Product Section UI Client & Goals: My client, an e-commerce brand, needed a high-converting upgrade to their Shopify Dawn theme''s Featured Product section on the homepage. Their goal was to replicate a premium, minimalist layout featuring an interactive image gallery and a dynamic description accordion to improve user engagement and sales. Challenges: The client had highly specific aesthetic requirements, including exact typography (Cabin Semi-Bold), specific background colors (#F1F1F1), minimal borders, and custom slider navigation arrows. Additionally, the new UI needed to be flawlessly responsive across desktop and mobile. A challenge arose when changes were accidentally split across two theme copies, and a mobile layout break occurred upon initial deployment. How I Dealt With Them: I developed a custom Liquid solution using HTML, CSS, and lightweight JS to build the requested image gallery slider and sleek accordion drawer. I built a dynamic Shopify Schema block, empowering the client to easily edit product descriptions directly from the Theme Editor without touching code. I quickly consolidated the code into the live theme and immediately patched the mobile layout bug, ensuring a seamless, pixel-perfect UI. The project was successfully delivered in under 24 hours, earning a 5-star review for quick responsiveness and deep understanding.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/67a7addc1acf441d230df13c3c303a43-1781189054175/Custom%20Shopify%20Product%20Section%20UI.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    91,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'custom-interactive-tabbed-slider-92',
    'Custom Interactive Tabbed Slider',
    'Fiverr Client',
    'Various',
    '',
    'Custom Interactive Tabbed Slider Client & Goal: A rapidly growing sports supplement brand needed a custom, high-converting hero slider for their Shopify store. Their goal was to replicate a complex, tab-based navigation slider seen on a top-tier competitor''s site, allowing users to switch between product categories seamlessly from the hero section. The Challenge: The primary challenge was ensuring the tabbed layout looked flawless on mobile devices where screen real estate is limited, all while ensuring the client could easily update images, links, and text without touching a single line of code. Because of privacy concerns, the client also required the code to be delivered as a standalone file for them to upload manually. The Solution: I developed a lightweight, custom Liquid section specifically designed for the Shopify Theme Editor. For the desktop view, I implemented the interactive tabs at the bottom of the slider. To solve the mobile challenge, I engineered a sleek, edge-to-edge horizontal scrolling row for the tabs, ensuring a native app-like experience. I delivered clean, well-commented code that the client easily integrated, providing them with 100% control over the content via their admin panel.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/1d8251023452ebfc41b38497b18e5139-1781189019973/Custom%20Interactive%20Tabbed%20Slider.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    92,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'shopify-2-0-advanced-header-menu-93',
    'Shopify 2.0 Advanced Header Menu',
    'Fiverr Client',
    'Various',
    '',
    'Shopify 2.0 Advanced Header Menu Client & Goal: A returning client was in the process of upgrading their store from a legacy Shopify 1.0 theme to the modern Shopify 2.0 Dawn theme. They needed their complex header, navigation menus, and footer perfectly replicated in the new 2.0 environment so they didn''t lose their brand identity during the migration. The Challenge: After the initial build, the client realized their menu architecture was highly complex. They had standard Shopify navigation menus, but they also needed the ability to manually inject separate, standalone menu blocks directly into the header via the theme editor. They wanted a hybrid approach without breaking their existing menu structures. The Solution: I engineered a highly flexible Header section utilizing Shopify''s Online Store 2.0 block architecture. I introduced a custom "Menu Source" setting in the theme editor. This allowed the client to choose exactly how their navigation rendered: displaying only the native menu, only custom blocks, or seamlessly combining the native menu with extra custom blocks. This innovative logic gave the merchant ultimate flexibility and future-proofed their site''s navigation.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/ff8b288dc4ec0cd7fa593912e793498a-1781189334534/Shopify%202.0%20Advanced%20Header%20Menu.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    93,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'dynamic-geo-targeted-shipping-localization-ui-94',
    'Dynamic Geo-Targeted Shipping & Localization UI',
    'Fiverr Client',
    'Various',
    '',
    'Dynamic Geo-Targeted Shipping & Localization UI The client needed a way to increase trust and transparency for international visitors. The goal was to display a dynamic shipping message based on the visitor''s location (e.g., "Free Shipping to U.A.E.") that also integrated perfectly with the Shopify ''Translate & Adapt'' app. Challenge: Ensuring the geo-location detection and flag display didn''t conflict with existing theme scripts, and ensuring all text strings were fully translatable across multiple languages. Solution: I developed a custom Shopify liquid block with lightweight JavaScript. I used unique class naming to prevent style conflicts and ensured full compatibility with Shopify’s native localization API. This allowed the client to manage all translations through their existing dashboard seamlessly.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/8fd33a20d2b514df45cf8b61b2a92609-1781189963295/Dynamic%20Geo-Targeted%20Shipping%20_%20Localization%20UI.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    94,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'shopify-multi-language-routing-localization-fix-95',
    'Shopify Multi-Language Routing & Localization Fix',
    'Fiverr Client',
    'Various',
    '',
    'Shopify Multi-Language Routing & Localization Fix The client was experiencing a critical issue where direct access to localized URLs (e.g., /de/products/...) resulted in mixed language content, causing an inconsistent brand experience for German-speaking customers. Challenge: The page would load with the correct URL structure, but the content remained in English despite the language switcher indicating German. This was a non-patterned loading issue that frustrated users. Solution: After debugging the theme''s localization hooks, I implemented a robust JavaScript solution that forces content synchronization upon initial page load. This ensured that the correct language variant is served immediately when a visitor lands on a localized URL, resulting in a seamless and professional shopping experience.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/134af8e50cc9dcdc8932bbd5be85958f-1781190424673/Shopify%20Multi-Language%20Routing%20_%20Localization%20Fix.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    95,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'custom-cross-product-redirecting-ui-96',
    'Custom Cross-Product Redirecting UI',
    'Fiverr Client',
    'Various',
    '',
    'Custom Cross-Product Redirecting UI The client wanted to improve cross-selling and product navigation by adding a custom "redirecting switcher" above the variant selector. This allowed users to jump between different product types (e.g., iPhone vs. USB-C cables) without leaving the product page flow. Challenge: The design needed to mimic native Shopify variant swatches for a familiar UX, but perform a hard redirect to a different product page instead of just updating variants. It also required a "Selected" state that correctly highlighted the current product page. Solution: I built a custom liquid snippet that creates a static, mobile-responsive UI. It uses conditional logic to detect the current product URL and apply a dynamic "active" border to the correct box. This successfully streamlined the shopping journey and kept the interface looking premium and native.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/eb815e2578fa0fe682c85ef7fbf3e88b-1781190603888/Custom%20Cross-Product%20Redirecting%20UI.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    96,
    true,
    now(),
    now()
);

INSERT INTO public.projects (slug, title, client_name, industry, challenge, solution, result, is_featured, featured_image, gallery_images, technologies, live_url, order_index, is_published, created_at, updated_at)
VALUES (
    'shopify-personalized-gift-bundle-customization-l-97',
    'Shopify Personalized Gift Bundle & Customization L',
    'Fiverr Client',
    'Various',
    '',
    'Shopify Personalized Gift Bundle & Customization L Client Challenge: My client wanted to incentivize bulk purchases by offering a "Name-Personalized Gift Tin" for customers who bought 3 pairs of earrings. The challenge was that Shopify’s basic plan does not natively support complex, required cart customization fields that persist through to the order confirmation and packing slip. My Solution: Custom Liquid Development: I implemented a custom, mobile-responsive input section directly into the cart page. Data Persistence: Instead of using standard Cart Attributes (which often disappear or are difficult to track), I engineered the solution using Line Item Properties. This ensures the personalized "Name" and "Color" inputs are permanently attached to the specific product ordered. Validation Logic: I built a validation layer that prevents customers from checking out unless the mandatory customization fields are filled, ensuring zero fulfillment errors. Result: The client now has a fully automated system that displays the customer''s personalization choices in their Shopify Admin, packing slips, and order notification emails. This increased their conversion on bundle deals while maintaining a clean, premium user experience.',
    '',
    true,
    'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/ca011117b2f5fc78755e0da45f12c3d5-1781190581873/Shopify%20Personalized%20Gift%20Bundle%20_%20Customization%20Logic.png',
    '[]'::jsonb,
    '[]'::jsonb,
    '',
    97,
    true,
    now(),
    now()
);

COMMIT;