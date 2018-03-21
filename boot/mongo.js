const Promise = require('bluebird');
const mongoose = require('mongoose');

const conf = require('../conf');
const logger = require('../lib/logger');


module.exports = () => {
	mongoose.Promise = Promise;
	mongoose.connect(conf.mongo.url, (err) => {
		if (err) {
			logger.error(err);
			process.exit(1);
		}
	});
};
