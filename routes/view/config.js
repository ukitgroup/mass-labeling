/* eslint-disable no-underscore-dangle */

const fs = require('fs');
const path = require('path');

const router = require('express').Router();

const config = require('../../config');

const Site = require('../../models/site');
const User = require('../../models/user');


// Values located in lang files
const statuses = {
	active: '',
	disabled: '',
};

// Values located in lang files
const roles = {
	admin: '',
	user: '',
};


router.get('/', async (req, res, next) => {
	try {
		// Config tabs
		const availableDataSets = await Site.getAllDataSets();

		const dataSets = config.get('sites.allowedDatasets');

		availableDataSets.forEach((dataSet) => {
			dataSet.isActive = dataSets.length > 0
				? dataSets.indexOf(dataSet._id) >= 0
				: true;

			// dataSet.markedForExport = dataSets.length > 0
			// 	? dataSets.indexOf(dataSet._id) >= 0
			// 	: true;
		});


		// Assessment tab
		const instructionsPageHTML = fs
			.readFileSync(path.resolve(__dirname, '../../public/instruction.html'), 'utf-8')
			.trim();


		// Users tab
		const users = await User.find();

		const rawUsers = users.map(user => user.toObject());
		rawUsers.forEach(user => delete user.password);


		res.render('config', {
			users: rawUsers,
			statuses,
			roles,

			instructionsPageHTML,

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
