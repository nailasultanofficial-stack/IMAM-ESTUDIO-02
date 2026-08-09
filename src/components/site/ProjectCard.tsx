import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import type { Project } from "@/lib/content-types";

export function ProjectCard({ project, eager = false }: { project: Project; eager?: boolean }) {
  return (
    <Link
      to="/work/$slug"
      params={{ slug: project.slug }}
      className="group block overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-border-strong"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={project.thumbnail_url}
          alt={`${project.title} — case study cover`}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </div>
      <div className="p-5 md:p-6">
        <div className="flex items-center justify-between gap-4">
          <span className="eyebrow">{project.category}</span>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
        </div>
        <h3 className="mt-3 text-lg font-medium leading-snug tracking-tight text-foreground md:text-xl">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        {project.outcomes.length > 0 ? (
          <p className="mt-4 font-mono text-xs text-primary">{project.outcomes[0]}</p>
        ) : null}
      </div>
    </Link>
  );
}
