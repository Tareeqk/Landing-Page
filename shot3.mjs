import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: 1920, height: 1000, deviceScaleFactor: 1 });
await page.goto('http://localhost:5173/en', { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise(r => setTimeout(r, 600));
// dismiss cookie banner if present
try {
  await page.click('button ::-p-text(Accept All)', { timeout: 1000 });
} catch {}
await new Promise(r => setTimeout(r, 300));
await page.screenshot({ path: '/private/tmp/claude-501/-Users-tareeqk-01-Desktop-Tareeqk-Portal-Landing-Page/3685ac0e-a766-4b8a-b679-21fa93dfc505/scratchpad/ltr-labels.png' });

const data = await page.evaluate(() => {
  const content = document.querySelector('.tk-hero__content');
  const visual = document.querySelector('.tk-hero__visual');
  const labels = [...document.querySelectorAll('.tk-hero__tag-label')].map((l,i) => {
    const r = l.getBoundingClientRect();
    return { i: i+1, text: l.textContent, left: r.left, right: r.right, width: r.width };
  });
  const cr = content.getBoundingClientRect();
  const vr = visual.getBoundingClientRect();
  return { contentLeft: cr.left, contentRight: cr.right, visualLeft: vr.left, visualRight: vr.right, labels };
});
console.log(JSON.stringify(data, null, 2));
await browser.close();
