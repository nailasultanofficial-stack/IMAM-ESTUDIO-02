import { useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center space-x-1 rounded-full border border-border/60 bg-surface/40 p-1 backdrop-blur-md opacity-0">
        <div className="h-7 w-7" />
        <div className="h-7 w-7" />
        <div className="h-7 w-7" />
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-1 rounded-full border border-border/60 bg-surface/40 p-1 backdrop-blur-md">
      <button
        onClick={() => setTheme("light")}
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-full transition-[color,transform,opacity,shadow] active:scale-[0.97]",
          theme === "light"
            ? "bg-foreground text-background shadow-sm"
            : "text-muted-foreground hover:bg-surface-raised hover:text-foreground"
        )}
        aria-label="Light theme"
        title="Light theme"
      >
        <Sun className="h-3.5 w-3.5" />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-full transition-[color,transform,opacity,shadow] active:scale-[0.97]",
          theme === "dark"
            ? "bg-foreground text-background shadow-sm"
            : "text-muted-foreground hover:bg-surface-raised hover:text-foreground"
        )}
        aria-label="Dark theme"
        title="Dark theme"
      >
        <Moon className="h-3.5 w-3.5" />
      </button>
      <button
        onClick={() => setTheme("alt")}
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-full transition-[color,transform,opacity,shadow] active:scale-[0.97]",
          theme === "alt"
            ? "bg-foreground text-background shadow-sm"
            : "text-muted-foreground hover:bg-surface-raised hover:text-foreground"
        )}
        aria-label="Alternate theme"
        title="Alternate theme"
      >
        <Monitor className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
