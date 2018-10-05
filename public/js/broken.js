/* eslint-disable no-alert */

import $ from 'jquery';
import Request from './request';


// Texts from back-end
const { signs } = window;


$('.approve').click(function () {
	const siteId = $(this).data('id');

	Request.post(`/api/broken/${siteId}/approve`)
		.then(() => window.location.reload())
		.catch(err => alert(`${signs.error}: "${err.message}"`));
});

$('.disable').click(function () {
	const siteId = $(this).data('id');

	Request.post(`/api/broken/${siteId}/disable`)
		.then(() => window.location.reload())
		.catch(err => alert(`${signs.error}: "${err.message}"`));
});
