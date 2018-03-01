const childProcess = require('child_process');
const expressLayouts = require('express-ejs-layouts');

const logger = require('../lib/logger');
const conf = require('../conf');


let version = 'unknown';

try {
	[, version] = childProcess.execSync('git log -1').toString().match(/^commit\s*([\w\d]+)/m);
} catch (err) {
	logger.error('Can not get version from git:', err.message.trim());
}


const isDevelopment = process.env.NODE_ENV !== 'production';


module.exports = (app) => {
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
