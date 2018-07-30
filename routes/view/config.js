/* eslint-disable no-underscore-dangle */

const router = require('express').Router();

const config = require('../../config');

const Site = require('../../models/site');


router.get('/', async (req, res, next) => {
	try {
		const availableDataSets = await Site.getAllDataSets();

		const dataSets = config.get('sites.allowedDatasets');

		availableDataSets.forEach((dataSet) => {
			const isActiveDataSet = dataSets.length > 0
				? dataSets.indexOf(dataSet._id) >= 0
				: true;

			dataSet.isActive = isActiveDataSet;
			// dataSet.markedForExport = dataSets.indexOf(dataSet._id) >= 0;
		});

		res.render('config', {
			availableDataSets,
			cliExportDataSets: [],
			config: config.getConfig(),
		});
	} catch (err) {
		// eslint-disable-next-line no-underscore-dangle
		err.message = req.__(err.message);
		next(err);
	}
});


module.exports = router;
