import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroAtmosphereCanvas } from "@/components/3d/HeroAtmosphereCanvas";
import { TextReveal, MagneticButton, Reveal } from "@/components/ui/motion-primitives";
import type { PageSection } from "@/lib/content-types";

interface HeroSectionProps {
  section: PageSection;
}

export function HeroSection({ section }: HeroSectionProps) {
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 600], [0, 80]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.4]);

  const content = (section.content || {}) as Record<string, any>;
  const desktopImage =
    content["desktop_hero_image"] ||
    "https://yqaslfozryelumtlkoxk.supabase.co/storage/v1/object/public/asset/Cinematic%20Portrait%20in%20a%20Dark%20Tech%20Studio.png";
  const mobileImage =
    content["mobile_hero_image"] ||
    "https://yqaslfozryelumtlkoxk.supabase.co/storage/v1/object/public/asset/mobile%20Cinematic%20Portrait%20in%20a%20Modern%20Black%20Interior%20mobile.png";
  const eyebrow = content["eyebrow"] || "IMAM ESTUDIO OS";
  const primaryCtaLabel = content["primary_cta_label"] || "Start an engagement";
  const primaryCtaUrl = content["primary_cta_url"] || "/contact?source=hero_primary";
  const secondaryCtaLabel = content["secondary_cta_label"] || "Explore work";
  const secondaryCtaUrl = content["secondary_cta_url"] || "/work";

  return (
    <section className="relative min-h-[95svh] w-full overflow-hidden bg-background">
      {/* 3D WebGL Atmosphere Canvas */}
      <HeroAtmosphereCanvas />

      {/* Layered Background Imagery with Parallax */}
      <motion.div style={{ y: imageY, opacity }} className="absolute inset-0 z-0">
        <picture>
          <source media="(max-width: 767px)" srcSet={mobileImage} />
          <img
            src={desktopImage}
            alt="Mudasar Imam, founder of IMAM ESTUDIO, in the dark tech studio"
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-[65%_center] opacity-40 md:object-center md:opacity-35"
          />
        </picture>
        {/* Editorial Lighting Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent md:via-background/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </motion.div>

      {/* Hero Viewport Content */}
      <div className="shell relative z-10 flex min-h-[95svh] flex-col justify-end pb-20 pt-32 md:justify-center md:pb-28">
        <div className="max-w-3xl">
          {/* Eyebrow Badge */}
          <Reveal direction="down" delay={0.1}>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-400 font-semibold">
                {eyebrow}
              </span>
            </div>
          </Reveal>

          {/* Headline */}
          <div className="mt-6">
            <TextReveal
              text={section.title || "Engineering for brands that cannot afford downtime."}
              as="h1"
              className="display-1 text-foreground font-display tracking-tight"
            />
          </div>

          {/* Subtitle / Lede */}
          <Reveal delay={0.3}>
            <p className="lede mt-6 max-w-2xl text-muted-foreground">
              {section.subtitle ||
                "Founder-led Shopify commerce, AI automation, and custom SaaS systems."}
            </p>
          </Reveal>

          {/* Disciplines Micro-Tag Strip */}
          <Reveal delay={0.4}>
            <div className="mt-7 flex flex-wrap gap-2">
              {["Shopify Commerce", "AI Automation", "Full-Stack SaaS", "Systems Architecture"].map(
                (pill) => (
                  <span
                    key={pill}
                    className="rounded-md border border-border/80 bg-surface/60 px-3 py-1 font-mono text-xs text-muted-foreground backdrop-blur-md"
                  >
                    {pill}
                  </span>
                ),
              )}
            </div>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={0.5}>
            <div className="mt-9 flex flex-col gap-3.5 sm:flex-row sm:items-center">
              <a href={primaryCtaUrl}>
                <MagneticButton className="h-12 rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:opacity-95 active:scale-95">
                  {primaryCtaLabel}
                </MagneticButton>
              </a>
              <a href={secondaryCtaUrl}>
                <MagneticButton className="h-12 rounded-full border border-border-strong bg-surface/50 px-8 text-sm font-medium text-foreground backdrop-blur-md transition-colors hover:bg-surface hover:border-foreground/40">
                  {secondaryCtaLabel}
                </MagneticButton>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
