/* eslint-disable no-alert,prefer-destructuring */

'use strict';


const {
	UsersController,
	UserInstructionsController,
	ConfigFieldSet,
	TaskSetsController,
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
		'tasksets-controller': TaskSetsController,
	},

	data() {
		return {
			config: window.config,
			availableDataSets: window.availableDataSets,
			loading: false,
			signs: window.signs,
			activeTab: tabs.USERS,
			instructions: window.instructions,
			taskSets: window.taskSets,
		};
	},

	computed: {
		techSettings() {
			return this.config.filter(fieldSet => fieldSet.tab === tabs.TECH);
		},

		// assessmentSettings() {
		// 	return this.config.filter(fieldSet => fieldSet.tab === tabs.ASSESSMENTS);
		// },

		// Get 'assessment.showRandomly' property value
		// showRandomlyPropertyValue() {
		// 	const fieldSet = this.config
		// 		.filter(dataSet => dataSet.id === 'assessment')[0];
        //
		// 	if (! fieldSet) {
		// 		return false;
		// 	}
        //
		// 	const showRandomlyProperty = fieldSet.properties
		// 		.filter(property => property.id === 'showRandomly')[0];
        //
		// 	return showRandomlyProperty ? showRandomlyProperty.value : false;
		// },
	},

	methods: {
		updateConfig() {
			window.Request.post('/api/config/update', {
				data: {
					config: this.config,
					availableDataSets: this.availableDataSets,
					instructions: this.instructions,
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
				: 'btn-default';
		},

		// setDataSetsStatus(state) {
		// 	this.availableDataSets.forEach((dataSet) => {
		// 		dataSet.isActive = state;
		// 	});
		// },
        //
		// setDataSetsExportStatus(state) {
		// 	this.availableDataSets.forEach((dataSet) => {
		// 		dataSet.markedForExport = state;
		// 	});
		// },
	},

	created() {
		const { hash } = window.location;

		if (hash) {
			this.activeTab = window.location.hash.split('=')[1];
		} else {
			this.activeTab = tabs.USERS;
		}

		// this.$on('datasetsActiveState', state => this.setDataSetsStatus(state));
		// this.$on('datasetsExportState', state => this.setDataSetsExportStatus(state));

		this.$on('instructionsUpdate', (value) => {
			this.instructions = value;
		});
	},

	mounted() {
		this.loading = false;
	},
});
