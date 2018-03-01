const bunyan = require('bunyan');


const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = bunyan.createLogger({
	name: 'app',
	streams: [{
		stream: process.stdout,
		level: isDevelopment ? 'debug' : 'info',
	}, {
		stream: process.stderr,
		level: isDevelopment ? 100 : 'error',
	}],
});
