function indents() {
    const footer = document.querySelector(".footer");
    const page = document.querySelector(".page");
    const popups = document.querySelectorAll(".popup");
    const footerTop = document.querySelector(".footer__top");
    if (!footer) return;
    let hFooter = window.getComputedStyle(footer).height;
    hFooter = Number(hFooter.replace("px", ""));
    let hfooterTop = 0;
    if (footerTop && "none" !== window.getComputedStyle(footerTop).display) {
        let height = window.getComputedStyle(footerTop).height;
        hfooterTop = Number(height.replace("px", ""));
    }
    if (page) page.style.paddingBottom = `${hFooter - hfooterTop}px`;
    if (popups.length) popups.forEach((popup => {
        popup.style.paddingBottom = `${hFooter}px`;
        console.log(hFooter);
        console.log(hfooterTop);
    }));
}
window.addEventListener("resize", indents);
window.addEventListener("scroll", indents);
indents();
const observer = new MutationObserver((() => requestAnimationFrame(indents)));
observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"]
});
class Popup {
    constructor(options) {
        let config = {
            logging: true,
            init: true,
            attributeOpenButton: "data-popup",
            attributeCloseButton: "data-close",
            fixElementSelector: "[data-lp]",
            youtubeAttribute: "data-popup-youtube",
            youtubePlaceAttribute: "data-popup-youtube-place",
            setAutoplayYoutube: true,
            classes: {
                popup: "popup",
                popupContent: "popup__content",
                popupActive: "popup_show",
                bodyActive: "popup-show"
            },
            focusCatch: true,
            closeEsc: true,
            bodyLock: true,
            hashSettings: {
                goHash: true
            },
            on: {
                beforeOpen: function () { },
                afterOpen: function () { },
                beforeClose: function () { },
                afterClose: function () { }
            }
        };
        this.youTubeCode;
        this.isOpen = false;
        this.targetOpen = {
            selector: false,
            element: false
        };
        this.previousOpen = {
            selector: false,
            element: false
        };
        this.lastClosed = {
            selector: false,
            element: false
        };
        this._dataValue = false;
        this.hash = false;
        this._reopen = false;
        this._selectorOpen = false;
        this.lastFocusEl = false;
        this._focusEl = ["a[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "button:not([disabled]):not([aria-hidden])", "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "area[href]", "iframe", "object", "embed", "[contenteditable]", '[tabindex]:not([tabindex^="-"])'];
        this.options = {
            ...config,
            ...options,
            classes: {
                ...config.classes,
                ...options?.classes
            },
            hashSettings: {
                ...config.hashSettings,
                ...options?.hashSettings
            },
            on: {
                ...config.on,
                ...options?.on
            }
        };
        this.bodyLock = false;
        this.options.init ? this.initPopups() : null;
    }
    initPopups() {
        this.popupLogging(`Проснулся`);
        this.eventsPopup();
    }
    eventsPopup() {
        document.addEventListener("click", function (e) {
            const buttonOpen = e.target.closest(`[${this.options.attributeOpenButton}]`);
            if (buttonOpen) {
                e.preventDefault();
                this._dataValue = buttonOpen.getAttribute(this.options.attributeOpenButton) ? buttonOpen.getAttribute(this.options.attributeOpenButton) : "error";
                this.youTubeCode = buttonOpen.getAttribute(this.options.youtubeAttribute) ? buttonOpen.getAttribute(this.options.youtubeAttribute) : null;
                if ("error" !== this._dataValue) {
                    if (!this.isOpen) this.lastFocusEl = buttonOpen;
                    this.targetOpen.selector = `${this._dataValue}`;
                    this._selectorOpen = true;
                    this.open();
                    return;
                } else this.popupLogging(`Ой ой, не заполнен атрибут у ${buttonOpen.classList}`);
                return;
            }
            const buttonClose = e.target.closest(`[${this.options.attributeCloseButton}]`);
            if (buttonClose) {
                e.preventDefault();
                this.close();
                return;
            }
            const popupContent = e.target.closest(`.${this.options.classes.popupContent}`);
            const isTopFooterButton = e.target.closest(".top-footer__button");
            if (!popupContent && this.isOpen && !isTopFooterButton) {
                const currentPopup = document.querySelector(`.${this.options.classes.popupActive}`);
                if (currentPopup && (currentPopup.classList.contains("card-product-block") || currentPopup.classList.contains("main-order") || currentPopup.classList.contains("thanks-order"))) return;
                e.preventDefault();
                this.close();
            }
        }.bind(this));
        document.addEventListener("keydown", function (e) {
            if (this.options.closeEsc && 27 == e.which && "Escape" === e.code && this.isOpen) {
                e.preventDefault();
                this.close();
                return;
            }
            if (this.options.focusCatch && 9 == e.which && this.isOpen) {
                this._focusCatch(e);
                return;
            }
        }.bind(this));
        if (this.options.hashSettings.goHash) {
            window.addEventListener("hashchange", function () {
                if (window.location.hash) this._openToHash(); else this.close(this.targetOpen.selector);
            }.bind(this));
            window.addEventListener("load", function () {
                if (window.location.hash) this._openToHash();
            }.bind(this));
        }
    }
    open(selectorValue) {
        if (bodyLockStatus) {
            this.bodyLock = document.documentElement.classList.contains("lock") && !this.isOpen ? true : false;
            if (selectorValue && "string" === typeof selectorValue && "" !== selectorValue.trim()) {
                this.targetOpen.selector = selectorValue;
                this._selectorOpen = true;
            }
            if (this.isOpen) {
                this._reopen = true;
                this.close();
            }
            if (!this._selectorOpen) this.targetOpen.selector = this.lastClosed.selector;
            if (!this._reopen) this.previousActiveElement = document.activeElement;
            this.targetOpen.element = document.querySelector(this.targetOpen.selector);
            if (this.targetOpen.element) {
                if (this.targetOpen.element.classList.contains("card-product-block")) document.documentElement.classList.add("popup-product-card"); else if (this.targetOpen.element.classList.contains("main-order")) document.documentElement.classList.add("popup-order"); else if (this.targetOpen.element.classList.contains("thanks-order")) document.documentElement.classList.add("popup-thanks-order");
                requestAnimationFrame((() => indents()));
                if (this.youTubeCode) {
                    const codeVideo = this.youTubeCode;
                    const urlVideo = `https://www.youtube.com/embed/${codeVideo}?rel=0&showinfo=0&autoplay=1`;
                    const iframe = document.createElement("iframe");
                    iframe.setAttribute("allowfullscreen", "");
                    const autoplay = this.options.setAutoplayYoutube ? "autoplay;" : "";
                    iframe.setAttribute("allow", `${autoplay}; encrypted-media`);
                    iframe.setAttribute("src", urlVideo);
                    if (!this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) {
                        this.targetOpen.element.querySelector(".popup__text").setAttribute(`${this.options.youtubePlaceAttribute}`, "");
                    }
                    this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).appendChild(iframe);
                }
                if (this.options.hashSettings.location) {
                    this._getHash();
                    this._setHash();
                }
                this.options.on.beforeOpen(this);
                document.dispatchEvent(new CustomEvent("beforePopupOpen", {
                    detail: {
                        popup: this
                    }
                }));
                this.targetOpen.element.classList.add(this.options.classes.popupActive);
                document.documentElement.classList.add(this.options.classes.bodyActive);
                if (!this._reopen) !this.bodyLock ? bodyLock() : null; else this._reopen = false;
                this.targetOpen.element.setAttribute("aria-hidden", "false");
                this.previousOpen.selector = this.targetOpen.selector;
                this.previousOpen.element = this.targetOpen.element;
                this._selectorOpen = false;
                this.isOpen = true;
                setTimeout((() => {
                    this._focusTrap();
                }), 50);
                this.options.on.afterOpen(this);
                document.dispatchEvent(new CustomEvent("afterPopupOpen", {
                    detail: {
                        popup: this
                    }
                }));
                this.popupLogging(`Открыл попап`);
            } else this.popupLogging(`Ой ой, такого попапа нет. Проверьте корректность ввода.`);
        }
    }
    close(selectorValue) {
        if (selectorValue && "string" === typeof selectorValue && "" !== selectorValue.trim()) this.previousOpen.selector = selectorValue;
        if (!this.isOpen || !bodyLockStatus) return;
        this.options.on.beforeClose(this);
        document.dispatchEvent(new CustomEvent("beforePopupClose", {
            detail: {
                popup: this
            }
        }));
        if (this.youTubeCode) if (this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).innerHTML = "";
        if (this.previousOpen.element.classList.contains("card-product-block")) document.documentElement.classList.remove("popup-product-card"); else if (this.previousOpen.element.classList.contains("main-order")) document.documentElement.classList.remove("popup-order"); else if (this.previousOpen.element.classList.contains("thanks-order")) document.documentElement.classList.remove("popup-thanks-order");
        requestAnimationFrame((() => indents()));
        this.previousOpen.element.classList.remove(this.options.classes.popupActive);
        this.previousOpen.element.setAttribute("aria-hidden", "true");
        if (!this._reopen) {
            document.documentElement.classList.remove(this.options.classes.bodyActive);
            !this.bodyLock ? bodyUnlock() : null;
            this.isOpen = false;
        }
        document.dispatchEvent(new CustomEvent("afterPopupClose", {
            detail: {
                popup: this
            }
        }));
        setTimeout((() => {
            this._focusTrap();
        }), 50);
        this.popupLogging(`Закрыл попап`);
    }
    _getHash() {
        if (this.options.hashSettings.location) this.hash = this.targetOpen.selector.includes("#") ? this.targetOpen.selector : this.targetOpen.selector.replace(".", "#");
    }
    _openToHash() {
        let classInHash = document.querySelector(`.${window.location.hash.replace("#", "")}`) ? `.${window.location.hash.replace("#", "")}` : document.querySelector(`${window.location.hash}`) ? `${window.location.hash}` : null;
        const buttons = document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) ? document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) : document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash.replace(".", "#")}"]`);
        if (buttons && classInHash) this.open(classInHash);
    }
    _setHash() {
        history.pushState("", "", this.hash);
    }
    _removeHash() {
        history.pushState("", "", window.location.href.split("#")[0]);
    }
    _focusCatch(e) {
        const focusable = this.targetOpen.element.querySelectorAll(this._focusEl);
        const focusArray = Array.prototype.slice.call(focusable);
        const focusedIndex = focusArray.indexOf(document.activeElement);
        if (e.shiftKey && 0 === focusedIndex) {
            focusArray[focusArray.length - 1].focus();
            e.preventDefault();
        }
        if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
            focusArray[0].focus();
            e.preventDefault();
        }
    }
    _focusTrap() {
        const focusable = this.previousOpen.element.querySelectorAll(this._focusEl);
        if (!this.isOpen && this.lastFocusEl) this.lastFocusEl.focus(); else focusable[0].focus();
    }
    popupLogging(message) {
        this.options.logging ? functions_FLS(`[Попапос]: ${message}`) : null;
    }
}
modules_flsModules.popup = new Popup({});