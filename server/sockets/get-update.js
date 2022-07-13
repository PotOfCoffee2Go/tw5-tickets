const fs = require('fs');

const update = require('../../public/assets/db/updates.json');

const installFiles = (cfg, socket, list, data) => {
	list.forEach(path => {
		console.log(`\x1b[33mServer install sending ${path} \x1b[0m`);
		fs.readFile(cfg.homeDir + '/public/tiddlers/' + path, 'utf8', (err, text) => {
			if (err) {
				console.log('\x1b[31mserver.install error', err, '\x1b[0m');
			}
			else {
				data.body = {
					text: text,
				}
				// Send .tid to client
				socket.emit('client.tiddler.install', {data});
			}
		})
	})
}

// Request web tiddler text from the server
module.exports = (cfg, socket, data, callback) => {
	console.log(`\x1b[33mSocket request for TiddlyWiki update ${data.content.path} \x1b[0m`);
	cfg.log.info({action: 'request', path: data.content.path});
	var opt;
	try {
		opt = JSON.parse(data.content.options);
	} catch (e) {
		opt = {}
	}
	data.content.opt = opt;

	// Acknowledge the update request
	data.body = { acknowledged: true };
	callback({ data });
	delete data.body.acknowledged;

	if (opt.installApp === 'yes') {
		installFiles(cfg, socket, update.app, data);
		installFiles(cfg, socket, update['app-foot'], data);
	}
	if (opt.installDocs === 'yes') {
		installFiles(cfg, socket, update['docs-usage'], data);
		installFiles(cfg, socket, update['docs-dev'], data);
	}
	if (opt.installPlugins === 'yes') {
		installFiles(cfg, socket, update.plugins, data);
	}
	if (opt.installSidebar === 'yes') {
		installFiles(cfg, socket, update.sidebar, data);
	}
	if (opt.installConfig === 'yes') {
		installFiles(cfg, socket, update.config, data);
	}
	if (opt.installSheets === 'yes') {
		installFiles(cfg, socket, update.sheets, data);
	}

}

