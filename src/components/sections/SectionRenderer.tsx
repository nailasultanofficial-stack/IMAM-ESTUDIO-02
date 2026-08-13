import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, MessageCircle } from "lucide-react";

import { ProjectCard } from "@/components/site/ProjectCard";
import { ServiceCard } from "@/components/site/ServiceCard";
import { HeroSection } from "@/components/sections/HeroSection";
import { FounderSection } from "@/components/sections/FounderSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TechEcosystemCanvas } from "@/components/3d/TechEcosystemCanvas";
import { Reveal, TextReveal, MagneticButton } from "@/components/ui/motion-primitives";
import { str, strList, num, paragraphs } from "@/lib/section-utils";
import { whatsappUrl } from "@/lib/site";
import { FeaturedWorkInteractive } from "@/components/sections/FeaturedWorkInteractive";
import { useSuspenseQuery } from "@tanstack/react-query";
import { globalSettingsQuery } from "@/lib/public-queries";
import type { PageSection, Project, Service } from "@/lib/content-types";

type Ctx = { services: Service[]; projects: Project[] };

/**
 * Renders a database-driven page section. Order, visibility and copy are all
 * controlled from /admin/theme-editor — this file only owns presentation.
 */
export function SectionRenderer({ section, ctx }: { section: PageSection; ctx: Ctx }) {
  const { data: globalSettings } = useSuspenseQuery(globalSettingsQuery);
  const siteConfig = globalSettings?.["site_config"] || {};

  switch (section.section_type) {
    case "hero":
      return <HeroSection section={section} />;
    case "trust_strip":
      return <TrustStrip section={section} />;
    case "founder":
      return <FounderSection section={section} />;
    case "featured_work":
      return <FeaturedWork section={section} projects={ctx.projects} />;
    case "capabilities":
      return <CapabilitiesSection section={section} services={ctx.services} />;
    case "tech_ecosystem":
      return <TechEcosystemSection section={section} />;
    case "approach":
      return <ProcessSection section={section} />;
    case "collaboration":
      return <CollaborationSection section={section} />;
    case "final_cta":
      return <FinalCta section={section} siteConfig={siteConfig} />;
    default:
      return <GenericSection section={section} />;
  }
}

function TrustStrip({ section }: { section: PageSection }) {
  const items = strList(section.content, "items");
  const displayItems =
    items.length > 0
      ? items
      : [
          "Shopify Plus",
          "Hydrogen / Remix",
          "AI Pipelines & RAG",
          "React 19",
          "Postgres RLS",
          "Vercel Edge",
        ];

  return (
    <section className="hairline border-b border-border bg-surface/40 py-6 backdrop-blur-md">
      <div className="shell flex flex-wrap items-center justify-center gap-x-10 gap-y-3.5">
        {displayItems.map((item) => (
          <div key={item} className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground font-medium">
              {item}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturedWork({ section, projects }: { section: PageSection; projects: Project[] }) {
  const displayProjects = projects || [];
  const limit = num(section.content, "limit", 5);
  const shownProjects = displayProjects.slice(0, limit);
  if (shownProjects.length === 0) return null;

  return (
    <section className="hairline bg-background py-16 md:py-24">
      <div className="mx-auto max-w-[1680px] px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionHeading
            eyebrow="SELECTED ENGINEERING WORK"
            title={section.title ?? "Built for speed. Designed for scale."}
            subtitle={
              section.subtitle ??
              "A curated selection of commerce experiences, automation systems, and high-performance web platforms."
            }
          />
          <Link
            to="/work"
            className="group inline-flex shrink-0 items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-primary transition-colors hover:text-foreground"
          >
            View full archive →
          </Link>
        </div>

        <div className="mt-10 md:mt-14">
          <FeaturedWorkInteractive projects={shownProjects} />
        </div>
      </div>
    </section>
  );
}

function CapabilitiesSection({ section, services }: { section: PageSection; services: Service[] }) {
  const displayServices = services || [];
  const limit = num(section.content, "limit", 8);
  const shown = displayServices.slice(0, limit);
  if (shown.length === 0) return null;

  return (
    <section className="hairline bg-surface/30 py-12 md:py-20">
      <div className="shell">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionHeading
            eyebrow="Capabilities"
            title={section.title ?? "Engineering Disciplines"}
            subtitle={
              section.subtitle ??
              "From custom Shopify Liquid to Next.js SaaS platforms & n8n AI automations."
            }
          />
          <Link
            to="/services"
            className="group inline-flex shrink-0 items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-primary transition-colors hover:text-foreground"
          >
            Explore all capabilities →
          </Link>
        </div>
        <div className="mt-8 grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {shown.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TechEcosystemSection({ section }: { section: PageSection }) {
  return (
    <section className="hairline bg-background py-16 md:py-24">
      <div className="shell">
        <SectionHeading
          eyebrow="Technology"
          title={section.title ?? "Engineering Stack"}
          subtitle={section.subtitle ?? "Core technologies powering production systems."}
        />
        <div className="mt-10">
          <TechEcosystemCanvas />
        </div>
      </div>
    </section>
  );
}

function CollaborationSection({ section }: { section: PageSection }) {
  const c = section.content;
  return (
    <section className="hairline bg-background py-10 md:py-14">
      <div className="shell">
        <div className="max-w-3xl">
          <p className="eyebrow text-primary">
            {section.subtitle || "Direct Principal Engineering Collaboration"}
          </p>
          <h2 className="display-3 mt-3 text-foreground font-display">
            {section.title || "No account managers. No middle layers."}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {str(
              c,
              "body",
              "Async-first communication. Direct GitHub access. Clear production milestones. You talk to the engineer doing the work.",
            )}
          </p>
        </div>
      </div>
    </section>
  );
}

function FinalCta({ section, siteConfig }: { section: PageSection; siteConfig?: any }) {
  const c = section.content;
  const wa = str(c, "whatsapp", siteConfig?.whatsapp || "");
  const founderName = siteConfig?.founder?.split(" ")[0] || "IMAM";

  return (
    <section className="hairline relative overflow-hidden bg-background py-20 md:py-28">
      <div className="shell relative z-10 max-w-3xl text-center">
        <Reveal direction="down">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 font-mono text-xs text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Ready for Production</span>
          </div>
        </Reveal>

        <TextReveal
          text={section.title || "Ready to build software that stays shipped?"}
          as="h2"
          className="display-2 mt-6 text-foreground font-display"
        />

        {section.subtitle ? (
          <Reveal delay={0.2}>
            <p className="lede mx-auto mt-6 max-w-xl text-muted-foreground">{section.subtitle}</p>
          </Reveal>
        ) : null}

        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row sm:items-center">
            <Link to="/contact" search={{ source: "final_cta" }}>
              <MagneticButton className="h-12 rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:opacity-95 active:scale-[0.97]">
                {str(c, "primary_cta_label", "Start a project")}
              </MagneticButton>
            </Link>
            {wa ? (
              <a
                href={whatsappUrl(wa, `Hi ${founderName} — I'd like to discuss a project with you.`)}
                target="_blank"
                rel="noreferrer"
              >
                <MagneticButton className="h-12 rounded-full border border-border-strong bg-surface/50 px-8 text-sm font-medium text-foreground backdrop-blur-md transition-colors hover:bg-surface hover:border-foreground/40 active:scale-[0.97]">
                  <MessageCircle className="mr-2 h-4 w-4 text-emerald-400" />
                  {str(c, "secondary_cta_label", "Message on WhatsApp")}
                </MagneticButton>
              </a>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function GenericSection({ section }: { section: PageSection }) {
  const body = str(section.content, "body");
  return (
    <section className="shell py-20">
      {section.title ? <h2 className="display-3 text-foreground">{section.title}</h2> : null}
      {section.subtitle ? <p className="lede mt-4">{section.subtitle}</p> : null}
      {body ? (
        <div className="mt-6 space-y-4 max-w-3xl">
          {paragraphs(body).map((p) => (
            <p key={p.slice(0, 24)} className="text-base leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
        </div>
      ) : null}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string | null;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? <p className="eyebrow text-primary">{eyebrow}</p> : null}
      <h2 className="display-3 mt-3 text-foreground font-display">{title}</h2>
      {subtitle ? (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground max-w-xl">{subtitle}</p>
      ) : null}
    </div>
  );
}
