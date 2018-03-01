'use strict';


$('#login').submit((event) => {
	event.preventDefault();

	const email = $('#email').val();
	const password = $('#password').val();

	window.Request.post('/auth/login', {
		data: {
			email,
			password,
		},
	})
		.then(() => {
			window.location = '/';
		})
		.catch((err) => {
			alert(`Ошибка авторизации: "${err.message}"`);
		});
});
