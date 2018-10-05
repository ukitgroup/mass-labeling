/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-console */

const i18nConfig = require('../../locales/i18n-config');


// Check sign sets
function checkObject(originalTextsSet, anotherTextsSet, parentSignKey = '') {
	let objectsAreConsistent = true;

	// Iterate over sign keys of original text set
	Object.keys(originalTextsSet)
		.forEach((key) => {
			// If property is object, run function recursively for subsets
			if (typeof originalTextsSet[key] === 'object') {
				const subsets = anotherTextsSet.map(textSet => ({
					locale: textSet.locale,
					textSet: textSet.textSet[key] || {},
				}));

				objectsAreConsistent = checkObject(originalTextsSet[key], subsets, parentSignKey + key) && objectsAreConsistent;
			} else {
				let addBlankLine = false;

				anotherTextsSet.forEach((textSet) => {
					const localeTextSet = textSet.textSet || {};

					if (! localeTextSet[key]) {
						const prefix = parentSignKey.length ? `${parentSignKey}.` : '';

						console.log(`${textSet.locale}.json does not have sign with key ${prefix}${key}`);

						objectsAreConsistent = false;
						addBlankLine = true;
					}
				});

				if (addBlankLine) {
					console.log();
				}
			}
		});

	return objectsAreConsistent;
}


module.exports = (program) => {
	program.description('Match language files');

	// eslint-disable-next-line prefer-arrow-callback
	program.asyncAction(async function () {
		const { defaultLocale, availableLocales } = i18nConfig;

		const localeJSONs = {};
		const anotherTextsSet = [];

		// Read all language files
		availableLocales
			.forEach((locale) => {
				const textSet = require(`../../locales/${locale}.json`);

				localeJSONs[locale] = textSet;

				if (locale !== defaultLocale) {
					anotherTextsSet.push({
						locale,
						textSet,
					});
				}
			});

		console.log(`\nDefault locale is: '${defaultLocale}'`);
		console.log('Other locales are: ', anotherTextsSet.map(textSet => textSet.locale), '\n');

		const defaultTextsSet = localeJSONs[defaultLocale];
		let allMatches = true;

		allMatches = checkObject(defaultTextsSet, anotherTextsSet) && allMatches;

		if (allMatches) {
			console.log('Language files are consistent\n');
		}
	});
};
