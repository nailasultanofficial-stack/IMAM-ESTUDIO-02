import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";

import { ServiceCard } from "@/components/site/ServiceCard";
import { servicesQuery } from "@/lib/public-queries";

export const Route = createFileRoute("/services/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(servicesQuery),
  head: () => ({
    meta: [
      { title: "Capabilities — IMAM ESTUDIO" },
      {
        name: "description",
        content:
          "Shopify theme and app engineering, headless commerce, AI automation, RAG assistants, SaaS and platform engineering.",
      },
      { property: "og:title", content: "Capabilities — IMAM ESTUDIO" },
      {
        property: "og:description",
        content:
          "Ten engineering disciplines across commerce, AI automation and product engineering.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { data: services } = useSuspenseQuery(servicesQuery);

  const grouped = services.reduce<Record<string, typeof services>>((acc, service) => {
    const list = acc[service.category] ?? [];
    list.push(service);
    acc[service.category] = list;
    return acc;
  }, {});

  return (
    <div className="shell pb-24 pt-32 md:pt-40">
      <header className="max-w-3xl">
        <p className="eyebrow text-primary">Capabilities</p>
        <h1 className="display-1 mt-5 text-foreground">
          Ten disciplines. One engineer accountable.
        </h1>
        <p className="lede mt-6">
          Pricing below is a starting point for a well-scoped engagement, not a menu. Every project
          begins with a written technical plan before any commitment.
        </p>
      </header>

      <div className="mt-16 space-y-16">
        {Object.entries(grouped).map(([category, items]) => (
          <section key={category}>
            <div className="hairline flex items-baseline justify-between pt-6">
              <h2 className="display-3 text-foreground">{category}</h2>
              <span className="font-mono text-xs text-muted-foreground">
                {String(items.length).padStart(2, "0")}
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
