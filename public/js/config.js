/* eslint-disable no-alert */

'use strict';

window.app = new window.Vue({
	el: '.js-container',

	data() {
		return {
			config: window.config,
			loading: true,
		};
	},

	methods: {
		updateConfig() {
			window.Request.post('/api/config/update', {
				data: this.config,
			})
				.then(() => alert('Config updated'))
				.catch(() => alert('Error'));

			// console.log(JSON.stringify(this.config));
		},

		getFieldIndex(fieldSetIndex, propertyIndex) {
			return `field-${fieldSetIndex}${propertyIndex}`;
		},
	},

	mounted() {
		this.loading = false;
		console.log('mounted', this.config);
	},
});
