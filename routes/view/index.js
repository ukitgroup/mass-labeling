const bridges = require('../bridges');

const dashboard = require('./dashboard');
const markup = require('./markup');
const user = require('./user');
const stat = require('./stat');
const broken = require('./broken');
const slider = require('./slider');

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
	'/markup',
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


module.exports = router;
