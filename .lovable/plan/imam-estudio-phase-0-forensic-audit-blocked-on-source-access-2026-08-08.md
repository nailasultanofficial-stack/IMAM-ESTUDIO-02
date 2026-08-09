# IMAM ESTUDIO — Phase 0 Forensic Audit (blocked on source access)

## Current status: source tree not reachable

Two things are verified, not assumed:

1. **This project is empty.** It contains only the blank Lovable starter — `src/routes/index.tsx` still renders the placeholder graphic, plus `__root.tsx`, `router.tsx`, and `styles.css`. There is no `src/app/`, no `src/components/TopNavBar.tsx`, no `api/leads/route.ts`, no Supabase client, no Dexie. Nothing from commit `a7653b5` is present.
2. **Cross-project checkout fails.** I ran the read-only snapshot tool against `IMAM ESTUDIO` and `imam-estudio`. Both returned "no project matching … is accessible from this workspace."

Phase 0 requires reading real files. Until the source is reachable, any Preserve/Extend/Replace/Remove map would be written from your specification text — which you explicitly ruled out as a source of truth.

## What unblocks it (pick one)

- **Exact project identifier.** If IMAM ESTUDIO lives in this workspace under a different name, give me that name or its project ID and I will snapshot it and audit immediately. Cross-project sharing must also be enabled on it by its owner.
- **Upload the tree.** Attach the repository (zip or files). Minimum viable set for a credible audit: `package.json`, `package-lock.json`, `next.config.*`, `tsconfig.json`, `tailwind.config.*`, `src/app/**`, `src/components/**`, `src/lib/**`, `src/app/globals.css`, and `.env.example`.

## Second constraint you should decide on before Phase 2

Even once I can read the code, this Lovable project cannot host it. The runtime here is TanStack Start on Cloudflare Workers; it does not execute Next.js App Router, and it cannot deploy to Vercel project `prj_69qn7l2Aeu8K1pqzEnf66frpkpUW`. Practical consequences:

- Acceptance criteria 4 and 5 (`npm run build`, `npx tsc --noEmit`, `npm run lint`, Vercel deploy) must run on your side.
- Lovable Cloud provisions a **new** Supabase project. It cannot attach to the existing `yqaslfozryelumtlkoxk`. Your hero and portrait URLs keep working regardless — they are public storage URLs and will be referenced as-is.
- So Phase 2 in Lovable would mean rebuilding on TanStack Start (which you rejected), or Lovable produces the Next.js implementation as reviewed code and migrations you apply in your repo.

Phase 0 does not depend on resolving this. I will surface it as risk R1 with a recommendation once I have seen the code.

## Phase 0 audit protocol (executed once source is available)

Read-only. No file in the source is modified.

1. **Baseline verification** — confirm framework and versions from `package.json`/lockfile against the claimed Next.js 16.2.10 / React 19 / TS 5 / Tailwind 4. Confirm `a7653b5` if git metadata is present; record it as unverifiable if not.
2. **Route inventory** — enumerate every `page.tsx`, `layout.tsx`, `route.ts`, `loading`/`error` boundary. Record server vs client components, rendering mode, and dynamic params.
3. **Component and style map** — trace the render tree from each route, catalogue shared components, and extract the real typography scale, breakpoints, tokens, and animations from `globals.css` rather than trusting the "4-breakpoint" description.
4. **Data layer** — locate every Supabase client instance, which key each uses, whether any service-role key is browser-reachable, all queries and mutations, existing tables actually referenced, and where Dexie is used and what it caches.
5. **Behavioral verification** — trace the real CTA attribution flow (`?source=`), the leads API contract and validation, the existing `/admin/dashboard` (auth-gated or not, real or mock data), and the WhatsApp widget number.
6. **Asset audit** — confirm the three Supabase hero/portrait URLs and the ten Cloudinary gig IDs are actually referenced in code, and flag any that are not.
7. **Environment surface** — every `process.env` / `NEXT_PUBLIC_` read, and which are secret vs public.

**Deliverable:** a per-area Preserve / Extend / Replace / Remove table, a "what would be lost in a rebuild" list, a spec-vs-reality discrepancy list, and a risk register.

## Schema and RBAC audit (design review only, nothing applied)

Reviewed on paper in Phase 0; migration written but not executed until you approve.

Confirmed problems in the supplied SQL:

- `auth.role() = 'authenticated'` as the admin gate means any account that can sign up reads and writes every lead, customer, and order. This is the critical finding.
- Role stored on `profiles` invites privilege escalation and RLS recursion.
- No `GRANT` statements — PostgREST returns permission errors even with correct policies.
- `audit_logs` has no policy preventing admins from editing or deleting their own trail.
- Blanket `FOR ALL` policies cannot express your five-role matrix.

Replacement design:

- `app_role` enum (`owner`, `admin`, `editor`, `operations`, `viewer`) and a separate `user_roles` table; role column removed from `profiles`.
- `has_role(_user_id uuid, _role app_role)` as `SECURITY DEFINER STABLE` with `SET search_path = public`, used inside policies to avoid recursion.
- Explicit per-operation SELECT/INSERT/UPDATE/DELETE policies per table, matching your matrix: editor confined to content tables; operations confined to leads/customers/orders; viewer read-only; owner alone over `user_roles` and security config.
- Anonymous access limited to SELECT on published services/projects/pages/visible sections, plus INSERT on `leads`. No anon read of `leads`.
- `audit_logs`: INSERT via trigger or definer function only; no UPDATE or DELETE policy for anyone; SELECT restricted to owner/admin.
- Explicit `GRANT` blocks per table, scoped to the roles the policies actually allow. Service-role key stays server-side.
- Role-by-role verification matrix (allowed and denied per table) run before Phase 2 begins.

## Next step

Reply with the workspace project name/ID for IMAM ESTUDIO, or upload the source. I run the audit and return the Preserve/Extend/Replace/Remove map and risk register before any code changes.
