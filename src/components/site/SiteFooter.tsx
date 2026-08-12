import { Link } from "@tanstack/react-router";

import { DEFAULT_NAV_LINKS, DEFAULT_SITE_CONFIG, whatsappUrl } from "@/lib/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { globalSettingsQuery } from "@/lib/public-queries";

export function SiteFooter() {
  const { data: globalSettings } = useSuspenseQuery(globalSettingsQuery);
  const siteConfig = globalSettings?.['site_config'] || DEFAULT_SITE_CONFIG;
  const navLinks = globalSettings?.['nav_links'] || DEFAULT_NAV_LINKS;
  const whatsappNumber = siteConfig.whatsapp || "923091925177";

  const year = new Date().getFullYear();

  return (
    <footer className="hairline bg-background">
      <div className="shell py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
          <Link to="/" className="inline-flex items-baseline gap-2 hover:opacity-80 transition-opacity">
              <span className="font-display text-xl font-bold text-foreground uppercase">{siteConfig.name?.split(' ')[0] || "MALIK"}</span>
              <span className="eyebrow text-primary uppercase">{siteConfig.name?.split(' ').slice(1).join(' ') || "JAHANZAIB"}</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Senior Full-Stack Engineer & UI/UX Architect. Engineering high-conversion Shopify
              stores, Next.js platforms, SaaS applications, and custom n8n AI automations.
            </p>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {siteConfig.founder} · {siteConfig.handle} · {siteConfig.location}
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="eyebrow">Portfolio</h2>
            <ul className="mt-4 space-y-3">
              {navLinks.map((link: { label: string, to: string }) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/contact"
                  search={{ source: "footer_contact" }}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow">Direct Line</h2>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={whatsappUrl(
                    whatsappNumber,
                    "Hi Malik — I found your portfolio and I'd like to discuss a project.",
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  WhatsApp ({siteConfig.handle})
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="hairline mt-14 flex flex-col gap-3 pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {siteConfig.name} ({siteConfig.handle}). All rights reserved.
          </p>
          <p className="font-mono uppercase tracking-[0.16em]">
            Engineering High Conversion Platforms
          </p>
        </div>
      </div>
    </footer>
  );
}
