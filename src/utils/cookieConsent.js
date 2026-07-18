// Shared consent storage + Google Consent Mode v2 bridge. The key here
// must match the inline bootstrap script in index.html, which reads it
// synchronously (before this module ever loads) to set gtag's default
// consent state so returning visitors who already accepted don't get a
// flash of "denied" analytics on first paint.
export const COOKIE_CONSENT_STORAGE_KEY = "tk_cookie_consent";

export function getStoredConsent() {
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function applyConsent({ analytics }) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("consent", "update", {
    analytics_storage: analytics ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

export function saveConsent({ analytics }) {
  const record = { necessary: true, analytics: !!analytics, timestamp: Date.now() };
  localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(record));
  applyConsent(record);
  return record;
}

// Fired by Footer's "Cookie Settings" link so the banner component can
// reopen the preferences panel on demand, without needing a shared
// context between two otherwise-unrelated components.
export const OPEN_COOKIE_SETTINGS_EVENT = "tk-open-cookie-settings";

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT));
}
