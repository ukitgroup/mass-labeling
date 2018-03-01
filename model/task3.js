const mongoose = require('mongoose');

const { ForbiddenError } = require('../lib/http-errors');

const Site = require('./site');

const conf = require('../conf');


const Task3Schema = new mongoose.Schema({
	siteId: {
		type: mongoose.Schema.ObjectId,
		ref: 'Site',
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
		ref: 'User',
		required: true,
	},
	status: {
		type: String,
		enum: ['active', 'disabled'],
		default: 'active',
	},
});


Task3Schema.statics = {
	async countByUserId(userId, allowed = false) {
		const tasksFilter = { userId };
		if (allowed) {
			tasksFilter.siteId = {
				$in: await Site.getAll(Site.filter.allowedCategories),
			};
		}

		return this.count(tasksFilter);
	},

	async getNew({ siteId, answer, userId }) {
		const count = await this.countByUserId(userId, true);

		if (conf.markup3.limit && count >= conf.markup3.limit) {
			throw new ForbiddenError('Markup overdose');
		}

		const site = await Site.findById(siteId);

		if (
			site.status === 'disabled' ||
			(site.status === 'approved' && answer === 0)
		) {
			throw new ForbiddenError('Bad markup request');
		}

		return this.create({ siteId, answer, userId });
	},

	async getBrokenSites() {
		return Site.getAll({
			_id: {
				$in: await this.distinct('siteId', { answer: 0 }),
			},
			status: 'active',
		});
	},
};


module.exports = mongoose.model('Task3', Task3Schema);
