// Импорт функционала ==============================================================================================================================================================================================================================================================================================================================
// import { isMobile } from "./functions.js";
// import { formsModules } from "./forms/forms.js";

import { bodyLockStatus, bodyLockToggle, bodyUnlock, menuClose, bodyLock } from "./functions.js";

// Модуль закрытия по ESC 
if (document.documentElement.clientWidth > 1024) {
	document.addEventListener("DOMContentLoaded", () => {
		window.onkeydown = function (event) {
			console.log(event.keyCode)
			// console.log(showedWindow)
			if (event.keyCode == 27) {

				if (search) {
					search.value = "";
				}
				document.querySelector('.search-form').classList.remove('_active');
				document.querySelector('.header').classList.remove('_search');

				// input.value = "";

				// form.reset();

				// Сброс инпутов
				// Array.prototype.slice.call(
				// 	document.getElementsByTagName('input'))
				// 	.forEach(function (el) {
				// 		el.value = '';
				// 	});

				// Удалить все  перед использованием =========================
				// if (showedWindow == "headerMenuCatalog") toggleCatalog()

				// // Сбрасывание инпутов
				// if (searchFormInput) {
				// 	searchFormInput.value = "";
				// }

				// if (catEntityMenuSearch) {
				// 	catEntityMenuSearch.classList.remove('_active');
				// }

				menuClose()

				bodyUnlock()


				// ===========================================================

			}
		};
	})
}

// window.addEventListener('click', e => { // при клике в любом месте окна браузера
// 	const target = e.target // находим элемент, на котором был клик
// 	if (!target.closest('.catalog-btn') && !target.closest('.bottom-header-menu') && !target.closest('.header__main')) { // если этот элемент или его родительские элементы не окно навигации и не кнопка
// 		// menuBody.classList.remove('active')
// 		// body.classList.remove('_lock')
// 		// headsearch.classList.remove('_active')
// 		menuClose()
// 		bodyUnlock()
// 	}
// })