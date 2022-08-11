const fs = require('fs');
const db = require('../../public/assets/db/github-issues.json');
// Render mustache templates
const Mustache = require('mustache');


const pages = {};

// Get body of the ticket
const detail = (cfg, req, res) => {
	const ticketNbr = parseInt(req.params.ticketNbr);
	const found = db.find(ticket => ticket.number === ticketNbr);
	const copy = Object.assign({}, found);
	copy.pr_issueText = copy.pull_request ? 'Pull Request' : 'Issue';
	copy.body = copy.body.replace(/\\/g,'\\\\').replace(/`/g,'\\`');
	copy.cfg = cfg;
	return res.send(Mustache.render(pages.detail, copy));
}

// Load page template
module.exports = (cfg) => {
  pages.detail = fs.readFileSync(cfg.homeDir + '/server/routes/iframes/detail.html', { encoding: 'utf8' });
  return {detail};
};
