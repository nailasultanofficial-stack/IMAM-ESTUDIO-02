import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { TextReveal, MagneticButton, Reveal } from "@/components/ui/motion-primitives";
import type { PageSection } from "@/lib/content-types";

interface HeroSectionProps {
  section: PageSection;
}

export function HeroSection({ section }: HeroSectionProps) {
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 600], [0, 80]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.3]);

  const content = (section.content || {}) as Record<string, any>;
  const desktopImage =
    "https://zcihimfisgzpeeyhdnfq.supabase.co/storage/v1/object/public/assets/imam_estudio_hero_desktop.png";
  const mobileImage =
    "https://zcihimfisgzpeeyhdnfq.supabase.co/storage/v1/object/public/assets/imam_estudio_hero_desktop.png";
  const eyebrow = content["eyebrow"] || "IMAM ESTUDIO";
  const primaryCtaLabel = content["primary_cta_label"] || "Start an engagement";
  const primaryCtaUrl = content["primary_cta_url"] || "/contact?source=hero_primary";
  const secondaryCtaLabel = content["secondary_cta_label"] || "Explore work";
  const secondaryCtaUrl = content["secondary_cta_url"] || "/work";

  return (
    <section className="relative min-h-[95svh] w-full overflow-hidden bg-background">
      {/* Abstract Architecture Visualization */}
      <motion.div style={{ y: imageY, opacity }} className="absolute inset-0 z-0 overflow-hidden">
        {/* Subtle technical grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_70%_50%,#000_10%,transparent_100%)] opacity-30" />

        {/* Architecture Nodes Desktop */}
        <div className="absolute top-1/2 left-[60%] hidden -translate-y-1/2 md:block">
          <div className="relative h-[400px] w-[500px]">
            {/* Frontend Layer */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute top-[10%] left-[10%] flex h-24 w-48 flex-col justify-center rounded-xl border border-border bg-surface/50 p-4 shadow-xl backdrop-blur-md"
            >
              <div className="eyebrow text-primary">Interface</div>
              <div className="mt-1 h-1.5 w-1/2 rounded-full bg-border" />
              <div className="mt-1.5 h-1.5 w-3/4 rounded-full bg-border/50" />
            </motion.div>

            {/* API / Middleware Layer */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute top-[40%] left-[40%] flex h-24 w-48 flex-col justify-center rounded-xl border border-border bg-surface/50 p-4 shadow-xl backdrop-blur-md"
            >
               <div className="eyebrow text-emerald-500">Logic & Agents</div>
               <div className="mt-1 flex gap-2">
                 <div className="h-6 w-6 rounded-md border border-border bg-background" />
                 <div className="h-6 w-6 rounded-md border border-border bg-background" />
                 <div className="h-6 w-6 rounded-md border border-border bg-background" />
               </div>
            </motion.div>

            {/* Database Layer */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute top-[70%] left-[20%] flex h-24 w-48 flex-col justify-center rounded-xl border border-border bg-surface/50 p-4 shadow-xl backdrop-blur-md"
            >
               <div className="eyebrow text-primary">Data Integrity</div>
               <div className="mt-2 space-y-1">
                 <div className="h-1.5 w-full rounded-full bg-border" />
                 <div className="h-1.5 w-full rounded-full bg-border" />
                 <div className="h-1.5 w-[80%] rounded-full bg-border" />
               </div>
            </motion.div>

            {/* Connecting SVG Lines */}
            <svg className="absolute inset-0 h-full w-full pointer-events-none" style={{ zIndex: -1 }}>
               <motion.path
                 initial={{ pathLength: 0, opacity: 0 }}
                 animate={{ pathLength: 1, opacity: 0.3 }}
                 transition={{ duration: 1.5, delay: 0.8 }}
                 d="M 150 110 C 200 110, 200 180, 230 180"
                 fill="none"
                 stroke="var(--color-primary)"
                 strokeWidth="2"
                 strokeDasharray="4 4"
               />
               <motion.path
                 initial={{ pathLength: 0, opacity: 0 }}
                 animate={{ pathLength: 1, opacity: 0.3 }}
                 transition={{ duration: 1.5, delay: 1.0 }}
                 d="M 230 220 C 200 220, 180 270, 160 300"
                 fill="none"
                 stroke="var(--color-emerald-500)"
                 strokeWidth="2"
                 strokeDasharray="4 4"
               />
            </svg>
          </div>
        </div>

        {/* Gradients for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent md:w-3/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
      </motion.div>

      {/* Hero Viewport Content */}
      <div className="shell relative z-10 flex min-h-[95svh] flex-col justify-end pb-20 pt-32 md:justify-center md:pb-28">
        <div className="max-w-3xl">
          {/* Eyebrow Badge */}
          <Reveal direction="down" delay={0.1}>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-400 font-semibold">
                {eyebrow}
              </span>
            </div>
          </Reveal>

          {/* Headline */}
          <div className="mt-6">
            <TextReveal
              text={section.title || "Engineering High-Conversion Shopify & React Platforms."}
              as="h1"
              className="display-1 text-foreground font-display tracking-tight"
            />
          </div>

          {/* Subtitle / Lede */}
          <Reveal delay={0.3}>
            <p className="lede mt-6 max-w-2xl text-muted-foreground">
              {section.subtitle ||
                "Senior Full-Stack Engineer & UI/UX Architect building high-performance commerce, SaaS apps, and n8n AI automation systems."}
            </p>
          </Reveal>

          <Reveal delay={0.5}>
            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
              <Link to={primaryCtaUrl.split('?')[0] as any} search={primaryCtaUrl.includes('?') ? (Object.fromEntries(new URLSearchParams(primaryCtaUrl.split('?')[1])) as any) : undefined}>
                <MagneticButton className="h-12 rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-[color,transform,opacity,shadow] hover:opacity-95 active:scale-[0.97]">
                  {primaryCtaLabel}
                </MagneticButton>
              </Link>
              <Link to={secondaryCtaUrl as any}>
                <MagneticButton className="h-12 rounded-full border border-border-strong bg-surface/50 px-8 text-sm font-medium text-foreground backdrop-blur-md transition-[color,transform,opacity,shadow] hover:bg-surface hover:border-foreground/40 active:scale-[0.97]">
                  {secondaryCtaLabel}
                </MagneticButton>
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
