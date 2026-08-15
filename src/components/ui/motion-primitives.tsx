import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
  AnimatePresence,
} from "framer-motion";
import Lenis from "lenis";

// ---------------------------------------------------------------------------
// 1. Lenis Smooth Scroll Provider
// ---------------------------------------------------------------------------
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Check prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

// ---------------------------------------------------------------------------
// 2. Editorial Reveal (Mask / Slide-Up Entry)
// ---------------------------------------------------------------------------
interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  className?: string;
  width?: "fit-content" | "100%";
}

export function Reveal({
  children,
  delay = 0,
  direction = "up",
  duration = 0.6,
  className = "",
  width = "100%",
}: RevealProps) {
  const getVariants = () => {
    switch (direction) {
      case "up":
        return { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
      case "down":
        return { hidden: { opacity: 0, y: -30 }, visible: { opacity: 1, y: 0 } };
      case "left":
        return { hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } };
      case "right":
        return { hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0 } };
      case "none":
      default:
        return { hidden: { opacity: 0 }, visible: { opacity: 1 } };
    }
  };

  return (
    <div style={{ width }} className={className}>
      <motion.div
        variants={getVariants()}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 3. Staggered Text Reveal
// ---------------------------------------------------------------------------
interface TextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
}

export function TextReveal({ text, className = "", as = "h2", delay = 0 }: TextRevealProps) {
  const words = text.split(" ");
  const Component = motion[as] as typeof motion.h2;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay * i },
    }),
  };

  const wordVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 100,
      },
    },
  };

  return (
    <Component
      className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
    >
      {words.map((word, i) => (
        <motion.span key={`${word}-${i}`} variants={wordVariants} className="inline-block">
          {word}
        </motion.span>
      ))}
    </Component>
  );
}

// ---------------------------------------------------------------------------
// 4. Magnetic Interactive Button
// ---------------------------------------------------------------------------
interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function MagneticButton({
  children,
  className = "",
  strength = 0.3,
  onClick,
  type = "button",
  disabled = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * strength, y: middleY * strength });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x, y }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 350, damping: 20, mass: 0.1 }}
      className={`relative inline-flex items-center justify-center ${className}`}
    >
      {children}
    </motion.button>
  );
}

// ---------------------------------------------------------------------------
// 5. 3D Perspective Tilt Card
// ---------------------------------------------------------------------------
interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glareColor?: string;
}

export function TiltCard({
  children,
  className = "",
  glareColor = "rgba(16, 185, 129, 0.12)",
}: TiltCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.97 }}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={`relative transition-colors duration-200 ${className}`}
    >
      {children}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// 6. Interactive Desktop Cursor Follower
// ---------------------------------------------------------------------------
export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState<"default" | "hover" | "drag">("default");
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], .clickable")) {
        setCursorState("hover");
      } else if (target.closest(".draggable, [data-drag]")) {
        setCursorState("drag");
      } else {
        setCursorState("default");
      }
    };

    window.addEventListener("mousemove", updatePosition);
    return () => window.removeEventListener("mousemove", updatePosition);
  }, []);

  if (isTouch) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden rounded-full md:block"
      animate={{
        x: position.x - 12,
        y: position.y - 12,
        scale: cursorState === "hover" ? 1.8 : cursorState === "drag" ? 2.2 : 1,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.1 }}
    >
      <div
        className={`h-6 w-6 rounded-full border transition-colors duration-200 ${
          cursorState === "hover"
            ? "border-primary bg-primary/20 backdrop-blur-sm"
            : cursorState === "drag"
              ? "border-amber-400 bg-amber-400/20"
              : "border-foreground/30 bg-foreground/5"
        }`}
      />
    </motion.div>
  );
}
