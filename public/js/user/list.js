'use strict';


$('.create-slider').click(function () {
	const userId = $(this).data('id');

	console.log(123)

	// Texts from back-end
	const { signs } = window;

	window.Request.post(`/api/user/${userId}/create-slider`)
		.then(() => alert(signs.slider_created))
		.catch(err => alert(`${signs.error}: "${err.message}"`));
});
