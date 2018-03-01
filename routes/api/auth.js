const User = require('../../model/user');


const router = require('express').Router();


router.post('/login', async (req, res, next) => {
	try {
		const { email, password } = req.body;

		// Ищем пользователя по логину и паролю
		const user = await User.getByEmailPassword(email, password);

		// Инициализируем сессию пользователя
		await req.loginAsync(user);

		res.api.response();
	} catch (err) {
		next(err);
	}
});

router.post('/logout', (req, res) => {
	req.logout();

	res.api.response();
});


module.exports = router;
