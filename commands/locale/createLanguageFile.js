/* eslint-disable no-console */

const i18nConfig = require('../../locales/i18n-config');

const fs = require('fs-extra');
const path = require('path');


module.exports = (program) => {
	program.description('Create new language file (duplicate file of default locale)');

	program.option('--locale <locale>', 'Locale').parse(process.argv);

	program.asyncAction(async function (args) {
		this.requireOption('locale');

		const { defaultLocale } = i18nConfig;
		const requestedLocale = args.locale || 'NO_NAME';

		try {
			fs.copySync(
				path.resolve(__dirname, `../../locales/${defaultLocale}.json`),
				path.resolve(__dirname, `../../locales/${requestedLocale}.json`),
			);

			console.log(`File ${requestedLocale}.json was created in /locales directory\n`);
		} catch (error) {
			console.log(`Unable to create ${requestedLocale}.json`);
			throw error;
		}
	});
};
