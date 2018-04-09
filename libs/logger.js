const bunyan = require('bunyan');


const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = bunyan.createLogger({
	name: 'app',
	stream: process.stdout,
	level: isDevelopment ? 'debug' : 'info',
	serializers: bunyan.stdSerializers,
});
