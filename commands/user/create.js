const User = require('../../models/user');


module.exports = (program) => {
	program.description('Create user');

	program.option('--email <email>', 'E-mail');
	program.option('--password <password>', 'Password');
	program.option('--role <role>', 'Role, [\'admin\', \'user\']');

	// eslint-disable-next-line prefer-arrow-callback
	program.asyncAction(async function (args) {
		this.requireOption('email');
		this.requireOption('password');
		this.requireOption('role');

		await User.create({
			email: args.email,
			password: User.hash(args.password),
			role: args.role,
		});
	});
};
