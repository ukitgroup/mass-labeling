/* eslint-disable no-underscore-dangle */
const Site = require('../../models/site');
const Task = require('../../models/task');
const TaskSet = require('../../models/taskset');

const logger = require('../../libs/logger');

const bridges = require('../bridges');

const router = require('express').Router();


router.post('/create', async (req, res, next) => {
	try {
		const activeTaskSet = await TaskSet.getCurrentActive();

		if (! activeTaskSet) {
			throw new Error('no_active_tasks');
		}

		const showRandomly = activeTaskSet.randomSelection;

		let additionalFilter = {};

		// Retrieve all tasks continuously
		if (! showRandomly) {
			const approvedByUserSiteIds = await Task.distinct('siteId', {
				userId: {
					$eq: req.user.id,
				},

				taskSetId: {
					$eq: activeTaskSet._id,
				},
			});

			additionalFilter = {
				_id: {
					$nin: approvedByUserSiteIds,
				},
			};
		}

		const site = await Site.getRandom(additionalFilter);

		// User has any task
		if (site) {
			logger.info({
				siteId: site.id,
				userId: req.user.id,
			}, 'createTask');

			res.api.response({
				siteId: site.id,
				siteStatus: site.status,
			});
		} else {
			res.api.response({
				limitReached: true,
			});
		}
	} catch (err) {
		// eslint-disable-next-line no-underscore-dangle
		err.message = req.__(err.message);
		next(err);
	}
});

router.post('/answer', async (req, res, next) => {
	try {
		const task = await Task.getNew({
			siteId: req.body.siteId,
			answer: Number(req.body.answer),
			userId: req.user.id,
		});

		logger.info({
			taskId: task.id,
			siteId: task.siteId,
			answer: task.answer,
			userId: task.userId,
		}, 'answerTask');

		res.api.response(task.id);
	} catch (err) {
		// eslint-disable-next-line no-underscore-dangle
		err.message = req.__(err.message);
		next(err);
	}
});

router.post('/:taskId/undo', bridges.task.id, bridges.task.owner, async (req, res, next) => {
	try {
		await req.task.remove();

		logger.info({
			taskId: req.task.id,
			siteId: req.task.siteId,
			answer: req.task.answer,
			userId: req.task.userId,
		}, 'undoTask');

		res.api.response();
	} catch (err) {
		// eslint-disable-next-line no-underscore-dangle
		err.message = req.__(err.message);
		next(err);
	}
});


module.exports = router;
