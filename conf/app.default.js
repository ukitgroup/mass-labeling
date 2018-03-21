const path = require('path');


const ROOT_PATH = path.join(__dirname, '..');


module.exports = {
	mongo: {
		url: process.env.DB_URL,
	},

	server: {
		publicPath: path.resolve(ROOT_PATH, 'public'),
		viewsPath: path.join(ROOT_PATH, 'views'),
		cookieMaxAge: 30 * 24 * 3600 * 1000, // 30 дней
	},

	sites: {
		allowedDatasets: null,
		screenshotsPath: path.resolve(ROOT_PATH, 'screenshots'),
	},

	markup: {
		limit: null,
	},
};
