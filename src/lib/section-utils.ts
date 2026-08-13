import type { Json, JsonObject } from "@/lib/content-types";

/** Safe readers for the JSONB payloads that back editable page sections. */

export function str(content: JsonObject | null | undefined, key: string, fallback = ""): string {
  const value = content?.[key];
  return typeof value === "string" ? value : fallback;
}

export function num(content: JsonObject | null | undefined, key: string, fallback: number): number {
  const value = content?.[key];
  return typeof value === "number" ? value : fallback;
}

export function strList(content: JsonObject | null | undefined, key: string): string[] {
  const value = content?.[key];
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
}

export function objList(content: JsonObject | null | undefined, key: string): JsonObject[] {
  const value = content?.[key];
  if (!Array.isArray(value)) return [];
  return value.filter(
    (v): v is JsonObject => typeof v === "object" && v !== null && !Array.isArray(v),
  );
}

export function isJsonObject(value: Json | undefined): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Split a body string on blank lines into paragraphs. */
export function paragraphs(body: string): string[] {
  return body
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export function formatPrice(amount: number | null | undefined): string {
  if (amount == null) return "On request";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Decode HTML entities and collapse excess whitespace in scraped content.
 * Used to clean description fields that were extracted from raw HTML
 * and contain `&amp;`, `&lt;`, non-breaking spaces, and padded whitespace sequences.
 */
export function cleanHtml(raw: string | null | undefined): string {
  if (!raw) return "";
  return raw
    // Decode common HTML entities
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&nbsp;/gi, " ")
    .replace(/\u00a0/g, " ")
    // Collapse run-on whitespace from HTML-to-text extraction
    .replace(/[ \t]{3,}/g, " ")
    .trim();
}
