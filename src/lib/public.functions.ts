import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

import type { Database } from "@/integrations/supabase/types";
import type { PageSection, Project, SeoSetting, Service, SitePage } from "@/lib/content-types";

/**
 * Public read layer.
 *
 * These functions are intentionally unauthenticated: they run during SSR and
 * prerender where no bearer token exists. They use the publishable key, so RLS
 * still applies and only rows the `anon` SELECT policies expose can be read
 * (published services/projects/pages, public SEO settings).
 */
function cleanEnv(val: string | undefined): string {
  if (!val) return "";
  return val
    .replace(/^\uFEFF/, "")
    .replace(/[\r\n\t]/g, "")
    .trim();
}

function publicClient() {
  const url = cleanEnv(process.env["SUPABASE_URL"] || process.env["VITE_SUPABASE_URL"]);
  const key = cleanEnv(
    process.env["SUPABASE_PUBLISHABLE_KEY"] || process.env["VITE_SUPABASE_PUBLISHABLE_KEY"],
  );
  if (!url || !key) throw new Error("Supabase public credentials are not configured");
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
  });
}

export const getServices = createServerFn({ method: "GET" }).handler(
  async (): Promise<Service[]> => {
    const { data, error } = await publicClient()
      .from("services")
      .select("*")
      .eq("is_published", true)
      .order("display_order", { ascending: true });
    if (error) throw new Error(error.message);
    return (data ?? []) as unknown as Service[];
  },
);

export const getServiceBySlug = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ slug: z.string().min(1) }).parse(data))
  .handler(async ({ data }): Promise<Service | null> => {
    const { data: row, error } = await publicClient()
      .from("services")
      .select("*")
      .eq("slug", data.slug)
      .eq("is_published", true)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return (row ?? null) as unknown as Service | null;
  });

export const getProjects = createServerFn({ method: "GET" }).handler(
  async (): Promise<Project[]> => {
    const { data, error } = await publicClient()
      .from("projects")
      .select("*")
      .eq("is_published", true)
      .order("display_order", { ascending: true });
    if (error) throw new Error(error.message);
    return (data ?? []) as unknown as Project[];
  },
);

export const getProjectBySlug = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ slug: z.string().min(1) }).parse(data))
  .handler(async ({ data }): Promise<Project | null> => {
    const { data: row, error } = await publicClient()
      .from("projects")
      .select("*")
      .eq("slug", data.slug)
      .eq("is_published", true)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return (row ?? null) as unknown as Project | null;
  });

export type HomepagePayload = {
  page: SitePage | null;
  sections: PageSection[];
  services: Service[];
  projects: Project[];
};

/** One round trip for the whole homepage so SSR stays fast. */
export const getHomepage = createServerFn({ method: "GET" }).handler(
  async (): Promise<HomepagePayload> => {
    const supabase = publicClient();
    const { data: page, error: pageError } = await supabase
      .from("pages")
      .select("*")
      .eq("slug", "home")
      .eq("is_published", true)
      .maybeSingle();
    if (pageError) throw new Error(pageError.message);

    const [sectionsResult, servicesResult, projectsResult] = await Promise.all([
      page
        ? supabase
            .from("page_sections")
            .select("*")
            .eq("page_id", (page as { id: string }).id)
            .eq("is_visible", true)
            .order("display_order", { ascending: true })
        : Promise.resolve({ data: [], error: null }),
      supabase
        .from("services")
        .select("*")
        .eq("is_published", true)
        .order("display_order", { ascending: true }),
      supabase
        .from("projects")
        .select("*")
        .eq("is_published", true)
        .order("display_order", { ascending: true }),
    ]);

    if (sectionsResult.error) throw new Error(sectionsResult.error.message);
    if (servicesResult.error) throw new Error(servicesResult.error.message);
    if (projectsResult.error) throw new Error(projectsResult.error.message);

    return {
      page: (page ?? null) as unknown as SitePage | null,
      sections: (sectionsResult.data ?? []) as unknown as PageSection[],
      services: (servicesResult.data ?? []) as unknown as Service[],
      projects: (projectsResult.data ?? []) as unknown as Project[],
    };
  },
);

export const getSeoForRoute = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ route: z.string().min(1) }).parse(data))
  .handler(async ({ data }): Promise<SeoSetting | null> => {
    const { data: row, error } = await publicClient()
      .from("seo_settings")
      .select("*")
      .eq("route", data.route)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return (row ?? null) as unknown as SeoSetting | null;
  });

/** Custom pages built in the admin CMS. */
export const getCustomPage = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ slug: z.string().min(1) }).parse(data))
  .handler(async ({ data }): Promise<{ page: SitePage; sections: PageSection[] } | null> => {
    const supabase = publicClient();
    const { data: page, error } = await supabase
      .from("pages")
      .select("*")
      .eq("slug", data.slug)
      .eq("is_published", true)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!page) return null;

    const { data: sections, error: sectionError } = await supabase
      .from("page_sections")
      .select("*")
      .eq("page_id", (page as { id: string }).id)
      .eq("is_visible", true)
      .order("display_order", { ascending: true });
    if (sectionError) throw new Error(sectionError.message);

    return {
      page: page as unknown as SitePage,
      sections: (sections ?? []) as unknown as PageSection[],
    };
  });

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Tell me your name").max(120),
  email: z.string().trim().email("That email doesn't look right").max(255),
  project_type: z.string().trim().min(1, "Pick a project type").max(120),
  budget: z.string().trim().max(80).optional(),
  details: z
    .string()
    .trim()
    .min(20, "A little more detail helps me give a useful answer")
    .max(4000),
  source_cta: z.string().trim().max(160).default("direct"),
});

export type LeadInput = z.infer<typeof leadSchema>;

/**
 * Anonymous lead capture. The `anon` role holds INSERT-only rights on `leads`,
 * so nothing is readable back from the public surface.
 */
export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }): Promise<{ ok: true }> => {
    const { error } = await publicClient()
      .from("leads")
      .insert({
        name: data.name,
        email: data.email,
        project_type: data.project_type,
        budget: data.budget ?? null,
        details: data.details,
        source_cta: data.source_cta || "direct",
      } as never);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const getGlobalSettings = createServerFn({ method: "GET" }).handler(
  async (): Promise<Record<string, any>> => {
    const { data: rows, error } = await (publicClient().from as any)("global_settings").select("*");
    if (error) throw new Error(error.message);
    const settings: Record<string, any> = {};
    rows?.forEach((r: any) => {
      settings[r.key] = r.value;
    });
    return settings;
  },
);

