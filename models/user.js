const mongoose = require('mongoose');
const crypto = require('crypto');
const stats = require('stats-lite');

const Site = require('./site');
const Slider = require('./slider');
const Task = require('./task');

const i18nConfig = require('../locales/i18n-config');


const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		index: {
			unique: true,
		},
	},

	password: {
		type: String,
		required: true,
	},

	role: {
		type: String,
		enum: ['admin', 'user'],
		default: 'user',
		required: true,
	},

	status: {
		type: String,
		enum: ['active', 'disabled'],
		default: 'active',
		required: true,
	},

	locale: {
		type: String,
		default: i18nConfig.defaultLocale,
	},
});


UserSchema.statics = {
	hash(str) {
		return crypto.createHash('sha256').update(str).digest('base64');
	},

	async getById(id) {
		const user = await this.findById(id);
		if (! user) throw new Error('auth_errors.bad_user_id');
		if (user.status !== 'active') throw new Error('auth_errors.user_disabled');

		return user;
	},

	async getByEmail(email) {
		const user = await this.findOne({ email });
		if (! user) throw new Error('auth_errors.bad_user_email');

		return user;
	},

	async getByEmailPassword(email, password) {
		const user = await this.getByEmail(email);
		if (user.password !== this.hash(password)) throw new Error('auth_errors.bad_user_password');
		if (user.status !== 'active') throw new Error('auth_errors.user_disabled');

		return user;
	},
};


UserSchema.methods = {
	async setEmail(email) {
		this.email = email;
		await this.save();
	},

	async setPassword(password) {
		this.password = this.constructor.hash(password);
		await this.save();
	},

	async setStatus(status) {
		this.status = status;
		await this.save();
	},

	async setRole(role) {
		this.role = role;
		await this.save();
	},

	async setLocale(locale) {
		this.locale = locale;
		await this.save();
	},

	async createSlider() {
		const name = this.email;
		const userId = this.id;

		// Получаем id сайтов, которые размечал пользователь
		let siteIds = await Site.distinct('_id', Site.filter.allowedDatasets);
		siteIds = await Task.distinct('siteId', {
			userId,
			siteId: { $in: siteIds },
		});

		// Получаем ответы для сайтов
		const answers = await Task.find({
			siteId: { $in: siteIds },
		});

		// Собираем оценки для слайдера
		const slider = await Promise.all(siteIds.map(async (siteId) => {
			// Get saved slider from DB to retrieve its modelScore property value
			const slider = await Slider.findOne({
				name: { $eq: name },
				siteId: { $eq: siteId },
			});

			// If slider exists, get its modelScore property value
			const modelScore = slider ? slider.modelScore : 0;

			const siteAnswers = answers
				.filter(item => item.siteId.equals(siteId))
				.map(item => item.answer);

			const userAnswers = answers
				.filter(item => item.siteId.equals(siteId))
				.filter(item => item.userId.equals(userId))
				.map(item => item.answer);

			return {
				siteId,
				modelScore,
				siteAnswers,
				userAnswers,
			};
		}));


		// Удаляем старый слайдер
		await Slider.deleteAllByName(name);

		// Сохраняем оценки
		await Slider.getAllNew({
			name,
			slider: slider.map(({ siteId, modelScore, userAnswers }) => ({
				siteId,
				// Set the model score value of previous slider to the new one
				modelScore,
				assessorsScore: userAnswers,
			})),
		});
	},
};


module.exports = mongoose.model('User', UserSchema);
