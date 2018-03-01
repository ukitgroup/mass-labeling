'use strict';


$('#logout').click((event) => {
	event.preventDefault();

	window.Request.post('/auth/logout')
		.then(() => {
			window.location = '/';
		});
});
