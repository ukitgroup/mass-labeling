/* eslint-disable no-underscore-dangle */
const Config = require('../../config');

const router = require('express').Router();

const fs = require('fs');
const path = require('path');


router.post('/update', async (req, res, next) => {
	try {
		const { config, availableDataSets /* , cliExportDataSets */ } = req.body;

		Config.updateConfig(config);

		const activeDataSets = availableDataSets
			.filter(dataSet => dataSet.isActive)
			.map(dataSet => dataSet._id);

		Config.set('sites.allowedDatasets', activeDataSets);

		await Config.updateFile();

		res.api.response();
	} catch (err) {
		// eslint-disable-next-line no-underscore-dangle
		err.message = req.__(err.message);
		next(err);
	}
});


router.post('/update-instructions', async (req, res, next) => {
	try {
		const { instructions } = req.body;

		fs.writeFileSync(path.resolve(__dirname, '../../public/instruction.html'), instructions);

		res.api.response();
	} catch (err) {
		// eslint-disable-next-line no-underscore-dangle
		err.message = req.__(err.message);
		next(err);
	}
});


module.exports = router;
