const Promise = require('bluebird');
const fs = require('fs-extra');
const path = require('path');
const decompress = require('decompress');
const mongoose = require('mongoose');

const Site = require('../../models/site');

const logger = require('../../libs/logger');
const config = require('../../config');


module.exports = (program) => {
	program.description('Import dataset');

	program.option('--in <in_path>', 'Archive path', config.get('cli.import.dataset.in'));

	// eslint-disable-next-line prefer-arrow-callback
	program.asyncAction(async function (args) {
		this.requireOption('in');


		// Распаковываем архив, перемещаем скриншоты и читаем список сатов
		const tmpPath = path.resolve('tmp/import/dataset');
		await fs.mkdirp(path.dirname(tmpPath));
		await decompress(args.in, tmpPath);

		logger.info('Unzip done');


		const sitesRaw = await fs.readJson(path.resolve(tmpPath, 'out.json'));

		// Сохраняем сайты
		const sites = await Promise.mapSeries(sitesRaw, async (site) => {
			const id = mongoose.Types.ObjectId();

			const screenshotPath = path.join(config.get('sites.screenshotsPath'), site.dataset, `${id}.jpg`);
			await fs.mkdirp(path.dirname(screenshotPath));
			await fs.move(path.resolve(tmpPath, site.screenshot), screenshotPath, { overwrite: true });

			return {
				_id: id,
				url: site.url,
				dataset: site.dataset,
				screenshot: path.relative(config.get('sites.screenshotsPath'), screenshotPath),
			};
		});
		await Site.create(sites);

		logger.info('Sites done');


		await fs.remove(tmpPath);

		logger.info('Cleanup done');
	});
};
