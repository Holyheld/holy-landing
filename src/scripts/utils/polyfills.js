if (window.NodeList && !NodeList.prototype.forEach) {
	NodeList.prototype.forEach = Array.prototype.forEach;
}

(ElementProto => {
	if (typeof ElementProto.matches !== 'function') {
		// eslint-disable-next-line no-param-reassign
		ElementProto.matches =
			ElementProto.msMatchesSelector ||
			ElementProto.mozMatchesSelector ||
			ElementProto.webkitMatchesSelector ||
			function matches(selector) {
				const element = this;
				const elements = (
					element.document || element.ownerDocument
				).querySelectorAll(selector);
				let index = 0;

				while (elements[index] && elements[index] !== element) {
					// eslint-disable-next-line no-plusplus
					++index;
				}

				return Boolean(elements[index]);
			};
	}

	if (typeof ElementProto.closest !== 'function') {
		// eslint-disable-next-line no-param-reassign
		ElementProto.closest = function closest(selector) {
			let element = this;

			while (element && element.nodeType === 1) {
				if (element.matches(selector)) {
					return element;
				}

				element = element.parentNode;
			}

			return null;
		};
	}
})(window.Element.prototype);
