const Task = require('../../model/task');

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
		next(err);
	}
});


module.exports = router;
