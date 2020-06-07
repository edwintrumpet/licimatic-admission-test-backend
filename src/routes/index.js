const express = require('express');
const OpportunitiesService = require('../services/opportunities');

const routes = (app) => {
  const router = express.Router();
  app.use('/', router);
  router.get('/', async (req, res, next) => {
    try {
      res.status(200).json({ message: 'Routes works!', statusCode: res.statusCode });
    } catch (err) {
      next(err);
    }
  });
  router.get('/scraping', async (req, res, next) => {
    try {
      const opportunities = await OpportunitiesService.syncOpportunities();
      res.status(200).json({ data: opportunities, message: 'Scraping works!', statusCode: res.statusCode });
    } catch (err) {
      next();
    }
  });
};

module.exports = routes;
