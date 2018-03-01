'use strict';


$('.approve').click(function () {
	const siteId = $(this).data('id');

	window.Request.post(`/broken/${siteId}/approve`)
		.then(() => window.location.reload())
		.catch(err => alert(`Ошибка: "${err.message}"`));
});

$('.disable').click(function () {
	const siteId = $(this).data('id');

	window.Request.post(`/broken/${siteId}/disable`)
		.then(() => window.location.reload())
		.catch(err => alert(`Ошибка: "${err.message}"`));
});
