
const modules_flsModules = {};
function getHash() {
    if (location.hash) return location.hash.replace("#", "");
}
let bodyLockStatus = true;
let bodyUnlock = (delay = 500) => {
    if (bodyLockStatus) {
        const lockPaddingElements = document.querySelectorAll("[data-lp]");
        setTimeout((() => {
            lockPaddingElements.forEach((lockPaddingElement => {
                lockPaddingElement.style.paddingRight = "";
            }));
            document.body.style.paddingRight = "";
            document.documentElement.classList.remove("lock");
        }), delay);
        bodyLockStatus = false;
        setTimeout((function () {
            bodyLockStatus = true;
        }), delay);
    }
};
let bodyLock = (delay = 500) => {
    if (bodyLockStatus) {
        const lockPaddingElements = document.querySelectorAll("[data-lp]");
        const lockPaddingValue = window.innerWidth - document.body.offsetWidth + "px";
        lockPaddingElements.forEach((lockPaddingElement => {
            lockPaddingElement.style.paddingRight = lockPaddingValue;
        }));
        document.body.style.paddingRight = lockPaddingValue;
        document.documentElement.classList.add("lock");
        bodyLockStatus = false;
        setTimeout((function () {
            bodyLockStatus = true;
        }), delay);
    }
};
function menuClose() {
    bodyUnlock();
    document.documentElement.classList.remove("menu-open");
}
function functions_FLS(message) {
    setTimeout((() => {
        if (window.FLS) console.log(message);
    }), 0);
}
function uniqArray(array) {
    return array.filter((function (item, index, self) {
        return self.indexOf(item) === index;
    }));
}
let gotoblock_gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
    const targetBlockElement = document.querySelector(targetBlock);
    if (targetBlockElement) {
        let headerItem = "";
        let headerItemHeight = 0;
        if (noHeader) {
            headerItem = "header.header";
            const headerElement = document.querySelector(headerItem);
            if (!headerElement.classList.contains("_header-scroll")) {
                headerElement.style.cssText = `transition-duration: 0s;`;
                headerElement.classList.add("_header-scroll");
                headerItemHeight = headerElement.offsetHeight;
                headerElement.classList.remove("_header-scroll");
                setTimeout((() => {
                    headerElement.style.cssText = ``;
                }), 0);
            } else headerItemHeight = headerElement.offsetHeight;
        }
        let options = {
            speedAsDuration: true,
            speed,
            header: headerItem,
            offset: offsetTop,
            easing: "easeOutQuad"
        };
        document.documentElement.classList.contains("menu-open") ? menuClose() : null;
        if ("undefined" !== typeof SmoothScroll) (new SmoothScroll).animateScroll(targetBlockElement, "", options); else {
            let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY;
            targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition;
            targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition;
            window.scrollTo({
                top: targetBlockElementPosition,
                behavior: "smooth"
            });
        }
        functions_FLS(`[gotoBlock]: Юхуу...їдемо до ${targetBlock}`);
    } else functions_FLS(`[gotoBlock]: Йой... Такого блоку немає на сторінці: ${targetBlock}`);
};
function formQuantity() {
    function updateButtonState(quantityBlock) {
        const valueElement = quantityBlock.querySelector("[data-quantity-value]");
        const card = quantityBlock.closest(".footer-product-card");
        const button = card?.querySelector(".top-footer__button");
        const value = parseInt(valueElement.value);
        if (button) if (value >= 1) button.classList.add("_active"); else button.classList.remove("_active");
    }
    document.addEventListener("click", (function (e) {
        let targetElement = e.target;
        const quantityControl = targetElement.closest("[data-quantity-plus]") || targetElement.closest("[data-quantity-minus]");
        if (quantityControl) {
            const quantityBlock = targetElement.closest("[data-quantity]");
            const valueElement = quantityBlock.querySelector("[data-quantity-value]");
            let value = parseInt(valueElement.value);
            if (targetElement.hasAttribute("data-quantity-plus")) {
                value++;
                if (+valueElement.dataset.quantityMax && +valueElement.dataset.quantityMax < value) value = valueElement.dataset.quantityMax;
            } else {
                value--;
                if (+valueElement.dataset.quantityMin) {
                    if (+valueElement.dataset.quantityMin > value) value = valueElement.dataset.quantityMin;
                } else if (value < 1) value = 0;
            }
            valueElement.value = value;
            if (value <= 0) {
                const orderColumn = quantityBlock.closest(".order__column");
                if (orderColumn) orderColumn.classList.add("fade-out");
            } else updateButtonState(quantityBlock);
        }
    }));
    function initializeButtonsState() {
        document.querySelectorAll("[data-quantity]").forEach((quantityBlock => {
            updateButtonState(quantityBlock);
        }));
    }
    initializeButtonsState();
}
function formRating() {
    const ratings = document.querySelectorAll("[data-rating]");
    if (ratings) ratings.forEach((rating => {
        const ratingValue = +rating.dataset.ratingValue;
        const ratingSize = +rating.dataset.ratingSize ? +rating.dataset.ratingSize : 5;
        formRatingInit(rating, ratingSize);
        ratingValue ? formRatingSet(rating, ratingValue) : null;
        document.addEventListener("click", formRatingAction);
    }));
    function formRatingAction(e) {
        const targetElement = e.target;
        if (targetElement.closest(".rating__input")) {
            const currentElement = targetElement.closest(".rating__input");
            const ratingValue = +currentElement.value;
            const rating = currentElement.closest(".rating");
            const ratingSet = "set" === rating.dataset.rating;
            ratingSet ? formRatingGet(rating, ratingValue) : null;
        }
    }
    function formRatingInit(rating, ratingSize) {
        let ratingItems = ``;
        for (let index = 0; index < ratingSize; index++) {
            0 === index ? ratingItems += `<div class="rating__items">` : null;
            ratingItems += `\n\t\t\t\t<label class="rating__item">\n\t\t\t\t\t<input class="rating__input" type="radio" name="rating" value="${index + 1}">\n\t\t\t\t</label>`;
            index === ratingSize ? ratingItems += `</div">` : null;
        }
        rating.insertAdjacentHTML("beforeend", ratingItems);
    }
    function formRatingGet(rating, ratingValue) {
        const resultRating = ratingValue;
        formRatingSet(rating, resultRating);
    }
    function formRatingSet(rating, value) {
        const ratingItems = rating.querySelectorAll(".rating__item");
        const resultFullItems = parseInt(value);
        const resultPartItem = value - resultFullItems;
        rating.hasAttribute("data-rating-title") ? rating.title = value : null;
        ratingItems.forEach(((ratingItem, index) => {
            ratingItem.classList.remove("rating__item--active");
            ratingItem.querySelector("span") ? ratingItems[index].querySelector("span").remove() : null;
            if (index <= resultFullItems - 1) ratingItem.classList.add("rating__item--active");
            if (index === resultFullItems && resultPartItem) ratingItem.insertAdjacentHTML("beforeend", `<span style="width:${100 * resultPartItem}%"></span>`);
        }));
    }
}
let addWindowScrollEvent = false;
function pageNavigation() {
    document.addEventListener("click", pageNavigationAction);
    document.addEventListener("watcherCallback", pageNavigationAction);
    function pageNavigationAction(e) {
        if ("click" === e.type) {
            const targetElement = e.target;
            if (targetElement.closest("[data-goto]")) {
                const gotoLink = targetElement.closest("[data-goto]");
                const gotoLinkSelector = gotoLink.dataset.goto ? gotoLink.dataset.goto : "";
                const noHeader = gotoLink.hasAttribute("data-goto-header") ? true : false;
                const gotoSpeed = gotoLink.dataset.gotoSpeed ? gotoLink.dataset.gotoSpeed : 500;
                const offsetTop = gotoLink.dataset.gotoTop ? parseInt(gotoLink.dataset.gotoTop) : 0;
                if (modules_flsModules.fullpage) {
                    const fullpageSection = document.querySelector(`${gotoLinkSelector}`).closest("[data-fp-section]");
                    const fullpageSectionId = fullpageSection ? +fullpageSection.dataset.fpId : null;
                    if (null !== fullpageSectionId) {
                        modules_flsModules.fullpage.switchingSection(fullpageSectionId);
                        document.documentElement.classList.contains("menu-open") ? menuClose() : null;
                    }
                } else gotoblock_gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop);
                e.preventDefault();
            }
        } else if ("watcherCallback" === e.type && e.detail) {
            const entry = e.detail.entry;
            const targetElement = entry.target;
            if ("navigator" === targetElement.dataset.watch) {
                document.querySelector(`[data-goto]._navigator-active`);
                let navigatorCurrentItem;
                if (targetElement.id && document.querySelector(`[data-goto="#${targetElement.id}"]`)) navigatorCurrentItem = document.querySelector(`[data-goto="#${targetElement.id}"]`); else if (targetElement.classList.length) for (let index = 0; index < targetElement.classList.length; index++) {
                    const element = targetElement.classList[index];
                    if (document.querySelector(`[data-goto=".${element}"]`)) {
                        navigatorCurrentItem = document.querySelector(`[data-goto=".${element}"]`);
                        break;
                    }
                }
                if (entry.isIntersecting) navigatorCurrentItem ? navigatorCurrentItem.classList.add("_navigator-active") : null; else navigatorCurrentItem ? navigatorCurrentItem.classList.remove("_navigator-active") : null;
            }
        }
    }
    if (getHash()) {
        let goToHash;
        if (document.querySelector(`#${getHash()}`)) goToHash = `#${getHash()}`; else if (document.querySelector(`.${getHash()}`)) goToHash = `.${getHash()}`;
        goToHash ? gotoblock_gotoBlock(goToHash, true, 500, 20) : null;
    }
}
setTimeout((() => {
    if (addWindowScrollEvent) {
        let windowScroll = new Event("windowScroll");
        window.addEventListener("scroll", (function (e) {
            document.dispatchEvent(windowScroll);
        }));
    }
}), 0);
const buttons = document.querySelectorAll(".button");
if (buttons) buttons.forEach((button => {
    button.addEventListener("click", (() => {
        button.classList.add("_active");
    }));
}));
const langHeader = document.querySelector(".lang-header");
const langButton = document.querySelector(".lang-header__button");
if (langButton) {
    langButton.addEventListener("click", (function (e) {
        langHeader.classList.toggle("_active");
        e.stopPropagation();
    }));
    document.addEventListener("click", (function (e) {
        if (!langHeader.contains(e.target)) langHeader.classList.remove("_active");
    }));
    const langLinks = langHeader.querySelectorAll(".lang-header__link");
    langLinks.forEach((link => {
        link.addEventListener("click", (function (e) {
            e.preventDefault();
            langLinks.forEach((item => item.classList.remove("_active")));
            this.classList.add("_active");
            langHeader.classList.remove("_active");
        }));
    }));
}
document.addEventListener("click", (function (e) {
    const addBasket = e.target.closest(".add-basket");
    if (!addBasket) return;
    const card = addBasket.closest(".footer-product-card");
    if (!card) return;
    const button = card.querySelector(".top-footer__button");
    const quantityInput = card.querySelector("[data-quantity-value]");
    const isActive = button?.classList.contains("_active");
    popupText.textContent = isActive ? "Удалено из заказа" : "Добавлено в заказ";
    if (button) {
        button.classList.toggle("_active", !isActive);
        if (quantityInput) quantityInput.value = 1;
    }
    const showBasket = card.querySelector(".show-basket");
    if (showBasket) {
        addBasket.style.display = isActive ? "inline" : "none";
        showBasket.style.display = isActive ? "none" : "inline";
    }
    addPopup.classList.add("popup_show");
    addPopup.setAttribute("aria-hidden", "false");
    setTimeout((() => {
        addPopup.classList.remove("popup_show");
        addPopup.setAttribute("aria-hidden", "true");
    }), 2e3);
}));
class HorizontalDragScroll {
    constructor(selector, options = {}) {
        this.containers = document.querySelectorAll(selector);
        this.sensitivity = options.sensitivity || 1.5;
        this.init();
    }
    init() {
        this.containers.forEach((container => this.attachListeners(container)));
    }
    attachListeners(container) {
        let isDragging = false;
        let startX = 0;
        let scrollStart = 0;
        const onMouseDown = e => {
            if (0 !== e.button) return;
            isDragging = true;
            container.classList.add("dragging");
            startX = e.pageX - container.offsetLeft;
            scrollStart = container.scrollLeft;
            document.addEventListener("mousemove", onMouseMove, {
                passive: false
            });
            document.addEventListener("mouseup", onMouseUp);
        };
        const onMouseMove = e => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const delta = (x - startX) * this.sensitivity;
            container.scrollLeft = scrollStart - delta;
        };
        const onMouseUp = () => {
            isDragging = false;
            container.classList.remove("dragging");
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };
        container.addEventListener("mousedown", onMouseDown);
        container.addEventListener("mouseleave", (() => {
            if (isDragging) onMouseUp();
        }));
    }
}
document.addEventListener("DOMContentLoaded", (() => {
    new HorizontalDragScroll(".scroll", {
        sensitivity: 1.8
    });
}));
window["FLS"] = false;
formQuantity();
formRating();
pageNavigation();