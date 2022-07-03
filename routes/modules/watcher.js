// Watch and broadcast changes in tiddler (.tid) files
const fs = require('fs');

module.exports = (cfg, io) => {
	// Watch for tiddler changes on the server
	let watcher = require('node-watch')(cfg.homeDir + '/public/tiddlers', {
		recursive: true,
		filter(f, skip) {
			// skip hidden file/folder
			if (/\/\./.test(f)) return skip;
			// only watch for .tid files
			return /\.tid$/.test(f);
		}
	});

	// Broadcast server-side tiddler changes to clients
	watcher.on('change', function(evt, name) {
		let regex = /[A-Za-z0-9_\-\.]+\.[A-Za-z0-9]+$/;
		// Just return if can not extract filename
		if (!regex.test(name)) return;

		let fname = regex.exec(name)[0];

		fs.readFile(name, 'utf8', (err, text) => {
			let data = {};
			if (err) {
				return console.log('Watcher.change', err);
			}
			data.body = {
				title: fname.replace(/\.tid$/, ''),
				text: text,
			}
			console.log(`\x1b[2;35mFile changed: ${fname}`, '\x1b[0m');
			io.emit('client.tiddler.change', {data});
		})
	});

}
