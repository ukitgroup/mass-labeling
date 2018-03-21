const routes = require('../routes');


module.exports = (app) => {
	app.use((req, res, next) => {
		res.api = {
			response(data = null) {
				res.json([null, data]);
			},

			error(err) {
				res.json([err ? err.message : 'Unknown error']);
			},
		};

		next();
	});

	app.use(routes);
};
