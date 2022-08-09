const fs = require('fs');
const tickets = require('./tiddlers/tickets');

// Route the 'fetch' command
const fetch = (cfg, req, res) => {
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

	// Fetch command not found, so try as static tiddler
	data.content.path = data.content.path + '.tid';
	console.log(`\x1b[33mFetch static tiddler ${data.content.path} \x1b[0m`);
	try {
		const text = fs.readFileSync(cfg.homeDir + '/public/tiddlers/' + data.content.path, 'utf8');
		data.body = {
			text: text,
		}
	} catch (err) {
		console.log('\x1b[31mFetch error', err, '\x1b[0m');
		data.error = err;
	}
	return res.json({ data });
}

exports.fetch = fetch;

