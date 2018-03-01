const { NotFoundError } = require('../../lib/http-errors');

const User = require('../../model/user');


module.exports = {
	async id(req, res, next) {
		try {
			req.curUser = await User.findById(req.params.userId);
			if (! req.curUser) {
				throw new NotFoundError();
			}

			next();
		} catch (err) {
			next(err);
		}
	},
};
