const Promise = require('bluebird');

const mongoose = require('mongoose');


module.exports = () => {
	mongoose.Promise = Promise;
	mongoose.connect(process.env.DB_URL, {
		useMongoClient: true,
	});
};
