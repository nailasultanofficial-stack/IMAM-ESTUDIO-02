import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, MessageCircle } from "lucide-react";

import { ProjectCard } from "@/components/site/ProjectCard";
import { ServiceCard } from "@/components/site/ServiceCard";
import { HeroSection } from "@/components/sections/HeroSection";
import { FounderSection } from "@/components/sections/FounderSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TechEcosystemCanvas } from "@/components/3d/TechEcosystemCanvas";
import { Reveal, TextReveal, TiltCard, MagneticButton } from "@/components/ui/motion-primitives";
import type { PageSection, Project, Service } from "@/lib/content-types";
import { objList, paragraphs, str, strList, num } from "@/lib/section-utils";
import { whatsappUrl, FEATURED_GIG_SERVICES, FEATURED_GIG_PROJECTS } from "@/lib/site";

type Ctx = { services: Service[]; projects: Project[] };

/**
 * Renders a database-driven page section. Order, visibility and copy are all
 * controlled from /admin/theme-editor — this file only owns presentation.
 */
export function SectionRenderer({ section, ctx }: { section: PageSection; ctx: Ctx }) {
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
      return <FinalCta section={section} />;
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
  const displayProjects = [
    ...(FEATURED_GIG_PROJECTS as unknown as Project[]),
    ...(projects || []).filter((p) => !FEATURED_GIG_PROJECTS.some((fgp) => fgp.slug === p.slug)),
  ];
  const limit = num(section.content, "limit", 4);
  const shownProjects = displayProjects.slice(0, limit);
  if (shownProjects.length === 0) return null;

  const heroProject = shownProjects[0];
  const remainingProjects = shownProjects.slice(1);

  return (
    <section className="hairline bg-background py-24 md:py-32">
      {/* Maximum 1680px Shell Cap for Portfolio Content */}
      <div className="mx-auto max-w-[1680px] px-4 sm:px-6 md:px-8 lg:px-12">
        <SectionHeading
          eyebrow="SELECTED ENGINEERING WORK"
          title={section.title ?? "Built for speed. Designed for scale."}
          subtitle={
            section.subtitle ??
            "A selection of digital products, commerce experiences, automation systems, and high-performance web platforms developed across Shopify, React, Next.js, AI automation, and modern web infrastructure."
          }
          action={{ label: "View all case studies →", to: "/work" }}
        />

        {/* Primary Featured Case Study — Editorial 12-Column Hero Card */}
        {heroProject ? (
          <div className="mt-12 md:mt-14">
            <Link to="/work/$slug" params={{ slug: heroProject.slug }} className="group block">
              <TiltCard className="relative overflow-hidden rounded-2xl border border-border/80 bg-surface/90 shadow-2xl backdrop-blur-md transition-all duration-500 hover:border-emerald-500/50 hover:bg-surface hover:shadow-emerald-950/40 lg:grid lg:grid-cols-12 lg:items-stretch">
                {/* Hero Screenshot Container - Unobscured View */}
                <div className="relative aspect-[16/10] overflow-hidden bg-muted/20 lg:col-span-6 lg:aspect-auto lg:h-full lg:min-h-[440px]">
                  <img
                    src={heroProject.featured_image || heroProject.thumbnail_url}
                    alt={`${heroProject.title} — primary featured case study`}
                    loading="eager"
                    decoding="async"
                    className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-30 lg:bg-gradient-to-r" />

                  <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-emerald-500/50 bg-background/90 px-3.5 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-emerald-400 backdrop-blur-md shadow-md">
                      ★ Featured Case Study · 01
                    </span>
                    <span className="rounded-full border border-border/80 bg-background/90 px-3 py-1 font-mono text-xs text-muted-foreground backdrop-blur-md shadow-md">
                      {heroProject.collaboration_type || "Collaborative Project"}
                    </span>
                  </div>
                </div>

                {/* Hero Content Details */}
                <div className="flex flex-col justify-between p-8 lg:col-span-6 lg:p-10">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="eyebrow text-emerald-400">{heroProject.category}</span>
                      <span className="font-mono text-[11px] text-muted-foreground font-medium">
                        {heroProject.year || "2026"}
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-2xl font-semibold leading-tight tracking-tight text-foreground group-hover:text-emerald-300 transition-colors duration-300 md:text-3xl">
                      {heroProject.title}
                    </h3>

                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                      {heroProject.short_description || heroProject.description}
                    </p>

                    {heroProject.contribution ? (
                      <div className="mt-5 rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-4">
                        <span className="font-mono text-xs font-semibold text-emerald-400 uppercase tracking-wider block">
                          Malik's Contribution:
                        </span>
                        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                          {heroProject.contribution}
                        </p>
                      </div>
                    ) : null}

                    <div className="mt-6 flex flex-wrap gap-2">
                      {(heroProject.tech_stack || heroProject.tags || [])
                        .slice(0, 4)
                        .map((tech: string) => (
                          <span
                            key={tech}
                            className="rounded-md border border-border/80 bg-background/80 px-3 py-1 font-mono text-xs uppercase tracking-wider text-muted-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                    </div>
                  </div>

                  <div className="hairline mt-8 flex items-center justify-between pt-6">
                    <span className="font-mono text-xs font-medium text-muted-foreground">
                      {heroProject.role || "Senior Full-Stack Engineer · UI/UX Architect"}
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-emerald-400 group-hover:underline">
                      Explore Case Study →
                    </span>
                  </div>
                </div>
              </TiltCard>
            </Link>
          </div>
        ) : null}

        {/* Secondary Case Studies Grid */}
        {remainingProjects.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {remainingProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i + 1} eager={i < 2} />
            ))}
          </div>
        ) : null}

        {/* Post-Portfolio Conversion Transition Banner */}
        <div className="mt-16 rounded-2xl border border-border/80 bg-gradient-to-r from-surface/80 via-surface/40 to-surface/80 p-8 text-center backdrop-blur-md md:p-10">
          <h3 className="font-display text-xl font-semibold text-foreground md:text-2xl">
            Have a complex engineering challenge in mind?
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            Let's build a high-performance Shopify storefront, custom Next.js web platform, or
            automated n8n AI workflow tailored to your operational goals.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              search={{ source: "portfolio_banner" }}
              className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-primary-foreground shadow-lg transition-all hover:opacity-90 active:scale-95"
            >
              Start a Project →
            </Link>
            <Link
              to="/work"
              className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-foreground transition-all hover:border-emerald-500/40 hover:text-emerald-400"
            >
              View Full Work Archive
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function CapabilitiesSection({ section }: { section: PageSection; services: Service[] }) {
  const displayServices = FEATURED_GIG_SERVICES as unknown as Service[];
  const limit = num(section.content, "limit", 6);
  const shown = displayServices.slice(0, limit);
  if (shown.length === 0) return null;

  return (
    <section className="hairline bg-surface/30 py-24 md:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="Capabilities"
          title={section.title ?? "Engineering Disciplines & Gig Catalog"}
          subtitle={
            section.subtitle ??
            "From custom Shopify Liquid sections to Next.js SaaS platforms & n8n AI automations."
          }
          action={{ label: "Explore all capabilities", to: "/services" }}
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-2">
          {shown.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TechEcosystemSection({ section }: { section: PageSection }) {
  return (
    <section className="hairline bg-background py-24 md:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="3D Tech Stack"
          title={section.title ?? "Engineering Stack & Architecture"}
          subtitle={section.subtitle ?? "Spatial technology matrix powering production systems."}
        />
        <div className="mt-12">
          <TechEcosystemCanvas />
        </div>
      </div>
    </section>
  );
}

function CollaborationSection({ section }: { section: PageSection }) {
  const c = section.content;
  return (
    <section className="hairline bg-surface/30 py-20 md:py-24">
      <div className="shell">
        <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-start md:gap-14">
          <div>
            <span className="eyebrow text-primary">Direct Access</span>
          </div>
          <div className="max-w-2xl">
            <h2 className="display-3 text-foreground">
              {section.title || "No account managers. No middle layers."}
            </h2>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-emerald-400">
              {section.subtitle || "Direct Principal Engineering Collaboration"}
            </p>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {str(
                c,
                "body",
                "Async-first communication with weekly technical syncs, direct GitHub repository access, and clear production delivery milestones.",
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCta({ section }: { section: PageSection }) {
  const c = section.content;
  const wa = str(c, "whatsapp", "+923191106310");

  return (
    <section className="hairline relative overflow-hidden bg-background py-24 md:py-36">
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
              <MagneticButton className="h-12 rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:opacity-95 active:scale-95">
                {str(c, "primary_cta_label", "Start a project")}
              </MagneticButton>
            </Link>
            {wa ? (
              <a
                href={whatsappUrl("Hi Malik — I'd like to discuss a project with you.")}
                target="_blank"
                rel="noreferrer"
              >
                <MagneticButton className="h-12 rounded-full border border-border-strong bg-surface/50 px-8 text-sm font-medium text-foreground backdrop-blur-md transition-colors hover:bg-surface hover:border-foreground/40">
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
  action,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string | null;
  action?: { label: string; to: "/work" | "/services" | "/process" | "/about" };
}) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {eyebrow ? (
          <Reveal direction="down">
            <p className="eyebrow text-primary">{eyebrow}</p>
          </Reveal>
        ) : null}
        <TextReveal text={title} as="h2" className="display-2 mt-4 text-foreground font-display" />
        {subtitle ? (
          <Reveal delay={0.1}>
            <p className="lede mt-4 text-muted-foreground">{subtitle}</p>
          </Reveal>
        ) : null}
      </div>
      {action ? (
        <Reveal delay={0.2}>
          <Link
            to={action.to}
            className="group inline-flex shrink-0 items-center gap-2 font-medium text-foreground underline-offset-4 hover:underline"
          >
            {action.label}
            <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      ) : null}
    </div>
  );
}
