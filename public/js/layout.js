'use strict';


$('#logout').click((event) => {
	event.preventDefault();

	window.Request.post('/api/auth/logout')
		.then(() => {
			window.location = '/';
		});
});
