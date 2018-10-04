/* eslint-disable no-underscore-dangle */
const Task = require('../../models/task');
const TaskSet = require('../../models/taskset');
const Site = require('../../models/site');


const router = require('express').Router();


router.get('/', async (req, res, next) => {
	try {
		const activeTaskSet = await TaskSet.getCurrentActive();

		if (! activeTaskSet) {
			throw new Error('no_active_tasks');
		}

		const showDataSetsRandomly = activeTaskSet.randomSelection;

		let limit = 0;

		if (showDataSetsRandomly) {
			// If 0, user has no tasks limit, we'll display limit as ∞
			limit = activeTaskSet.assessmentLimit || Infinity;
		} else {
			limit = await Site.getActiveSitesCount();
		}

		res.render('assessment', {
			limit,
			layout: false,
			count: await Task.countByUserId(req.user.id, true),
			activeTaskSetId: activeTaskSet._id,
		});
	} catch (err) {
		// eslint-disable-next-line no-underscore-dangle
		err.message = req.__(err.message);
		next(err);
	}
});


module.exports = router;
