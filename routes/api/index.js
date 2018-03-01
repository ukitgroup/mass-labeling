const bridges = require('../bridges');

const auth = require('./auth');
const site = require('./site');
const validation = require('./validation');
const user = require('./user');
const markup3 = require('./markup3');
const broken = require('./broken');

const router = require('express').Router();


// Авторизация
router.use(
	'/auth',
	auth,
);

// Разметка
router.use(
	'/markup3',
	bridges.auth.user,
	markup3,
);

// Сайт
router.use(
	'/site',
	bridges.auth.user,
	site,
);

// Пользователи
router.use(
	'/user',
	bridges.auth.admin,
	user,
);

// Сломанные сайты
router.use(
	'/broken',
	bridges.auth.admin,
	broken,
);

// Валидация
router.use(
	'/validation',
	bridges.auth.admin,
	validation,
);


module.exports = router;
