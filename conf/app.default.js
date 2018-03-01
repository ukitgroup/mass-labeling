const path = require('path');


const ROOT_PATH = path.join(__dirname, '..');


module.exports = {
	server: {
		publicPath: path.resolve(ROOT_PATH, 'public'),
		viewsPath: path.join(ROOT_PATH, 'views'),
		cookieMaxAge: 30 * 24 * 3600 * 1000, // 30 дней
	},
	sites: {
		allowedCategories: null,
		screenshotsPath: path.resolve(ROOT_PATH, 'screenshots'),
	},
	markup3: {
		limit: null,
	},
};
