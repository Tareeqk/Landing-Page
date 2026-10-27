import puppeteer from 'puppeteer';

const outDir = '/private/tmp/claude-501/-Users-tareeqk-01-Desktop-Tareeqk-Portal-Landing-Page/b37a41bd-9a9c-44f2-bebb-399d4d6a0e87/scratchpad';

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:5183/en/service', { waitUntil: 'networkidle0', timeout: 30000 });
await page.waitForFunction(() => document.querySelector('h1'), { timeout: 15000 });
await new Promise((r) => setTimeout(r, 400));

// dismiss cookie banner
const buttons = await page.$$('button');
for (const b of buttons) {
  const text = await page.evaluate((el) => el.textContent, b);
  if (text && /accept all/i.test(text)) { await b.click(); break; }
}
await new Promise((r) => setTimeout(r, 300));

// scroll to cards section and reveal it
await page.evaluate(() => window.scrollBy(0, 600));
await new Promise((r) => setTimeout(r, 500));
const cardEl = await page.$('.svc-card');
if (cardEl) {
  await cardEl.screenshot({ path: `${outDir}/crop-card.png` });
}

// scroll to coverage section
await page.evaluate(() => {
  const el = document.querySelector('.svc-coverage-grid');
  if (el) el.scrollIntoView({ block: 'center' });
});
await new Promise((r) => setTimeout(r, 600));
const covEl = await page.$('.svc-coverage-grid');
if (covEl) {
  await covEl.screenshot({ path: `${outDir}/crop-coverage.png` });
}

// intro feature tiles
await page.evaluate(() => {
  const el = document.querySelector('.svc-feat-item');
  if (el) el.closest('div[style*="grid"]').scrollIntoView({ block: 'center' });
});
await new Promise((r) => setTimeout(r, 600));
const featParent = await page.evaluateHandle(() => document.querySelector('.svc-feat-item').parentElement.parentElement);
await featParent.asElement().screenshot({ path: `${outDir}/crop-intro-right.png` });

await browser.close();
console.log('done');
