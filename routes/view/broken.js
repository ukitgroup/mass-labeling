const Task = require('../../model/task');


const router = require('express').Router();


router.get('/', async (req, res, next) => {
	try {
		const sites = await Task.getBrokenSites();

		res.render('broken', { sites });
	} catch (err) {
		next(err);
	}
});


module.exports = router;
