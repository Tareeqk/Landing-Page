import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function usePageViews() {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag("config", "G-N8F28JJFW1", {
        page_path: location.pathname,
      });
    }
  }, [location]);
}

export default usePageViews;