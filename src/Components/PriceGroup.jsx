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
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium my-4">
          {t("price.title")}
        </h1>
        <p className="text-[var(--primary-light-gray)] mt-3 max-w-2xl text-sm sm:text-base">
          {t("price.subtitle")}
        </p>
      </div>

      {/* Plans */}
      <div
        data-aos="fade-up"
        className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-1 lg:grid-cols-3"
      >
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={classNames(
              tier.featured
                ? "scale-[1.02] transform shadow-xl border-2 border-[var(--primary-yellow)] dark-bg"
                : "border border-gray-200 dark-bg",
              "relative rounded-xl bg-white dark-bg p-6 sm:p-8 transition-all duration-300 hover:shadow-md flex flex-col h-full"
            )}
          >
            {/* Most popular badge */}
            {tier.featured && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[var(--primary-yellow)] text-white text-xs font-bold px-3 py-1 rounded-full">
                {t("price.mostPopular", "Most Popular")}
              </div>
            )}

            {/* Content */}
            <div className="flex flex-col flex-1">
              <h3 className="text-xl font-bold text-gray-900">{tier.name}</h3>

              <div className="mt-4 flex items-baseline gap-x-2">
                <span
                  className={classNames(
                    tier.featured
                      ? "text-[var(--primary-yellow)]"
                      : "text-secondary-dark-bg",
                    "text-3xl font-bold text-secondary-dark-bg"
                  )}
                >
                  {tier.package}
                </span>
              </div>

              <p className="text-[var(--primary-light-gray)] mt-2 text-sm">
                {tier.description}
              </p>

              {/* Features */}
              <ul className="mt-6 space-y-3 flex-1">
                {Object.entries(tier.features).map(([featureKey, featureLabel]) => {
                  const Icon = featureIcons[featureKey] || featureIcons["cars"];
                  return (
                    <li key={featureKey} className="flex items-center">
                      <Icon
                        className={classNames(
                          tier.featured
                            ? "text-[var(--primary-yellow)]"
                            : "subtitle",
                          "h-5 w-5 flex-shrink-0"
                        )}
                      />
                      <span className="text-sm mx-2">{featureLabel}</span>
                    </li>
                  );
                })}
              </ul>

              {/* Button */}
              <a
                href={tier.href}
                className={classNames(
                  tier.featured
                    ? "bg-[var(--primary-yellow)] text-white hover:bg-yellow-500"
                    : "bg-gray-50 border text-gray-700 hover:bg-gray-100",
                  "mt-8 block w-full rounded-lg py-3 px-4 text-center text-sm font-semibold transition-colors"
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
