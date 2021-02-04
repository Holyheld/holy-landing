/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */

const getDirection = (el, axis) => {
	if (el === window) return axis === 'x' ? 'pageXOffset' : 'pageYOffset';
	return axis === 'x' ? 'scrollLeft' : 'scrollTop';
};

const easeInOutQuad = (t, b, c, d) => {
	t /= d / 2;
	if (t < 1) return (c / 2) * t * t + b;
	t--;
	return (-c / 2) * (t * (t - 2) - 1) + b;
};

const scrollTo = (el, to, duration, axis) => {
	const element = el;
	const direction = getDirection(el, axis);
	const start = element[direction];
	const change = to - start;
	const startDate = +new Date();

	const setScroll = value => {
		if (direction === 'pageYOffset') {
			element.scrollTo(0, value);
		} else if (direction === 'pageXOffset') {
			element.scrollTo(value, 0);
		} else {
			element[direction] = value;
		}
	};

	const animateScroll = () => {
		const currentDate = +new Date();
		const currentTime = currentDate - startDate;

		setScroll(
			parseInt(easeInOutQuad(currentTime, start, change, duration), 10)
		);

		if (currentTime < duration) {
			requestAnimationFrame(animateScroll);
		} else {
			setScroll(to);
		}
	};

	animateScroll();
};

export default scrollTo;
