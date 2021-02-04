const MARGIN_SIZE = 8;
const ITEM_HEIGHT = 78;
const INTERVAL_TIME = 2000;

export default class Notifications {
	constructor(element) {
		this.element = element;
		this.list = this.element.querySelector('.js-notifications-list');
		this.items = this.element.querySelectorAll('.js-notifications-item');

		this.activeIndex = null;
		this.lastItemIndex = null;

		this.topCounter = 0;
		this.bottomCounter = 0;
		this.translateY = 0;

		this.init();
	}

	init() {
		this.takePosition();
		this.start();
	}

	takePosition() {
		this.activeIndex = Math.floor(this.items.length / 2);
		this.lastItemIndex = this.items.length - 1;

		for (let index = this.activeIndex - 1; index >= 0; index--) {
			this.topCounter++;
			const item = this.items[index];
			const top = (ITEM_HEIGHT + MARGIN_SIZE) * this.topCounter;
			item.style.top = `${-top}px`;
		}

		for (let index = this.activeIndex + 1; index < this.items.length; index++) {
			this.bottomCounter++;
			const item = this.items[index];
			const bottom = (ITEM_HEIGHT + MARGIN_SIZE) * this.bottomCounter;
			item.style.top = `${bottom}px`;
		}
	}

	start() {
		setInterval(() => {
			this.changeLastItemPosition();
			this.changeActiveItemPosition();
			this.changeListPosition();
		}, INTERVAL_TIME);
	}

	changeLastItemPosition() {
		this.topCounter++;
		const item = this.items[this.lastItemIndex];
		const top = (ITEM_HEIGHT + MARGIN_SIZE) * this.topCounter;
		item.style.top = `${-top}px`;

		if (this.lastItemIndex > 0) {
			this.lastItemIndex--;
		} else {
			this.lastItemIndex = this.items.length - 1;
		}
	}

	changeActiveItemPosition() {
		if (this.activeIndex > 0) {
			this.activeIndex--;
		} else {
			this.activeIndex = this.items.length - 1;
		}
	}

	changeListPosition() {
		this.translateY += ITEM_HEIGHT + MARGIN_SIZE;
		this.list.style.transform = `translate3d(0, ${this.translateY}px, 0)`;
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const item = document.querySelector('.js-notifications');
	if (item) new Notifications(item);
});
