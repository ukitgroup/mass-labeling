const mongoose = require('mongoose');

const Site = require('./site');

const config = require('../config');


const TaskSchema = new mongoose.Schema({
	siteId: {
		type: mongoose.Schema.ObjectId,
		required: true,
	},

	answer: {
		type: Number,
		min: 0,
		max: 10,
		required: true,
	},
	userId: {
		type: mongoose.Schema.ObjectId,
		required: true,
	},

	status: {
		type: String,
		enum: ['active', 'disabled'],
		default: 'active',
		required: true,
	},
});


TaskSchema.statics = {
	async countByUserId(userId, allowed = false) {
		const filter = { userId };

		if (allowed) {
			const siteIds = await Site.distinct('_id', Site.filter.allowedDatasets);
			filter.siteId = { $in: siteIds };
		}

		return this.count(filter);
	},

	async getNew({ siteId, answer, userId }) {
		const limit = config.get('markup.limit');
		const count = await this.countByUserId(userId, true);

		if (limit && count >= limit) {
			throw new Error('task_errors.markup_overdose');
		}

		const site = await Site.findById(siteId);

		if (site.status === 'disabled') {
			throw new Error('task_errors.bad_markup_request');
		}

		if (site.status === 'approved' && answer === 0) {
			throw new Error('task_errors.bad_markup_request');
		}

		return this.create({ siteId, answer, userId });
	},

	async getBrokenSites() {
		const siteIds = await this.distinct('siteId', { answer: 0 });

		return Site.find({
			_id: { $in: siteIds },
			status: 'active',
		});
	},
};


module.exports = mongoose.model('Task', TaskSchema);
