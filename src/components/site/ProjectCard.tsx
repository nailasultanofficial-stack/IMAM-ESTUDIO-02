import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { TiltCard } from "@/components/ui/motion-primitives";
import type { Project } from "@/lib/content-types";

export function ProjectCard({ project, eager = false }: { project: Project; eager?: boolean }) {
  return (
    <Link to="/work/$slug" params={{ slug: project.slug }} className="group block">
      <TiltCard className="h-full overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-950/20">
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <img
            src={project.thumbnail_url}
            alt={`${project.title} — case study cover`}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />

          {/* Impact Metric Floating Badge */}
          {project.outcomes && project.outcomes.length > 0 ? (
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-lg border border-border/80 bg-background/85 px-3 py-1.5 backdrop-blur-md">
              <span className="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-emerald-400">
                <Sparkles className="h-3 w-3" />
                {project.outcomes[0]}
              </span>
              <span className="font-mono text-[10px] uppercase text-muted-foreground">
                Verified Outcome
              </span>
            </div>
          ) : null}
        </div>

        <div className="p-5 md:p-6">
          <div className="flex items-center justify-between gap-4">
            <span className="eyebrow text-emerald-400">{project.category}</span>
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-background transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
              <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>

          <h3 className="mt-3 font-display text-lg font-medium leading-snug tracking-tight text-foreground md:text-xl">
            {project.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          {/* Tech Stack Pills */}
          {(project as any).tech_stack && (project as any).tech_stack.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {((project as any).tech_stack as string[]).slice(0, 3).map((tech: string) => (
                <span
                  key={tech}
                  className="rounded-md border border-border/80 bg-background/60 px-2 py-0.5 font-mono text-[10px] uppercase text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </TiltCard>
    </Link>
  );
}
