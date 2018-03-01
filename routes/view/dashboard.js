const Site = require('../../model/site');
const Task3 = require('../../model/task3');


const router = require('express').Router();


router.get('/', async (req, res, next) => {
	try {
		const brokenCount = await Site.count({
			_id: {
				$in: await Task3.distinct('siteId', {
					answer: 0,
				}),
			},
			status: 'active',
		}).exec();

		res.render('dashboard', {
			brokenCount,
			markup3Count: await Task3.countByUserId(req.user.id, true),
		});
	} catch (err) {
		next(err);
	}
});


module.exports = router;
