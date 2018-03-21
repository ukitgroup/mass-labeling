const mongoose = require('mongoose');


const ValidationSchema = new mongoose.Schema({
	siteId: {
		type: mongoose.Schema.ObjectId,
		required: true,
	},

	answer: {
		type: String,
		enum: ['new', 'ok', 'broken'],
		default: 'new',
		required: true,
	},
});


ValidationSchema.statics = {
	async getNext() {
		const task = await this.findOne({ answer: 'new' });
		if (! task) throw new Error('Task not found');

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
			siteId: this.siteId,
		};
	},
};


module.exports = mongoose.model('Validation', ValidationSchema);
