const bunyan = require('bunyan');
const { spawn } = require('child_process');
const through = require('through');


const isDevelopment = process.env.NODE_ENV !== 'production';


function createPrettyStream() {
	const stream = through();

	const formatter = spawn('npx', ['bunyan'], {
		stdio: [null, process.stdout, process.stderr],
	});
	stream.pipe(formatter.stdin);

	return stream;
}


module.exports = bunyan.createLogger({
	name: 'app',
	stream: process.stdout.isTTY ? createPrettyStream() : process.stdout,
	level: isDevelopment ? 'debug' : 'info',
	serializers: bunyan.stdSerializers,
});
