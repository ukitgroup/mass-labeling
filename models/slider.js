const Promise = require('bluebird');
const mongoose = require('mongoose');
const _ = require('lodash');

const Site = require('./site');


const SliderSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		index: true,
	},

	siteId: {
		type: mongoose.Schema.ObjectId,
		required: true,
	},

	modelScore: {
		type: Number,
		default: 0,
	},

	taskSetId: {
		type: mongoose.Schema.ObjectId,
		required: true,
	},

	assessorsScore: [Number],
});


SliderSchema.statics = {
	async getAllNew({ name, slider, taskSetId }) {
		return this.create(slider.map(({ siteId, modelScore, assessorsScore }) => ({
			name,
			siteId,
			modelScore,
			assessorsScore,
			taskSetId: mongoose.Types.ObjectId(taskSetId),
		})));
	},

	getAllByNameAndTaskSet(name, taskSetId) {
		return this.find({
			name,
			taskSetId: mongoose.Types.ObjectId(taskSetId),
		});
	},

	async deleteAllByNameAndTaskSet(name, taskSetId) {
		await this.remove({
			name,
			taskSetId: mongoose.Types.ObjectId(taskSetId),
		});
	},

	async serializeAll(items) {
		return Promise.map(items, async item => item.serialize());
	},
};


SliderSchema.methods = {
	async serialize() {
		return {
			..._.pick(this, ['siteId', 'modelScore', 'assessorsScore']),
			..._.pick(await Site.getById(this.siteId), ['url']),
		};
	},
};


module.exports = mongoose.model('Slider', SliderSchema);
