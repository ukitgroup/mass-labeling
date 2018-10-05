const TaskSet = require('../../models/taskset');

const router = require('express').Router();


router.get('/', async (req, res, next) => {
	try {
		const activeTaskSet = await TaskSet.getCurrentActive();

		if (! activeTaskSet) {
			throw new Error('no_active_tasks');
		}

		res.render('instruction', {
			layout: false,
			instruction: activeTaskSet.instruction,
		});
	} catch (err) {
		// eslint-disable-next-line no-underscore-dangle
		err.message = req.__(err.message);
		next(err);
	}
});


module.exports = router;
