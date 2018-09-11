/* eslint-disable global-require */


module.exports = (program) => {
	require('./export/answers')(program.command('export:answers'));
	require('./import/dataset')(program.command('import:dataset'));
	require('./import/modelScores')(program.command('import:modelScores'));
	require('./user/create')(program.command('user:create'));
	require('./locale/createLanguageFile')(program.command('locale:create'));
	require('./locale/syncLocaleFiles')(program.command('locale:sync'));
	require('./locale/regNewSign')(program.command('locale:new'));
};
