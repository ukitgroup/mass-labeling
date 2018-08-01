/* eslint-disable no-underscore-dangle */

const fs = require('fs');
const path = require('path');

const router = require('express').Router();

const config = require('../../config');

const Site = require('../../models/site');




const User = require('../../models/user');


const statuses = {
	// active: 'Активен',
	active: '', // value moved to lang files
	// disabled: 'Отключен',
	disabled: '', // value moved to lang files
};

const roles = {
	// admin: 'Администратор',
	admin: '', // value moved to lang files
	// user: 'Пользователь',
	user: '', // value moved to lang files
};


const bridges = require('../bridges');

// const router = require('express').Router();


router.get('/list', async (req, res, next) => {
	try {
		const users = await User.find();

		res.render('user/list', { users, statuses, roles });
	} catch (err) {
		// eslint-disable-next-line no-underscore-dangle
		err.message = req.__(err.message);
		next(err);
	}
});

router.get('/add', (req, res) => {
	res.render('user/form', {
		curUser: null,
		statuses,
		roles,
	});
});

router.get('/:userId/edit', bridges.user.id, (req, res) => {
	res.render('user/form', {
		curUser: req.curUser,
		statuses,
		roles,
	});
});



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

		const instructionsPageHTML = fs
			.readFileSync(path.resolve(__dirname, '../../public/instruction.html'), 'utf-8')
			.trim();

		const users = await User.find();

		const rawUsers = users.map(user => user.toObject());
		rawUsers.forEach(user => delete user.password);

		res.render('config', {
			users: rawUsers,
			statuses,
			roles,
			instructionsPageHTML,
			curUser: {},
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
