import React, { useState } from "react"
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  ChevronDown,
  Clock,
  ShieldCheck,
  Star,
  Zap,
} from "lucide-react"

import { Link, useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import useLangLink from "../hooks/useLangLink"
import { openCookieSettings } from "../utils/cookieConsent"

// Social brand marks are inlined instead of pulled from react-icons — this
// component renders on every page via MainLayout, so it's always in the
// critical bundle. Path data copied verbatim from react-icons/fa6 so each
// mark stays pixel-identical, just without the library's cost.
function BrandIcon({ viewBox, d, ...props }) {
  return (
    <svg viewBox={viewBox} fill="currentColor" aria-hidden="true" {...props}>
      <path d={d} />
    </svg>
  )
}
const FaInstagram = (props) => <BrandIcon viewBox="0 0 448 512" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" {...props} />
const FaFacebookF = (props) => <BrandIcon viewBox="0 0 320 512" d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" {...props} />
const FaXTwitter = (props) => <BrandIcon viewBox="0 0 512 512" d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" {...props} />
const FaYoutube = (props) => <BrandIcon viewBox="0 0 576 512" d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" {...props} />
const FaLinkedinIn = (props) => <BrandIcon viewBox="0 0 448 512" d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" {...props} />

// `title` here is the English fallback (also used by Navbar, which imports
// this array directly) — Footer's own render pulls the translated label
// from footer.services by index instead of using .title.
export const SERVICES = [
  { title: "Car Recovery Dubai", href: "/car-recovery-dubai" },
  { title: "Battery Jump Start", href: "/battery-service-dubai" },
  { title: "Flat Tyre Repair", href: "/flat-tyre-repair-dubai" },
  { title: "Desert Recovery Dubai", href: "/desert-recovery-dubai" },
  { title: "Bike Recovery Dubai", href: "/bike-recovery-dubai" },
  { title: "Towing Service Dubai", href: "/towing-service-dubai" },
  { title: "Accident Recovery", href: "/accident-recovery-dubai" },
]

// Area/city names are intentionally not translated — proper nouns stay
// in English across all locales.
const AREAS = [
  { label: "Dubai Marina", href: "/car-recovery-dubai-marina" },
  { label: "Business Bay", href: "/car-recovery-business-bay" },
  { label: "Downtown Dubai", href: "/car-recovery-downtown-dubai" },
  { label: "Deira", href: "/car-recovery-deira" },
  { label: "Bur Dubai", href: "/car-recovery-bur-dubai" },
  { label: "Al Barsha", href: "/car-recovery-al-barsha" },
  { label: "Jumeirah", href: "/car-recovery-jumeirah" },
  { label: "JVC", href: "/car-recovery-jvc" },
  { label: "JLT", href: "/car-recovery-jlt" },
  { label: "Dubai Silicon Oasis", href: "/car-recovery-dubai-silicon-oasis" },
  { label: "International City", href: "/car-recovery-international-city" },
  { label: "Dubai Investment Park", href: "/car-recovery-dubai-investment-park" },
  { label: "Dubai Sports City", href: "/car-recovery-dubai-sports-city" },
  { label: "Motor City", href: "/car-recovery-motor-city" },
  { label: "Mirdif", href: "/car-recovery-mirdif" },
  { label: "Al Qusais", href: "/car-recovery-al-qusais" },
  { label: "Al Quoz", href: "/car-recovery-al-quoz" },
  { label: "Jebel Ali", href: "/car-recovery-jebel-ali" },
  { label: "Palm Jumeirah", href: "/car-recovery-palm-jumeirah" },
]

const AreaLink = ({ href, children }) => (
  <a
    href={href}
    className="area-link"
  >
    <ArrowRight size={8} style={{ flexShrink: 0, opacity: 0.5 }} />
    <span>{children}</span>
  </a>
)

const FooterLink = ({ to, href, external, children }) => {
  const sharedProps = { className: "footer-nav-link" }

  if (href || external) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        {...sharedProps}
      >
        <span className="footer-link-dot" />
        {children}
      </a>
    )
  }

  return (
    <Link to={to} onClick={() => window.scrollTo(0, 0)} {...sharedProps}>
      <span className="footer-link-dot" />
      {children}
    </Link>
  )
}

// Labels come from footer.trust (i18n) by index — see the render below.
const TRUST_ICONS = [<Clock />, <ShieldCheck />, <Star />, <Zap />]

const SOCIALS = [
  { icon: <FaInstagram />, href: "https://www.instagram.com/tareeqk.ae/" },
  { icon: <FaFacebookF />, href: "https://www.facebook.com/share/1Dv6SMaQx1/?mibextid=wwXIfr" },
  { icon: <FaXTwitter />, href: "https://x.com/Tareeqkportal" },
  { icon: <FaYoutube />, href: "https://www.youtube.com/@tareeqk" },
  { icon: <FaLinkedinIn />, href: "https://www.linkedin.com/company/tareeqk-portal/posts/?feedView=all" },
]

const Footer = () => {
  const { t } = useTranslation()
  const langLink = useLangLink()

  // Services/Areas collapse to accordions on mobile only — CSS forces them
  // open at desktop widths regardless of this state, so it only matters
  // below the 640px breakpoint where all four columns stack and the full
  // list of links otherwise makes the footer very long.
  const [openSections, setOpenSections] = useState({ services: false, areas: false })
  const toggleSection = (key) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }))

  const trustLabels = t("footer.trust", { returnObjects: true, defaultValue: [] })
  const serviceLabels = t("footer.services", { returnObjects: true, defaultValue: [] })

  return (
    <footer className="tk-footer">
      <style>{`
        .tk-footer * {
          font-family: 'Poppins', sans-serif;
          box-sizing: border-box;
        }

        /* ─── ROOT ─── */
        .tk-footer {
          background: #070707;
          color: #fff;
          border-top: 1px solid rgba(245,166,35,0.15);
          position: relative;
          overflow: hidden;
        }

        /* Subtle radial glow behind logo area */
        .tk-footer::before {
          content: '';
          position: absolute;
          top: -120px;
          left: -80px;
          width: 480px;
          height: 480px;
          background: radial-gradient(circle, rgba(245,166,35,0.07) 0%, transparent 70%);
          pointer-events: none;
        }

        /* ─── DIVIDER LINE ─── */
        .tk-footer-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(245,166,35,0.25), rgba(255,255,255,0.06), transparent);
          margin: 0;
        }

        /* ─── TOP BAND ─── */
        .tk-footer-top {
          padding: 60px 0 56px;
        }

        .tk-footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* ─── GRID ─── */
        .tk-footer-grid {
          display: grid;
          grid-template-columns: 1.35fr 0.8fr 1.6fr 0.95fr;
          gap: 52px;
          align-items: start;
        }

        /* ─── BRAND COL ─── */
        .tk-brand-logo {
          height: 40px;
          margin-bottom: 22px;
          display: block;
        }

        .tk-brand-desc {
          color: #9ca3af;
          font-size: 13.5px;
          line-height: 1.85;
          max-width: 320px;
          margin-bottom: 28px;
        }

        /* Trust badges */
        .tk-trust-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 28px;
        }

        .tk-trust-badge {
          display: flex;
          align-items: center;
          gap: 9px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(245,166,35,0.12);
          border-radius: 12px;
          padding: 12px 13px;
          font-size: 12.5px;
          color: #d1d5db;
          transition: border-color 0.2s;
        }

        .tk-trust-badge:hover {
          border-color: rgba(245,166,35,0.35);
        }

        .tk-trust-icon {
          color: #f5a623;
          flex-shrink: 0;
          font-size: 13px;
        }

        .tk-trust-icon svg {
          width: 16px;
          height: 16px;
        }

        /* Socials */
        .tk-socials {
          display: flex;
          gap: 9px;
          flex-wrap: wrap;
        }

        .tk-social-btn {
          width: 40px;
          height: 40px;
          border-radius: 11px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          text-decoration: none;
          font-size: 14px;
          transition: background 0.22s, border-color 0.22s, transform 0.22s, color 0.22s;
        }

        .tk-social-btn svg {
          width: 16px;
          height: 16px;
        }

        .tk-social-btn:hover {
          background: #f5a623;
          border-color: #f5a623;
          color: #000;
          transform: translateY(-3px);
        }

        /* ─── COLUMN HEADINGS ─── */
        .tk-col-heading {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #f5a623;
          margin: 0 0 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .tk-col-heading::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(245,166,35,0.2);
        }

        /* ─── NAV LINKS ─── */
        .footer-nav-link {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: #9ca3af;
          font-size: 13.5px;
          margin-bottom: 13px;
          transition: color 0.18s, transform 0.18s;
        }

        .footer-nav-link:hover {
          color: #fff;
          transform: translateX(4px);
        }

        .footer-link-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #f5a623;
          flex-shrink: 0;
          opacity: 0.55;
          transition: opacity 0.18s;
        }

        .footer-nav-link:hover .footer-link-dot {
          opacity: 1;
        }

        /* ─── ACCORDION (Services/Areas headings become toggles below
           640px; forced open above it so desktop is unaffected) ─── */
        .tk-accordion-toggle {
          width: 100%;
          background: none;
          border: 0;
          padding: 0;
          font-family: inherit;
          text-align: left;
          cursor: pointer;
        }

        html[dir="rtl"] .tk-accordion-toggle {
          text-align: right;
        }

        .tk-accordion-chevron {
          display: none;
          flex-shrink: 0;
          transition: transform 0.25s ease;
        }

        .tk-accordion-toggle[aria-expanded="true"] .tk-accordion-chevron {
          transform: rotate(180deg);
        }

        .tk-accordion-content {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.3s ease;
        }

        .tk-accordion-content.is-open {
          grid-template-rows: 1fr;
        }

        .tk-accordion-inner {
          overflow: hidden;
          min-height: 0;
        }

        @media (max-width: 640px) {
          .tk-accordion-toggle {
            cursor: pointer;
          }

          .tk-accordion-chevron {
            display: block;
          }
        }

        @media (min-width: 641px) {
          .tk-accordion-content {
            grid-template-rows: 1fr !important;
            transition: none;
          }
        }

        /* ─── AREA LINKS ─── */
        .area-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          column-gap: 14px;
        }

        .area-link {
          display: flex;
          align-items: center;
          gap: 7px;
          text-decoration: none;
          color: #9ca3af;
          font-size: 12.5px;
          line-height: 1.3;
          margin-bottom: 12px;
          transition: color 0.18s, transform 0.18s;
        }

        .area-link:hover {
          color: #f5a623;
          transform: translateX(3px);
        }

        /* ─── CONTACT COL ─── */
        .tk-contact-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 26px;
        }

        .tk-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          text-decoration: none;
          color: #d1d5db;
          font-size: 13.5px;
          line-height: 1.7;
          transition: color 0.18s;
        }

        .tk-contact-item:hover {
          color: #fff;
        }

        .tk-contact-icon {
          color: #f5a623;
          margin-top: 3px;
          flex-shrink: 0;
        }

        /* CTA button */
        .tk-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #f5a623;
          color: #000;
          text-decoration: none;
          padding: 13px 22px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 13.5px;
          letter-spacing: 0.01em;
          transition: transform 0.22s, box-shadow 0.22s;
          margin-bottom: 20px;
        }

        .tk-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(245,166,35,0.32);
        }

        .tk-legal-links {
          display: flex;
          gap: 16px;
        }

        .tk-legal-link {
          color: #6b7280;
          text-decoration: none;
          font-size: 12px;
          transition: color 0.18s;
        }

        .tk-legal-link:hover {
          color: #f5a623;
        }

        .tk-legal-link-btn {
          appearance: none;
          background: none;
          border: 0;
          padding: 0;
          /* font-family only, not the font shorthand -- that shorthand
             also resets font-size/weight/line-height to this button's own
             inherited value (its container's, not .tk-legal-link's own
             12px), which is what made "Cookie Settings" render visibly
             larger than the Privacy Policy/Terms links beside it despite
             sharing the same .tk-legal-link class. font-family alone still
             replaces the browser's default button font (the reason this
             rule exists) without touching size/weight. */
          font-family: inherit;
          cursor: pointer;
        }

        /* ─── BOTTOM BAR ─── */
        .tk-footer-bottom {
          padding: 20px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }

        .tk-footer-bottom-text {
          color: #4b5563;
          font-size: 12.5px;
        }

        .tk-footer-bottom-brand {
          color: #4b5563;
          font-size: 12.5px;
        }

        /* ─── RESPONSIVE ─── */
        @media (max-width: 1024px) {
          .tk-footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }
        }

        @media (max-width: 640px) {
          .tk-footer-top {
            padding: 44px 0 44px;
          }

          .tk-footer-grid {
            grid-template-columns: 1fr;
            gap: 36px;
          }

          .tk-trust-grid {
            grid-template-columns: 1fr 1fr;
          }

          .area-grid {
            grid-template-columns: 1fr 1fr;
          }

          .tk-footer-bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
          }

          .tk-col-heading::after {
            display: none;
          }
        }

        @media (max-width: 380px) {
          .area-grid {
            grid-template-columns: 1fr;
          }

          .tk-trust-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* ── TOP ── */}
      <div className="tk-footer-top">
        <div className="tk-footer-inner">
          <div className="tk-footer-grid">

            {/* BRAND */}
            <div>
              <img
                src="/new/LogoW.webp"
                alt="Tareeqk"
                className="tk-brand-logo"
                loading="lazy"
              />

              <p className="tk-brand-desc">
                {t("footer.description")}
              </p>

              <div className="tk-trust-grid">
                {TRUST_ICONS.map((icon, i) => (
                  <div key={i} className="tk-trust-badge">
                    <span className="tk-trust-icon">{icon}</span>
                    {trustLabels[i]}
                  </div>
                ))}
              </div>

              <div className="tk-socials">
                {SOCIALS.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="tk-social-btn"
                    aria-label="Social link"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* SERVICES */}
            <div>
              <button
                type="button"
                className="tk-col-heading tk-accordion-toggle"
                aria-expanded={openSections.services}
                aria-controls="footer-services-list"
                onClick={() => toggleSection("services")}
              >
                {t("footer.servicesTitle")}
                <ChevronDown className="tk-accordion-chevron" size={14} aria-hidden="true" />
              </button>
              <div
                id="footer-services-list"
                className={`tk-accordion-content${openSections.services ? " is-open" : ""}`}
              >
                <div className="tk-accordion-inner">
                  {SERVICES.map((service, i) => (
                    <FooterLink key={service.href} href={langLink(service.href)}>
                      {serviceLabels[i] || service.title}
                    </FooterLink>
                  ))}
                </div>
              </div>
            </div>

            {/* LOCATIONS — area/city names stay in English (proper nouns),
                only the column heading is translated. */}
            <div>
              <button
                type="button"
                className="tk-col-heading tk-accordion-toggle"
                aria-expanded={openSections.areas}
                aria-controls="footer-areas-list"
                onClick={() => toggleSection("areas")}
              >
                {t("footer.areasTitle")}
                <ChevronDown className="tk-accordion-chevron" size={14} aria-hidden="true" />
              </button>
              <div
                id="footer-areas-list"
                className={`tk-accordion-content${openSections.areas ? " is-open" : ""}`}
              >
                <div className="tk-accordion-inner">
                  <div className="area-grid">
                    {AREAS.map(area => (
                      <AreaLink key={area.href} href={langLink(area.href)}>
                        {area.label}
                      </AreaLink>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* CONTACT */}
            <div>
              <h3 className="tk-col-heading">{t("footer.contactTitle")}</h3>

              <div className="tk-contact-list">
                <a href="tel:+97142232269" className="tk-contact-item">
                  <Phone className="tk-contact-icon" />
                  <span dir="ltr">+971 4 223 2269</span>
                </a>

                <a href="mailto:info@tareeqk.ae" className="tk-contact-item">
                  <Mail className="tk-contact-icon" />
                  info@tareeqk.ae
                </a>

                <a
                  href="https://maps.app.goo.gl/HpvPEWRRbhwuMpGx9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tk-contact-item"
                >
                  <MapPin className="tk-contact-icon" />
                  <span>{t("footer.contact.address")}</span>
                </a>
              </div>

              <a href="tel:+97142232269" className="tk-cta-btn">
                <Phone />
                {t("footer.emergencyCall")}
              </a>

              <div className="tk-legal-links">
                <Link to={langLink("/privacy-policy")} className="tk-legal-link">
                  {t("footer.policies.links.privacy")}
                </Link>
                <Link to={langLink("/terms")} className="tk-legal-link">
                  {t("footer.policies.links.terms")}
                </Link>
                <button type="button" className="tk-legal-link tk-legal-link-btn" onClick={openCookieSettings}>
                  {t("footer.cookieSettings", "Cookie Settings")}
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="tk-footer-divider" />

      {/* ── BOTTOM ── */}
      <div className="tk-footer-inner">
        <div className="tk-footer-bottom">
          <span className="tk-footer-bottom-text">
            {t("footer.bottomCopyright", { year: new Date().getFullYear() })}
          </span>
          <span className="tk-footer-bottom-brand">
            {t("footer.bottomTagline")}
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer