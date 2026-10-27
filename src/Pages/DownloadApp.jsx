import { useRef, useState } from "react"
import { Helmet } from "react-helmet-async"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { ArrowRight, Check } from "lucide-react"
import HreflangTags from "../Components/HreflangTags"
import useLangLink from "../hooks/useLangLink"

// Standalone "get the apps" page, linked from marketing/QR/social. It lists
// every store link explicitly (customer + driver, iOS + Android). The
// device-detecting "Download App" buttons around the site are separate and
// unchanged. Store anchors here are plain <a href> so utils/adsTracking.js
// counts them as app_download_click.
const APPS = [
  {
    key: "customer",
    img: "/new/MOBILE MOCKUP TAREEQK CUSTOMER.webp",
    play: "https://play.google.com/store/apps/details?id=com.tareeqk.order",
    ios: "https://apps.apple.com/in/app/tareeqk-order/id6480442854",
  },
  {
    key: "driver",
    img: "/new/MOBILE MOCKUP TAREEQK DRIVER.webp",
    play: "https://play.google.com/store/apps/details?id=com.tareeqk.dispatcher&hl=en",
    ios: "https://apps.apple.com/pk/app/tareeqk-driver/id6497716306",
  },
]

const PLAY_BADGE = "https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
const IOS_BADGE = "https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"

export default function DownloadApp() {
  const { t } = useTranslation()
  const { lang } = useParams()
  const langLink = useLangLink()
  const url = `https://tareeqk.ae/${lang}/download/`

  // Below lg the two cards are a swipe carousel (scroll-snap, no JS needed
  // for the swiping itself); the dots only reflect/trigger the position.
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)
  const slideStep = () => {
    const el = trackRef.current
    const first = el?.firstElementChild
    return first ? first.getBoundingClientRect().width + 12 : 1
  }
  const onScroll = () => {
    const el = trackRef.current
    if (el) setActive(Math.min(APPS.length - 1, Math.round(Math.abs(el.scrollLeft) / slideStep())))
  }
  const goTo = (i) => {
    const el = trackRef.current
    if (!el) return
    const dir = getComputedStyle(el).direction === "rtl" ? -1 : 1
    el.scrollTo({ left: dir * i * slideStep(), behavior: "smooth" })
  }

  return (
    <>
      <Helmet>
        <meta name="robots" content="index, follow" />
        <title>{t("meta.download.title")}</title>
        <meta name="description" content={t("meta.download.description")} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={t("meta.download.title")} />
        <meta property="og:description" content={t("meta.download.description")} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:image" content="https://tareeqk.ae/og/new/service_hero_banner.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t("meta.download.title")} />
        <meta name="twitter:description" content={t("meta.download.description")} />
        <meta name="twitter:image" content="https://tareeqk.ae/og/new/service_hero_banner.jpg" />
      </Helmet>
      <HreflangTags path="download" />

      <div className="bg-[#f7f7f3] text-[#0b0d10]">
        {/* Hero */}
        <section className="relative isolate overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(60% 60% at 50% 0%, rgba(247,178,5,0.20), transparent 70%)",
            }}
          />
          <div className="mx-auto max-w-3xl px-5 pb-6 pt-10 text-center sm:pt-12">
            <span className="inline-block rounded-full border border-black/10 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#7a5200]">
              {t("downloadPage.eyebrow")}
            </span>
            <h1 className="mt-4 whitespace-nowrap text-[clamp(1.05rem,4.7vw,2.25rem)] font-extrabold leading-[1.2] tracking-tight">
              {t("downloadPage.title")}
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#5b6068] sm:text-base">
              {t("downloadPage.subtitle")}
            </p>
          </div>
        </section>

        {/* App cards */}
        <section className="mx-auto max-w-5xl px-5 pb-10 sm:pb-14">
          <div
            ref={trackRef}
            onScroll={onScroll}
            className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:grid lg:grid-cols-2 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0"
          >
            {APPS.map((app) => {
              const points = t(`downloadPage.${app.key}.points`, { returnObjects: true, defaultValue: [] })
              const isCustomer = app.key === "customer"
              return (
                <article
                  key={app.key}
                  className={
                    "relative flex w-[86%] shrink-0 snap-center flex-col overflow-hidden rounded-3xl border p-5 sm:w-[60%] sm:p-6 lg:w-auto " +
                    (isCustomer
                      ? "border-[rgba(247,178,5,0.55)] bg-gradient-to-b from-[#fff6d9] to-white"
                      : "border-black/10 bg-white")
                  }
                >
                  <span
                    className={
                      "order-1 w-fit rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] " +
                      (isCustomer ? "bg-[var(--primary-yellow)] text-black" : "bg-[#0b0d10] text-white")
                    }
                  >
                    {t(`downloadPage.${app.key}.badge`)}
                  </span>
                  <h2 className="order-2 mt-3 text-xl font-bold sm:text-2xl">{t(`downloadPage.${app.key}.title`)}</h2>
                  <p className="order-3 mt-2 max-w-md text-sm leading-relaxed text-[#5b6068]">
                    {t(`downloadPage.${app.key}.desc`)}
                  </p>

                  <ul className="order-5 mt-4 flex flex-col gap-2">
                    {Array.isArray(points) &&
                      points.map((p) => (
                        <li key={p} className="flex items-start gap-2.5 text-[13px] text-[#2b2e34]">
                          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--primary-yellow)] text-black">
                            <Check className="h-2.5 w-2.5" strokeWidth={3} />
                          </span>
                          {p}
                        </li>
                      ))}
                  </ul>

                  <img
                    src={app.img}
                    alt={t(`downloadPage.${app.key}.title`)}
                    width="1200"
                    height="900"
                    loading="lazy"
                    className="order-6 mx-auto -my-4 w-full max-w-[250px] sm:max-w-[340px] drop-shadow-[0_24px_30px_rgba(0,0,0,0.18)]"
                  />

                  <div className="order-4 mt-4 flex items-center gap-2 lg:order-7 lg:mt-auto lg:gap-2.5">
                    <a
                      href={app.play}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t("downloadPage.googlePlay")}
                      className="transition-transform duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-yellow)] rounded-lg"
                    >
                      <img src={PLAY_BADGE} alt={t("downloadPage.googlePlay")} loading="lazy" className="h-9 w-auto sm:h-10" />
                    </a>
                    <a
                      href={app.ios}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t("downloadPage.appStore")}
                      className="transition-transform duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-yellow)] rounded-lg"
                    >
                      <img src={IOS_BADGE} alt={t("downloadPage.appStore")} loading="lazy" className="h-9 w-auto sm:h-10" />
                    </a>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="mt-3 flex justify-center gap-2 lg:hidden" role="group" aria-label="Apps">
            {APPS.map((app, i) => (
              <button
                key={app.key}
                type="button"
                onClick={() => goTo(i)}
                aria-label={t(`downloadPage.${app.key}.title`)}
                aria-current={active === i}
                className={"h-2 rounded-full transition-all " + (active === i ? "w-6 bg-[var(--primary-yellow)]" : "w-2 bg-black/20")}
              />
            ))}
          </div>

          <p className="mt-6 text-center text-[13px] text-[#5b6068]">
            {t("downloadPage.partnerQ")}{" "}
            <Link
              to={langLink("/become-a-partner")}
              viewTransition
              className="inline-flex items-center gap-1 font-semibold text-[#7a5200] hover:underline"
            >
              {t("downloadPage.partnerLink")}
              <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
            </Link>
          </p>
        </section>
      </div>
    </>
  )
}
