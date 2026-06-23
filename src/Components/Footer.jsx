import React from "react"
import {
  FaInstagram,
  FaFacebookF,
  FaXTwitter,
  FaYoutube,
  FaLinkedinIn,
  FaPhone,
  FaEnvelope,
  FaLocationDot,
  FaArrowRight,
  FaClock,
  FaShieldHalved,
  FaStar,
  FaBolt,
} from "react-icons/fa6"

import { Link, useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import useLangLink from "../hooks/useLangLink"

export const SERVICES = [
  { title: "Car Recovery Dubai", href: "/car-recovery-dubai" },
  { title: "Towing Service Dubai", href: "/towing-service-dubai" },
  { title: "Battery Jump Start", href: "/battery-service-dubai" },
  { title: "Flat Tyre Repair", href: "/flat-tyre-repair-dubai" },
  { title: "Accident Recovery", href: "/accident-recovery-dubai" },
]

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
    <FaArrowRight size={8} style={{ flexShrink: 0, opacity: 0.5 }} />
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

const TRUST = [
  { icon: <FaClock />, label: "24/7 Support" },
  { icon: <FaShieldHalved />, label: "RTA Licensed" },
  { icon: <FaStar />, label: "4.9 Rating" },
  { icon: <FaBolt />, label: "Fast Response" },
]

const SOCIALS = [
  { icon: <FaInstagram />, href: "https://www.instagram.com/tareeqk.ae/" },
  { icon: <FaFacebookF />, href: "https://www.facebook.com/tareeqk.ae" },
  { icon: <FaXTwitter />, href: "https://x.com/Tareeqkportal" },
  { icon: <FaYoutube />, href: "https://www.youtube.com/@tareeqk" },
  { icon: <FaLinkedinIn />, href: "https://www.linkedin.com/company/tareeqk" },
]

const Footer = () => {
  const { t } = useTranslation()
  const langLink = useLangLink()

  return (
    <footer className="tk-footer">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap');

        .tk-footer * {
          font-family: 'Inter', sans-serif;
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
              />

              <p className="tk-brand-desc">
                Professional roadside assistance and car recovery services
                across Dubai. Available 24/7 with fast response times and
                licensed recovery operators.
              </p>

              <div className="tk-trust-grid">
                {TRUST.map(item => (
                  <div key={item.label} className="tk-trust-badge">
                    <span className="tk-trust-icon">{item.icon}</span>
                    {item.label}
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
              <h3 className="tk-col-heading">Services</h3>
              {SERVICES.map(service => (
                <FooterLink key={service.href} href={langLink(service.href)}>
                  {service.title}
                </FooterLink>
              ))}
            </div>

            {/* LOCATIONS */}
            <div>
              <h3 className="tk-col-heading">Areas We Cover</h3>
              <div className="area-grid">
                {AREAS.map(area => (
                  <AreaLink key={area.href} href={langLink(area.href)}>
                    {area.label}
                  </AreaLink>
                ))}
              </div>
            </div>

            {/* CONTACT */}
            <div>
              <h3 className="tk-col-heading">Contact</h3>

              <div className="tk-contact-list">
                <a href="tel:+97142232269" className="tk-contact-item">
                  <FaPhone className="tk-contact-icon" />
                  +971 4 223 2269
                </a>

                <a href="mailto:info@tareeqk.ae" className="tk-contact-item">
                  <FaEnvelope className="tk-contact-icon" />
                  info@tareeqk.ae
                </a>

                <a
                  href="https://maps.app.goo.gl/HpvPEWRRbhwuMpGx9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tk-contact-item"
                >
                  <FaLocationDot className="tk-contact-icon" />
                  <span>{t("footer.contact.address")}</span>
                </a>
              </div>

              <a href="tel:+97180082773375" className="tk-cta-btn">
                <FaPhone />
                Emergency Call
              </a>

              <div className="tk-legal-links">
                <Link to={langLink("/privacy-policy")} className="tk-legal-link">
                  Privacy Policy
                </Link>
                <Link to={langLink("/terms")} className="tk-legal-link">
                  Terms
                </Link>
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
            © {new Date().getFullYear()} Tareeqk. All rights reserved.
          </span>
          <span className="tk-footer-bottom-brand">
            Car Recovery & Roadside Assistance in Dubai
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer