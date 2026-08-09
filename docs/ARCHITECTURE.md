# MALIK JAHANZAIB OS — System Architecture

## Overview
MALIK JAHANZAIB OS is a personal engineering portfolio and client acquisition platform built with strict technical discipline, high performance, and server-enforced security boundaries.

## Architecture Layers

```
                               ┌─────────────────────────┐
                               │     Vercel Edge CDN     │
                               └────────────┬────────────┘
                                            │
                               ┌────────────▼────────────┐
                               │   TanStack Start SSR    │
                               │     (React 19 + H3)     │
                               └────────────┬────────────┘
                                            │
                               ┌────────────▼────────────┐
                               │ Supabase PostgreSQL DB  │
                               │ (zcihimfisgzpeeyhdnfq)  │
                               └─────────────────────────┘
```

### Public Storefront (`/`, `/work`, `/services`, `/about`, `/process`, `/contact`)
- **SSR & Prerendering**: Hydrated SSR pages for instantaneous LCP and rich SEO.
- **3D Spatial Matrix**: WebGL Three.js / React Three Fiber interactive technology nodes with graceful mobile & reduced-motion fallback.
- **Smooth Easing**: Lenis momentum scroll integration with cubic-bezier easing.
- **Attribution Pipeline**: Form submissions persist to `leads` with source CTA metadata.

### Admin Control Plane (MALIK JAHANZAIB OS)
- Protected behind Supabase Auth and RLS security policies.
- Theme editor with JSON schema validation for live homepage section reordering.
- Content Management System (CMS) for projects, services, lead routing, SEO metadata, media assets, staff management, and audit logs.
