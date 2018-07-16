/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-console */

const i18nConfig = require('../../locales/i18n-config');

const fs = require('fs-extra');


module.exports = (program) => {
	program.description('Register new sign for all language files');

	program.option('--key <key>', 'Sign key').parse(process.argv);

	program.asyncAction(async function (args) {
		this.requireOption('key');

		const { availableLocales } = i18nConfig;
		const newSignKey = args.key || 'NO_NAME';

		try {
			availableLocales.forEach((locale) => {
				const filePath = `${__dirname}/../../locales/${locale}.json`;
				const localeJSON = require(filePath);

				localeJSON[newSignKey] = newSignKey;

				fs.writeFileSync(filePath, JSON.stringify(localeJSON, null, 2));
				console.log(`Sign with key '${newSignKey}' was added to ${locale}.json`);
			});

			console.log();
		} catch (error) {
			throw error;
		}
	});
};
