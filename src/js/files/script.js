// Импорт функционала ==============================================================================================================================================================================================================================================================================================================================
import { isMobile, removeClasses, bodyLockStatus, bodyLockToggle, bodyUnlock, bodyLock, darkBody } from "./functions.js";
import { formsModules } from "./forms/forms.js";

// Работа на тачскринах
// Когда весь контент на странице загрузился 
window.onload = function () {
	// Слушаем событие клик на всем документе
	document.addEventListener("click", documentActions);

	// Actions (делегирование события click) 
	function documentActions(e) {
		// В константу будем получать обьект, на который мы нажали на всем документе 
		const targetElement = e.target;
		// Пишем событие click которое будет работать только на экранах шире 768px и только на тачскрнах
		// Добавим проверку. Если экран шире 768, а так же добавим функцию на проверку мобильных устройств isMobile.any().  
		// Функция вернет true, если сайт открыт на устройствах с тачскрин
		if (window.innerWidth > 768 && isMobile.any()) {

			if (targetElement.classList.contains('menu__arrow')) {
				targetElement.closest('.menu__item').classList.toggle('_hover')
			}

			// Закрываем подменю при клике на пустое пространство
			if (!targetElement.closest('.menu__item') && document.querySelectorAll('.menu__item._hover').length > 0) {
				// Отдаем нашей функции _removeClasses() коллекцию обьектов, и указываем какой кдасс нужно убрать.
				removeClasses(document.querySelectorAll('.menu__item._hover'), "_hover");
			}

		}

		// Закрываем Поиска при клике на пустое пространство
		if (!targetElement.closest('.header__search') && document.querySelectorAll('.search-form._active').length > 0) {
			// Отдаем нашей функции _removeClasses() коллекцию обьектов, и указываем какой кдасс нужно убрать.
			removeClasses(document.querySelectorAll('.search-form._active'), "_active");
			search.value = "";
		}

		if (window.innerWidth <= 768) {
			if (!targetElement.closest('.bottom-icons-panel') && !targetElement.closest('.personal-navigation__header')
				&& document.querySelectorAll('.personal-navigation._active').length > 0) {
				// Отдаем нашей функции _removeClasses() коллекцию обьектов, и указываем какой кдасс нужно убрать.
				removeClasses(document.querySelectorAll('.personal-navigation._active'), "_active");
				bodyUnlock();
				darkBody();
			}
		}

		// Кнопки избранное 
		if (targetElement.classList.contains('_icon-favorite')) {
			if (targetElement.closest('.icons-card-product')) {
				targetElement.closest('.icons-card-product').classList.toggle('_active');
			}

			if (targetElement.closest('.inner-product__row')) {
				targetElement.closest('.inner-product__row').classList.toggle('_active');
				// Добавление текста в кнопку
				if (document.querySelectorAll('.inner-product__row._active').length > 0) {
					targetElement.closest('.body-product__btn._icon-favorite').innerText = 'В избранном';
				} else {
					targetElement.closest('.body-product__btn._icon-favorite').innerText = 'В избранное';
				}
			}

			if (targetElement.closest('.inner-product__buttons')) {
				targetElement.closest('.inner-product__buttons').classList.toggle('_active');
				// Добавление текста в кнопку
				if (document.querySelectorAll('.inner-product__buttons._active').length > 0) {
					targetElement.closest('.btn._icon-favorite').innerText = 'В избранном';
				} else {
					targetElement.closest('.btn._icon-favorite').innerText = 'В избранное';
				}
			}

			if (targetElement.closest('.item-card-order__icons')) {
				targetElement.closest('.item-card-order__icons').classList.toggle('_active');
			}
		}

		// Кнопка Показать еще 
		if (targetElement.classList.contains('page-products__show-more')) {
			getProducts(targetElement);
			e.preventDefault();
		}

		// Кнопка В корзину
		if (targetElement.classList.contains('btnAddBascet')) {
			const productId = targetElement.closest('.productAddBascet').dataset.pid;
			addToCart(targetElement, productId);
			e.preventDefault();
		}

		// Открытие корзины-товаров 
		if (targetElement.classList.contains('cart-header__icon') || targetElement.closest('.cart-header__icon')) {
			if (document.querySelector('.cart-list').children.length > 0) {
				document.querySelector('.cart-header').classList.toggle('_active');
			}
			e.preventDefault();
		} else if (!targetElement.closest('.cart-header') && !targetElement.classList.contains('btnAddBascet')) {
			document.querySelector('.cart-header').classList.remove('_active');
		}
		// if (targetElement.classList.contains('actions-card-product__btn-bascket')) { 
		// 	const productId = targetElement.closest('.card-product').dataset.pid;
		// 	addToCart(targetElement, productId);
		// 	e.preventDefault();
		// }

		// // Открытие корзины-товаров 
		// if (targetElement.classList.contains('cart-header__icon') || targetElement.closest('.cart-header__icon')) {
		// 	if (document.querySelector('.cart-list').children.length > 0) {
		// 		document.querySelector('.cart-header').classList.toggle('_active');
		// 	}
		// 	e.preventDefault();
		// } else if (!targetElement.closest('.cart-header') && !targetElement.classList.contains('actions-card-product__btn-bascket')) {
		// 	document.querySelector('.cart-header').classList.remove('_active');
		// }

		// Удаление товара
		if (targetElement.classList.contains('cart-list__delete')) {
			const productId = targetElement.closest('.cart-list__item').dataset.cartPid;
			updateCart(targetElement, productId, false);
			e.preventDefault();
		}

	}

	// Активация поиска
	function searchInit() {
		const limit = 3;
		const search = document.getElementById('search');
		const searchClose = document.getElementById('searchClose');
		const searchMobClose = document.getElementById('searchMobClose');

		search.addEventListener('input', function () {
			if (this.value.length >= limit) {
				document.querySelector('.search-form').classList.add('_active');
				if (window.innerWidth <= 768 && isMobile.any()) {
					document.querySelector('.header').classList.add('_search');
					document.documentElement.classList.remove("menu-open");
					bodyLock();
				}
				bodyLock();
				// return;
			} else {
				document.querySelector('.search-form').classList.remove('_active');
				if (window.innerWidth <= 768 && isMobile.any()) {
					document.querySelector('.header').classList.remove('_search');
					bodyUnlock();
				}
				bodyUnlock();
			}
		});

		if (searchClose && searchMobClose) {
			searchClose.addEventListener("click", function (e) {
				document.querySelector('.search-form').classList.remove('_active');
				if (window.innerWidth <= 768 && isMobile.any()) {
					document.querySelector('.header').classList.remove('_search');
					document.documentElement.classList.remove("menu-open");
					bodyUnlock();
				}
				bodyUnlock();
			});
			searchMobClose.addEventListener("click", function (e) {
				document.querySelector('.search-form').classList.remove('_active');
				if (window.innerWidth <= 768 && isMobile.any()) {
					document.querySelector('.header').classList.remove('_search');
					document.documentElement.classList.remove("menu-open");
					bodyUnlock();
				}
				bodyUnlock();
			});
		}
	}

	searchInit();

	// Активация модулей на мобилках 
	if (window.innerWidth <= 768 && isMobile.any()) {

		// Активация Мобильных фильтров
		const btnFilter = document.querySelector('.btn-filter');
		const filterCatalog = document.querySelector('.filter-catalog');
		const mobFiltercl = document.querySelector('.mob-filter-cl');

		function mobFiltersOp() {
			if (btnFilter && filterCatalog) {
				btnFilter.addEventListener("click", function (e) {
					filterCatalog.classList.add('_active');
					bodyLock();
					darkBody();
				});
			}
		}
		function mobFiltersCl() {
			if (mobFiltercl && filterCatalog) {
				mobFiltercl.addEventListener("click", function (e) {
					filterCatalog.classList.remove('_active');
					bodyUnlock();
					darkBody();
				});
			}
		}
		mobFiltersOp();
		mobFiltersCl();
	}

	// Активация личного кабинета на мобилке 
	if (document.querySelector('._action-btn-profile')) {
		document.querySelector('._action-btn-profile').addEventListener("click", function (e) {
			if (document.querySelector('.personal-navigation')) {
				document.querySelector('.personal-navigation').classList.toggle('_active');
				bodyLockToggle();
				darkBody();
			}
		});
	}
	if (document.querySelector('.header-personal-navigation__btn')) {
		document.querySelector('.header-personal-navigation__btn').addEventListener("click", function (e) {
			if (document.querySelector('.personal-navigation')) {
				document.querySelector('.personal-navigation').classList.remove('_active');
				bodyUnlock();
				darkBody();
			}
		});
	}

	// Заказ подробно 
	function orderInit() {
		const bodyOrdersBtn = document.querySelectorAll('.body-orders__button');
		const personalContentOrders = document.querySelector('.personal-content__orders');
		const orderdetailBackBtn = document.querySelectorAll('.order-detail__back-btn');
		const personalContentOrderDetail = document.querySelector('.personal-content__order-detail');

		bodyOrdersBtn.forEach(btn => {
			btn.addEventListener("click", function (e) {
				personalContentOrders.classList.add('_none');
				personalContentOrderDetail.classList.add('_active')
			});
		});

		orderdetailBackBtn.forEach(btn => {
			btn.addEventListener("click", function (e) {
				personalContentOrders.classList.remove('_none');
				personalContentOrderDetail.classList.remove('_active')
			});
		});
	}
	orderInit();
	// ========================================================

	// Добавление товаров по кнопке Показать еще
	// Load More Products
	async function getProducts(button) {
		if (!button.classList.contains('_hold')) {
			button.classList.add('_hold');
			const file = "json/products.json";
			let response = await fetch(file, {
				method: "GET"
			});
			if (response.ok) {
				let result = await response.json();
				loadProducts(result);
				button.classList.remove('_hold');
				button.remove();
			} else {
				alert("Ошибка");
			}
		}
	}

	function loadProducts(data) {
		const productsItems = document.querySelector('.products');

		data.products.forEach(item => {
			const productId = item.id;
			const productTrigger = item.trigger;
			const productUrl = item.url;
			const productImage = item.image;
			const productTitle = item.title;
			const productSize = item.size;
			const vendorCode = item.vendorCode;
			const productPrice = item.price;
			const productPriceOld = item.priceOld;
			const sticker = item.sticker;
			const stickerQuantity = item.stickerQuantity;

			let productsTemplate = `
			<div data-pid="${productId}" class="card-product productAddBascet">
			<div class="card-product__image image-card-product swiper">
				<div class="image-card-product__stikcers-block sticker-block">
					<span class="sticker _red">${sticker} <span>${stickerQuantity} шт</span></span>
				</div>
				<div class="image-card-product__icons icons-card-product">
					<button type="button" class="icons-card-product__icon icon-card-product _icon-favorite"></button>
					<button data-fancybox-trigger="${productTrigger}" type="button"
						class="icons-card-product__icon icon-card-product _icon-search-plus"></button>
				</div>
				<div class="swiper-wrapper">
					<a data-fancybox="${productTrigger}" data-src="img/card-product/${productImage}"
						class="fancybox slider-card-product__slide swiper-slide imageAddBascet _ibg">
						<img src="img/card-product/${productImage}" loading="lazy" alt="Картинка">
					</a>
				</div>
				<div class="image-card-product__dotts"></div>
			</div>
			<div class="card-product__body body-card-product">
				<div class="body-card-product__row">
					<div class="body-card-product__item availability-card _color-green">· В наличии
					</div>
					<div class="body-card-product__item article-card">Арт: ${vendorCode}</div>
				</div>
				<a href="${productUrl}" class="body-card-product__title titleAddBascet">
					${productTitle}
				</a>
				<div class="body-card-product__size size-product-card"><span>${productSize} мм</span></div>
				<div class="body-card-product__price price-card-product">
					<div class="price-card-product__name">Цена за штуку</div>
					<div class="price-card-product__row">
						<div class="price-card-product__new-price new-price-card">${productPrice} р</div>
						<div class="price-card-product__old-price old-price-card">${productPriceOld} р</div>
					</div>
				</div>
			</div>
			<div class="card-product__actions actions-card-product">
				<div class="actions-card-product__bascket-action">
					<div class="actions-card-product__quantity quantity">
						<div class="quantity__button quantity__button_minus"></div>
						<div class="quantity__input">
							<input autocomplete="off" type="number" name="form[]" value="1">
						</div>
						<div class="quantity__button quantity__button_plus"></div>
					</div>
					<button type="button" class="actions-card-product__btn-bascket btn btnAddBascet _icon-baskcet">В
						корзину</button>
				</div>
				<!-- <div class="actions-card-product__btn">Сообщить о поступлении</div> -->
			</div>
		</div>`;

			productsItems.insertAdjacentHTML('beforeend', productsTemplate);

		});

	}
	// ===========================================================================

	// AddToCart 
	function addToCart(productButton, productId) {
		if (!productButton.classList.contains('_hold')) {
			productButton.classList.add('_hold');
			productButton.classList.add('_fly');

			const cart = document.querySelector('.cart-header__icon');
			const product = document.querySelector(`[data-pid="${productId}"]`);
			const productImage = product.querySelector('.imageAddBascet');

			const productImageFly = productImage.cloneNode(true);

			const productImageFlyWidth = productImage.offsetWidth;
			const productImageFlyHeight = productImage.offsetHeight;
			const productImageFlyTop = productImage.getBoundingClientRect().top;
			const productImageFlyLeft = productImage.getBoundingClientRect().left;

			productImageFly.setAttribute('class', '_flyImage _ibg');
			productImageFly.style.cssText =
				`
				left: ${productImageFlyLeft}px;
				top: ${productImageFlyTop}px;
				width: ${productImageFlyWidth}px;
				height: ${productImageFlyHeight}px;
			`;

			document.body.append(productImageFly);

			const cartFlyLeft = cart.getBoundingClientRect().left;
			const cartFlyTop = cart.getBoundingClientRect().top;

			productImageFly.style.cssText =
				`
			left: ${cartFlyLeft}px;
			top: ${cartFlyTop}px;
			width: 0px;
			height: 0px;
			opacity: 0;
		`;

			productImageFly.addEventListener("transitionend", function (e) {
				if (productButton.classList.contains('_fly')) {
					productImageFly.remove();
					updateCart(productButton, productId);
					productButton.classList.remove('_fly');
				}
			});

		}
	}

	// UpdateCart
	function updateCart(productButton, productId, productAdd = true) {
		const cart = document.querySelector('.cart-header');
		const cartIcon = cart.querySelector('.cart-header__icon');
		const cartQuantity = cartIcon.querySelector('span');
		const cartProduct = document.querySelector(`[data-cart-pid="${productId}"]`);
		const cartList = document.querySelector('.cart-list');

		// Добавляем 
		if (productAdd) {
			if (cartQuantity) {
				cartQuantity.innerHTML = ++cartQuantity.innerHTML;
			} else {
				cartIcon.insertAdjacentHTML('beforeend', `<span>1</span>`);
			}
			if (!cartProduct) {
				const product = document.querySelector(`[data-pid="${productId}"]`);
				const cartProductImage = product.querySelector('.imageAddBascet').innerHTML;
				const cartProductTitle = product.querySelector('.titleAddBascet').innerHTML;
				const cartProductContent =
					`
				<a href="card-detail.html" class="cart-list__image _ibg">${cartProductImage}</a>
				<div class="cart-list__body">
					<a href="card-detail.html" class="cart-list__title">${cartProductTitle}</a>
					<div class="cart-list__quantity">Колличество: <span>1</span></div>
					<button type="button" class="cart-list__delete">Удалить</button>
				</div>
				`;
				cartList.insertAdjacentHTML('beforeend', `<li data-cart-pid="${productId}" class="cart-list__item">${cartProductContent}</li>`);
			} else {
				const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
				cartProductQuantity.innerHTML = ++cartProductQuantity.innerHTML;
			}

			// После всех действий 
			productButton.classList.remove('_hold');

		} else {
			const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
			cartProductQuantity.innerHTML = --cartProductQuantity.innerHTML;
			if (!parseInt(cartProductQuantity.innerHTML)) {
				cartProduct.remove();
			}

			const cartQuantityValue = --cartQuantity.innerHTML;

			if (cartQuantityValue) {
				cartQuantity.innerHTML = cartQuantityValue;
			} else {
				cartQuantity.remove();
				cart.classList.remove('_active');
			}

		}

	}


}
//========================================================================================================================================================

// Ограничение ввода 
const quantityInput = document.querySelectorAll('.quantity__input input');
quantityInput.forEach(input => {
	input.addEventListener('input', function () {
		var maxLength = 3;
		if (this.value.length > maxLength) {
			this.value = this.value.substring(0, maxLength);
		}
	})
});













