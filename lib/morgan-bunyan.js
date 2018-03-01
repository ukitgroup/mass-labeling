const stream = require('stream');
const morgan = require('morgan');

const logger = require('../lib/logger');


module.exports = (format) => {
	const morganWritableStream = new stream.Writable({
		write(buffer, encoding, callback) {
			logger.info(buffer.toString().replace(/\n/g, ''));
			callback();
		},
	});

	return morgan(format, {
		stream: morganWritableStream,
	});
};
