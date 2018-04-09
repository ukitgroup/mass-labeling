const User = require('../../models/user');


const statuses = {
	active: 'Активен',
	disabled: 'Отключен',
};

const roles = {
	admin: 'Администратор',
	user: 'Пользователь',
};


const bridges = require('../bridges');

const router = require('express').Router();


router.get('/list', async (req, res, next) => {
	try {
		const users = await User.find();

		res.render('user/list', { users, statuses, roles });
	} catch (err) {
		next(err);
	}
});

router.get('/add', (req, res) => {
	res.render('user/form', {
		curUser: null,
		statuses,
		roles,
	});
});

router.get('/:userId/edit', bridges.user.id, (req, res) => {
	res.render('user/form', {
		curUser: req.curUser,
		statuses,
		roles,
	});
});


module.exports = router;
