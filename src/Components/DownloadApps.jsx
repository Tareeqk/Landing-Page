export const DownloadApps = ({ type }) => {

  let APKUrl = "";
  let IOSUrl = "";

  if (type === "customer") {
    APKUrl = "https://play.google.com/store/apps/details?id=com.tareeqk.order";
    IOSUrl = "https://apps.apple.com/in/app/tareeqk-order/id6480442854";
  } else if (type === "driver") {
    APKUrl = "https://play.google.com/store/apps/details?id=com.tareeqk.dispatcher&hl=en";
    IOSUrl = "https://apps.apple.com/pk/app/tareeqk-driver/id6497716306";
  }

  return (
      <div id="download-buttons" className="max-w-4xl mx-auto flex flex-row justify-evenly items-center gap-6">
        {/* Google Play Button */}
        <a
          href={APKUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-aos="fade-right"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
            alt="Get it on Google Play"
            className="w-65 h-auto"

          />
        </a>

        {/* App Store Button */}
        <a
          href={IOSUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-aos="fade-left"
        >
          <img
            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
            alt="Download on the App Store"
            className="w-65 h-auto"

          />
        </a>
      </div>
  );
};
