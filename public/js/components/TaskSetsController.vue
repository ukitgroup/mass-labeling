<template>
	<div>
		<div v-if="!selectedTaskSet">
			<div class="form-group">
				<button @click.prevent="addTaskSet()" type="button" class="btn btn-primary">
					{{signs.add_taskset}}
				</button>
			</div>

			<div class="row">
				<table class="table table-striped">
					<thead>
					<tr>
						<th>Id</th>
						<th>{{signs.assessment_limit_short}}</th>
						<th>{{signs.random_selection}}</th>
						<th>{{signs['config_props.cliExport_datasets']}}</th>
						<th>{{signs.active_taskset}}</th>
						<th>{{signs.description}}</th>
						<th>{{signs.actions}}</th>
					</tr>
					</thead>
					<tbody>
					<tr v-if="taskSets.length" v-for="taskSet in taskSets" :class="{
						'text-muted': !taskSet.isActive,
						'text-bold': taskSet.isActive,
					}">
						<td>{{taskSet.seqNum}}</td>
						<td>{{taskSet.assessmentLimit}}</td>
						<td>{{booleanToReadableString(taskSet.randomSelection)}}</td>
						<td :title="renderDataSetsList(taskSet.activeDataSets)">
							{{renderActiveDataSetsCellContent(taskSet.activeDataSets)}}
						</td>
						<td>
							{{booleanToReadableString(taskSet.isActive)}}
						</td>
						<td>{{taskSet.description || '-'}}</td>
						<td>
							<button @click.prevent="editTaskSet(taskSet)" type="button" class="btn btn-success btn-xs">
								{{signs.edit}}
							</button>

							<button v-if="!taskSet.isActive" @click.prevent="activateTaskSet(taskSet)" type="button"
									class="btn btn-primary btn-xs">
								{{signs.activate}}
							</button>
						</td>
					</tr>
					<tr v-if="!taskSets.length">
						<td colspan="7" class="no-tasks-cell">{{signs.no_created_tasks}}</td>
					</tr>
					</tbody>
				</table>
			</div>
		</div>

		<div class="tasksets-form-wrapper" v-if="selectedTaskSet">
			<h1 v-if="selectedTaskSet._id">{{signs.edit_taskset}}</h1>
			<h1 v-else>{{signs.add_taskset}}</h1>

			<div class="row tasksets-form">
				<div class="col-xs-6">
					<div autocomplete="off">

						<div class="form-group property">
							<label for="limit">{{signs['config_props.assessment_limit']}}</label>
							<input
								:disabled="!selectedTaskSet.randomSelection"
								type="number"
								id="limit"
								class="form-control"
								v-model="selectedTaskSet.assessmentLimit"
							>
						</div>

						<div class="form-check-label property">
							<custom-checkbox
								:id="'randomSelection'"
								:data="selectedTaskSet.randomSelection"
								:label="signs['config_props.show_randomly']"
								@onchange="selectedTaskSet.randomSelection = $event.state"
							></custom-checkbox>
						</div>

						<div class="form-check-label property">
							<label for="task-set-description">{{signs.description}}</label>

							<textarea
								id="task-set-description"
								class="form-check-input"
								v-model="selectedTaskSet.description"
							></textarea>
						</div>

						<h5>{{this.signs.datasets_for_task}}</h5>

						<div v-if="selectedTaskSet.dataSets.length" class="datasets-container property">
							<custom-checkbox
								:id="'toggle-all'"
								:data="toggleAllDataSetsCheckboxState"
								:label="toggleAllDataSetsCheckboxText"
								@onchange="setDataSetsStatus($event)"
							></custom-checkbox>
						</div>

						<div v-if="selectedTaskSet.dataSets.length" class="datasets-container property">
							<custom-checkbox
								v-for="(dataset, index) in selectedTaskSet.dataSets"
								:id="index"
								:data="dataset.isInTaskSet"
								:disabled="!dataset.canBeChanged"
								:title="dataset.canBeChanged ? '' : signs.disabled_dataset_reason"
								:label="dataset._id"
								:key="dataset._id"
								@onchange="dataset.isInTaskSet = $event.state"
							></custom-checkbox>
						</div>

						<div v-else>
							{{window.signs.no_datasets}}
						</div>

						<div class="form-check-label property">
							<label for="task-set-description">{{signs.tutorial}}</label>

							<textarea
								id="task-set-instruction"
								class="form-check-input"
								v-model="selectedTaskSet.instruction"
							></textarea>
						</div>
					</div>
				</div>
			</div>

			<div class="tasksets-form-controls">
				<button class="btn btn-success" @click.prevent="submitForm()">{{signs.submit}}</button>
				<button class="btn btn-default" @click.prevent="closeForm()">{{signs.cancel}}</button>
			</div>
		</div>
	</div>
</template>

<script>
	/**
	 * Task sets list controller (/config#tab=assessment)
	 */

	/* eslint-disable no-underscore-dangle,no-alert */

	import $ from 'jquery';
	import Request from '../request';

	import CodeMirror from '../../../node_modules/codemirror/lib/codemirror';
	import '../../../node_modules/codemirror/mode/xml/xml';
	import '../../../node_modules/codemirror/addon/display/autorefresh';

	import CustomCheckbox from './CustomCheckbox.vue';


	// How many datasets' names will be displayed in 'Datasets' cell
	// (other will be hidden)
	const SHOWN_DATASETS_COUNT = 2;


	export default {
		props: ['taskSets', 'dataSets', 'defaultInstruction'],

		components: {
			'custom-checkbox': CustomCheckbox,
		},

		data() {
			return {
				signs: window.signs,

				// Which task we edit or add
				selectedTaskSet: null,
			};
		},

		computed: {
			/**
			 * Get current state of 'Toggle all datasets' checkbox
			 * If all datasets are selected, this checkbox is checked
			 */
			toggleAllDataSetsCheckboxState() {
				return this.selectedTaskSet.dataSets
					.filter(dataSet => dataSet.canBeChanged)
					.every(dataSet => dataSet.isInTaskSet);
			},

			/**
			 * Get current text of 'Toggle all datasets' checkbox
			 * If all datasets are selected, the text of this checkbox is 'Uncheck all'.
			 * If some dataset is not selected, the text is 'Check all'
			 */
			toggleAllDataSetsCheckboxText() {
				return this.toggleAllDataSetsCheckboxState
					? this.signs.uncheck_all
					: this.signs.check_all;
			}
		},

		methods: {
			/**
			 * Trigger new taskset adding
			 */
			addTaskSet() {
				const blankTaskSet = {
					assessmentLimit: 0,
					randomSelection: true,
					description: '',

					// Inject default instruction into the new task
					instruction: this.defaultInstruction,
					activeDataSets: [],
				};

				// Inject all active datasets into the new task
				blankTaskSet.dataSets = this.dataSets
					.map((dataSet) => {
						const dataSetClone = $.extend(true, {}, dataSet);

						// Dataset is active in current task set
						dataSetClone.isInTaskSet = true;

						// All data sets can be activated/deactivated
						dataSetClone.canBeChanged = true;

						return dataSetClone;
					});

				this.selectedTaskSet = blankTaskSet;
			},


			/**
			 * Trigger some taskset editing
			 */
			editTaskSet(taskSet) {
				// Create a copy of taskset to avoid changing data of initial taskset's data
				// if editing was cancelled
				this.selectedTaskSet = $.extend({}, taskSet);
			},


			closeForm() {
				this.selectedTaskSet = null;
			},


			/**
			 * Save or edit taskset
			 */
			submitForm() {
				const taskSet = this.selectedTaskSet;
				const taskSetId = taskSet._id;

				const url = taskSetId
					? '/api/config/edit-taskset'
					: '/api/config/add-taskset';

				Request.post(url, {
					data: {taskSet}
				})
					.then(() => window.location.reload())
					.catch(error => alert(error));
			},


			/**
			 * Converts boolean variable to 'Yes/No' string
			 */
			booleanToReadableString(boolean) {
				return boolean ? this.signs.yes : this.signs.no;
			},


			/**
			 * Check/uncheck all datasets. Calls when user changing
			 * state of 'Toggle all datasets' checkbox
			 */
			setDataSetsStatus({state}) {
				if (!this.selectedTaskSet) {
					return;
				}

				this.selectedTaskSet.dataSets
				// Some datasets couldn't be changed, because users have already
				// marked some images from them
					.filter(dataSet => dataSet.canBeChanged)
					.forEach((dataSet) => {
						dataSet.isInTaskSet = state;
					});
			},


			/**
			 * Renders names of first `SHOWN_DATASETS_COUNT` datasets,
			 * calculates a quantity of the rest datasets
			 */
			renderActiveDataSetsCellContent(activeDataSets) {
				if (!activeDataSets.length) {
					return '-';
				}

				const shownDataSets = activeDataSets.slice(0, SHOWN_DATASETS_COUNT);

				let cellContent = shownDataSets.join(', ');

				const notShownDataSetsLength = activeDataSets.length - shownDataSets.length;

				if (notShownDataSetsLength) {
					cellContent += ` ${this.signs.and_more_datasets.replace('%s', notShownDataSetsLength)}`;
				}

				return cellContent;
			},


			/**
			 * Activate certain taskset
			 */
			activateTaskSet(taskSet) {
				Request.post('/api/config/activate', {
					data: {taskSet},
				})
					.then(() => window.location.reload())
					.catch(() => alert(this.signs.taskset_activation_error));
			},


			/**
			 * Renders datasets' name for the title attr of 'Datasets' cell
			 */
			renderDataSetsList(dataSetsList) {
				return dataSetsList.length > SHOWN_DATASETS_COUNT + 1
					? dataSetsList.join(', ')
					: '';
			},
		},

		watch: {
			/**
			 * When user triggers adding or editing of some taskset,
			 * we should initialize CodeMirror editor in the next tick
			 * (after displaying of form)
			 */
			selectedTaskSet: {
				handler() {
					const vm = this;

					vm.$nextTick(() => {
						const instructionsTextArea = vm.$el.querySelector('#task-set-instruction');

						if (!instructionsTextArea) {
							return;
						}

						const cmInstance = CodeMirror.fromTextArea(instructionsTextArea, {
							lineNumbers: true,
							mode: 'xml',
							theme: 'mdn-like',
							lineWrapping: true,
							autoRefresh: true,
						});

						// Dynamically update instruction property
						// when editor's content has changed
						cmInstance.on('change', () => {
							vm.selectedTaskSet.instruction = cmInstance.getValue();
						});
					});
				}
			}
		}
	};
</script>
