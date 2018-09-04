/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');


const TaskSetSchema = new mongoose.Schema({
	assessmentLimit: {
		type: Number,
		default: 0,
	},

	activeDataSets: {
		type: [String],
		default: [],
	},

	randomSelection: {
		type: Boolean,
		default: true,
	},

	isActive: {
		type: Boolean,
		default: false,
	},

	description: {
		type: String,
		default: '',
	},
});


TaskSetSchema.statics = {
	async getAll() {
		const allTaskSets = await this.find();
		return allTaskSets;
	},

	async getCurrentActive() {
		const currentActive = await this.findOne({
			isActive: {
				$eq: true,
			},
		});

		return currentActive;
	},

	async getCurrentActiveId() {
		const currentActive = await this.getCurrentActive();
		return currentActive ? currentActive._id : null;
	},
};


TaskSetSchema.methods = {
	async update(newProperties) {
		[
			'assessmentLimit',
			'randomSelection',
			'description',
			'activeDataSets',
		].forEach((key) => {
			const newValue = newProperties[key];

			if (typeof newValue !== 'undefined') {
				this[key] = newValue;
			}
		});

		await this.save();
	},

	async activate() {
		this.isActive = true;
		await this.save();
	},

	async deactivate() {
		this.isActive = false;
		await this.save();
	},
};


module.exports = mongoose.model('TaskSet', TaskSetSchema);
