/* eslint-disable no-console */

const config = require('./index');

const [dbURL, passportCookie, port] = [process.argv[2], process.argv[3], process.argv[4]];

config.set('boot.port', port);
config.set('mongo.url', dbURL);
config.set('passport.secret', passportCookie);

try {
	config.updateFiles();
	console.log('\nConfig successfully updated\n');
} catch (error) {
	console.log('Config save error', error);
}
