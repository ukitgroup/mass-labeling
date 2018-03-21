const dotenv = require('dotenv');


module.exports = () => {
	dotenv.config({ path: 'conf/app.env' });
};
