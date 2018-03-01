const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('../lib/morgan-bunyan');

const conf = require('../conf');


module.exports = (app) => {
	app.use(morgan('dev'));

	app.use('/', express.static(conf.server.publicPath));

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
};
