const bridges = require('../bridges');

const auth = require('./auth');
const markup = require('./assessment');
const site = require('./site');
const broken = require('./broken');
const config = require('./config');

const router = require('express').Router();


// Авторизация
router.use(
	'/auth',
	auth,
);

// Разметка
router.use(
	'/assessment',
	bridges.auth.user,
	markup,
);

// Сайт
router.use(
	'/site',
	bridges.auth.user,
	site,
);

// Сломанные сайты
router.use(
	'/broken',
	bridges.auth.admin,
	broken,
);

// App config
router.use(
	'/config',
	bridges.auth.admin,
	config,
);


module.exports = router;
