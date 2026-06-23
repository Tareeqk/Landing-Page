import { useEffect, useState } from "react"
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react"
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline"
import { useLocation, Link, useParams } from "react-router-dom"
import DarkMode from "./DarkMode"
import LanguageSwitcher from "./LanguageSwitcher"
import { useTranslation } from "react-i18next"
import { HashLink } from "react-router-hash-link"
import useLangLink from "../hooks/useLangLink"
import { SERVICES } from "./Footer"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function Navbar({ isDark, setIsDark }) {
  const location = useLocation()
  const { lang } = useParams()
  const { t } = useTranslation()
  const langLink = useLangLink()

  const barePath = lang
    ? location.pathname.replace(`/${lang}`, "")
    : location.pathname

  // Glass header gains a solid backdrop + soft shadow once the page scrolls,
  // so it stays legible over a hero photo without looking heavy at the top.
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Expand/collapse state for the Services accordion inside the mobile drawer.
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)

  const serviceLinks = SERVICES.map((service) => ({
    label: service.title,
    href: langLink(service.href),
  }))

  const navigation = [
    { name: t("navbar.home"), href: langLink("/"), current: barePath === "/" },
    {
      name: t("navbar.about"),
      href: langLink("/about"),
      current: barePath === "/about",
    },
    {
      name: t("navbar.service"),
      href: langLink("/service"),
      current:
        barePath === "/service" ||
        SERVICES.some((service) => barePath === service.href),
      dropdown: serviceLinks,
    },
    {
      name: t("navbar.blogs"),
      href: langLink("/blogs"),
      current: barePath === "/blogs",
    },
    { name: t("navbar.contact"), href: langLink("/#contact") },
  ]

  return (
    <div
      className={classNames(
        "fixed top-0 left-0 w-full z-50 backdrop-blur-xl transition-all duration-300",
        isDark ? "bg-[#0b0d10]/90" : "bg-white/90",
        scrolled
          ? isDark
            ? "shadow-[0_8px_30px_rgba(0,0,0,0.35)] border-b border-white/[0.06]"
            : "shadow-[0_8px_30px_rgba(0,0,0,0.08)] border-b border-black/5"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <Disclosure as="nav" className="relative">
          {({ open, close }) => {
            // Collapse the mobile services accordion whenever the drawer closes.
            useEffect(() => {
              if (!open) setMobileServicesOpen(false)
            }, [open])

            return (
              <>
                <div className="flex h-16 sm:h-20 items-center justify-between">
                    {/* Left section */}
                    <div className="flex items-center gap-2">
                      {/* Mobile menu button */}
                      <div className="flex lg:hidden">
                        <DisclosureButton
                          className={classNames(
                            "inline-flex items-center justify-center rounded-full p-2.5 transition-colors",
                            isDark
                              ? "text-white/80 hover:text-white hover:bg-white/10"
                              : "text-gray-700 hover:text-gray-900 hover:bg-black/5",
                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-yellow)]",
                          )}
                        >
                          <span className="sr-only">
                            {open ? "Close main menu" : "Open main menu"}
                          </span>
                          {open ? (
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          ) : (
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                          )}
                        </DisclosureButton>
                      </div>

                      {/* Logo */}
                      <Link to={langLink("/")} className="flex items-center">
                        <img
                          src={isDark ? "/new/LogoW.webp" : "/new/Logo.webp"}
                          alt="Towing service in Dubai"
                          className="h-8 sm:h-10 w-auto transition-transform duration-300 hover:scale-105"
                          loading="lazy"
                        />
                      </Link>
                    </div>

                    {/* Center section - Desktop Navigation */}
                    <div className="hidden lg:flex mx-4 flex-1 justify-center">
                      <div className="flex items-center gap-1">
                        {navigation.map((item) => {
                          const linkClasses = classNames(
                            "relative flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 whitespace-nowrap",
                            item.current && !item.dropdown
                              ? "text-black bg-[var(--primary-yellow)] shadow-md"
                              : isDark
                                ? "text-white/75 hover:text-white hover:bg-white/10"
                                : "text-gray-700 hover:text-black hover:bg-black/5",
                          )

                          const underline = (!item.current || item.dropdown) && (
                            <span
                              className={classNames(
                                "absolute left-1/2 bottom-1 h-0.5 -translate-x-1/2 rounded-full bg-[var(--primary-yellow)] transition-all duration-300",
                                item.current && item.dropdown
                                  ? "w-8"
                                  : "w-0 group-hover:w-8",
                              )}
                              aria-hidden="true"
                            />
                          )

                          // Services gets its own wrapper so hovering the trigger
                          // OR the panel below it keeps the dropdown open.
                          if (item.dropdown) {
                            return (
                              <div key={item.name} className="relative group">
                                <Link
                                  to={item.href}
                                  onClick={() => window.scrollTo(0, 0)}
                                  className={linkClasses}
                                >
                                  {item.name}
                                  <ChevronDownIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180" />
                                  {underline}
                                </Link>

                                <div
                                  className={classNames(
                                    "absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3",
                                    "opacity-0 invisible -translate-y-1",
                                    "transition-all duration-200",
                                    "group-hover:opacity-100 group-hover:visible group-hover:translate-y-0",
                                  )}
                                >
                                  <div
                                    className={classNames(
                                      "w-64 rounded-2xl border p-2 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.15)]",
                                      isDark
                                        ? "bg-[#0b0d10]/95 border-white/10"
                                        : "bg-white/95 border-black/5",
                                    )}
                                  >
                                    {item.dropdown.map((sub) => (
                                      <Link
                                        key={sub.href}
                                        to={sub.href}
                                        onClick={() => window.scrollTo(0, 0)}
                                        className={classNames(
                                          "flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                                          isDark
                                            ? "text-white/75 hover:bg-white/10 hover:text-white"
                                            : "text-gray-600 hover:bg-black/5 hover:text-black",
                                        )}
                                      >
                                        <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--primary-yellow)]" />
                                        {sub.label}
                                      </Link>
                                    ))}

                                    <Link
                                      to={item.href}
                                      onClick={() => window.scrollTo(0, 0)}
                                      className="mt-1 flex items-center justify-center rounded-xl bg-[var(--primary-yellow)] px-4 py-2.5 text-sm font-semibold text-black transition-transform duration-300 hover:scale-[1.02]"
                                    >
                                      View all services
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            )
                          }

                          return (
                            <div key={item.name} className="relative group">
                              {item.name === t("navbar.contact") ? (
                                <HashLink to={item.href} className={linkClasses}>
                                  {item.name}
                                  {underline}
                                </HashLink>
                              ) : (
                                <Link
                                  onClick={() => window.scrollTo(0, 0)}
                                  to={item.href}
                                  className={linkClasses}
                                >
                                  {item.name}
                                  {underline}
                                </Link>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Right section */}
                    <div className="flex items-center gap-2 sm:gap-3 relative">
                      <div
                        className={classNames(
                          "flex items-center gap-1 rounded-full p-1",
                          isDark ? "bg-white/10" : "bg-black/5",
                        )}
                      >
                        <div className="relative z-50">
                          <LanguageSwitcher />
                        </div>
                        <DarkMode isDark={isDark} setIsDark={setIsDark} />
                      </div>
                      <Link
                        to={langLink("/login")}
                        className="hidden lg:inline-flex items-center gap-2 rounded-full bg-[var(--primary-yellow)] px-5 py-2.5 text-sm font-semibold text-black shadow-md transition-all duration-300 hover:scale-105"
                      >
                        <ArrowRightOnRectangleIcon className="h-4 w-4" />
                        {t("navbar.login", "Login")}
                      </Link>
                    </div>
                  </div>

                  {/* Gradient accent line, only once the header has a backdrop */}
                  {scrolled && (
                    <div
                      className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[var(--primary-yellow)] to-transparent"
                      aria-hidden="true"
                    />
                  )}

                  {/* Mobile Menu */}
                  <DisclosurePanel
                    className={classNames(
                      "lg:hidden absolute left-0 right-0 top-full origin-top",
                      "rounded-b-2xl border-t backdrop-blur-xl shadow-2xl",
                      isDark
                        ? "bg-[#0b0d10]/95 border-white/[0.06]"
                        : "bg-white/95 border-black/5",
                    )}
                  >
                    <div className="flex flex-col gap-1 px-4 py-4">
                      {navigation.map((item) => {
                        const itemClasses = classNames(
                          "flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all duration-300",
                          item.current && !item.dropdown
                            ? "text-[#111] bg-[var(--primary-yellow)]"
                            : item.current && item.dropdown
                              ? isDark
                                ? "text-[var(--primary-yellow)] bg-white/5"
                                : "text-[var(--primary-yellow)] bg-black/[0.03]"
                              : isDark
                                ? "text-white/80 hover:bg-white/8"
                                : "text-gray-700 hover:bg-black/5",
                        )

                        if (item.dropdown) {
                          return (
                            <div key={item.name} className="flex flex-col">
                              <div className={itemClasses}>
                                <Link
                                  to={item.href}
                                  onClick={() => {
                                    window.scrollTo(0, 0)
                                    close()
                                  }}
                                  className="flex-1"
                                >
                                  {item.name}
                                </Link>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setMobileServicesOpen((prev) => !prev)
                                  }
                                  aria-label="Toggle services list"
                                  aria-expanded={mobileServicesOpen}
                                  className="-mr-1 rounded-full p-1.5 transition-colors hover:bg-black/10"
                                >
                                  <ChevronDownIcon
                                    className={classNames(
                                      "h-4 w-4 transition-transform duration-300",
                                      mobileServicesOpen && "rotate-180",
                                    )}
                                  />
                                </button>
                              </div>

                              {mobileServicesOpen && (
                                <div className="flex flex-col gap-1 py-1 pl-4">
                                  {item.dropdown.map((sub) => (
                                    <Link
                                      key={sub.href}
                                      to={sub.href}
                                      onClick={() => {
                                        window.scrollTo(0, 0)
                                        close()
                                      }}
                                      className={classNames(
                                        "flex items-center gap-2.5 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                                        isDark
                                          ? "text-white/70 hover:bg-white/10 hover:text-white"
                                          : "text-gray-600 hover:bg-black/5 hover:text-black",
                                      )}
                                    >
                                      <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--primary-yellow)]" />
                                      {sub.label}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          )
                        }

                        return item.name === t("navbar.contact") ? (
                          <HashLink
                            key={item.name}
                            to={item.href}
                            onClick={() => close()}
                            className={itemClasses}
                          >
                            {item.name}
                          </HashLink>
                        ) : (
                          <Link
                            key={item.name}
                            to={item.href}
                            onClick={() => {
                              window.scrollTo(0, 0)
                              close()
                            }}
                            className={itemClasses}
                          >
                            {item.name}
                          </Link>
                        )
                      })}

                      <div
                        className={classNames(
                          "mt-2 pt-3 border-t",
                          isDark ? "border-white/[0.08]" : "border-black/5",
                        )}
                      >
                        <Link
                          to={langLink("/login")}
                          onClick={() => close()}
                          className="flex items-center justify-center gap-2 rounded-xl bg-[var(--primary-yellow)] px-4 py-3 text-sm font-semibold text-black transition-transform duration-300 hover:scale-[1.02]"
                        >
                          <ArrowRightOnRectangleIcon className="h-4 w-4" />
                          {t("navbar.login", "Login")}
                        </Link>
                      </div>
                    </div>
                  </DisclosurePanel>
                </>
              )
            }}
          </Disclosure>
        </div>
      </div>
  )
}