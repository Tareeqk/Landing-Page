import {React, useEffect }from "react";
import { useLocation, useParams } from "react-router-dom";
import Navbar from "./../Components/Navbar";
import Footer from "./../Components/Footer";
import LandingPage from "./LandingPage";
import AboutPreview from "../Components/AboutComponent";
import ServiceComponent from "../Components/ServiceComponent";
import HowItWorks from "../Components/Howitworks";
 
import AboutAccordion from "../Components/AboutAccordion";
// import HowItWorks from "./Service";
import CJI from "../Components/CJI";
import HomeFAQ from "../Components/HomeFAQ";
import ContactForm from "../Components/ContactForm";
import PriceGroup from "../Components/PriceGroup";
import Registration from "./Registration";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import LocalBusinessSchema from "../schemas/LocalBusinessSchema";

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
        <link rel="canonical" href={`https://tareeqk.ae/${lang}`} />
      </Helmet>
      <LocalBusinessSchema />
      <div>
        <LandingPage />
         <AboutPreview />
        <CJI />
       
        {/* <AboutAccordion /> */}
        <ServiceComponent /> 
        <HowItWorks />
        {/* <HowItWorks isSection /> */}
        {/* <Registration />
        <PriceGroup /> */}
        <HomeFAQ />
        <ContactForm />
      </div>
    </>
  )
}
