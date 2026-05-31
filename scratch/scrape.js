const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://snapp-frame.vercel.app/affiliate', { waitUntil: 'networkidle2' });
  const html = await page.content();
  fs.writeFileSync('scratch/affiliate_full.html', html);
  
  // also extract visible text
  const text = await page.evaluate(() => document.body.innerText);
  fs.writeFileSync('scratch/affiliate_text.txt', text);
  
  console.log('Done scraping');
  await browser.close();
})();
