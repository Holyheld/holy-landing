import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import Vh from '../vh/vh';

const FOCUSABLE_ELEMENTS = [
	'a[href]',
	'button:not([disabled]):not([aria-hidden])'
];

const KEYBOARD_CODES = {
	TAB: 9,
	ESC: 27
};

export default class Header {
	constructor(element) {
		this.element = element;
		this.openButton = this.element.querySelector('.js-header-open-button');
		this.closeButton = this.element.querySelector('.js-header-close-button');
		this.window = this.element.querySelector('.js-header-window');
		this.content = this.element.querySelector('.js-header-content');

		this.canChange = true;

		this.setListeners();
		this.checkScroll();
		this.checkContentScroll();
	}

	setListeners() {
		this.openButton.addEventListener('click', () => {
			this.openMenu();
		});

		this.closeButton.addEventListener('click', () => {
			this.closeMenu();
		});

		document.addEventListener('keydown', e => {
			this.onKeydown(e);
		});

		window.addEventListener('scroll', () => {
			this.checkScroll();
		});

		this.content.addEventListener('scroll', () => {
			this.checkContentScroll();
		});
	}

	openMenu() {
		if (!this.canChange) return;
		this.canChange = false;

		Vh.update();

		disableBodyScroll(this.content);

		this.window.classList.add('is-visible');
		this.content.scrollTop = 0;

		this.openButton.disabled = true;
		this.closeButton.disabled = false;

		setTimeout(() => {
			this.element.classList.add('is-opened');

			setTimeout(() => {
				this.closeButton.focus();
				this.canChange = true;
			}, 200);
		}, 33);
	}

	closeMenu() {
		if (!this.canChange) return;
		this.canChange = false;

		enableBodyScroll(this.content);

		this.element.classList.remove('is-opened');

		this.openButton.disabled = false;
		this.closeButton.disabled = true;

		setTimeout(() => {
			this.openButton.focus();
			this.window.classList.remove('is-visible');
			this.canChange = true;
		}, 200);
	}

	onKeydown(e) {
		if (
			e.keyCode === KEYBOARD_CODES.TAB &&
			this.element.classList.contains('is-opened')
		) {
			this.retainFocus(e);
		}

		if (
			e.keyCode === KEYBOARD_CODES.ESC &&
			this.element.classList.contains('is-opened')
		) {
			e.preventDefault();
			this.closeMenu();
		}
	}

	checkScroll() {
		if (window.scrollY > 0 && !this.element.classList.contains('is-scrolled')) {
			this.element.classList.add('is-scrolled');
		}

		if (window.scrollY <= 0 && this.element.classList.contains('is-scrolled')) {
			this.element.classList.remove('is-scrolled');
		}
	}

	checkContentScroll() {
		if (
			this.content.scrollTop > 0 &&
			!this.element.classList.contains('is-content-scrolled')
		) {
			this.element.classList.add('is-content-scrolled');
		}

		if (
			this.content.scrollTop <= 0 &&
			this.element.classList.contains('is-content-scrolled')
		) {
			this.element.classList.remove('is-content-scrolled');
		}
	}

	getFocusableNodes() {
		const nodes = this.window.querySelectorAll(FOCUSABLE_ELEMENTS.join(','));
		return Array(...nodes);
	}

	retainFocus(e) {
		let focusableNodes = this.getFocusableNodes();

		if (focusableNodes.length === 0) return;

		focusableNodes = focusableNodes.filter(node => {
			return node.offsetParent !== null;
		});

		const focusedItemIndex = focusableNodes.indexOf(document.activeElement);

		if (e.shiftKey && focusedItemIndex === 0) {
			focusableNodes[focusableNodes.length - 1].focus();
			e.preventDefault();
		}

		if (
			!e.shiftKey &&
			focusableNodes.length > 0 &&
			focusedItemIndex === focusableNodes.length - 1
		) {
			focusableNodes[0].focus();
			e.preventDefault();
		}
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const item = document.querySelector('.js-header');
	if (item) new Header(item);
});
