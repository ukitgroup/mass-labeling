'use strict';


// Texts from back-end
const { signs } = window;


$('#login').submit((event) => {
	event.preventDefault();

	const email = $('#email').val();
	const password = $('#password').val();

	window.Request.post('/api/auth/login', {
		data: {
			email,
			password,
		},
	})
		.then(() => {
			window.location = '/';
		})
		.catch((err) => {
			alert(`${signs.auth_error}: "${err.message}"`);
		});
});
