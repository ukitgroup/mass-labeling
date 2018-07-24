/* eslint-disable no-underscore-dangle */
const Config = require('../../config');

const router = require('express').Router();

const Site = require('../../models/site');


router.post('/update', async (req, res, next) => {
	try {
		const { config, availableDataSets /* , cliExportDataSets */ } = req.body;

		await Config.updateConfig(config);

		availableDataSets.forEach(async (dataSet) => {
			const storedDataSet = await Site.getById(dataSet._id);
			storedDataSet.setStatus(dataSet.status);
		});

		// Update DB field of field set
		// cliExportDataSets.forEach(async (dataSet) => {
		// 	const storedDataSet = await Site.getById(dataSet._id);
		// 	storedDataSet.setMarkedForExportStatus(dataSet.markedForExport);
		// });

		res.api.response();
	} catch (err) {
		// eslint-disable-next-line no-underscore-dangle
		err.message = req.__(err.message);
		next(err);
	}
});


module.exports = router;
