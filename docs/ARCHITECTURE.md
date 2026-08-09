# IMAM ESTUDIO OS — System Architecture

## Core Architectural Principles

IMAM ESTUDIO is a founder-led engineering platform built with strict technical discipline, performance optimization, and server-enforced security boundaries.

### Technology Stack

- **Frontend Framework**: React 19 + TanStack Router (File-based routing) + TanStack Start (SSR & Server Functions)
- **Styling & System Design**: TailwindCSS v4 (Vanilla CSS variables + zero-runtime utility optimization)
- **Database & Auth**: PostgreSQL on Supabase (`zcihimfisgzpeeyhdnfq`)
- **Security & Authorization**: PostgreSQL Row Level Security (RLS) + SECURITY DEFINER role predicates
- **Deployment & Hosting**: Vercel Edge Serverless Deployment (`prj_oUgZ4BJ5IiBtGWenKkApZrltYgfv`)

## Route Structure

- `/`: Homepage (Hero, Trust Strip, Founder Identity, Featured Work, Capabilities, Engineering Approach, CTA)
- `/work`: Case Studies & Engineering Projects Gallery
- `/work/$slug`: Individual Case Study Detail
- `/services`: 10 Engineering Disciplines & Capability Cards
- `/services/$slug`: Individual Capability Detail
- `/about`: Founder Profile & Technical Philosophy
- `/process`: 4-Phase Engineering Methodology
- `/contact`: CTA-Attributed Lead Capture Form

### Admin Control Plane (IMAM ESTUDIO OS)

- `/admin/login`: Staff Authentication
- `/admin/dashboard`: Metrics, Lead Pipeline, CTA Attribution Analytics
- `/admin/services`: Capabilities CRUD Manager
- `/admin/projects`: Case Studies & Media Reference Manager
- `/admin/theme-editor`: Drag-and-Drop Homepage Section Manager
- `/admin/pages`: Page Builder & Dynamic Content Manager
- `/admin/leads`: Leads CRM with Status Transitions & Notes
- `/admin/orders`: Proposals & Operational Quotes Manager
- `/admin/media`: Media Asset Library & Usage Reference Audit
- `/admin/seo`: Global & Page-level SEO Metadata Manager
- `/admin/staff`: Staff & RBAC Role Permission Manager
- `/admin/audit-logs`: Append-Only Security Audit Trail
