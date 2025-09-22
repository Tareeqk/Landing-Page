import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PageContent = () => {
  const location = useLocation();
  const [content, setContent] = useState("");
  const lang = localStorage.getItem("preferredLanguage") || "en";

  // map pathnames to slugs
  const slugMap = {
    about: "about-recovery-service",
    "term-condition": "terms-conditions",
    faq: "faqs",
  };

  useEffect(() => {
    const fetchPage = async () => {
      // get last part of path (like "about")
      const page = location.pathname.split("/").pop();

      const slug = slugMap[page];
      if (!slug) return;

      const baseUrl = "http://10.255.254.20:8000";
      const apiUrl = `${baseUrl}/pages?slug=${slug}&lang=${lang}`;

      try {
        let response = await fetch(apiUrl);
        let data = await response.json();
        setContent(data.html);
      } catch (err) {
        console.error("Error fetching page:", err);
      }
    };

    fetchPage();
  }, [location.pathname, lang]);

  return (
    <div
      id="accordionExample"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default PageContent;
