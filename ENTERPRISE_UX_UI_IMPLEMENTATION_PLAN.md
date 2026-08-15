# Enterprise UX/UI Implementation Plan

## Phase 1: Identity Scrub & Privacy Compliance
- **Goal**: Ensure zero user identity leakage.
- **Actions**:
  - Search and replace "Malik Jahanzaib" with "IMAM ESTUDIO" across `README.md`, `src/routes/*`, `src/components/*`.
  - Check metadata in `__root.tsx` and `index.tsx`.
  - Update image URLs or alt texts if they contain personal names (e.g., in `HeroSection.tsx`).

## Phase 2: Design Foundation (System & Tokens)
- **Goal**: Establish a world-class design system.
- **Actions**:
  - Update `tailwind.config` or CSS variables (`styles.css`) for consistent typography scales using `clamp()`.
  - Define exact spacing and grid variables.
  - Implement a defined color palette (Linear/Stripe inspired: deep blacks, crisp whites, subtle grays, deliberate accent).

## Phase 3: Global Shell & Navigation
- **Goal**: Enterprise-grade layout.
- **Actions**:
  - Redesign `SiteHeader` (responsive, sticky, blurred backdrop, mobile menu adaptation).
  - Redesign `SiteFooter`.
  - Implement strict Focus management and semantic HTML for navigation.

## Phase 4: Hero Component
- **Goal**: High-impact first impression.
- **Actions**:
  - Redesign `HeroSection.tsx`.
  - Implement custom typographic hierarchy.
  - Remove generic image; replace with a technical UI visualization (CSS/framer-motion based diagram of architecture).

## Phase 5: Capabilities & Services
- **Goal**: Visualize actual capabilities (Vercel/Attio style).
- **Actions**:
  - Redesign `services` display.
  - Create custom SVG/CSS visual modules for: Theme/Plugins, Web Builders, Automations, Full Stack Apps.
  - Ensure data flows from existing hooks/context.

## Phase 6: Portfolio / Engineering Work
- **Goal**: Showcase the 97 projects with bento/interactive layouts.
- **Actions**:
  - Redesign `SectionRenderer` / `FeaturedWorkInteractive`.
  - Implement variable grid sizes.
  - Add subtle, performant hover states (magnetic where appropriate).

## Phase 7: Motion & Accessibility Polish
- **Goal**: Smooth, purposeful, and inclusive.
- **Actions**:
  - Audit all `framer-motion` usage.
  - Wrap animations in `useReducedMotion` checks.
  - Ensure all interactive elements have default/hover/focus/active states.

## Phase 8: Performance Optimization
- **Goal**: Fast load times.
- **Actions**:
  - Check image formats (use `loading="lazy"` appropriately).
  - Verify TTFB and bundle splitting.

## Phase 9: Final QA & Pre-commit
- **Goal**: Ensure everything works.
- **Actions**:
  - Run build, typecheck, lint.
  - Visual QA across breakpoints.
  - Run pre-commit instructions.
