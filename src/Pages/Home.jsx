import React from "react";
import Navbar from "./../Components/Navbar";
import Footer from "./../Components/Footer";
import LandingPage from "./LandingPage";
import AboutUs from "./About";
import { DownloadApps } from "../Components/DownloadApps";
import AboutAccordion from "../Components/AboutAccordion";
import HowItWorks from "./Service";
import CJI from "../Components/CJI";
import ContactForm from "../Components/ContactForm";
import PriceGroup from "../Components/PriceGroup";
import Registration from "./Registration";
import { Helmet } from "react-helmet-async";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>car recovery in dubai</title>
        <meta
          name="description"
          content="Tareeqk offers fast and reliable 24/7 car recovery and roadside assistance in Dubai. Book now or download our app."
        />
        <meta
          name="keywords"
          content="Car recovery in Dubai, سحب السيارات في دبي,
            Best car recovery in Dubai, أفضل خدمة سحب سيارات في دبي,
            Roadside assistance in Dubai, خدمة المساعدة على الطريق في دبي,
            Desert car recovery service in Dubai, خدمة سحب السيارات في صحراء دبي,
            Car recovery service in Dubai, خدمة سحب السيارات في دبي,
            Tareeqk, Vehicle towing Dubai, Emergency car towing UAE"
          />
      </Helmet>
      <div>
        <LandingPage />
        <CJI />
        <AboutUs isSection />
        <AboutAccordion />
        <HowItWorks isSection />
        <Registration />
        <PriceGroup />
        <ContactForm />
      </div>
    </>
  );
}
