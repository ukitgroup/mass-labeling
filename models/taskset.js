/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');


const TaskSetSchema = new mongoose.Schema({
	seqNum: {
		type: Number,
		default: 0,
	},

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

	instruction: {
		type: String,
		default: '',
	},
});


const fieldsToSave = [
	'assessmentLimit',
	'randomSelection',
	'description',
	'activeDataSets',
	'instruction',
];


TaskSetSchema.statics = {
	async getAll() {
		const allTaskSets = await this.find();
		return allTaskSets;
	},

	async getCurrentActive() {
		const currentActive = await this.findOne({
			isActive: true,
		});

		return currentActive;
	},

	async saveModel(rawModelObject) {
		const newTaskSet = {};

		fieldsToSave.forEach((key) => {
			const newValue = rawModelObject[key];

			if (typeof newValue !== 'undefined') {
				newTaskSet[key] = newValue;
			}
		});

		const taskSetsCount = await this.count();
		newTaskSet.seqNum = taskSetsCount + 1;

		await this.create(newTaskSet);
	},
};


TaskSetSchema.methods = {
	async update(newProperties) {
		fieldsToSave.forEach((key) => {
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
