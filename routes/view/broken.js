const Task3 = require('../../model/task3');


const router = require('express').Router();


router.get('/', async (req, res, next) => {
	try {
		const sites = await Task3.getBrokenSites();

		res.render('broken', { sites });
	} catch (err) {
		next(err);
	}
});


module.exports = router;
