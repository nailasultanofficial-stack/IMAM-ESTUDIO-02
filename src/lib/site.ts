/**
 * Static brand constants. Everything here is presentation-only and safe on the
 * client. Operational content (services, projects, sections) lives in the
 * database and is managed from /admin — never hardcode it here.
 */

export const SITE = {
  name: "IMAM ESTUDIO",
  founder: "Mudasar Imam",
  role: "Senior Full Stack Engineer & AI Automation Architect",
  handle: "@mi_devv",
  whatsapp: "923191106310",
  email: "hello@imamestudio.com",
} as const;

export const NAV_LINKS = [
  { label: "Work", to: "/work" },
  { label: "Capabilities", to: "/services" },
  { label: "About", to: "/about" },
  { label: "Process", to: "/process" },
] as const;

export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${SITE.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Build a /contact link that carries CTA attribution. */
export function contactHref(source: string): string {
  return `/contact?source=${encodeURIComponent(source)}`;
}
