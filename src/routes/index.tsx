import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";

import { SectionRenderer } from "@/components/sections/SectionRenderer";
import { homepageQuery } from "@/lib/public-queries";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(homepageQuery),
  head: () => ({
    meta: [
      { title: "IMAM ESTUDIO — Engineering Studio for Commerce, AI & SaaS" },
      {
        name: "description",
        content:
          "Founder-led engineering studio. Custom Shopify commerce, AI automation and full-stack SaaS, built by Mudasar Imam.",
      },
      {
        property: "og:title",
        content: "IMAM ESTUDIO — Engineering Studio for Commerce, AI & SaaS",
      },
      {
        property: "og:description",
        content:
          "Custom Shopify commerce, AI automation and full-stack SaaS. Founder-led delivery by Mudasar Imam.",
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
