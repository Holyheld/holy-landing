import debounce from '../../scripts/utils/debounce';

const STICKY_FREE_SPACE = 88 + 16 + 16;

export default class Sticky {
	constructor(element) {
		this.element = element;

		this.debounceCheckSticky = debounce(this.checkSticky.bind(this), 500);

		this.checkSticky();
		this.setListeners();
	}

	setListeners() {
		window.addEventListener('resize', () => {
			this.debounceCheckSticky();
		});
	}

	checkSticky() {
		if (this.element.offsetHeight + STICKY_FREE_SPACE > window.innerHeight) {
			if (!this.element.classList.contains('disabled')) {
				this.element.classList.add('disabled');
			}
		} else if (this.element.classList.contains('disabled')) {
			this.element.classList.remove('disabled');
		}
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const items = document.querySelectorAll('.js-sticky');
	items.forEach(item => new Sticky(item));
});
