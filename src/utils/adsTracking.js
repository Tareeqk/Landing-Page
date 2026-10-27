// Google Ads + GA4 conversion tracking.
//
// Each action always sends a GA4 event (so it can be marked as a key event
// and imported into Google Ads). It also fires a direct Google Ads
// conversion for every account in ADS_DESTINATIONS that has a label for that
// action (send_to: AW-<account>/<label>).
//
// Labels come from Google Ads -> Goals -> Conversions -> (conversion) ->
// Tag setup -> "Use Google Tag" / event snippet: send_to: 'AW-…/LABEL'.
//
// NOTE: Google's snippet for a conversion defaults to "Page load" mode,
// which counts a conversion every time the page loads. Call/WhatsApp
// conversions are CLICKS, so they are fired from the delegated click
// listener below instead of pasting that snippet into the page.
// Every AW account used here must also be initialised with
// gtag("config", "AW-…") in index.html.
const ADS_DESTINATIONS = [
  {
    // Original account. Labels come from env, so they stay opt-in.
    id: "AW-17286502381",
    labels: {
      call_click: import.meta.env.VITE_ADS_LABEL_CALL,
      whatsapp_click: import.meta.env.VITE_ADS_LABEL_WHATSAPP,
      app_download_click: import.meta.env.VITE_ADS_LABEL_APP,
      form_submit: import.meta.env.VITE_ADS_LABEL_FORM,
    },
  },
  // The second account, AW-18489174358 (Call click / WhatsApp click), is NOT
  // listed here: its conversion snippets are defined verbatim in index.html as
  // window.tkAdsConversion so Google's tag check can see them in the page
  // source. They are called below.
];

export function trackConversion(eventName, params = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  const base = { page_path: window.location.pathname, ...params };
  window.gtag("event", eventName, base);
  for (const { id, labels } of ADS_DESTINATIONS) {
    const label = labels[eventName];
    if (label) {
      window.gtag("event", "conversion", { send_to: `${id}/${label}`, ...base });
    }
  }
  // Fires the AW-18489174358 conversion for call_click / whatsapp_click only.
  if (typeof window.tkAdsConversion === "function") window.tkAdsConversion(eventName);
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
