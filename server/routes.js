const fs = require('fs');
// Render views
const { render, renderError } = require('./iframes/render');

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
	const pages = {
		home: fs.readFileSync(cfg.homeDir + '/server/iframes/home.html', { encoding: 'utf8' }),
	};

	// Web pages
	router.get('/start', (req, res) => render(cfg, req, res, pages.home, {}));

	// Fetch  dynamic tidder
	const { fetch } = require('./routes/fetch');
	router.post('/fetch', (req, res) => fetch(cfg, req, res));

	// Browser request to show error page
	router.get('/error/:error', (req, res) => renderError(cfg, req, res, req.params.error));

	return { routes: router, renderError };
};
