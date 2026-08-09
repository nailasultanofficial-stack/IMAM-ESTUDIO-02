# 3D & Motion System Architecture — MALIK JAHANZAIB OS

## Overview
MALIK JAHANZAIB OS employs a high-performance, GPU-conscious 3D and motion storytelling system built with Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`), Framer Motion, and Lenis smooth momentum scroll.

## Core Architectural Principles
1. **GPU & Battery Safety**: 3D WebGL canvases are lazy-loaded on the client and automatically pause rendering when off-screen or when `prefers-reduced-motion` is enabled.
2. **Responsive Fallbacks**: Mobile devices and coarse pointers render clean CSS matrix fallbacks rather than heavy WebGL scenes.
3. **Non-Destructive Content Overlay**: 3D scenes serve as ambient spatial depth; all textual content remains fully crawlable, accessible, and structured with HTML5 semantics.

## Component Breakdown

### 1. Motion Primitives (`src/components/ui/motion-primitives.tsx`)
- `SmoothScrollProvider`: Lenis smooth scroll integration with cubic-bezier momentum easing.
- `Reveal`: Mask and directional slide-up element entry with spring physics.
- `TextReveal`: Staggered character/word editorial typography reveal.
- `MagneticButton`: Pointer-following spring magnetic pull button for CTAs.
- `TiltCard`: 3D perspective mouse tilt with dynamic spot-lighting and glass border highlights.
- `CustomCursor`: Retrained desktop interactive cursor follower with state awareness (`default`, `hover`, `drag`).

### 2. 3D WebGL Scenes (`src/components/3d/`)
- `HeroAtmosphereCanvas.tsx`: Ambient particle grid matrix with rotating wireframe core nodes and scroll-linked depth shift.
- `TechEcosystemCanvas.tsx`: Interactive spatial node matrix representing the core engineering technologies (Shopify, Hydrogen, React 19, TypeScript, TanStack, Supabase, n8n AI, OpenAI, TailwindCSS, Vercel).

### 3. Accessible Motion Standards
- Full compliance with `prefers-reduced-motion` media queries.
- Keyboard focus outlines preserved on all interactive elements (`focus-visible:ring-2`).
