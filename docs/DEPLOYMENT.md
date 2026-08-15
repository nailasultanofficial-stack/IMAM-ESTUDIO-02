# IMAM ESTUDIO OS — Production Deployment Guide

## Infrastructure Details

- **Vercel Project**: `imam-estudio-02` (Project ID: `prj_oUgZ4BJ5IiBtGWenKkApZrltYgfv`)
- **Vercel Live URL**: `https://imam-estudio-02.vercel.app`
- **GitHub Repository**: `imam-estudio-stack/IMAM-ESTUDIO-02` (`main` branch)
- **Supabase PostgreSQL**: `zcihimfisgzpeeyhdnfq` (`https://zcihimfisgzpeeyhdnfq.supabase.co`)

## Deployment Pipeline

1. Run quality checks locally:
   - `bun run typecheck`
   - `bun run lint`
   - `bun run build`
2. Push commits to `main` branch on GitHub:
   `git push origin main`
3. Deploy to Vercel production:
   `npx vercel --prod --yes`
