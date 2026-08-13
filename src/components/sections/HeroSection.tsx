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
    "https://zcihimfisgzpeeyhdnfq.supabase.co/storage/v1/object/public/assets/MALIK%20janzaib%20hero%20desktop.png";
  const mobileImage =
    "https://zcihimfisgzpeeyhdnfq.supabase.co/storage/v1/object/public/assets/MALIK%20janzaib%20hero%20desktop.png";
  const eyebrow = content["eyebrow"] || "IMAM ESTUDIO";
  const primaryCtaLabel = content["primary_cta_label"] || "Start an engagement";
  const primaryCtaUrl = content["primary_cta_url"] || "/contact?source=hero_primary";
  const secondaryCtaLabel = content["secondary_cta_label"] || "Explore work";
  const secondaryCtaUrl = content["secondary_cta_url"] || "/work";

  return (
    <section className="relative min-h-[95svh] w-full overflow-hidden bg-background">
      {/* Hero Background Visual — Official Artwork First (Zero floating 3D objects/particles) */}
      <motion.div style={{ y: imageY, opacity }} className="absolute inset-0 z-0">
        <picture>
          <source media="(max-width: 767px)" srcSet={mobileImage} />
          <img
            src={desktopImage}
            alt="IMAM ESTUDIO — Senior Full-Stack Engineer & UI/UX Architect"
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-center md:object-[70%_center] opacity-85 md:opacity-90"
          />
        </picture>
        {/* Minimal localized readability gradient behind text only */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-transparent md:w-3/5" />
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
                <MagneticButton className="h-12 rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:opacity-95 active:scale-[0.97]">
                  {primaryCtaLabel}
                </MagneticButton>
              </Link>
              <Link to={secondaryCtaUrl as any}>
                <MagneticButton className="h-12 rounded-full border border-border-strong bg-surface/50 px-8 text-sm font-medium text-foreground backdrop-blur-md transition-colors hover:bg-surface hover:border-foreground/40 active:scale-[0.97]">
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
