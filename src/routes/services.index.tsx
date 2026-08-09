import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";

import { ServiceCard } from "@/components/site/ServiceCard";
import { servicesQuery } from "@/lib/public-queries";
import { FEATURED_GIG_SERVICES } from "@/lib/site";
import { Reveal, TextReveal } from "@/components/ui/motion-primitives";
import type { Service } from "@/lib/content-types";

export const Route = createFileRoute("/services/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(servicesQuery),
  head: () => ({
    meta: [
      { title: "Engineering Services — Malik Jahanzaib (@jahanzeb1809)" },
      {
        name: "description",
        content:
          "Custom Shopify Liquid sections, high-conversion store redesigns, custom n8n AI automations, Next.js SaaS applications, and Framer design systems by Malik Jahanzaib.",
      },
      { property: "og:title", content: "Engineering Services — Malik Jahanzaib (@jahanzeb1809)" },
      {
        property: "og:description",
        content:
          "Custom Shopify Liquid, Next.js SaaS platforms, n8n AI workflow automations, and Framer interactive websites.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const services = FEATURED_GIG_SERVICES as unknown as Service[];

  const grouped = services.reduce<Record<string, Service[]>>((acc, service) => {
    const category = service.category || "General Engineering";
    const list = acc[category] ?? [];
    list.push(service);
    acc[category] = list;
    return acc;
  }, {});

  return (
    <div className="shell pb-24 pt-32 md:pt-40">
      <header className="max-w-3xl">
        <Reveal direction="down">
          <p className="eyebrow text-primary">Engineering Services</p>
        </Reveal>
        <TextReveal
          text="Engineering High Conversion Platforms"
          as="h1"
          className="display-1 mt-4 text-foreground font-display"
        />
        <Reveal delay={0.2}>
          <p className="lede mt-6 text-muted-foreground">
            From custom native Liquid sections and conversion-driven Shopify redesigns to full-stack
            Next.js applications and n8n AI automations.
          </p>
        </Reveal>
      </header>

      <div className="mt-16 space-y-16">
        {Object.entries(grouped).map(([category, items]) => (
          <section key={category}>
            <div className="hairline flex items-baseline justify-between pt-6">
              <h2 className="display-3 text-foreground font-display">{category}</h2>
              <span className="font-mono text-xs font-semibold text-emerald-400">
                {String(items.length).padStart(2, "0")} Offered
              </span>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {items.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
