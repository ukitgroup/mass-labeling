/* eslint-disable global-require */


module.exports = (program) => {
	require('./export/answers')(program.command('export:answers'));
	require('./import/dataset')(program.command('import:dataset'));
	require('./user/create')(program.command('user:create'));
};
