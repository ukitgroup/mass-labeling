const User = require('../../models/user');


const statuses = {
	// active: 'Активен',
	active: '', // value moved to lang files
	// disabled: 'Отключен',
	disabled: '', // value moved to lang files
};

const roles = {
	// admin: 'Администратор',
	admin: '', // value moved to lang files
	// user: 'Пользователь',
	user: '', // value moved to lang files
};


const bridges = require('../bridges');

const router = require('express').Router();


// router.get('/list', async (req, res, next) => {
// 	try {
// 		const users = await User.find();
//
// 		res.render('user/list', { users, statuses, roles });
// 	} catch (err) {
// 		// eslint-disable-next-line no-underscore-dangle
// 		err.message = req.__(err.message);
// 		next(err);
// 	}
// });
//
// router.get('/add', (req, res) => {
// 	res.render('user/form', {
// 		curUser: null,
// 		statuses,
// 		roles,
// 	});
// });
//
// router.get('/:userId/edit', bridges.user.id, (req, res) => {
// 	res.render('user/form', {
// 		curUser: req.curUser,
// 		statuses,
// 		roles,
// 	});
// });


module.exports = router;
