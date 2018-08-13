/**
 * Component of settings fieldset (/config)
 */
window.ConfigFieldSet = {
	template: `
		<div>
		  <h3>{{window.signs[fieldSet.name]}}</h3>
		
		  <div class="form-group" v-for="(property, pIndex) in fieldSet.properties">
			<label :for="property.id">
			  {{window.signs[property.name]}}
			</label>
		
			<input
			  min="0"
			  type="number"
			  class="form-control"
			  v-model="property.value"
			  v-if="property.element.type === 'number'"
			  :id="property.id"
			>
		
			<input
			  type="text"
			  class="form-control"
			  v-model="property.value"
			  v-if="property.element.type === 'text'"
			  :id="property.id"
			>
		
			<select
			  class="form-control"
			  v-model="property.value"
			  v-if="property.element.type === 'select'"
			  :id="property.id"
			>
			  <option v-for="(text, value) in property.element.options" :value="value">
				{{window.signs[text]}}
			  </option>
			</select>
		
		
			<div v-if="property.id === 'allowedDatasets'" class="datasets-container">
			  <div class="form-check-label dataset-item" v-for="(dataset, index) in availableDataSets">
				<input
				  :id="getDataSetIndex('dataset', index)"
				  class="form-check-input"
				  type="checkbox"
				  v-model="dataset.isActive"
				>
				
				<label :for="getDataSetIndex('dataset', index)">{{dataset._id}}</label>
			  </div>
		
			  <div class="actions-container">
				<button type="button" @click="setDataSetsStatus(true)" class="btn btn-success">
				  {{window.signs.check_all}}
				</button>
		
				<button type="button" @click="setDataSetsStatus(false)" class="btn btn-success">
				  {{window.signs.uncheck_all}}
				</button>
			  </div>
			</div>
			
			
			<div v-if="property.id === 'datasets'" class="datasets-container">
              <div class="form-check-label dataset-item" v-for="(dataset, index) in availableDataSets">
                <input
                  :id="getDataSetIndex('dataset2', index)"
                  class="form-check-input"
                  type="checkbox"
                  v-model="dataset.markedForExport"
                >

                <label :for="getDataSetIndex('dataset2', index)">{{dataset.dataset}}</label>
              </div>

              <div class="actions-container">
                <button type="button" @click="setDataSetsExportStatus(true)" class="btn btn-success">
                  {{window.signs.check_all}}
                </button>

                <button type="button" @click="setDataSetsExportStatus(false)" class="btn btn-success">
                  {{window.signs.uncheck_all}}
                </button>
              </div>
            </div>
			
		  </div>
		</div>
	`,

	props: ['fieldSet', 'availableDataSets'],

	methods: {
		getDataSetIndex(prefix, index) {
			return `${prefix}-${index}`;
		},

		/**
		 * Set 'active' status of all fieldsets (true/false)
		 * @param state {Boolean}
		 */
		setDataSetsStatus(state) {
			this.$parent.$emit('datasetsActiveState', state);
		},

		/**
		 * Set 'marked for export' status of all fieldsets (true/false)
		 * @param state {Boolean}
		 */
		setDataSetsExportStatus(state) {
			this.$parent.$emit('datasetsExportState', state);
		},
	},
};
