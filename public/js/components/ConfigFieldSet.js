/**
 * Component of settings fieldset (/config)
 */
window.ConfigFieldSet = {
	template: `
		<div>
		  <h3>{{window.signs[fieldSet.name]}}</h3>
		
		  <div 
		  	class="form-group form-check-label" 
		  	:class="{'checkbox-block': property.element.type === 'checkbox'}" 
		  	v-for="(property, pIndex) in fieldSet.properties"
		  >
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
			
			<input
			  type="checkbox"
			  class="form-check-input"
			  v-model="property.value"
			  v-if="property.element.type === 'checkbox'"
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
		  </div>
		</div>
	`,

	props: ['fieldSet'],

	methods: {
		getDataSetIndex(prefix, index) {
			return `${prefix}-${index}`;
		},
	},
};
