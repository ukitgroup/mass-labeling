const path = require('path');

const config = require('../../config');


const bridges = require('../bridges');

const router = require('express').Router();


router.get('/:siteId/screenshot', bridges.site.id, async (req, res, next) => {
	try {
		res.sendFile(path.resolve(config.get('sites.screenshotsPath'), req.site.screenshot));
	} catch (err) {
		next(err);
	}
});


module.exports = router;
