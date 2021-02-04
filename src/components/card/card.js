import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import Vh from '../vh/vh';

import debounce from '../../scripts/utils/debounce';

const MOBILE = 767;

const KEYBOARD_CODES = {
	ESC: 27
};

export default class Card {
	constructor(element) {
		this.element = element;
		this.openButton = this.element.querySelector('.js-card-open-button');
		this.closeButton = this.element.querySelector('.js-card-close-button');
		this.shield = this.element.querySelector('.js-card-shield');
		this.front = this.element.querySelector('.js-card-front');
		this.back = this.element.querySelector('.js-card-back');

		this.isOpened = false;
		this.isLocked = false;
		this.openTimeout = null;
		this.closeTimeout = null;

		this.debounceCheckWindow = debounce(this.checkWindow.bind(this), 500);

		this.init();
		this.setListeners();
	}

	init() {
		this.closeButton.disabled = true;
	}

	setListeners() {
		this.openButton.addEventListener('click', () => {
			this.open();
		});

		this.closeButton.addEventListener('click', () => {
			this.close();
		});

		this.front.addEventListener('click', () => {
			if (window.innerWidth > MOBILE) {
				this.open();
			}
		});

		this.shield.addEventListener('click', () => {
			if (window.innerWidth > MOBILE) {
				this.close();
			}
		});

		document.addEventListener('keydown', e => {
			this.onKeydown(e);
		});
	}

	open() {
		if (!this.isOpened && !document.querySelector('.js-card.is-opened')) {
			window.addEventListener('resize', this.debounceCheckWindow);

			this.openButton.disabled = true;
			this.closeButton.disabled = false;

			if (this.closeTimeout) clearInterval(this.closeTimeout);
			if (this.openTimeout) clearInterval(this.openTimeout);

			this.element.classList.add('is-visible');

			if (window.innerWidth <= MOBILE) {
				disableBodyScroll(this.back);
				this.isLocked = true;
			}

			this.element.style.zIndex = 3;
			this.isOpened = true;

			this.openTimeout = setTimeout(() => {
				this.back.scrollTop = 0;
				this.element.classList.add('is-opened');
				Vh.update();
				this.openTimeout = null;
			}, 33);
		}
	}

	close() {
		if (this.isOpened) {
			window.removeEventListener('resize', this.debounceCheckWindow);

			this.openButton.disabled = false;
			this.closeButton.disabled = true;

			if (this.closeTimeout) clearInterval(this.closeTimeout);
			if (this.openTimeout) clearInterval(this.openTimeout);

			this.element.classList.remove('is-opened');

			if (this.isLocked) {
				enableBodyScroll(this.back);
				this.isLocked = false;
			}

			this.isOpened = false;

			this.closeTimeout = setTimeout(
				() => {
					this.element.classList.remove('is-visible');
					this.element.style.zIndex = 0;
					this.closeTimeout = null;
				},
				window.innerWidth > MOBILE ? 1000 : 200
			);
		}
	}

	onKeydown(e) {
		if (
			e.keyCode === KEYBOARD_CODES.ESC &&
			this.element.classList.contains('is-opened')
		) {
			e.preventDefault();
			this.close();
		}
	}

	checkWindow() {
		if (window.innerWidth > MOBILE && this.isLocked) {
			enableBodyScroll(this.back);
			this.isLocked = false;
		} else if (window.innerWidth <= MOBILE && !this.isLocked) {
			disableBodyScroll(this.back);
			this.isLocked = true;
		}
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const items = document.querySelectorAll('.js-card');
	items.forEach(item => new Card(item));
});
