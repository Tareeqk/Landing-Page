import { useEffect, useState } from "react";
import { FiBriefcase, FiFileText, FiMail, FiPhone, FiSend, FiUser } from "react-icons/fi";
import { useTranslation } from "react-i18next";

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
    `;
    document.head.appendChild(style);
    return () => {
      const el = document.getElementById("pf-form-styles");
      if (el) el.remove();
    };
  }, []);
}

const FIELD_ICON_CLASS = "pf-icon pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 text-amber-500";

export default function PartnerForm({ id = "apply" }) {
  const { t } = useTranslation();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  usePartnerFormStyles();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    contactName: "",
    companyName: "",
    email: "",
    phone: "",
    tradeLicenseNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // POST /api/v1/partner-applications -- same {success, data}/{success,
      // error} envelope as /api/v1/contact-us (see ContactForm.jsx). Phone
      // is sent as typed rather than prefixed with +971 like the contact
      // form does -- fleets/vendors applying here may be registering from
      // outside the UAE, so the field takes a full international number.
      const response = await fetch(`${baseUrl}/api/v1/partner-applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact_name: formData.contactName,
          company_name: formData.companyName,
          email: formData.email,
          phone: formData.phone,
          trade_license_number: formData.tradeLicenseNumber || null,
        }),
      });
      const data = await response.json();

      if (data.success) {
        alert(t("partnerForm.form.successAlert"));
        setFormData({
          contactName: "",
          companyName: "",
          email: "",
          phone: "",
          tradeLicenseNumber: "",
        });
      } else {
        alert(data.error?.message || t("partnerForm.form.genericErrorAlert"));
      }
    } catch (error) {
      console.error(error);
      alert(t("partnerForm.form.errorAlert"));
    } finally {
      setLoading(false);
    }
  };

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
                  className="pf-input w-full h-12 rounded-xl border border-gray-100 bg-white ps-10 pe-3 text-sm text-black shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] outline-none transition-all duration-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100/60"
                />
              </div>
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
                  className="pf-input w-full h-12 rounded-xl border border-gray-100 bg-white ps-10 pe-3 text-sm text-black shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] outline-none transition-all duration-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100/60"
                />
              </div>
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
                  className="pf-input w-full h-12 rounded-xl border border-gray-100 bg-white ps-10 pe-3 text-sm text-black shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] outline-none transition-all duration-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100/60"
                />
              </div>
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
                  className="pf-input w-full h-12 rounded-xl border border-gray-100 bg-white ps-10 pe-3 text-sm text-black shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] outline-none transition-all duration-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100/60"
                />
              </div>
            </div>
          </div>

          {/* Trade license -- optional, called out explicitly in the UI */}
          <div>
            <label className="pf-label mb-1.5 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] font-bold text-gray-400">
              {t("partnerForm.form.licenseLabel")}
              <span className="pf-optional-tag rounded-full bg-gray-100 px-1.5 py-0.5 text-[9px] normal-case tracking-normal text-gray-400">
                {t("partnerForm.form.optionalTag")}
              </span>
            </label>
            <div className="relative">
              <FiFileText className={FIELD_ICON_CLASS} />
              <input
                type="text"
                name="tradeLicenseNumber"
                value={formData.tradeLicenseNumber}
                onChange={handleChange}
                placeholder={t("partnerForm.form.licensePlaceholder")}
                className="pf-input w-full h-12 rounded-xl border border-gray-100 bg-white ps-10 pe-3 text-sm text-black shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] outline-none transition-all duration-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100/60"
              />
            </div>
          </div>

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
