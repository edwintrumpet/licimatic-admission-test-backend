const puppeteer = require('puppeteer');

// const grants = 'https://www.grants.gov/custom/search.jsp';
const platzi = 'https://platzi.com/';

class OpportunitiesService {
  static async syncOpportunities() {
    const args = [
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ];
    const options = {
      args,
    };
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    await page.goto(platzi);
    // eslint-disable-next-line no-undef
    const text = await page.evaluate(() => document.getElementsByClassName('HeroContent-title')[0].innerText);
    return text;
  }
}

module.exports = OpportunitiesService;
