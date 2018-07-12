const Task = require('../../models/task');


const router = require('express').Router();


router.get('/', async (req, res, next) => {
	try {
		const sites = await Task.getBrokenSites();

		res.render('broken', { sites });
	} catch (err) {
		err.message = req.__(err.message);
		next(err);
	}
});


module.exports = router;
