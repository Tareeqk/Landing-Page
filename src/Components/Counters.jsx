import React from "react";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";

const Counters = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });
    const { t } = useTranslation()
    const stats = [
        { value: 12, label: t("counter.minutes") },
        { value: 200, label: t("counter.drivers") },
        { value: 360, label: t("counter.days") },
    ];

    return (
        <div className="container">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 rounded-2xl bg-[var(--secondary-light-gray)] dark-bg">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                    {stats.map((stat, idx) => (
                        <div key={idx} ref={ref} data-aos="fade-up">
                            <h2 className="text-3xl sm:text-5xl font-bold text-primary-yellow">
                                {inView ? <CountUp end={stat.value} duration={2.5} /> : 0}+
                            </h2>
                            <p className="text-md sm:text-lg mx-10 mt-4 text-[var(--primary-light-gray)]">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Counters;