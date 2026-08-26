import React, { useEffect, useState } from "react";
import {
  FiMail,
  FiMapPin,
  FiPhone,
  FiSend,
} from "react-icons/fi";
import { useTranslation } from "react-i18next";
import FormStatusBanner from "./FormStatusBanner";

// Built entirely with Tailwind utility classes (bg-white, text-black, etc.)
// with no dark-mode handling, so it stayed a bright card regardless of the
// site-wide dark toggle. Tailwind's `dark:` variant isn't configured in
// this project — every other section instead injects a <style> block with
// `body.dark .foo { ... !important }` overrides keyed off `body.dark` (set
// by App.jsx). This follows that same convention.
function useContactFormStyles() {
  useEffect(() => {
    if (document.getElementById("contact-form-styles")) return;
    const style = document.createElement("style");
    style.id = "contact-form-styles";
    style.textContent = `
      body.dark .cf-section { background-color: var(--dark-bg-main, #141414) !important; }
      body.dark .cf-eyebrow {
        background-color: rgba(245,166,35,0.14) !important;
        border-color: rgba(245,166,35,0.3) !important;
        color: var(--primary-yellow, #f5a623) !important;
      }
      body.dark .cf-heading { color: var(--dark-text-main, #f0f0f0) !important; }
      body.dark .cf-desc { color: var(--dark-text-muted, #aaa) !important; }
      body.dark .cf-label { color: var(--dark-text-disabled, #888) !important; }

      body.dark .cf-map-wrap { background-color: var(--dark-bg-surface, #1e1e1e) !important; border-color: var(--dark-border, rgba(255,255,255,0.08)) !important; }
      body.dark .cf-float-card, body.dark .cf-chip {
        background-color: var(--dark-bg-surface, #1e1e1e) !important;
        border-color: var(--dark-border, rgba(255,255,255,0.08)) !important;
      }
      body.dark .cf-icon-chip { background-color: rgba(245,166,35,0.14) !important; }
      body.dark .cf-icon-chip svg { color: var(--primary-yellow, #f5a623) !important; }
      body.dark .cf-value { color: var(--dark-text-main, #f0f0f0) !important; }

      body.dark .cf-form-card {
        background-color: var(--dark-bg-surface, #1e1e1e) !important;
        border-color: var(--dark-border, rgba(255,255,255,0.08)) !important;
      }
      body.dark .cf-form-glow { background-image: linear-gradient(to bottom right, var(--dark-bg-surface, #1e1e1e), rgba(245,166,35,0.06)) !important; }

      body.dark .cf-input {
        background-color: var(--dark-bg-main, #141414) !important;
        border-color: var(--dark-border, rgba(255,255,255,0.1)) !important;
        color: var(--dark-text-main, #f0f0f0) !important;
      }
      body.dark .cf-input::placeholder { color: var(--dark-text-disabled, #777) !important; }
      .cf-input--error { border-color: #fca5a5; }
      .cf-input--error:focus { border-color: #ef4444; box-shadow: 0 0 0 4px rgba(239,68,68,0.12); }
      /* .cf-input's own dark-mode border-color is !important (below),
         which would otherwise beat this non-important rule even with the
         extra class -- needs its own !important to actually show once
         dark mode ships. */
      body.dark .cf-input--error { border-color: #ef4444 !important; }
      body.dark .cf-field-error { color: #fca5a5 !important; }

      body.dark .cf-submit-btn {
        background-color: var(--dark-bg-muted, #2a2a2a) !important;
        color: var(--dark-text-main, #f0f0f0) !important;
        border: 1px solid var(--dark-border, rgba(255,255,255,0.12));
      }
      body.dark .cf-submit-btn:hover {
        background-color: var(--primary-yellow, #f5a623) !important;
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
      const el = document.getElementById("contact-form-styles");
      if (el) el.remove();
    };
  }, []);
}

// The backend's 422 response ({"error":{"fields":{"email":["..."]}}}, per
// NEXT_STEPS.md's API contract) keys errors by the request field name --
// only "mobile" differs from its own state key (sent to the API as
// "phone").
const API_FIELD_NAME = {
  name: "name",
  mobile: "phone",
  email: "email",
  subject: "subject",
  message: "message",
};

export default function ContactSection() {
  const { t } = useTranslation();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  useContactFormStyles();

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setStatus(null);
      setFieldErrors({});

      // POST /api/v1/contact-us -- App\Http\Controllers\Api\ContactSubmissionController
      // (tareeqk-v2-be), same {success, data}/{success, error} envelope
      // every other api/v1 endpoint uses. Previously posted to a bare
      // `/contact-us` with a made-up {status, message} response shape --
      // that endpoint never existed on the backend at all, so submitting
      // this form has always silently failed.
      const response = await fetch(`${baseUrl}/api/v1/contact-us`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.mobile ? `+971${formData.mobile}` : null,
          subject: formData.subject,
          message: formData.message,
        }),
      });
      const data = await response.json();

      if (data.success) {
        setStatus({ type: "success", message: t("contact.successAlert") });

        setFormData({
          name: "",
          mobile: "",
          email: "",
          subject: "",
          message: "",
        });
      } else if (data.error?.fields) {
        const nextFieldErrors = {};
        for (const [formKey, apiKey] of Object.entries(API_FIELD_NAME)) {
          const messages = data.error.fields[apiKey];
          if (messages?.length) nextFieldErrors[formKey] = messages[0];
        }
        setFieldErrors(nextFieldErrors);
        setStatus({ type: "error", message: data.error.message || t("contact.validationErrorAlert") });
      } else {
        setStatus({ type: "error", message: data.error?.message || t("contact.genericErrorAlert") });
      }
    } catch (error) {
      console.error(error);
      setStatus({ type: "error", message: t("contact.errorAlert") });
    } finally {
      setLoading(false);
    }
  };

  // Merged into each input's className below so a field with a
  // server-side error gets a red border/ring instead of the usual amber
  // one, matching PartnerForm.jsx's equivalent.
  // Height is intentionally not baked in here -- the single-line inputs
  // all want h-11, but the message textarea sizes itself off `rows`
  // instead, and mixing two conflicting height utilities in one
  // className string is a wash (Tailwind's own generated order decides
  // the winner, not the order they're written in) rather than an
  // override.
  const fieldClass = (name) =>
    fieldErrors[name]
      ? "cf-input cf-input--error w-full rounded-xl border px-3 text-sm text-black shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] outline-none transition-all duration-300"
      : "cf-input w-full rounded-xl border border-gray-100 bg-white px-3 text-sm text-black shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] outline-none transition-all duration-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100/60";

  return (
    <section
      id="contact"
      className="
        cf-section
        relative overflow-hidden
        bg-[#f7f7f3]
        w-full
        py-8 sm:py-10 lg:py-10
      "
    >
      {/* Ambient Background */}
      <div className="absolute top-[-78px] end-[-78px] w-[221px] h-[221px] bg-amber-200/30 blur-3xl rounded-full" />

      <div className="absolute bottom-[-98px] start-[-78px] w-[195px] h-[195px] bg-orange-100/40 blur-3xl rounded-full" />

      <div className="container relative z-10 mx-auto px-4 max-w-7xl">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[6fr_5fr] gap-5 xl:gap-6 items-stretch">
          
          {/* LEFT SIDE */}
          <div className="flex flex-col gap-4" data-aos="fade-right">
            
            {/* Heading */}
            <div className="max-w-md">
              <span
                className="
                  cf-eyebrow
                  inline-flex items-center
                  rounded-full
                  border border-amber-300/60
                  bg-amber-50/80
                  px-3 py-1
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-amber-800
                  mb-3
                "
              >
                {t("contact.eyebrow")}
              </span>

              <h2
                className="
                  cf-heading
                  text-xl md:text-2xl
                  font-black
                  tracking-tight
                  text-black
                  leading-tight
                "
              >
                {t("contact.heading")}
              </h2>

              <p className="cf-desc mt-3 text-sm leading-6 text-gray-600">
                {t("contact.description")}
              </p>
            </div>

            {/* MAP — shorter on mobile; the floating contact cards move
                out from over the map into their own compact row below,
                since two stacked cards left little map visible in the
                old 220px-tall mobile crop. */}
            <div
              className="
                cf-map-wrap
                relative
                overflow-hidden
                rounded-2xl sm:rounded-[21px]
                h-[180px] sm:h-auto sm:min-h-[338px]
                border border-white/40
                shadow-[0_16px_40px_rgba(0,0,0,0.08)] sm:shadow-[0_30px_80px_rgba(0,0,0,0.08)]
                bg-white
              "
            >
              {/* Floating Contact Cards — desktop/tablet only */}
              <div
                className="
                  hidden sm:grid
                  absolute bottom-3 start-3 end-3 z-20
                  grid-cols-2 gap-2
                "
              >
                {/* Phone */}
                <div
                  data-aos="fade-up"
                  data-aos-delay="200"
                  className="
                    cf-float-card
                    bg-white/90 backdrop-blur-md
                    rounded-xl
                    p-3
                    border border-white/50
                    shadow-[0_10px_40px_rgba(0,0,0,0.08)]
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]
                    flex items-start gap-2
                  "
                >
                  <div
                    className="
                      cf-icon-chip
                      w-7 h-7 shrink-0
                      rounded-lg
                      bg-amber-100
                      flex items-center justify-center
                    "
                  >
                    <FiPhone className="text-amber-600 text-sm" />
                  </div>

                  <div className="min-w-0">
                    <p className="cf-label text-[10px] uppercase tracking-[0.18em] text-gray-400 font-bold">
                      {t("contact.phoneLabel")}
                    </p>

                    <a
                      href="tel:+97142232269"
                      className="
                        cf-value
                        text-sm font-semibold text-black
                        hover:text-amber-600
                        transition-colors
                        block mt-1
                      "
                    >
                      <span dir="ltr">+971 4 223 2269</span>
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div
                  data-aos="fade-up"
                  data-aos-delay="280"
                  className="
                    cf-float-card
                    bg-white/90 backdrop-blur-md
                    rounded-xl
                    p-3
                    border border-white/50
                    shadow-[0_10px_40px_rgba(0,0,0,0.08)]
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]
                    flex items-start gap-2
                  "
                >
                  <div
                    className="
                      cf-icon-chip
                      w-7 h-7 shrink-0
                      rounded-lg
                      bg-amber-100
                      flex items-center justify-center
                    "
                  >
                    <FiMail className="text-amber-600 text-sm" />
                  </div>

                  <div className="min-w-0">
                    <p className="cf-label text-[10px] uppercase tracking-[0.18em] text-gray-400 font-bold">
                      {t("contact.emailLabel")}
                    </p>

                    <a
                      href="mailto:info@tareeqk.ae"
                      className="
                        cf-value
                        text-sm font-semibold text-black
                        hover:text-amber-600
                        transition-colors
                        block mt-1 truncate
                      "
                    >
                      info@tareeqk.ae
                    </a>
                  </div>
                </div>


              </div>

              {/* Map */}
              <iframe
                title={t("contact.mapTitle")}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.9893847913213!2d55.34372317550754!3d25.169836277728606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4b575a508eb7e145%3A0x64b75e4ef148f296!2sTareeqk%20Portal!5e0!3m2!1sen!2sae!4v1778914921167!5m2!1sen!2sae"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }}
              />
            </div>

            {/* Compact contact chips — mobile/tablet only, replaces the
                map overlay so the map itself stays fully visible at the
                shorter mobile height. Side by side, sized tight enough
                that the full phone number and email each fit on one
                line without truncating. */}
            <div className="grid grid-cols-2 gap-2 sm:hidden">
              <a
                href="tel:+97142232269"
                className="
                  cf-chip
                  flex items-center gap-2
                  rounded-lg bg-white
                  border border-black/5
                  px-2.5 py-2.5
                  shadow-[0_4px_16px_rgba(0,0,0,0.05)]
                  min-w-0
                "
              >
                <div className="cf-icon-chip w-8 h-8 shrink-0 rounded-lg bg-amber-100 flex items-center justify-center">
                  <FiPhone className="text-amber-600 text-xs" />
                </div>
                <div className="min-w-0">
                  <p className="cf-label text-[9.5px] uppercase tracking-[0.1em] text-gray-400 font-bold leading-none">
                    {t("contact.phoneLabel")}
                  </p>
                  <p className="cf-value text-[11.5px] font-bold text-black whitespace-nowrap mt-1">
                    +971 4 223 2269
                  </p>
                </div>
              </a>

              <a
                href="mailto:info@tareeqk.ae"
                className="
                  cf-chip
                  flex items-center gap-2
                  rounded-lg bg-white
                  border border-black/5
                  px-2.5 py-2.5
                  shadow-[0_4px_16px_rgba(0,0,0,0.05)]
                  min-w-0
                "
              >
                <div className="cf-icon-chip w-8 h-8 shrink-0 rounded-lg bg-amber-100 flex items-center justify-center">
                  <FiMail className="text-amber-600 text-xs" />
                </div>
                <div className="min-w-0">
                  <p className="cf-label text-[9.5px] uppercase tracking-[0.1em] text-gray-400 font-bold leading-none">
                    {t("contact.emailLabel")}
                  </p>
                  <p className="cf-value text-[11.5px] font-bold text-black whitespace-nowrap mt-1">
                    info@tareeqk.ae
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div
            data-aos="fade-left"
            data-aos-delay="150"
            className="
              cf-form-card
              relative
              overflow-hidden
              rounded-[21px]
              border border-white/40
              bg-white/95
              backdrop-blur-xl
              shadow-[0_30px_80px_rgba(0,0,0,0.06)]
              p-4 md:p-5
              w-full max-w-lg
              mx-auto lg:mx-0
            "
          >
            {/* Subtle Gradient */}
            <div
              className="
                cf-form-glow
                absolute inset-0
                bg-gradient-to-br
                from-white
                to-amber-50/40
                pointer-events-none
              "
            />

            <div className="relative z-10">
              
              {/* Header */}
              <div className="mb-5">
                <span
                  className="
                    cf-eyebrow
                    inline-flex items-center gap-1
                    rounded-full
                    bg-amber-100/80
                    px-3 py-1
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-amber-800
                    mb-2
                  "
                >
                  <FiSend className="text-[10px]" />
                  {t("contact.formEyebrow")}
                </span>

                <h3
                  className="
                    cf-heading
                    text-lg md:text-xl
                    font-black
                    tracking-tight
                    text-black
                  "
                >
                  {t("contact.formHeading")}
                </h3>

                <p className="cf-desc mt-2 text-sm leading-6 text-gray-600 max-w-lg">
                  {t("contact.formDescription")}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <FormStatusBanner status={status} onDismiss={() => setStatus(null)} />

                {/* Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* Name */}
                  <div>
                    <label
                      className="
                        cf-label
                        block mb-1
                        text-[10px]
                        uppercase
                        tracking-[0.18em]
                        font-bold
                        text-gray-400
                      "
                    >
                      {t("contact.nameLabel")}
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t("contact.namePlaceholder")}
                      className={`${fieldClass("name")} h-11`}
                    />
                    {fieldErrors.name && (
                      <p className="cf-field-error mt-1 text-xs text-red-600">{fieldErrors.name}</p>
                    )}
                  </div>

                  {/* Mobile */}
                  <div>
                    <label
                      className="
                        cf-label
                        block mb-1
                        text-[10px]
                        uppercase
                        tracking-[0.18em]
                        font-bold
                        text-gray-400
                      "
                    >
                      {t("contact.mobileLabel")}
                    </label>

                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                      minLength={8}
                      placeholder={t("contact.mobilePlaceholder")}
                      className={`${fieldClass("mobile")} h-11`}
                    />
                    {fieldErrors.mobile && (
                      <p className="cf-field-error mt-1 text-xs text-red-600">{fieldErrors.mobile}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    className="
                      cf-label
                      block mb-1
                      text-[10px]
                      uppercase
                      tracking-[0.18em]
                      font-bold
                      text-gray-400
                    "
                  >
                    {t("contact.emailFieldLabel")}
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder={t("contact.emailPlaceholder")}
                    className={`${fieldClass("email")} h-11`}
                  />
                  {fieldErrors.email && (
                    <p className="cf-field-error mt-1 text-xs text-red-600">{fieldErrors.email}</p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label
                    className="
                      cf-label
                      block mb-1
                      text-[10px]
                      uppercase
                      tracking-[0.18em]
                      font-bold
                      text-gray-400
                    "
                  >
                    {t("contact.subjectLabel")}
                  </label>

                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder={t("contact.subjectPlaceholder")}
                    className={`${fieldClass("subject")} h-11`}
                  />
                  {fieldErrors.subject && (
                    <p className="cf-field-error mt-1 text-xs text-red-600">{fieldErrors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    className="
                      cf-label
                      block mb-1
                      text-[10px]
                      uppercase
                      tracking-[0.18em]
                      font-bold
                      text-gray-400
                    "
                  >
                    {t("contact.messageLabel")}
                  </label>

                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder={t("contact.messagePlaceholder")}
                    className={`${fieldClass("message")} h-auto resize-none py-3`}
                  />
                  {fieldErrors.message && (
                    <p className="cf-field-error mt-1 text-xs text-red-600">{fieldErrors.message}</p>
                  )}
                </div>

                {/* CTA */}
                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={loading}
                    className="
                      cf-submit-btn
                      group
                      relative
                      overflow-hidden
                      w-full sm:w-auto
                      h-11
                      px-5
                      rounded-xl
                      bg-black
                      text-white
                      font-bold
                      text-sm
                      tracking-wide
                      inline-flex items-center justify-center gap-2
                      transition-all duration-300
                      hover:bg-amber-500
                      hover:text-black
                      hover:-translate-y-0.5
                      hover:shadow-2xl
                      hover:shadow-amber-500/20
                      disabled:opacity-60
                      disabled:cursor-not-allowed
                    "
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {t("contact.sendingButton")}
                      </>
                    ) : (
                      <>
                        {t("contact.sendButton")}

                        <FiSend
                          className="
                            text-sm
                            transition-transform duration-300
                            group-hover:translate-x-0.5
                            rtl:group-hover:-translate-x-0.5
                          "
                        />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}