const Progress = require('progress');

const logger = require('../logger');


module.exports = {
	create(name = 'Progress') {
		name = name.slice(0, 8);
		name += ':';
		name = name.padEnd(9);

		return new Progress(`${name} [:bar]  :current / :total  :percent  ET: :elapseds  ETA: :etas `, {
			total: 0,
			width: 25,
			complete: '=',
			incomplete: ' ',
			head: '>',
		});
	},

	log(level, ...data) {
		process.stderr.write(`\r${''.padStart(100)}\r`);
		logger[level](...data);
	},
};
