const Promise = require('bluebird');
const mongoose = require('mongoose');
const _ = require('lodash');

const conf = require('../conf');


const SiteSchema = new mongoose.Schema({
	url: {
		type: String,
		required: true,
	},
	screenshot: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		default: '',
	},
	status: {
		type: String,
		enum: ['active', 'disabled', 'approved'],
		default: 'active',
		required: true,
	},
});


SiteSchema.statics = {
	filter: {
		allowedStatuses: {
			status: { $in: ['active', 'approved'] },
		},

		allowedCategories: conf.sites.allowedCategories ? {
			category: { $in: conf.sites.allowedCategories },
		} : {},
	},


	async getAll(filter = {}) {
		return this.find(filter).exec();
	},

	async getRandomSize(size = 2) {
		const siteIds = await this.distinct('_id', {
			...this.filter.allowedStatuses,
			...this.filter.allowedCategories,
		});
		return Promise.map(_.sampleSize(siteIds, size), async siteId => this.findById(siteId));
	},

	async getById(id) {
		const site = await this.findById(id);
		if (! site) {
			throw new Error('Site not found');
		}

		return site;
	},
};

SiteSchema.methods = {
	async approve() {
		this.status = 'approved';
		await this.save();
	},

	async disable() {
		this.status = 'disabled';
		await this.save();
	},
};


module.exports = mongoose.model('Site', SiteSchema);
