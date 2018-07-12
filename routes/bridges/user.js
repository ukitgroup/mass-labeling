const { NotFoundError } = require('../../libs/http-errors');

const User = require('../../models/user');


module.exports = {
	async id(req, res, next) {
		try {
			req.curUser = await User.findById(req.params.userId);
			if (! req.curUser) throw new NotFoundError();

			next();
		} catch (err) {
			err.message = req.__(err.message);
			next(err);
		}
	},
};
