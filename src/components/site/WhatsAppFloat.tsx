import { MessageCircle } from "lucide-react";

import { whatsappUrl } from "@/lib/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { globalSettingsQuery } from "@/lib/public-queries";

export function WhatsAppFloat() {
  const { data: globalSettings } = useSuspenseQuery(globalSettingsQuery);
  const siteConfig = globalSettings?.['site_config'] || {};
  const whatsappNumber = siteConfig.whatsapp || "923091925177";

  return (
    <a
      href={whatsappUrl(whatsappNumber, "Hi Malik — I found your portfolio and I'd like to discuss a project.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Message Malik Jahanzaib on WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 md:h-14 md:w-14"
    >
      <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />
    </a>
  );
}
