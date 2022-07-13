// Implements server side socket.io processing

// Tiddler get/set
const getTiddler = require('./sockets/get-tiddler');
const setTiddler = require('./sockets/set-tiddler');

// Update TiddlyWiki
const getUpdate = require('./sockets/get-update');

// Create and listen for socket.io connections
module.exports = (cfg, app) => {
	const server = require('http').createServer(app);
	const io = require('socket.io')(server);

	// Watch and broadcast changes in tiddler (.tid) files
	const watcher = require('./sockets/watcher')(cfg, io);

	// Handle connection
	io.on('connection', (socket) => {
		console.log('\x1b[2;35mConnected succesfully to socket ...', socket.id, '\x1b[0m');
		// Send connected to client
		socket.emit('client.connected', `${socket.id}`);

		// Log disconnected from client
		socket.on('disconnect', (reason) => {
			console.log('\x1b[2;35m' + reason, socket.id, '\x1b[0m');
		});

		// Log message from a client
		socket.on('server.log', (data) => {
				console.log('\x1b[33m'  + data.content.text, '\x1b[0m');
		});

		// Request web tiddler text from the server
		socket.on('server.tiddler',  (data, callback) => {
			getTiddler(cfg, socket, data, callback);
		})

		// Request tiddlywiki install
		socket.on('server.install',  (data, callback) => {
			getUpdate(cfg, socket, data, callback);
		})

		// Save web tiddler text from client
		socket.on('server.savetid',  (data, callback) => {
			setTiddler(cfg, socket, data, callback);
		})
	});

	return {server, io};
}
