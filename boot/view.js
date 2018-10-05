const hashFiles = require('hash-files');
const expressLayouts = require('express-ejs-layouts');

const i18nConfig = require('../locales/i18n-config');


const isDevelopment = process.env.NODE_ENV !== 'production';


module.exports = (app) => {
	const publicHash = hashFiles.sync({ files: 'public/**' });


	app.use((req, res, next) => {
		// Подключение ресурсов в шаблон
		res.locals.fromPublic = url => `/${url}?${isDevelopment ? Date.now() : publicHash}`;

		// Доступ к текущему пользователю из шаблона
		res.locals.user = req.user;

		// Translate text to current user's locale
		res.locals.getText = function (text) {
			// eslint-disable-next-line no-underscore-dangle
			return req.__.apply(this, [text]);
		};

		// Get locale's readable name
		res.locals.getLocaleReadableName = function (localeShortName) {
			return i18nConfig.getLocaleReadableName(localeShortName);
		};

		// Get locales, user is able to switch
		res.locals.localesAbleToSwitch = function () {
			return i18nConfig.availableLocales
				.filter(locale => locale !== req.getLocale());
		};

		/**
		 * Converts translations object of current user's locale into
		 * single-level object which is used in front-end scripts and components
		 */
		res.locals.frontSigns = function () {
			const signs = {};
			const translations = req.getCatalog();

			function iterateTranslationsObject(translationsObject, parentKey = '') {
				Object.keys(translationsObject)
					.forEach((key) => {
						const value = translationsObject[key];

						if (typeof value === 'object') {
							iterateTranslationsObject(value, key);
						} else {
							const signKey = parentKey ? `${parentKey}.${key}` : key;
							signs[signKey] = value;
						}
					});
			}

			iterateTranslationsObject(translations);

			return signs;
		};

		next();
	});


	app.set('views', './views');
	app.set('view engine', 'ejs');
	app.use(expressLayouts);
	app.set('layout', 'layout');
};
