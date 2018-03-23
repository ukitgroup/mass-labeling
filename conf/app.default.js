const path = require('path');


const ROOT_PATH = path.join(__dirname, '..');


module.exports = {
	mongo: {
		url: process.env.DB_URL,
	},

	www: {
		publicPath: path.resolve(ROOT_PATH, 'public'),
		viewsPath: path.resolve(ROOT_PATH, 'views'),

		publicUrl: '/',
	},

	passport: {
		maxAge: 30 * 24 * 3600 * 1000, // 30 дней
		secret: process.env.COOKIE_SECRET,
	},

	sites: {
		allowedDatasets: null,
		screenshotsPath: path.resolve(ROOT_PATH, 'data/screenshots'),
	},

	markup: {
		limit: null,
	},

	cli: {
		export: {
			answers: {
				datasets: null,
				out: 'data/export/answers.json',
			},
		},
	},
};
