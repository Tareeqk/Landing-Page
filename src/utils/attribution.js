// Remembers where a visitor came from (the campaign tags on the link they
// followed, the site they came from, the page they landed on) so the contact
// and partner forms can send it along. The Tareeqk admin panel's Marketing
// page uses it to show which channels bring sign-ups.
//
// Consent: this is analytics, so nothing is written to the browser, and
// nothing is sent with a form, unless the visitor accepted analytics cookies
// (the same choice that switches Google Analytics on). The landing is held in
// memory until then, so a visitor who accepts a moment after arriving is still
// counted for the page they arrived on.
//
// Only the page path is kept (never the query string), and the ad click id
// itself is not kept at all, only whether there was one.
import { getStoredConsent } from "./cookieConsent.js";

const STORAGE_KEY = "tk_attribution";
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;
const MAX_LENGTH = 150;
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
const CLICK_ID_KEYS = ["gclid", "gbraid", "wbraid"];

// This page view's own marketing touch, held in memory only.
let landing = null;
let captured = false;

function clip(value) {
  return typeof value === "string" ? value.trim().slice(0, MAX_LENGTH) : "";
}

function externalReferrerHost() {
  try {
    if (!document.referrer) return "";
    const host = new URL(document.referrer).hostname.toLowerCase();
    return host && host !== window.location.hostname.toLowerCase() ? host : "";
  } catch {
    return "";
  }
}

// Called once when the site loads. A visit that carries no campaign tag, ad
// click or outside referrer is a plain direct visit and leaves nothing behind,
// so it never replaces an earlier campaign touch.
export function captureAttribution() {
  if (typeof window === "undefined" || captured) return;
  captured = true;

  const params = new URLSearchParams(window.location.search);
  const touch = {};

  for (const key of UTM_KEYS) {
    const value = clip(params.get(key) ?? "");
    if (value) touch[key] = value;
  }

  const hasClickId = CLICK_ID_KEYS.some((key) => params.has(key));
  const referrerHost = externalReferrerHost();

  if (Object.keys(touch).length === 0 && !hasClickId && !referrerHost) return;

  if (referrerHost) touch.referrer_host = referrerHost;
  if (hasClickId) touch.has_click_id = true;
  touch.landing_path = window.location.pathname.slice(0, 300);
  landing = touch;
}

function readStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed.saved_at !== "number" || Date.now() - parsed.saved_at > MAX_AGE_MS) {
      return null;
    }
    return parsed.touch ?? null;
  } catch {
    return null;
  }
}

// What to send with a form, or null when there is nothing to send or the
// visitor has not accepted analytics cookies.
export function getAttribution() {
  if (typeof window === "undefined" || !getStoredConsent()?.analytics) return null;

  try {
    if (landing) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ touch: landing, saved_at: Date.now() }));
      landing = null;
    }
  } catch {
    // Storage can be blocked (private mode); fall through to whatever is stored.
  }

  return readStored();
}

// The same data as flat form-data fields, for the multipart partner form.
export function appendAttribution(formData, attribution) {
  if (!attribution) return;
  for (const [key, value] of Object.entries(attribution)) {
    formData.append(`attribution[${key}]`, value === true ? "1" : String(value));
  }
}
