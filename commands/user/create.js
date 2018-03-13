const User = require('../../model/user');

const logger = require('../../lib/logger');


module.exports = (program) => {
	program.description('Create user');

	program.option('--email <email>', 'E-mail');
	program.option('--password <password>', 'Password');
	program.option('--role <role>', 'Role, [\'admin\', \'user\']');

	// eslint-disable-next-line prefer-arrow-callback
	program.action(async function (args) {
		this.requireOption('email');
		this.requireOption('password');
		this.requireOption('role');

		try {
			await User.create({
				email: args.email,
				password: User.hash(args.password),
				role: args.role,
			});
		} catch (err) {
			logger.error(err);
		}

		process.exit(0);
	});
};
