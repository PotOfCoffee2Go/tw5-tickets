const { createLogger, format, transports, config } = require('winston');
const { combine, timestamp, json } = format;

const rightTwoChar = (txt) => ('00' + txt).substr(-2);
let d = new Date();
let logFilename = './logs/' + d.getFullYear() + "-" + rightTwoChar(d.getMonth()+1) +
	"-" + rightTwoChar(d.getDate()) + "-" + "server.log";

const logger = createLogger({
	levels: config.syslog.levels,
	defaultMeta: { component: 'TW5 Ticket Server' },
	format: combine(
		timestamp({
			format: 'YYYY-MM-DD HH:mm:ss'
		}),
		json()
	),
	exceptionHandlers: [
		new transports.File({ filename: './logs/server-error.log' })
	],
	transports: [
		new transports.File({ filename: logFilename })
	],
});

module.exports = logger;
