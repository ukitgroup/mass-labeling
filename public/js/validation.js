'use strict';


$('#logout').click((event) => {
	event.preventDefault();

	window.Request.post('/auth/logout')
		.then(() => {
			window.location = '/';
		});
});


class Design {
	constructor() {
		this.next();
	}


	show() {
		$('#image').attr('src', `/site/${this.task.siteId}/screenshot`);
	}


	// Получение новой задачи
	next() {
		window.Request.post('/validation/create')
			.then((task) => {
				this.task = task;
				this.show();
			})
			.catch(() => {
				alert('Ошибка получения новой задачи');
			});
	}

	// Сохранение выбора пользователя
	save(answer) {
		window.Request.post(`/validation/${this.task.id}/answer`, {
			data: { answer },
		})
			.then(() => {
				this.prev = this.task;
				this.next();
			});
	}

	// Возврат к предыдущей задаче
	undo() {
		if (! this.prev) {
			return;
		}

		window.Request.post(`/validation/${this.prev.id}/undo`)
			.then(() => {
				this.task = this.prev;
				this.prev = null;
				this.show();
			});
	}


	// Инициализация горячих клавиш
	hotkeys(keys = {}) {
		$(window).on('keyup', (event) => {
			// Сайт ОК
			if (event.keyCode === keys.ok) {
				event.preventDefault();
				this.save('ok');
			}

			// Сайт сломан
			if (event.keyCode === keys.broken) {
				event.preventDefault();
				this.save('broken');
			}

			// Возврат к предыдущей задаче
			if (event.keyCode === keys.undo) {
				event.preventDefault();
				this.undo();
			}
		});
	}
}

const design = new Design();
design.hotkeys({
	ok: 49,
	broken: 50,
	undo: 8,
});
