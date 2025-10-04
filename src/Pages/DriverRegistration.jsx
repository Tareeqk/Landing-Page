import { useTranslation } from "react-i18next";
import { DownloadApps } from "../Components/DownloadApps";

export default function DriverRegistrationPage() {
  const { t } = useTranslation();

  // Hardcoded icons for each benefit
  const benefits = [
    {
      title: t("driverRegistration.benefits.items.0.title"),
      desc: t("driverRegistration.benefits.items.0.desc"),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
        </svg>
      )
    },
    {
      title: t("driverRegistration.benefits.items.1.title"),
      desc: t("driverRegistration.benefits.items.1.desc"),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: t("driverRegistration.benefits.items.2.title"),
      desc: t("driverRegistration.benefits.items.2.desc"),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("new/second_img.webp")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          width: '100%',
          height: '400px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#fff',
          textAlign: 'center',
          padding: '0 20px',
        }}
      >
        <div className="max-w-4xl">
          <h1 data-aos="fade-up" className='text-3xl sm:text-4xl md:text-5xl font-bold mb-4'>
            {t("driverRegistration.hero.title")}
          </h1>
          <p data-aos="fade-up" data-aos-delay="100" className='text-xl text-gray-100 mb-8'>
            {t("driverRegistration.hero.subtitle")}
          </p>
          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="bg-[var(--dark-bg-muted)] dark-bg inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full"
          >
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2 text-yellow-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg> */}
            <span className="text-sm sm:text-base">{t("driverRegistration.hero.features")}</span>
          </div>

        </div>
      </div>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 data-aos="fade-up" className="text-3xl font-bold text-center mb-12 text-gray-800">{t("driverRegistration.benefits.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((item, index) => (
              <div key={index} className="bg-[var(--secondary-light-gray)] dark-bg text-center p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h3>
                <p className="dark-bg text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Process Section */}
      <div className="container mx-auto px-4 py-12 rounded-lg my-8">
        <div data-aos="fade-up" className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">{t("driverRegistration.process.title")}</h2>
          <p className="text-center text-gray-400 mb-8">{t("driverRegistration.process.subtitle")}</p>

          <div className="dark-bg text-gray-400 rounded-xl shadow-md p-6 mb-8" data-aos="fade-up">
            <p className="text-lg mb-6 text-center span-titles text-gray-800">
              {t("driverRegistration.process.intro")}
            </p>

            <div className="bg-gray-200 p-4 rounded-lg mb-6">
              <h4 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                {t("driverRegistration.process.requirementsTitle")}
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {t("driverRegistration.process.requirements", { returnObjects: true }).map((req, index) => (
                  <li key={index} className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-yellow-500 d-flex align-items-center" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {t("driverRegistration.process.howToRegisterTitle")}
            </h3>
            <ol className="list-decimal list-inside mb-6 space-y-3 span-titles text-gray-500">
              {t("driverRegistration.process.steps", { returnObjects: true }).map((step, index) => (
                <li key={index} className="pb-2">{step}</li>
              ))}
            </ol>

            <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
              <p className="text-gray-800 flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 flex-shrink-0 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>
                  <strong>{t("driverRegistration.process.note")}</strong>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-12 bg-[var(--secondary-light-gray)] dark-bg text-gray-700">
        <div className="container mx-auto px-4 text-center">
          <h2 data-aos="fade-up" className="text-3xl font-bold mb-4">{t("driverRegistration.cta.title")}</h2>
          <p data-aos="fade-up" className="text-xl mb-8 max-w-2xl mx-auto span-titles">{t("driverRegistration.cta.subtitle")}</p>
          <DownloadApps type='driver' />
        </div>
      </section>
    </>
  );
}
