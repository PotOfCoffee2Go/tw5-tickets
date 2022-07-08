// If 'fetch' fails - try to send the .tid as if a socket 'request'
const tryToOpenFile = require('../sockets/get-tiddler');

// fetch tickets
const tickets = require('./tickets');
// Other tiddlers (pages) used with ticket search
const searchOptions = require('./tiddlers/Search/Options');
const searchUsage = require('./tiddlers/Search/Usage');
const searchSuggest = require('./tiddlers/Search/Suggest');
const searchAbout = require('./tiddlers/Search/About');

// Route the 'fetch' command
const fetch = async (cfg, req, res) => {
	// console.log(req.body) // Show all fetches
	const data = req.body;
	var opt;
	try {
		opt = JSON.parse(data.content.options);
	} catch (e) {
		opt = {}
	}

	cfg.log.info({action: 'fetch', path: data.content.path, searchWords: opt.searchWords});

	if (data.content.path === 'ticketscopy') {
		data.content.opt = tickets.ticketDefaults(opt);
		data.body = {
			title: 'GitHub Issue',
			text: tickets.run(cfg, data, true)
		}
		res.json({data});
		return;
	}

	if (data.content.path.substr(0,7) === 'tickets') {
		if (opt.reset) {
			data.content.opt = tickets.ticketDefaults({});
		}
		data.content.opt = tickets.ticketDefaults(opt);
		if (data.content.path.indexOf('Options') > -1) {
			data.body = {
				title: 'GitHub Issue',
				text: searchOptions.run(cfg, data),
			}
			res.json({data});
			return;
		}
		if (data.content.path.indexOf('Usage') > -1) {
			data.body = {
				title: 'GitHub Issue',
				text: searchUsage.run(cfg, data),
			}
			res.json({data});
			return;
		}
		if (data.content.path.indexOf('Suggest') > -1) {
			data.body = {
				title: 'GitHub Issue',
				text: searchSuggest.run(cfg, data),
			}
			res.json({data});
			return;
		}
		if (data.content.path.indexOf('About') > -1) {
			data.body = {
				title: 'GitHub Issue',
				text: searchAbout.run(cfg, data),
			}
			res.json({data});
			return;
		}

		data.body = {
			title: 'GitHub Issue',
			text: tickets.run(cfg, data)
		}
		res.json({data});
		return;
	}

	// Fetch command not found, so try as if a socket 'request'
	data.content.title = data.content.path + '.tid';
	tryToOpenFile(cfg, 0, data,
		(result) => {
			if (data.body) res.json({data})
		});
}

exports.fetch = fetch;

