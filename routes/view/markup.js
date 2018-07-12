const Task = require('../../models/task');

const config = require('../../config');


const router = require('express').Router();


router.get('/', async (req, res, next) => {
	try {
		res.render('markup', {
			layout: false,
			limit: config.get('markup.limit'),
			count: await Task.countByUserId(req.user.id, true),
		});
	} catch (err) {
		err.message = req.__(err.message);
		next(err);
	}
});


module.exports = router;
