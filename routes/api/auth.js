const User = require('../../models/user');

const logger = require('../../libs/logger');

const router = require('express').Router();


router.post('/login', async (req, res, next) => {
	const { email, password } = req.body;

	try {
		// Ищем пользователя по логину и паролю
		const user = await User.getByEmailPassword(email, password);

		logger.info(`User auth: ${email}, user exists: ${!! user}`);

		// Инициализируем сессию пользователя
		await req.loginAsync(user);

		res.api.response();
	} catch (err) {
		logger.error(`User auth error: email - ${email}, ${err}`);

		// eslint-disable-next-line no-underscore-dangle
		err.message = req.__(err.message);
		next(err);
	}
});

router.post('/logout', (req, res) => {
	req.logout();

	res.api.response();
});


module.exports = router;
