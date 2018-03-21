const { ForbiddenError } = require('../../lib/http-errors');

const Site = require('../../model/site');
const Task = require('../../model/task');

const logger = require('../../lib/logger');


const bridges = require('../bridges');

const router = require('express').Router();


router.post('/create', async (req, res, next) => {
	try {
		const site = await Site.getRandom();

		logger.info({
			siteId: site.id,
			userId: req.user.id,
		}, 'createTask');

		res.api.response({
			siteId: site.id,
			siteStatus: site.status,
		});
	} catch (err) {
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
		if (err && ['Markup overdose', 'Bad markup request'].includes(err.message)) {
			next(ForbiddenError.from(err));
			return;
		}

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
		next(err);
	}
});


module.exports = router;
