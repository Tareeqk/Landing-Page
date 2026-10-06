import { useEffect, useRef, useState } from "react";
import { FiBriefcase, FiFileText, FiGift, FiMail, FiPhone, FiSend, FiShield, FiUser } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import FormStatusBanner from "./FormStatusBanner";

// Turnstile's own list of supported widget-UI languages -- anything else
// (including a code this site supports but Turnstile doesn't recognize)
// falls back to "auto" rather than being passed through verbatim, since
// an unrecognized code isn't guaranteed to gracefully degrade the same
// way across Cloudflare's rollouts.
const TURNSTILE_LANGUAGES = new Set(["ar", "en"]);

// Explicit-render Turnstile widget, scoped to this form. index.html loads
// the script with ?render=explicit (no auto-rendered .cf-turnstile div),
// so this polls for window.turnstile instead of assuming it's ready --
// the script tag is `async defer`, and this component can easily mount
// before it finishes loading. Returns the live token plus a reset()
// callable so handleSubmit can force a fresh token after every attempt
// (a Turnstile token is single-use and ~5 min lived).
//
// Re-renders (remove + render) whenever `language` changes so switching
// the site's language mid-visit updates the widget's own UI text too --
// that invalidates any token the visitor had already solved, same as a
// normal reset, which is an acceptable trade-off for how rarely someone
// switches language while mid-form.
function useTurnstile(siteKey, language) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    if (!siteKey) return undefined;

    let cancelled = false;
    let pollId;

    const render = () => {
      if (cancelled || !containerRef.current || !window.turnstile) return;
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        // Flexible so the widget stretches to the same full width as
        // every other input in this form instead of Turnstile's default
        // fixed 300px box, which looked cramped/out of place here.
        size: "flexible",
        // Dark mode is force-disabled site-wide right now (see App.jsx's
        // isDark comment) -- "light" matches that, not "auto", so the
        // widget can't end up dark on a page that's always light (which
        // "auto" would do for a visitor whose OS is in dark mode).
        // Revisit once the dark-mode toggle is restored.
        theme: "light",
        language: TURNSTILE_LANGUAGES.has(language) ? language : "auto",
        callback: (t) => setToken(t),
        "expired-callback": () => setToken(""),
        "error-callback": () => setToken(""),
      });
    };

    if (window.turnstile) {
      render();
    } else {
      pollId = window.setInterval(() => {
        if (window.turnstile) {
          window.clearInterval(pollId);
          render();
        }
      }, 200);
    }

    return () => {
      cancelled = true;
      if (pollId) window.clearInterval(pollId);
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
    };
  }, [siteKey, language]);

  const reset = () => {
    setToken("");
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
  };

  return { containerRef, token, reset };
}

// Same "inject a <style> tag keyed off body.dark" convention ContactForm.jsx
// uses -- Tailwind's dark: variant isn't configured in this project.
function usePartnerFormStyles() {
  useEffect(() => {
    if (document.getElementById("pf-form-styles")) return;
    const style = document.createElement("style");
    style.id = "pf-form-styles";
    style.textContent = `
      body.dark .pf-card {
        background-color: var(--dark-bg-surface, #1c1c1c) !important;
        border-color: var(--dark-border, #2a2a2a) !important;
      }
      body.dark .pf-glow { background-image: linear-gradient(to bottom right, var(--dark-bg-surface, #1c1c1c), rgba(247,178,5,0.06)) !important; }
      body.dark .pf-eyebrow {
        background-color: rgba(247,178,5,0.14) !important;
        border-color: rgba(247,178,5,0.3) !important;
        color: var(--primary-yellow, #f7b205) !important;
      }
      body.dark .pf-heading { color: var(--dark-text-main, #e4e7eb) !important; }
      body.dark .pf-desc { color: var(--dark-text-muted, #aaa) !important; }
      body.dark .pf-label { color: var(--dark-text-disabled, #888) !important; }
      body.dark .pf-input {
        background-color: var(--dark-bg-main, #121212) !important;
        border-color: var(--dark-border, #2a2a2a) !important;
        color: var(--dark-text-main, #e4e7eb) !important;
      }
      body.dark .pf-input::placeholder { color: var(--dark-text-disabled, #777) !important; }
      .pf-input--error { border-color: #fca5a5; }
      .pf-input--error:focus { border-color: #ef4444; box-shadow: 0 0 0 4px rgba(239,68,68,0.12); }
      /* .pf-input's own dark-mode border-color is !important (see above),
         which would otherwise beat this non-important rule even with the
         extra class -- needs its own !important to actually show the
         error state once dark mode ships. */
      body.dark .pf-input--error { border-color: #ef4444 !important; }
      body.dark .pf-field-error { color: #fca5a5 !important; }
      body.dark .pf-optional-tag { background-color: var(--dark-bg-main, #121212) !important; color: var(--dark-text-disabled, #888) !important; }
      body.dark .pf-submit-btn {
        background-color: var(--dark-bg-muted, #2a2a2a) !important;
        color: var(--dark-text-main, #e4e7eb) !important;
        border: 1px solid var(--dark-border, #2a2a2a);
      }
      body.dark .pf-submit-btn:hover {
        background-color: var(--primary-yellow, #f7b205) !important;
        color: #0a0a0a !important;
      }

      body.dark .form-status-banner--success {
        background-color: rgba(16,185,129,0.12) !important;
        border-color: rgba(16,185,129,0.3) !important;
        color: #6ee7b7 !important;
      }
      body.dark .form-status-banner--error {
        background-color: rgba(239,68,68,0.12) !important;
        border-color: rgba(239,68,68,0.3) !important;
        color: #fca5a5 !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      const el = document.getElementById("pf-form-styles");
      if (el) el.remove();
    };
  }, []);
}

const FIELD_ICON_CLASS = "pf-icon pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 text-amber-500";

// The backend's 422 response ({"error":{"fields":{"email":["..."]}}}, per
// NEXT_STEPS.md's API contract) keys errors by the snake_case request
// field, not this form's camelCase state keys -- this maps one to the
// other so a field-level message can be looked up by input name.
const API_FIELD_NAME = {
  contactName: "contact_name",
  companyName: "company_name",
  email: "email",
  phone: "phone",
  referralCode: "referral_code",
  tradeLicense: "trade_license",
  captchaToken: "captcha_token",
};

const MAX_LICENSE_BYTES = 10 * 1024 * 1024;
const LICENSE_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];

export default function PartnerForm({ id = "apply" }) {
  const { t, i18n } = useTranslation();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;
  usePartnerFormStyles();
  const {
    containerRef: turnstileRef,
    token: captchaToken,
    reset: resetCaptcha,
  } = useTurnstile(turnstileSiteKey, i18n.language);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formData, setFormData] = useState({
    contactName: "",
    companyName: "",
    email: "",
    phone: "",
    referralCode: "",
  });
  const [tradeLicense, setTradeLicense] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] ?? null;
    if (status) setStatus(null);
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next.tradeLicense;
      return next;
    });
    if (file && (!LICENSE_TYPES.includes(file.type) || file.size > MAX_LICENSE_BYTES)) {
      setFieldErrors((prev) => ({ ...prev, tradeLicense: t("partnerForm.form.tradeLicenseHint") }));
      e.target.value = "";
      setTradeLicense(null);
      return;
    }
    setTradeLicense(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // A stale success/error banner (or a specific field's error) from a
    // previous attempt shouldn't linger once the visitor starts editing
    // again -- clear the whole-form banner, and just that one field's
    // message so the others stay visible until also corrected.
    if (status) setStatus(null);
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  // Clears the "please complete the captcha" message the moment a token
  // actually arrives (widget solved, or a fresh one after resetCaptcha())
  // -- it isn't routed through handleChange like the other fields since
  // the token comes from Turnstile's own callback, not an input event.
  useEffect(() => {
    if (captchaToken) {
      setFieldErrors((prev) => {
        if (!prev.captchaToken) return prev;
        const next = { ...prev };
        delete next.captchaToken;
        return next;
      });
    }
  }, [captchaToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Caught client-side before spending a network round trip -- the
    // widget hasn't finished loading/solving yet, or the visitor's
    // browser blocked it (extensions, some strict privacy modes). Only
    // enforced when a site key is actually configured (the widget was
    // asked to render at all); if VITE_TURNSTILE_SITE_KEY is unset (e.g.
    // a local env with no key yet), this falls through and the backend's
    // own "required" rule on captcha_token is what rejects the request --
    // that backend check is the real security boundary either way, this
    // is just a UX nicety when the widget is present.
    if (turnstileSiteKey && !captchaToken) {
      setStatus(null);
      setFieldErrors((prev) => ({ ...prev, captchaToken: t("partnerForm.form.captchaRequired") }));
      return;
    }

    try {
      setLoading(true);
      setStatus(null);
      setFieldErrors({});

      // POST /api/v1/partner-applications -- same {success, data}/{success,
      // error} envelope as /api/v1/contact-us (see ContactForm.jsx). Phone
      // is sent as typed rather than prefixed with +971 like the contact
      // form does -- fleets/vendors applying here may be registering from
      // outside the UAE, so the field takes a full international number.
      // Multipart (not JSON) so the optional trade licence file can ride
      // along; the browser sets the Content-Type boundary itself.
      const body = new FormData();
      body.append("contact_name", formData.contactName);
      body.append("company_name", formData.companyName);
      body.append("email", formData.email);
      body.append("phone", formData.phone);
      if (formData.referralCode.trim()) body.append("referral_code", formData.referralCode.trim());
      if (tradeLicense) body.append("trade_license", tradeLicense);
      body.append("captcha_token", captchaToken);

      const response = await fetch(`${baseUrl}/api/v1/partner-applications`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body,
      });
      const data = await response.json();

      if (data.success) {
        setStatus({ type: "success", message: t("partnerForm.form.successAlert") });
        setFormData({
          contactName: "",
          companyName: "",
          email: "",
          phone: "",
          referralCode: "",
        });
        setTradeLicense(null);
        e.target.reset();
      } else if (data.error?.fields) {
        const nextFieldErrors = {};
        for (const [formKey, apiKey] of Object.entries(API_FIELD_NAME)) {
          const messages = data.error.fields[apiKey];
          if (messages?.length) nextFieldErrors[formKey] = messages[0];
        }
        setFieldErrors(nextFieldErrors);
        setStatus({ type: "error", message: data.error.message || t("partnerForm.form.validationErrorAlert") });
      } else {
        setStatus({ type: "error", message: data.error?.message || t("partnerForm.form.genericErrorAlert") });
      }
    } catch (error) {
      console.error(error);
      setStatus({ type: "error", message: t("partnerForm.form.errorAlert") });
    } finally {
      setLoading(false);
      // Consumed either way -- Turnstile tokens are single-use, so a
      // retry (whether the first attempt succeeded, a field was invalid,
      // or captcha verification itself was rejected) needs a fresh one.
      resetCaptcha();
    }
  };

  // Merged into each input's className below so a field with a
  // server-side error gets a red border/ring instead of the usual amber
  // one, matching how :invalid states are styled elsewhere on the site.
  const fieldClass = (name) =>
    fieldErrors[name]
      ? "pf-input pf-input--error w-full h-12 rounded-xl border ps-10 pe-3 text-sm text-black shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] outline-none transition-all duration-300"
      : "pf-input w-full h-12 rounded-xl border border-gray-100 bg-white ps-10 pe-3 text-sm text-black shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] outline-none transition-all duration-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100/60";

  return (
    <div
      id={id}
      data-aos="fade-up"
      className="
        pf-card
        relative overflow-hidden
        rounded-[24px]
        border border-white/40
        bg-white/95
        backdrop-blur-xl
        shadow-[0_30px_80px_rgba(0,0,0,0.10)]
        p-5 sm:p-7 md:p-8
        w-full
        scroll-mt-24
      "
    >
      <div
        className="
          pf-glow
          absolute inset-0
          bg-gradient-to-br from-white to-amber-50/50
          pointer-events-none
        "
      />

      <div className="relative z-10">
        <span
          className="
            pf-eyebrow
            inline-flex items-center gap-1.5
            rounded-full
            bg-amber-100/80
            px-3 py-1
            text-[10px]
            font-bold
            uppercase
            tracking-[0.18em]
            text-amber-800
            mb-3
          "
        >
          <FiSend className="text-[10px]" />
          {t("partnerForm.form.eyebrow")}
        </span>

        <h3 className="pf-heading text-xl sm:text-2xl font-black tracking-tight text-black">
          {t("partnerForm.form.heading")}
        </h3>

        <p className="pf-desc mt-2 text-sm leading-6 text-gray-600 max-w-lg">
          {t("partnerForm.form.description")}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <FormStatusBanner status={status} onDismiss={() => setStatus(null)} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Contact name */}
            <div>
              <label className="pf-label block mb-1.5 text-[10px] uppercase tracking-[0.18em] font-bold text-gray-400">
                {t("partnerForm.form.contactNameLabel")}
              </label>
              <div className="relative">
                <FiUser className={FIELD_ICON_CLASS} />
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  required
                  placeholder={t("partnerForm.form.contactNamePlaceholder")}
                  className={fieldClass("contactName")}
                />
              </div>
              {fieldErrors.contactName && (
                <p className="pf-field-error mt-1.5 text-xs text-red-600">{fieldErrors.contactName}</p>
              )}
            </div>

            {/* Company name */}
            <div>
              <label className="pf-label block mb-1.5 text-[10px] uppercase tracking-[0.18em] font-bold text-gray-400">
                {t("partnerForm.form.companyNameLabel")}
              </label>
              <div className="relative">
                <FiBriefcase className={FIELD_ICON_CLASS} />
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  placeholder={t("partnerForm.form.companyNamePlaceholder")}
                  className={fieldClass("companyName")}
                />
              </div>
              {fieldErrors.companyName && (
                <p className="pf-field-error mt-1.5 text-xs text-red-600">{fieldErrors.companyName}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Email */}
            <div>
              <label className="pf-label block mb-1.5 text-[10px] uppercase tracking-[0.18em] font-bold text-gray-400">
                {t("partnerForm.form.emailLabel")}
              </label>
              <div className="relative">
                <FiMail className={FIELD_ICON_CLASS} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder={t("partnerForm.form.emailPlaceholder")}
                  className={fieldClass("email")}
                />
              </div>
              {fieldErrors.email && (
                <p className="pf-field-error mt-1.5 text-xs text-red-600">{fieldErrors.email}</p>
              )}
            </div>

            {/* Phone -- full international number, no +971 auto-prefix,
                since fleets/vendors may be registering from outside the UAE. */}
            <div>
              <label className="pf-label block mb-1.5 text-[10px] uppercase tracking-[0.18em] font-bold text-gray-400">
                {t("partnerForm.form.phoneLabel")}
              </label>
              <div className="relative">
                <FiPhone className={FIELD_ICON_CLASS} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  minLength={8}
                  placeholder={t("partnerForm.form.phonePlaceholder")}
                  className={fieldClass("phone")}
                />
              </div>
              {fieldErrors.phone && (
                <p className="pf-field-error mt-1.5 text-xs text-red-600">{fieldErrors.phone}</p>
              )}
            </div>
          </div>

          {/* Referral code -- optional, called out explicitly in the UI */}
          <div>
            <label className="pf-label mb-1.5 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] font-bold text-gray-400">
              {t("partnerForm.form.referralCodeLabel")}
              <span className="pf-optional-tag rounded-full bg-gray-100 px-1.5 py-0.5 text-[9px] normal-case tracking-normal text-gray-400">
                {t("partnerForm.form.optionalTag")}
              </span>
            </label>
            <div className="relative">
              <FiGift className={FIELD_ICON_CLASS} />
              <input
                type="text"
                name="referralCode"
                value={formData.referralCode}
                onChange={handleChange}
                placeholder={t("partnerForm.form.referralCodePlaceholder")}
                className={fieldClass("referralCode")}
              />
            </div>
            {fieldErrors.referralCode && (
              <p className="pf-field-error mt-1.5 text-xs text-red-600">{fieldErrors.referralCode}</p>
            )}
          </div>

          {/* Trade licence -- required image or PDF */}
          <div>
            <label className="pf-label mb-1.5 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] font-bold text-gray-400">
              {t("partnerForm.form.tradeLicenseLabel")}
            </label>
            <div className="relative">
              <FiFileText className={FIELD_ICON_CLASS} />
              <input
                type="file"
                name="tradeLicense"
                required
                accept="image/jpeg,image/png,image/webp,application/pdf"
                onChange={handleFileChange}
                className={`${fieldClass("tradeLicense")} py-2.5 file:me-3 file:rounded-lg file:border-0 file:bg-amber-100 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-amber-800`}
              />
            </div>
            <p className="pf-desc mt-1.5 text-xs text-gray-500">{t("partnerForm.form.tradeLicenseHint")}</p>
            {fieldErrors.tradeLicense && (
              <p className="pf-field-error mt-1.5 text-xs text-red-600">{fieldErrors.tradeLicense}</p>
            )}
          </div>

          {/* Cloudflare Turnstile -- explicit render (see useTurnstile
              above), so this div is just the mount point; size:"flexible"
              makes the widget fill it the same way every other w-full
              input in this form does. Labeled like every other field
              above for visual consistency rather than dropping in an
              unlabeled third-party box. min-h reserves the widget's own
              rendered height up front so the submit button doesn't jump
              down once the async script finishes loading and the iframe
              mounts. Silently absent if VITE_TURNSTILE_SITE_KEY isn't set
              (e.g. a local env with no key yet) rather than rendering a
              broken container -- the backend's own "required" rule still
              blocks submission either way. */}
          {turnstileSiteKey && (
            <div>
              <label className="pf-label mb-1.5 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] font-bold text-gray-400">
                <FiShield className="text-[11px] text-amber-500" />
                {t("partnerForm.form.captchaLabel")}
              </label>
              <div ref={turnstileRef} className="min-h-[65px]" />
              {fieldErrors.captchaToken && (
                <p className="pf-field-error mt-1.5 text-xs text-red-600">{fieldErrors.captchaToken}</p>
              )}
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="
                pf-submit-btn
                group relative overflow-hidden
                w-full h-12
                rounded-xl
                bg-black text-white
                font-bold text-sm tracking-wide
                inline-flex items-center justify-center gap-2
                transition-all duration-300
                hover:bg-amber-500 hover:text-black
                hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-amber-500/20
                disabled:opacity-60 disabled:cursor-not-allowed
              "
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {t("partnerForm.form.submittingButton")}
                </>
              ) : (
                <>
                  {t("partnerForm.form.submitButton")}
                  <FiSend className="text-sm transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
