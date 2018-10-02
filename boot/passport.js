const Promise = require('bluebird');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');

const MongoStore = require('connect-mongo')(session);

const User = require('../models/user');

const config = require('../config');


module.exports = (app) => {
	app.use(cookieParser());

	app.use(session({
		secret: config.get('passport.secret'),
		cookie: {
			// days -> ms
			maxAge: config.get('passport.maxAge') * 24 * 60 * 60 * 1000,
		},
		resave: true,
		saveUninitialized: true,
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
	}));

	app.use(passport.initialize());
	app.use(passport.session());

	app.use((req, res, next) => {
		req.loginAsync = Promise.promisify(req.login, { context: req });
		next();
	});


	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser(async (id, done) => {
		try {
			done(null, await User.getById(id));
		} catch (err) {
			done(err);
		}
	});
};
