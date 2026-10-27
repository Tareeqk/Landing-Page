import puppeteer from 'puppeteer';
const outDir = process.argv[2];
const path = process.argv[3];
const label = process.argv[4];
const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844 });
await page.goto(`http://localhost:5183${path}`, { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise(r => setTimeout(r, 500));
const height = await page.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < height; y += 150) {
  await page.evaluate((y) => window.scrollTo(0, y), y);
  await new Promise(r => setTimeout(r, 70));
}
await page.evaluate(() => window.scrollTo(0, 0));
await new Promise(r => setTimeout(r, 300));
console.log('page height:', height);
await page.screenshot({ path: `${outDir}/${label}.png`, fullPage: true });
await browser.close();
