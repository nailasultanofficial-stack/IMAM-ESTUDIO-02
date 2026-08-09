import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

import type { Database } from "@/integrations/supabase/types";
import type {
  AuditLogEntry,
  Customer,
  Lead,
  MediaAsset,
  Order,
  PageSection,
  Project,
  SeoSetting,
  Service,
  SitePage,
  StaffMember,
} from "@/lib/content-types";

function adminClient(authToken?: string) {
  const url = process.env["SUPABASE_URL"];
  const anonKey = process.env["SUPABASE_ANON_KEY"] || process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !anonKey) throw new Error("Supabase credentials not configured");

  const headers: Record<string, string> = {};
  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  return createClient<Database>(url, anonKey, {
    global: { headers },
    auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
  });
}

// ---------------- DASHBOARD ----------------
export const getAdminDashboardMetrics = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ token: z.string().optional() }).parse(data))
  .handler(async ({ data }) => {
    const supabase = adminClient(data.token);

    const [leadsRes, ordersRes, servicesRes, projectsRes] = await Promise.all([
      supabase.from("leads").select("*").order("created_at", { ascending: false }),
      supabase.from("orders").select("*").order("created_at", { ascending: false }),
      supabase.from("services").select("id", { count: "exact" }),
      supabase.from("projects").select("id", { count: "exact" }),
    ]);

    const leads = (leadsRes.data ?? []) as unknown as Lead[];
    const orders = (ordersRes.data ?? []) as unknown as Order[];

    const leadCounts = {
      total: leads.length,
      new: leads.filter((l) => l.status === "New").length,
      contacted: leads.filter((l) => l.status === "Contacted").length,
      inScoping: leads.filter((l) => l.status === "In Scoping").length,
      proposal: leads.filter((l) => l.status === "Proposal").length,
      closed: leads.filter((l) => l.status === "Closed").length,
      archived: leads.filter((l) => l.status === "Archived").length,
    };

    const ctaAttribution: Record<string, number> = {};
    leads.forEach((l) => {
      const src = l.source_cta || "direct";
      ctaAttribution[src] = (ctaAttribution[src] || 0) + 1;
    });

    const revenueTotal = orders
      .filter((o) => o.payment_status === "Paid")
      .reduce((sum, o) => sum + Number(o.amount || 0), 0);

    const pendingOrdersTotal = orders
      .filter((o) => o.payment_status === "Pending")
      .reduce((sum, o) => sum + Number(o.amount || 0), 0);

    return {
      leadCounts,
      ctaAttribution,
      recentLeads: leads.slice(0, 5),
      recentOrders: orders.slice(0, 5),
      servicesCount: servicesRes.count ?? 0,
      projectsCount: projectsRes.count ?? 0,
      revenueTotal,
      pendingOrdersTotal,
    };
  });

// ---------------- SERVICES ----------------
export const getAdminServices = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ token: z.string().optional() }).parse(data))
  .handler(async ({ data }): Promise<Service[]> => {
    const supabase = adminClient(data.token);
    const { data: rows, error } = await supabase
      .from("services")
      .select("*")
      .order("display_order", { ascending: true });
    if (error) throw new Error(error.message);
    return (rows ?? []) as unknown as Service[];
  });

export const serviceMutationSchema = z.object({
  token: z.string().optional(),
  id: z.string().optional(),
  gig_id: z.string().nullable().optional(),
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  category: z.string().default("Engineering"),
  short_description: z.string().default(""),
  full_description: z.string().default(""),
  starting_price: z.number().nullable().optional(),
  hourly_rate: z.number().nullable().optional(),
  features: z.array(z.string()).default([]),
  tech_stack: z.array(z.string()).default([]),
  image_url: z.string().nullable().optional(),
  cta_label: z.string().default("Discuss project"),
  is_featured: z.boolean().default(true),
  is_published: z.boolean().default(true),
  display_order: z.number().default(0),
});

export const upsertAdminService = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => serviceMutationSchema.parse(data))
  .handler(async ({ data }): Promise<Service> => {
    const supabase = adminClient(data.token);
    const payload = {
      title: data.title,
      slug: data.slug,
      gig_id: data.gig_id ?? null,
      category: data.category,
      short_description: data.short_description,
      full_description: data.full_description,
      starting_price: data.starting_price ?? null,
      hourly_rate: data.hourly_rate ?? 18.0,
      features: data.features,
      tech_stack: data.tech_stack,
      image_url: data.image_url ?? null,
      cta_label: data.cta_label,
      is_featured: data.is_featured,
      is_published: data.is_published,
      display_order: data.display_order,
    };

    let row;
    if (data.id) {
      const { data: updated, error } = await supabase
        .from("services")
        .update(payload)
        .eq("id", data.id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      row = updated;
    } else {
      const { data: created, error } = await supabase
        .from("services")
        .insert(payload)
        .select()
        .single();
      if (error) throw new Error(error.message);
      row = created;
    }
    return row as unknown as Service;
  });

export const deleteAdminService = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z.object({ token: z.string().optional(), id: z.string() }).parse(data),
  )
  .handler(async ({ data }) => {
    const supabase = adminClient(data.token);
    const { error } = await supabase.from("services").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ---------------- PROJECTS ----------------
export const getAdminProjects = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ token: z.string().optional() }).parse(data))
  .handler(async ({ data }): Promise<Project[]> => {
    const supabase = adminClient(data.token);
    const { data: rows, error } = await supabase
      .from("projects")
      .select("*")
      .order("display_order", { ascending: true });
    if (error) throw new Error(error.message);
    return (rows ?? []) as unknown as Project[];
  });

export const projectMutationSchema = z.object({
  token: z.string().optional(),
  id: z.string().optional(),
  gig_id: z.string().nullable().optional(),
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  category: z.string().default("Engineering"),
  client_name: z.string().nullable().optional(),
  description: z.string().default(""),
  outcomes: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  thumbnail_url: z.string().min(1, "Thumbnail URL is required"),
  gallery_urls: z.array(z.string()).default([]),
  is_featured: z.boolean().default(true),
  is_published: z.boolean().default(true),
  display_order: z.number().default(0),
});

export const upsertAdminProject = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => projectMutationSchema.parse(data))
  .handler(async ({ data }): Promise<Project> => {
    const supabase = adminClient(data.token);
    const payload = {
      title: data.title,
      slug: data.slug,
      gig_id: data.gig_id ?? null,
      category: data.category,
      client_name: data.client_name ?? null,
      description: data.description,
      outcomes: data.outcomes,
      tags: data.tags,
      thumbnail_url: data.thumbnail_url,
      gallery_urls: data.gallery_urls,
      is_featured: data.is_featured,
      is_published: data.is_published,
      display_order: data.display_order,
    };

    let row;
    if (data.id) {
      const { data: updated, error } = await supabase
        .from("projects")
        .update(payload)
        .eq("id", data.id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      row = updated;
    } else {
      const { data: created, error } = await supabase
        .from("projects")
        .insert(payload)
        .select()
        .single();
      if (error) throw new Error(error.message);
      row = created;
    }
    return row as unknown as Project;
  });

export const deleteAdminProject = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z.object({ token: z.string().optional(), id: z.string() }).parse(data),
  )
  .handler(async ({ data }) => {
    const supabase = adminClient(data.token);
    const { error } = await supabase.from("projects").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ---------------- THEME EDITOR / PAGE SECTIONS ----------------
export const getAdminThemeSections = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ token: z.string().optional() }).parse(data))
  .handler(async ({ data }): Promise<PageSection[]> => {
    const supabase = adminClient(data.token);
    const { data: page } = await supabase
      .from("pages")
      .select("id")
      .eq("slug", "home")
      .maybeSingle();
    if (!page) return [];

    const { data: sections, error } = await supabase
      .from("page_sections")
      .select("*")
      .eq("page_id", page.id)
      .order("display_order", { ascending: true });
    if (error) throw new Error(error.message);
    return (sections ?? []) as unknown as PageSection[];
  });

export const updateAdminSection = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z
      .object({
        token: z.string().optional(),
        id: z.string(),
        title: z.string().nullable().optional(),
        subtitle: z.string().nullable().optional(),
        content: z.record(z.any()),
        display_order: z.number().optional(),
        is_visible: z.boolean().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const supabase = adminClient(data.token);
    const updateData: Record<string, any> = {
      content: data.content,
      updated_at: new Date().toISOString(),
    };
    if (data.title !== undefined) updateData["title"] = data.title;
    if (data.subtitle !== undefined) updateData["subtitle"] = data.subtitle;
    if (data.display_order !== undefined) updateData["display_order"] = data.display_order;
    if (data.is_visible !== undefined) updateData["is_visible"] = data.is_visible;

    const { data: row, error } = await supabase
      .from("page_sections")
      .update(updateData as any)
      .eq("id", data.id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row as unknown as PageSection;
  });

export const reorderAdminSections = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z
      .object({
        token: z.string().optional(),
        orderedIds: z.array(z.string()),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const supabase = adminClient(data.token);
    const promises = data.orderedIds.map((id, index) =>
      supabase.from("page_sections").update({ display_order: index }).eq("id", id),
    );
    await Promise.all(promises);
    return { ok: true };
  });

// ---------------- PAGES ----------------
export const getAdminPages = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ token: z.string().optional() }).parse(data))
  .handler(async ({ data }): Promise<SitePage[]> => {
    const supabase = adminClient(data.token);
    const { data: rows, error } = await supabase
      .from("pages")
      .select("*")
      .order("created_at", { ascending: true });
    if (error) throw new Error(error.message);
    return (rows ?? []) as unknown as SitePage[];
  });

export const upsertAdminPage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z
      .object({
        token: z.string().optional(),
        id: z.string().optional(),
        title: z.string().min(1, "Title required"),
        slug: z.string().min(1, "Slug required"),
        template: z.string().default("default"),
        is_published: z.boolean().default(true),
        seo_title: z.string().nullable().optional(),
        seo_description: z.string().nullable().optional(),
        og_image: z.string().nullable().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }): Promise<SitePage> => {
    const supabase = adminClient(data.token);
    const payload = {
      title: data.title,
      slug: data.slug,
      template: data.template,
      is_published: data.is_published,
      seo_title: data.seo_title ?? null,
      seo_description: data.seo_description ?? null,
      og_image: data.og_image ?? null,
    };

    let row;
    if (data.id) {
      const { data: updated, error } = await supabase
        .from("pages")
        .update(payload)
        .eq("id", data.id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      row = updated;
    } else {
      const { data: created, error } = await supabase
        .from("pages")
        .insert(payload)
        .select()
        .single();
      if (error) throw new Error(error.message);
      row = created;
    }
    return row as unknown as SitePage;
  });

// ---------------- LEADS CRM ----------------
export const getAdminLeads = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ token: z.string().optional() }).parse(data))
  .handler(async ({ data }): Promise<Lead[]> => {
    const supabase = adminClient(data.token);
    const { data: rows, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (rows ?? []) as unknown as Lead[];
  });

export const updateAdminLeadStatus = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z
      .object({
        token: z.string().optional(),
        id: z.string(),
        status: z.enum(["New", "Contacted", "In Scoping", "Proposal", "Closed", "Archived"]),
        notes: z.string().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const supabase = adminClient(data.token);
    const payload: Record<string, any> = { status: data.status };
    if (data.notes !== undefined) payload["notes"] = data.notes;

    const { data: updated, error } = await supabase
      .from("leads")
      .update(payload as any)
      .eq("id", data.id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return updated as unknown as Lead;
  });

// ---------------- ORDERS / QUOTES ----------------
export const getAdminOrders = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ token: z.string().optional() }).parse(data))
  .handler(async ({ data }): Promise<Order[]> => {
    const supabase = adminClient(data.token);
    const { data: rows, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (rows ?? []) as unknown as Order[];
  });

export const upsertAdminOrder = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z
      .object({
        token: z.string().optional(),
        id: z.string().optional(),
        title: z.string().min(1, "Title required"),
        amount: z.number().min(0),
        currency: z.string().default("USD"),
        payment_status: z.enum(["Pending", "Paid", "Refunded", "Failed"]).default("Pending"),
        fulfillment_status: z
          .enum(["Unfulfilled", "In Progress", "Delivered", "Cancelled"])
          .default("Unfulfilled"),
        notes: z.string().nullable().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const supabase = adminClient(data.token);
    const payload = {
      title: data.title,
      amount: data.amount,
      currency: data.currency,
      payment_status: data.payment_status,
      fulfillment_status: data.fulfillment_status,
      notes: data.notes ?? null,
    };

    let row;
    if (data.id) {
      const { data: updated, error } = await supabase
        .from("orders")
        .update(payload)
        .eq("id", data.id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      row = updated;
    } else {
      const { data: created, error } = await supabase
        .from("orders")
        .insert(payload)
        .select()
        .single();
      if (error) throw new Error(error.message);
      row = created;
    }
    return row as unknown as Order;
  });

// ---------------- MEDIA LIBRARY ----------------
export const getAdminMediaAssets = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ token: z.string().optional() }).parse(data))
  .handler(async ({ data }): Promise<MediaAsset[]> => {
    const supabase = adminClient(data.token);
    const { data: rows, error } = await supabase
      .from("media_assets")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (rows ?? []) as unknown as MediaAsset[];
  });

export const upsertAdminMediaAsset = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z
      .object({
        token: z.string().optional(),
        id: z.string().optional(),
        filename: z.string().min(1),
        url: z.string().min(1),
        alt_text: z.string().nullable().optional(),
        mime_type: z.string().nullable().optional(),
        size_bytes: z.number().nullable().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const supabase = adminClient(data.token);
    const payload = {
      filename: data.filename,
      url: data.url,
      alt_text: data.alt_text ?? null,
      mime_type: data.mime_type ?? null,
      size_bytes: data.size_bytes ?? null,
    };

    let row;
    if (data.id) {
      const { data: updated, error } = await supabase
        .from("media_assets")
        .update(payload)
        .eq("id", data.id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      row = updated;
    } else {
      const { data: created, error } = await supabase
        .from("media_assets")
        .insert(payload)
        .select()
        .single();
      if (error) throw new Error(error.message);
      row = created;
    }
    return row as unknown as MediaAsset;
  });

// ---------------- SEO SETTINGS ----------------
export const getAdminSeoSettings = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ token: z.string().optional() }).parse(data))
  .handler(async ({ data }): Promise<SeoSetting[]> => {
    const supabase = adminClient(data.token);
    const { data: rows, error } = await supabase
      .from("seo_settings")
      .select("*")
      .order("route", { ascending: true });
    if (error) throw new Error(error.message);
    return (rows ?? []) as unknown as SeoSetting[];
  });

export const upsertAdminSeoSetting = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z
      .object({
        token: z.string().optional(),
        id: z.string().optional(),
        route: z.string().min(1),
        title: z.string().nullable().optional(),
        description: z.string().nullable().optional(),
        og_image: z.string().nullable().optional(),
        keywords: z.array(z.string()).default([]),
        noindex: z.boolean().default(false),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const supabase = adminClient(data.token);
    const payload = {
      route: data.route,
      title: data.title ?? null,
      description: data.description ?? null,
      og_image: data.og_image ?? null,
      keywords: data.keywords,
      noindex: data.noindex,
    };

    let row;
    if (data.id) {
      const { data: updated, error } = await supabase
        .from("seo_settings")
        .update(payload)
        .eq("id", data.id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      row = updated;
    } else {
      const { data: created, error } = await supabase
        .from("seo_settings")
        .insert(payload)
        .select()
        .single();
      if (error) throw new Error(error.message);
      row = created;
    }
    return row as unknown as SeoSetting;
  });

// ---------------- STAFF & RBAC ----------------
export const getAdminStaffMembers = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ token: z.string().optional() }).parse(data))
  .handler(async ({ data }): Promise<StaffMember[]> => {
    const supabase = adminClient(data.token);
    const [profilesRes, rolesRes] = await Promise.all([
      supabase.from("profiles").select("*"),
      supabase.from("user_roles").select("*"),
    ]);

    const profiles = profilesRes.data ?? [];
    const roles = rolesRes.data ?? [];

    const roleMap: Record<string, any[]> = {};
    roles.forEach((r) => {
      const list = roleMap[r.user_id] ?? [];
      list.push(r.role);
      roleMap[r.user_id] = list;
    });

    return profiles.map((p) => ({
      id: p.id,
      email: p.email,
      full_name: p.full_name,
      avatar_url: p.avatar_url,
      roles: roleMap[p.id] ?? [],
      created_at: p.created_at,
    })) as unknown as StaffMember[];
  });

// ---------------- AUDIT LOGS ----------------
export const getAdminAuditLogs = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ token: z.string().optional() }).parse(data))
  .handler(async ({ data }): Promise<AuditLogEntry[]> => {
    const supabase = adminClient(data.token);
    const { data: rows, error } = await supabase
      .from("audit_logs")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (rows ?? []) as unknown as AuditLogEntry[];
  });
