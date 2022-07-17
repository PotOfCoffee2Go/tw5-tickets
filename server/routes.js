const fs = require('fs');

// express router
const express = require('express')
const router = express.Router()

module.exports = (cfg) => {
	// Display get request URLs - debuggy thing - comment out if not desired
	router.get('*', (req, res, next) => {
		if (cfg.logUrl) {
			console.log('\x1b[36m' + req.protocol + '://' + req.get('host') + req.originalUrl + '\x1b[0m');
		}
		next();
	});

	// Preload Site page templates
	// Render using Mustache
	const { render, renderError } = require('./routes/render')(cfg);
	const pages = {
		home: fs.readFileSync(cfg.homeDir + '/server/routes/iframes/home.html', { encoding: 'utf8' }),
		tree: fs.readFileSync(cfg.homeDir + '/server/routes/iframes/tree.html', { encoding: 'utf8' }),
	};

	// Web pages and tiddler iframes
	router.get('/start', (req, res) => render(cfg, req, res, pages.home, {}));
	router.get('/tree', (req, res) => render(cfg, req, res, pages.tree, {}));

	// Fetch  dynamic tidder
	const { fetch } = require('./routes/fetch');
	router.post('/fetch', (req, res) => fetch(cfg, req, res));

	// Browser request to show error page
	router.get('/error/:error', (req, res) => renderError(cfg, req, res, req.params.error));

	return { routes: router, renderError };
};
