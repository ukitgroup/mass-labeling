/* eslint-disable no-alert,prefer-destructuring */

'use strict';


const {
	UsersController,
	UserInstructionsController,
	ConfigFieldSet,
} = window;


const tabs = {
	ADMIN: 'admin',
	TECH: 'tech',
	ASSESSMENTS: 'assessment',
	USERS: 'users',
};


new window.Vue({
	el: '.js-container',

	components: {
		'users-controller': UsersController,
		'user-instructions-controller': UserInstructionsController,
		'config-fieldset': ConfigFieldSet,
	},

	data() {
		return {
			config: window.config,
			availableDataSets: window.availableDataSets,
			loading: false,
			signs: window.signs,
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
				},
			})
				.then(() => alert(this.signs.config_updated))
				.catch(error => alert(error));
		},
		
		switchTab(tab) {
			this.activeTab = tab;
			window.location.hash = `#tab=${tab}`;
		},

		getTabClass(tab) {
			return this.activeTab === tab
				? 'btn-primary'
				: 'btn-link';
		},

		setDataSetsStatus(state) {
			this.availableDataSets.forEach((dataSet) => {
				dataSet.isActive = state;
			});
		},

		setDataSetsExportStatus(state) {
			this.availableDataSets.forEach((dataSet) => {
				dataSet.markedForExport = state;
			});
		},
	},

	created() {
		const { hash } = window.location;

		if (hash) {
			this.activeTab = window.location.hash.split('=')[1];
		} else {
			this.activeTab = tabs.ADMIN;
		}

		this.$on('datasetsActiveState', state => this.setDataSetsStatus(state));
		this.$on('datasetsExportState', state => this.setDataSetsExportStatus(state));
	},

	mounted() {
		this.loading = false;
	},
});
