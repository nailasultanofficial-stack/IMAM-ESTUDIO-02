import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/lib/content-types";

/**
 * ServiceCard — Compact capability module.
 *
 * Structure:
 *   [ Image Section ]
 *   01  CATEGORY EYEBROW
 *   Title
 *   Short description (2-line max)
 *   → Explore
 *
 * Intentionally no tech-stack pills, no separator bar, no icon box.
 * Hover: border accent + subtle bg lift (CSS-only, no TiltCard JS).
 */
export function ServiceCard({ service, index }: { service: Service; index?: number }) {
  return (
    <Link
      to="/services/$slug"
      params={{ slug: service.slug }}
      className="group block h-full"
      aria-label={`Explore capability: ${service.title}`}
    >
      <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border/60 bg-surface/30 transition-all duration-200 hover:border-primary/30 hover:bg-surface/70 hover:shadow-md hover:shadow-primary/5">
        {/* Remote Service Image (Uncropped) */}
        {service.image_url && (
          <div className="w-full bg-surface-raised/40 border-b border-border/40 overflow-hidden">
            <img 
              src={service.image_url} 
              alt={service.title} 
              className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
          </div>
        )}

        <div className="flex flex-col flex-1 p-4 md:p-5">
          {/* Number + Category */}
          <div className="flex items-center justify-between gap-2 mb-3">
            {typeof index === "number" ? (
              <span className="font-mono text-[10px] text-muted-foreground/50">
                {String(index + 1).padStart(2, "0")}
              </span>
            ) : null}
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-primary/80 font-medium ml-auto">
              {service.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-sans text-sm font-semibold leading-snug tracking-tight text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2">
            {service.title}
          </h3>

          {/* Description */}
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-3 flex-1">
            {service.short_description}
          </p>

          {/* CTA */}
          <div className="mt-4 flex items-center gap-1 font-mono text-[11px] font-semibold text-primary group-hover:text-foreground transition-colors duration-200">
            <span>Explore</span>
            <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
