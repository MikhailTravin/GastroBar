/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
/*
Основные модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';

// Список слайдеров
if (document.querySelector('.swiper')) { // Указываем склад нужного слайдера
	// Создаем слайдер
	new Swiper('.swiper', { // Указываем склад нужного слайдера
		// Подключаем модули слайдера
		// для конкретного случая
		modules: [Navigation],
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		spaceBetween: 0,
		//autoHeight: true,
		speed: 800,

		//touchRatio: 0,
		//simulateTouch: false,
		//loop: true,
		//preloadImages: false,
		//lazy: true,
		/*
		thumbs: {
			swiper: thumbsSwiper
		},
		*/

		/*
		// Эффекты
		effect: 'fade',
		fadeEffect: {
			crossFade: true
		},

		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		*/

		// Пагинация
		/*
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		*/

		// Скроллбар
		/*
		scrollbar: {
			el: '.swiper-scrollbar',
			draggable: true,
		},
		*/

		// Кнопки «влево/вправо»
		navigation: {
			prevEl: '.swiper-button-prev',
			nextEl: '.swiper-button-next',
		},
		/*
		// Брейкпоинты
		breakpoints: {
			640: {
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
		// События
		on: {

		}
	});
}


// Если слайдеров много
/*
const swipers = document.querySelectorAll('.swiper');
if (swipers) {
	swipers.forEach(swiper => {

		const prevButton = swiper.closest('.swiper').querySelector('.swiper');
		const nextButton = swiper.closest('.swiper').querySelector('.swiper');

		// Инициализация Swiper
		new Swiper(swiper, {
			modules: [Navigation],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 10,
			speed: 800,

			// Навигация (кнопки "влево/вправо")
			navigation: {
				prevEl: prevButton,
				nextEl: nextButton,
			},
		});
	});
}
*/

//С медиа-запросом
/*
if (document.querySelector('.swiper')) { 

	var swiper = null;
	var mediaQuerySize = 700;

	function sliderInit() {
		if (!swiper) {
			swiper = new Swiper('.swiper', {
				// Подключаем модули слайдера
				// для конкретного случая
				modules: [Navigation],
				observer: true,
				observeParents: true,
				speed: 800,

				// Кнопки "влево/вправо"
				navigation: {
					prevEl: '.swiper',
					nextEl: '.swiper',
				},

				// Брейкпоинты
				breakpoints: {
					0: {
						slidesPerView: 1,
					},
					1202: {
						slidesPerView: 1,
					},
				},
			});
		}
	}

	function sliderDestroy() {
		if (swiper) {
			swiper.destroy();
			swiper = null;
		}
	}
	window.addEventListener('resize', function (e) {
		var windowWidth = window.innerWidth;

		// Если ширина экрана меньше или равна mediaQuerySize
		if (windowWidth <= mediaQuerySize) {
			// Инициализировать слайдер если он ещё не был инициализирован
			sliderInit()
		} else {
			// Уничтожить слайдер если он был инициализирован
			sliderDestroy()
		}
	});
	window.addEventListener('load', function (e) {
		var windowWidth = window.innerWidth;

		// Если ширина экрана меньше или равна mediaQuerySize
		if (windowWidth <= mediaQuerySize) {
			// Инициализировать слайдер если он ещё не был инициализирован
			sliderInit()
		} else {
			// Уничтожить слайдер если он был инициализирован
			sliderDestroy()
		}
	});
};
*/