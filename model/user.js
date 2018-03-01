const mongoose = require('mongoose');
const crypto = require('crypto');
const stats = require('stats-lite');

const { ForbiddenError } = require('../lib/http-errors');

const Site = require('./site');
const Slider = require('./slider');
const Task3 = require('./task3');


const UserModel = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		enum: ['active', 'disabled'],
		default: 'active',
	},
	role: {
		type: String,
		enum: ['admin', 'user'],
		default: 'user',
	},
});


UserModel.statics = {
	hash(str) {
		return crypto.createHash('sha256').update(str).digest('base64');
	},

	async getById(id) {
		const user = await this.findById(id);

		if (! user) {
			throw new ForbiddenError('Bad userId');
		}

		if (user.status !== 'active') {
			throw new ForbiddenError('User disabled');
		}

		return user;
	},

	async getByEmail(email) {
		const user = await this.findOne({ email });

		if (! user) {
			throw new Error('Bad email');
		}

		return user;
	},

	async getByEmailPassword(email, password) {
		const user = await this.getByEmail(email);

		if (user.password !== this.hash(password)) {
			throw new Error('Bad password');
		}

		if (user.status !== 'active') {
			throw new Error('User disabled');
		}

		return user;
	},
};


UserModel.methods = {
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

	async createSlider() {
		const name = this.email;
		const userId = this.id;

		// Получаем Id сайтов, которые размечал пользователь
		const siteIds = await Task3.distinct('siteId', {
			userId,
			siteId: {
				$in: await Site.getAll(Site.filter.allowedCategories),
			},
		});

		// Получаем ответы для сайтов
		const answers = await Task3.find({
			siteId: {
				$in: siteIds,
			},
		});

		// Собираем оценки для слайдера
		const slider = siteIds.map((siteId) => {
			const siteAnswers = answers
				.filter(item => item.siteId.equals(siteId))
				.map(item => item.answer);

			const userAnswers = answers
				.filter(item => item.siteId.equals(siteId))
				.filter(item => item.userId.equals(userId))
				.map(item => item.answer);

			return {
				siteId,
				siteAnswers,
				userAnswers,
			};
		});


		// Удаляем старый слайдер
		await Slider.deleteAllByName(name);

		// Сохраняем оцкенки
		await Slider.getAllNew({
			name,
			slider: slider.map(({ siteId, siteAnswers, userAnswers }) => ({
				siteId,
				modelScore: stats.mean(siteAnswers),
				assessorsScore: userAnswers,
			})),
		});
	},
};


module.exports = mongoose.model('User', UserModel);
