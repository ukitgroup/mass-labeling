const convict = require('convict');
const dotenv = require('dotenv');
const yaml = require('js-yaml');


// Включаем поддержку yaml файлов для конфигурации
convict.addParser({
	extension: 'yml',
	parse: yaml.safeLoad,
});


// Валидатор для списка датасетов
function datasetsFormat(value) {
	if (
		typeof value !== 'object' ||
		! (value instanceof Array) ||
		value.some(item => typeof item !== 'string')
	) throw new Error('must be array of strings');
}


// Схема конфигурации
const config = convict({
	logger: {
		name: {
			doc: 'Logger name',
			format: String,
			default: 'app',
		},
		level: {
			doc: 'Logger verbosity level',
			format: ['fatal', 'error', 'warn', 'info', 'debug', 'trace'],
			default: 'info',
		},
	},

	mongo: {
		url: {
			doc: 'MongoDB URL',
			format: String,
			default: null,
			env: 'DB_URL',
		},
	},

	passport: {
		maxAge: {
			doc: 'Cookie max age',
			format: 'int',
			default: 30 * 24 * 3600 * 1000, // 30 дней
		},
		secret: {
			doc: 'Cookie secret',
			format: String,
			default: null,
			env: 'COOKIE_SECRET',
		},
	},

	sites: {
		allowedDatasets: {
			doc: 'List of datasets that allowed for markup',
			format: datasetsFormat,
			default: [],
		},
		screenshotsPath: {
			doc: 'Path to screenshots storage',
			format: String,
			default: './data/screenshots',
		},
	},

	markup: {
		limit: {
			doc: 'Limit of markup tasks per user',
			format: 'int',
			default: 0,
		},
	},

	cli: {
		export: {
			answers: {
				datasets: {
					doc: 'Datasets list',
					format: datasetsFormat,
					default: [],
				},
				out: {
					doc: 'JSON path',
					format: String,
					default: 'data/export/answers.json',
				},
			},
		},

		import: {
			dataset: {
				in: {
					doc: 'ZIP path',
					format: String,
					default: 'data/import/dataset.zip',
				},
			},
		},
	},
});


// Загружаем файлы конфигурации
dotenv.config({ path: './config/app.env' });
config.loadFile('./config/app.yml');
config.validate({ allowed: 'strict' });


module.exports = config;
