const Task3 = require('../../model/task3');


const router = require('express').Router();


router.get('/', async (req, res, next) => {
	try {
		res.render('markup3', {
			layout: false,
			count: await Task3.countByUserId(req.user.id, true),
		});
	} catch (err) {
		next(err);
	}
});


module.exports = router;
