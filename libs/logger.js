const bunyan = require('bunyan');

const config = require('../config');


module.exports = bunyan.createLogger({
	name: config.get('logger.name'),
	stream: process.stdout,
	level: config.get('logger.level'),
	serializers: bunyan.stdSerializers,
});
