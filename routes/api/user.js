const User = require('../../models/user');


const bridges = require('../bridges');

const router = require('express').Router();


router.post('/add', async (req, res, next) => {
	try {
		await User.create({
			email: req.body.email,
			password: User.hash(req.body.pass),
			status: req.body.status,
			role: req.body.role,
		});

		res.api.response();
	} catch (err) {
		// eslint-disable-next-line no-underscore-dangle
		err.message = req.__(err.message);
		next(err);
	}
});

router.post('/:userId/save', bridges.user.id, async (req, res, next) => {
	try {
		await req.curUser.setEmail(req.body.email);
		if (req.body.pass) await req.curUser.setPassword(req.body.pass);
		await req.curUser.setStatus(req.body.status);
		await req.curUser.setRole(req.body.role);

		res.api.response();
	} catch (err) {
		// eslint-disable-next-line no-underscore-dangle
		err.message = req.__(err.message);
		next(err);
	}
});

router.post('/:userId/create-slider', bridges.user.id, async (req, res, next) => {
	try {
		await req.curUser.createSlider();

		res.api.response();
	} catch (err) {
		// eslint-disable-next-line no-underscore-dangle
		err.message = req.__(err.message);
		next(err);
	}
});


module.exports = router;
