const hashFiles = require('hash-files');
const expressLayouts = require('express-ejs-layouts');

const conf = require('../conf');


const isDevelopment = process.env.NODE_ENV !== 'production';


module.exports = (app) => {
	const version = hashFiles.sync({ files: 'public/**' });


	app.use((req, res, next) => {
		// Доступ к конфигу из шаблона
		res.locals.conf = conf;

		// Доступ к пользователю из шаблона
		res.locals.user = req.user;

		// Версия проекта, для подключения ресурсов
		res.locals.version = isDevelopment ? Date.now : () => version;

		next();
	});


	app.set('views', conf.server.viewsPath);
	app.set('view engine', 'ejs');
	app.use(expressLayouts);
	app.set('layout', 'layout');
};
