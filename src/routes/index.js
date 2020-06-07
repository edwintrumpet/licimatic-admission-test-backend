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
      OpportunitiesService.syncOpportunities();
      res.status(200).json({ message: 'Scraping...', statusCode: res.statusCode });
    } catch (err) {
      next(err);
    }
  });
};

module.exports = routes;
