const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const debug = require('debug')('app:server');
const { port } = require('./config/index');
const routes = require('./routes');
const { logErrors, wrapErrors, errorHandler } = require('./utils/middlewares/errorHandlers');
const notFoundHandler = require('./utils/middlewares/notFoundHandler');

// Initializations
const app = express();
const server = http.createServer(app);
const io = socketIo.listen(server);
app.locals.io = io;

// Middlewares
app.use(cors({
  origin: true,
}));
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
server.listen(port, (err) => {
  if (err) debug(err);
  else debug(`Listening on http://localhost:${port}`);
});

// io.on('connect', (socket) => {});
