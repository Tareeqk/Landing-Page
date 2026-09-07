// Shared consent storage + Google Consent Mode v2 bridge. The key here
// must match the inline bootstrap script in index.html, which reads it
// synchronously (before this module ever loads) to set gtag's default
// consent state so returning visitors who already accepted don't get a
// flash of "denied" analytics on first paint.
export const COOKIE_CONSENT_STORAGE_KEY = "tk_cookie_consent";

// Bump whenever the cookie categories/policy shape changes, so anyone who
// already consented under the old shape gets re-prompted instead of a new
// category silently inheriting a choice they never actually made about it.
export const CONSENT_VERSION = 1;

// Re-ask every 6 months instead of treating a choice as valid forever.
export const CONSENT_MAX_AGE_MS = 182 * 24 * 60 * 60 * 1000;

export function getStoredConsent() {
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== CONSENT_VERSION) return null;
    if (typeof parsed.timestamp !== "number" || Date.now() - parsed.timestamp > CONSENT_MAX_AGE_MS) {
      return null;
    }
    return parsed;
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
  const record = { necessary: true, analytics: !!analytics, version: CONSENT_VERSION, timestamp: Date.now() };
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
