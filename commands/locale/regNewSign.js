/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-console */

const i18nConfig = require('../../locales/i18n-config');

const fs = require('fs-extra');

const util = require('util');


const writeFileAsync = util.promisify(fs.writeFile);


module.exports = (program) => {
	program.description('Register new sign for all language files');

	program.option('--key <key>', 'Sign key').parse(process.argv);

	program.asyncAction(async function (args) {
		this.requireOption('key');

		const { availableLocales } = i18nConfig;
		const newSignKey = args.key || 'NO_NAME';

		try {
			await Promise.all(availableLocales.map(async (locale) => {
				const signsStructure = newSignKey.split('.');

				const filePath = `${__dirname}/../../locales/${locale}.json`;
				const localeJSON = require(filePath);

				let newSignContainer = localeJSON;

				if (signsStructure.length > 1) {
					const resultSignKey = signsStructure.pop();

					signsStructure.forEach((signLevel) => {
						if (! newSignContainer[signLevel]) {
							newSignContainer[signLevel] = {};
						}

						newSignContainer = newSignContainer[signLevel];
					});

					newSignContainer[resultSignKey] = resultSignKey;
				} else {
					localeJSON[newSignKey] = newSignKey;
				}

				await writeFileAsync(filePath, JSON.stringify(localeJSON, null, 2));

				console.log(`Sign with key '${newSignKey}' was added to ${locale}.json`);
			}));

			console.log();
		} catch (error) {
			throw error;
		}
	});
};
