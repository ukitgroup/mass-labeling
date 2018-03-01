'use strict';


$('.create-slider').click(function () {
	const userId = $(this).data('id');

	window.Request.post(`/user/${userId}/create-slider`)
		.then(() => alert('Слайдер создан'))
		.catch(err => alert(`Ошибка: "${err.message}"`));
});
