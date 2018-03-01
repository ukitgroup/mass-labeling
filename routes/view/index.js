const bridges = require('../bridges');

const user = require('./user');
const stat = require('./stat');
const slider = require('./slider');
const validation = require('./validation');
const broken = require('./broken');
const dashboard = require('./dashboard');
const markup3 = require('./markup3');

const router = require('express').Router();


router.get('/', (req, res) => {
	if (req.user) {
		res.redirect(303, '/dashboard');
	} else {
		res.render('index');
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
	'/markup3',
	bridges.auth.user,
	markup3,
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

// Валидация
router.use(
	'/validation',
	bridges.auth.admin,
	validation,
);


module.exports = router;
