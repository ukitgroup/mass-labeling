const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');

const Site = require('../../models/site');
const Task = require('../../models/task');
const User = require('../../models/user');

const logger = require('../../libs/logger');
const config = require('../../config');


module.exports = (program) => {
	program.description('Export answers');

	program.option('--dataset <dataset>', 'Dataset name for export. For multiple use config:cli/export/answers/datasets (default: all datasets)');
	program.option('--out <out_path>', 'JSON path', config.get('cli.export.answers.out'));

	// eslint-disable-next-line prefer-arrow-callback
	program.asyncAction(async function (args) {
		this.requireOption('out');


		// Получаем пользоватлей
		const users = await User.find();
		const usersMap = _.keyBy(users, 'id');

		logger.info('Users done');


		// Получаем сайты
		const sitesFilter = {
			...Site.filter.allowedStatuses,
		};
		if (config.get('cli.export.answers.datasets').length) sitesFilter.dataset = { $in: config.get('cli.export.answers.datasets') };
		if (args.dataset) sitesFilter.dataset = args.dataset;
		const sites = await Site.find(sitesFilter);

		logger.info('Sites done');


		// Получаем ответы для всех сайтов
		const tasks = await Task.find({
			siteId: { $in: sites.map(site => site.id) },
			answer: { $ne: 0 },
		}).lean();
		const tasksMap = _.groupBy(tasks, 'siteId');

		logger.info('Tasks done');


		// Формируем набор ответов
		const answers = sites.map(site => ({
			url: site.url,
			dataset: site.dataset,
			answers: tasksMap[site.id].map(task => ({
				answer: task.answer,
				user: usersMap[task.userId].email,
			})),
		}));

		logger.info('Answers done');


		// Сохраняем набор ответов
		await fs.mkdirp(path.dirname(args.out));
		await fs.writeJson(args.out, answers);

		logger.info('JSON done');
	});
};
