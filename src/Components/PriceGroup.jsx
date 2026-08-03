import { useTranslation } from "react-i18next";
// import { featureIcons } from "./featureIcons"; 
import { featureIcons } from './priceIconMap';

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PriceGroup() {
  const { t } = useTranslation();

  const priceItemsKeys = Object.keys(t("price", { returnObjects: true })).filter(
    (key) => key.startsWith("item")
  );

  const tiers = priceItemsKeys.map((key) => {
    const item = t(`price.${key}`, { returnObjects: true });
    return {
      id: key,
      name: item.title,
      package: item.tons,
      description: item.subtitle,
      features: item.features || {},
      featured: item.featured || false,
      href: "#",
    };
  });

  return (
    <div className="container relative isolate px-6 py-6 sm:py-10 lg:px-8">
      {/* Header */}
      <div className="mb-4 md:mb-8" data-aos="fade-right">
        <span className="text-[var(--secondary-dark-bg)] text-base sm:text-lg md:text-xl tracking-wide pb-1 border-b-2 border-[var(--primary-light-gray)] inline-block span-titles">
          {t("price.price")}
        </span>
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium my-4">
          {t("price.title")}
        </h2>
        <p className="text-[var(--primary-light-gray)] mt-3 max-w-2xl text-sm sm:text-base">
          {t("price.subtitle")}
        </p>
      </div>

      {/* Plans */}
      <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-1 lg:grid-cols-3 items-stretch">
        {tiers.map((tier, i) => (
          <div
            key={tier.id}
            data-aos="fade-up"
            data-aos-delay={i * 130}
            className={classNames(
              tier.featured
                ? "text-white shadow-[0_28px_64px_-24px_rgba(247,178,5,0.35)]"
                : "bg-white border border-gray-200 hover:shadow-lg hover:-translate-y-1",
              "relative overflow-hidden rounded-2xl p-6 sm:p-8 transition-all duration-300 flex flex-col h-full"
            )}
            style={tier.featured ? { background: 'linear-gradient(155deg, var(--primary-dark-bg), #050505)' } : undefined}
          >
            {/* Ambient glow — the featured tier's one signature touch,
                echoing the dark accent panels used elsewhere on the site
                (About's mission card, the service CTA) instead of a plain
                flat dark rectangle. */}
            {tier.featured && (
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 70% 60% at 100% 0%, rgba(247,178,5,0.20) 0%, transparent 60%)' }}
              />
            )}

            {/* Most popular badge */}
            {tier.featured && (
              <div className="relative inline-flex items-center gap-1.5 self-start bg-[var(--primary-yellow)] text-black text-xs font-bold px-3 py-1 rounded-full mb-5">
                {t("price.mostPopular", "Most Popular")}
              </div>
            )}

            {/* Content */}
            <div className="relative flex flex-col flex-1">
              <h3 className={classNames(tier.featured ? "text-white" : "text-gray-900", "text-xl font-bold")}>
                {tier.name}
              </h3>

              <div className="mt-4 flex items-baseline gap-x-2">
                <span
                  className={classNames(
                    tier.featured ? "text-[var(--primary-yellow)]" : "text-secondary-dark-bg",
                    "text-3xl font-bold"
                  )}
                >
                  {tier.package}
                </span>
              </div>

              <p className={classNames(tier.featured ? "text-white/55" : "text-[var(--primary-light-gray)]", "mt-2 text-sm")}>
                {tier.description}
              </p>

              {/* Features */}
              <ul className="mt-6 space-y-3.5 flex-1">
                {Object.entries(tier.features).map(([featureKey, featureLabel]) => {
                  const Icon = featureIcons[featureKey] || featureIcons["cars"];
                  return (
                    <li key={featureKey} className="flex items-center gap-3">
                      <span
                        className={classNames(
                          tier.featured
                            ? "bg-white/10 text-[var(--primary-yellow)]"
                            : "bg-[var(--secondary-light-gray)] text-[var(--primary-yellow)]",
                          "flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className={classNames(tier.featured ? "text-white/85" : "text-gray-700", "text-sm")}>
                        {featureLabel}
                      </span>
                    </li>
                  );
                })}
              </ul>

              {/* Button */}
              <a
                href={tier.href}
                className={classNames(
                  tier.featured
                    ? "bg-[var(--primary-yellow)] text-black hover:brightness-105"
                    : "bg-gray-50 border text-gray-700 hover:bg-gray-100",
                  "mt-8 block w-full rounded-lg py-3 px-4 text-center text-sm font-semibold transition-all"
                )}
              >
                {t("price.btn", "Get started")}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
