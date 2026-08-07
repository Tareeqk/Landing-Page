import puppeteer from 'puppeteer';

const outDir = process.argv[2];
const label = process.argv[3] || 'hero';
const path = process.argv[4] || '/en';

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 900 });
await page.goto(`http://localhost:5183${path}`, { waitUntil: 'networkidle0', timeout: 30000 });
await page.waitForSelector('.tk-hero', { timeout: 15000 });
await new Promise((r) => setTimeout(r, 500));

const hero = await page.$('.tk-hero');
const box = await hero.boundingBox();
await page.screenshot({
  path: `${outDir}/${label}.png`,
  clip: { x: box.x, y: box.y, width: box.width, height: Math.min(box.height, 900) },
});
console.log('captured hero crop', box);

await browser.close();
