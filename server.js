// ------
// Site default configuration
const { cfg } = require('./server/config');
// Set server home directory
cfg.homeDir = process.cwd();
// Command line options
require('./server/cli')(cfg);

// ------
// Express web and socket.io server
const express = require('express');
const app = express();
const { server, io } = require('./server/sockets')(cfg, app);

// Middleware
const cors = require('cors');

// Pretty JSON during development
app.set('json spaces', 2);

// CORS handles OPTION requests and CORS headers
// CORS is currently enabled for all origins
app.use(cors());

// Parse JSON if in request body
app.use(express.json());

// Site routes
const { routes, renderError } = require('./server/routes')(cfg);
app.use(routes);

// ------
// Assign a mime type to .tid files
express.static.mime.define({'text/plain': ['tid']})

// Expose public and browser-side scripts
app.use(express.static(cfg.homeDir + '/public'));
app.use(express.static(cfg.homeDir + '/server/iframes/scripts'));

// ------
// Errrors
// If got here - page not found
app.use((req, res) => {
	res.status(404);
	renderError(cfg, req, res, '404: Page "' + req.originalUrl + '" not Found ;(');
});

// ut-oh - uncaught errors respond as 'broke'
app.use((error, req, res, next) => {
	console.dir(error);
	res.status(500).send('500: Internal Server Error ;(');
});

// ------
// Start up the server http and socket.io network
server.listen(cfg.listenPort, () => {
	cfg.log.info({action: 'Server started', port: cfg.listenPort});
	console.log('Server listening on port:', cfg.listenPort);
});
