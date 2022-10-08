const fs = require('fs');

// express router
const express = require('express')
const router = express.Router()

module.exports = (cfg) => {
	// Display get request URLs - debuggy thing - set on by logUrl in config.js
	router.get('*', (req, res, next) => {
		if (cfg.logUrl) {
			console.log('\x1b[36m' + req.protocol + '://' + req.get('host') + req.originalUrl + '\x1b[0m');
		}
		next();
	});

	// Preload Site page templates
	const { render, renderError } = require('./routes/render')(cfg);
	const pages = {
		home: fs.readFileSync(cfg.homeDir + '/server/routes/iframes/home.html', { encoding: 'utf8' }),
		tree: fs.readFileSync(cfg.homeDir + '/server/routes/iframes/tree.html', { encoding: 'utf8' }),
	};

	// Static web pages and tiddler iframes
	router.get('/start', (req, res) => render(cfg, req, res, pages.home, {}));
	router.get('/tree', (req, res) => render(cfg, req, res, pages.tree, {}));

	// Called by iframe in Detail tiddler to fetch ticket info from Github
	const { detail } = require('./routes/tiddlers/detail')(cfg);
	router.get('/detail/:ticketNbr', (req, res) => detail(cfg, req, res));

	// Fetch  dynamic tidder
	const { fetch } = require('./routes/fetch');
	router.post('/fetch', (req, res) => fetch(cfg, req, res));

	// Browser request to show error page
	router.get('/error/:error', (req, res) => renderError(cfg, req, res, req.params.error));

	return { routes: router, renderError };
};
