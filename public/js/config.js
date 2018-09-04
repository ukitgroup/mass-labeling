/* eslint-disable no-alert,prefer-destructuring */

import Vue from 'vue';

import Request from './request';

import '../css/config.css';

import UsersController from './components/UsersController.vue';
import UserInstructionsController from './components/UserInstructionsController.vue';
import ConfigFieldSet from './components/ConfigFieldSet.vue';
import TaskSetsController from './components/TaskSetsController.vue';


const tabs = {
	USERS: 'users',
	ASSESSMENTS: 'assessment',
	TECH: 'tech',
};


new Vue({
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
	},

	methods: {
		updateConfig() {
			Request.post('/api/config/save', {
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
	},

	created() {
		const { hash } = window.location;

		if (hash) {
			this.activeTab = window.location.hash.split('=')[1];
		} else {
			this.activeTab = tabs.USERS;
		}

		this.$on('instructionsUpdate', (value) => {
			this.instructions = value;
		});
	},

	mounted() {
		this.loading = false;
	},
});
