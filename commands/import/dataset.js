const fs = require('fs-extra');
const path = require('path');
const decompress = require('decompress');
const mongoose = require('mongoose');

const Site = require('../../model/site');

const logger = require('../../lib/logger');
const conf = require('../../conf');


module.exports = (program) => {
	program.description('Import dataset');

	program.option('--in <in_path>', 'Archive path', conf.cli.import.dataset.in);

	// eslint-disable-next-line prefer-arrow-callback
	program.action(async function (args) {
		this.requireOption('in');


		try {
			// Распаковываем архив, перемещаем скриншоты и читаем список сатов
			const tmpPath = path.resolve('tmp/import/dataset');
			await fs.mkdirp(path.dirname(tmpPath));
			await decompress(args.in, tmpPath);

			logger.info('Unzip done');


			const sitesRaw = await fs.readJson(path.resolve(tmpPath, 'out.json'));

			// Сохраняем сайты
			const sites = sitesRaw.map((site) => {
				const id = mongoose.Types.ObjectId();

				const screenshotPath = path.join(conf.sites.screenshotsPath, site.dataset, `${id}.jpg`);
				fs.mkdirp(path.dirname(screenshotPath));
				fs.move(path.resolve(tmpPath, site.screenshot), screenshotPath, { overwrite: true });

				return {
					_id: id,
					url: site.url,
					dataset: site.dataset,
					screenshot: path.relative(conf.sites.screenshotsPath, screenshotPath),
				};
			});
			await Site.create(sites);

			logger.info('Sites done');


			await fs.remove(tmpPath);

			logger.info('Cleanup done');
		} catch (err) {
			logger.error(err);
		}

		process.exit(0);
	});
};
