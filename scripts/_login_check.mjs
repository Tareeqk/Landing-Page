import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 200 });
await page.goto('http://localhost:5173/en', { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise(r => setTimeout(r, 500));
await page.screenshot({ path: 'scripts/nav_en.png' });
await browser.close();
