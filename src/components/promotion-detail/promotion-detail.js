export default class PromotionDetail {
	constructor(element) {
		this.element = element;
		this.navWrapper = this.element.querySelector(
			'.js-promotion-detail-nav-wrapper'
		);
		this.navButton = this.element.querySelector(
			'.js-promotion-detail-nav-button'
		);

		this.setListeners();
	}

	setListeners() {
		this.navButton.addEventListener('click', () => {
			this.navWrapper.classList.toggle('is-opened');
		});

		window.addEventListener('click', this.onBodyClick.bind(this));
		window.addEventListener('touchend', this.onBodyClick.bind(this));
	}

	onBodyClick(e) {
		if (
			(this.navWrapper.classList.contains('is-opened') &&
				!this.navWrapper.contains(e.target)) ||
			this.navWrapper === e.target
		) {
			this.navWrapper.classList.remove('is-opened');
		}
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const item = document.querySelector('.js-promotion-detail');
	if (item) new PromotionDetail(item);
});
