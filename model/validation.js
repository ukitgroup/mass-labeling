const mongoose = require('mongoose');

const Site = require('./site');


const ValidationSchema = new mongoose.Schema({
	siteId: {
		type: mongoose.Schema.ObjectId,
		ref: 'Site',
		required: true,
	},
	answer: {
		type: String,
		enum: ['new', 'ok', 'broken'],
	},
});


ValidationSchema.statics = {
	async getNext() {
		const task = await this.findOne({ answer: 'new' });
		if (! task) {
			throw new Error('Task not found');
		}

		task.site = await Site.findById(task.siteId);

		return task;
	},
};


ValidationSchema.methods = {
	async setAnswer(answer) {
		this.answer = answer;
		await this.save();
	},

	serialize() {
		return {
			id: this.id,
			siteId: this.site.id,
		};
	},
};


module.exports = mongoose.model('Validation', ValidationSchema);
