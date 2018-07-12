'use strict';


// Texts from back-end
const { signs } = window;


$('.create-slider').click(function () {
	const userId = $(this).data('id');

	window.Request.post(`/api/user/${userId}/create-slider`)
		.then(() => alert(signs.slider_created))
		.catch(err => alert(`${signs.error}: "${err.message}"`));
});
