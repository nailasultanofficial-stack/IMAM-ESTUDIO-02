import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import { ProjectCard } from "@/components/site/ProjectCard";
import { projectsQuery } from "@/lib/public-queries";
import { cn } from "@/lib/utils";
import { Reveal, TextReveal } from "@/components/ui/motion-primitives";

export const Route = createFileRoute("/work/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(projectsQuery),
  head: () => ({
    meta: [
      { title: "Selected Work — Malik Jahanzaib (@jahanzeb1809)" },
      {
        name: "description",
        content:
          "Engineering case studies across Shopify commerce, Next.js SaaS applications, n8n AI automations, and custom web platforms by Malik Jahanzaib.",
      },
      { property: "og:title", content: "Selected Work — Malik Jahanzaib (@jahanzeb1809)" },
      {
        property: "og:description",
        content:
          "Case studies across Shopify commerce, Next.js SaaS applications, n8n AI automations, and custom web platforms.",
      },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  const { data: projects } = useSuspenseQuery(projectsQuery);
  const [filter, setFilter] = useState<string>("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category)))],
    [projects],
  );

  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="shell pb-24 pt-32 md:pt-40">
      <header className="max-w-3xl">
        <Reveal direction="down">
          <p className="eyebrow text-primary">Selected Case Studies</p>
        </Reveal>
        <TextReveal
          text="High Conversion Engineering Portfolio"
          as="h1"
          className="display-1 mt-4 text-foreground font-display"
        />
        <Reveal delay={0.2}>
          <p className="lede mt-6 text-muted-foreground">
            Every case study below was scoped, architected, and engineered by Malik Jahanzaib (@jahanzeb1809). Designed for speed, conversion, and reliability.
          </p>
        </Reveal>
      </header>

      <div
        className="mt-12 flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter work by category"
      >
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={filter === category}
            onClick={() => setFilter(category)}
            className={cn(
              "rounded-full border px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] transition-colors",
              filter === category
                ? "border-primary bg-primary text-primary-foreground font-semibold"
                : "border-border text-muted-foreground hover:border-border-strong hover:text-foreground",
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((project, i) => (
          <ProjectCard key={project.id} project={project} eager={i < 3} />
        ))}
      </div>

      {shown.length === 0 ? (
        <p className="mt-16 text-center text-sm text-muted-foreground">
          Nothing published in this category yet.
        </p>
      ) : null}
    </div>
  );
}
