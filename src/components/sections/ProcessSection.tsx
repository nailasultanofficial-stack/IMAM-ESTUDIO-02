import React from "react";
import { ArrowRight, Code2, Cpu, ShieldCheck, Rocket } from "lucide-react";
import { Reveal, TextReveal, TiltCard } from "@/components/ui/motion-primitives";
import type { PageSection } from "@/lib/content-types";

interface ProcessSectionProps {
  section: PageSection;
}

export function ProcessSection({ section }: ProcessSectionProps) {
  const content = (section.content || {}) as Record<string, any>;
  const phases = content["phases"] || [
    {
      step: "01",
      name: "Technical Blueprint",
      icon: Code2,
      description:
        "Architecture diagrams, data models, schema definitions, and API specifications before writing a single line of code.",
    },
    {
      step: "02",
      name: "Milestone-Driven Sprints",
      icon: Cpu,
      description:
        "Clean, typed, testable code pushed directly to GitHub with transparent status updates and PR reviews.",
    },
    {
      step: "03",
      name: "Security & RLS Hardening",
      icon: ShieldCheck,
      description:
        "Comprehensive security pass, RLS policy verification, penetration checks, and error boundary testing.",
    },
    {
      step: "04",
      name: "Production Handover",
      icon: Rocket,
      description:
        "CI/CD deployment, production database verification, complete technical documentation, and monitoring.",
    },
  ];

  return (
    <section className="hairline bg-background py-24 md:py-32">
      <div className="shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Reveal direction="down">
              <span className="eyebrow text-primary">Methodology</span>
            </Reveal>
            <TextReveal
              text={section.title || "4-Phase Engineering Methodology"}
              as="h2"
              className="display-2 mt-4 text-foreground font-display"
            />
            <Reveal delay={0.1}>
              <p className="lede mt-4 text-muted-foreground">
                {section.subtitle || "Rigorous execution from architecture to production."}
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <a
              href="/process"
              className="group inline-flex shrink-0 items-center gap-2 font-medium text-foreground underline-offset-4 hover:underline"
            >
              <span>See the full process</span>
              <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>

        {/* 4-Phase Grid with 3D Depth Cards */}
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {phases.map((phase: any, index: number) => {
            const IconComponent = phase.icon || Code2;
            return (
              <Reveal key={phase.step || index} delay={0.1 * index}>
                <TiltCard className="h-full rounded-2xl border border-border bg-surface/60 p-7 backdrop-blur-md transition-all hover:border-border-strong hover:bg-surface">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-primary">
                      PHASE {phase.step}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-foreground">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-foreground">
                    {phase.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {phase.description}
                  </p>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
