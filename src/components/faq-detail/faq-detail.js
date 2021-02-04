import scrollTo from '../../scripts/utils/scrollTo';

const TOP_POSITION = 88 + 16;

export default class FaqDetail {
	constructor(element) {
		this.element = element;
		this.buttons = this.element.querySelectorAll('.js-faq-detail-button');
		this.titles = this.element.querySelectorAll('.js-faq-detail-content h2');

		this.setListeners();
		this.checkActiveElement();
	}

	setListeners() {
		window.addEventListener('scroll', () => {
			this.checkActiveElement();
		});

		this.buttons.forEach((button, index) => {
			button.addEventListener('click', () => {
				this.scrollToTitle(index);
			});
		});
	}

	scrollToTitle(index) {
		scrollTo(window, this.titles[index].offsetTop - TOP_POSITION, 500, 'y');
	}

	checkActiveElement() {
		let button = null;

		this.buttons.forEach((item, index) => {
			item.classList.remove('is-active');

			const title = this.titles[index];
			const { top, height } = title.getBoundingClientRect();

			if (!button && top >= TOP_POSITION) {
				if (top + height < window.innerHeight || index === 0) {
					button = item;
				} else {
					button = this.buttons[index - 1];
				}
			}
		});

		if (!button) {
			button = this.buttons[this.buttons.length - 1];
		}

		button.classList.add('is-active');
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const item = document.querySelector('.js-faq-detail');
	if (item) new FaqDetail(item);
});
