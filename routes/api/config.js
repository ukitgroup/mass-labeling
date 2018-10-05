/* eslint-disable no-underscore-dangle */

const { NotFoundError } = require('../../libs/http-errors');

const Config = require('../../config');

const router = require('express').Router();

const User = require('../../models/user');
const Task = require('../../models/task');
const TaskSet = require('../../models/taskset');

const fs = require('fs');
const path = require('path');
const util = require('util');


const readFileAsync = util.promisify(fs.readFile);


/**
 * Save settings values
 */
router.post('/save', async (req, res, next) => {
	try {
		const { config } = req.body;

		Config.updateConfig(config);

		res.api.response();
	} catch (err) {
		// eslint-disable-next-line no-underscore-dangle
		err.message = req.__(err.message);
		next(err);
	}
});


/**
 * Add new user
 */
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


/**
 * Edit user by id
 */
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


/**
 * Create slider of certain taskset for user
 */
router.post('/:userId/create-slider', async (req, res, next) => {
	try {
		const { userId = 0 } = req.params;
		const { taskSetId = 0 } = req.body;

		const userAnswersCount = await Task.countByUserId(userId);

		// Cant create a slider if user has no marks yet
		if (! userAnswersCount) {
			throw new Error('slider_creation_error');
		}

		const storedUser = await User.findById(userId);

		if (! storedUser) {
			throw new NotFoundError();
		}

		await storedUser.createSlider(taskSetId);

		res.api.response();
	} catch (err) {
		// eslint-disable-next-line no-underscore-dangle
		err.message = req.__(err.message);
		next(err);
	}
});


/**
 * Save new taskset
 */
router.post('/add-taskset', async (req, res, next) => {
	try {
		const { taskSet } = req.body;

		// Get selected datasets and put their names into the 'activeDataSets' property
		taskSet.activeDataSets = taskSet.dataSets
			.filter(dataSet => dataSet.isInTaskSet)
			.map(dataSet => dataSet._id);

		// If instruction is empty, set default one instead
		if (! taskSet.instruction) {
			taskSet.instruction = await readFileAsync(
				path.resolve(__dirname, '../../public/instruction.html'),
				'utf-8',
			);
		}

		await TaskSet.saveModel(taskSet);

		res.api.response();
	} catch (err) {
		// eslint-disable-next-line no-underscore-dangle
		err.message = req.__(err.message);
		next(err);
	}
});


/**
 * Edit taskset
 */
router.post('/edit-taskset', async (req, res, next) => {
	try {
		const { taskSet } = req.body;

		const storedTaskSet = await TaskSet.findById(taskSet._id);

		if (! storedTaskSet) {
			throw new NotFoundError();
		}

		// Get selected datasets and put their names into the 'activeDataSets' property
		taskSet.activeDataSets = taskSet.dataSets
			.filter(dataSet => dataSet.isInTaskSet)
			.map(dataSet => dataSet._id);

		// Cant set new limit less than user has max rated sites in task set
		const maxTasksCount = await Task.getMaxTasksCountOfUserInTaskSet(taskSet._id);
		const newLimit = taskSet.assessmentLimit;

		if (newLimit > 0 && maxTasksCount > 0 && newLimit < maxTasksCount) {
			const error = new Error('taskset_limit_error');
			error.data = maxTasksCount;
			throw error;
		}

		// If instruction is empty, set default one instead
		if (! taskSet.instruction) {
			taskSet.instruction = await readFileAsync(
				path.resolve(__dirname, '../../public/instruction.html'),
				'utf-8',
			);
		}

		await storedTaskSet.update(taskSet);

		res.api.response();
	} catch (err) {
		let message = req.__(err.message);

		if (err.data) {
			message = message.replace('%s', err.data);
		}

		err.message = message;

		next(err);
	}
});


/**
 * Activate certain taskset
 */
router.post('/activate', async (req, res, next) => {
	try {
		const currentActiveTaskSet = await TaskSet.getCurrentActive();

		if (currentActiveTaskSet) {
			await currentActiveTaskSet.deactivate();
		}

		const { taskSet } = req.body;

		const newActiveTaskSet = await TaskSet.findById(taskSet._id);

		if (! newActiveTaskSet) {
			throw new NotFoundError();
		}

		await newActiveTaskSet.activate();

		res.api.response();
	} catch (err) {
		// eslint-disable-next-line no-underscore-dangle
		err.message = req.__(err.message);
		next(err);
	}
});

module.exports = router;
