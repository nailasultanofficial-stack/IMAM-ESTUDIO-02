"use client";

import { useState, useEffect, useCallback, useId } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/lib/content-types";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * FeaturedWorkInteractive — Editorial Master / Detail
 *
 * Desktop: 65% left (dominant image + metadata) / 35% right (editorial project index)
 * Mobile: compact vertical selector + single featured project
 *
 * Design principles:
 * - Navigator is PURE TYPOGRAPHY — no cards, no panels, no borders, no rounded containers
 * - Inactive items are quiet. Active item has a left accent bar + full opacity.
 * - Image is the hero of the section — large, clean, no decorative overlays
 * - Keyboard: only responds when navigator region is focused (no global listener)
 * - No autoplay. No animation on keyboard navigation.
 * - AnimatePresence mode="sync" for immediate feel
 * - aria-selected + role="tab" / "tabpanel" semantics
 */

const EASING = [0.16, 1, 0.3, 1] as const;

// Remap Fiverr category labels to real engineering service names
function displayCategory(cat: string): string {
  const map: Record<string, string> = {
    "Shopify / Commerce": "Shopify / Commerce",
    "Commerce UX": "Commerce UX",
    "Themes/Plugins Installation": "Shopify Engineering",
    "Website Builders Design": "Commerce Design",
    "Automations & Agents": "AI Automation",
    "Full Stack Web Applications": "Full-Stack Development",
  };
  return map[cat] ?? cat;
}

export function FeaturedWorkInteractive({ projects }: { projects: Project[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPointerSelection, setIsPointerSelection] = useState(false);
  const tabId = useId();
  const panelId = useId();

  const activeProject = projects[activeIndex];

  // Preload all project images
  useEffect(() => {
    projects.forEach((p) => {
      const src = p.featured_image || p.thumbnail_url;
      if (src) {
        const img = new Image();
        img.src = src;
      }
    });
  }, [projects]);

  // Keyboard navigation — only fires when navigator is focused
  const handleNavKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setIsPointerSelection(false);
        setActiveIndex((i) => Math.min(i + 1, projects.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setIsPointerSelection(false);
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Home") {
        e.preventDefault();
        setIsPointerSelection(false);
        setActiveIndex(0);
      } else if (e.key === "End") {
        e.preventDefault();
        setIsPointerSelection(false);
        setActiveIndex(projects.length - 1);
      }
    },
    [projects.length],
  );

  if (!activeProject) return null;

  const techStack = (activeProject.tech_stack || activeProject.tags || []).slice(0, 4);

  return (
    <div className="fw-grid">
      {/* ─── Left: Featured Project Panel ─────────────────────────────── */}
      <div
        className="fw-main"
        role="tabpanel"
        id={panelId}
        aria-labelledby={`${tabId}-${activeIndex}`}
      >
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={activeProject.id}
            initial={isPointerSelection ? { opacity: 0, y: 6 } : false}
            animate={{ opacity: 1, y: 0 }}
            exit={isPointerSelection ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.18, ease: EASING }}
          >
            {/* Project image — full width, natural aspect ratio */}
            <Link
              to="/work/$slug"
              params={{ slug: activeProject.slug }}
              aria-label={`View case study: ${activeProject.title}`}
              className="fw-image-link group"
            >
              <img
                src={activeProject.featured_image || activeProject.thumbnail_url}
                alt={`Screenshot of ${activeProject.title} — ${displayCategory(activeProject.category)} engineering project`}
                className="fw-image group-hover:scale-[1.015]"
                loading="eager"
                decoding="async"
              />
            </Link>

            {/* Metadata below image — compact, editorial */}
            <div className="fw-meta">
              <div className="fw-meta-top">
                <div className="fw-meta-category">
                  <span className="fw-index">{String(activeIndex + 1).padStart(2, "0")}</span>
                  <span className="fw-sep" />
                  <span className="fw-cat">{displayCategory(activeProject.category)}</span>
                </div>
                <Link
                  to="/work/$slug"
                  params={{ slug: activeProject.slug }}
                  className="fw-view-link group"
                  aria-label={`Read the ${activeProject.title} case study`}
                >
                  <span>View Case Study</span>
                  <ArrowRight className="fw-view-arrow" aria-hidden="true" />
                </Link>
              </div>

              <h3 className="fw-title">{activeProject.title}</h3>

              <p className="fw-desc">
                {activeProject.short_description || activeProject.description}
              </p>

              {techStack.length > 0 && <p className="fw-tech">{techStack.join(" · ")}</p>}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ─── Right: Editorial Project Index ───────────────────────────── */}
      <div
        className="fw-nav"
        role="tablist"
        aria-label="Engineering projects"
        aria-orientation="vertical"
        onKeyDown={handleNavKeyDown}
      >
        {/* Mobile: compact vertical selector */}
        <div className="fw-mobile-list">
          {projects.map((project, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={project.id}
                id={`${tabId}-${idx}`}
                role="tab"
                type="button"
                tabIndex={isActive ? 0 : -1}
                aria-selected={isActive}
                aria-controls={panelId}
                onClick={() => {
                  setIsPointerSelection(true);
                  setActiveIndex(idx);
                }}
                className={cn(
                  "fw-mobile-item",
                  isActive ? "fw-mobile-item-active" : "fw-mobile-item-inactive",
                )}
              >
                <span className="fw-mi-num">{String(idx + 1).padStart(2, "0")}</span>
                <span className="fw-mi-title">{project.title}</span>
              </button>
            );
          })}
        </div>

        {/* Desktop: editorial project index — pure typography */}
        <ol className="fw-desktop-list" aria-label="Project index">
          {projects.map((project, idx) => {
            const isActive = activeIndex === idx;
            return (
              <li key={project.id} className="fw-project-item">
                <button
                  id={`${tabId}-${idx}`}
                  role="tab"
                  type="button"
                  tabIndex={isActive ? 0 : -1}
                  aria-selected={isActive}
                  aria-controls={panelId}
                  onClick={() => {
                    setIsPointerSelection(true);
                    setActiveIndex(idx);
                  }}
                  className="fw-project-btn"
                >
                  {/* Active accent bar */}
                  <div
                    className={cn(
                      "fw-accent",
                      isActive ? "fw-accent-active" : "fw-accent-inactive",
                    )}
                    aria-hidden="true"
                  />

                  <div className="fw-project-content">
                    <div
                      className={cn(
                        "fw-project-num",
                        isActive ? "fw-num-active" : "fw-num-inactive",
                      )}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                    <div className="fw-project-text">
                      <span
                        className={cn(
                          "fw-project-name",
                          isActive ? "fw-name-active" : "fw-name-inactive",
                        )}
                      >
                        {project.title}
                      </span>
                      <span
                        className={cn(
                          "fw-project-cat",
                          isActive ? "fw-pcat-active" : "fw-pcat-inactive",
                        )}
                      >
                        {displayCategory(project.category)}
                      </span>
                    </div>
                  </div>
                </button>

                {/* Separator — only between items, not after last */}
                {idx < projects.length - 1 && <div className="fw-item-sep" aria-hidden="true" />}
              </li>
            );
          })}
        </ol>
      </div>

      {/* Scoped styles — all layout and design in one place */}
      <style>{`
        /* ─── Grid layout ─────────────────────────────────────────────── */
        .fw-grid {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        /* ─── Featured image ──────────────────────────────────────────── */
        .fw-image-link {
          display: block;
          width: 100%;
          overflow: hidden;
          border-radius: 0.75rem;
          background: oklch(0.15 0 0);
          border: 1px solid oklch(1 0 0 / 10%);
        }

        .fw-image {
          width: 100%;
          height: auto;
          max-height: 55vh;
          object-fit: contain;
          padding: 0.75rem;
          display: block;
          transition: transform 280ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* ─── Metadata below image ────────────────────────────────────── */
        .fw-meta { margin-top: 1.25rem; }

        .fw-meta-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .fw-meta-category {
          display: flex;
          align-items: center;
          gap: 0.625rem;
        }

        .fw-index {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 600;
          color: var(--color-primary);
          letter-spacing: 0.05em;
        }

        .fw-sep {
          display: block;
          width: 1rem;
          height: 1px;
          background: oklch(1 0 0 / 14%);
        }

        .fw-cat {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-muted-foreground);
        }

        .fw-view-link {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-primary);
          transition: color 150ms;
          flex-shrink: 0;
          white-space: nowrap;
        }
        .fw-view-link:hover { color: var(--color-foreground); }
        .fw-view-link:active { transform: scale(0.97); }

        .fw-view-arrow {
          width: 0.875rem;
          height: 0.875rem;
          transition: transform 150ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .fw-view-link:hover .fw-view-arrow {
          transform: translateX(2px);
        }

        .fw-title {
          margin-top: 0.75rem;
          font-family: var(--font-display);
          font-size: clamp(1.375rem, 0.95rem + 1.8vw, 2.25rem);
          font-weight: 400;
          line-height: 1.1;
          letter-spacing: -0.025em;
          color: var(--color-foreground);
        }

        .fw-desc {
          margin-top: 0.625rem;
          font-size: 0.875rem;
          line-height: 1.65;
          color: var(--color-muted-foreground);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          max-width: 42rem;
        }

        .fw-tech {
          margin-top: 0.625rem;
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: oklch(0.72 0 0 / 70%);
          letter-spacing: 0.04em;
        }

        /* ─── Navigator (right panel) ─────────────────────────────────── */
        .fw-nav {
          width: 100%;
        }

        /* ─── Mobile list (< 1024px) ──────────────────────────────────── */
        .fw-mobile-list {
          display: flex;
          flex-direction: column;
          gap: 0;
          border: 1px solid oklch(1 0 0 / 10%);
          border-radius: 0.75rem;
          overflow: hidden;
        }

        .fw-mobile-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          text-align: left;
          cursor: pointer;
          border: none;
          background: transparent;
          border-bottom: 1px solid oklch(1 0 0 / 8%);
          min-height: 48px;
          transition: background 150ms;
        }

        .fw-mobile-item:last-child { border-bottom: none; }

        .fw-mobile-item-active {
          background: oklch(0.82 0.18 150 / 8%);
        }

        .fw-mobile-item-inactive:hover {
          background: oklch(1 0 0 / 4%);
        }

        .fw-mi-num {
          font-family: var(--font-mono);
          font-size: 0.625rem;
          font-weight: 600;
          color: var(--color-primary);
          flex-shrink: 0;
          width: 1.25rem;
        }

        .fw-mobile-item-inactive .fw-mi-num {
          color: oklch(0.72 0 0 / 50%);
        }

        .fw-mi-title {
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--color-foreground);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .fw-mobile-item-inactive .fw-mi-title {
          color: var(--color-muted-foreground);
        }

        /* Hide mobile list on desktop */
        @media (min-width: 1024px) {
          .fw-mobile-list { display: none; }
        }

        /* ─── Desktop list (>= 1024px) ────────────────────────────────── */
        .fw-desktop-list {
          display: none;
          flex-direction: column;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        @media (min-width: 1024px) {
          .fw-desktop-list { display: flex; }
        }

        .fw-project-item {
          display: flex;
          flex-direction: column;
        }

        .fw-project-btn {
          position: relative;
          display: flex;
          align-items: flex-start;
          gap: 0;
          padding: 0.875rem 0 0.875rem 1rem;
          text-align: left;
          cursor: pointer;
          border: none;
          background: transparent;
          min-height: 44px;
          width: 100%;
          transition: none;
        }

        .fw-project-btn:focus-visible {
          outline: 2px solid var(--color-ring);
          outline-offset: -2px;
          border-radius: 2px;
        }

        /* Left accent bar */
        .fw-accent {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 2px;
          border-radius: 999px;
          background: var(--color-primary);
          transition: height 180ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .fw-accent-active { height: 2rem; }
        .fw-accent-inactive { height: 0; }

        .fw-project-content {
          display: flex;
          align-items: flex-start;
          gap: 0.875rem;
          flex: 1;
        }

        .fw-project-num {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 600;
          flex-shrink: 0;
          margin-top: 0.125rem;
          transition: color 150ms;
          min-width: 1.5rem;
        }

        .fw-num-active { color: var(--color-primary); }
        .fw-num-inactive { color: oklch(0.72 0 0 / 35%); }

        .fw-project-btn:hover .fw-num-inactive {
          color: oklch(0.72 0 0 / 65%);
        }

        .fw-project-text {
          display: flex;
          flex-direction: column;
          gap: 0.1875rem;
          flex: 1;
          min-width: 0;
        }

        .fw-project-name {
          display: block;
          font-size: 0.8125rem;
          font-weight: 500;
          line-height: 1.3;
          transition: color 150ms;
        }

        .fw-name-active { color: var(--color-foreground); }
        .fw-name-inactive { color: oklch(0.72 0 0 / 55%); }

        .fw-project-btn:hover .fw-name-inactive {
          color: oklch(0.72 0 0 / 85%);
        }

        .fw-project-cat {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.625rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          transition: color 150ms;
        }

        .fw-pcat-active { color: oklch(0.72 0 0 / 55%); }
        .fw-pcat-inactive { color: oklch(0.72 0 0 / 30%); }

        /* Thin separator between items */
        .fw-item-sep {
          height: 1px;
          background: oklch(1 0 0 / 7%);
          margin-left: 1rem;
        }

        /* ─── Responsive grid layout ──────────────────────────────────── */
        @media (min-width: 1024px) {
          .fw-grid {
            display: grid;
            grid-template-columns: 68fr 32fr;
            gap: 3.5rem;
            align-items: start;
          }

          .fw-image {
            max-height: none;
            padding: 1rem;
          }
        }

        @media (min-width: 1280px) {
          .fw-grid {
            grid-template-columns: 1fr 280px;
            gap: 3.5rem;
          }
        }

        @media (min-width: 1536px) {
          .fw-grid {
            grid-template-columns: 1fr 300px;
            gap: 4rem;
          }
        }
      `}</style>
    </div>
  );
}
