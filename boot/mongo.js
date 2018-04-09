const Promise = require('bluebird');
const mongoose = require('mongoose');

const config = require('../config');
const logger = require('../libs/logger');


module.exports = () => {
	mongoose.Promise = Promise;
	mongoose.connect(config.get('mongo.url'), (err) => {
		if (err) {
			logger.error(err);
			process.exit(1);
		}
	});
};
