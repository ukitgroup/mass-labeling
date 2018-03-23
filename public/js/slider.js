'use strict';


const app = new window.Vue({
	el: '#app',
	data: {
		items: window.items,
		index: 0,
	},
	computed: {
		item() {
			const item = this.items[this.index];
			if (! item) {
				return {};
			}

			return item;
		},


		screenshot() {
			return `/api/site/${this.item.siteId}/screenshot`;
		},


		modelScore() {
			return this.item.modelScore || 0;
		},

		assessorsScore() {
			return this.item.assessorsScore || [];
		},

		meanAssessorsScore() {
			if (! this.assessorsScore.length) {
				return 0;
			}

			return this.assessorsScore.reduce((sum, answer) => sum + answer, 0) / this.assessorsScore.length;
		},

		error() {
			return Math.abs(this.modelScore - this.meanAssessorsScore);
		},


		modelScoreStr() {
			return this.modelScore.toFixed(4);
		},

		meanAssessorsScoreStr() {
			return this.meanAssessorsScore.toFixed(4);
		},

		errorStr() {
			return this.error.toFixed(4);
		},

		assessorsScoreStr() {
			return this.assessorsScore.join(', ');
		},
	},
	methods: {
		prev() {
			this.index = ((this.index - 1) + this.items.length) % this.items.length;
		},

		next() {
			this.index = (this.index + 1) % this.items.length;
		},
	},
});

$(window).keydown((event) => {
	if (event.keyCode === 37) {
		event.preventDefault();
		app.prev();
	}

	if (event.keyCode === 39) {
		event.preventDefault();
		app.next();
	}
});
