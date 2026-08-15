import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { contactHref } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { useSuspenseQuery } from "@tanstack/react-query";
import { globalSettingsQuery } from "@/lib/public-queries";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  
  const { data: globalSettings } = useSuspenseQuery(globalSettingsQuery);
  const siteConfig = globalSettings?.['site_config'] || {};
  const navLinks = globalSettings?.['nav_links'] || [];

  // Scroll state — backdrop/border on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape key closes mobile menu
  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[color,transform,opacity,shadow] duration-250",
        scrolled
          ? "border-b border-border bg-background/88 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="shell flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
        {/* Logo */}
        <Link to="/" className="group flex items-baseline gap-2" aria-label={`${siteConfig.name} home`}>
          <span className="font-display text-lg font-bold tracking-tight text-foreground md:text-xl uppercase">
            {siteConfig.name?.split(' ')[0] || "IMAM"}
          </span>
          <span className="eyebrow text-primary transition-[color,transform,opacity,shadow] group-hover:text-foreground uppercase">
            {siteConfig.name?.split(' ').slice(1).join(' ') || "ESTUDIO"}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {navLinks.map((link: { label: string, to: string }) => {
            const isActive = pathname === link.to || pathname.startsWith(link.to + "/");
            return (
              <Link
                key={link.to}
                to={link.to}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative text-sm transition-[color,transform,opacity,shadow] hover:text-foreground",
                  isActive ? "text-foreground font-medium" : "text-muted-foreground",
                )}
              >
                {link.label}
                {isActive ? (
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-primary rounded-full" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA & Theme Switcher */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeSwitcher />
          <Link
            to="/contact"
            search={{ source: "nav_start_project" }}
            className="inline-flex h-9 items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 active:scale-[0.97]"
          >
            Start a project
          </Link>
        </div>

        {/* Mobile menu toggle — 44px minimum touch target */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border text-foreground md:hidden active:scale-[0.97]"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile navigation */}
      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-border bg-background md:hidden"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <nav className="shell flex flex-col py-3">
            {navLinks.map((link: { label: string, to: string }) => {
              const isActive = pathname === link.to || pathname.startsWith(link.to + "/");
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex min-h-[48px] items-center border-b border-border/60 text-base transition-[color,transform,opacity,shadow]",
                    isActive ? "text-foreground font-medium" : "text-muted-foreground",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <a
              href={contactHref("mobile_nav")}
              className="mt-3 inline-flex h-12 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground active:scale-[0.97]"
            >
              Start a project
            </a>
          </nav>
          <div className="px-6 pb-6 pt-2">
            <ThemeSwitcher />
          </div>
        </div>
      ) : null}
    </header>
  );
}
