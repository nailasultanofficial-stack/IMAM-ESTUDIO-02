# Database Schema & Data Architecture

## Overview
IMAM ESTUDIO OS uses Supabase PostgreSQL (`zcihimfisgzpeeyhdnfq`) as its authoritative datastore.

## Table Inventory
- `profiles`: Staff user profiles linked to `auth.users(id)` with cascade deletion.
- `user_roles`: Dedicated role mapping table for RBAC (`owner`, `admin`, `editor`, `operations`, `viewer`).
- `services`: 10 engineering capabilities with pricing, tech stack, and display ordering.
- `projects`: 10 engineering case studies with Cloudinary gig references and outcomes.
- `pages`: System and dynamic CMS page records.
- `page_sections`: Section content JSONB payloads for visual theme editor.
- `leads`: Customer contact submissions with `source_cta` attribution and lead pipeline status (`New`, `Contacted`, `In Scoping`, `Proposal`, `Closed`, `Archived`).
- `customers`: Client records and total spend tracking.
- `orders`: Proposals, custom quotes, payment status (`Pending`, `Paid`, `Refunded`, `Failed`), and fulfillment status.
- `media_assets`: Image and media URLs with usage reference tracking.
- `seo_settings`: Route-level meta titles, descriptions, and indexing flags.
- `audit_logs`: Append-only security audit trail populated via `log_audit()`.
