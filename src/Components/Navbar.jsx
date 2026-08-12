import { useEffect, useRef, useState } from "react"
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

  // Measure the actual rendered bar height instead of guessing at it via
  // Tailwind's h-16/sm:h-20 breakpoints, so the drawer/backdrop always
  // start exactly where the bar ends regardless of viewport width, zoom,
  // or font-loading-induced height shifts.
  const barRef = useRef(null)
  const [barHeight, setBarHeight] = useState(64)
  useEffect(() => {
    const el = barRef.current
    if (!el) return
    const update = () => setBarHeight(el.getBoundingClientRect().height)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Expand/collapse state for the Services accordion inside the mobile drawer.
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)

  // Labels come from footer.services (i18n) by index, same as Footer.jsx —
  // SERVICES itself keeps its English .title as the untranslated fallback.
  const serviceLabels = t("footer.services", { returnObjects: true, defaultValue: [] })
  const serviceLinks = SERVICES.map((service, i) => ({
    label: serviceLabels[i] || service.title,
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
    // `Disclosure` itself is the fixed, full-width shell now — NOT wrapped
    // in a `backdrop-blur-xl` ancestor. backdrop-filter (like transform)
    // establishes a new containing block for `position: fixed` descendants,
    // which was pinning the mobile backdrop/drawer to the ~70px-tall bar
    // instead of the viewport and collapsing them to nothing. The blur now
    // lives only on the inner bar div, which has no fixed descendants.
    <Disclosure as="nav" className="fixed top-0 left-0 w-full z-50">
      {({ open, close }) => {
        // Collapse the mobile services accordion whenever the drawer closes.
        useEffect(() => {
          if (!open) setMobileServicesOpen(false)
        }, [open])

        // Lock background scroll while the slide-in drawer is open.
        useEffect(() => {
          document.body.style.overflow = open ? "hidden" : ""
          return () => {
            document.body.style.overflow = ""
          }
        }, [open])

        return (
          <>
            {/* Bar — blur/background/shadow live here only */}
            <div
              ref={barRef}
              className={classNames(
                "relative backdrop-blur-xl transition-all duration-300",
                isDark ? "bg-[#0b0d10]/90" : "bg-white/90",
                scrolled
                  ? isDark
                    ? "shadow-[0_8px_30px_rgba(0,0,0,0.35)] border-b border-white/[0.06]"
                    : "shadow-[0_8px_30px_rgba(0,0,0,0.08)] border-b border-black/5"
                  : "border-b border-transparent",
              )}
            >
              <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
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
                          {open ? t("navbar.closeMenu", "Close main menu") : t("navbar.openMenu", "Open main menu")}
                        </span>
                        {open ? (
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        ) : (
                          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        )}
                      </DisclosureButton>
                    </div>

                    {/* Logo + live-dispatch pulse, echoes the "24/7 ·
                        Dispatching now" badge on the hero so the brand's
                        urgency signal follows you as you scroll */}
                    <Link to={langLink("/")} className="flex items-center gap-2.5">
                      {/* This mark is dark-on-transparent with no white
                          variant, so on the dark navbar it disappears into
                          the near-black background without a light backing
                          chip behind it. */}
                      <span
                        className={classNames(
                          "flex items-center justify-center rounded-xl transition-transform duration-300 hover:scale-105",
                          isDark ? "bg-white/95 p-1.5" : "",
                        )}
                      >
                        <img
                          src="/TAREEQK LOGO.webp"
                          alt="Tareeqk"
                          className="h-8 sm:h-9 w-auto"
                          loading="eager"
                          fetchpriority="high"
                        />
                      </span>
                     
                      <span
                        className={classNames(
                          "hidden md:inline-flex shrink-0 items-center gap-1 lg:gap-1.5 rounded-full border px-2 py-0.5 lg:px-2.5 lg:py-1 whitespace-nowrap",
                          isDark
                            ? "border-white/10 bg-white/5"
                            : "border-black/10 bg-black/5",
                        )}
                      >
                        <span className="relative flex h-1.5 w-1.5 shrink-0">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--primary-yellow)] opacity-75" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--primary-yellow)]" />
                        </span>
                        <span
                          className={classNames(
                            "text-[8.5px] lg:text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap",
                            isDark ? "text-white/60" : "text-gray-500",
                          )}
                        >
                          24/7 Dispatch
                        </span>
                      </span>
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
                      {/* Dark/light toggle — temporarily restricted to
                          light mode only. Hidden (not removed) at every
                          breakpoint so it can be re-shown later; the
                          isDark/setIsDark wiring stays untouched. */}
                      <span
                        className={classNames(
                          "hidden h-4 w-px",
                          isDark ? "bg-white/15" : "bg-black/10",
                        )}
                        aria-hidden="true"
                      />
                      <span className="hidden">
                        <DarkMode isDark={isDark} setIsDark={setIsDark} />
                      </span>
                    </div>
                    <a
                      href="https://booking.tareeqk.ae/login"
                      className="hidden lg:inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-black shadow-[0_8px_24px_rgba(247,178,5,0.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_30px_rgba(247,178,5,0.5)]"
                      style={{ background: "linear-gradient(135deg, var(--seconday-yellow), var(--primary-yellow))" }}
                    >
                      <ArrowRightOnRectangleIcon className="h-4 w-4" />
                      {t("landing.book", "Book Now")}
                    </a>
                  </div>
                </div>
              </div>

              {/* Dashed "road marking" accent instead of a plain gradient
                  line — small brand touch, only once the header has a
                  backdrop so it doesn't compete with the hero above it.
                  `absolute` (not `fixed`), so it's unaffected by the
                  containing-block issue described above. */}
              {scrolled && (
                <div
                  className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full opacity-70"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(90deg, var(--primary-yellow) 0px, var(--primary-yellow) 16px, transparent 16px, transparent 32px)",
                  }}
                  aria-hidden="true"
                />
              )}
            </div>

            {/* Backdrop — dims the page below the header while the drawer
                is open; stays mounted so opacity can transition both ways
                instead of popping in/out. Sibling of the bar div above, not
                a descendant, so its `fixed` positioning resolves against
                the viewport. `top`/`height` are the bar's measured height,
                not a guessed breakpoint value, so this always starts
                exactly where the bar ends. */}
            <div
              style={{ top: barHeight, height: `calc(100dvh - ${barHeight}px)` }}
              className={classNames(
                "lg:hidden fixed inset-x-0 z-40 bg-black/50 transition-opacity duration-500 ease-out",
                open ? "opacity-100" : "opacity-0 pointer-events-none",
              )}
              aria-hidden="true"
              onClick={close}
            />

            {/* Mobile Menu — slides in from the side (end edge: right in
                LTR, left in RTL) instead of dropping down from the top.
                `static` keeps it always mounted so the slide is driven
                directly off `open` with plain classes. Sized to its
                content (no bottom-0) instead of stretching to the full
                viewport height with empty space below the links. */}
            <DisclosurePanel
              static
              style={{ top: barHeight, maxHeight: `calc(100dvh - ${barHeight}px)` }}
              className={classNames(
                "lg:hidden fixed right-0 rtl:right-auto rtl:left-0 z-50",
                "w-[82%] max-w-sm overflow-y-auto",
                "border-l rtl:border-l-0 rtl:border-r rounded-bl-2xl rtl:rounded-bl-none rtl:rounded-br-2xl",
                isDark
                  ? "bg-[#0b0d10] border-white/[0.06]"
                  : "bg-white border-black/5",
                "shadow-2xl will-change-transform",
                "transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
                open
                  ? "translate-x-0"
                  : "translate-x-full rtl:-translate-x-full pointer-events-none",
              )}
            >
              <div className="flex flex-col gap-1 p-4">
                {navigation.map((item, i) => {
                  const itemClasses = classNames(
                    "flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all duration-300",
                    item.current && !item.dropdown
                      ? "text-black bg-[var(--primary-yellow)]"
                      : item.current && item.dropdown
                        ? isDark
                          ? "text-[var(--primary-yellow)] bg-white/5"
                          : "text-[var(--primary-yellow)] bg-black/[0.03]"
                        : isDark
                          ? "text-white/80 hover:bg-white/8"
                          : "text-gray-700 hover:bg-black/5",
                  )

                  // Cascade entrance: each item fades/slides in slightly
                  // after the last, only while opening — closing skips the
                  // stagger so the drawer feels snappy on the way out.
                  const itemMotion = {
                    className: classNames(
                      "transition-all duration-400 ease-out",
                      open ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4",
                    ),
                    style: { transitionDelay: open ? `${180 + i * 70}ms` : "0ms" },
                  }

                  if (item.dropdown) {
                    return (
                      <div
                        key={item.name}
                        style={itemMotion.style}
                        className={classNames(itemMotion.className, "flex flex-col")}
                      >
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
                      style={itemMotion.style}
                      className={classNames(itemMotion.className, itemClasses)}
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
                      style={itemMotion.style}
                      className={classNames(itemMotion.className, itemClasses)}
                    >
                      {item.name}
                    </Link>
                  )
                })}

                <div
                  style={{ transitionDelay: open ? `${180 + navigation.length * 70}ms` : "0ms" }}
                  className={classNames(
                    "transition-all duration-400 ease-out",
                    open ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4",
                  )}
                >
                  <a
                    href="https://booking.tareeqk.ae/login"
                    onClick={() => close()}
                    className="flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-black shadow-[0_8px_24px_rgba(247,178,5,0.3)] transition-transform duration-300 hover:scale-[1.02]"
                    style={{ background: "linear-gradient(135deg, var(--seconday-yellow), var(--primary-yellow))" }}
                  >
                    <ArrowRightOnRectangleIcon className="h-4 w-4" />
                    {t("landing.book", "Book Now")}
                  </a>
                </div>
              </div>
            </DisclosurePanel>
          </>
        )
      }}
    </Disclosure>
  )
}
