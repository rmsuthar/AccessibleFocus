"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
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
    aoFocus.prototype.addExcludeElements = function (arr) {
        this.excludeElements = arr;
    };
    aoFocus.prototype.initiateFocus = function () {
        var _this = this;
        var _a, _b, _c, _d;
        var notIn = function (arr) {
            return function (item) {
                return arr.indexOf(item) < 0;
            };
        };
        this.focusableElments = (_a = this.focusEl) === null || _a === void 0 ? void 0 : _a.querySelectorAll('a[href], area[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"],iframe, embed');
        var excludeElements = (_b = this.focusEl) === null || _b === void 0 ? void 0 : _b.querySelectorAll('[aria-hidden="true"], [aria-hidden="true"] *');
        var excludeArr = Array.prototype.slice.call(excludeElements);
        if ((_c = this.excludeElements) === null || _c === void 0 ? void 0 : _c.length) {
            excludeArr = __spreadArray([], this.excludeElements);
        }
        var focusableArr = Array.prototype.slice.call(this.focusableElments);
        focusableArr = focusableArr.filter(notIn(excludeArr));
        this.firstElm = focusableArr[0];
        this.lastElm = focusableArr[focusableArr.length - 1];
        (_d = this.focusEl) === null || _d === void 0 ? void 0 : _d.addEventListener('keydown', this.keyDownListener, true);
        setTimeout(function () { var _a; (_a = _this.firstElm) === null || _a === void 0 ? void 0 : _a.focus(); }, 500);
    };
    return aoFocus;
}());
