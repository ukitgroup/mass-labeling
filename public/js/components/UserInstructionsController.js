/* eslint-disable no-alert */

window.UserInstructionsController = {
	template: `
		<div class="edit-instructions">
          <button @click.prevent="openCodeMirror" v-show="!editorShown" class="btn btn-success">
            {{signs.edit_instruction_page_html}}
          </button>

          <button @click.prevent="closeCodeMirror" v-show="editorShown" class="btn btn-success">
            {{signs.close_editor}}
          </button>

          <div v-show="editorShown">
            <textarea id="instructions" v-model="instructions"></textarea>
          </div>
        </div>
	`,

	props: ['instructions'],

	data() {
		return {
			editorShown: false,
			cmInstance: null,
			signs: window.signs,
		};
	},

	methods: {
		openCodeMirror() {
			this.editorShown = true;
		},

		closeCodeMirror() {
			this.editorShown = false;
		},
	},

	mounted() {
		const instructionsTextArea = this.$el.querySelector('#instructions');

		this.cmInstance = window.CodeMirror.fromTextArea(instructionsTextArea, {
			lineNumbers: true,
			mode: 'xml',
			theme: 'mdn-like',
			lineWrapping: true,
			autoRefresh: true,
		});

		this.cmInstance.on('change', () => {
			this.$parent.$emit('instructionsUpdate', this.cmInstance.getValue());
		});
	},
};
