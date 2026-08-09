import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";

import { SectionRenderer } from "@/components/sections/SectionRenderer";
import { homepageQuery } from "@/lib/public-queries";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(homepageQuery),
  head: () => ({
    meta: [
      { title: "Malik Jahanzaib (@jahanzeb1809) — Senior Full-Stack Engineer & UI/UX Architect" },
      {
        name: "description",
        content:
          "Malik Jahanzaib (@jahanzeb1809) — Senior Full-Stack Engineer & UI/UX Architect. Engineering High Conversion Shopify and React Platforms, custom Next.js SaaS, and n8n AI automations.",
      },
      {
        property: "og:title",
        content: "Malik Jahanzaib (@jahanzeb1809) — Senior Full-Stack Engineer & UI/UX Architect",
      },
      {
        property: "og:description",
        content:
          "Engineering High Conversion Shopify and React Platforms, custom Next.js SaaS apps, and n8n AI automations.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { data } = useSuspenseQuery(homepageQuery);

  return (
    <>
      {data.sections.map((section) => (
        <SectionRenderer
          key={section.id}
          section={section}
          ctx={{ services: data.services, projects: data.projects }}
        />
      ))}
    </>
  );
}
