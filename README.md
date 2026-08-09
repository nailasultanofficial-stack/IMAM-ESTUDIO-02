# IMAM ESTUDIO OS — Production Platform

IMAM ESTUDIO OS is a founder-led engineering platform built for high-performance Shopify commerce, AI automation, and custom full-stack SaaS applications.

## Production Credentials & Connections

- **GitHub Repository**: [nailasultanofficial-stack/IMAM-ESTUDIO-02](https://github.com/nailasultanofficial-stack/IMAM-ESTUDIO-02.git)
- **Supabase Project ID**: `zcihimfisgzpeeyhdnfq`
- **Supabase URL**: `https://zcihimfisgzpeeyhdnfq.supabase.co`
- **Vercel Project ID**: `prj_oUgZ4BJ5IiBtGWenKkApZrltYgfv`
- **Vercel Project**: `imam-estudio-02`

---

## 1. Public Experience (Surface A)

Founder identity: **Mudasar Imam** — Senior Full Stack Engineer & AI Automation Architect

### Key Public Routes

- `/`: Homepage featuring Desktop & Mobile Hero Imagery, Trust Strip, Founder Section, 10 Capabilities, 10 Case Studies, 4-Phase Engineering Approach, Collaboration Spotlight, Final CTA, and WhatsApp Floating Widget (+923191106310).
- `/work`: 10 Selected Engineering Case Studies with category filtering.
- `/work/$slug`: Individual Case Study Detail.
- `/services`: 10 Engineering Capabilities across Shopify Commerce, AI Automation, Full-Stack SaaS, and Systems Architecture.
- `/services/$slug`: Individual Service Detail with feature breakdowns and pricing.
- `/about`: Founder background and technical philosophy.
- `/process`: 4-Phase Engineering Methodology (Technical Blueprint → Milestone Sprints → Security Pass → Production Handover).
- `/contact`: Interactive CTA-Attributed Lead Capture Form (`/contact?source=...`).

---

## 2. Private Enterprise Admin Control Plane (Surface B)

The founder (Mudasar Imam) manages all site content, section order, leads, quotes, media, staff, and security rules without modifying source code.

### Admin Routes

- `/admin/login`: Staff Authentication
- `/admin/dashboard`: Metrics, Lead Pipeline, Revenue Totals, CTA Source Attribution
- `/admin/services`: Capabilities CRUD Manager
- `/admin/projects`: Case Studies & Media Reference Manager
- `/admin/theme-editor`: Drag-and-Drop Homepage Section Manager
- `/admin/pages`: Page Builder & Dynamic CMS Page Manager
- `/admin/leads`: Leads CRM with Status Transitions, Notes, Email & WhatsApp Action Buttons
- `/admin/orders`: Proposals & Operational Quotes Manager
- `/admin/media`: Media Asset Library & Usage Reference Audit
- `/admin/seo`: Global & Page-level SEO Metadata Manager
- `/admin/staff`: Staff & RBAC Role Permission Manager
- `/admin/audit-logs`: Append-Only Security Audit Trail

---

## 3. Technology Stack & Security Model

- **Frontend**: React 19 + TanStack Router (File-based routing) + TanStack Start (SSR)
- **Styling**: TailwindCSS v4
- **Database**: PostgreSQL on Supabase (`zcihimfisgzpeeyhdnfq`)
- **Security**: PostgreSQL Row Level Security (RLS) + SECURITY DEFINER role predicates
- **Deployment**: Vercel Edge Serverless Deployment (`prj_oUgZ4BJ5IiBtGWenKkApZrltYgfv`)

---

## 4. Local Development

```bash
# Install dependencies with Bun
bun install

# Run development server
bun run dev

# Run TypeScript typecheck
bun run typecheck

# Run ESLint check
bun run lint

# Build production bundle
bun run build
```

---

## 5. Documentation Directory

Detailed architectural and operational documentation is available in `docs/`:

- `docs/ARCHITECTURE.md`: Technical stack & route structure
- `docs/DATABASE.md`: Schema, tables, and data model
- `docs/RBAC.md`: Role permissions matrix (`owner`, `admin`, `editor`, `operations`, `viewer`)
- `docs/SECURITY.md`: Security audit, RLS policies, and key protection
- `docs/DEPLOYMENT.md`: Vercel & Supabase production deployment manual
- `docs/API.md`: Server functions and API contracts
- `docs/MIGRATIONS.md`: Database migration history and schema push instructions
- `docs/OPERATIONS.md`: Operational workflows and maintenance guide
