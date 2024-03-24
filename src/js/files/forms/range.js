// Подключение из node_modules
import * as noUiSlider from 'nouislider';

// Подключение стилей из scss/base/forms/range.scss 
// в файле scss/forms/forms.scss

// Подключение cтилей из node_modules
// import 'nouislider/dist/nouislider.css';

export function rangeInit() {

	const rangeItems = document.querySelectorAll('[data-range]');

	if (rangeItems.length) {
		rangeItems.forEach(rangeItem => {
			const fromValue = rangeItem.querySelector('[data-range-from]');
			const toValue = rangeItem.querySelector('[data-range-to]');
			const stepsSlider = rangeItem.querySelector('[data-range-item]');
			let inputs = [fromValue, toValue];
			noUiSlider.create(stepsSlider, {
				start: [Number(fromValue.value), Number(toValue.value)], // [0,200000]
				connect: true,
				// tooltips: [true, true],
				range: {
					'min': [Number(fromValue.dataset.rangeFrom)],
					'max': [Number(toValue.dataset.rangeTo)]
				}
			});

			stepsSlider.noUiSlider.on('update', function (values, handle) {
				inputs[handle].value = values[handle];
				// });

				// item.noUiSlider.on('update', function (values, handle) {
				// 	fromValue.value = values[handle];
				// 	toValue.value = values[handle];

			});
			// Listen to keydown events on the input field.
			inputs.forEach(function (input, handle) {

				input.addEventListener('change', function () {
					stepsSlider.noUiSlider.setHandle(handle, this.value);
				});

				input.addEventListener('keydown', function (e) {

					let values = stepsSlider.noUiSlider.get();
					let value = Number(values[handle]);
					let steps = stepsSlider.noUiSlider.steps();
					let step = steps[handle];
					let position;

					switch (e.which) {

						case 13:
							stepsSlider.noUiSlider.setHandle(handle, this.value);
							break;

						case 38:
							position = step[1];
							if (position === false) {
								position = 1;
							}

							if (position !== null) {
								stepsSlider.noUiSlider.setHandle(handle, value + position);
							}

							break;

						case 40:

							position = step[0];

							if (position === false) {
								position = 1;
							}

							if (position !== null) {
								stepsSlider.noUiSlider.setHandle(handle, value - position);
							}

							break;
					}
				});
			});
		});
	}
}
rangeInit();


