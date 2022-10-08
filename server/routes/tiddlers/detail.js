// Render mustache templates
// Returns page /server/routes/iframes/detail.html
//  which constains script to fetch ticket from GitHub
// The script also interfaces to TiddlyWiki (via tw.poc2go)
//  and creates tiddler to display the ticket and comments

const fs = require('fs');
const Mustache = require('mustache');
const pages = {};

// Insert the GitHub Rest API urls and ticket number into the detail
//  html <script> and send to TiddlyWiki
const detail = (cfg, req, res) => {
	const ticketNbr = req.params.ticketNbr.replace(/^\D*(\d+)\D*.*$/,'$1');
	const params = { cfg, number: ticketNbr};
	return res.send(Mustache.render(pages.detail, params));
}

// Load page template with script
module.exports = (cfg) => {
	pages.detail = fs.readFileSync(cfg.homeDir + '/server/routes/iframes/detail.html', { encoding: 'utf8' });
	return {detail};
};
