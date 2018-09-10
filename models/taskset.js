/* eslint-disable no-underscore-dangle,max-len */
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

	instruction: {
		type: String,
		default: '<!doctype html>\n' +
		'<html>\n' +
		'\t<head lang="ru">\n' +
		'\t\t<meta http-equiv="Content-Type" content="text/html; charset=utf-8">\n' +
		'\n' +
		'\t\t<title>Mass labeling Инструкция</title>\n' +
		'\n' +
		'\t\t<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">\n' +
		'\n' +
		'\t\t<style>\n' +
		'\t\t\tbody {\n' +
		'\t\t\t\tbackground-color: #f9fafa;\n' +
		'\t\t\t}\n' +
		'\t\t\t.card {\n' +
		'\t\t\t\tbox-shadow: 0 20px 80px 0 rgba(0,0,0,.07);\n' +
		'\t\t\t}\n' +
		'\t\t</style>\n' +
		'\t</head>\n' +
		'\t<body>\n' +
		'\t\t<div class="container pt-5 pb-5">\n' +
		'\t\t\t<h1 class="h2 text-primary font-weight-light mb-4">Mass labeling Инструкция</h1>\n' +
		'\t\t\t<div class="card p-4 border-0">\n' +
		'\t\t\t\t<div class="card-text">\n' +
		'\t\t\t\t\t<h2 class="h4">Цель</h2>\n' +
		'\t\t\t\t\t<p>Вам демонстрируются скриншоты сайтов. Задача - оценить привлекательность каждого сайта на скриншоте по 10-балльной шкале.</p>\n' +
		'\t\t\t\t\t<h2 class="h4">Критерии оценки</h2>\n' +
		'\t\t\t\t\t<p>Мы просим субъективное мнение, но нужна всё-таки какая-то определённость и последовательность в выставлении оценок, т.е. в данной работе просим вас при оценке сайтов подумать, почему вы оцениваете этот сайт по 10-балльной шкале именно этой цифрой.</p>\n' +
		'\t\t\t\t\t<p>Сайт нужно оценивать по внешнему виду, а не по информативности.</p>\n' +
		'\t\t\t\t\t<p><b>Мы <span class="text-danger">не</span> оцениваем информативность и современность сайта, т.е. на его оценку <span class="text-danger">не должно</span> влиять:</b></p>\n' +
		'\t\t\t\t\t<ul>\n' +
		'\t\t\t\t\t\t<li class="text-danger">Сайт полезен некоторому кругу пользователей</li>\n' +
		'\t\t\t\t\t\t<li class="text-danger">Содержит картинку крутого Ferrari или любимого покемона</li>\n' +
		'\t\t\t\t\t\t<li class="text-danger">Сайт адаптивен, сделан с использованием современных фреймворков, удобное меню</li>\n' +
		'\t\t\t\t\t</ul>\n' +
		'\t\t\t\t\t<p><b>Что <span class="text-success">должно</span> влиять на оценку:</b></p>\n' +
		'\t\t\t\t\t<ul>\n' +
		'\t\t\t\t\t\t<li class="text-success">На сайт приятно смотреть</li>\n' +
		'\t\t\t\t\t\t<li class="text-success">Хорошо подобраны цвета</li>\n' +
		'\t\t\t\t\t\t<li class="text-success">Сайт содержит качественные изображения</li>\n' +
		'\t\t\t\t\t</ul>\n' +
		'\t\t\t\t\t<p>Надеемся на вашу добросовестность и непредвзятость, но слишком критически тоже не надо.</p>\n' +
		'\t\t\t\t\t<h2 class="h4">Управление</h2>\n' +
		'\t\t\t\t\t<p>Нажатие цифры на клавиатуре выставляет оценку по 10-балльной шкале, где <b>1</b> - минимальная оценка, <b>10</b> - максимальная. Цифра <b>0</b> на клавиатуре - это оценка 10.</p>\n' +
		'\t\t\t\t\t<p>Подтвердить оценку и получить следующий скрин - нажать <b>Enter</b>.</p>\n' +
		'\t\t\t\t\t<p>Вернуться к предыдущему скриншоту - клавиша <b>Backspace &larr;</b>.</p>\n' +
		'\t\t\t\t\t<p>Если видите битый скриншот - вместо оценки нажимаете кнопку <b>X</b> (икс), это пометка скриншота как сломанного. Не забывайте помечать сломанные скриншоты, где что-то съехало или сломалось.</p>\n' +
		'\t\t\t\t\t<p>Если на скриншоте есть большой скролл или не видна часть контента, то помечайте скрин как сломанный, но если скролл маленький и не скрыл контент, то все в порядке.</p>\n' +
		'\t\t\t\t</div>\n' +
		'\t\t\t</div>\n' +
		'\t\t</div>\n' +
		'\n' +
		'\t</body>\n' +
		'</html>',
	},
});


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
};


TaskSetSchema.methods = {
	async update(newProperties) {
		[
			'assessmentLimit',
			'randomSelection',
			'description',
			'activeDataSets',
			'instruction',
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
