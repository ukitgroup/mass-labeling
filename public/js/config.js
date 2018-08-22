/* eslint-disable no-alert,prefer-destructuring */

'use strict';


const {
	UsersController,
	UserInstructionsController,
	ConfigFieldSet,
} = window;


const tabs = {
	USERS: 'users',
	ASSESSMENTS: 'assessment',
	TECH: 'tech',
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
			activeTab: tabs.USERS,
		};
	},

	computed: {
		techSettings() {
			return this.config.filter(fieldSet => fieldSet.tab === tabs.TECH);
		},

		assessmentSettings() {
			return this.config.filter(fieldSet => fieldSet.tab === tabs.ASSESSMENTS);
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
			this.activeTab = tabs.USERS;
		}

		this.$on('datasetsActiveState', state => this.setDataSetsStatus(state));
		this.$on('datasetsExportState', state => this.setDataSetsExportStatus(state));
	},

	mounted() {
		this.loading = false;
	},
});
