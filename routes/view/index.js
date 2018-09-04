const bridges = require('../bridges');

const dashboard = require('./dashboard');
const markup = require('./assessment');
const user = require('./user');
const stat = require('./stat');
const broken = require('./broken');
const slider = require('./slider');
const config = require('./config');

const router = require('express').Router();

const i18nConfig = require('../../locales/i18n-config');


function setLocale(req, res, locale) {
	res.cookie('locale', locale, { maxAge: i18nConfig.cookieMaxAge, httpOnly: true });
	req.setLocale(locale);
}


// Control user's current locale
router.use(async (req, res, next) => {
	try {
		const localeCookie = req.cookies.locale;

		// If locale cookie exists, but doesn't match to user's locale,
		// set locale of user as current
		if (localeCookie) {
			if (req.user && req.user.locale && req.user.locale !== localeCookie) {
				setLocale(req, res, req.user.locale);
			}

		// No locale specified yet:
		// new browser, new user or prev cookie died
		} else {
			let userLanguage = '';

			// If user exists in session, read his selected locale
			if (req.user) {
				userLanguage = req.user.locale;
			// Otherwise read locale from http header
			} else {
				userLanguage = req.acceptsLanguages(...i18nConfig.availableLocales);
			}

			// If no locale (req.acceptsLanguages(...) === false) or locale is not supported,
			// set default locale
			if (! userLanguage || i18nConfig.availableLocales.indexOf(userLanguage) < 0) {
				userLanguage = i18nConfig.defaultLocale;
			}

			setLocale(req, res, userLanguage);

			if (req.user && ! req.user.locale) {
				await req.user.setLocale(userLanguage);
			}
		}

		next();
	} catch (err) {
		// eslint-disable-next-line no-underscore-dangle
		err.message = req.__(err.message);
		next(err);
	}
});


router.get('/', (req, res) => {
	if (req.user) {
		setLocale(req, res, req.user.locale);
		res.redirect(303, '/dashboard');
	} else {
		res.render('index');
	}
});


// Change current locale
router.get('/locale/:locale', async (req, res) => {
	try {
		let selectedLocale = req.params.locale;

		// If no locale or locale is not supported,
		// set default locale
		if (! selectedLocale || i18nConfig.availableLocales.indexOf(selectedLocale) < 0) {
			selectedLocale = i18nConfig.defaultLocale;
		}

		// If user exists in session, save his locale
		if (req.user) {
			await req.user.setLocale(selectedLocale);
		}

		setLocale(req, res, selectedLocale);

		// Reload page to apply changes
		res.redirect('back');
	} catch (err) {
		// eslint-disable-next-line no-underscore-dangle
		err.message = req.__(err.message);
		res.redirect('back');
	}
});


// Дашборд
router.use(
	'/dashboard',
	bridges.auth.user,
	dashboard,
);

// Разметка
router.use(
	'/assessment',
	bridges.auth.user,
	markup,
);

// Пользователи
router.use(
	'/user',
	bridges.auth.admin,
	user,
);

// Статистика
router.use(
	'/stat',
	bridges.auth.admin,
	stat,
);

// Сломанные сайты
router.use(
	'/broken',
	bridges.auth.admin,
	broken,
);

// Слайдер
router.use(
	'/slider',
	bridges.auth.admin,
	slider,
);

// App config
router.use(
	'/config',
	bridges.auth.admin,
	config,
);


module.exports = router;
