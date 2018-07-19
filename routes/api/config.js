const Config = require('../../config/index');

const router = require('express').Router();


router.post('/update', async (req, res, next) => {
	try {
		const config = req.body;

		await Config.updateConfig(config);

		console.log(req.body);

		res.api.response();
	} catch (err) {
		// eslint-disable-next-line no-underscore-dangle
		err.message = req.__(err.message);
		next(err);
	}
});


module.exports = router;
