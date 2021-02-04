export default class Vh {
	static init() {
		Vh.update();
		window.addEventListener('resize', Vh.update);
	}

	static update() {
		const vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	}
}

document.addEventListener('DOMContentLoaded', () => {
	Vh.init();
});
