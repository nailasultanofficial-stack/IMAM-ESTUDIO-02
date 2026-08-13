export function contactHref(source: string = "direct") {
  return `/contact?source=${encodeURIComponent(source)}`;
}

export function whatsappUrl(phone: string, text: string = "Hi, I'd like to discuss a project.") {
  const cleanPhone = phone.replace(/\D/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}
