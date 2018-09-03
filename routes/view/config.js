/* eslint-disable no-underscore-dangle */

const fs = require('fs');
const path = require('path');

const _ = require('lodash');

const router = require('express').Router();

const config = require('../../config');

const Site = require('../../models/site');
const User = require('../../models/user');
const Slider = require('../../models/slider');
const Task = require('../../models/task');
const TaskSet = require('../../models/taskset');

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
		const instructionsPageHTML = await readFileAsync(
			path.resolve(__dirname, '../../public/instruction.html'),
			'utf-8',
		);

		// await TaskSet.create({
		// 	assessmentLimit: 0,
		// 	activeDataSets: [],
		// 	randomSelection: true,
		// 	isActive: false,
		// });

		// All {_id: ***}
		// console.log(availableDataSets)

		// 1. Получаем все TaskSet'ы
		const taskSets = await TaskSet.find();

		const rawTaskSets = taskSets
			.map((taskSet) => {
				const rawTaskSet = taskSet.toObject();

				const taskSetActiveDataSets = rawTaskSet.activeDataSets;

				// Active
				// console.log(taskSetActiveDataSets)

				// 2. Инжектим в каждый тасксет наборы данных.
				// В каждый набор добавляем поле молели isInTaskSet, которое означает,
				// активирован ли датасет в текущем тасксете
				rawTaskSet.dataSets = availableDataSets.map((dataSet) => {
					const dataSetClone = _.clone(dataSet);

					dataSetClone.isInTaskSet = taskSetActiveDataSets.indexOf(dataSetClone._id) >= 0;

					return dataSetClone;
				});

				return rawTaskSet;
			});


		// console.log(taskSets);


		// Users tab
		const users = await User.find();
		const rawUsers = users.map(user => user.toObject());

		await Promise.all(rawUsers.map(async (user) => {
			const userAnswersCount = await Task.countByUserId(user._id);
			user.hasAnswers = userAnswersCount > 0;

			const slidersOfUser = await Slider.getAllByName(user.email);
			user.hasSlider = slidersOfUser.length > 0;

			delete user.password;
		}));


		res.render('config', {
			users: rawUsers,
			statuses,
			roles,

			instructionsPageHTML,
			taskSets: rawTaskSets,

			availableDataSets,
			config: config.getConfig(),
		});
	} catch (err) {
		err.message = req.__(err.message);
		next(err);
	}
});


module.exports = router;
