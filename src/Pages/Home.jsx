import React from "react";
import Navbar from "./../Components/Navbar";
import Footer from "./../Components/Footer";
import LandingPage from "./LandingPage";
import AboutUs from "./About";
 
import AboutAccordion from "../Components/AboutAccordion";
import HowItWorks from "./Service";
import CJI from "../Components/CJI";
import ContactForm from "../Components/ContactForm";
import PriceGroup from "../Components/PriceGroup";
import Registration from "./Registration";

export default function Home() {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <meta name="robots" content="index, follow" />
        <title>{t("meta.home.title")}</title>
        <meta name="description" content={t("meta.home.description")} />
      </Helmet>
      <div>
        <LandingPage />
        <CJI />
        {/* <AboutUs isSection /> */}
        <AboutAccordion />
        {/* <HowItWorks isSection /> */}
        <Registration />
        <PriceGroup />
        <ContactForm />
      </div>
    </>
  )
}
