const mongoose = require('mongoose');
const _ = require('lodash');

const TaskSet = require('./taskset');


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

SiteSchema.index({
	url: 1,
	dataset: 1,
}, {
	unique: true,
});


SiteSchema.statics = {
	filter: {
		allowedStatuses: {
			status: {
				$in: ['active', 'approved'],
			},
		},
	},


	async getById(id) {
		const site = await this.findById(id);
		if (! site) throw new Error('site_errors.site_not_found');

		return site;
	},

	async getRandom(additionalFilter = {}) {
		const siteIds = await this.getActiveSiteIds(additionalFilter);
		return this.findById(_.sample(siteIds));
	},

	async getActiveSitesCount() {
		const siteIds = await this.getActiveSiteIds();
		return siteIds.length;
	},

	async getAllDataSets() {
		return this.aggregate([{
			$group: {
				_id: '$dataset',
			},
		}]);
	},

	/**
	 * Get all available sites from current active task set
	 */
	async getActiveSiteIds(additionalFilter = {}) {
		const activeTaskSet = await TaskSet.getCurrentActive();

		if (! activeTaskSet) {
			throw new Error('no_active_tasks');
		}

		const allowedDataSets = activeTaskSet.activeDataSets;

		return this.distinct('_id', {
			...this.filter.allowedStatuses,
			...additionalFilter,

			dataset: {
				$in: allowedDataSets,
			},
		});
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

	async setStatus(newStatus) {
		this.status = newStatus;
		await this.save();
	},
};


module.exports = mongoose.model('Site', SiteSchema);
