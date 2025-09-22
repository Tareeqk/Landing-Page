import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function usePageViews() {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag("config", "G-0M5F1V93NJ", {
        page_path: location.pathname,
      });
    }
  }, [location]);
}

export default usePageViews;