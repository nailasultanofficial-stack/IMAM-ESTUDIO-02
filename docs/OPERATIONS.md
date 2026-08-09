# Operations & Maintenance Guide

## Staff Onboarding & Auth Management

1. Staff members sign up or log in at `/admin/login`.
2. The first registered user automatically acquires the `owner` role via the `handle_new_user()` trigger.
3. Additional staff accounts acquire privileges when granted by the `owner` in `/admin/staff`.

## Managing Public Content

- **Services/Capabilities**: Manage at `/admin/services`. Changes update the live site instantly.
- **Projects**: Manage at `/admin/projects`. Cloudinary image URLs and outcomes are rendered dynamically.
- **Homepage Sections**: Manage order, visibility, and text at `/admin/theme-editor`.
- **SEO Metadata**: Manage titles, descriptions, and noindex rules at `/admin/seo`.

## Customer Leads & WhatsApp Engagement

- All public CTA buttons carry source parameters (e.g. `/contact?source=hero`, `/contact?source=project`).
- Leads persist in PostgreSQL with the source tag.
- Staff can contact leads directly via email or WhatsApp from `/admin/leads`.
