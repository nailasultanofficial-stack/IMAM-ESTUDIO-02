import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";

import { submitLead } from "@/lib/public.functions";
import { SITE, whatsappUrl } from "@/lib/site";

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
  "Shopify theme engineering",
  "Headless commerce",
  "Shopify app",
  "AI automation",
  "AI assistant / RAG",
  "SaaS product",
  "Web platform",
  "API / integrations",
  "Performance programme",
  "Internal tooling",
  "Something else",
];

const BUDGETS = ["Under $2k", "$2k – $5k", "$5k – $15k", "$15k – $50k", "$50k+", "Not sure yet"];

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): { source?: string } => {
    const source = search["source"];
    return typeof source === "string" && source.length > 0 && source.length <= 160
      ? { source }
      : {};
  },
  head: () => ({
    meta: [
      { title: "Start a Project — IMAM ESTUDIO" },
      {
        name: "description",
        content:
          "Tell me about the constraint you are up against. A direct line to the engineer who will build it.",
      },
      { property: "og:title", content: "Start a Project — IMAM ESTUDIO" },
      {
        property: "og:description",
        content: "A technical opinion, not a sales call. Direct line to Mudasar Imam.",
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
      toast.success("Enquiry received. I'll reply personally within one business day.");
    },
    onError: () => {
      toast.error("That didn't send. Try again, or message me on WhatsApp.");
    },
  });

  const inputClass =
    "mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none";

  return (
    <div className="shell pb-24 pt-32 md:pt-40">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
        <header className="max-w-lg">
          <p className="eyebrow text-primary">Contact</p>
          <h1 className="display-1 mt-5 text-foreground">Tell me the constraint.</h1>
          <p className="lede mt-6">
            Not the feature list — the thing that is actually blocking the business. You will get a
            technical opinion back, not a sales sequence.
          </p>

          <dl className="hairline mt-10 space-y-5 pt-8">
            <div>
              <dt className="eyebrow">Reply time</dt>
              <dd className="mt-1 text-sm text-foreground/85">Within one business day</dd>
            </div>
            <div>
              <dt className="eyebrow">Who replies</dt>
              <dd className="mt-1 text-sm text-foreground/85">{SITE.founder}, directly</dd>
            </div>
            <div>
              <dt className="eyebrow">Prefer to talk now</dt>
              <dd className="mt-1">
                <a
                  href={whatsappUrl("Hi Mudasar — I'd like to discuss a project.")}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-primary underline-offset-4 hover:underline"
                >
                  Message on WhatsApp
                </a>
              </dd>
            </div>
          </dl>
        </header>

        {mutation.isSuccess ? (
          <div className="flex h-max flex-col items-start rounded-xl border border-border bg-surface p-10">
            <CheckCircle2 className="h-8 w-8 text-primary" />
            <h2 className="display-3 mt-5 text-foreground">Enquiry received.</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              I read every enquiry myself and reply within one business day — usually with a
              question or two before anything else.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => mutation.reset()}
                className="inline-flex h-11 items-center rounded-full border border-border-strong px-6 text-sm text-foreground transition-colors hover:bg-accent"
              >
                Send another
              </button>
              <button
                type="button"
                onClick={() => navigate({ to: "/work" })}
                className="inline-flex h-11 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Browse the work
              </button>
            </div>
          </div>
        ) : (
          <form
            noValidate
            onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
            className="rounded-xl border border-border bg-surface p-7 md:p-10"
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
                  Project type
                </label>
                <select id="project_type" className={inputClass} {...form.register("project_type")}>
                  <option value="">Select one</option>
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
                  Budget range
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
                What is actually blocking you?
              </label>
              <textarea
                id="details"
                rows={6}
                className={inputClass}
                placeholder="The system, the symptom, the deadline — whatever context you have."
                {...form.register("details")}
              />
              <FieldError message={form.formState.errors.details?.message} />
            </div>

            <button
              type="submit"
              disabled={mutation.isPending}
              className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {mutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {mutation.isPending ? "Sending" : "Send enquiry"}
            </button>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              No newsletter, no CRM sequence. Your details are used to reply to you.
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
