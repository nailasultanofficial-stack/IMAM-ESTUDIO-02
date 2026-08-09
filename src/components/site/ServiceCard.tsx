import { Link } from "@tanstack/react-router";
import { ArrowRight, Code2 } from "lucide-react";
import { TiltCard } from "@/components/ui/motion-primitives";
import type { Service } from "@/lib/content-types";
import { formatPrice } from "@/lib/section-utils";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link to="/services/$slug" params={{ slug: service.slug }} className="group block">
      <TiltCard className="flex h-full flex-col justify-between rounded-xl border border-border bg-surface p-6 backdrop-blur-md transition-all duration-300 hover:border-emerald-500/50 hover:bg-surface/90 hover:shadow-xl hover:shadow-emerald-950/20 md:p-7">
        <div>
          <div className="flex items-center justify-between gap-2">
            <span className="eyebrow text-emerald-400">{service.category}</span>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-background/80 text-muted-foreground group-hover:border-primary group-hover:text-primary">
              <Code2 className="h-3.5 w-3.5" />
            </div>
          </div>

          <h3 className="mt-3 font-display text-lg font-medium leading-snug tracking-tight text-foreground md:text-xl">
            {service.title}
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {service.short_description}
          </p>
        </div>

        <div className="mt-6">
          <div className="flex flex-wrap gap-1.5">
            {service.tech_stack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border/80 bg-background/80 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="hairline mt-5 flex items-center justify-between pt-4">
            <span className="text-sm text-muted-foreground">
              From{" "}
              <span className="font-mono font-semibold text-foreground">
                {formatPrice(service.starting_price)}
              </span>
            </span>
            <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
          </div>
        </div>
      </TiltCard>
    </Link>
  );
}
