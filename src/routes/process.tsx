import { Link, createFileRoute } from "@tanstack/react-router";
import { Reveal, TextReveal } from "@/components/ui/motion-primitives";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Engineering Process — Malik Jahanzaib" },
      {
        name: "description",
        content:
          "4-phase engineering methodology by Malik Jahanzaib: Discovery, Architecture, Sprints, and Production Launch.",
      },
      { property: "og:title", content: "Engineering Process — Malik Jahanzaib" },
      {
        property: "og:description",
        content: "Discovery, architecture, milestone-driven sprints, and production launch.",
      },
    ],
  }),
  component: ProcessPage,
});

const PHASES = [
  {
    number: "01",
    title: "Discovery & Architecture",
    duration: "1–3 days",
    body: "Before writing code: analyzing conversion bottlenecks, theme architecture, user flows, database models, and API specifications to establish a clean technical blueprint.",
    deliverables: [
      "Technical blueprint & schema",
      "UX & conversion roadmap",
      "Fixed milestone estimate",
    ],
  },
  {
    number: "02",
    title: "Milestone-Driven Sprints",
    duration: "1–3 weeks",
    body: "Shipped in reviewable increments pushed directly to GitHub. You see working software and custom Liquid or React code weekly with transparent status updates.",
    deliverables: ["Weekly GitHub PRs", "Staging preview URL", "Unit & component tests"],
  },
  {
    number: "03",
    title: "Optimization & Hardening",
    duration: "2–4 days",
    body: "Core Web Vitals tuning, mobile responsiveness verification, security checks, and error boundary testing across all device viewports.",
    deliverables: [
      "Sub-second LCP tuning",
      "Mobile-first responsive pass",
      "Row-Level Security verification",
    ],
  },
  {
    number: "04",
    title: "Production Launch & Handover",
    duration: "1 day launch",
    body: "Deployment to Vercel edge CDN or live Shopify theme publishing, complete with technical documentation, admin configuration training, and 30-day post-launch support.",
    deliverables: [
      "Vercel Edge / Shopify live deploy",
      "Admin CMS documentation",
      "30-day post-launch warranty",
    ],
  },
];

function ProcessPage() {
  return (
    <div className="shell pb-24 pt-32 md:pt-40">
      <header className="max-w-3xl">
        <Reveal direction="down">
          <p className="eyebrow text-primary">Methodology</p>
        </Reveal>
        <TextReveal
          text="4-Phase Engineering Workflow"
          as="h1"
          className="display-1 mt-4 text-foreground font-display"
        />
        <Reveal delay={0.2}>
          <p className="lede mt-6 text-muted-foreground">
            A transparent engineering workflow for building custom Shopify stores, Next.js SaaS
            platforms, and n8n AI automations that stay shipped.
          </p>
        </Reveal>
      </header>

      <ol className="mt-16 space-y-px overflow-hidden rounded-2xl border border-border bg-border">
        {PHASES.map((phase, i) => (
          <Reveal key={phase.number} delay={0.1 * i}>
            <li className="bg-surface/80 p-7 backdrop-blur-md md:p-10">
              <div className="grid gap-6 md:grid-cols-[auto_1fr_18rem] md:gap-10">
                <span className="font-display text-4xl font-bold text-primary md:text-5xl">
                  {phase.number}
                </span>
                <div>
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h2 className="font-display text-2xl font-semibold text-foreground">
                      {phase.title}
                    </h2>
                    <span className="font-mono text-xs uppercase tracking-[0.16em] text-primary font-semibold">
                      {phase.duration}
                    </span>
                  </div>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                    {phase.body}
                  </p>
                </div>
                <div>
                  <h3 className="eyebrow">Deliverables</h3>
                  <ul className="mt-3 space-y-2">
                    {phase.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                        <span className="text-sm text-foreground/85 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>

      <div className="hairline mt-20 pt-14 text-center">
        <TextReveal
          text="Ready to begin with Phase 01?"
          as="h2"
          className="display-2 text-foreground font-display"
        />
        <Reveal delay={0.1}>
          <p className="lede mx-auto mt-5 max-w-xl text-muted-foreground">
            Discuss your requirements directly with Senior Engineer Malik Jahanzaib.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <Link
            to="/contact"
            search={{ source: "process_cta" }}
            className="mt-9 inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:opacity-95"
          >
            Start Discovery & Architecture
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
