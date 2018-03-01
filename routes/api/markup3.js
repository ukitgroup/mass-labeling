const Site = require('../../model/site');
const Task3 = require('../../model/task3');

const logger = require('../../lib/logger');


const bridges = require('../bridges');

const router = require('express').Router();


router.post('/create', async (req, res, next) => {
	try {
		const [site] = await Site.getRandomSize(1);

		logger.info('createTask', {
			siteId: site.id,
			userId: req.user.id,
		});

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
		const task = await Task3.getNew({
			siteId: req.body.siteId,
			answer: Number(req.body.answer),
			userId: req.user.id,
		});

		logger.info('answerTask', {
			taskId: task.id,
			siteId: task.siteId,
			answer: task.answer,
			userId: task.userId,
		});

		res.api.response(task.id);
	} catch (err) {
		next(err);
	}
});

router.post('/:taskId/undo', bridges.task.id3, bridges.task.owner, async (req, res, next) => {
	try {
		await req.task.remove();

		logger.info('undoTask', {
			taskId: req.task.id,
			siteId: req.task.siteId,
			answer: req.task.answer,
			userId: req.task.userId,
		});

		res.api.response();
	} catch (err) {
		next(err);
	}
});


module.exports = router;
