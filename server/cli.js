// Server command line interface
module.exports = (cfg) => {
	var argv = require('yargs')
		.option('port', {
			alias: 'p',
			describe: 'Server listen on port'
		})
		.option('logurl', {
			alias: 'l',
			type: 'boolean',
			default: false,
			describe: 'Log GET URLs to console'
		})
		.usage('Usage: $0 [-p | --port <port>] [-l | --logurl] [-h | --help]')
		.example('$0 -p 3000', 'Starts server on port 3000')
		.help('h')
		.alias('h', 'help')
		.argv;

	if (argv.p) {
		cfg.listenPort = argv.p;
	}
	if (argv.l) {
		cfg.logUrl = true;
	}
}

