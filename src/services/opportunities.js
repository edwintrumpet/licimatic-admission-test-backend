const puppeteer = require('puppeteer');
const MongoLib = require('../lib/mongo');

class OpportunitiesService {
  constructor() {
    this.collection = 'opportunities';
    this.mongoDB = new MongoLib();
  }

  async getOpportunities({ pivot }) {
    const options = {};
    const query = {};
    options.limit = 1000;
    if (pivot) query.pivot = pivot;
    return this.mongoDB.get(this.collection, query, options);
  }

  async syncOpportunities(app) {
    const opportunities = [];
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
    const readPage = async (view) => view.evaluate(() => {
      const items = [];
      const buildOpportunity = (row, selector) => {
        const opportunity = {};
        for (let i = 0; i < 6; i += 1) {
          // eslint-disable-next-line no-undef
          const text = document.getElementsByClassName(selector)[row].children[i].innerText;
          switch (i) {
            case 0:
              opportunity.number = text;
              break;
            case 1:
              opportunity.title = text;
              break;
            case 2:
              opportunity.agency = text;
              break;
            case 3:
              opportunity.status = text;
              break;
            case 4:
              opportunity.postedDate = text;
              break;
            case 5:
              opportunity.closeDate = text;
              break;
            default:
              // never
          }
        }
        return opportunity;
      };
      for (let i = 0; i <= 12; i += 1) {
        items.push(buildOpportunity(i, 'gridevenrow'));
        if (i !== 12) {
          items.push(buildOpportunity(i, 'gridoddrow'));
        }
      }
      return items;
    });
    let currentPage = 1;
    do {
      // eslint-disable-next-line no-await-in-loop
      await page.waitFor(2000);
      // eslint-disable-next-line no-await-in-loop
      const currentOpportunities = await readPage(page);
      opportunities.push(...currentOpportunities);
      currentPage += 1;
      // eslint-disable-next-line no-await-in-loop
      await page.click(`a[href="javascript:pageSearchResults( '${currentPage}' )"]`);
    } while (currentPage <= 40);
    await browser.close();
    opportunities[0].pivot = true;
    const response = await this.mongoDB.save(this.collection, opportunities);
    app.locals.io.emit('scraped', response);
  }
}

module.exports = OpportunitiesService;
