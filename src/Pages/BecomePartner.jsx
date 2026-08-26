import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import {
  BadgeCheck,
  Building2,
  Clock,
  FileCheck2,
  Handshake,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Smartphone,
  TrendingUp,
  Users,
} from "lucide-react";
import HreflangTags from "../Components/HreflangTags";
import PartnerForm from "../Components/PartnerForm";
import useLangLink from "../hooks/useLangLink";

// A warm team photo instead of another truck shot -- the truck already
// appears throughout the rest of the site, and this page is selling a
// business partnership, so a welcoming, people-first image fits better.
const HERO_IMAGE = "/new/partner-teamwork.webp";

function useBecomePartnerStyles() {
  useEffect(() => {
    if (document.getElementById("bp-page-styles")) return;
    const style = document.createElement("style");
    style.id = "bp-page-styles";
    style.textContent = `
      .bp-page-root { background-color: #f7f7f3; }

      /* ── Benefit strip: grid on desktop, scroll-snap on mobile so it
         reads as an interactive swipe row instead of another stacked
         block of cards ── */
      .bp-benefit-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1rem;
      }
      @media (max-width: 900px) {
        .bp-benefit-grid {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          gap: 0.75rem;
          padding-bottom: 0.5rem;
          margin: 0 -1rem;
          padding-inline: 1rem;
        }
        .bp-benefit-grid::-webkit-scrollbar { display: none; }
        .bp-benefit-card {
          flex: 0 0 78%;
          scroll-snap-align: start;
        }
      }
      @media (max-width: 480px) {
        .bp-benefit-card { flex-basis: 85%; }
      }

      /* ── Step rail: vertical connector line on desktop, horizontal
         numbered strip on mobile ── */
      .bp-step-rail { position: relative; }
      .bp-step-rail::before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        inset-inline-start: 19px;
        width: 2px;
        background: repeating-linear-gradient(to bottom, rgba(247,178,5,0.4) 0, rgba(247,178,5,0.4) 6px, transparent 6px, transparent 12px);
      }
      @media (max-width: 900px) {
        .bp-step-rail { display: flex; overflow-x: auto; gap: 1.25rem; padding-bottom: 0.25rem; }
        .bp-step-rail::before { display: none; }
        .bp-step-rail::-webkit-scrollbar { display: none; }
        .bp-step-item { flex: 0 0 220px; }
      }

      body.dark .bp-page-root { background-color: var(--dark-bg-main, #121212) !important; }
      body.dark .bp-surface {
        background-color: var(--dark-bg-surface, #1c1c1c) !important;
        border-color: var(--dark-border, #2a2a2a) !important;
      }
      body.dark .bp-heading { color: var(--dark-text-main, #e4e7eb) !important; }
      body.dark .bp-desc { color: var(--dark-text-muted, #aaa) !important; }
      body.dark .bp-chip {
        background-color: var(--dark-bg-surface, #1c1c1c) !important;
        border-color: var(--dark-border, #2a2a2a) !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      const el = document.getElementById("bp-page-styles");
      if (el) el.remove();
    };
  }, []);
}

export default function BecomePartner() {
  const { t } = useTranslation();
  const { lang } = useParams();
  const langLink = useLangLink();
  useBecomePartnerStyles();

  const benefitIcons = [TrendingUp, ShieldCheck, Users, Clock];
  const benefits = t("partnerForm.benefits.items", { returnObjects: true, defaultValue: [] });

  const stepIcons = [FileCheck2, BadgeCheck, Handshake, Smartphone];
  const steps = t("partnerForm.steps.items", { returnObjects: true, defaultValue: [] });

  return (
    <>
      <Helmet>
        <meta name="robots" content="index, follow" />
        <title>{t("meta.becomePartner.title")}</title>
        <meta name="description" content={t("meta.becomePartner.description")} />
        <link rel="canonical" href={`https://tareeqk.ae/${lang}/become-a-partner`} />
      </Helmet>
      <HreflangTags path="become-a-partner" />

      <div className="bp-page-root">
        {/* ── HERO ─────────────────────────────────────────────────────
            One full-bleed photo with the copy laid over it, rather than a
            separate text block stacked above a separate image block -- on
            a phone that's one compact section instead of two full-width
            ones stacked end to end. */}
        <section className="relative isolate flex min-h-[420px] items-end overflow-hidden bg-[#0c0c0c] sm:min-h-[460px] lg:min-h-[520px] lg:items-center">
          <img
            src={HERO_IMAGE}
            alt={t("partnerForm.hero.imageAlt")}
            className="absolute inset-0 -z-10 h-full w-full object-cover"
            loading="eager"
            fetchpriority="high"
          />
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/75 to-black/25 lg:bg-gradient-to-r lg:from-black/93 lg:via-black/70 lg:to-black/15"
            aria-hidden="true"
          />

          <div className="container relative z-10 mx-auto max-w-7xl px-4 pb-9 pt-24 sm:pb-11 lg:py-14">
            <div className="max-w-xl" data-aos="fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">
                <Building2 className="h-3.5 w-3.5" />
                {t("partnerForm.hero.eyebrow")}
              </span>

              <h1 className="mt-3.5 text-2xl font-black leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
                {t("partnerForm.hero.title")}
              </h1>

              <p className="mt-3 max-w-lg text-sm leading-6 text-white/70 sm:text-base sm:leading-7">
                {t("partnerForm.hero.description")}
              </p>

              {/* Side by side even on a small phone -- two full-width
                  stacked buttons here would eat most of the hero's height */}
              <div className="mt-5 flex flex-row flex-wrap gap-2.5">
                <a
                  href="#apply"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[var(--primary-yellow)] px-5 text-sm font-bold text-black shadow-[0_10px_30px_rgba(247,178,5,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(247,178,5,0.45)]"
                >
                  {t("partnerForm.hero.applyCta")}
                </a>
                <a
                  href={`${langLink("/")}#become-driver-partner`}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/20 px-5 text-sm font-semibold text-white/85 backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/10 hover:text-white"
                >
                  {t("partnerForm.hero.driverCta")}
                </a>
              </div>

              {/* Quick stats */}
              <div className="mt-6 grid max-w-sm grid-cols-3 gap-3 border-t border-white/15 pt-4">
                <div>
                  <p className="text-lg font-black text-white sm:text-xl">24/7</p>
                  <p className="mt-0.5 text-[10px] uppercase tracking-wide text-white/50">
                    {t("partnerForm.hero.stat1")}
                  </p>
                </div>
                <div>
                  <p className="text-lg font-black text-white sm:text-xl">UAE</p>
                  <p className="mt-0.5 text-[10px] uppercase tracking-wide text-white/50">
                    {t("partnerForm.hero.stat2")}
                  </p>
                </div>
                <div>
                  <p className="text-lg font-black text-white sm:text-xl">{t("partnerForm.hero.stat3Value")}</p>
                  <p className="mt-0.5 text-[10px] uppercase tracking-wide text-white/50">
                    {t("partnerForm.hero.stat3")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Floating badge -- sits on the photo itself instead of adding
              another stacked block */}
          <div
            className="absolute bottom-4 end-4 z-10 hidden items-center gap-2.5 rounded-2xl border border-white/10 bg-[#141414]/90 px-3.5 py-2.5 shadow-[0_16px_40px_rgba(0,0,0,0.4)] backdrop-blur-md sm:flex sm:end-6 sm:bottom-6"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {/* <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-400/15">
              <ShieldCheck className="h-4.5 w-4.5 text-amber-400" />
            </div> */}
            {/* <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/50">
                {t("partnerForm.hero.badgeLabel")}
              </p>
              <p className="text-sm font-bold text-white">{t("partnerForm.hero.badgeValue")}</p>
            </div> */}
          </div>
        </section>

        {/* ── BENEFITS ─────────────────────────────────────────────── */}
        <section className="relative z-10 -mt-7 pb-4 sm:-mt-9 lg:-mt-11">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="bp-benefit-grid">
              {benefits.map((item, i) => {
                const Icon = benefitIcons[i % benefitIcons.length];
                return (
                  <div
                    key={i}
                    data-aos="fade-up"
                    data-aos-delay={i * 80}
                    className="bp-benefit-card bp-surface rounded-2xl border border-black/5 bg-white p-4 shadow-[0_16px_50px_rgba(0,0,0,0.08)]"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100">
                      <Icon className="h-4.5 w-4.5 text-amber-600" />
                    </div>
                    <h3 className="bp-heading mt-3 text-sm font-bold text-black">{item.title}</h3>
                    <p className="bp-desc mt-1.5 text-[13px] leading-5 text-gray-500">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── PROCESS + FORM ───────────────────────────────────────── */}
        <section className="py-10 sm:py-12 lg:py-14">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
              {/* Steps */}
              <div data-aos="fade-right">
                <span className="inline-flex items-center rounded-full border border-amber-300/60 bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-800">
                  {t("partnerForm.steps.eyebrow")}
                </span>
                <h2 className="bp-heading mt-3 text-xl font-black tracking-tight text-black sm:text-2xl">
                  {t("partnerForm.steps.heading")}
                </h2>
                <p className="bp-desc mt-2.5 max-w-md text-sm leading-6 text-gray-600">
                  {t("partnerForm.steps.description")}
                </p>

                <div className="bp-step-rail mt-6">
                  {steps.map((item, i) => {
                    const Icon = stepIcons[i % stepIcons.length];
                    return (
                      <div key={i} className="bp-step-item relative flex gap-4 pb-6 last:pb-0">
                        <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[var(--primary-yellow)] bg-white">
                          <Icon className="h-4.5 w-4.5 text-amber-600" />
                        </div>
                        <div className="pt-1">
                          <h3 className="bp-heading text-sm font-bold text-black">{item.title}</h3>
                          <p className="bp-desc mt-1 text-[13px] leading-5 text-gray-500">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Direct contact chips */}
                <div className="mt-6 flex flex-wrap gap-2.5">
                  <a
                    href="tel:+97142232269"
                    className="bp-chip flex items-center gap-2 rounded-xl border border-black/5 bg-white px-4 py-3 shadow-[0_4px_16px_rgba(0,0,0,0.05)]"
                  >
                    <Phone className="h-4 w-4 text-amber-600" />
                    <span dir="ltr" className="text-sm font-semibold text-black">+971 4 223 2269</span>
                  </a>
                  <a
                    href="mailto:info@tareeqk.ae"
                    className="bp-chip flex items-center gap-2 rounded-xl border border-black/5 bg-white px-4 py-3 shadow-[0_4px_16px_rgba(0,0,0,0.05)]"
                  >
                    <Mail className="h-4 w-4 text-amber-600" />
                    <span className="text-sm font-semibold text-black">info@tareeqk.ae</span>
                  </a>
                  <div className="bp-chip flex items-center gap-2 rounded-xl border border-black/5 bg-white px-4 py-3 shadow-[0_4px_16px_rgba(0,0,0,0.05)]">
                    <MapPin className="h-4 w-4 text-amber-600" />
                    <span className="text-sm font-semibold text-black">{t("contact.headquartersValue")}</span>
                  </div>
                </div>
              </div>

              {/* Form */}
              <PartnerForm />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
