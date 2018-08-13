const Task = require('../../models/task');

const config = require('../../config');


const router = require('express').Router();


router.get('/', async (req, res, next) => {
	try {
		const showDataSetsRandomly = config.get('assessment.showRandomly');

		res.render('markup', {
			layout: false,
			limit: showDataSetsRandomly ? config.get('markup.limit') : 0,
			count: await Task.countByUserId(req.user.id, true),
		});
	} catch (err) {
		// eslint-disable-next-line no-underscore-dangle
		err.message = req.__(err.message);
		next(err);
	}
});


module.exports = router;
