/**
 * Static brand constants for Malik Jahanzaib personal portfolio.
 * Operational content lives in Supabase database and is managed via /admin.
 */

export const SITE = {
  name: "MALIK JAHANZAIB",
  founder: "Malik Jahanzaib",
  role: "Senior Full-Stack Engineer & UI/UX Architect",
  handle: "@jahanzeb1809",
  whatsapp: "923191106310",
  email: "malikjahanzaib@gmail.com",
  rating: "5.0",
  fiverrReviews: 1,
  location: "Pakistan",
  languages: ["English", "Urdu"],
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
