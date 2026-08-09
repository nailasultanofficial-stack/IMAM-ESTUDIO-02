import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft, Check } from "lucide-react";

import { serviceQuery } from "@/lib/public-queries";
import { formatPrice, paragraphs } from "@/lib/section-utils";

export const Route = createFileRoute("/services/$slug")({
  loader: async ({ context, params }) => {
    const service = await context.queryClient.ensureQueryData(serviceQuery(params.slug));
    if (!service) throw notFound();
    return service;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Capability unavailable — Malik Jahanzaib (@jahanzeb1809)" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const title = `${loaderData.title} — Malik Jahanzaib (@jahanzeb1809)`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.short_description.slice(0, 155) },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.short_description.slice(0, 155) },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="shell py-40 text-center">
      <h1 className="display-3 text-foreground">Capability not found</h1>
      <Link
        to="/services"
        className="mt-8 inline-block text-sm text-primary underline-offset-4 hover:underline"
      >
        Back to capabilities
      </Link>
    </div>
  ),
  component: ServiceDetail,
});

function ServiceDetail() {
  const { slug } = Route.useParams();
  const { data: service } = useSuspenseQuery(serviceQuery(slug));
  if (!service) return null;

  return (
    <article className="pb-24 pt-32 md:pt-40">
      <div className="shell">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          All capabilities
        </Link>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
          <div>
            <p className="eyebrow text-primary">{service.category}</p>
            <h1 className="display-1 mt-5 text-foreground">{service.title}</h1>
            <p className="lede mt-6">{service.short_description}</p>

            <div className="hairline mt-10 space-y-4 pt-8">
              {paragraphs(service.full_description).map((p) => (
                <p key={p.slice(0, 24)} className="text-base leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>

            {service.features.length > 0 ? (
              <div className="hairline mt-10 pt-8">
                <h2 className="eyebrow">What is included</h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-sm leading-relaxed text-foreground/90">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <aside className="h-max rounded-xl border border-border bg-surface p-7 lg:sticky lg:top-28">
            <p className="eyebrow">Engagement from</p>
            <p className="mt-2 font-display text-4xl text-foreground">
              {formatPrice(service.starting_price)}
            </p>
            {service.hourly_rate ? (
              <p className="mt-2 text-sm text-muted-foreground">
                Ongoing work at {formatPrice(service.hourly_rate)}/hour
              </p>
            ) : null}

            {service.tech_stack.length > 0 ? (
              <div className="hairline mt-6 pt-6">
                <h2 className="eyebrow">Typical stack</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {service.tech_stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-wider text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            <Link
              to="/contact"
              search={{ source: `service_${service.slug}` }}
              className="mt-8 inline-flex h-11 w-full items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              {service.cta_label}
            </Link>
          </aside>
        </div>
      </div>
    </article>
  );
}
