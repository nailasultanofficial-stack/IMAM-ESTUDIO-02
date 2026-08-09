/**
 * Shared content shapes. Client-safe: no server imports here, so both route
 * components and server functions can depend on it.
 */

export type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

export type JsonObject = { [key: string]: Json };

export type Service = {
  id: string;
  gig_id: string | null;
  title: string;
  slug: string;
  category: string;
  short_description: string;
  full_description: string;
  starting_price: number | null;
  hourly_rate: number | null;
  features: string[];
  tech_stack: string[];
  image_url: string | null;
  cta_label: string;
  is_featured: boolean;
  is_published: boolean;
  display_order: number;
};

export type Project = {
  id: string;
  gig_id: string | null;
  title: string;
  slug: string;
  category: string;
  client_name: string | null;
  description: string;
  outcomes: string[];
  tags: string[];
  thumbnail_url: string;
  gallery_urls: string[];
  is_featured: boolean;
  is_published: boolean;
  display_order: number;
};

export type PageSection = {
  id: string;
  page_id: string;
  section_type: string;
  title: string | null;
  subtitle: string | null;
  content: JsonObject;
  draft_content: JsonObject | null;
  display_order: number;
  is_visible: boolean;
  is_locked: boolean;
};

export type SitePage = {
  id: string;
  title: string;
  slug: string;
  template: string;
  is_system: boolean;
  is_published: boolean;
  seo_title: string | null;
  seo_description: string | null;
  og_image: string | null;
};

export type LeadStatus = "New" | "Contacted" | "In Scoping" | "Proposal" | "Closed" | "Archived";

export const LEAD_STATUSES: LeadStatus[] = [
  "New",
  "Contacted",
  "In Scoping",
  "Proposal",
  "Closed",
  "Archived",
];

export type Lead = {
  id: string;
  name: string;
  email: string;
  project_type: string;
  budget: string | null;
  details: string;
  source_cta: string;
  status: LeadStatus;
  assigned_to: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type Customer = {
  id: string;
  full_name: string;
  email: string;
  company: string | null;
  country: string | null;
  tags: string[];
  notes: string | null;
  total_spent: number;
  created_at: string;
};

export type Order = {
  id: string;
  reference: string;
  customer_id: string | null;
  service_id: string | null;
  lead_id: string | null;
  title: string;
  amount: number;
  currency: string;
  payment_status: "Pending" | "Paid" | "Refunded" | "Failed";
  fulfillment_status: "Unfulfilled" | "In Progress" | "Delivered" | "Cancelled";
  notes: string | null;
  created_at: string;
};

export type MediaAsset = {
  id: string;
  filename: string;
  url: string;
  alt_text: string | null;
  mime_type: string | null;
  size_bytes: number | null;
  used_in: string[];
  is_protected: boolean;
  created_at: string;
};

export type SeoSetting = {
  id: string;
  route: string;
  title: string | null;
  description: string | null;
  og_image: string | null;
  keywords: string[];
  json_ld: JsonObject | null;
  noindex: boolean;
};

export type AppRole = "owner" | "admin" | "editor" | "operations" | "viewer";

export const APP_ROLES: AppRole[] = ["owner", "admin", "editor", "operations", "viewer"];

export const ROLE_DESCRIPTIONS: Record<AppRole, string> = {
  owner: "Unrestricted. Only the owner can grant or revoke staff roles.",
  admin: "Full operational and content access. Cannot change staff roles.",
  editor: "Content, media and SEO. No access to leads, customers or orders.",
  operations: "Leads, customers and orders. No content or security access.",
  viewer: "Read-only access to content. Cannot change anything.",
};

export type StaffMember = {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  roles: AppRole[];
  created_at: string;
};

export type AuditLogEntry = {
  id: string;
  actor_id: string | null;
  actor_email: string | null;
  action: string;
  resource: string;
  resource_id: string | null;
  details: JsonObject;
  created_at: string;
};

/** Section types the theme editor can render on the homepage. */
export const SECTION_TYPES = [
  { type: "hero", label: "Hero" },
  { type: "trust_strip", label: "Trust strip" },
  { type: "founder", label: "Founder" },
  { type: "featured_work", label: "Featured work" },
  { type: "capabilities", label: "Capabilities" },
  { type: "approach", label: "Engineering approach" },
  { type: "collaboration", label: "Collaboration spotlight" },
  { type: "final_cta", label: "Final CTA" },
] as const;

export function sectionLabel(type: string): string {
  return SECTION_TYPES.find((s) => s.type === type)?.label ?? type;
}
