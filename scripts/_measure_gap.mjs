import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
await page.goto('http://localhost:5183/en', { waitUntil: 'networkidle0', timeout: 30000 });
await page.waitForSelector('.tk-hero', { timeout: 15000 });
await new Promise((r) => setTimeout(r, 1200));

const data = await page.evaluate(() => {
  const rect = (el) => el ? el.getBoundingClientRect() : null;
  const tags = rect(document.querySelector('.tk-hero__mobile-tags'));
  const visual = rect(document.querySelector('.tk-hero__visual'));
  const glow = rect(document.querySelector('.tk-hero__glow'));
  return {
    tagsBottom: tags?.bottom,
    visualTop: visual?.top,
    glowTop: glow?.top,
    gapTagsToVisual: visual && tags ? visual.top - tags.bottom : null,
    gapTagsToGlow: glow && tags ? glow.top - tags.bottom : null,
    visualHeight: visual?.height,
  };
});
console.log(JSON.stringify(data, null, 2));
await browser.close();
