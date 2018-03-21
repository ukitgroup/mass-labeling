const fs = require('fs-extra');
const _ = require('lodash');

const Site = require('../../model/site');
const Task = require('../../model/task');
const User = require('../../model/user');

const logger = require('../../lib/logger');


module.exports = (program) => {
	program.description('Export answers');

	program.option('--dataset <dataset_name>', 'Dataset name for export');
	program.option('--out <out_path>', 'JSON path');

	// eslint-disable-next-line prefer-arrow-callback
	program.action(async function (args) {
		this.requireOption('dataset');
		this.requireOption('out');


		try {
			// Получаем пользоватлей
			const users = await User.find().exec();
			const usersMap = _.keyBy(users, 'id');

			logger.info('Users done');


			// Получаем сайты
			const sites = await Site.find({
				...Site.filter.allowedStatuses,
				dataset: args.dataset,
			}).exec();

			logger.info('Sites done');


			// Получаем ответы для всех сайтов
			const tasks = await Task.find({
				siteId: { $in: sites.map(site => site.id) },
				answer: { $ne: 0 },
			}).exec();

			logger.info('Tasks done');


			// Формируем набор ответов
			const answers = sites.map(site => ({
				url: site.url,
				answers: tasks.filter(task => task.siteId.equals(site.id)).map(task => ({
					answer: task.answer,
					user: usersMap[task.userId].email,
				})),
			}));

			logger.info('Answers done');


			// Сохраняем набор ответов
			await fs.writeJson(args.out, answers);

			logger.info('JSON done');
		} catch (err) {
			logger.error(err);
		}

		process.exit(0);
	});
};
