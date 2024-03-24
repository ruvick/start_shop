/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper, { Navigation, Pagination, Autoplay, Thumbs } from 'swiper';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
// import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules 
import 'swiper/css';

// Добавление классов слайдерам
// swiper главному блоку, swiper-wrapper оболочке, swiper-slide для слайдов
function bildSliders() {
	//BildSlider
	let sliders = document.querySelectorAll('[class*="__swiper"]:not(.swiper-wrapper)');
	if (sliders) {
		sliders.forEach(slider => {
			slider.parentElement.classList.add('swiper');
			slider.classList.add('swiper-wrapper');
			for (const slide of slider.children) {
				slide.classList.add('swiper-slide');
			}
		});
	}
}
// Инициализация слайдеров
function initSliders() {
	// Добавление классов слайдера
	// при необходимости отключить
	bildSliders();

	// Перечень слайдеров   
	// if (document.querySelector('.image-card-product')) {
	const swiper = new Swiper('.image-card-product', {
		// Подключаем модули слайдера
		// для конкретного случая
		modules: [Pagination],
		// effect: 'fade',
		// autoplay: {
		// delay: 2000,
		// // 	disableOnInteraction: false,
		// // },
		observer: true,
		observeParents: true,
		// slidesPerView: 1,
		// slidesPerView: 'auto', // Чтобы слайдер сам не указывал ширину слайдам. Будем управлять в стилях.
		// spaceBetween: 0,
		// autoHeight: true,
		// speed: 800,
		// parallax: true,
		//touchRatio: 0,
		//simulateTouch: false,
		// loop: true,
		//preloadImages: false,
		// watchOverflow: true,
		//lazy: true,
		// Dotts
		// hashNavigation: true,
		pagination: {
			el: '.image-card-product__dotts',
			clickable: true,
		},
		// pagination: {
		// 	el: '.image-card-product__dotts',
		// 	clickable: true,
		// 	renderBullet: function (index, className) {
		// 		return '<span class="' + className + '">' + (index + 1) + '</span>';
		// 	},
		// },
		// Arrows
		// navigation: {
		// 	nextEl: '.slider-rooms .slider-arrow_next',
		// 	prevEl: '.slider-rooms .slider-arrow_prev',
		// },
		/*
		breakpoints: {
			320: {
				slidesPerView: 1,
				spaceBetween: 0,
				autoHeight: true,
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 20, swiper.disable()
			},
			1268: {
				slidesPerView: 4,
				spaceBetween: 30,
			},
			1268: {
				slidesPerView: 4,
				spaceBetween: 30,
			},
		},
		*/
		on: {
			resize: function enableOnlyMobile(swiper) {
				if (1024 >= window.innerWidth) {
					swiper.disable()
					swiper.el.classList.add('-non-slider')
				} else {
					swiper.enable()
					swiper.el.classList.remove('-non-slider')
				}
			},
		}
	});

	// $(document).ready(function () {
	// 	$('.swiper-pagination-bullet').hover(function () {
	// 		$(this).trigger("click");
	// 	});
	// });
	// const cardImageitem = document.querySelector('.card-product__image');
	// const itema = document.querySelector('.image-card-product__dotts');
	const bullets = document.querySelectorAll('.swiper-pagination-bullet');
	// const imgDots = document.querySelector('.img-dots');
	// let clone = itema.cloneNode(true);
	// cardImageitem.appendChild(clone);


	bullets.forEach(bullet => {
		// bullet.length = imgDots;
		// imgDots.textContent = '123';
		// console.log(imgDots.length);
		bullet.addEventListener("mousemove", function () {
			bullet.click();
			// document.querySelectorAll('[data-index]').forEach($div => {
			bullet.length;
			console.log(bullet.length);

			// })
		})
	});

	// let mySliderAllSlides = document.querySelector('.image-slider__total');
	// let mySliderCurrentSlide = document.querySelector('.image-slider__current');

	// mySliderAllSlides.innerHTML = myImageSlider.slides.length;

	// myImageSlider.on('slideChange', function () {
	// 	let currentSlide = ++myImageSlider.reallIndex;
	// 	mySliderCurrentSlide.innerHTML = currentSlide;
	// });
	// function sliderMouseSlideInit() {
	// 	document.addEventListener("mousemove", function (e) {
	// 		const targetElement = e.target;
	// 		if (targetElement.closest('[data-mousemove-swipe]')) {
	// 			const sliderElement = targetElement.closest('[data-mousemove-swipe]');
	// 			const sliderItem = swiper[getIndex(sliderElement)];
	// 			const sliderLength = sliderItem.slides.length;
	// 			if (sliderLength > 1) {
	// 				const sliderWidth = sliderItem.width;
	// 				const sliderPath = Math.round(sliderWidth / sliderLength);
	// 				const sliderMousePos = e.clientX - sliderElement.offsetLeft;
	// 				const sliderSlide = Math.floor(sliderMousePos / sliderPath);
	// 				sliderItem.slideTo(sliderSlide);
	// 			}
	// 		}
	// 	})

	// 	function getIndex(el) {
	// 		return Array.from(el.parentNode.children).indexOf(el);
	// 	}
	// }
	// if (document.querySelector('[data-mousemove-swipe]')) {
	// 	sliderMouseSlideInit();
	// }

	// }

	if (document.querySelector('.slider-cards-block')) {
		new Swiper('.slider-cards-block', {
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation],
			// effect: 'fade',
			// autoplay: {
			// 	delay: 1000,
			// 	disableOnInteraction: false,
			// },
			observer: true,
			observeParents: true,
			slidesPerView: 1.1,
			// slidesPerView: 'auto', // Чтобы слайдер сам не указывал ширину слайдам. Будем управлять в стилях.
			spaceBetween: 10,
			// autoHeight: true,
			speed: 800,
			// watchOverflow: true,
			// parallax: true,
			//touchRatio: 0,
			//simulateTouch: false,
			// loop: true,
			//preloadImages: false,
			//lazy: true,
			// Dotts
			// pagination: {
			// 	el: '.image-card-product__dotts',
			// 	clickable: true,
			// },
			// Arrows
			navigation: {
				nextEl: '.navigation-panel-product .arrow-sl-btn_prev',
				prevEl: '.navigation-panel-product .arrow-sl-btn_next',
			},
			breakpoints: {
				345: {
					slidesPerView: 1.5,
				},
				375: {
					slidesPerView: 2.15,
				},
				540: {
					slidesPerView: 2.6,
				},
				730: {
					slidesPerView: 3,
				},
				1023: {
					slidesPerView: 4,
				},
				// 1268: {
				// 	slidesPerView: 4,
				// 	spaceBetween: 30,
				// },
			},
			on: {

			}
		});
	}

	if (document.querySelector('.main-slider-big')) {
		new Swiper('.main-slider-big', {
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation, Pagination, Autoplay],
			// effect: 'fade',
			// autoplay: {
			delay: 1500,
			disableOnInteraction: false,
			// },

			observer: true,
			observeParents: true,
			slidesPerView: 1,
			// freeMode: true,
			// freeModeMomentum: false,
			slidesPerView: 'auto', // Чтобы слайдер сам не указывал ширину слайдам. Будем управлять в стилях.
			// spaceBetween: 0,
			// autoHeight: true,
			// speed: 1500,
			// parallax: true,
			//touchRatio: 0,
			//simulateTouch: false,
			loop: true,
			//preloadImages: false,
			//lazy: true,
			// Dotts
			pagination: {
				el: '.main-slider-big__dotts',
				clickable: true,
			},
			// Arrows
			navigation: {
				nextEl: '.main-slider-big .arrow-sl-btn_prev',
				prevEl: '.main-slider-big .arrow-sl-btn_next',
			},
			/*
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 0,
					autoHeight: true,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1268: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
			*/
			on: {

			}
		});
	}

	if (document.querySelector('.main-slider-small')) {
		new Swiper('.main-slider-small', {
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation, Pagination, Autoplay],
			// effect: 'fade',
			// autoplay: {
			delay: 1500,
			// 	disableOnInteraction: false,
			// },
			observer: true,
			observeParents: true,
			slidesPerView: 2,
			//	slidesPerView: 'auto', // Чтобы слайдер сам не указывал ширину слайдам. Будем управлять в стилях.
			spaceBetween: 10,
			// autoHeight: true,
			// speed: 1500,
			// parallax: true,
			//touchRatio: 0,
			//simulateTouch: false,
			loop: true,
			//preloadImages: false,
			//lazy: true,
			// Dotts
			pagination: {
				el: '.main-slider-small__dotts',
				clickable: true,
			},
			// Arrows
			navigation: {
				nextEl: '.main-slider-small .arrow-sl-btn_prev',
				prevEl: '.main-slider-small .arrow-sl-btn_next',
			},
			breakpoints: {
				// 320: {
				// 	slidesPerView: 1,
				// 	spaceBetween: 0,
				// 	autoHeight: true,
				// },
				// 768: {
				// 	slidesPerView: 2,
				// 	spaceBetween: 20,
				// },
				992: {
					slidesPerView: 1,
					// spaceBetween: 20,
				},
				// 1268: {
				// 	slidesPerView: 4,
				// 	spaceBetween: 30,
				// },
			},
			on: {

			}
		});
	}

	if (document.querySelector('.thumbs-images__slider')) {
		const thumbsSwiper = new Swiper('.thumbs-images__slider', {
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation, Pagination, Thumbs],
			// effect: 'fade',
			// autoplay: {
			delay: 1500,
			// 	disableOnInteraction: false,
			// },
			observer: true,
			observeParents: true,
			slidesPerView: 6,
			// slidesPerGroup: 1,
			// slidesPerView: 'auto',
			spaceBetween: 10,
			slideToClickedSlide: true,
			autoHeight: true,
			// speed: 1500,
			// parallax: true,
			//touchRatio: 0,
			//simulateTouch: false,
			direction: "vertical",
			// loop: true,
			//preloadImages: false,
			//lazy: true,
			// Dotts
			// pagination: {
			// 	el: '.main-slider-small__dotts',
			// 	clickable: true,
			// },
			// Arrows
			navigation: {
				nextEl: '.thumbs-images .arrow-sl-btn_prev',
				prevEl: '.thumbs-images .arrow-sl-btn_next',
			},
			breakpoints: {
				// 320: {
				// 	slidesPerView: 1,
				// 	spaceBetween: 0,
				// 	autoHeight: true,
				// },
				// 768: {
				// 	slidesPerView: 2,
				// 	spaceBetween: 20,
				// },
				// 992: {
				// 	slidesPerView: 1,
				// 	// spaceBetween: 20,
				// },
				// 1268: {
				// 	slidesPerView: 4,
				// 	spaceBetween: 30,
				// },
			},
			on: {

			}
		});
		// }

		// if (document.querySelector('.images-product__slider')) {
		new Swiper('.images-product__slider', {
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation, Pagination, Autoplay, Thumbs],
			// effect: 'fade',
			// autoplay: {
			delay: 1500,
			// 	disableOnInteraction: false,
			// },
			thumbs: {
				swiper: thumbsSwiper
			},
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			// slidesPerView: 'auto', // Чтобы слайдер сам не указывал ширину слайдам. Будем управлять в стилях.
			spaceBetween: 0,
			// autoHeight: true,
			// speed: 1500,
			// parallax: true,
			//touchRatio: 0,
			//simulateTouch: false,
			// loop: true,
			//preloadImages: false,
			//lazy: true,
			// Dotts
			pagination: {
				el: '.images-product__dotts',
				clickable: true,
			},
			// Arrows
			navigation: {
				nextEl: '.images-product__slider .arrow-sl-btn_prev ',
				prevEl: '.images-product__slider .arrow-sl-btn_next',
			},
			breakpoints: {
				// 320: {
				// 	slidesPerView: 1,
				// 	spaceBetween: 0,
				// 	autoHeight: true,
				// },
				// 768: {
				// 	slidesPerView: 2,
				// 	spaceBetween: 20,
				// },
				// 992: {
				// 	slidesPerView: 1,
				// 	// spaceBetween: 20,
				// },
				// 1268: {
				// 	slidesPerView: 4,
				// 	spaceBetween: 30,
				// },
			},
			on: {

			}
		});
	}

}
// }
// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
	// Добавление классов слайдера
	// при необходимости отключить
	bildSliders();

	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliders();
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});