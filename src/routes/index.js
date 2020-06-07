const express = require('express');

const routes = (app) => {
  const router = express.Router();
  app.use('/', router);
  router.get('/', async (req, res, next) => {
    try {
      res.status(200).json({ message: 'Routes works!' });
    } catch (err) {
      next(err);
    }
  });
};

module.exports = routes;
