import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, Building2, CheckCircle2, Truck } from "lucide-react";
import { DownloadApps } from "./DownloadApps";
import useLangLink from "../hooks/useLangLink";

const DRIVER_IMAGE = "/new/driver-app-mockup.png";
// A warm, people-first shot rather than a truck photo -- this card is
// selling a business partnership, and a smiling handshake reads as more
// welcoming here than another vehicle image (the truck already appears
// throughout the rest of the site).
const PARTNER_IMAGE = "/new/partner-highfive.webp";

function useBdpStyles() {
  useEffect(() => {
    if (document.getElementById("bdp-styles")) return;
    const style = document.createElement("style");
    style.id = "bdp-styles";
    style.textContent = `
      .bdp-card { transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease, border-color 0.25s ease; }
      .bdp-card:hover { transform: translateY(-6px); box-shadow: 0 26px 60px rgba(0,0,0,0.10); }

      /* DownloadApps renders its two store badges at a fixed w-65 (260px)
         each in a row -- fine in the old full-width layout it was
         designed for, but the driver card's text column now only gets
         the left ~64% of the card (the rest is reserved for the
         background phone image, see the card markup below), so two
         badges side by side no longer fit until the column itself is
         wide enough (the lg+ 2-up grid). Scoped to this card only, by
         id, so every other DownloadApps placement on the site is
         untouched. */
      .bdp-card #download-buttons { flex-direction: column; align-items: stretch; gap: 0.5rem; }
      .bdp-card #download-buttons img { width: 100%; }
      @media (min-width: 1024px) {
        .bdp-card #download-buttons { flex-direction: row; align-items: center; gap: 0.75rem; }
        .bdp-card #download-buttons img { width: 148px; }
      }

      body.dark .bdp-section { background-color: var(--dark-bg-muted, #1a1a1a) !important; }
      body.dark .bdp-eyebrow {
        background-color: rgba(247,178,5,0.14) !important;
        border-color: rgba(247,178,5,0.3) !important;
        color: var(--primary-yellow, #f7b205) !important;
      }
      body.dark .bdp-heading { color: var(--dark-text-main, #e4e7eb) !important; }
      body.dark .bdp-desc { color: var(--dark-text-muted, #aaa) !important; }
      body.dark .bdp-card {
        background-color: var(--dark-bg-surface, #1c1c1c) !important;
        border-color: var(--dark-border, #2a2a2a) !important;
      }
      body.dark .bdp-bullet { color: var(--dark-text-muted, #aaa) !important; }
      body.dark .bdp-card-title { color: var(--dark-text-main, #e4e7eb) !important; }

      /* The background-image fade layers are baked as literal white
         gradients (Tailwind's white/amber tokens don't have a dark
         counterpart) -- retint them to the dark card surface color so
         they still dissolve the image into the card instead of leaving
         a bright white patch over a dark card. */
      body.dark .bdp-fade-driver {
        background-image: linear-gradient(to right, #1c1c1c 0%, #1c1c1c 56%, rgba(28,28,28,0.78) 68%, rgba(28,28,28,0.25) 82%, transparent 96%) !important;
      }
      html[dir="rtl"] body.dark .bdp-fade-driver {
        background-image: linear-gradient(to left, #1c1c1c 0%, #1c1c1c 56%, rgba(28,28,28,0.78) 68%, rgba(28,28,28,0.25) 82%, transparent 96%) !important;
      }
      body.dark .bdp-fade-partner-v { background-image: linear-gradient(to bottom, transparent, rgba(28,28,28,0.7), #1c1c1c) !important; }
      body.dark .bdp-fade-partner-h { background-image: linear-gradient(to right, #1c1c1c, rgba(28,28,28,0.55), transparent) !important; }
      html[dir="rtl"] body.dark .bdp-fade-partner-h { background-image: linear-gradient(to left, #1c1c1c, rgba(28,28,28,0.55), transparent) !important; }
    `;
    document.head.appendChild(style);
    return () => {
      const el = document.getElementById("bdp-styles");
      if (el) el.remove();
    };
  }, []);
}

export default function BecomeDriverPartner() {
  const { t } = useTranslation();
  const langLink = useLangLink();
  useBdpStyles();

  const [activeTab, setActiveTab] = useState("driver");

  const driverBullets = t("becomeDriverPartner.driver.bullets", { returnObjects: true, defaultValue: [] });
  const partnerBullets = t("becomeDriverPartner.partner.bullets", { returnObjects: true, defaultValue: [] });

  return (
    <section
      id="become-driver-partner"
      className="bdp-section relative overflow-hidden bg-white py-10 sm:py-12 lg:py-14"
    >
      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        {/* Heading */}
        <div className="mx-auto max-w-xl text-center" data-aos="fade-up">
          <span className="bdp-eyebrow inline-flex items-center rounded-full border border-amber-300/60 bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-800">
            {t("becomeDriverPartner.eyebrow")}
          </span>
          <h2 className="bdp-heading mt-3 text-xl font-black tracking-tight text-black sm:text-2xl md:text-3xl">
            {t("becomeDriverPartner.heading")}
          </h2>
          <p className="bdp-desc mt-2 text-sm leading-6 text-gray-600">
            {t("becomeDriverPartner.description")}
          </p>
        </div>

        {/* Mobile tab switcher -- two full cards stacked plainly on a phone
            read as a wall of scroll; a switcher lets the visitor flip
            between the two paths instead of just scrolling past one. */}
        <div className="mx-auto mt-6 flex max-w-xs rounded-full border border-black/5 bg-gray-50 p-1 lg:hidden">
          {["driver", "partner"].map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key)}
              className={`min-h-11 flex-1 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide transition-all duration-300 ${
                activeTab === key ? "bg-black text-white shadow" : "text-gray-500"
              }`}
            >
              {t(`becomeDriverPartner.${key}.tabLabel`)}
            </button>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 lg:mt-8 lg:grid-cols-2 lg:gap-6">
          {/* ── Become a Driver ─────────────────────────────────────── */}
          <div
            data-aos="fade-right"
            className={`bdp-card relative overflow-hidden rounded-[20px] border border-black/5 bg-white shadow-[0_16px_44px_rgba(0,0,0,0.06)] ${
              activeTab === "driver" ? "block" : "hidden lg:block"
            }`}
          >
            {/* Bold Tareeqk treatment: the portrait phone mockup lives as
                a full-height background layer bleeding off the card's end
                edge instead of sitting boxed above the text. A warm amber
                glow ties it to the brand, and a white fade dissolves the
                image into the text column so copy stays readable no
                matter what's behind it -- image and text share the same
                layer instead of being stacked in separate blocks. */}
            <div
              className="pointer-events-none absolute end-2 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-amber-400/25 blur-3xl sm:end-4 sm:h-40 sm:w-40"
              aria-hidden="true"
            />
            <img
              src={DRIVER_IMAGE}
              alt={t("becomeDriverPartner.driver.imageAlt")}
              className="pointer-events-none absolute inset-y-0 end-0 h-full w-[60%] object-contain object-right drop-shadow-[0_20px_30px_rgba(0,0,0,0.18)] sm:w-[52%] rtl:object-left"
              loading="lazy"
            />
            <div
              className="bdp-fade-driver pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#fff_0%,#fff_56%,rgba(255,255,255,0.78)_68%,rgba(255,255,255,0.25)_82%,transparent_96%)] rtl:bg-[linear-gradient(to_left,#fff_0%,#fff_56%,rgba(255,255,255,0.78)_68%,rgba(255,255,255,0.25)_82%,transparent_96%)]"
              aria-hidden="true"
            />

            <div className="relative z-10 pt-4 pb-4 ps-4 pe-[36%] sm:pt-5 sm:pb-5 sm:ps-5 sm:pe-[32%]">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100">
                  <Truck className="h-4 w-4 text-amber-600" />
                </span>
                <h3 className="bdp-card-title text-base font-black text-black sm:text-lg">
                  {t("becomeDriverPartner.driver.title")}
                </h3>
              </div>

              <p className="bdp-desc mt-2.5 text-sm leading-6 text-gray-600">
                {t("becomeDriverPartner.driver.description")}
              </p>

              <ul className="mt-3 space-y-1.5">
                {driverBullets.map((bullet, i) => (
                  <li key={i} className="bdp-bullet flex items-start gap-2 text-[13px] leading-5 text-gray-600">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className="mt-4 border-t border-dashed border-black/10 pt-4">
                <p className="bdp-desc mb-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-gray-400">
                  {t("becomeDriverPartner.driver.downloadLabel")}
                </p>
                <DownloadApps type="driver" />
              </div>
            </div>
          </div>

          {/* ── Become a Partner ────────────────────────────────────── */}
          <div
            data-aos="fade-left"
            data-aos-delay="120"
            className={`bdp-card relative overflow-hidden rounded-[20px] border border-black/5 bg-white shadow-[0_16px_44px_rgba(0,0,0,0.06)] ${
              activeTab === "partner" ? "block" : "hidden lg:block"
            }`}
          >
            {/* Bold Tareeqk treatment: the landscape partner photo spans
                the card's upper-right as a background layer, fading down
                and toward the badge/heading corner into solid white --
                same "image lives on the content layer" language as the
                driver card, adapted for a landscape source instead of
                forcing it into the same portrait-card template. */}
            <img
              src={PARTNER_IMAGE}
              alt={t("becomeDriverPartner.partner.imageAlt")}
              className="pointer-events-none absolute inset-x-0 top-0 h-[58%] w-full object-cover object-[68%_35%] sm:h-[52%] rtl:object-[32%_35%]"
              loading="lazy"
            />
            <div
              className="bdp-fade-partner-v pointer-events-none absolute inset-x-0 top-0 h-[58%] bg-gradient-to-b from-transparent via-white/70 to-white sm:h-[52%]"
              aria-hidden="true"
            />
            <div
              className="bdp-fade-partner-h pointer-events-none absolute inset-x-0 top-0 h-[42%] bg-gradient-to-r from-white via-white/55 to-transparent sm:h-[38%] rtl:bg-gradient-to-l rtl:from-white rtl:via-white/55 rtl:to-transparent"
              aria-hidden="true"
            />

            <div className="relative z-10 p-4 sm:p-5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/60 bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-amber-800 shadow-sm">
                <Building2 className="h-3 w-3" />
                {t("becomeDriverPartner.partner.tabLabel")}
              </span>

              <h3 className="bdp-card-title mt-2.5 text-base font-black text-black sm:text-lg">
                {t("becomeDriverPartner.partner.title")}
              </h3>

              <p className="bdp-desc mt-2.5 text-sm leading-6 text-gray-600">
                {t("becomeDriverPartner.partner.description")}
              </p>

              <ul className="mt-3 space-y-1.5">
                {partnerBullets.map((bullet, i) => (
                  <li key={i} className="bdp-bullet flex items-start gap-2 text-[13px] leading-5 text-gray-600">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className="mt-4 border-t border-dashed border-black/10 pt-4">
                <Link
                  to={langLink("/become-a-partner")}
                  onClick={() => window.scrollTo(0, 0)}
                  className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-black text-sm font-bold text-white transition-all duration-300 hover:bg-amber-500 hover:text-black hover:-translate-y-0.5 hover:shadow-xl hover:shadow-amber-500/20 sm:w-auto sm:px-6"
                >
                  {t("becomeDriverPartner.partner.cta")}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
