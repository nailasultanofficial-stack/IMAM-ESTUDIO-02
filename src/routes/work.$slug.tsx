import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft, Check, MessageCircle } from "lucide-react";

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
    const title = `${loaderData.title} | Engineering Case Study — Malik Jahanzaib (@jahanzeb1809)`;
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
        className="mt-8 inline-block font-mono text-sm text-primary underline-offset-4 hover:underline"
      >
        ← Back to all case studies
      </Link>
    </div>
  ),
  component: ProjectDetail,
});

function ProjectDetail() {
  const { slug } = Route.useParams();
  const { data: project } = useSuspenseQuery(projectQuery(slug));
  if (!project) return null;

  const role = project.role || "Lead Full-Stack Engineer · UI/UX Architect";
  const collaborationType = project.collaboration_type || "Collaborative Project";
  const contribution = project.contribution;
  const challenge = project.challenge;
  const approach = project.approach;
  const solution = project.solution;
  const techStack = project.tech_stack || project.tags || [];

  return (
    <article className="pb-24 pt-32 md:pt-40">
      <div className="shell">
        {/* Back link */}
        <Reveal direction="down">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Case Studies
          </Link>
        </Reveal>

        {/* Project header */}
        <header className="mt-8 max-w-4xl">
          <Reveal>
            {/* Meta strip — inline, no bordered container */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="font-mono text-xs text-primary font-semibold uppercase tracking-wider">
                {project.category}
              </span>
              <span className="h-px w-4 bg-border" />
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                {collaborationType}
              </span>
              {project.year ? (
                <>
                  <span className="h-px w-4 bg-border" />
                  <span className="font-mono text-xs text-muted-foreground">{project.year}</span>
                </>
              ) : null}
              <span className="h-px w-4 bg-border" />
              <span className="font-mono text-xs text-muted-foreground">{role}</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="display-1 mt-5 font-display tracking-tight text-foreground">
              {project.title}
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="lede mt-5 text-muted-foreground max-w-3xl">
              {project.short_description || project.description}
            </p>
          </Reveal>
        </header>

        {/* Hero image — full width, visually dominant */}
        <Reveal delay={0.25}>
          <div className="relative mt-10 overflow-hidden rounded-xl border border-border/50 bg-surface/40 shadow-xl flex justify-center p-4">
            <img
              src={project.featured_image || project.thumbnail_url}
              alt={`Screenshot of ${project.title} — engineering case study`}
              fetchPriority="high"
              decoding="async"
              className="w-full h-auto max-h-[65vh] object-contain rounded-lg"
            />
          </div>
        </Reveal>

        {/* Main content grid */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[1.8fr_1fr] lg:gap-16">
          {/* Left: editorial reading content */}
          <div className="space-y-10">
            {/* Overview */}
            <section>
              <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary font-semibold">
                Overview
              </h2>
              <p className="mt-3 text-base leading-relaxed text-foreground/85 md:text-lg">
                {project.description}
              </p>
            </section>

            {/* Contribution */}
            {contribution ? (
              <section className="pt-8 border-t border-border/40">
                <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary font-semibold">
                  Engineering Contribution
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-foreground/80">{contribution}</p>
              </section>
            ) : null}

            {/* Challenge */}
            {challenge ? (
              <section className="pt-8 border-t border-border/40">
                <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary font-semibold">
                  The Challenge
                </h2>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">
                  {challenge}
                </p>
              </section>
            ) : null}

            {/* Approach */}
            {approach ? (
              <section className="pt-8 border-t border-border/40">
                <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary font-semibold">
                  Architectural Approach
                </h2>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">
                  {approach}
                </p>
              </section>
            ) : null}

            {/* Solution */}
            {solution ? (
              <section className="pt-8 border-t border-border/40">
                <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary font-semibold">
                  Implementation & Solution
                </h2>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">
                  {solution}
                </p>
              </section>
            ) : null}

            {/* Tech stack */}
            {techStack && techStack.length > 0 ? (
              <section className="pt-8 border-t border-border/40">
                <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary font-semibold">
                  Technologies
                </h2>
                <p className="mt-3 font-mono text-xs text-muted-foreground leading-relaxed">
                  {techStack.join(" · ")}
                </p>
              </section>
            ) : null}
          </div>

          {/* Right: sticky sidebar */}
          <aside className="h-fit space-y-4 lg:sticky lg:top-28">
            {/* Key deliverables */}
            <div className="rounded-xl border border-border/60 bg-surface/60 p-5 backdrop-blur-md">
              <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary font-semibold mb-4">
                Key Deliverables
              </h2>
              {(project.highlights || project.outcomes) &&
              (project.highlights || project.outcomes)!.length > 0 ? (
                <ul className="space-y-2.5">
                  {(project.highlights || project.outcomes)!.map((highlight: string) => (
                    <li key={highlight} className="flex items-start gap-2.5">
                      <div className="mt-1 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                        <Check className="h-2.5 w-2.5" />
                      </div>
                      <span className="text-xs leading-relaxed text-foreground/85">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Engineered for performance, mobile usability, and clean maintainability.
                </p>
              )}
            </div>

            {/* CTAs */}
            <div className="space-y-2.5">
              <Link
                to="/contact"
                search={{ source: `case_study_${project.slug}` }}
                className="flex h-11 w-full items-center justify-center rounded-full bg-primary px-6 font-mono text-xs font-semibold text-primary-foreground shadow-lg transition-opacity hover:opacity-90 active:scale-[0.97]"
              >
                Start a Similar Project →
              </Link>

              <a
                href={whatsappUrl(`Hi Malik, I read your case study on "${project.title}"...`)}
                target="_blank"
                rel="noreferrer"
                className="flex h-11 w-full items-center justify-center gap-2 rounded-full border border-border/60 bg-surface/50 px-6 font-mono text-xs font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary active:scale-[0.97]"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                Chat on WhatsApp
              </a>
            </div>
          </aside>
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-16 pt-10 border-t border-border/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Similar engineering challenge?
            </span>
            <h3 className="font-display text-xl font-medium text-foreground mt-1">
              Let's engineer your platform for speed & scale.
            </h3>
          </div>
          <Link
            to="/contact"
            search={{ source: `case_study_bottom_${project.slug}` }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-primary-foreground shadow-lg transition-all hover:opacity-90 active:scale-[0.97] shrink-0"
          >
            Start a Project →
          </Link>
        </div>
      </div>
    </article>
  );
}
