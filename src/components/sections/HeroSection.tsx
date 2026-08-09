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
  const opacity = useTransform(scrollY, [0, 400], [1, 0.3]);

  const content = (section.content || {}) as Record<string, any>;
  const desktopImage =
    content["desktop_hero_image"] ||
    "https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs/494912736/original/d6e1fa4814b3a1d6029d55646baf670ccd1160b3.png";
  const mobileImage =
    content["mobile_hero_image"] ||
    "https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs/494892850/original/2b61663d23154209df1cef3d91a6e8862f614094.png";
  const eyebrow = content["eyebrow"] || "MALIK JAHANZAIB (@jahanzeb1809)";
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
            alt="Malik Jahanzaib — Senior Full-Stack Engineer & UI/UX Architect (@jahanzeb1809)"
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-[65%_center] opacity-35 md:object-center md:opacity-30"
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

          {/* Disciplines Micro-Tag Strip */}
          <Reveal delay={0.4}>
            <div className="mt-7 flex flex-wrap gap-2">
              {[
                "Shopify Liquid",
                "React 19 & Next.js",
                "n8n AI Automations",
                "Full-Stack SaaS",
                "UI/UX Architecture",
                "Framer Websites",
              ].map((pill) => (
                <span
                  key={pill}
                  className="rounded-md border border-border/80 bg-surface/60 px-3 py-1 font-mono text-xs text-muted-foreground backdrop-blur-md"
                >
                  {pill}
                </span>
              ))}
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
