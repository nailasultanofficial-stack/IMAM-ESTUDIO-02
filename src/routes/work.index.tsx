import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import { ProjectCard } from "@/components/site/ProjectCard";
import { projectsQuery } from "@/lib/public-queries";
import { FEATURED_GIG_PROJECTS } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Reveal, TextReveal } from "@/components/ui/motion-primitives";
import type { Project } from "@/lib/content-types";

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
  const { data: fetchedProjects } = useSuspenseQuery(projectsQuery);
  const projects = [
    ...(FEATURED_GIG_PROJECTS as unknown as Project[]),
    ...(fetchedProjects || []).filter(
      (p) => !FEATURED_GIG_PROJECTS.some((fgp) => fgp.slug === p.slug),
    ),
  ] as unknown as Project[];
  const [filter, setFilter] = useState<string>("All");

  const categories = useMemo(() => {
    const projectCategories = Array.from(new Set(projects.map((p) => p.category)));
    return ["All", ...projectCategories];
  }, [projects]);

  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="mx-auto max-w-[1680px] px-4 sm:px-6 md:px-8 lg:px-12 pb-24 pt-32 md:pt-40">
      <header className="max-w-3xl">
        <Reveal direction="down">
          <p className="eyebrow text-emerald-400">SELECTED WORK</p>
        </Reveal>
        <TextReveal
          text="Featured Case Studies & Product Showcase"
          as="h1"
          className="display-1 mt-4 text-foreground font-display"
        />
        <Reveal delay={0.2}>
          <p className="lede mt-6 text-muted-foreground">
            Every case study below represents real production work scoped, architected, and engineered by Malik Jahanzaib (@jahanzeb1809). Engineered for speed, conversion, and scale.
          </p>
        </Reveal>
      </header>

      {/* Category Filter Pills */}
      <div
        className="mt-12 flex flex-wrap gap-2.5"
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
              "rounded-full border px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] transition-all duration-300",
              filter === category
                ? "border-emerald-500 bg-emerald-500 text-black font-semibold shadow-lg shadow-emerald-950/30"
                : "border-border/80 bg-surface/60 text-muted-foreground hover:border-border-strong hover:text-foreground",
            )}
          >
            {category} {category === "All" ? `(${projects.length})` : `(${projects.filter(p => p.category === category).length})`}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
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
