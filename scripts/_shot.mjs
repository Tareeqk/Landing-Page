import puppeteer from 'puppeteer';

const outDir = process.argv[2] || '/private/tmp/claude-501/-Users-tareeqk-01-Desktop-Tareeqk-Portal-Landing-Page/b37a41bd-9a9c-44f2-bebb-399d4d6a0e87/scratchpad';
const path = process.argv[3] || '/en/service';
const label = process.argv[4] || 'shot';

const shots = [
  { name: `${label}-desktop`, width: 1440, height: 900, fullPage: true },
  { name: `${label}-mobile`, width: 390, height: 844, fullPage: true },
];

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();

// Dismiss the cookie banner once per browser session so it doesn't cover
// the top of every shot.
async function dismissCookieBanner() {
  const btn = await page.$('button');
  const buttons = await page.$$('button');
  for (const b of buttons) {
    const text = await page.evaluate((el) => el.textContent, b);
    if (text && /accept all/i.test(text)) {
      await b.click();
      await new Promise((r) => setTimeout(r, 300));
      break;
    }
  }
}

// IntersectionObserver-driven reveal animations (svc-reveal -> svc-visible)
// only fire once an element actually scrolls into the viewport — a single
// fullPage screenshot without scrolling first leaves everything below the
// fold at opacity:0. Scroll the full document height in steps, pausing for
// each observer/transition to fire, before capturing.
async function scrollThroughPage() {
  const height = await page.evaluate(() => document.body.scrollHeight);
  const step = 600;
  for (let y = 0; y < height; y += step) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await new Promise((r) => setTimeout(r, 120));
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 300));
}

for (const s of shots) {
  await page.setViewport({ width: s.width, height: s.height });
  await page.goto(`http://localhost:5183${path}`, { waitUntil: 'networkidle0', timeout: 30000 });
  await page.waitForFunction(() => {
    const h1 = document.querySelector('h1, h2');
    return !!h1 && h1.textContent.trim().length > 0;
  }, { timeout: 15000 });
  await new Promise((r) => setTimeout(r, 400));
  await dismissCookieBanner();
  await scrollThroughPage();
  await page.screenshot({ path: `${outDir}/${s.name}.png`, fullPage: s.fullPage });
  console.log('captured', s.name);
}

await browser.close();
