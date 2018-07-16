const fs = require('fs');


// Read all available locales from .json files in current directory
let availableLocales = ['en', 'ru'];

try {
	availableLocales = fs.readdirSync(__dirname, {})
		.filter(entity => entity.endsWith('.json'))
		.map(entity => entity.split('.')[0]);
} catch (error) {}


module.exports = {
	availableLocales,
	defaultLocale: 'en',
	cookieMaxAge: 30 * 24 * 3600 * 1000, // 30 дней

	getLocaleReadableName(localeShortName) {
		switch (localeShortName) {
			case 'en': return 'English';
			case 'ru': return 'Русский';
			default: return localeShortName;
		}
	},
};
