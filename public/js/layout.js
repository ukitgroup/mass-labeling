import $ from 'jquery';
import Request from './request';

import '../css/layout.css';

window.$ = $;
window.jQuery = $;

$('#logout').click((event) => {
	event.preventDefault();

	Request.post('/api/auth/logout')
		.then(() => {
			window.location = '/';
		});
});
