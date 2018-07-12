const hashFiles = require('hash-files');
const expressLayouts = require('express-ejs-layouts');


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
			return req.__.apply(this, [text]);
		};

		next();
	});


	app.set('views', './views');
	app.set('view engine', 'ejs');
	app.use(expressLayouts);
	app.set('layout', 'layout');
};
