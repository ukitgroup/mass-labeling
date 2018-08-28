const Task = require('../../models/task');
const Site = require('../../models/site');

const config = require('../../config');


const router = require('express').Router();


router.get('/', async (req, res, next) => {
	try {
		const showDataSetsRandomly = config.get('assessment.showRandomly');

		let limit = 0;

		if (showDataSetsRandomly) {
			// If 0, user has no tasks limit, we'll display limit as ∞
			limit = config.get('assessment.limit') || Infinity;
		} else {
			const approvedByUserSiteIds = await Task.distinct('siteId', {
				userId: {
					$eq: req.user.id,
				},
			});

			const additionalFilter = {
				_id: {
					$nin: approvedByUserSiteIds,
				},
			};

			// Display limit as is
			limit = await Site.getActiveSitesCount(additionalFilter);
		}

		res.render('markup', {
			limit,
			layout: false,
			count: await Task.countByUserId(req.user.id, true),
		});
	} catch (err) {
		// eslint-disable-next-line no-underscore-dangle
		err.message = req.__(err.message);
		next(err);
	}
});


module.exports = router;
