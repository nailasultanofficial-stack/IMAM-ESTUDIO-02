"use client";

import { useState, useEffect, useCallback, useId, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/lib/content-types";
import { ArrowRight, ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { cleanHtml } from "@/lib/section-utils";

const EASING = [0.16, 1, 0.3, 1] as const;

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
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [isPointerSelection, setIsPointerSelection] = useState(false);
  const tabId = useId();
  const panelId = useId();
  
  // Refs for scrolling the active item into view
  const navRailRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeProject = projects[activeProjectIndex];

  const handleProjectSelect = useCallback((idx: number) => {
    if (idx !== activeProjectIndex) {
      setIsPointerSelection(true);
      setActiveProjectIndex(idx);
    }
  }, [activeProjectIndex]);

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

  // Scroll active item into view when activeProjectIndex changes
  useEffect(() => {
    const activeBtn = itemRefs.current[activeProjectIndex];
    if (activeBtn && navRailRef.current) {
      activeBtn.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [activeProjectIndex]);

  const handleNavKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setIsPointerSelection(false);
        handleProjectSelect(Math.min(activeProjectIndex + 1, projects.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setIsPointerSelection(false);
        handleProjectSelect(Math.max(activeProjectIndex - 1, 0));
      } else if (e.key === "Home") {
        e.preventDefault();
        setIsPointerSelection(false);
        handleProjectSelect(0);
      } else if (e.key === "End") {
        e.preventDefault();
        setIsPointerSelection(false);
        handleProjectSelect(projects.length - 1);
      }
    },
    [projects.length, activeProjectIndex, handleProjectSelect],
  );

  if (!activeProject) return null;

  const techStack = (activeProject.tech_stack || activeProject.tags || []).slice(0, 4);

  return (
    <div className="fw-wrapper">
      
      {/* ─── Left: Featured Project (Media + Info) ──────────────────── */}
      <div
        className="fw-main"
        role="tabpanel"
        id={panelId}
        aria-labelledby={`${tabId}-${activeProjectIndex}`}
      >
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={activeProject.id}
            className="fw-main-content group"
            initial={isPointerSelection ? { opacity: 0, y: 6 } : false}
            animate={{ opacity: 1, y: 0 }}
            exit={isPointerSelection ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.18, ease: EASING }}
          >
            {/* Project media — intrinsic aspect ratio, no crop */}
            <div className="fw-image-col">
              <Link
                to="/work/$slug"
                params={{ slug: activeProject.slug }}
                aria-label={`View case study: ${activeProject.title}`}
                className="fw-image-wrapper block"
              >
                <img
                  src={activeProject.featured_image || activeProject.thumbnail_url}
                  alt={`Screenshot of ${activeProject.title}`}
                  className="fw-image group-hover:scale-[1.01]"
                  loading="eager"
                  decoding="async"
                />
              </Link>
            </div>

            {/* Project info */}
            <div className="fw-info-col">
              <div className="fw-meta-category mb-4">
                <span className="fw-index">{String(activeProjectIndex + 1).padStart(2, "0")}</span>
                <span className="fw-sep" />
                <span className="fw-cat">{displayCategory(activeProject.category)}</span>
              </div>
              
              <h3 className="fw-title">{activeProject.title}</h3>
              
              <p className="fw-desc">
                {cleanHtml(activeProject.short_description || activeProject.description)}
              </p>
              
              {techStack.length > 0 && <p className="fw-tech">{techStack.map((t) => cleanHtml(t)).join(" · ")}</p>}

              <Link
                to="/work/$slug"
                params={{ slug: activeProject.slug }}
                className="fw-view-link mt-8"
                aria-label={`Read the ${activeProject.title} case study`}
              >
                <span>View Case Study</span>
                <ArrowRight className="fw-view-arrow" aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ─── Right: Project Navigator (Mini Cards) ────────────────── */}
      <div
        className="fw-nav"
        role="tablist"
        aria-label="Engineering projects"
        aria-orientation="vertical"
        onKeyDown={handleNavKeyDown}
      >
        <button 
          className="fw-nav-arrow fw-nav-arrow-up" 
          onClick={() => handleProjectSelect(Math.max(activeProjectIndex - 1, 0))}
          disabled={activeProjectIndex === 0}
          aria-label="Previous project"
        >
          <ChevronUp size={16} />
        </button>

        <div className="fw-nav-rail" ref={navRailRef}>
          {projects.map((project, idx) => {
            const isActive = activeProjectIndex === idx;
            return (
              <button
                key={project.id}
                ref={(el) => { itemRefs.current[idx] = el; }}
                id={`${tabId}-${idx}`}
                role="tab"
                type="button"
                tabIndex={isActive ? 0 : -1}
                aria-selected={isActive}
                aria-controls={panelId}
                onClick={() => handleProjectSelect(idx)}
                className={cn(
                  "fw-nav-item",
                  isActive ? "fw-nav-item-active" : "fw-nav-item-inactive",
                )}
              >
                <div className="fw-nav-thumb-wrapper">
                  <img 
                    src={project.thumbnail_url || project.featured_image} 
                    alt={`Thumbnail for ${project.title}`} 
                    className="fw-nav-thumb-img" 
                    loading="lazy" 
                  />
                </div>
                <div className="fw-nav-item-info">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="fw-nav-num">{String(idx + 1).padStart(2, "0")}</span>
                    <span className="fw-nav-cat">{displayCategory(project.category)}</span>
                  </div>
                  <span className="fw-nav-title">{project.title}</span>
                </div>
              </button>
            );
          })}
        </div>

        <button 
          className="fw-nav-arrow fw-nav-arrow-down" 
          onClick={() => handleProjectSelect(Math.min(activeProjectIndex + 1, projects.length - 1))}
          disabled={activeProjectIndex === projects.length - 1}
          aria-label="Next project"
        >
          <ChevronDown size={16} />
        </button>
      </div>

      {/* Scoped styles */}
      <style>{`
        /* ─── Grid layout ─────────────────────────────────────────────── */
        .fw-wrapper {
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }

        /* ─── Main Project Panel ──────────────────────────────────────── */
        .fw-main {
          width: 100%;
        }

        .fw-main-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .fw-image-col {
          width: 100%;
        }

        .fw-image-wrapper {
          width: 100%;
          border-radius: 0.75rem;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          overflow: hidden;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .fw-image {
          max-width: 100%;
          width: auto;
          height: auto;
          max-height: 70vh;
          object-fit: contain;
          display: block;
          transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .fw-info-col {
          display: flex;
          flex-direction: column;
          justify-content: center;
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
          background: var(--color-border);
        }

        .fw-cat {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-muted-foreground);
        }

        .fw-title {
          font-family: var(--font-display);
          font-size: clamp(1.375rem, 0.95rem + 1.8vw, 2.25rem);
          font-weight: 400;
          line-height: 1.15;
          letter-spacing: -0.025em;
          color: var(--color-foreground);
          margin-bottom: 0.75rem;
        }

        .fw-desc {
          font-size: 0.875rem;
          line-height: 1.65;
          color: var(--color-muted-foreground);
          max-width: 42rem;
        }

        .fw-tech {
          margin-top: 1rem;
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: var(--color-muted-foreground);
          opacity: 0.8;
          letter-spacing: 0.04em;
        }

        .fw-view-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-primary);
          transition: color 150ms;
          width: fit-content;
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

        /* ─── Project Navigator (Mini Cards) ──────────────────────────── */
        .fw-nav {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          width: 100%;
        }

        .fw-nav-rail {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          max-height: 600px;
          overflow-y: auto;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none;  /* IE and Edge */
        }
        .fw-nav-rail::-webkit-scrollbar {
          display: none;
        }

        .fw-nav-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 0.5rem;
          border-radius: 0.5rem;
          background: transparent;
          border: 1px solid transparent;
          color: var(--color-muted-foreground);
          cursor: pointer;
          transition: all 150ms;
        }
        .fw-nav-arrow:hover:not(:disabled) {
          background: var(--color-surface-raised);
          color: var(--color-foreground);
        }
        .fw-nav-arrow:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .fw-nav-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.625rem;
          border-radius: 0.625rem;
          border: 1px solid transparent;
          background: transparent;
          cursor: pointer;
          text-align: left;
          transition: all 150ms;
        }

        .fw-nav-item-active {
          background: var(--color-surface-raised);
          border-color: var(--color-border);
        }

        .fw-nav-item-inactive:hover {
          background: var(--color-surface);
        }

        .fw-nav-thumb-wrapper {
          width: 64px;
          height: 48px;
          border-radius: 0.375rem;
          background: var(--color-surface);
          overflow: hidden;
          flex-shrink: 0;
          border: 1px solid var(--color-border);
        }

        .fw-nav-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          opacity: 0.6;
          transition: opacity 150ms;
        }

        .fw-nav-item-active .fw-nav-thumb-img {
          opacity: 1;
        }
        .fw-nav-item-inactive:hover .fw-nav-thumb-img {
          opacity: 0.8;
        }

        .fw-nav-item-info {
          display: flex;
          flex-direction: column;
          flex: 1;
          min-width: 0;
        }

        .fw-nav-num {
          font-family: var(--font-mono);
          font-size: 0.625rem;
          font-weight: 600;
          color: var(--color-primary);
        }

        .fw-nav-item-inactive .fw-nav-num {
          color: var(--color-muted-foreground);
          opacity: 0.5;
        }

        .fw-nav-cat {
          font-family: var(--font-mono);
          font-size: 0.5625rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-muted-foreground);
        }

        .fw-nav-title {
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--color-foreground);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .fw-nav-item-inactive .fw-nav-title {
          color: var(--color-muted-foreground);
        }

        /* Hide arrows on mobile */
        @media (max-width: 1023px) {
          .fw-nav-arrow { display: none; }
          .fw-nav-rail {
            flex-direction: row;
            overflow-x: auto;
            overflow-y: hidden;
            scroll-snap-type: x mandatory;
            padding-bottom: 0.5rem;
          }
          .fw-nav-item {
            flex: 0 0 240px;
            scroll-snap-align: start;
            border: 1px solid var(--color-border);
          }
        }

        /* ─── Responsive grid layout ──────────────────────────────────── */
        @media (min-width: 1024px) {
          .fw-wrapper {
            flex-direction: row;
            gap: 2.5rem;
            align-items: flex-start;
          }
          
          .fw-main {
            flex: 1;
            min-width: 0;
          }

          .fw-main-content {
            flex-direction: row;
            gap: 2rem;
            align-items: center;
          }

          .fw-image-col {
            flex: 1.2;
            min-width: 0;
          }

          .fw-info-col {
            flex: 0.8;
            min-width: 0;
          }

          .fw-nav {
            width: 320px;
            flex-shrink: 0;
          }
        }

        @media (min-width: 1280px) {
          .fw-wrapper {
            gap: 4rem;
          }
          .fw-main-content {
            gap: 3rem;
          }
          .fw-image-col {
            flex: 1.4;
          }
        }
      `}</style>
    </div>
  );
}
