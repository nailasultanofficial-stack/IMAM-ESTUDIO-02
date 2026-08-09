import React from "react";
import { ArrowRight, CheckCircle2, ShieldCheck, Terminal, Star } from "lucide-react";
import { TiltCard, Reveal, TextReveal } from "@/components/ui/motion-primitives";
import type { PageSection } from "@/lib/content-types";

interface FounderSectionProps {
  section: PageSection;
}

export function FounderSection({ section }: FounderSectionProps) {
  const content = (section.content || {}) as Record<string, any>;
  const portraitUrl =
    content["portrait_url"] ||
    "https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs/494912736/original/d6e1fa4814b3a1d6029d55646baf670ccd1160b3.png";
  const bio =
    content["bio"] ||
    "Welcome! I am Malik Jahanzaib, a Senior Full-Stack Engineer and UI/UX Architect. I help brands replace slow, template-based websites with high-performance web applications, headless eCommerce solutions, and AI-powered automation systems.";
  const skills: string[] = content["skills"] || [
    "Custom Native Shopify Liquid",
    "Shopify Store Redesign for CRO",
    "n8n AI Automations & Workflows",
    "Next.js & React 19 SaaS Apps",
    "Headless Commerce & Hydrogen",
    "Mobile-First UI/UX Systems",
  ];

  return (
    <section className="shell relative py-24 md:py-32">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* 3D Perspective Founder Portrait Card */}
        <Reveal direction="left">
          <TiltCard className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
              <img
                src={portraitUrl}
                alt="Malik Jahanzaib — Senior Full-Stack Engineer & UI/UX Architect (@jahanzeb1809)"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />

              {/* Founder Overlay Info Badge */}
              <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-border/80 bg-background/85 p-4 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary">
                      <Terminal className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-mono text-xs font-semibold text-foreground">
                        Malik Jahanzaib (@jahanzeb1809)
                      </p>
                      <p className="font-mono text-[11px] text-muted-foreground">
                        5.0 ★ Client Rating · Pakistan
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        </Reveal>

        {/* Founder Editorial Content */}
        <div>
          <Reveal direction="down">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-primary">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Senior Full-Stack Engineer & UI/UX Architect</span>
            </div>
          </Reveal>

          <TextReveal
            text={section.title || "Malik Jahanzaib"}
            as="h2"
            className="display-2 mt-4 text-foreground font-display"
          />

          <Reveal delay={0.1}>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-emerald-400">
              {section.subtitle || "Senior Full-Stack Engineer & UI/UX Architect (@jahanzeb1809)"}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">{bio}</p>
          </Reveal>

          {/* Capabilities & Skills Checklist */}
          <Reveal delay={0.3}>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {skills.map((skill) => (
                <div key={skill} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <span className="text-sm font-medium text-foreground">{skill}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-10 flex items-center gap-6">
              <a
                href="/about"
                className="group inline-flex items-center gap-2.5 font-medium text-foreground underline-offset-4 hover:underline"
              >
                <span>Read Malik's engineering approach</span>
                <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
