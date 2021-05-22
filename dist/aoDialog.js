"use strict";
var aoDialog = /** @class */ (function () {
    function aoDialog(el) {
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
                    _this.closeDialog();
                    break;
                default:
                    break;
            }
        };
        this.dialogEl = document.querySelector(el);
        this.initiateDialog();
    }
    aoDialog.prototype.notIn = function (arr) {
        return function (item) {
            return arr.indexOf(item) < 0;
        };
    };
    aoDialog.prototype.closeDialog = function () {
        var _a;
        (_a = this.dialogEl) === null || _a === void 0 ? void 0 : _a.removeEventListener('keydown', this.keyDownListener, true);
    };
    aoDialog.prototype.initiateDialog = function () {
        var _this = this;
        var _a, _b, _c;
        this.focusableElments = (_a = this.dialogEl) === null || _a === void 0 ? void 0 : _a.querySelectorAll('a[href], area[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"],iframe, embed');
        this.excludeElements = (_b = this.dialogEl) === null || _b === void 0 ? void 0 : _b.querySelectorAll('[aria-hidden="true"], [aria-hidden="true"] *');
        var excludeArr = Array.prototype.slice.call(this.excludeElements);
        var focusableArr = Array.prototype.slice.call(this.focusableElments);
        focusableArr = focusableArr.filter(this.notIn(excludeArr));
        this.firstElm = focusableArr[0];
        this.lastElm = focusableArr[focusableArr.length - 1];
        (_c = this.dialogEl) === null || _c === void 0 ? void 0 : _c.addEventListener('keydown', this.keyDownListener, true);
        setTimeout(function () { var _a; (_a = _this.firstElm) === null || _a === void 0 ? void 0 : _a.focus(); }, 500);
    };
    return aoDialog;
}());
