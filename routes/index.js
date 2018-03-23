const bridges = require('./bridges');

const viewRoute = require('./view');
const apiRoute = require('./api');


const router = require('express').Router();


router.use(
	'/api',
	bridges.router.noCache,
	apiRoute,
	bridges.router.notFound,
	bridges.router.apiError,
);

router.use(
	viewRoute,
	bridges.router.notFound,
	bridges.router.error,
);


module.exports = router;
