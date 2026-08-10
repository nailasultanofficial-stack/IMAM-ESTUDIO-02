import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft, Check, ExternalLink, MessageCircle, Sparkles } from "lucide-react";

import { projectQuery } from "@/lib/public-queries";
import { Reveal } from "@/components/ui/motion-primitives";
import { whatsappUrl } from "@/lib/site";

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
          { title: "Case study unavailable — Malik Jahanzaib (@jahanzeb1809)" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const title = `${loaderData.title} | Case Study — Malik Jahanzaib (@jahanzeb1809)`;
    const description = loaderData.short_description || loaderData.description?.slice(0, 155) || "";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:image", content: loaderData.featured_image || loaderData.thumbnail_url },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="shell py-40 text-center">
      <h1 className="display-3 font-display text-foreground">Case study not found</h1>
      <p className="mt-4 text-sm text-muted-foreground">It may have been unpublished or moved.</p>
      <Link
        to="/work"
        className="mt-8 inline-block font-mono text-sm text-emerald-400 underline-offset-4 hover:underline"
      >
        ← Back to all work
      </Link>
    </div>
  ),
  component: ProjectDetail,
});

function ProjectDetail() {
  const { slug } = Route.useParams();
  const { data: project } = useSuspenseQuery(projectQuery(slug));
  if (!project) return null;

  const role = (project as any).role || "Lead Full-Stack Engineer · UI/UX Architect";
  const challenge = (project as any).challenge;
  const approach = (project as any).approach;
  const solution = (project as any).solution;
  const fiverrUrl = (project as any).fiverr_url;
  const techStack = (project as any).tech_stack || project.tags || [];

  return (
    <article className="pb-24 pt-32 md:pt-40">
      <div className="mx-auto max-w-[1680px] px-4 sm:px-6 md:px-8 lg:px-12">
        <Reveal direction="down">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-emerald-400"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Case Studies
          </Link>
        </Reveal>

        <header className="mt-8 max-w-4xl">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <span className="eyebrow text-emerald-400">{project.category}</span>
              {project.client_name ? (
                <span className="rounded-full border border-border/80 bg-background/80 px-3 py-1 font-mono text-[10px] uppercase text-muted-foreground">
                  {project.client_name}
                </span>
              ) : null}
              {project.year ? (
                <span className="rounded-full border border-border/80 bg-background/80 px-3 py-1 font-mono text-[10px] uppercase text-muted-foreground">
                  {project.year}
                </span>
              ) : null}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="display-1 mt-5 font-display tracking-tight text-foreground">
              {project.title}
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="lede mt-6 text-muted-foreground">
              {project.short_description || project.description}
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-6 flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-950/20 px-4 py-2.5 backdrop-blur-md">
              <span className="font-mono text-xs text-muted-foreground">Malik's Role:</span>
              <span className="font-mono text-xs font-semibold text-emerald-400">{role}</span>
            </div>
          </Reveal>
        </header>

        {/* Project Hero Banner */}
        <Reveal delay={0.3}>
          <div className="relative mt-12 overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl">
            <img
              src={project.featured_image || project.thumbnail_url}
              alt={`${project.title} — case study cover`}
              fetchPriority="high"
              decoding="async"
              className="aspect-[16/9] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-40" />
          </div>
        </Reveal>

        {/* Main Content Grid */}
        <div className="mt-16 grid gap-12 lg:grid-cols-[1.8fr_1fr] lg:gap-16">
          <div className="space-y-12">
            {/* Overview / Statement */}
            <section>
              <h2 className="eyebrow text-emerald-400">Overview</h2>
              <p className="mt-4 text-base leading-relaxed text-foreground/90 md:text-lg">
                {project.description}
              </p>
            </section>

            {/* Challenge */}
            {challenge ? (
              <section className="hairline pt-8">
                <h2 className="eyebrow text-emerald-400">The Challenge</h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                  {challenge}
                </p>
              </section>
            ) : null}

            {/* Approach */}
            {approach ? (
              <section className="hairline pt-8">
                <h2 className="eyebrow text-emerald-400">The Architectural Approach</h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                  {approach}
                </p>
              </section>
            ) : null}

            {/* Solution */}
            {solution ? (
              <section className="hairline pt-8">
                <h2 className="eyebrow text-emerald-400">The Implementation &amp; Solution</h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                  {solution}
                </p>
              </section>
            ) : null}

            {/* Tech Stack */}
            {techStack && techStack.length > 0 ? (
              <section className="hairline pt-8">
                <h2 className="eyebrow text-emerald-400">Technologies &amp; Disciplines</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {techStack.map((tech: string) => (
                    <span
                      key={tech}
                      className="rounded-md border border-border/80 bg-background/80 px-3 py-1.5 font-mono text-xs uppercase text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          {/* Sidebar */}
          <aside className="h-fit space-y-6 lg:sticky lg:top-28">
            <div className="rounded-2xl border border-border bg-surface p-7 shadow-xl backdrop-blur-md">
              <div className="flex items-center gap-2 text-emerald-400">
                <Sparkles className="h-4 w-4" />
                <h2 className="eyebrow text-emerald-400">Verified Outcomes</h2>
              </div>
              {project.outcomes && project.outcomes.length > 0 ? (
                <ul className="mt-5 space-y-3.5">
                  {project.outcomes.map((outcome: string) => (
                    <li key={outcome} className="flex items-start gap-3">
                      <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                        <Check className="h-3 w-3" />
                      </div>
                      <span className="text-xs leading-relaxed text-foreground/90 font-medium">
                        {outcome}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-xs text-muted-foreground">
                  Engineered for sub-second performance, conversion optimization, and reliable
                  scale.
                </p>
              )}

              <div className="hairline mt-8 pt-6 space-y-3">
                <Link
                  to="/contact"
                  search={{ source: `case_study_${project.slug}` }}
                  className="flex h-11 w-full items-center justify-center rounded-xl bg-primary px-6 font-mono text-xs font-semibold text-primary-foreground shadow-lg transition-opacity hover:opacity-90"
                >
                  Start a Similar Project →
                </Link>

                <a
                  href={whatsappUrl(`Hi Malik, I read your case study on "${project.title}"...`)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950/20 px-6 font-mono text-xs font-semibold text-emerald-400 transition-colors hover:bg-emerald-950/40"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat on WhatsApp
                </a>

                {fiverrUrl ? (
                  <a
                    href={fiverrUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 w-full items-center justify-center gap-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    View Fiverr Gig Listing <ExternalLink className="h-3 w-3" />
                  </a>
                ) : null}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
