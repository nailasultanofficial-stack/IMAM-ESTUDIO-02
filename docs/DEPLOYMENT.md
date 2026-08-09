# Production Deployment Manual

## Vercel Integration

- **Vercel Project**: `imam-estudio-02`
- **Vercel Project ID**: `prj_oUgZ4BJ5IiBtGWenKkApZrltYgfv`
- **GitHub Repository**: `nailasultanofficial-stack/IMAM-ESTUDIO-02`

## Deployment Steps

1. Run `bun run build` locally to verify build outputs.
2. Push commits to branch `main` on GitHub repository `https://github.com/nailasultanofficial-stack/IMAM-ESTUDIO-02.git`.
3. Deploy directly via Vercel CLI: `npx vercel --prod`.

## Environment Variables Required

- `VITE_SUPABASE_PROJECT_ID`: `zcihimfisgzpeeyhdnfq`
- `VITE_SUPABASE_URL`: `https://zcihimfisgzpeeyhdnfq.supabase.co`
- `VITE_SUPABASE_PUBLISHABLE_KEY`: `sb_publishable_PBq3Iq8h9KA7AEdztjmjUQ_ADfX_5Ud`
- `SUPABASE_URL`: `https://zcihimfisgzpeeyhdnfq.supabase.co`
- `SUPABASE_PUBLISHABLE_KEY`: `sb_publishable_PBq3Iq8h9KA7AEdztjmjUQ_ADfX_5Ud`
