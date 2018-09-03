const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');


module.exports = (app) => {
	app.use(morgan('dev'));
	app.use(bodyParser.json());
	app.use('/', express.static('./public/'));
	app.use('/public/bundles', express.static('./public/bundles/'));
};
