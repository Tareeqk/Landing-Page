import axios from "axios";
import React, { useState } from "react";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
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
        alert("Message sent successfully!");

        setFormData({
          name: "",
          mobile: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        alert(response.data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="mb-10">
          <span className="text-[var(--secondary-dark-bg)] text-base sm:text-lg md:text-xl tracking-wide pb-1 border-b-2 border-[var(--primary-light-gray)] inline-block span-titles mb-4">
            {t("contactForm.getInTouch")}
          </span>

          <h2 className="text-3xl md:text-5xl font-semibold text-black mb-3">
            {t("contactForm.title")}
          </h2>

          <p className="text-gray-500 max-w-xl">
            {t("contactForm.description")}
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6 items-start">
          {/* LEFT SIDE */}
          <div className="space-y-4">
            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-gray-200 bg-white p-5">
                <div className="w-11 h-11 rounded-xl bg-yellow-100 flex items-center justify-center mb-3">
                  <FiPhone className="text-yellow-500 text-lg" />
                </div>

                <p className="text-sm text-gray-500 mb-1">
                  Phone
                </p>

                <p className="text-black font-medium text-sm">
                  +971 50 123 4567
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-5">
                <div className="w-11 h-11 rounded-xl bg-yellow-100 flex items-center justify-center mb-3">
                  <FiMail className="text-yellow-500 text-lg" />
                </div>

                <p className="text-sm text-gray-500 mb-1">
                  Email
                </p>

                <p className="text-black font-medium text-sm break-all">
                  info@company.com
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-5">
                <div className="w-11 h-11 rounded-xl bg-yellow-100 flex items-center justify-center mb-3">
                  <FiMapPin className="text-yellow-500 text-lg" />
                </div>

                <p className="text-sm text-gray-500 mb-1">
                  Location
                </p>

                <p className="text-black font-medium text-sm">
                  Dubai, UAE
                </p>
              </div>
            </div>

            {/* Google Map */}
            <div className="overflow-hidden rounded-3xl border border-gray-200 h-[260px]">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115858.87908559368!2d55.188538!3d25.276987"
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* RIGHT SIDE - FORM */}
          <div className="rounded-3xl border border-gray-200 bg-white p-5 md:p-6">
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-black mb-2">
                Send a Message
              </h3>

              <p className="text-gray-500 text-sm">
                Fill out the form and our team will get back to
                you shortly.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("contactForm.fields.name")}
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-2xl border border-gray-300 bg-white outline-none focus:border-yellow-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("contactForm.fields.mobile")}
                  </label>

                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    placeholder="+971xxxxxxxxx"
                    className="w-full px-4 py-3 rounded-2xl border border-gray-300 bg-white outline-none focus:border-yellow-500 transition"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("contactForm.fields.email")}
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@email.com"
                  className="w-full px-4 py-3 rounded-2xl border border-gray-300 bg-white outline-none focus:border-yellow-500 transition"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("contactForm.fields.subject")}
                </label>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-2xl border border-gray-300 bg-white outline-none focus:border-yellow-500 transition"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("contactForm.fields.message")}
                </label>

                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Write your message..."
                  className="w-full px-4 py-3 rounded-2xl border border-gray-300 bg-white outline-none focus:border-yellow-500 transition resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-2xl bg-[var(--primary-yellow)] hover:bg-[var(--seconday-yellow)] text-white font-medium transition-all duration-300 disabled:opacity-70 cursor-pointer"
              >
                {loading
                  ? "Sending..."
                  : t("contactForm.button")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}