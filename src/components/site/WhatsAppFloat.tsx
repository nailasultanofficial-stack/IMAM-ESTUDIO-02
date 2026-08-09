import { MessageCircle } from "lucide-react";

import { whatsappUrl } from "@/lib/site";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappUrl("Hi Malik — I found your portfolio and I'd like to discuss a project.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Message Malik Jahanzaib on WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 md:h-14 md:w-14"
    >
      <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />
    </a>
  );
}
