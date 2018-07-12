const { NotFoundError } = require('../../libs/http-errors');

const Site = require('../../models/site');


module.exports = {
	async id(req, res, next) {
		try {
			req.site = await Site.findById(req.params.siteId);
			if (! req.site) throw new NotFoundError();

			next();
		} catch (err) {
			err.message = req.__(err.message);
			next(err);
		}
	},
};
