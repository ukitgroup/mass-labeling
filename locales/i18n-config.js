const fs = require('fs');

const config = require('../config/');
const logger = require('../libs/logger');


// Read all available locales from .json files in current directory
let availableLocales = ['en', 'ru'];

try {
	availableLocales = fs.readdirSync(__dirname, {})
		.filter(entity => entity.endsWith('.json'))
		.map(entity => entity.split('.')[0]);
} catch (error) {
	logger.error(error);
}


module.exports = {
	availableLocales,
	defaultLocale: config.get('languageSettings.defaultLanguage') || 'en',
	cookieMaxAge: config.get('passport.maxAge') * 1000, // sec -> ms

	getLocaleReadableName(localeShortName) {
		const languagesNames = config.get('languageSettings.languagesNames');
		return languagesNames[localeShortName] || localeShortName;
	},
};
