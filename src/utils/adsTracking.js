// Google Ads + GA4 conversion tracking.
//
// Each action always sends a GA4 event (so it can be marked as a key event
// and imported into Google Ads). If a Google Ads conversion label is set in
// the env, it also fires the direct Ads conversion
// (send_to: AW-17286502381/<label>).
//
// Labels come from Google Ads -> Goals -> Conversions -> (conversion) ->
// Tag setup -> "Use Google Tag" / event snippet: send_to: 'AW-…/LABEL'.
const ADS_ID = "AW-17286502381";

const LABELS = {
  call_click: import.meta.env.VITE_ADS_LABEL_CALL,
  whatsapp_click: import.meta.env.VITE_ADS_LABEL_WHATSAPP,
  app_download_click: import.meta.env.VITE_ADS_LABEL_APP,
  form_submit: import.meta.env.VITE_ADS_LABEL_FORM,
};

export function trackConversion(eventName, params = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  const base = { page_path: window.location.pathname, ...params };
  window.gtag("event", eventName, base);
  const label = LABELS[eventName];
  if (label) {
    window.gtag("event", "conversion", { send_to: `${ADS_ID}/${label}`, ...base });
  }
}

function classify(href) {
  if (!href) return null;
  if (href.startsWith("tel:")) return "call_click";
  if (/^https?:\/\/(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)\//i.test(href)) return "whatsapp_click";
  if (/^https?:\/\/(apps\.apple\.com|play\.google\.com\/store)/i.test(href)) return "app_download_click";
  return null;
}

// One delegated listener covers every tel:/WhatsApp/app-store link on the
// site, including ones added later, so no per-button wiring is needed.
export function initAdsTracking() {
  if (typeof document === "undefined" || window.__tkAdsTracking) return;
  window.__tkAdsTracking = true;
  document.addEventListener(
    "click",
    (e) => {
      const a = e.target instanceof Element ? e.target.closest("a[href]") : null;
      if (!a) return;
      const href = a.getAttribute("href");
      const eventName = classify(href);
      if (eventName) trackConversion(eventName, { link_url: href });
    },
    true
  );
}
