'use strict';


$('#user').submit((event) => {
	event.preventDefault();

	const id = $('#user').data('id');

	const email = $('#email').val();
	const pass = $('#pass').val();
	const status = $('#status').val();
	const role = $('#role').val();

	if (! id) {
		window.Request.post('/api/user/add', {
			data: {
				email,
				pass,
				status,
				role,
			},
		})
			.then(() => {
				window.location = '/user/list';
			})
			.catch(() => {
				alert('Ошибка добавления пользователя');
			});
	} else {
		window.Request.post(`/api/user/${id}/update`, {
			data: {
				email,
				pass,
				status,
				role,
			},
		})
			.then(() => {
				window.location = '/user/list';
			})
			.catch(() => {
				alert('Ошибка обновления пользователя');
			});
	}
});
