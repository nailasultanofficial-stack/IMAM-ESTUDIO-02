import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Engineering Process — IMAM ESTUDIO" },
      {
        name: "description",
        content:
          "A four-phase engineering method: diagnose, architect, build, operate. Written plans, reviewable increments, real handover.",
      },
      { property: "og:title", content: "Engineering Process — IMAM ESTUDIO" },
      {
        property: "og:description",
        content: "Diagnose, architect, build, operate — with no discovery theatre.",
      },
    ],
  }),
  component: ProcessPage,
});

const PHASES = [
  {
    number: "01",
    title: "Diagnose",
    duration: "3–5 days",
    body: "Before a line of code: the real constraint, the real data, the real workflow. I read the codebase, the analytics and the support queue, and talk to whoever actually operates the system today.",
    deliverables: ["Constraint analysis", "Data and traffic review", "Risk register"],
  },
  {
    number: "02",
    title: "Architect",
    duration: "1–2 weeks",
    body: "A written technical plan with the tradeoffs made explicit — data model, service boundaries, failure modes, migration path, and an honest list of what we are deliberately not building.",
    deliverables: ["Architecture document", "Data model", "Scope and non-scope", "Fixed estimate"],
  },
  {
    number: "03",
    title: "Build",
    duration: "Project dependent",
    body: "Shipped in reviewable increments against a live environment. You see working software weekly rather than a status report, and scope changes are priced as they arise instead of at the end.",
    deliverables: ["Weekly increments", "Preview environment", "Test coverage on critical paths"],
  },
  {
    number: "04",
    title: "Operate",
    duration: "30 days included",
    body: "Instrumentation, documentation and handover, so the system is maintainable by someone who is not me. Where an admin surface is needed, it is part of the build, not an afterthought.",
    deliverables: [
      "Monitoring and alerting",
      "Runbook and handover",
      "Admin tooling",
      "30-day support",
    ],
  },
];

function ProcessPage() {
  return (
    <div className="shell pb-24 pt-32 md:pt-40">
      <header className="max-w-3xl">
        <p className="eyebrow text-primary">Process</p>
        <h1 className="display-1 mt-5 text-foreground">Four phases. No theatre.</h1>
        <p className="lede mt-6">
          The same method whether the engagement is a two-week performance programme or a six-month
          platform build. Each phase ends with something you can read, run or ship.
        </p>
      </header>

      <ol className="mt-16 space-y-px overflow-hidden rounded-xl border border-border bg-border">
        {PHASES.map((phase) => (
          <li key={phase.number} className="bg-surface p-7 md:p-10">
            <div className="grid gap-6 md:grid-cols-[auto_1fr_18rem] md:gap-10">
              <span className="font-display text-4xl text-primary md:text-5xl">{phase.number}</span>
              <div>
                <div className="flex flex-wrap items-baseline gap-3">
                  <h2 className="display-3 text-foreground">{phase.title}</h2>
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
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
                    <li key={item} className="text-sm text-foreground/85">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div className="hairline mt-20 pt-14 text-center">
        <h2 className="display-2 text-foreground">Start at phase one.</h2>
        <p className="lede mx-auto mt-5 max-w-xl">
          The diagnosis is the cheapest part of any project and the one most often skipped.
        </p>
        <Link
          to="/contact"
          search={{ source: "process_cta" }}
          className="mt-9 inline-flex h-12 items-center justify-center rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Book a diagnosis
        </Link>
      </div>
    </div>
  );
}
