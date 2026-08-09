import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import type { Service } from "@/lib/content-types";
import { formatPrice } from "@/lib/section-utils";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      to="/services/$slug"
      params={{ slug: service.slug }}
      className="group flex flex-col justify-between rounded-xl border border-border bg-surface p-6 transition-colors hover:border-border-strong md:p-7"
    >
      <div>
        <span className="eyebrow">{service.category}</span>
        <h3 className="mt-3 text-lg font-medium leading-snug tracking-tight text-foreground md:text-xl">
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
              className="rounded-full border border-border px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="hairline mt-5 flex items-center justify-between pt-4">
          <span className="text-sm text-muted-foreground">
            From <span className="text-foreground">{formatPrice(service.starting_price)}</span>
          </span>
          <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
        </div>
      </div>
    </Link>
  );
}
