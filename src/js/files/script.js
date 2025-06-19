
//Кнопка добавить
const buttons = document.querySelectorAll('.button');

if (buttons) {
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Переключаем активный класс у самой кнопки
            button.classList.add('_active');
        });
    });
}


//Язык
const langHeader = document.querySelector('.lang-header');
const langButton = document.querySelector('.lang-header__button');
if (langButton) {
    langButton.addEventListener('click', function (e) {
        langHeader.classList.toggle('_active');
        e.stopPropagation();
    });
    document.addEventListener('click', function (e) {
        if (!langHeader.contains(e.target)) {
            langHeader.classList.remove('_active');
        }
    });
    const langLinks = langHeader.querySelectorAll('.lang-header__link');
    langLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            langLinks.forEach(item => item.classList.remove('_active'));
            this.classList.add('_active');
            langHeader.classList.remove('_active');
        });
    });
}

document.addEventListener('click', function (e) {
    const addBasket = e.target.closest('.add-basket');

    // Проверяем, найден ли элемент .add-basket
    if (!addBasket) return;

    const card = addBasket.closest('.footer-product-card');
    if (!card) return; // Также можно защититься от отсутствия card

    const button = card.querySelector('.top-footer__button');
    const quantityInput = card.querySelector('[data-quantity-value]');
    const isActive = button?.classList.contains('_active');

    // Обновляем текст попапа
    popupText.textContent = isActive ? 'Удалено из заказа' : 'Добавлено в заказ';

    // Переключаем состояние кнопки
    if (button) {
        button.classList.toggle('_active', !isActive);
        if (quantityInput) quantityInput.value = 1;
    }

    // Скрываем/показываем надписи
    const showBasket = card.querySelector('.show-basket');
    if (showBasket) {
        addBasket.style.display = isActive ? 'inline' : 'none';
        showBasket.style.display = isActive ? 'none' : 'inline';
    }

    // Показываем попап
    addPopup.classList.add('popup_show');
    addPopup.setAttribute('aria-hidden', 'false');

    // Скрываем через 2 секунды
    setTimeout(() => {
        addPopup.classList.remove('popup_show');
        addPopup.setAttribute('aria-hidden', 'true');
    }, 2000);
});

class HorizontalDragScroll {
    constructor(selector, options = {}) {
        this.containers = document.querySelectorAll(selector);
        this.sensitivity = options.sensitivity || 1.5;
        this.init();
    }

    init() {
        this.containers.forEach(container => this.attachListeners(container));
    }

    attachListeners(container) {
        let isDragging = false;
        let startX = 0;
        let scrollStart = 0;

        const onMouseDown = (e) => {
            if (e.button !== 0) return;
            isDragging = true;
            container.classList.add('dragging');
            startX = e.pageX - container.offsetLeft;
            scrollStart = container.scrollLeft;
            document.addEventListener('mousemove', onMouseMove, { passive: false });
            document.addEventListener('mouseup', onMouseUp);
        };

        const onMouseMove = (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const delta = (x - startX) * this.sensitivity;
            container.scrollLeft = scrollStart - delta;
        };

        const onMouseUp = () => {
            isDragging = false;
            container.classList.remove('dragging');
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        container.addEventListener('mousedown', onMouseDown);
        container.addEventListener('mouseleave', () => {
            if (isDragging) onMouseUp();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new HorizontalDragScroll('.scroll', { sensitivity: 1.8 });
});

function slideUp(element, duration = 400) {
    return new Promise((resolve) => {
        if (!(element instanceof HTMLElement)) {
            throw new Error('Element must be an instance of HTMLElement');
        }

        const computedStyle = window.getComputedStyle(element);
        if (computedStyle.display === 'none') {
            resolve();
            return;
        }

        const elementHeight = element.offsetHeight;

        element.style.transitionProperty = 'height, margin, padding';
        element.style.transitionDuration = `${duration}ms`;
        element.style.boxSizing = 'border-box';
        element.style.height = `${elementHeight}px`;
        element.style.overflow = 'hidden';

        element.offsetHeight;

        element.style.height = '0';
        element.style.paddingTop = '0';
        element.style.paddingBottom = '0';
        element.style.marginTop = '0';
        element.style.marginBottom = '0';

        const onTransitionEnd = (event) => {
            if (event.target !== element) return;

            element.removeEventListener('transitionend', onTransitionEnd);

            // Очистка стилей и скрытие
            element.style.display = 'none';
            element.style.removeProperty('height');
            element.style.removeProperty('padding-top');
            element.style.removeProperty('padding-bottom');
            element.style.removeProperty('margin-top');
            element.style.removeProperty('margin-bottom');
            element.style.removeProperty('overflow');
            element.style.removeProperty('transition-duration');
            element.style.removeProperty('transition-property');
            element.style.removeProperty('box-sizing');

            resolve();
        };

        element.addEventListener('transitionend', onTransitionEnd);
    });
}
