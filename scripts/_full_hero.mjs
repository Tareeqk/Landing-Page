import puppeteer from 'puppeteer';
const outDir = process.argv[2];
const label = process.argv[3] || 'full';
const w = parseInt(process.argv[4] || '390', 10);
const h = parseInt(process.argv[5] || '844', 10);

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: w, height: h, isMobile: true, hasTouch: true });
await page.goto('http://localhost:5183/en', { waitUntil: 'networkidle0', timeout: 30000 });
await page.waitForSelector('.tk-hero', { timeout: 15000 });
await new Promise(r => setTimeout(r, 800));
try {
  const buttons = await page.$$('button');
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && /accept all/i.test(text)) { await btn.click(); await new Promise(r => setTimeout(r, 400)); break; }
  }
} catch {}
await new Promise(r => setTimeout(r, 1000));
const hero = await page.$('.tk-hero');
const box = await hero.boundingBox();
await page.screenshot({ path: `${outDir}/${label}.png`, clip: { x: box.x, y: box.y, width: box.width, height: box.height }, captureBeyondViewport: true });
console.log('captured', box);
await browser.close();
