/* eslint-disable no-alert,prefer-destructuring */

'use strict';


const {
	UsersController,
	UserInstructionsController,
} = window;


const tabs = {
	ADMIN: 'admin',
	TECH: 'tech',
	ASSESSMENTS: 'assessment',
};


window.app = new window.Vue({
	el: '.js-container',

	components: {
		'users-controller': UsersController,
		'user-instructions-controller': UserInstructionsController,
	},

	data() {
		return {
			config: window.config,
			availableDataSets: window.availableDataSets,
			cliExportDataSets: window.cliExportDataSets,
			instructions: window.instructions,
			loading: false,
			signs: window.signs,
			activeTab: tabs.ADMIN,

			editorShown: false,
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
				.then(() => alert(this.signs.config_updated))
				.catch(error => alert(error));
		},

		getDataSetIndex(prefix, index) {
			return `${prefix}-${index}`;
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
			this.cliExportDataSets.forEach((dataSet) => {
				dataSet.markedForExport = state;
			});
		},

		openCodeMirror() {
			this.editorShown = true;
		},

		closeCodeMirror() {
			this.editorShown = false;
		},

		updateInstructions() {
			const instructionsTextArea = this.$el.querySelector('#instructions');

			window.Request.post('/api/config/update-instructions', {
				data: {
					instructions: instructionsTextArea.value.trim(),
				},
			})
				.then(() => alert(this.signs.instructions_updated))
				.catch(error => alert(error));
		},
	},

	created() {
		const { hash } = window.location;

		if (hash) {
			this.activeTab = window.location.hash.split('=')[1];
		} else {
			this.activeTab = tabs.ADMIN;
		}
	},

	mounted() {
		this.loading = false;

		const instructionsTextArea = this.$el.querySelector('#instructions');

		this.cmInstance = window.CodeMirror.fromTextArea(instructionsTextArea, {
			lineNumbers: true,
			mode: 'xml',
			theme: 'mdn-like',
			lineWrapping: true,
			autoRefresh: true,
		});

		this.cmInstance.on('change', () => {
			this.instructions = this.cmInstance.getValue();
		});
	},
});
