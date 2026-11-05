// Single place for every WhatsApp entry point on the site.
//
// Why this exists: utils/adsTracking.js only counts a WhatsApp conversion for
// clicks on a real <a href="https://wa.me/..."> link. Buttons that called
// window.open() directly (service pages, area pages, Pricing) were never
// counted, so Google Ads under-reported WhatsApp leads from exactly the pages
// the ads land on. openWhatsApp() below tracks explicitly; whatsappLinkProps()
// is for plain <a> links, which the delegated listener already tracks.
//
// The chat opens with a short prefilled message in the visitor's language so
// the team knows which service they want. When the visitor accepted analytics
// cookies AND arrived from a campaign (see utils/attribution.js), the message
// ends with "(ref: ads)" so a chat can be told apart from a direct one. The ad
// click id itself is never put in the message or stored.
import { trackConversion } from "./adsTracking";
import { getAttribution } from "./attribution";

export const WHATSAPP_NUMBER = "97142232269";

const SUPPORTED_LANGS = ["en", "ar", "ur"];

// {service} is only filled for English; Arabic and Urdu use a generic request
// so we never mix an English service name into an Arabic/Urdu sentence.
const MESSAGES = {
  en: (service) => `Hi Tareeqk, I need ${service || "roadside assistance"}. My location: `,
  ar: () => "مرحباً طريقك، أحتاج إلى مساعدة على الطريق. موقعي: ",
  ur: () => "ہیلو طریق، مجھے روڈ سائیڈ مدد چاہیے۔ میرا مقام: ",
};

function currentLang() {
  if (typeof window === "undefined") return "en";
  const first = window.location.pathname.split("/")[1];
  return SUPPORTED_LANGS.includes(first) ? first : "en";
}

function fromAd() {
  try {
    const a = getAttribution();
    return !!a && (a.has_click_id === true || String(a.utm_medium || "").toLowerCase() === "cpc");
  } catch {
    return false;
  }
}

// service: short English label such as "car recovery" or "a battery jump start".
export function buildWhatsAppLink(service) {
  const lang = currentLang();
  let text = MESSAGES[lang](service);
  if (fromAd()) text += "(ref: ads)";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

// For buttons that cannot be a plain <a>. Counts the conversion, then opens.
export function openWhatsApp(service) {
  const href = buildWhatsAppLink(service);
  trackConversion("whatsapp_click", { link_url: href, service: service || "general" });
  window.open(href, "_blank", "noopener,noreferrer");
}

// Spread onto an <a>: <a {...whatsappLinkProps("car recovery")} target="_blank" ...>
// The href is rebuilt on click so the "(ref: ads)" tag reflects consent given
// after the page rendered. The delegated tracker still sees the click and
// records the conversion (it only checks that the link starts with wa.me/).
export function whatsappLinkProps(service) {
  return {
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    onClick: (e) => {
      e.currentTarget.href = buildWhatsAppLink(service);
    },
  };
}
