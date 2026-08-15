import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import { ProjectCard } from "@/components/site/ProjectCard";
import { projectsQuery } from "@/lib/public-queries";
import { cn } from "@/lib/utils";

import type { Project } from "@/lib/content-types";

export const Route = createFileRoute("/work/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(projectsQuery),
  head: () => ({
    meta: [
      { title: "Engineering Case Studies — IMAM ESTUDIO" },
      {
        name: "description",
        content:
          "Engineering case studies across Shopify commerce, React/Next.js platforms, n8n AI automations, and custom web infrastructure by IMAM ESTUDIO.",
      },
      {
        property: "og:title",
        content: "Engineering Case Studies — IMAM ESTUDIO",
      },
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

  const categories = useMemo(() => {
    const projectCategories = Array.from(new Set(projects.map((p) => p.category)));
    return ["All", ...projectCategories];
  }, [projects]);

  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="shell pb-24 pt-32 md:pt-40">
      <header className="max-w-2xl">
        <p className="eyebrow text-primary">Engineering Work</p>
        <h1 className="display-2 mt-3 font-display text-foreground">
          {"Engineering Projects & Portfolio Archive"}
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground max-w-lg">
          A selection of commerce platforms, AI workflows, and high-performance web applications.
        </p>
      </header>

      {/* Category Filter Pills */}
      <div
        className="mt-12 flex flex-wrap gap-2.5"
        role="tablist"
        aria-label="Filter engineering case studies by category"
      >
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={filter === category}
            onClick={() => setFilter(category)}
            className={cn(
              "rounded-full border px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] transition-colors duration-300",
              filter === category
                ? "border-primary bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/20"
                : "border-border/80 bg-surface/60 text-muted-foreground hover:border-border-strong hover:text-foreground",
            )}
          >
            {category}{" "}
            {category === "All"
              ? `(${projects.length})`
              : `(${projects.filter((p) => p.category === category).length})`}
          </button>
        ))}
      </div>

      {/* Top Projects Grid (Asymmetric Bento) */}
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.slice(0, 6).map((project, i) => {
          const patternIndex = i % 6;
          let colSpanClass = "";
          if (patternIndex === 0 || patternIndex === 3) {
            colSpanClass = "lg:col-span-2";
          }

          return (
            <div key={project.id} className={colSpanClass}>
              <ProjectCard project={project} index={i} eager={i < 3} />
            </div>
          );
        })}
      </div>

      {/* Remaining Archive Projects (Compact List) */}
      {shown.length > 6 ? (
        <div className="mt-12">
          <h3 className="eyebrow text-muted-foreground mb-5">Archive ({shown.length - 6})</h3>
          <div className="border-b border-border/40">
            {shown.slice(6).map((project, i) => (
              <Link
                key={project.id}
                to="/work/$slug"
                params={{ slug: project.slug }}
                className="group block border-t border-border/40 py-3 hover:bg-surface/30 transition-colors rounded-md px-2 -mx-2"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-5 flex-1 overflow-hidden">
                    <span className="font-mono text-xs text-muted-foreground/40 hidden sm:block">
                      {String(i + 7).padStart(2, "0")}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display font-medium text-foreground truncate group-hover:text-primary transition-colors text-sm sm:text-base">
                        {project.title}
                      </h4>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                          {project.category}
                        </span>
                        <span className="hidden sm:inline-block w-px h-3 bg-border" />
                        <span className="font-mono text-[10px] text-muted-foreground truncate hidden sm:inline-block">
                          {(project.tech_stack || []).slice(0, 3).join(", ") || project.role}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0 flex items-center gap-3">
                    {project.collaboration_type ? (
                      <span className="hidden md:inline-block border border-border/60 bg-background/50 rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                        {project.collaboration_type}
                      </span>
                    ) : null}
                    <span className="font-mono text-[11px] font-semibold text-primary group-hover:underline">
                      View
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      {shown.length === 0 ? (
        <p className="mt-16 text-center text-sm text-muted-foreground">
          Nothing published in this category yet.
        </p>
      ) : null}
    </div>
  );
}
