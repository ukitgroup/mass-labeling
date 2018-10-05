const { ForbiddenError } = require('../../libs/http-errors');


module.exports = {
	user(req, res, next) {
		try {
			if (! req.user) throw new ForbiddenError();

			next();
		} catch (err) {
			// eslint-disable-next-line no-underscore-dangle
			err.message = req.__(err.message);
			next(err);
		}
	},

	admin(req, res, next) {
		try {
			if (! req.user || req.user.role !== 'admin') throw new ForbiddenError();

			next();
		} catch (err) {
			// eslint-disable-next-line no-underscore-dangle
			err.message = req.__(err.message);
			next(err);
		}
	},
};
