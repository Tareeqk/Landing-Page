import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();

// Mobile check
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
await page.goto('http://localhost:5173/en', { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise(r => setTimeout(r, 600));
await page.screenshot({ path: '/private/tmp/claude-501/-Users-tareeqk-01-Desktop-Tareeqk-Portal-Landing-Page/3685ac0e-a766-4b8a-b679-21fa93dfc505/scratchpad/mobile-check.png', fullPage: false });

// RTL check
await page.setViewport({ width: 1920, height: 1000, deviceScaleFactor: 1 });
await page.goto('http://localhost:5173/ar', { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise(r => setTimeout(r, 600));
await page.screenshot({ path: '/private/tmp/claude-501/-Users-tareeqk-01-Desktop-Tareeqk-Portal-Landing-Page/3685ac0e-a766-4b8a-b679-21fa93dfc505/scratchpad/rtl-labels.png' });

await browser.close();
console.log('done');
