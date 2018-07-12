const bridges = require('../bridges');

const router = require('express').Router();


router.post('/:siteId/approve', bridges.site.id, async (req, res, next) => {
	try {
		await req.site.approve();

		res.api.response();
	} catch (err) {
		err.message = req.__(err.message);
		next(err);
	}
});

router.post('/:siteId/disable', bridges.site.id, async (req, res, next) => {
	try {
		await req.site.disable();

		res.api.response();
	} catch (err) {
		err.message = req.__(err.message);
		next(err);
	}
});


module.exports = router;
