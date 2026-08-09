import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft, Check } from "lucide-react";

import { projectQuery } from "@/lib/public-queries";

export const Route = createFileRoute("/work/$slug")({
  loader: async ({ context, params }) => {
    const project = await context.queryClient.ensureQueryData(projectQuery(params.slug));
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Case study unavailable — IMAM ESTUDIO" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const title = `${loaderData.title} — IMAM ESTUDIO`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.description.slice(0, 155) },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.description.slice(0, 155) },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="shell py-40 text-center">
      <h1 className="display-3 text-foreground">Case study not found</h1>
      <p className="mt-4 text-sm text-muted-foreground">It may have been unpublished or moved.</p>
      <Link
        to="/work"
        className="mt-8 inline-block text-sm text-primary underline-offset-4 hover:underline"
      >
        Back to all work
      </Link>
    </div>
  ),
  component: ProjectDetail,
});

function ProjectDetail() {
  const { slug } = Route.useParams();
  const { data: project } = useSuspenseQuery(projectQuery(slug));
  if (!project) return null;

  return (
    <article className="pb-24 pt-32 md:pt-40">
      <div className="shell">
        <Link
          to="/work"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          All work
        </Link>

        <header className="mt-8 max-w-3xl">
          <p className="eyebrow text-primary">{project.category}</p>
          <h1 className="display-1 mt-5 text-foreground">{project.title}</h1>
          {project.client_name ? (
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
              {project.client_name}
            </p>
          ) : null}
        </header>

        <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-surface">
          <img
            src={project.thumbnail_url}
            alt={`${project.title} — case study cover`}
            fetchPriority="high"
            decoding="async"
            className="aspect-[16/9] w-full object-cover"
          />
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
          <div>
            <h2 className="eyebrow">The engagement</h2>
            <p className="mt-5 text-lg leading-relaxed text-foreground/90">{project.description}</p>

            {project.tags.length > 0 ? (
              <div className="hairline mt-10 pt-8">
                <h2 className="eyebrow">Stack &amp; disciplines</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-wider text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <aside className="rounded-xl border border-border bg-surface p-7">
            <h2 className="eyebrow">Measured outcomes</h2>
            <ul className="mt-5 space-y-4">
              {project.outcomes.map((outcome) => (
                <li key={outcome} className="flex gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="text-sm leading-relaxed text-foreground/90">{outcome}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/contact"
              search={{ source: `case_study_${project.slug}` }}
              className="mt-8 inline-flex h-11 w-full items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Discuss something similar
            </Link>
          </aside>
        </div>
      </div>
    </article>
  );
}
