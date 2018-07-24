const router = require('express').Router();

const config = require('../../config');

const Site = require('../../models/site');


router.get('/', async (req, res, next) => {
	try {
		const availableDataSets = await Site.getAvailableDataSets();
		const cliExportDataSets = await Site.getAllDataSets();

		res.render('config', {
			cliExportDataSets,
			availableDataSets,
			config: config.getConfig(),
		});
	} catch (err) {
		// eslint-disable-next-line no-underscore-dangle
		err.message = req.__(err.message);
		next(err);
	}
});


module.exports = router;
