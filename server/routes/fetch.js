// If 'fetch' fails - try to send the .tid as if a socket 'request'
const tryToOpenFile = require('../sockets/get-tiddler');

// fetch tickets
const tickets = require('./tiddlers/tickets');

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
	data.content.opt = opt;

	cfg.log.info({action: 'fetch', path: data.content.path, searchWords: opt.searchWords});

	if (data.content.path.substr(0,7) === 'tickets') {
		data.body = {
			title: 'GitHub Issue',
			text: tickets.run(cfg, data)
		}
		return res.json({data});
	}

	// Fetch command not found, so try as if a socket 'request'
	data.content.title = data.content.path + '.tid';
	tryToOpenFile(cfg, 0, data,
		(result) => {
			if (data.body) res.json({data})
		});
}

exports.fetch = fetch;

