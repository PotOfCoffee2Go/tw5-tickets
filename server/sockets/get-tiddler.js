const fs = require('fs');

// Request web tiddler text from the server
module.exports = (cfg, socket, data, callback) => {
	console.log(`\x1b[33mSocket request for static tiddler ${data.content.path} \x1b[0m`);
	cfg.log.info({action: 'request', path: data.content.path});
	fs.readFile(cfg.homeDir + '/public/tiddlers/' + data.content.path, 'utf8', (err, text) => {
		if (err) {
			console.log('\x1b[31mserver.tiddler error', err, '\x1b[0m');
			data.error = err;
			callback({ data });
			return;
		}
		data.body = {
			text: text,
		}
		callback({ data });
	})
}

