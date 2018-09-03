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
		this.find();
	},
};


TaskSetSchema.methods = {
	async update(newProperties) {
		this.assessmentLimit = newProperties.assessmentLimit;
		this.randomSelection = newProperties.randomSelection;
		this.description = newProperties.description;
		this.activeDataSets = newProperties.activeDataSets;

		await this.save();
	},
};


module.exports = mongoose.model('TaskSet', TaskSetSchema);
