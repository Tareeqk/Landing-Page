import { useTranslation } from "react-i18next";
import { featureIcons } from "./priceIconMap"; // adjust path

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
      features: item.features || [],
      featured: item.featured || false,
      href: "#",
    };
  });

  return (
    <div className="container relative isolate px-6 py-6 sm:py-10 lg:px-8">
      {/* Header */}
      <div className="mb-4 md:mb-8" data-aos="fade-right">
        <span className="inline-block px-4 py-2 rounded-full border border-[var(--primary-light-gray)] text-[var(--secondary-dark-bg)] text-sm md:text-base span-titles">
          {t("price.price")}
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium my-4">
          {t("price.title")}
        </h1>
        <p className="text-[var(--primary-light-gray)] mt-3 max-w-2xl text-sm sm:text-base">
          {t("price.subtitle")}
        </p>
      </div>

      {/* Plans */}
      <div data-aos="fade-up" className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-1 lg:grid-cols-3">
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
                {tier.features.map((feature) => {
                  const Icon = featureIcons[feature] || featureIcons["cars"];
                  return (
                    <li key={feature} className="flex items-center">
                      <Icon
                        className={classNames(
                          tier.featured
                            ? "text-[var(--primary-yellow)]"
                            : "subtitle",
                          "h-5 w-5 flex-shrink-0"
                        )}
                      />
                      <span className="ml-3 text-sm">
                        {t(`price.features.${feature}`, feature)}
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
