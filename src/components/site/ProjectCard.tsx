import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Sparkles, Layers } from "lucide-react";
import { TiltCard } from "@/components/ui/motion-primitives";
import type { Project } from "@/lib/content-types";

export function ProjectCard({
  project,
  index,
  eager = false,
}: {
  project: Project;
  index?: number;
  eager?: boolean;
}) {
  const role = project.role || "Senior Full-Stack Engineer · UI/UX Architect";
  const techStack = project.tech_stack || project.tags || [];
  const imageSrc = project.featured_image || project.thumbnail_url;
  const collabBadge = project.collaboration_type || "Collaborative Project";

  return (
    <Link to="/work/$slug" params={{ slug: project.slug }} className="group block h-full">
      <TiltCard className="flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-surface/80 shadow-lg backdrop-blur-md transition-all duration-500 hover:border-emerald-500/40 hover:bg-surface hover:shadow-2xl hover:shadow-emerald-950/30">
        <div>
          {/* Screenshot Container with Unobscured View */}
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted/30">
            <img
              src={imageSrc}
              alt={`${project.title} — engineering case study screenshot`}
              loading={eager ? "eager" : "lazy"}
              decoding="async"
              className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Minimal edge gradient for top/bottom badge legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-40 transition-opacity duration-300 group-hover:opacity-20" />

            {/* Badges Bar */}
            <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1.5">
                <span className="rounded-full border border-emerald-500/40 bg-background/90 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-400 backdrop-blur-md shadow-sm">
                  {project.category}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-border/80 bg-background/90 px-2.5 py-1 font-mono text-[9px] font-medium uppercase tracking-wider text-muted-foreground backdrop-blur-md shadow-sm">
                  <Layers className="h-2.5 w-2.5 text-emerald-400" />
                  {collabBadge}
                </span>
              </div>
              {typeof index === "number" ? (
                <span className="font-mono text-xs font-bold text-emerald-400/80">
                  {String(index + 1).padStart(2, "0")}
                </span>
              ) : null}
            </div>

            {project.outcomes && project.outcomes.length > 0 ? (
              <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between rounded-lg border border-border/80 bg-background/90 px-3 py-1.5 backdrop-blur-md shadow-sm">
                <span className="flex items-center gap-1.5 font-mono text-[10px] font-semibold text-emerald-400 truncate">
                  <Sparkles className="h-3 w-3 shrink-0" />
                  {project.outcomes[0]}
                </span>
                <span className="shrink-0 font-mono text-[9px] uppercase tracking-wider text-muted-foreground ml-2">
                  Outcome
                </span>
              </div>
            ) : null}
          </div>

          {/* Card Content & Positioning */}
          <div className="p-6 md:p-7">
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[11px] font-medium text-muted-foreground/90">
                {role}
              </span>
              <div className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-background/80 transition-all duration-300 group-hover:border-emerald-500/50 group-hover:bg-emerald-500 group-hover:text-black">
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>

            <h3 className="mt-3 font-display text-lg font-semibold leading-snug tracking-tight text-foreground group-hover:text-emerald-300 transition-colors duration-300 md:text-xl">
              {project.title}
            </h3>

            <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-muted-foreground md:text-sm">
              {project.short_description || project.description}
            </p>

            {project.contribution ? (
              <p className="mt-3 font-mono text-[11px] text-emerald-400/90 line-clamp-2">
                <span className="text-muted-foreground font-normal">Contribution: </span>
                {project.contribution}
              </p>
            ) : null}
          </div>
        </div>

        {/* Footer Tech Stack & CTA */}
        <div className="px-6 pb-6 md:px-7 md:pb-7">
          {techStack && techStack.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {techStack.slice(0, 4).map((tech: string) => (
                <span
                  key={tech}
                  className="rounded-md border border-border/70 bg-background/60 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground transition-colors group-hover:border-border"
                >
                  {tech}
                </span>
              ))}
            </div>
          ) : null}

          <div className="hairline mt-5 flex items-center justify-between pt-4">
            <span className="font-mono text-xs font-semibold text-emerald-400 transition-colors group-hover:underline">
              View Case Study →
            </span>
          </div>
        </div>
      </TiltCard>
    </Link>
  );
}
