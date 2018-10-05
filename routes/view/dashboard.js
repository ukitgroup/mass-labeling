const Site = require('../../models/site');
const Task = require('../../models/task');


const router = require('express').Router();


router.get('/', async (req, res, next) => {
	try {
		const brokenCount = await Site.count({
			_id: {
				$in: await Task.distinct('siteId', {
					answer: 0,
				}),
			},
			status: 'active',
		});

		res.render('dashboard', {
			brokenCount,
			markupCount: await Task.countByUserId(req.user.id, true),
		});
	} catch (err) {
		// eslint-disable-next-line no-underscore-dangle
		err.message = req.__(err.message);
		next(err);
	}
});


module.exports = router;
