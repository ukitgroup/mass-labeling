/* eslint-disable no-alert */

'use strict';

const tabs = {
	ADMIN: 'admin',
	TECH: 'tech',
};


window.app = new window.Vue({
	el: '.js-container',

	data() {
		return {
			config: window.config,
			loading: true,
			activeTab: tabs.ADMIN,
		};
	},

	computed: {
		techSettings() {
			return this.config.filter(fieldSet => fieldSet.tab === tabs.TECH);
		},

		adminSettings() {
			return this.config.filter(fieldSet => fieldSet.tab === tabs.ADMIN);
		},
	},

	methods: {
		updateConfig() {
			window.Request.post('/api/config/update', {
				data: this.config,
			})
				.then(() => alert('Config updated'))
				.catch(error => alert(error));
		},

		getFieldIndex(fieldSetIndex, propertyIndex) {
			return `field-${fieldSetIndex}${propertyIndex}`;
		},

		switchTab(tab) {
			this.activeTab = tab;
		},

		getTabClass(tab) {
			return this.activeTab === tab
				? 'btn-primary'
				: 'btn-link';
		},
	},

	mounted() {
		this.loading = false;
		// console.log('mounted', this.config);
	},
});
