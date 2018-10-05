/* eslint-disable no-underscore-dangle */

const _ = require('lodash');

const router = require('express').Router();

const config = require('../../config');
const languagesConfig = require('../../locales/i18n-config');

const Site = require('../../models/site');
const User = require('../../models/user');
const Slider = require('../../models/slider');
const Task = require('../../models/task');
const TaskSet = require('../../models/taskset');


const fs = require('fs');
const path = require('path');
const util = require('util');


const readFileAsync = util.promisify(fs.readFile);


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
		// Assessment tab
		const availableDataSets = await Site.getAllDataSets();

		const taskSets = await TaskSet.getAll();

		const rawTaskSets = taskSets.map(taskSet => taskSet.toObject());

		await Promise.all(rawTaskSets.map(async (taskSet) => {
			const taskSetActiveDataSets = taskSet.activeDataSets;

			const ratedSitesIds = await Task.distinct('siteId', {
				taskSetId: taskSet._id,
			});

			const ratedDataSetNames = await Site.distinct('dataset', {
				_id: { $in: ratedSitesIds },
			});

			taskSet.dataSets = availableDataSets.map((dataSet) => {
				const dataSetClone = _.clone(dataSet);
				const dataSetName = dataSetClone._id;

				// Dataset can be activated/deactivated if users have
				// no rated sites from this dataset
				dataSetClone.canBeChanged = ratedDataSetNames.indexOf(dataSetName) < 0;

				// Is dataset active in current task set
				dataSetClone.isInTaskSet = taskSetActiveDataSets.indexOf(dataSetName) >= 0;

				return dataSetClone;
			});
		}));

		const defaultInstruction = await readFileAsync(
			path.resolve(__dirname, '../../public/instruction.html'),
			'utf-8',
		);


		// Users tab
		const users = await User.find();
		const rawUsers = users.map(user => user.toObject());

		await Promise.all(rawUsers.map(async (user) => {
			// 1. Get all task sets where user has marks
			const taskSetsOfUserWithMarksIds = await Task.distinct('taskSetId', {
				userId: user._id,
			});

			user.taskSetsOfUserWithMarks = await TaskSet.find({
				_id: { $in: taskSetsOfUserWithMarksIds },
			});


			// 2. Get all task sets with sliders of user
			const taskSetsOfUserWithSlidersIds = await Slider.distinct('taskSetId', {
				name: user.email,
			});

			user.taskSetsOfUserWithSliders = await Promise
				.all(taskSetsOfUserWithSlidersIds.map(async taskSetId => TaskSet.findById(taskSetId)));

			delete user.password;
		}));


		res.render('config', {
			statuses,
			roles,
			defaultInstruction,
			availableDataSets,

			taskSets: rawTaskSets,
			users: rawUsers,

			config: config.getConfig(),
			definedLanguages: languagesConfig.availableLocales,
		});
	} catch (err) {
		err.message = req.__(err.message);
		next(err);
	}
});


module.exports = router;
