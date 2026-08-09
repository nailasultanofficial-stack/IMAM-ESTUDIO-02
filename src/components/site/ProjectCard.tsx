import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { TiltCard } from "@/components/ui/motion-primitives";
import type { Project } from "@/lib/content-types";

export function ProjectCard({ project, eager = false }: { project: Project; eager?: boolean }) {
  const role = (project as any).role || "Lead Full-Stack Engineer · UI/UX Architect";
  const techStack = (project as any).tech_stack || project.tags || [];

  return (
    <Link to="/work/$slug" params={{ slug: project.slug }} className="group block h-full">
      <TiltCard className="flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface shadow-lg backdrop-blur-md transition-all duration-300 hover:border-emerald-500/50 hover:bg-surface/90 hover:shadow-xl hover:shadow-emerald-950/20">
        <div>
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
            <img
              src={project.featured_image || project.thumbnail_url}
              alt={`${project.title} — case study cover`}
              loading={eager ? "eager" : "lazy"}
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />

            <div className="absolute top-3 left-3 rounded-full border border-emerald-500/30 bg-background/85 px-3 py-1 font-mono text-[10px] font-semibold uppercase text-emerald-400 backdrop-blur-md">
              {project.category}
            </div>

            {project.outcomes && project.outcomes.length > 0 ? (
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-lg border border-border/80 bg-background/85 px-3 py-1.5 backdrop-blur-md">
                <span className="flex items-center gap-1.5 font-mono text-[10px] font-semibold text-emerald-400">
                  <Sparkles className="h-3 w-3" />
                  {project.outcomes[0]}
                </span>
                <span className="font-mono text-[9px] uppercase text-muted-foreground">
                  Verified Outcome
                </span>
              </div>
            ) : null}
          </div>

          <div className="p-6 md:p-7">
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[11px] font-medium text-muted-foreground">
                {role}
              </span>
              <div className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-background transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>

            <h3 className="mt-3 font-display text-lg font-semibold leading-snug tracking-tight text-foreground md:text-xl">
              {project.title}
            </h3>

            <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
              {project.short_description || project.description}
            </p>
          </div>
        </div>

        <div className="px-6 pb-6 md:px-7 md:pb-7">
          {techStack && techStack.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {techStack.slice(0, 4).map((tech: string) => (
                <span
                  key={tech}
                  className="rounded-md border border-border/80 bg-background/80 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          ) : null}

          <div className="hairline mt-5 flex items-center justify-between pt-4">
            <span className="text-xs font-semibold text-emerald-400 group-hover:underline">
              View Case Study →
            </span>
          </div>
        </div>
      </TiltCard>
    </Link>
  );
}
