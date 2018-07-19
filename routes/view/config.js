const router = require('express').Router();

const config = require('../../config');


router.get('/', (req, res, next) => {
	try {
		res.render('config', {
			config: config.getConfig(),
		});
	} catch (err) {
		// eslint-disable-next-line no-underscore-dangle
		err.message = req.__(err.message);
		next(err);
	}
});


module.exports = router;
