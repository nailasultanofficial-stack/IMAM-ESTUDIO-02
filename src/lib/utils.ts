import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function whatsappUrl(whatsappNumber: string, message?: string): string {
  const base = `https://wa.me/${whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function contactHref(source: string): string {
  return `/contact?source=${encodeURIComponent(source)}`;
}

export const DEFAULT_SITE_CONFIG = {
  name: "MALIK JAHANZAIB",
  founder: "Malik Jahanzaib",
  role: "Senior Full-Stack Engineer & UI/UX Architect",
  handle: "@jahanzeb1809",
  whatsapp: "923091925177",
  email: "malikshahzaib1809@gmail.com",
  rating: "5.0",
  fiverrReviews: 1,
  location: "Pakistan",
  languages: ["English", "Urdu"],
};

export const DEFAULT_NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Work", to: "/work" },
  { label: "Capabilities", to: "/services" },
  { label: "About", to: "/about" },
  { label: "Process", to: "/process" },
];
