import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Star, ShieldCheck } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";

import { submitLead } from "@/lib/public.functions";
import { SITE, whatsappUrl } from "@/lib/site";
import { Reveal, TextReveal, TiltCard } from "@/components/ui/motion-primitives";

const formSchema = z.object({
  name: z.string().trim().min(2, "Tell me your name").max(120),
  email: z.string().trim().email("That email doesn't look right").max(255),
  project_type: z.string().trim().min(1, "Pick a project type"),
  budget: z.string().trim().max(80).optional(),
  details: z
    .string()
    .trim()
    .min(20, "A little more detail helps me give a useful answer")
    .max(4000),
});

type FormValues = z.infer<typeof formSchema>;

const PROJECT_TYPES = [
  "Custom Native Liquid Sections ($25+)",
  "Shopify Redesign & UI/UX ($65+)",
  "n8n AI Automations & Workflows ($35+)",
  "Next.js & React SaaS Web Apps ($125+)",
  "Headless Commerce & Hydrogen ($250+)",
  "Framer Interactive Website ($85+)",
  "Mobile-First UI/UX Audit",
  "Something else",
];

const BUDGETS = ["Under $100", "$100 – $500", "$500 – $1,500", "$1,500 – $5,000", "$5,000+", "Not sure yet"];

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): { source?: string } => {
    const source = search["source"];
    return typeof source === "string" && source.length > 0 && source.length <= 160
      ? { source }
      : {};
  },
  head: () => ({
    meta: [
      { title: "Start an Engagement — Malik Jahanzaib (@jahanzeb1809)" },
      {
        name: "description",
        content:
          "Start a project directly with Malik Jahanzaib (@jahanzeb1809), Senior Full-Stack Engineer & UI/UX Architect.",
      },
      { property: "og:title", content: "Start an Engagement — Malik Jahanzaib" },
      {
        property: "og:description",
        content: "High-conversion Shopify stores, Next.js applications, and n8n AI automations.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { source } = Route.useSearch();
  const navigate = useNavigate();
  const send = useServerFn(submitLead);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", project_type: "", budget: "", details: "" },
  });

  const mutation = useMutation({
    mutationFn: (values: FormValues) =>
      send({
        data: {
          ...values,
          budget: values.budget || undefined,
          source_cta: source ?? "direct",
        },
      }),
    onSuccess: () => {
      form.reset();
      toast.success("Enquiry received. I will reply personally within 24 hours.");
    },
    onError: () => {
      toast.error("That didn't send. Try again, or message me on WhatsApp.");
    },
  });

  const inputClass =
    "mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

  return (
    <div className="shell pb-24 pt-32 md:pt-40">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
        <header className="max-w-lg">
          <Reveal direction="down">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Direct Principal Line</span>
            </div>
          </Reveal>

          <TextReveal
            text="Start an Engagement"
            as="h1"
            className="display-1 mt-4 text-foreground font-display"
          />

          <Reveal delay={0.1}>
            <p className="lede mt-5 text-muted-foreground">
              Describe your project or business bottleneck. You will get a technical opinion and transparent milestone quote directly from Malik Jahanzaib.
            </p>
          </Reveal>

          <dl className="hairline mt-10 space-y-5 pt-8">
            <div>
              <dt className="eyebrow">Response Time</dt>
              <dd className="mt-1 text-sm font-medium text-foreground">Within 24 hours</dd>
            </div>
            <div>
              <dt className="eyebrow">Engineer Accountable</dt>
              <dd className="mt-1 text-sm font-medium text-foreground">{SITE.founder} ({SITE.handle})</dd>
            </div>
            <div>
              <dt className="eyebrow">Instant Messenger</dt>
              <dd className="mt-1">
                <a
                  href={whatsappUrl("Hi Malik — I'd like to discuss a project with you.")}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-emerald-400 underline-offset-4 hover:underline"
                >
                  Message on WhatsApp
                </a>
              </dd>
            </div>
          </dl>
        </header>

        {mutation.isSuccess ? (
          <div className="flex h-max flex-col items-start rounded-2xl border border-emerald-500/40 bg-surface/90 p-10 backdrop-blur-xl">
            <CheckCircle2 className="h-10 w-10 text-emerald-400" />
            <h2 className="display-3 mt-5 text-foreground font-display">Enquiry Received</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Thank you! I review every inquiry personally and will reply with a technical breakdown within 24 hours.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => mutation.reset()}
                className="inline-flex h-11 items-center rounded-full border border-border-strong px-6 text-sm text-foreground transition-colors hover:bg-surface"
              >
                Send another message
              </button>
              <button
                type="button"
                onClick={() => navigate({ to: "/work" })}
                className="inline-flex h-11 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Browse work case studies
              </button>
            </div>
          </div>
        ) : (
          <form
            noValidate
            onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
            className="rounded-2xl border border-border bg-surface/70 p-7 backdrop-blur-xl md:p-10"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="eyebrow">
                  Name
                </label>
                <input
                  id="name"
                  autoComplete="name"
                  className={inputClass}
                  placeholder="Your name"
                  {...form.register("name")}
                />
                <FieldError message={form.formState.errors.name?.message} />
              </div>
              <div>
                <label htmlFor="email" className="eyebrow">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className={inputClass}
                  placeholder="you@company.com"
                  {...form.register("email")}
                />
                <FieldError message={form.formState.errors.email?.message} />
              </div>
              <div>
                <label htmlFor="project_type" className="eyebrow">
                  Project Category
                </label>
                <select id="project_type" className={inputClass} {...form.register("project_type")}>
                  <option value="">Select project type</option>
                  {PROJECT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <FieldError message={form.formState.errors.project_type?.message} />
              </div>
              <div>
                <label htmlFor="budget" className="eyebrow">
                  Budget Range
                </label>
                <select id="budget" className={inputClass} {...form.register("budget")}>
                  <option value="">Optional</option>
                  {BUDGETS.map((budget) => (
                    <option key={budget} value={budget}>
                      {budget}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="details" className="eyebrow">
                Project Requirements / Details
              </label>
              <textarea
                id="details"
                rows={6}
                className={inputClass}
                placeholder="Share your goals, technical constraints, timeline, or current store URL..."
                {...form.register("details")}
              />
              <FieldError message={form.formState.errors.details?.message} />
            </div>

            <button
              type="submit"
              disabled={mutation.isPending}
              className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-opacity hover:opacity-95 disabled:opacity-60"
            >
              {mutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {mutation.isPending ? "Sending Inquiry..." : "Submit Project Inquiry"}
            </button>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              Direct submission to Malik Jahanzaib. Zero spam, zero sales funnel sequences.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

function FieldError({ message }: { message?: string | undefined }) {
  if (!message) return null;
  return <p className="mt-2 text-xs text-destructive">{message}</p>;
}
