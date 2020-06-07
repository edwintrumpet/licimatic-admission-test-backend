const puppeteer = require('puppeteer');

class OpportunitiesService {
  static async syncOpportunities() {
    const grants = 'https://www.grants.gov/custom/search.jsp';
    const args = [
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ];
    const options = {
      args,
    };
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    await page.goto(grants);
    await page.waitFor(1000);
    const opportunities = await page.evaluate(() => {
      const items = [];
      // eslint-disable-next-line no-undef
      const buildOpportunity = (row, selector) => document
        .getElementsByClassName(selector)[row].children[1].innerText;
      for (let i = 0; i <= 12; i += 1) {
        items.push(buildOpportunity(i, 'gridevenrow'));
        if (i !== 12) {
          items.push(buildOpportunity(i, 'gridoddrow'));
        }
      }
      return items;
    });
    await browser.close();
    return opportunities;
  }
}

module.exports = OpportunitiesService;
