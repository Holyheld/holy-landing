const ITERATION_DURATION = 1000;

const STEPS_QT = 4;
const STEPS = [
	[40, 65, 80, 36],
	[70, 90, 60, 62],
	[100, 55, 30, 76],
	[80, 70, 90, 100],
	[50, 85, 40, 67],
	[30, 50, 70, 85]
];

export default class Bars {
	constructor(element) {
		this.element = element;
		this.bars = this.element.querySelectorAll('.js-bar');

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

			setTimeout(() => {
				this.start();
			}, 500);
		}
	}

	start() {
		this.step();

		this.interval = setInterval(() => {
			this.step();
			if (this.counter > STEPS_QT) clearInterval(this.interval);
		}, ITERATION_DURATION);
	}

	step() {
		this.changeBars();
		this.counter++;
	}

	changeBars() {
		this.bars.forEach((bar, index) => {
			bar.style.height = `${STEPS[index][this.counter]}%`;
		});
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const item = document.querySelector('.js-bars');
	if (item) new Bars(item);
});
