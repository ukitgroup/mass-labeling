require('../boot/dotenv')();
require('../boot/mongo')();


const Promise = require('bluebird');
const program = require('commander');
const fs = require('fs-extra');
const path = require('path');
const json = require('json-helper');
const decompress = require('decompress');
const _ = require('lodash');

const helpers = require('../lib/helpers');

const Site = require('../model/site');
const User = require('../model/user');
const Task3 = require('../model/task3');

const logger = require('../lib/logger');


program
	.command('importDataset')
	.option('--ds <val>', 'Dataset archive [<path>/]<prefix>/<tag>.<id>.zip')
	// eslint-disable-next-line prefer-arrow-callback
	.action(async function (o) {
		try {
			const rootPath = path.resolve(__dirname, '..');

			// Получаем путь к датасету
			const dsPath = path.resolve(o.ds);

			// Извлекаем из пути префикс, тег, ид и вычисляем категорию
			const prefix = path.basename(path.dirname(dsPath));
			const [tag, id] = path.basename(dsPath).split('.');
			const category = `${prefix}_${tag}`;

			// Распаковываем архив, перемещаем скриншоты и читаем список сатов
			const tmpPath = path.resolve(rootPath, 'tmp', id);
			await decompress(dsPath, tmpPath);
			await fs.move(path.resolve(tmpPath, 'screenshots'), path.resolve(rootPath, 'screenshots', id), { overwrite: true });
			const sites = await json.readListAsync(path.resolve(tmpPath, 'out.json'));
			await fs.remove(tmpPath);

			// Сохраняем сайты
			await Promise.mapSeries(sites, async (site) => {
				await Site.create({
					url: site.url,
					screenshot: site.screenshot.replace(/^screenshots/, id),
					category,
				});
			});

			process.exit(0);
		} catch (err) {
			logger.error(err);
			process.exit(1);
		}
	});


program
	.command('exportDataset3')
	// eslint-disable-next-line prefer-arrow-callback
	.action(async function () {
		try {
			// Получаем сайты
			const sites = await Site.getAll({
				...Site.filter.allowedStatuses,
				...Site.filter.allowedCategories,
			});


			// Получаем задачи
			const tasks = await Task3.find({
				siteId: {
					$in: sites.map(site => site.id),
				},
				answer: {
					$ne: 0,
				},
				status: 'active',
			}).exec();


			if (! sites.length || ! tasks.length) {
				throw new Error('Empty export');
			}


			// Получаем описания
			const descriptions = sites.map(site => _.pick(site, ['id', 'url', 'screenshot', 'category']));


			// Получаем сравнения
			const progress = helpers.progress.create('Tasks');
			progress.total = tasks.length;
			progress.tick(0);
			const comparisons = await Promise.mapSeries(tasks, async (task) => {
				progress.tick();

				return {
					site: (await Site.findOne({
						_id: task.siteId,
					})).url,
					answer: task.answer,
					user: (await User.findOne({
						_id: task.userId,
					})).email,
				};
			});


			// Получаем котегории
			const categories = _.uniq((await Site.getAll()).map(site => site.category));

			descriptions.forEach((site) => {
				site.category = categories.indexOf(site.category);
			});


			// Сохраняем результат
			json.writeSync('tmp/export3.json', {
				descriptions,
				comparisons,
				categories,
			});

			process.exit(0);
		} catch (err) {
			logger.error(err);
			process.exit(1);
		}
	});


program
	.command('addUser')
	.option('--email <val>', 'E-mail')
	.option('--password <val>', 'Password')
	.option('--role <val>', 'Role')
	// eslint-disable-next-line prefer-arrow-callback
	.action(async function (o) {
		try {
			await User.create({
				email: o.email,
				password: User.hash(o.password),
				role: o.role,
			});

			process.exit(0);
		} catch (err) {
			logger.error(err);
			process.exit(1);
		}
	});


program.parse(process.argv);
