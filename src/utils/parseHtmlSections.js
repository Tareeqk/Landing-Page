// src/utils/parseHtmlSections.js
export function parseHtmlSections(htmlString, language = "en") {
  if (!htmlString) return [];

  // 1️⃣ Clean unnecessary or Word-specific tags
  let cleanHtml = htmlString
    .replace(/\\"/g, '"')
    .replace(/\\n/g, "")
    .replace(/<o:p>|<\/o:p>/g, "")
    .replace(/<span[^>]*>|<\/span>/g, "")
    .replace(/<font[^>]*>|<\/font>/g, "")
    .replace(/style="[^"]*"/g, ""); // remove inline style entirely

  const parser = new DOMParser();
  const doc = parser.parseFromString(cleanHtml, "text/html");

  const nodes = Array.from(
    doc.body.querySelectorAll("p, h1, h2, h3, h4, h5, h6, li")
  );

  const sections = [];
  let currentSection = null;

  // 2️⃣ Helper for consistent style
  const applyGlobalStyle = (node) => {
    const family =
      language === "ar"
        ? '"Noto Kufi Arabic", sans-serif'
        : language === "ur"
        ? '"Noto Nastaliq Urdu", serif'
        : '"Manrope", sans-serif';

    node.style.fontFamily = family;
    node.style.fontSize = "16px";
    node.style.lineHeight = "1.7";
    node.style.margin = "8px 0";
    if (["ar", "ur"].includes(language)) node.style.direction = "rtl";
    return node;
  };

  // 3️⃣ Main parsing loop
  for (const el of nodes) {
    const text = el.textContent.trim();
    if (!text) continue;

    const tag = el.tagName.toLowerCase();
    const isHeading = tag.match(/^h[1-6]$/);

    // Numbered or textual heading (like "Interpretation and Definitions")
    if (isHeading || text.match(/^\d+\.\s/) || /^[A-Z]/.test(text)) {
      if (currentSection) sections.push(currentSection);
      currentSection = {
        heading: text,
        content: "",
        subSections: [],
      };
    } else if (text.match(/^\d+(\.\d+)+\s/)) {
      // Subsection like 1.1, 2.3.1
      const subHeading = text.match(/^\d+(\.\d+)+\s/)[0].trim();
      const clone = applyGlobalStyle(el.cloneNode(true));
      if (currentSection)
        currentSection.subSections.push({
          subHeading,
          content: clone.outerHTML,
        });
    } else if (currentSection) {
      // Normal paragraph or list item
      const clone = applyGlobalStyle(el.cloneNode(true));
      currentSection.content += clone.outerHTML;
    }
  }

  if (currentSection) sections.push(currentSection);

  return sections;
}
