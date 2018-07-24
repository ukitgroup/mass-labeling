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
			availableDataSets: window.availableDataSets,
			cliExportDataSets: window.cliExportDataSets,
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
				data: {
					config: this.config,
					availableDataSets: this.availableDataSets,
					// cliExportDataSets: this.cliExportDataSets,
				},
			})
				.then(() => alert('Config updated'))
				.catch(error => alert(error));
		},

		getFieldIndex(fieldSetIndex, propertyIndex) {
			return `field-${fieldSetIndex}${propertyIndex}`;
		},

		getDataSetIndex(prefix, index) {
			return `${prefix}-${index}`;
		},

		switchTab(tab) {
			this.activeTab = tab;
		},

		getTabClass(tab) {
			return this.activeTab === tab
				? 'btn-primary'
				: 'btn-link';
		},

		setDataSetStatus(event, site) {
			const checkbox = event.currentTarget;

			if (checkbox.checked) {
				site.status = 'active';
			} else {
				site.status = 'disabled';
			}
		},

		setDataSetsStatus(state) {
			const status = state ? 'active' : 'disabled';

			this.availableDataSets.forEach((dataSet) => {
				dataSet.status = status;
			});
		},

		setDataSetsExportStatus(state) {
			this.cliExportDataSets.forEach((dataSet) => {
				dataSet.markedForExport = state;
			});
		},
	},

	mounted() {
		this.loading = false;
	},
});
