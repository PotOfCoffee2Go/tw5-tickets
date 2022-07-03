// Server command line interface
module.exports = (cfg) => {
  var argv = require('yargs')
    .option('port', {
      alias: 'p',
      describe: 'Server listen on port'
    })
    .usage('Usage: $0 [-p | --port <port>] [-h | --help]')
    .example('$0 -p 3000', 'Starts server on port 3000')
    .help('h')
    .alias('h', 'help')
    .argv;

  if (argv.p) {
    cfg.listenPort = argv.p;
  }
}

