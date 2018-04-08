const hashFiles = require('hash-files');
const expressLayouts = require('express-ejs-layouts');

const config = require('../config');


const isDevelopment = process.env.NODE_ENV !== 'production';


module.exports = (app) => {
	const publicHash = hashFiles.sync({ files: 'public/**' });


	app.use((req, res, next) => {
		// Подключение ресурсов в шаблон
		res.locals.fromPublic = url => `${config.www.publicUrl}${url}?${isDevelopment ? Date.now() : publicHash}`;

		// Доступ к конфигурации и текущему пользователю из шаблона
		res.locals.config = config;
		res.locals.user = req.user;

		next();
	});


	app.set('views', config.www.viewsPath);
	app.set('view engine', 'ejs');
	app.use(expressLayouts);
	app.set('layout', 'layout');
};
