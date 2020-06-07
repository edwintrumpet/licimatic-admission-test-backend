const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const debug = require('debug')('app:server');
const { port } = require('./config/index');
const routes = require('./routes');
const { logErrors, wrapErrors, errorHandler } = require('./utils/middlewares/errorHandlers');
const notFoundHandler = require('./utils/middlewares/notFoundHandler');

// Initializations
const app = express();

// Middlewares
app.use(express.json());

// Routes
routes(app);

// Catch 404
app.use(notFoundHandler);

// Handle Errors
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

// Server
app.listen(port, (err) => {
  if (err) debug(err);
  else debug(`Listening on http://localhost:${port}`);
});
