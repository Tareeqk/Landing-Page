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
        <meta name="robots" content="index, follow" />
        <title>Car Recovery in Dubai </title>
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
