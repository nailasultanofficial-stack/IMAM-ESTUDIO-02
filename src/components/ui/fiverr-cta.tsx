import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { globalSettingsQuery } from "@/lib/public-queries";

interface FiverrCTAProps {
  className?: string;
  variant?: "subtle" | "primary";
}

export function FiverrCTA({ className, variant = "subtle" }: FiverrCTAProps) {
  const { data: globalSettings } = useQuery(globalSettingsQuery);
  const fiverrUrl = globalSettings?.["site_config"]?.fiverr_url || "https://www.fiverr.com/";

  return (
    <a
      href={fiverrUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors duration-300",
        variant === "subtle"
          ? "bg-[#1dbf73]/10 text-[#1dbf73] hover:bg-[#1dbf73]/20 hover:shadow-sm"
          : "bg-[#1dbf73] text-white hover:bg-[#19a463] hover:shadow-md",
        className
      )}
      aria-label="Hire me on Fiverr"
    >
      <span className="font-semibold tracking-tight uppercase tracking-wider text-[11px] sm:text-xs">View Fiverr Profile</span>
      <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 opacity-80" />
    </a>
  );
}
