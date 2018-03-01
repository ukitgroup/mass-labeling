const bridges = require('../bridges');

const router = require('express').Router();


router.post('/:siteId/approve', bridges.site.id, async (req, res, next) => {
	try {
		await req.site.approve();

		res.api.response();
	} catch (err) {
		next(err);
	}
});

router.post('/:siteId/disable', bridges.site.id, async (req, res, next) => {
	try {
		await req.site.disable();

		res.api.response();
	} catch (err) {
		next(err);
	}
});


module.exports = router;
