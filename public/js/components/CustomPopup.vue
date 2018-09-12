<template>
	<div id="gen-slider-popup" class="popup" v-if="isShown">
		<div class="popup-overlay" @click="close()"></div>

		<div class="popup-content">
			<div class="popup-body">
				<slot name="body"></slot>
			</div>

			<div class="popup-footer">
				<slot name="footer"></slot>
				<button type="button" class="btn btn-secondary" @click="close()">
					{{signs.close}}
				</button>
			</div>
		</div>
	</div>
</template>

<script>
	/**
	 * Custom popup module
	 * You can pass content of body and footer via slots (name=body, name=footer respectively)
	 * You can control popup's visibility by changing prop 'shown' (when 'shown' === true, popup is visible)
	 * When the popup is closed, it calls an event 'popupClosed' which you can catch in parent component
	 */
	export default {
		name: "CustomPopup",

		props: ['shown'],

		data() {
			return {
				isShown: this.shown,
				signs: window.signs,
			}
		},

		methods: {
			close() {
				this.isShown = false;
				this.$emit('popupClosed');
			}
		},

		watch: {
			shown: {
				immediate: true,
				handler(newValue) {
					this.isShown = newValue;
				}
			}
		}
	}
</script>

<style scoped>
	.popup {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1001;
	}

	.popup-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #000;
		opacity: 0.5;
		cursor: pointer;
		z-index: 1001;
	}

	.popup-content {
		max-width: 600px;
		width: 100%;
		position: absolute;
		top: 50%;
		left: 50%;
		background: white;
		padding: 24px 36px;
		border-radius: 12px;
		transform: translate(-50%, -50%);
		z-index: 1001;
	}

	.popup-body, .popup-footer {
		padding: 6px 0;
	}

	.popup-footer button + button {
		margin-left: 12px;
	}
</style>
