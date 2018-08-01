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

          <button @click.prevent="updateInstructions" v-show="editorShown" class="btn btn-primary">
            {{signs.save_changes}}
          </button>

          <div v-show="editorShown">
            <textarea id="instructions" v-model="instructions"></textarea>
          </div>
        </div>
	`,

	data() {
		return {
			editorShown: false,
			cmInstance: null,
			signs: window.signs,
			instructions: window.instructions,
		};
	},

	methods: {
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
			this.instructions = this.cmInstance.getValue();
		});
	},
};
