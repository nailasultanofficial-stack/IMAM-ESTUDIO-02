import { Link } from "@tanstack/react-router";

import { NAV_LINKS, SITE, whatsappUrl } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="hairline mt-24 bg-background">
      <div className="shell py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-xl text-foreground">IMAM</span>
              <span className="eyebrow text-primary">ESTUDIO</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              A founder-led engineering studio. Custom Shopify commerce, AI automation and
              full-stack SaaS — built by the engineer who scoped them.
            </p>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {SITE.founder} · {SITE.handle}
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="eyebrow">Studio</h2>
            <ul className="mt-4 space-y-3">
              {NAV_LINKS.map((link) => (
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
            <h2 className="eyebrow">Direct line</h2>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={whatsappUrl(
                    "Hi Mudasar — I found IMAM ESTUDIO and I'd like to discuss a project.",
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="hairline mt-14 flex flex-col gap-3 pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {SITE.name}. All rights reserved.
          </p>
          <p className="font-mono uppercase tracking-[0.16em]">Engineered, not templated</p>
        </div>
      </div>
    </footer>
  );
}
