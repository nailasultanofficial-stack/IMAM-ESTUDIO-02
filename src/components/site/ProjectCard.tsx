import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/content-types";
import { cleanHtml } from "@/lib/section-utils";

/**
 * ProjectCard — Used in /work archive grid (top bento + compact list).
 *
 * Changes from previous version:
 * - `aspect-video` instead of fixed h-[260px] — scales naturally
 * - No TiltCard (removes JS 3D tilt overhead)
 * - No contribution text inside card (redundant with featured view)
 * - Streamlined content: category pill | title | 2-line description | tech | CTA
 * - CSS-only hover: scale + border + shadow (no framer-motion per card)
 */
export function ProjectCard({
  project,
  index,
  eager = false,
}: {
  project: Project;
  index?: number;
  eager?: boolean;
}) {
  const techStack = project.tech_stack || project.tags || [];
  const imageSrc = project.featured_image || project.thumbnail_url;

  return (
    <Link
      to="/work/$slug"
      params={{ slug: project.slug }}
      className="group block h-full"
      aria-label={`View case study: ${project.title}`}
    >
      <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border/70 bg-surface/60 transition-all duration-250 hover:border-border-strong hover:shadow-xl hover:shadow-black/20 hover:-translate-y-0.5">
        {/* Image */}
        <div
          className="relative w-full overflow-hidden bg-background/60 border-b border-border/40"
          style={{ aspectRatio: "16/10" }}
        >
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={`${project.title} — project screenshot`}
              loading={eager ? "eager" : "lazy"}
              decoding="async"
              className="h-full w-full object-contain p-3 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-muted-foreground/20">
              <span className="font-mono text-xs uppercase tracking-wider">No preview</span>
            </div>
          )}

          {/* Category pill (top-left) + index (top-right) */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
            <span className="rounded-full border border-primary/30 bg-background/90 px-2.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-primary backdrop-blur-sm">
              {project.category}
            </span>
            {typeof index === "number" ? (
              <span className="font-mono text-[10px] font-semibold text-foreground/40">
                {String(index + 1).padStart(2, "0")}
              </span>
            ) : null}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4 md:p-5">
          {/* Role + arrow icon */}
          <div className="flex items-start justify-between gap-2">
            <span className="font-mono text-[10px] text-muted-foreground/70 leading-snug">
              {project.role || "Full-Stack Engineering"}
            </span>
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border/60 bg-background/60 transition-all duration-200 group-hover:border-primary/50 group-hover:bg-primary group-hover:text-primary-foreground">
              <ArrowUpRight className="h-3 w-3" />
            </div>
          </div>

          {/* Title */}
          <h3 className="mt-2.5 font-display text-base font-semibold leading-snug tracking-tight text-foreground group-hover:text-primary transition-colors duration-200 md:text-lg line-clamp-2">
            {project.title}
          </h3>

          {/* Description */}
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-2 flex-1 md:text-sm">
            {cleanHtml(project.short_description || project.description)}
          </p>

          {/* Tech stack */}
          {techStack.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-1.5 pt-3 border-t border-border/30">
              {techStack.slice(0, 4).map((tech: string) => (
                <span
                  key={tech}
                  className="rounded border border-border/50 bg-background/50 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </article>
    </Link>
  );
}
