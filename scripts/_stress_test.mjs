import puppeteer from 'puppeteer';

const outDir = process.argv[2];

// Real-device widths + a spread of heights, including short ones that
// mimic in-app browser chrome (WhatsApp/Instagram) eating into vh.
const cases = [
  { label: 'iphone-se',        w: 375, h: 667 },
  { label: 'iphone-12-13-14',  w: 390, h: 844 },
  { label: 'iphone-14-promax', w: 430, h: 932 },
  { label: 'android-small',    w: 360, h: 800 },
  { label: 'android-large',    w: 412, h: 915 },
  { label: 'narrow-320',       w: 320, h: 690 },
  { label: 'tablet-portrait',  w: 768, h: 1024 },
  { label: 'iphone-wa-inapp',  w: 390, h: 560 },  // short WhatsApp-style chrome
  { label: 'iphone-wa-inapp2', w: 390, h: 480 },  // even shorter
  { label: 'android-wa-inapp', w: 412, h: 540 },
  { label: 'very-short',       w: 375, h: 420 },  // stress extreme
];

const browser = await puppeteer.launch({ headless: true });

for (const c of cases) {
  const page = await browser.newPage();
  await page.setViewport({ width: c.w, height: c.h, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:5183/en', { waitUntil: 'networkidle0', timeout: 30000 });
  await page.waitForSelector('.tk-hero', { timeout: 15000 });
  await new Promise((r) => setTimeout(r, 600));

  try {
    const buttons = await page.$$('button');
    for (const btn of buttons) {
      const text = await page.evaluate((el) => el.textContent, btn);
      if (text && /accept all/i.test(text)) {
        await btn.click();
        await new Promise((r) => setTimeout(r, 300));
        break;
      }
    }
  } catch {}

  await new Promise((r) => setTimeout(r, 800));

  // Overlap check: does any .tk-hero__tag intersect the CTA row or the
  // stats row's bounding boxes?
  const overlap = await page.evaluate(() => {
    const rect = (el) => el ? el.getBoundingClientRect() : null;
    const cta = rect(document.querySelector('.tk-cta-row'));
    const stats = rect(document.querySelector('.tk-hero__stats'));
    const tags = [...document.querySelectorAll('.tk-hero__tag')].map(rect);

    const intersects = (a, b) => {
      if (!a || !b) return false;
      return !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom);
    };

    const hits = [];
    tags.forEach((t, i) => {
      if (intersects(t, cta)) hits.push(`tag${i}-vs-cta`);
      if (intersects(t, stats)) hits.push(`tag${i}-vs-stats`);
    });
    return hits;
  });

  await page.screenshot({ path: `${outDir}/stress-${c.label}.png` });
  console.log(`${c.label} (${c.w}x${c.h}):`, overlap.length ? `OVERLAP: ${overlap.join(', ')}` : 'OK');

  await page.close();
}

await browser.close();
