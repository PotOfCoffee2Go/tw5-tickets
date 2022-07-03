// See https://carlanderson.xyz/how-to-animate-on-height-auto/
function expandElement(elem, collapseClass) {
	// debugger;
	elem.style.height = '';
	elem.style.transition = 'none';

	const startHeight = window.getComputedStyle(elem).height;

	// Remove the collapse class, and force a layout calculation to get the final height
	elem.classList.toggle(collapseClass);
	const height = window.getComputedStyle(elem).height;

	// Set the start height to begin the transition
	elem.style.height = startHeight;

	// wait until the next frame so that everything has time to update before starting the transition
	requestAnimationFrame(() => {
		elem.style.transition = '';

		requestAnimationFrame(() => {
				elem.style.height = height
		})
	})

	// Clear the saved height values after the transition
	elem.addEventListener('transitionend', () => {
		elem.style.height = '';
		elem.removeEventListener('transitionend', arguments.callee);
		$tw.poc2go.resizeIframe('twdir-frame');
	});
}
