# Supabase Migration History & Management

## Applied Migrations (`zcihimfisgzpeeyhdnfq`)

1. `20260808232820_4b5c511b-dcd9-4d53-bca4-45590eb095b2.sql`: Core schema initialization, PostgreSQL types, helper functions, updated_at triggers, RLS policies for all 12 domain tables.
2. `20260808232855_77de358f-264b-4a43-aa81-136945c9948a.sql`: Function execution privileges & SECURITY DEFINER hardening.
3. `20260809000000_seed_data.sql`: Idempotent seed data for 10 capabilities, 10 case studies, 8 homepage theme sections, system pages, and SEO defaults.

## How to Apply Future Migrations

Forward-only migrations must be placed in `supabase/migrations/` and applied using:

```bash
supabase db push
```

NEVER use `supabase db reset` against production.
