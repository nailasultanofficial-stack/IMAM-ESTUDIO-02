import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center space-x-1 rounded-full border border-border/60 bg-surface/40 p-1 backdrop-blur-md">
      <button
        onClick={() => setTheme("light")}
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-full transition-all active:scale-95",
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
          "flex h-7 w-7 items-center justify-center rounded-full transition-all active:scale-95",
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
          "flex h-7 w-7 items-center justify-center rounded-full transition-all active:scale-95",
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
