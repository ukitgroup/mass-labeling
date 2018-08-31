/* eslint-disable import/first */

import $ from 'jquery';
import Request from './request';

import '../css/layout.css';

import '../../node_modules/bootstrap/dist/js/bootstrap';

$('#logout').click((event) => {
	event.preventDefault();

	Request.post('/api/auth/logout')
		.then(() => {
			window.location = '/';
		});
});
