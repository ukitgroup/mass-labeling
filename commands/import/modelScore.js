const Promise = require('bluebird');
const fs = require('fs-extra');

const Site = require('../../models/site');
const Slider = require('../../models/slider');

const config = require('../../config');

const logger = require('../../libs/logger');


module.exports = (program) => {
	program.description('Import model scores of sliders');

	program.option('--in <in_path>', 'JSON path', config.get('cliImport.modelScoreIn'));

	// eslint-disable-next-line prefer-arrow-callback
	program.asyncAction(async function (args) {
		this.requireOption('in');

		const jsonPath = args.in;
		const json = await fs.readJson(jsonPath);

		if (! (json instanceof Array)) {
			throw new Error('JSON should be an array of objects');
		}

		logger.info(`import:modelScore: import model scores (${json.length} entry/-ies)`);

		let updatedSlidersCount = 0;
		let skippedEntriesCount = 0;

		await Promise.all(json.map(async (modelObject) => {
			const { id: siteURL } = modelObject;

			// 1. Find sites by URL (modelObject.id) and get their ids
			const siteIds = await Site.distinct('_id', {
				url: { $eq: siteURL },
			});

			if (! siteIds.length) {
				skippedEntriesCount++;
				return;
			}

			// 2. Get sliders
			const sliders = await Slider.find({
				siteId: { $in: siteIds },
			});

			// 3. Update sliders
			await Promise.all(sliders.map(async (slider) => {
				slider.modelScore = modelObject.score;
				await slider.save();
			}));

			updatedSlidersCount += sliders.length;
		}));

		logger.info(`import:modelScore: updated ${updatedSlidersCount} sliders, skipped ${skippedEntriesCount} entries (no sites with such ID)`);
	});
};
