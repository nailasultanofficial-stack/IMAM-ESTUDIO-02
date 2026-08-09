import { createFileRoute } from "@tanstack/react-router";

import { SITE } from "@/lib/site";
import { paragraphs } from "@/lib/section-utils";

const BODY = `I am Mudasar Imam. I build the systems businesses actually run on — storefronts that carry real revenue, automation that removes real operational load, and products that have to survive their own success.

IMAM ESTUDIO is deliberately founder-led. There is no account manager translating your problem into a brief, and no junior team receiving a handoff. The engineer who sits in the scoping call is the engineer who writes the architecture document and the code.

That constrains how much work I take on, which is the point. Fewer engagements, each one understood properly. I would rather turn down a project than staff it with people who have never seen your data.

My background sits across three areas that keep converging: Shopify commerce at the level where themes stop being enough, AI automation applied to workflows rather than demos, and full-stack product engineering with the operational tooling that makes a product supportable after launch.`;

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Mudasar Imam — IMAM ESTUDIO" },
      {
        name: "description",
        content:
          "Senior Full Stack Engineer and AI Automation Architect running a founder-led engineering practice.",
      },
      { property: "og:title", content: "About Mudasar Imam — IMAM ESTUDIO" },
      {
        property: "og:description",
        content: "A founder-led engineering practice. No handoffs, no discovery theatre.",
      },
    ],
  }),
  component: AboutPage,
});

const PRINCIPLES = [
  {
    title: "The constraint before the code",
    body: "Most briefs describe a symptom. The first job is finding the actual constraint — often it is not where the client thinks it is.",
  },
  {
    title: "Write the plan down",
    body: "Every engagement gets a technical document stating the data model, the boundaries, the failure modes, and what we are deliberately not building.",
  },
  {
    title: "Build for the operator",
    body: "A system that only the engineer can change is a liability. Content, configuration and operations belong in an interface the team can use.",
  },
  {
    title: "Instrument before you launch",
    body: "If a failure only surfaces when a customer complains, the system was not finished.",
  },
];

function AboutPage() {
  return (
    <div className="pb-24 pt-32 md:pt-40">
      <div className="shell">
        <header className="max-w-3xl">
          <p className="eyebrow text-primary">About</p>
          <h1 className="display-1 mt-5 text-foreground">One engineer, accountable end to end.</h1>
        </header>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
          <div className="space-y-5">
            {paragraphs(BODY).map((p) => (
              <p key={p.slice(0, 24)} className="text-base leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
          </div>

          <aside className="h-max rounded-xl border border-border bg-surface p-7">
            <p className="eyebrow">Founder</p>
            <p className="mt-3 font-display text-2xl text-foreground">{SITE.founder}</p>
            <p className="mt-2 text-sm text-muted-foreground">{SITE.role}</p>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.16em] text-primary">
              {SITE.handle}
            </p>
          </aside>
        </div>

        <section className="hairline mt-20 pt-14">
          <h2 className="display-2 text-foreground">How I work</h2>
          <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2">
            {PRINCIPLES.map((principle) => (
              <div key={principle.title} className="bg-surface p-7">
                <h3 className="text-lg font-medium tracking-tight text-foreground">
                  {principle.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {principle.body}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
