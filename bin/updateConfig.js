/* eslint-disable no-console */

const config = require('../config');

const [dbURL, passportCookie] = [process.argv[2], process.argv[3]];

// console.log(dbURL, passportCookie);

config.set('mongo.url', dbURL);
config.set('passport.secret', passportCookie);

config.updateFiles()
	.then(() => console.log('\nConfig successfully updated\n'))
	.catch(error => console.log('Config update error', error));
