/* eslint-disable no-underscore-dangle */

const { NotFoundError } = require('../../libs/http-errors');

const Config = require('../../config');

const router = require('express').Router();

const fs = require('fs');
const path = require('path');

const User = require('../../models/user');
const Task = require('../../models/task');
const TaskSet = require('../../models/taskset');

const util = require('util');


const writeFileAsync = util.promisify(fs.writeFile);


router.post('/update', async (req, res, next) => {
	try {
		const { config, availableDataSets, instructions } = req.body;

		// Update config
		Config.updateConfig(config);

		const activeDataSets = availableDataSets
			.filter(dataSet => dataSet.isActive)
			.map(dataSet => dataSet._id);

		Config.set('sites.allowedDatasets', activeDataSets);

		await Config.updateFiles();

		// Update instruction.html
		await writeFileAsync(path.resolve(__dirname, '../../public/instruction.html'), instructions);

		res.api.response();
	} catch (err) {
		// eslint-disable-next-line no-underscore-dangle
		err.message = req.__(err.message);
		next(err);
	}
});


router.post('/add-user', async (req, res, next) => {
	try {
		const { user } = req.body;

		await User.create({
			email: user.email,
			password: User.hash(user.password),
			status: user.status,
			role: user.role,
		});

		res.api.response();
	} catch (err) {
		// eslint-disable-next-line no-underscore-dangle
		err.message = req.__(err.message);
		next(err);
	}
});

router.post('/:userId/update-user', async (req, res, next) => {
	try {
		const { user } = req.body;
		const { userId = 0 } = req.params;

		const storedUser = await User.findById(userId);

		if (! storedUser) {
			throw new NotFoundError();
		}

		await storedUser.setEmail(user.email);
		await storedUser.setStatus(user.status);
		await storedUser.setRole(user.role);

		if (user.password) {
			await storedUser.setPassword(user.password);
		}

		res.api.response();
	} catch (err) {
		// eslint-disable-next-line no-underscore-dangle
		err.message = req.__(err.message);
		next(err);
	}
});

router.post('/:userId/create-slider', async (req, res, next) => {
	try {
		const { userId = 0 } = req.params;

		const userAnswersCount = await Task.countByUserId(userId);

		if (! userAnswersCount) {
			throw new Error('slider_creation_error');
		}

		const storedUser = await User.findById(userId);

		if (! storedUser) {
			throw new NotFoundError();
		}

		await storedUser.createSlider();

		res.api.response();
	} catch (err) {
		// eslint-disable-next-line no-underscore-dangle
		err.message = req.__(err.message);
		next(err);
	}
});

router.post('/add-taskset', async (req, res, next) => {
	try {
		const { taskSet } = req.body;

		taskSet.activeDataSets = taskSet.dataSets
			.filter(dataSet => dataSet.isInTaskSet)
			.map(dataSet => dataSet._id);

		// console.log(taskSet.activeDataSets);

		delete taskSet.dataSets;

		await TaskSet.create({
			...taskSet,
		});

		res.api.response();
	} catch (err) {
		// eslint-disable-next-line no-underscore-dangle
		err.message = req.__(err.message);
		next(err);
	}
});

router.post('/:taskSetId/edit-taskset', async (req, res, next) => {
	try {
		const { taskSet } = req.body;
		const { taskSetId = 0 } = req.params;

		const storedTaskSet = await TaskSet.findById(taskSetId);

		if (! storedTaskSet) {
			throw new NotFoundError();
		}

		taskSet.activeDataSets = taskSet.dataSets
			.filter(dataSet => dataSet.isInTaskSet)
			.map(dataSet => dataSet._id);

		// console.log(taskSet.activeDataSets);

		delete taskSet.dataSets;

		await storedTaskSet.update(taskSet);

		res.api.response();
	} catch (err) {
		// eslint-disable-next-line no-underscore-dangle
		err.message = req.__(err.message);
		next(err);
	}
});

router.post('/:taskSetId/activate', async (req, res, next) => {
	try {
		// todo
		res.api.response();
	} catch (err) {
		// eslint-disable-next-line no-underscore-dangle
		err.message = req.__(err.message);
		next(err);
	}
});

module.exports = router;
