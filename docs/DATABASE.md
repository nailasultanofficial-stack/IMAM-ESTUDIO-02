# MALIK JAHANZAIB OS — Database Architecture & Security

## Database Engine

MALIK JAHANZAIB OS uses Supabase PostgreSQL (`zcihimfisgzpeeyhdnfq`) as its authoritative datastore.

## Core Schema Tables

- `profiles`: User account metadata & system roles (`owner`, `admin`, `editor`, `operations`, `viewer`).
- `user_roles`: RBAC mappings enforced by security definer predicate functions.
- `services`: Portfolio engineering services inventory.
- `projects`: Engineering case studies and outcomes.
- `pages`: Content pages and SEO titles.
- `page_sections`: Theme Editor JSON-configurable sections for dynamic homepage layout.
- `leads`: Client acquisition inquiries with attribution source metadata.
- `customers`: Client relationships and project scopes.
- `orders`: Project milestone contracts and payment state.
- `media_assets`: Uploaded assets and media library.
- `audit_logs`: Append-only security audit trail populated by `log_audit()` triggers.
- `seo_settings`: Dynamic route meta tags, OpenGraph data, and canonical URLs.

## Row-Level Security (RLS)

All public reads are scoped to `published = true`. Privileged mutations require `has_role(auth.uid(), 'owner'|'admin')`. Anonymous users cannot read private leads, operational data, or audit logs.
