import React from 'react'
import Navbar from './../Components/Navbar';
import Footer from './../Components/Footer';
import LandingPage from './LandingPage';
import AboutUs from './About';
import { DownloadApps } from '../Components/DownloadApps';
import AboutAccordion from '../Components/AboutAccordion';
import HowItWorks from './Service';
import CJI from '../Components/CJI';
import ContactForm from '../Components/ContactForm';
import PriceGroup from '../Components/PriceGroup';
import Registration from './Registration';

export default function Home() {
  return (
    <>
      <LandingPage/>
      <CJI />
      <AboutUs />
      <AboutAccordion />
      <HowItWorks />
      <Registration />
      <PriceGroup />
      <ContactForm />
    </>
  )
}
