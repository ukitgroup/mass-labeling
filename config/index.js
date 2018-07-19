/* eslint-disable global-require,import/no-dynamic-require,no-console */

const fs = require('fs');
const path = require('path');


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
		this.config = newConfig;
		return this.updateFile();
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
}


module.exports = new Config();
