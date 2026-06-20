import axios from "axios";
import React, { useState } from "react";
import {
  FiMail,
  FiMapPin,
  FiPhone,
  FiSend,
} from "react-icons/fi";
import { useTranslation } from "react-i18next";

export default function ContactSection() {
  const { t } = useTranslation();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [loading, setLoading] = useState(false);

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const params = new URLSearchParams();

      params.append("name", formData.name);
      params.append("email", formData.email);
      params.append("phone", formData.mobile);
      params.append("subject", formData.subject);
      params.append("message", formData.message);
      params.append("dial_code", "+971");
      params.append("submit", "true");

      const response = await axios.post(
        `${baseUrl}/contact-us`,
        params
      );

      if (response.data.status === 200) {
        alert(t("contact.successAlert"));

        setFormData({
          name: "",
          mobile: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        alert(response.data.message || t("contact.genericErrorAlert"));
      }
    } catch (error) {
      console.error(error);
      alert(t("contact.errorAlert"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="
        relative overflow-hidden
        bg-[#f7f7f3]
        w-full
        py-10 lg:py-10
      "
    >
      {/* Ambient Background */}
      <div className="absolute top-[-78px] end-[-78px] w-[221px] h-[221px] bg-amber-200/30 blur-3xl rounded-full" />

      <div className="absolute bottom-[-98px] start-[-78px] w-[195px] h-[195px] bg-orange-100/40 blur-3xl rounded-full" />

      <div className="container relative z-10 mx-auto px-4 max-w-7xl">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[6fr_5fr] gap-5 xl:gap-6 items-stretch">
          
          {/* LEFT SIDE */}
          <div className="flex flex-col gap-4">
            
            {/* Heading */}
            <div className="max-w-md">
              <span
                className="
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
                  text-xl md:text-2xl
                  font-black
                  tracking-tight
                  text-black
                  leading-tight
                "
              >
                {t("contact.heading")}
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                {t("contact.description")}
              </p>
            </div>

            {/* MAP */}
            <div
              className="
                relative
                overflow-hidden
                rounded-[21px]
                min-h-[338px]
                border border-white/40
                shadow-[0_30px_80px_rgba(0,0,0,0.08)]
                bg-white
              "
            >
              {/* Floating Contact Cards */}
              <div
                className="
                  absolute bottom-3 start-3 end-3 z-20
                  grid grid-cols-1 sm:grid-cols-2 gap-2
                "
              >
                {/* Phone */}
                <div
                  className="
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
                      w-7 h-7 shrink-0
                      rounded-lg
                      bg-amber-100
                      flex items-center justify-center
                    "
                  >
                    <FiPhone className="text-amber-600 text-sm" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-gray-400 font-bold">
                      {t("contact.phoneLabel")}
                    </p>

                    <a
                      href="tel:+97142232269"
                      className="
                        text-sm font-semibold text-black
                        hover:text-amber-600
                        transition-colors
                        block mt-1
                      "
                    >
                      +971 4 223 2269
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div
                  className="
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
                      w-7 h-7 shrink-0
                      rounded-lg
                      bg-amber-100
                      flex items-center justify-center
                    "
                  >
                    <FiMail className="text-amber-600 text-sm" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-gray-400 font-bold">
                      {t("contact.emailLabel")}
                    </p>

                    <a
                      href="mailto:info@tareeqk.ae"
                      className="
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
          </div>

          {/* RIGHT SIDE */}
          <div
            className="
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
                    text-lg md:text-xl
                    font-black
                    tracking-tight
                    text-black
                  "
                >
                  {t("contact.formHeading")}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600 max-w-lg">
                  {t("contact.formDescription")}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                
                {/* Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* Name */}
                  <div>
                    <label
                      className="
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
                      className="
                        w-full h-9
                        rounded-xl
                        border border-gray-100
                        bg-white
                        px-3
                        text-sm text-black
                        shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]
                        outline-none
                        transition-all duration-300
                        focus:border-amber-400
                        focus:ring-4
                        focus:ring-amber-100/60
                      "
                    />
                  </div>

                  {/* Mobile */}
                  <div>
                    <label
                      className="
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
                      className="
                        w-full h-9
                        rounded-xl
                        border border-gray-100
                        bg-white
                        px-3
                        text-sm text-black
                        shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]
                        outline-none
                        transition-all duration-300
                        focus:border-amber-400
                        focus:ring-4
                        focus:ring-amber-100/60
                      "
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    className="
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
                    className="
                      w-full h-9
                      rounded-xl
                      border border-gray-100
                      bg-white
                      px-3
                      text-sm text-black
                      shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]
                      outline-none
                      transition-all duration-300
                      focus:border-amber-400
                      focus:ring-4
                      focus:ring-amber-100/60
                    "
                  />
                </div>

                {/* Subject */}
                <div>
                  <label
                    className="
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
                    className="
                      w-full h-9
                      rounded-xl
                      border border-gray-100
                      bg-white
                      px-3
                      text-sm text-black
                      shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]
                      outline-none
                      transition-all duration-300
                      focus:border-amber-400
                      focus:ring-4
                      focus:ring-amber-100/60
                    "
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    className="
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
                    className="
                      w-full
                      rounded-xl
                      border border-gray-100
                      bg-white
                      px-3 py-3
                      text-sm text-black
                      resize-none
                      shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]
                      outline-none
                      transition-all duration-300
                      focus:border-amber-400
                      focus:ring-4
                      focus:ring-amber-100/60
                    "
                  />
                </div>

                {/* CTA */}
                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={loading}
                    className="
                      group
                      relative
                      overflow-hidden
                      w-full sm:w-auto
                      h-9
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