const hashFiles = require('hash-files');
const expressLayouts = require('express-ejs-layouts');

const conf = require('../conf');


const isDevelopment = process.env.NODE_ENV !== 'production';


module.exports = (app) => {
	const publicHash = hashFiles.sync({ files: 'public/**' });


	app.use((req, res, next) => {
		// Подключение ресурсов в шаблон
		res.locals.fromPublic = url => `${conf.www.publicUrl}${url}?${isDevelopment ? Date.now() : publicHash}`;

		// Доступ к конфигурации и текущему пользователю из шаблона
		res.locals.conf = conf;
		res.locals.user = req.user;

		next();
	});


	app.set('views', conf.www.viewsPath);
	app.set('view engine', 'ejs');
	app.use(expressLayouts);
	app.set('layout', 'layout');
};
