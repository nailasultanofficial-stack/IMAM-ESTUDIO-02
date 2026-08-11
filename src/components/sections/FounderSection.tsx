import React from "react";
import { ArrowRight, CheckCircle2, Terminal } from "lucide-react";
import { Reveal, TextReveal } from "@/components/ui/motion-primitives";
import type { PageSection } from "@/lib/content-types";

interface FounderSectionProps {
  section: PageSection;
}

export function FounderSection({ section }: FounderSectionProps) {
  const content = (section.content || {}) as Record<string, any>;
  const portraitUrl =
    "https://zcihimfisgzpeeyhdnfq.supabase.co/storage/v1/object/public/assets/main%20founderimaeg.jpeg";
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
    <section className="shell relative py-16 md:py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* 3D Perspective Founder Portrait Card */}
        <Reveal direction="left">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
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
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary">
                    <Terminal className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-mono text-xs font-semibold text-foreground">
                      Malik Jahanzaib
                    </p>
                    <p className="font-mono text-[10px] text-muted-foreground">
                      Senior Full-Stack Engineer
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Founder Editorial Content */}
        <div>
          <p className="eyebrow text-primary">The Engineer Behind the Work</p>

          <TextReveal
            text={section.title || "Malik Jahanzaib"}
            as="h2"
            className="display-2 mt-3 text-foreground font-display"
          />

          <Reveal delay={0.1}>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
              {section.subtitle || "Senior Full-Stack Engineer & UI/UX Architect"}
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
