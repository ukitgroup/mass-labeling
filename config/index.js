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
		const errors = this.validateConfig(newConfig);

		if (errors.length) {
			throw new Error(errors[0]);
		} else {
			this.config = newConfig;
			return this.updateFile();
		}
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


	updateFile() {
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


	validateConfig(config) {
		const errors = [];

		config.forEach((fieldSet) => {
			const properties = fieldSet.properties || [];

			// Validate numeric properties
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

			// Validate datasets
			const invalidDataSets = properties
				.filter(property => property.format === 'DataSet')
				.filter(property => ! this.isValidDataSet(property.value));

			if (invalidDataSets.length) {
				errors.push('wrong_dataset_structure');
			}
		});

		return errors;
	}


	isValidDataSet(dataSet) {
		return ! (typeof dataSet !== 'object'
			|| ! (dataSet instanceof Array)
			|| dataSet.some(item => typeof item !== 'string'));
	}
}


module.exports = new Config();
