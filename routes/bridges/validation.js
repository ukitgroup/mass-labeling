const { NotFoundError } = require('../../lib/http-errors');

const Validation = require('../../model/validation');


module.exports = {
	async id(req, res, next) {
		try {
			req.validation = await Validation.findById(req.params.validationId);
			if (! req.validation) throw new NotFoundError();

			next();
		} catch (err) {
			next(err);
		}
	},
};
