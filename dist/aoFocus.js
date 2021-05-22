"use strict";
var aoFocus = /** @class */ (function () {
    function aoFocus(el) {
        var _this = this;
        this.keyDownListener = function (e) {
            var _a;
            var KEY_TAB = "Tab", KEY_ESC = "Escape";
            var BackwardTAB = function () {
                var _a;
                if (document.activeElement == _this.firstElm) {
                    e.preventDefault();
                    (_a = _this.lastElm) === null || _a === void 0 ? void 0 : _a.focus();
                }
            };
            var ForwardTAB = function () {
                var _a;
                if (document.activeElement == _this.lastElm) {
                    e.preventDefault();
                    (_a = _this.firstElm) === null || _a === void 0 ? void 0 : _a.focus();
                }
            };
            switch (e.key) {
                case KEY_TAB:
                    if (((_a = _this.focusableElments) === null || _a === void 0 ? void 0 : _a.length) == 1) {
                        e.preventDefault();
                        break;
                    }
                    if (e.shiftKey) {
                        BackwardTAB();
                    }
                    else {
                        ForwardTAB();
                    }
                    break;
                case KEY_ESC:
                    _this.clearFocus();
                    break;
                default:
                    break;
            }
        };
        this.focusEl = document.querySelector(el);
        this.initiateFocus();
    }
    aoFocus.prototype.clearFocus = function () {
        var _a;
        (_a = this.focusEl) === null || _a === void 0 ? void 0 : _a.removeEventListener('keydown', this.keyDownListener, true);
    };
    aoFocus.prototype.initiateFocus = function () {
        var _this = this;
        var _a, _b, _c;
        var notIn = function (arr) {
            return function (item) {
                return arr.indexOf(item) < 0;
            };
        };
        this.focusableElments = (_a = this.focusEl) === null || _a === void 0 ? void 0 : _a.querySelectorAll('a[href], area[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"],iframe, embed');
        this.excludeElements = (_b = this.focusEl) === null || _b === void 0 ? void 0 : _b.querySelectorAll('[aria-hidden="true"], [aria-hidden="true"] *');
        var excludeArr = Array.prototype.slice.call(this.excludeElements);
        var focusableArr = Array.prototype.slice.call(this.focusableElments);
        focusableArr = focusableArr.filter(notIn(excludeArr));
        this.firstElm = focusableArr[0];
        this.lastElm = focusableArr[focusableArr.length - 1];
        (_c = this.focusEl) === null || _c === void 0 ? void 0 : _c.addEventListener('keydown', this.keyDownListener, true);
        setTimeout(function () { var _a; (_a = _this.firstElm) === null || _a === void 0 ? void 0 : _a.focus(); }, 500);
    };
    return aoFocus;
}());
