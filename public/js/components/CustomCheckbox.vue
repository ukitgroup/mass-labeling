<template>
  <div class="form-check-label dataset-item custom-checkbox" :class="{
    'custom-checkbox--disabled': disabled,
    'custom-checkbox--unchecked': !state,
  }">
    <input
      :id="id"
      class="custom-checkbox_input"
      type="checkbox"
      v-model="state"
      :disabled="disabled"
      @change="triggerChange()"
    >

    <span class="custom-checkbox_span" @click="toggleState()">
      <i v-if="state" class="fa fa-check"></i>
    </span>

    <label class="custom-checkbox_label" :title="title" :for="id">{{label}}</label>
  </div>
</template>

<script>
	/**
	 * Custom checkbox component
	 *
	 * You can pass these props:
	 * - data - {boolean} - boolean data for checkbox
	 * - disabled - {boolean} - is checkbox disabled or not
	 * - label - {string} - text of label of checkbox element
	 * - id - {string} - id of checkbox element
	 * - title - {string} - text of title attr of label of checkbox
	 *
	 * When checkbox is changing its state, component triggers an 'onchange' event,
	 * that you can catch in parent component and get actual state of checkbox.
	 */
    export default {
      name: "CustomCheckbox",

      props: ['data', 'disabled', 'label', 'id', 'title'],

      data() {
        return {
          state: this.data,
        };
      },

      methods: {
        toggleState() {
          if (this.disabled) {
            return;
          }

          this.state = !this.state;
          this.triggerChange();
        },

        triggerChange() {
          this.$emit('onchange', { state: this.state });
        },
      },

      watch: {
        data: {
          immediate: true,

          handler(data) {
            this.state = data;
          },
        },
      },
    }
</script>

<style scoped>
  .custom-checkbox {
    display: flex;
  }

  .custom-checkbox_span {
    background: #6B61FF;
    width: 18px;
    height: 18px;
    border: 2px solid #6B61FF;
    border-radius: 3px;
    color: #fff;
    display: flex;
    align-items: center;
    margin-right: 12px;
    cursor: pointer;
  }

  .custom-checkbox_input {
    display: none;
  }

  .custom-checkbox_label {
    cursor: pointer;
  }

  .custom-checkbox.custom-checkbox--disabled .custom-checkbox_span {
    background: #6c757d;
    border-color: #6c757d;
    opacity: 0.35;
    cursor: default;
  }

  .custom-checkbox.custom-checkbox--disabled .custom-checkbox_label {
    cursor: default;
  }

  .custom-checkbox.custom-checkbox--unchecked .custom-checkbox_span {
    background: transparent;
  }
</style>
