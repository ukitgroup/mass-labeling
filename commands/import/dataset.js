const fs = require('fs');
const path = require('path');
const decompress = require('decompress');
const json = require('json-helper');

const Site = require('../../model/site');

const logger = require('../../lib/logger');


module.exports = (program) => {
	program.description('Import dataset');

	program.option('--dataset <dataset_name>', 'Dataset name for import');
	program.option('--in <in_path>', 'Archive path');

	// eslint-disable-next-line prefer-arrow-callback
	program.action(async function (args) {
		this.requireOption('dataset');
		this.requireOption('in');


		try {
			// Распаковываем архив, перемещаем скриншоты и читаем список сатов
			const tmpPath = path.resolve('tmp', args.dataset);
			await decompress(args.in, tmpPath);

			logger.info('Unzip done');


			// Переносим скринщоты
			await fs.move(path.resolve(tmpPath, 'screenshots'), path.resolve('screenshots', args.dataset), { overwrite: true });

			logger.info('Screenshots done');


			const sitesRaw = await json.readListAsync(path.resolve(tmpPath, 'out.json'));

			logger.info('JSON done');


			// Сохраняем сайты
			const sites = sitesRaw.map(site => ({
				url: site.url,
				screenshot: site.screenshot.replace(/^screenshots/, args.dataset),
				category: args.dataset,
			}));
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
