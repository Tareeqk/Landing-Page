// Google Ads + GA4 conversion tracking.
//
// Every tracked action sends a GA4 event (so it can be marked as a key event in
// Analytics). Call and WhatsApp clicks also fire their Google Ads conversion for
// account AW-18489174358, via window.tkAdsConversion().
//
// That function is defined in index.html -- NOT here -- and holds Google's
// event snippets verbatim ("Call click" and "WhatsApp click"). They live in the
// page source so Google's tag check can find them, and they are only ever
// CALLED from the click listener below. Google's snippets default to "Page
// load" mode, which would count a conversion on every page view; these are
// clicks, so they must not run on load.
//
// To add another Ads conversion (e.g. form submit, app download): create it in
// Google Ads, then add its event snippet to window.tkAdsConversion in
// index.html. Until then those actions send the GA4 event only.
export function trackConversion(eventName, params = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  const base = { page_path: window.location.pathname, ...params };
  window.gtag("event", eventName, base);
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
