const express = require('express');
const OpportunitiesService = require('../services/opportunities');

const opportunitiesService = new OpportunitiesService();

const routes = (app) => {
  const router = express.Router();
  app.use('/', router);
  router.get('/opportunities', async (req, res, next) => {
    try {
      const opportunities = await opportunitiesService.getOpportunities({});
      res.status(200).json({ data: opportunities, message: 'Opportunities listed!', statusCode: res.statusCode });
    } catch (err) {
      next(err);
    }
  });
  router.get('/scraping', async (req, res, next) => {
    try {
      opportunitiesService.syncOpportunities(app);
      res.status(200).json({ message: 'Scraping...', statusCode: res.statusCode });
    } catch (err) {
      next(err);
    }
  });
};

module.exports = routes;
