/* eslint-disable global-require,import/no-dynamic-require,no-console,no-restricted-globals */

const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');


dotenv.config({ path: './config/app.env' });


const configFilePath = path.resolve(__dirname, '../config/config.json');


class Config {
	constructor() {
		try {
			this.config = require(configFilePath);
		} catch (error) {
			console.error(error);
			this.config = {};
		}
	}


	getConfig() {
		return this.config;
	}


	/**
	 * Private method which finds property by its ID.
	 * ID may be compound, e.g. parentID.childID
	 * @param id {String} id of property that method should return
	 * @returns {*}
	 */
	findPropertyObjectById(id) {
		const [fieldSetId, propertyId] = id.split('.');

		const fieldSet = this.config.filter(item => item.id === fieldSetId)[0];

		if (! fieldSet) {
			return null;
		}

		return (fieldSet.properties || [])
			.filter(item => item.id === propertyId)[0];
	}


	updateConfig(newConfig) {
		this.prepareConfig(newConfig);
		this.config = newConfig;
	}


	get(key) {
		const property = this.findPropertyObjectById(key);
		return property ? property.value : null;
	}


	set(key, value) {
		const property = this.findPropertyObjectById(key);

		if (property) {
			property.value = value;
		}
	}


	updateFiles() {
		return Promise.all([
			this.updateConfigFile(),
			this.updateEnvFile(),
		]);
	}


	/**
	 * Preprocessors of config object
	 * @param config
	 */
	prepareConfig(config) {
		config.forEach((fieldSet) => {
			const properties = fieldSet.properties || [];

			// Prepare numeric properties
			properties
				.filter(property => property.format === 'Number')
				.forEach((property) => {
					try {
						// Trying to parse string to number
						property.value = parseInt(property.value, 10);

						// If parsing failed, reset value to default
						if (property.value < 0 || isNaN(property.value)) {
							property.value = 0;
						}
					} catch (error) {
						// If parsing failed, reset value to default
						property.value = 0;
					}
				});
		});
	}


	/**
	 * Updates DB_URL property in app.anv
	 * @returns {Promise<any>}
	 */
	updateEnvFile() {
		const envFilePath = path.resolve(__dirname, 'app.env');

		return new Promise((resolve) => {
			fs.readFile(envFilePath, 'utf-8', (error, content) => {
				if (error) {
					throw error;
				}

				content = content.replace(/(\n)?DB_URL=(.*)\n?/, `\nDB_URL=${this.get('mongo.url')}\n`);

				fs.writeFile(envFilePath, content, (error) => {
					if (error) {
						throw error;
					}

					resolve();
				});
			});
		});
	}


	/**
	 * Updates config.json file, writes new version of config JSON
	 * @returns {Promise<any>}
	 */
	updateConfigFile() {
		const { config } = this;

		return new Promise((resolve, reject) => {
			fs.writeFile(configFilePath, JSON.stringify(config, null, 2), (error) => {
				if (error) {
					reject();
				} else {
					resolve();
				}
			});
		});
	}
}


/**
 * If DB_URL property in app.anv does not match with value from config.json
 * write ENV value to .json file
 */
const config = new Config();

if (process.env.DB_URL !== config.get('mongo.url')) {
	config.set('mongo.url', process.env.DB_URL);

	config.updateConfigFile()
		.catch(error => console.log('Update config error:', error));
}

module.exports = config;
