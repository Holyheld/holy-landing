const ONE_MESSAGE_DELAY = 1000;

export default class Chat {
	constructor(element) {
		this.element = element;
		this.items = this.element.querySelectorAll('.js-chat-item');

		this.counter = 0;
		this.interval = null;

		this.onScroll = this.onScroll.bind(this);

		this.setListeners();
	}

	setListeners() {
		window.addEventListener('scroll', this.onScroll);
	}

	onScroll() {
		const { bottom } = this.element.getBoundingClientRect();
		if (bottom < window.innerHeight) {
			window.removeEventListener('scroll', this.onScroll);
			this.start();
		}
	}

	start() {
		this.step();

		this.interval = setInterval(() => {
			this.step();
		}, ONE_MESSAGE_DELAY);
	}

	step() {
		const currentItem = this.items[this.counter];

		if (currentItem) {
			currentItem.classList.add('is-visible');
			this.counter++;
		} else {
			clearInterval(this.interval);
		}
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const item = document.querySelector('.js-chat');
	if (item) new Chat(item);
});
