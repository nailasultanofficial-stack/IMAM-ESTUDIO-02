import { Link } from "@tanstack/react-router";
import { ArrowRight, Code2, ExternalLink } from "lucide-react";
import { TiltCard } from "@/components/ui/motion-primitives";
import type { Service } from "@/lib/content-types";
import { formatPrice } from "@/lib/section-utils";

export function ServiceCard({ service }: { service: Service }) {
  const imageUrl = (service as any).image_url || (service as any).thumbnail_url;
  const fiverrUrl = (service as any).fiverr_url;

  return (
    <div className="group block h-full">
      <TiltCard className="flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface shadow-lg backdrop-blur-md transition-all duration-300 hover:border-emerald-500/50 hover:bg-surface/90 hover:shadow-xl hover:shadow-emerald-950/20">
        {imageUrl ? (
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
            <img
              src={imageUrl}
              alt={service.title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-60" />
            <div className="absolute top-3 left-3 rounded-full border border-emerald-500/30 bg-background/85 px-3 py-1 font-mono text-[10px] uppercase font-semibold text-emerald-400 backdrop-blur-md">
              {service.category}
            </div>
          </div>
        ) : null}

        <div className="flex flex-1 flex-col justify-between p-6 md:p-7">
          <div>
            {!imageUrl ? (
              <div className="flex items-center justify-between gap-2">
                <span className="eyebrow text-emerald-400">{service.category}</span>
                <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-background/80 text-muted-foreground group-hover:border-primary group-hover:text-primary">
                  <Code2 className="h-3.5 w-3.5" />
                </div>
              </div>
            ) : null}

            <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-foreground md:text-xl">
              {service.title}
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {service.short_description}
            </p>
          </div>

          <div className="mt-6">
            {service.tech_stack && service.tech_stack.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {service.tech_stack.slice(0, 4).map((tech) => (
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
              <span className="text-sm text-muted-foreground">
                From{" "}
                <span className="font-mono font-bold text-foreground">
                  {formatPrice(service.starting_price)}
                </span>
                <span className="text-xs text-muted-foreground"> / project</span>
              </span>

              <div className="flex items-center gap-2">
                {fiverrUrl ? (
                  <a
                    href={fiverrUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 underline-offset-4 hover:underline"
                  >
                    Fiverr Gig <ExternalLink className="h-3 w-3" />
                  </a>
                ) : (
                  <Link
                    to="/services/$slug"
                    params={{ slug: service.slug }}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 underline-offset-4 hover:underline"
                  >
                    More details
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </TiltCard>
    </div>
  );
}
