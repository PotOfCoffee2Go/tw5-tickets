const { createLogger, format, transports, config } = require('winston');
const { combine, timestamp, json } = format;

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
		new transports.Console(),
		new transports.File({ filename: './logs/server.log'})
	],
	transports: [
		new transports.File({ filename: './logs/server.log' })
	],
});

module.exports = logger;
