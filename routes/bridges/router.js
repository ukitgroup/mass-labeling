const { NotFoundError } = require('../../libs/http-errors');

const logger = require('../../libs/logger');


module.exports = {
	noCache(req, res, next) {
		res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
		res.header('Expires', '-1');
		res.header('Pragma', 'no-cache');
		next();
	},

	notFound(req, res, next) {
		next(new NotFoundError());
	},

	// eslint-disable-next-line no-unused-vars
	error(err, req, res, next) {
		logger.error(err);

		res.status(err.status || 500);
		res.render('error', {
			status: err.status || 'n/a',
			error: err.message || 'n/a',
		});
	},

	// eslint-disable-next-line no-unused-vars
	apiError(err, req, res, next) {
		logger.error(err);

		res.api.error(err);
	},
};
