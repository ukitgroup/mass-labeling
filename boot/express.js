const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const config = require('../config');


module.exports = (app) => {
	app.use(morgan('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use('/', express.static(config.www.publicPath));
};
