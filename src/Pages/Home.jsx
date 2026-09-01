import { React, useEffect, lazy, Suspense } from "react";
import { useLocation, useParams } from "react-router-dom";
import LandingPage from "./LandingPage";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import LocalBusinessSchema from "../schemas/LocalBusinessSchema";
import HreflangTags from "../Components/HreflangTags";

// Everything below the hero is off-screen on first paint and the page is
// prerendered (see scripts/prerender.mjs) — the static HTML for these
// sections is already on screen before React ever loads, so lazy-loading
// their component code costs no visible flash but keeps it out of the
// bundle that has to be parsed/executed before the page is interactive.
const AboutPreview = lazy(() => import("../Components/AboutComponent"));
const CJI = lazy(() => import("../Components/CJI"));
const ServiceComponent = lazy(() => import("../Components/ServiceComponent"));
const HowItWorks = lazy(() => import("../Components/Howitworks"));
const BecomeDriverPartner = lazy(() => import("../Components/BecomeDriverPartner"));
const HomeFAQ = lazy(() => import("../Components/HomeFAQ"));
const ContactForm = lazy(() => import("../Components/ContactForm"));

export default function Home() {
  const { t } = useTranslation();
  const { lang } = useParams();
   const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);

      if (element) {
        setTimeout(() => {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }
    }
  }, [location]);


  return (
    <>
      <Helmet>
        <meta name="robots" content="index, follow" />
        <title>{t("meta.home.title")}</title>
        <meta name="description" content={t("meta.home.description")} />
        <link rel="canonical" href={`https://tareeqk.ae/${lang}/`} />
        {/* The hero skyline background (LandingPage's HeroBackground) is
            the measured LCP element on this page — Lighthouse's LCP
            discovery check flagged it as not getting priority-hinted.
            This gets the browser fetching it before it even reaches the
            <img> tag while parsing the (prerendered, so already-present)
            HTML. Scoped to just the homepage via Helmet rather than a
            static index.html link — every other route would preload an
            image it never uses. */}
        <link rel="preload" as="image" href="/hero/dubai-bg.webp" fetchpriority="high" />
      </Helmet>
      <HreflangTags path="" />
      <LocalBusinessSchema />
      <div>
        <LandingPage />
        <Suspense fallback={null}>
          <AboutPreview />
          <CJI />
          <ServiceComponent />
          <HowItWorks />
          <BecomeDriverPartner />
          <HomeFAQ />
          <ContactForm />
        </Suspense>
      </div>
    </>
  )
}
