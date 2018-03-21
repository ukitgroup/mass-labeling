const { NotFoundError } = require('../../lib/http-errors');

const Site = require('../../model/site');


module.exports = {
	async id(req, res, next) {
		try {
			req.site = await Site.findById(req.params.siteId);
			if (! req.site) throw new NotFoundError();

			next();
		} catch (err) {
			next(err);
		}
	},
};
