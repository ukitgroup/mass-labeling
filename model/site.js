const mongoose = require('mongoose');
const _ = require('lodash');

const conf = require('../conf');


const SiteSchema = new mongoose.Schema({
	url: {
		type: String,
		required: true,
	},
	dataset: {
		type: String,
		required: true,
	},

	screenshot: {
		type: String,
		required: true,
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

		allowedDatasets: conf.sites.allowedDatasets ? {
			dataset: { $in: conf.sites.allowedDatasets },
		} : {},
	},


	async getRandom() {
		const siteIds = await this.distinct('_id', {
			...this.filter.allowedStatuses,
			...this.filter.allowedDatasets,
		});

		return this.findById(_.sample(siteIds));
	},

	async getById(id) {
		const site = await this.findById(id);
		if (! site) throw new Error('Site not found');

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
