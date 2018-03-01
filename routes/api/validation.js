const Validation = require('../../model/validation');


const bridges = require('../bridges');

const router = require('express').Router();


router.post('/create', async (req, res, next) => {
	try {
		const task = await Validation.getNext();

		res.api.response(task.serialize());
	} catch (err) {
		next(err);
	}
});

router.post('/:validationId/answer', bridges.validation.id, async (req, res, next) => {
	try {
		await req.validation.setAnswer(req.body.answer);

		res.api.response();
	} catch (err) {
		next(err);
	}
});

router.post('/:validationId/undo', bridges.validation.id, async (req, res, next) => {
	try {
		await req.validation.setAnswer('new');

		res.api.response();
	} catch (err) {
		next(err);
	}
});


module.exports = router;
