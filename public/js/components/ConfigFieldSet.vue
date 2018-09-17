<template>
	<div>
		<h3>{{signs[fieldSet.name]}}</h3>

		<div
			class="form-group form-check-label"
			:class="{'checkbox-block': property.element.type === 'checkbox'}"
			v-for="property in fieldSet.properties"
		>
			<label :for="property.id">
				{{signs[property.name]}}
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
				v-if="property.element.type === 'languagesSelect'"
				:id="property.id"
			>
				<option v-for="langValue in definedLanguages" :value="langValue">
					{{languagesNames[langValue]}}
				</option>
			</select>

			<div v-if="property.element.type === 'languagesList'">
				<div class="input-group lang-name-block" v-for="langCode in definedLanguages">
					<span class="input-group-addon">{{langCode}}</span>
					<input v-model="languagesNames[langCode]" type="text" class="form-control">
				</div>
			</div>

			<select
				class="form-control"
				v-model="property.value"
				v-if="property.element.type === 'select'"
				:id="property.id"
			>
				<option v-for="(text, value) in property.element.options" :value="value">
					{{signs[text]}}
				</option>
			</select>
		</div>
	</div>
</template>


<script>
	/**
	 * Component that renders certain section of properties from config.json
	 */

	const { signs, definedLanguages } = window;

	export default {
		computed: {
			languagesNames() {
				let langNamesObject = {};

				if (this.fieldSet.id === 'languageSettings') {
					const langNamesProperty = this.fieldSet.properties
						.filter(property => property.id === 'languagesNames')[0];

					if (langNamesProperty) {
						langNamesObject = langNamesProperty.value;
					}
				}

				// If user added new language, language name = language code
				this.definedLanguages.forEach((langCode) => {
					if (! langNamesObject[langCode]) {
						langNamesObject[langCode] = langCode;
					}
				});

				// If user deleted some language, its value is still in config
				// We should remove it
				Object.keys(langNamesObject).forEach((langCode) => {
					if (this.definedLanguages.indexOf(langCode) < 0) {
						delete langNamesObject[langCode];
					}
				});

				return langNamesObject;
			},
		},

		data() {
			return {
				signs,
				definedLanguages,
			};
		},

		props: ['fieldSet'],
	};
</script>
