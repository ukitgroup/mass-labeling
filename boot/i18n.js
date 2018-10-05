const i18n = require('i18n');

const i18nConfig = require('../locales/i18n-config');

i18n.configure({
	locales: i18nConfig.availableLocales,
	defaultLocale: i18nConfig.defaultLocale,
	directory: `${__dirname}/../locales`,
	cookie: 'locale',
	objectNotation: true,
	updateFiles: false,
});

module.exports = (app) => {
	app.use(i18n.init);
};
