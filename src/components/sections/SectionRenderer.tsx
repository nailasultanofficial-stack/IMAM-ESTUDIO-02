import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { ProjectCard } from "@/components/site/ProjectCard";
import { ServiceCard } from "@/components/site/ServiceCard";
import type { PageSection, Project, Service } from "@/lib/content-types";
import { objList, paragraphs, str, strList, num } from "@/lib/section-utils";
import { whatsappUrl } from "@/lib/site";

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
    case "approach":
      return <ApproachSection section={section} />;
    case "collaboration":
      return <CollaborationSection section={section} />;
    case "final_cta":
      return <FinalCta section={section} />;
    default:
      return <GenericSection section={section} />;
  }
}

function HeroSection({ section }: { section: PageSection }) {
  const c = section.content;
  const desktop = str(c, "desktop_image");
  const mobile = str(c, "mobile_image", desktop);

  return (
    <section className="relative min-h-[92svh] w-full overflow-hidden">
      <picture>
        <source media="(max-width: 767px)" srcSet={mobile} />
        <img
          src={desktop}
          alt="Mudasar Imam, founder of IMAM ESTUDIO, in the studio"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[60%_center] md:object-center"
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />

      <div className="shell relative flex min-h-[92svh] flex-col justify-end pb-20 pt-32 md:justify-center md:pb-28">
        <div className="max-w-3xl rise">
          <p className="eyebrow text-primary">{str(c, "eyebrow", "IMAM ESTUDIO")}</p>
          <h1 className="display-1 mt-5 text-foreground">{section.title}</h1>
          {section.subtitle ? <p className="lede mt-6 max-w-2xl">{section.subtitle}</p> : null}

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/contact"
              search={{ source: "hero_primary" }}
              className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              {str(c, "primary_cta_label", "Start a project")}
            </Link>
            <Link
              to="/work"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border-strong px-7 text-sm font-medium text-foreground transition-colors hover:bg-surface"
            >
              {str(c, "secondary_cta_label", "See the work")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip({ section }: { section: PageSection }) {
  const items = strList(section.content, "items");
  if (items.length === 0) return null;

  return (
    <section className="hairline border-b border-border bg-surface/40">
      <div className="shell flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-5">
        {items.map((item) => (
          <span
            key={item}
            className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground"
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

function FounderSection({ section }: { section: PageSection }) {
  const c = section.content;
  const stats = objList(c, "stats");
  const image = str(c, "image");

  return (
    <section className="shell py-24 md:py-32">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="relative order-2 lg:order-1">
          <div className="overflow-hidden rounded-2xl border border-border bg-surface">
            <img
              src={image}
              alt={`${section.subtitle ?? "Founder"} portrait`}
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <p className="eyebrow text-primary">Founder</p>
          <h2 className="display-2 mt-4 text-foreground">{section.title}</h2>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
            {section.subtitle}
          </p>

          <div className="mt-7 space-y-4">
            {paragraphs(str(c, "body")).map((p) => (
              <p key={p.slice(0, 24)} className="text-base leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
          </div>

          {stats.length > 0 ? (
            <dl className="hairline mt-9 grid grid-cols-3 gap-6 pt-7">
              {stats.map((stat) => (
                <div key={String(stat["label"])}>
                  <dt className="sr-only">{String(stat["label"] ?? "")}</dt>
                  <dd className="font-display text-2xl text-foreground md:text-3xl">
                    {String(stat["value"] ?? "")}
                  </dd>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {String(stat["label"] ?? "")}
                  </p>
                </div>
              ))}
            </dl>
          ) : null}

          <Link
            to="/about"
            className="mt-8 inline-flex items-center gap-2 text-sm text-foreground underline-offset-4 hover:underline"
          >
            {str(c, "cta_label", "Read the philosophy")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function FeaturedWork({ section, projects }: { section: PageSection; projects: Project[] }) {
  const limit = num(section.content, "limit", 6);
  const shown = projects.slice(0, limit);
  if (shown.length === 0) return null;

  return (
    <section className="hairline bg-background py-24 md:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="Selected work"
          title={section.title ?? "Selected work"}
          subtitle={section.subtitle}
          action={{ label: "View all work", to: "/work" }}
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((project, i) => (
            <ProjectCard key={project.id} project={project} eager={i < 3} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CapabilitiesSection({ section, services }: { section: PageSection; services: Service[] }) {
  const limit = num(section.content, "limit", 6);
  const shown = services.slice(0, limit);
  if (shown.length === 0) return null;

  return (
    <section className="hairline bg-surface/30 py-24 md:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="Capabilities"
          title={section.title ?? "Capabilities"}
          subtitle={section.subtitle}
          action={{ label: "Explore capabilities", to: "/services" }}
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {shown.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ApproachSection({ section }: { section: PageSection }) {
  const phases = objList(section.content, "phases");

  return (
    <section className="hairline bg-background py-24 md:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="Method"
          title={section.title ?? "The engineering approach"}
          subtitle={section.subtitle}
          action={{ label: "See the full process", to: "/process" }}
        />
        <ol className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 xl:grid-cols-4">
          {phases.map((phase) => (
            <li key={String(phase["number"])} className="bg-surface p-7">
              <span className="font-mono text-xs text-primary">
                {String(phase["number"] ?? "")}
              </span>
              <h3 className="mt-4 text-lg font-medium tracking-tight text-foreground">
                {String(phase["title"] ?? "")}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {String(phase["body"] ?? "")}
              </p>
            </li>
          ))}
        </ol>
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
            <p className="eyebrow text-primary">{section.title}</p>
          </div>
          <div className="max-w-2xl">
            <h2 className="display-3 text-foreground">{section.subtitle}</h2>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
              {str(c, "role")}
            </p>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">{str(c, "body")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCta({ section }: { section: PageSection }) {
  const c = section.content;
  const wa = str(c, "whatsapp");

  return (
    <section className="hairline bg-background py-24 md:py-36">
      <div className="shell max-w-3xl text-center">
        <h2 className="display-2 text-foreground">{section.title}</h2>
        {section.subtitle ? <p className="lede mx-auto mt-6 max-w-xl">{section.subtitle}</p> : null}
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/contact"
            search={{ source: "final_cta" }}
            className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            {str(c, "primary_cta_label", "Start a project")}
          </Link>
          {wa ? (
            <a
              href={whatsappUrl("Hi Mudasar — I'd like to discuss a project with IMAM ESTUDIO.")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border-strong px-7 text-sm font-medium text-foreground transition-colors hover:bg-surface"
            >
              {str(c, "secondary_cta_label", "Message on WhatsApp")}
            </a>
          ) : null}
        </div>
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
        {eyebrow ? <p className="eyebrow text-primary">{eyebrow}</p> : null}
        <h2 className="display-2 mt-4 text-foreground">{title}</h2>
        {subtitle ? <p className="lede mt-4">{subtitle}</p> : null}
      </div>
      {action ? (
        <Link
          to={action.to}
          className="group inline-flex shrink-0 items-center gap-2 text-sm text-foreground underline-offset-4 hover:underline"
        >
          {action.label}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      ) : null}
    </div>
  );
}
