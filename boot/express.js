const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const conf = require('../conf');


module.exports = (app) => {
	app.use(morgan('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use('/', express.static(conf.server.publicPath));
};
